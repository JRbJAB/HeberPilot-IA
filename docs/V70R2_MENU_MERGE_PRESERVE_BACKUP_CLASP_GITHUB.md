# HPIA V70R2 - Menu merge-preserve Backup / CLASP / GitHub

Status: `READY_HPIA_V70R2_COMPLETE_REPLACEMENT_MERGE_PRESERVE_NO_APPLY`

## Why V70R2 exists

V70/V70R1 could lose historical menu entries if the installed `onOpen` was richer than the simplified candidate.

V70R2 corrects the approach:

- complete replacement script;
- merge-preserve of known menus;
- Backup Drive / CLASP / GitHub added;
- help menus preserved;
- no second `onOpen`;
- no script sprawl.

## Menus preserved / added

- `HéberPilot IA / Contrôles rapides`
- `HéberPilot IA / Réservations`
- `HéberPilot IA / Aide`
- `HPIA Admin Dev / Backup Drive / CLASP / GitHub`
- `HPIA Admin Dev / Gouvernance`
- `HPIA Admin Dev / Imports & staging`
- `HPIA Admin Dev / Avis & réputation`
- `HPIA Admin Dev / UI / protections`
- `HPIA Admin Dev / Aide & documentation`
- `HPIA Admin Dev / Diagnostics`

## Runtime truth

Backup Drive is active via the installed V57 module.

CLASP is not active from Apps Script because Apps Script cannot execute the local `clasp` binary.

GitHub auto-push from Apps Script is not active and is not added by V70R2.

## Installation rule

The user has created a V70 script file. Replace its full content with the V70R2 complete script and ensure only one `function onOpen` exists across the Apps Script project.

If a legacy `onOpen` still exists in the old menu host, neutralize it by renaming it to a disabled legacy function.

## Safety

No Apps Script mutation by Codex.
No CLASP.
No GitHub write from Apps Script.
No second `onOpen`.
