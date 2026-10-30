---
title: Roles and permissions
description: What each HostelHive role can see and do.
---

Every account has one role, and it's stored in HostelHive's database, not in Firebase. The backend looks it up again on every request, together with whether the account is active. So if you change someone's role or switch their account off, it applies to their very next click. Roles don't inherit from each other either. Each endpoint names exactly which roles may use it.

## The five roles

Admins run the system. On top of everything a Warden can do, they manage accounts, invite students, edit the room inventory and register gate scanners.

Wardens run the hostel day to day. They watch who's in and out, decide late-access requests, handle all complaints, assign beds, publish notices and pull reports.

Sub-Wardens handle maintenance complaints and nothing else. They never see disciplinary complaints, even by guessing an ID.

Security staff is a role reserved for gate duty. It doesn't open any dashboard pages yet.

Students see and change only their own things: profile details, QR pass, requests, complaints and notices.

## Who can do what

| | Admin | Warden | Sub-Warden | Student |
| --- | :-: | :-: | :-: | :-: |
| Manage accounts and roles | Yes | | | |
| Invite or import students | Yes | | | |
| Edit student profiles and photos | Yes | Yes | | Own phone and guardians |
| Register and rotate gate scanners | Yes | | | |
| Browse blocks, rooms and beds | Yes | Yes | | |
| Add or rename blocks, rooms and beds | Yes | | | |
| Assign, move or remove beds | Yes | Yes | | |
| Live presence and incidents | Yes | Yes | | Own history |
| Late-access requests | Decide | Decide | | Submit, cancel |
| Going Home | | | | Declare |
| Complaints | All | All | Maintenance | Own |
| Notices | Publish | Publish | | Read |
| Reports and exports | Yes | Yes | | |

## Account states that block access

An inactive account gets 403 on everything, even if its Firebase login still works.

An invited student who hasn't finished setting up can only call `GET /api/v1/me` and `POST /api/v1/me/setup/complete` until they do.

An archived student profile can't be used for anything new, but its history stays in reports.

There's always at least one active Admin. HostelHive refuses to demote or deactivate the last one.
