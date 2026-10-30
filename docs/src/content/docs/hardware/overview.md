---
title: Gate scanners
description: How the HostelHive ESP32 gate scanner works and why it fails closed.
---

Each gate has a small box built around an ESP32-WROOM-32. It reads the QR pass a student holds up, asks the backend over HTTPS whether to let them through, and then works the lock, a small OLED screen, two LEDs and a buzzer.

## A scan, start to finish

The QR module sends whatever it read over a serial line. The firmware throws away anything that isn't `HH1:` followed by 64 lowercase hex characters, so random barcodes never reach the network. If the same pass was scanned in the last 15 seconds, the screen says DUPLICATE SCAN and nothing is sent.

Otherwise the box posts the code to `/api/v1/device/scans` with its own credential. It doesn't say whether this is the way in or the way out. The backend already knows that from how an Admin set up this scanner.

The lock opens only when the backend answers 200 with an outcome of `recorded`, `cooldown`, `already_in` or `already_out`. Then the green LED lights, the buzzer chirps and the relay holds the lock open for three seconds.

A student coming in after hours without an approved request is still let through. The screen shows LATE - REPORTED and staff get an incident. The alternative, leaving someone outside the gate at night, is worse.

## When something goes wrong, the gate stays shut

An unknown or deactivated student sees INVALID / INACTIVE PASS. A scanner nobody has assigned a direction to shows GATE NOT CONFIGURED. One whose credential was rotated or revoked shows GATE NOT AUTHORIZED. No Wi-Fi, a timeout or a server error all end in OFFLINE - LOCKED, with a prompt to contact security.

Scans are never saved up and sent later. A student who was refused didn't go anywhere, so replaying that scan once the network returns would record a movement that never happened. Instead, staff have a manual override button. It has to be held for a full second, and every use is written to `/override_log.jsonl` on the box's flash. Type `overrides` in the serial console to read it back.

## Other safeguards

The firmware won't compile without `include/secrets.h`. Even then it refuses to run, showing GATE NOT PROVISIONED, unless the credential looks right, the backend address starts with `https://` and a root certificate is set.

It checks the server's certificate against that one pinned root and never follows redirects, so the credential can't be sent to another host. The production build, `esp32prod`, also ignores QR input from the USB port and can't be switched to plain HTTP. Passes and credentials are never printed in full to the serial log; you'll only see something like `HH1:0123...`.

To build one, start with [Wiring and parts](/hardware/wiring/), then [Configure and flash](/hardware/setup/). To try it without any parts, use the [Wokwi simulation](/hardware/simulation/).
