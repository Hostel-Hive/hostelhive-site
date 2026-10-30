---
title: Movement policy
description: When students need approval to enter or leave, Going Home declarations and late-access requests.
---

The rule is simple. Between 06:00 and 20:00, students come and go freely. Before 06:00, or from 20:00 onwards, they need an Admin or Warden to approve it in advance. Exactly 06:00 is free, exactly 20:00 isn't.

Each scan is judged by when it actually happens, in the hostel's timezone. A trip can last days, and only the moments of leaving and coming back are checked. You can change the hours and the timezone with `HOSTEL_EXIT_OPENING`, `HOSTEL_ENTRY_DEADLINE` and `HOSTEL_TIMEZONE`.

## Going Home

When a student leaves for home, they tap "I am going home now" in the app. That replaces the line they'd have written in the signing book. There's no approval, no return date and no destination to fill in. They have to be IN when they tap it, and the next OUT scan marks them as departed.

Going Home doesn't get anyone around the open hours. Leaving for home at 21:00 still needs an approved late-access request.

## Late-access requests

For a movement outside open hours, the student asks beforehand. They choose the direction, roughly when they'll be at the gate, and why:

```json
POST /api/v1/late-access-requests
{
  "request_id": "6b0e1f3a-8c2d-4f6e-9a41-0d2c7b5e9f13",
  "direction": "IN",
  "expected_at": "2026-11-02T21:30:00+05:30",
  "reason": "Returning from a faculty event"
}
```

Requests for times inside open hours, or in the past, are turned down straight away. Admins and Wardens approve or reject the rest from the dashboard, and the student is told either way in their inbox (and by push notification, if that's on). A student can cancel a request while it's still pending.

## Matching scans to approvals

When someone scans outside open hours, the backend looks for an approved, unused request in the same direction whose time is within 30 minutes either side of the scan. If there is one, it's used up and the movement goes through like any other.

If there isn't, the movement is still recorded and staff get an incident. An OUT before opening is an `early_exit`, an OUT at or after closing is a `late_exit`, and any IN outside open hours is a `late_entry`. The gate opens and shows LATE - REPORTED. Leaving a student locked outside at night isn't an acceptable way to enforce a rule.

:::note
Older versions had a separate leave-request process with a yearly allowance. It has been retired, and its write endpoints now return 410 Gone. Past leave records and the leave report are still there.
:::
