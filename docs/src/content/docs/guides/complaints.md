---
title: Complaints
description: Submitting, tracking and resolving maintenance and disciplinary complaints.
---

A complaint is either maintenance (a broken tap, a dead light) or disciplinary. Admins and Wardens handle both kinds. Sub-Wardens only ever see maintenance complaints, and that's enforced by the backend, not just hidden in the interface. Students only see their own.

## From report to resolved

A student writes up to 2000 characters, picks the category and submits. While it's still pending they can attach photos. Until it's resolved, both they and staff can add notes.

Staff move it from pending to in progress, and from either of those to resolved. A resolved complaint can be reopened. Resolving and reopening both need a short explanation, which the student sees.

Nothing is ever deleted or edited after the fact. The original description, category and author stay as they were, and every note and status change is added to a history with who did it and when.

:::caution
Students can read every note on their own complaint. There's no private staff-only note yet, so don't write anything there you wouldn't say to them.
:::

## Photos

Photos must be JPEG or PNG. They're checked, re-encoded and stored in a private Cloudflare R2 bucket, which means `R2_ENABLED=true` on the backend. They're only shown through the API to people allowed to see that complaint. There are no public links to them.

## Two people at once

Each staff action carries the version of the complaint it was based on. If someone else changed it in the meantime, the action is refused with 409. Reload, read what changed, and decide whether your action still makes sense.

## Who gets told

A new maintenance complaint alerts active Wardens and Sub-Wardens. A new disciplinary complaint alerts active Wardens only. A status change alerts the student who filed it. Notes and photos don't send alerts.

The alert itself only says what happened and links to the complaint. The text and photos stay behind the link.
