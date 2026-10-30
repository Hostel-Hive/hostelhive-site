---
title: Attendance
description: How QR scans become attendance, presence and live dashboard counts.
---

Only gate scans change whether a student is in or out. Approving a request, declaring Going Home, or editing a profile never does.

## The QR pass

Each active student has one pass, a 320 by 320 PNG. It encodes `HH1:` and a random identifier, and nothing about the student. Students open it in the app or the web portal. Admins and Wardens can fetch any eligible student's pass too, which is handy for printing a card.

## What counts as a movement

When a scanner sends a pass, the backend takes the direction from that scanner's setup and the time from its own clock, not the device's. If the same student was scanned within `ATTENDANCE_COOLDOWN` (10 seconds unless you change it), the scan is ignored. So is scanning in when they're already in, or out when they're already out. Everything else is recorded, and their presence changes in the same database transaction.

Scanners resend the same `event_id` when they retry, so a flaky connection can't count one walk through the gate twice.

## Presence

Every student is IN, OUT or UNKNOWN, which means they haven't been scanned yet. The dashboard shows the three totals, lets staff list and search students by status, name or index number, and opens anyone's movement history.

This is what the gates recorded, which isn't quite the same as where people are. Someone who climbs the fence is still IN.

## Live counts

With `RTDB_ENABLED=true` the totals update on staff screens within a few seconds of a scan, through Firebase Realtime Database. Only the numbers and a version stamp go there. When the stamp changes, the dashboard fetches the details from the API. Each staff screen gets a read grant that lasts five minutes and renews itself while the page is open.

## Incidents

A scan outside open hours without an approved request still counts as a movement, because the student really did walk through. It also creates an incident, `late_entry`, `early_exit` or `late_exit`, which staff see on the dashboard and in their inbox. The rules are on [Movement policy](/guides/movement-policy/).

Students can see their own movement history in the app, filtered by date and direction.
