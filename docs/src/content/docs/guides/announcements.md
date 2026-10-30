---
title: Notices and alerts
description: Publishing hostel notices, the in-app inbox and mobile push notifications.
---

## Notices

Admins and Wardens can post a notice to every student or to one faculty. A notice has a title of up to 160 characters and a body of up to 5000, in plain text with line breaks allowed. It goes out the moment you publish it.

Published notices can't be edited or taken down. If you got something wrong, publish a correction. For each notice, staff can see how many students it reached and how many have read it.

The audience is fixed when you publish. Students who join later can still read older hostel-wide notices, but they won't get an alert for them.

## The inbox

Everyone has a private inbox with an unread count. It collects new notices, decisions on late-access requests, complaint alerts ([who gets which](/guides/complaints/#who-gets-told)), and, for staff, attendance incidents. Each alert is a title and a link. Open it to see the current state of the thing it's about.

## Push notifications

With Firebase Cloud Messaging set up in the app and `FCM_ENABLED=true` on the backend, phones get push notifications as well. Students are pushed decisions on their requests, and staff are pushed unapproved attendance incidents. The app registers each phone with the backend through `PUT /api/v1/me/push-devices/{deviceID}`.

Phones don't always receive pushes, so treat them as a nudge. The inbox is the record of what was sent.
