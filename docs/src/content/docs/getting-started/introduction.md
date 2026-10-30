---
title: What HostelHive is
description: What HostelHive does, who uses it, and how the code is organised.
---

HostelHive runs the day-to-day of a student hostel. Students tap a QR pass at the gate instead of writing in the signing book, and staff see who is in or out from a dashboard. The same system covers late-access requests, complaints, room and bed allocation, notices and reports.

It began as a third-year System Development Project (SENG 34213) at the University of Kelaniya. Nothing in the code is tied to one hostel, so you can run it for yours.

## Who uses it

Students use the mobile app or the web portal. They show their QR pass at the gate, ask for permission to come back late, file complaints, and read notices.

Wardens work from the staff dashboard. They watch live presence, approve or reject late-access requests, handle complaints and pull reports.

Admins have everything a Warden has, plus account management, student invitations, room inventory and the gate scanners themselves. Sub-Wardens only see maintenance complaints. The full breakdown is on [Roles and permissions](/guides/roles/).

## How the code is split

There are four repositories in the [Hostel-Hive organisation](https://github.com/Hostel-Hive). You can deploy each one on its own.

[hostelhive-backend](https://github.com/Hostel-Hive/hostelhive-backend) is the Go API. It owns the PostgreSQL database, checks every Firebase sign-in, and runs the background jobs that send notifications and publish live counts.

[hostelhive-frontend](https://github.com/Hostel-Hive/hostelhive-frontend) holds the React web app in its `web/` folder. One build serves both the staff dashboard and the student portal.

[hostelhive-mobileapp](https://github.com/Hostel-Hive/hostelhive-mobileapp) is the Flutter app for students.

[hostelhive-hardware](https://github.com/Hostel-Hive/hostelhive-hardware) is the firmware for the ESP32 gate scanners, plus a Wokwi circuit so you can test it without any parts.

If you want everything running on your machine, go to the [quick start](/getting-started/quick-start/). For how the pieces talk to each other, read [Architecture](/getting-started/architecture/).
