---
title: Architecture
description: How the HostelHive backend, clients, gate scanners and cloud services fit together.
---

Everything goes through the Go backend. The web app and the mobile app sign users in with Firebase and send the resulting ID token with each request. Gate scanners don't use Firebase at all. Each one has its own credential, issued by an Admin.

```text
  Mobile app          Web app             Gate scanner (ESP32)
      |                  |                       |
      +---- Firebase ID token ----+     scanner credential, pinned TLS
                                  |              |
                                  v              v
                           Go backend  (/api/v1)
                                  |
          +-----------------------+------------------------+
          |                       |                        |
     PostgreSQL           Firebase Auth, RTDB, FCM    Cloudflare R2
   (source of truth)                                (private photos)
```

## Decisions worth knowing

The project's decision records live in the [design documents repository](https://github.com/Hostel-Hive/Design-and-Development-Project). Four of them shape most of the code.

Firebase handles passwords and sign-in, but it doesn't decide what a user may do (ADR-002). On every request the backend verifies the token, checks it hasn't been revoked, and then looks up the user's role and active flag in PostgreSQL. Custom claims on the client are ignored. HostelHive never stores a password and never issues tokens of its own.

PostgreSQL is the source of truth for attendance, profiles, rooms, complaints and reports (ADR-003). All tables live in the `hostelhive` schema.

Live attendance is a copy, not the record (ADR-004). When it's turned on, the backend pushes headcounts and a version number to Firebase Realtime Database. No names or IDs go there. Staff dashboards get a short read grant, and when the version changes they fetch details from the API.

The Go server speaks plain HTTP (ADR-005). TLS ends at your hosting platform or at an Nginx proxy in front of it.

## Inside the backend

The backend is one service split into modules: identity, student, staff, inventory, allocation, attendance, late access, leave history, complaints, notifications, announcements and reports. Each module has the same layers, from handler to service to repository. A module may call another module's service, but never its repository, and a test in `tests/architecture` enforces that.

```text
cmd/server/                 startup and shutdown
internal/app/               wiring, router, /health and /ready
internal/config/            environment variables
internal/platform/          Postgres, Firebase, R2, PDF and Excel adapters
internal/modules/<name>/    one folder per module
internal/workers/           background jobs
migrations/                 numbered SQL migrations
```

## What happens at the gate

A student holds up their pass. The code on it is `HH1:` and 64 hex characters, a random ID with nothing personal in it.

The scanner checks the format, then posts it to `/api/v1/device/scans` using its own credential. The backend works out the direction from how that scanner is configured, drops the scan if it's a repeat inside the cooldown, applies the [movement policy](/guides/movement-policy/), and records the event and the student's new presence in one transaction.

The gate opens only when the backend confirms. If the network is down, the request times out, or the backend returns an error, the gate stays shut. Updated headcounts are queued for the live dashboard, and a movement outside open hours without approval raises an incident for staff.
