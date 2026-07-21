# HPIA V71 - Backup Drive / CLASP / GitHub sync status

Status: OK_HPIA_V71_LATEST_BACKUP_DRIVE_VERIFIED_GITHUB_TRACE_READY
Date: 2026-07-21

## Latest live backup

Latest user-run Apps Script backup:

- mode: APPLY
- traceId: 510276fd
- fileCount: 17
- blobCount: 22
- zipFileId: 16KTU_qtN9oZC-LIALsjHrns0k08JSOeW
- zipUrl: https://drive.google.com/file/d/16KTU_qtN9oZC-LIALsjHrns0k08JSOeW/view?usp=drivesdk
- Drive title: hpia_apps_script_live_source_backup_20260721_051234_510276fd.zip
- Drive size: 77,610 bytes

The backup was created by the installed Apps Script module HPIA V57 from live Apps Script source.

## What the V57 process does

The V57 process creates a Drive ZIP containing the live Apps Script source plus handoff artifacts:

- apps-script/appsscript.json
- apps-script/*.gs
- .clasp.json
- CLASP_GITHUB_HANDOFF.md
- _backup_manifest.json
- _file_index.csv
- README.md

## What the V57 process does not do

The V57 process does not execute local CLASP and does not push to GitHub automatically.

This is intentional:

- Apps Script cannot execute the local clasp binary.
- GitHub push is kept as a controlled human-approved step.
- The backup ZIP is the source of truth before any GitHub sync.

## Current menu state

V70R2 is the active complete menu replacement doctrine:

- two top-level menus are expected: user menu and admin/dev menu;
- one real onOpen should remain in the whole Apps Script project;
- backup is surfaced as a menu action/status, but write APPLY remains gated by script property;
- CLASP and GitHub remain operator workflows, not automatic menu pushes.

V70R3 neutralizes the legacy historical onOpen in the old GDVG menu host when installed.

## GitHub status

GitHub repository:

- repo: JRbJAB/HeberPilot-IA
- branch: main

GitHub receives public-safe source/docs only. Private Drive IDs or operational secrets must remain in Drive and Apps Script properties, not in public GitHub source.

## Decision

GitHub can be updated with this V71 public-safe trace.

Raw full source sync from the latest ZIP requires one of these:

1. a connector-safe file-by-file publication from the ZIP contents;
2. an operator-controlled local CLASP/GitHub workflow from the Drive ZIP;
3. a future Apps Script/GitHub bridge using a protected token in Script Properties, after a separate security gate.

No Apps Script mutation, no CLASP, and no automatic GitHub push from the sheet/menu are performed by V71.
