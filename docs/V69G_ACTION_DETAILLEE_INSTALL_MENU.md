# HPIA V69G - Detailed controlled menu install action

## Important

Do not create a new Apps Script file.

Do not paste the V69D candidate into a separate file.

Modify only the existing `onOpen` in:

`GDVG Cockpit - Controles & Reservations.gs`

## Steps

1. Open the MASTER Google Sheet.
2. Open Extensions > Apps Script.
3. Search for `function onOpen`.
4. Confirm there is exactly one occurrence, in the GDVG Cockpit host.
5. Run a live backup before editing with `HPIA_V57_backupSourceToDriveApply`.
6. Replace only the existing `function onOpen() { ... }` block with the validated V69D candidate.
7. Save Apps Script.
8. Reload the Google Sheet.
9. Check the expected user menu and admin/dev menu surfaces.
10. Run a live backup after editing.
11. Reset `HPIA_V57_ALLOW_SOURCE_BACKUP_WRITE` to `FALSE`.

## Stop conditions

Stop immediately if:

- more than one `onOpen` exists;
- syntax error appears;
- menu duplicates appear;
- an admin/dev action appears in the normal user menu;
- anything outside `onOpen` was changed.
