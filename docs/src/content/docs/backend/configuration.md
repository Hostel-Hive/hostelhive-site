---
title: Backend configuration
description: Every environment variable the HostelHive backend reads, with defaults and valid values.
---

The backend reads its settings from environment variables. It doesn't load `.env` files itself: locally, `scripts/dev.ps1` loads `.env.local` for you, and on a hosting platform you set the variables in its dashboard.

If anything required is missing, or a value is set but empty or malformed, the server refuses to start. The error names the setting but never prints its value.

## Required

`DATABASE_URL` is the PostgreSQL connection string, with host, user and database. URL-encode any special characters in the password, and use `sslmode=require` or stricter for a hosted database.

`FIREBASE_PROJECT_ID` is the project's ID, which is not the same as its display name.

`GOOGLE_APPLICATION_CREDENTIALS` is the path to the service-account JSON. Keep that file outside the repository. On platforms that provide Google credentials automatically you can leave it out.

## Server

| Variable | Default | |
| --- | --- | --- |
| `APP_ENV` | `development` | `development`, `test` or `production` |
| `HTTP_ADDR` | `127.0.0.1:8080` | Use `0.0.0.0:<port>` in containers and on hosts |
| `HTTP_READ_HEADER_TIMEOUT` | `5s` | |
| `HTTP_READ_TIMEOUT` | `15s` | |
| `HTTP_WRITE_TIMEOUT` | `15s` | Keep it above `AUTH_TIMEOUT` plus the longest operation timeout |
| `HTTP_IDLE_TIMEOUT` | `60s` | |
| `HTTP_SHUTDOWN_TIMEOUT` | `10s` | How long to let requests finish on shutdown |
| `CORS_ALLOWED_ORIGINS` | empty | Exact origins, comma-separated. Empty turns CORS off. |

Durations use Go syntax, like `750ms`, `8s` or `2m`.

## Timeouts per operation

| Variable | Default | Covers |
| --- | --- | --- |
| `DATABASE_CHECK_TIMEOUT` | `2s` | Connecting to Postgres and the `/ready` check |
| `AUTH_TIMEOUT` | `5s` | Verifying a token and loading the account |
| `PROVISIONING_TIMEOUT` | `8s` | Creating accounts |
| `ACCOUNT_MANAGEMENT_TIMEOUT` | `8s` | Account changes, and each retry of a revocation |
| `STUDENT_PROFILE_TIMEOUT` | `8s` | Student profile reads and writes |
| `INVENTORY_TIMEOUT` | `8s` | Blocks, rooms and beds |

## Attendance and open hours

`ATTENDANCE_COOLDOWN` (default `10s`, maximum `5m`) is how long a repeat scan of the same student is ignored.

`HOSTEL_TIMEZONE`, `HOSTEL_EXIT_OPENING` and `HOSTEL_ENTRY_DEADLINE` set the hostel's open hours. The defaults are `Asia/Colombo`, `06:00` and `20:00`. The deadline has to be later than the opening time. [Movement policy](/guides/movement-policy/) explains how they're used.

## Optional services

These are all off by default. Turn each one on once the service behind it is set up.

`RTDB_ENABLED=true` publishes live headcounts to Firebase Realtime Database. It also needs `FIREBASE_DATABASE_URL`, and you should deploy `firebase/database.rules.json` from the backend repository first.

`R2_ENABLED=true` stores profile and complaint photos in a private Cloudflare R2 bucket. It needs `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`. While it's off, the photo endpoints return 503 and everything else works.

`FCM_ENABLED=true` sends push notifications to phones through Firebase Cloud Messaging.

`STUDENT_INVITATIONS_ENABLED=true` turns on email invitations for new students. Set `STUDENT_EMAIL_DOMAINS` to the domains your students' addresses use. It defaults to `gmail.com,stu.kln.ac.lk`, which you'll want to change.

## A starting `.env.local`

```ini
APP_ENV=development
HTTP_ADDR=127.0.0.1:18080
DATABASE_URL=postgres://hostelhive:REPLACE_ME@127.0.0.1:15433/hostelhive?sslmode=disable
FIREBASE_PROJECT_ID=your-firebase-project-id
GOOGLE_APPLICATION_CREDENTIALS=C:/private/hostelhive-service-account.json
CORS_ALLOWED_ORIGINS=http://localhost:5173
RTDB_ENABLED=false
R2_ENABLED=false
FCM_ENABLED=false
STUDENT_INVITATIONS_ENABLED=false
```

The launcher is strict about this file. It accepts `KEY=value` lines and whole-line `#` comments, and rejects duplicate keys, comments at the end of a line, and any variable that isn't in `.env.example`.
