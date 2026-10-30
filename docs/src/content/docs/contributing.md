---
title: Contributing
description: Branching, commits and checks for HostelHive repositories.
---

Contributions to any repository in the [Hostel-Hive organisation](https://github.com/Hostel-Hive) are welcome. Every repo works the same way.

Start with an issue, either one that's already open or a new one describing what you want to change. Branch from `develop`, naming the branch after the issue, like `feature/123-incident-filter` or `fix/123-wrong-timezone`. Write commit messages in the [Conventional Commits](https://www.conventionalcommits.org/) style and mention the issue in the body:

```text
feat(attendance): filter incidents by direction

Refs #123
```

Open the pull request against `develop` with `Closes #123` in the description. It needs one approving review and green CI before it can merge. Releases go from `develop` to `main` through a separate reviewed pull request.

## Run the checks before you push

| Repository | Commands |
| --- | --- |
| Backend | `gofmt -l ./cmd ./internal ./tests`, `go vet ./...`, `go test ./...`, `go build ./...`, and the `scripts/test-*.ps1` suite for whatever you changed |
| Web | `npm run lint`, `npm run format:check`, `npm run test:coverage`, `npm run build` |
| Mobile | `dart format --set-exit-if-changed .`, `flutter analyze`, `flutter test`, `flutter build apk --debug` |
| Firmware | `pio test -e native_test`, `pio run -e esp32prod` |
| These docs | `npm run build` in `docs/` |

## House rules

Keep text and examples free of any particular hostel's name, email domain or office. HostelHive is meant to be run by anyone.

Never commit secrets. That covers service-account files, `.env.local`, `secrets.h`, scanner credentials and tokens. Use made-up names in issues and screenshots.

Don't edit a migration that has already been applied anywhere. Add a new one.

In the backend, modules talk to each other through services. Importing another module's repository will fail the architecture test.

To fix something in these docs, use the "Edit page" link at the bottom of any page. The source is in [hostelhive-site](https://github.com/Hostel-Hive/hostelhive-site) under `docs/src/content/docs/`.
