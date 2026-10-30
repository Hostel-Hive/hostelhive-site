---
title: Database migrations
description: Apply, verify and write PostgreSQL migrations for the HostelHive backend.
---

The schema is built from numbered SQL files in `migrations/`, applied with [golang-migrate](https://github.com/golang-migrate/migrate). The exact version, v4.20.1, is pinned in `.migrate-version`. The server never migrates on its own, so you run this step whenever a release asks for it.

## Installing the tool

```powershell
.\scripts\install-migrate.ps1
```

This puts a Postgres-only build of the CLI in `bin/`, which Git ignores. Go needs to be on your `PATH`.

## Applying migrations

```powershell
$env:DATABASE_URL = 'postgres://hostelhive:local-dev-only@127.0.0.1:15433/hostelhive?sslmode=disable'
.\scripts\migrate.ps1 up
.\scripts\migrate.ps1 version
```

`.\scripts\dev.ps1 -Migrate` does the same and then starts the server. Running `up` when there's nothing new is harmless.

For a hosted database, set `DATABASE_URL` to its address (with TLS) in a terminal you trust and run the same command. Take a backup first if the data matters. Release notes say when a migration is needed, for example "apply migration 000030 before starting this version".

## Rolling back

```powershell
.\scripts\migrate.ps1 down
```

This undoes exactly one migration. Down scripts refuse to drop anything that other objects still depend on, so they fail rather than quietly delete data. Read the down SQL before running it on a database you care about.

If a migration fails halfway, golang-migrate marks the version as dirty. Fix the SQL or the database first. Forcing the version number without fixing the cause just hides the problem.

## Testing migrations

```powershell
.\scripts\test-migrations.ps1
```

This needs Docker. It creates a temporary Postgres 16 container, applies every migration, rolls them back, applies them again, runs the constraint tests in `tests/migration/`, and removes the container. It ignores your `DATABASE_URL`.

## Writing a new one

Add the next pair in sequence, such as `000032_description.up.sql` and `000032_description.down.sql`, and commit them together. Use schema-qualified names like `hostelhive.students`, because the migrations don't change `search_path`.

Never edit a migration that has already been applied anywhere. Write a new one that changes what you need.
