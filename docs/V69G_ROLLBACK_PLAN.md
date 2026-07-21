# HPIA V69G - Menu rollback plan

## Rollback triggers

- Apps Script syntax error;
- menu missing after spreadsheet reload;
- duplicated menu or second `onOpen`;
- admin action exposed in the user menu;
- spreadsheet load error;
- suspicion that anything outside `onOpen` changed.

## Rollback source

The live backup created immediately before installation.

## Procedure

1. Open the pre-install backup ZIP.
2. Extract `apps-script/GDVG Cockpit - Controles & Reservations.gs`.
3. Recover only the previous `function onOpen() { ... }` block.
4. Replace only the current `onOpen` block in Apps Script.
5. Save.
6. Reload the Sheet.
7. Confirm one `onOpen` only.
8. Create a fresh live backup after rollback.

## Forbidden

- do not replace the whole project;
- do not run `clasp push`;
- do not delete business scripts;
- do not modify `70_GDVG_GOUVERNANCE_ONGLETS_UI.gs`;
- do not create a second menu.
