# HPIA V70R3 - GDVG Cockpit legacy onOpen disabled

Status: `READY_HPIA_V70R3_GDVG_COCKPIT_LEGACY_ONOPEN_DISABLED`

## Problem

After creating a dedicated V70 menu script, the historical file `GDVG Cockpit — Contrôles & Réservations.gs` must not keep an active `function onOpen()`.

Otherwise the Apps Script project may contain two menu entry points.

## Decision

Keep the historical GDVG Cockpit file as a function library, but disable its legacy menu entry point.

The former `function onOpen()` is renamed to:

`HPIA_LEGACY_onOpen_DISABLED_v70_20260721`

## Preservation

The correction preserves the existing GDVG functions:

- version/help;
- safety status;
- dashboard dry-run;
- reservation imports;
- Drive scans;
- reviews;
- UI/protections;
- QA helpers;
- historical business utilities.

## Expected project state

Exactly one active `function onOpen()` should remain in the Apps Script project, carried by the V70R2 menu file.

## Safety

No Apps Script mutation was performed by Codex.
No CLASP.
No GitHub operational script push.
The complete corrected file is stored in the private Drive V70R3 folder.
