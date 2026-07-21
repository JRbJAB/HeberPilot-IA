# HPIA V69G - Controlled menu install plan

Status: `READY_HPIA_V69G_CONTROLLED_MENU_INSTALL_PLAN_NO_APPLY`

## Validated base

V69F confirms that the fresh live backup `21449c49` is stable for the menu host.

Target menu host:

`apps-script/GDVG Cockpit - Controles & Reservations.gs`

The V69D candidate does not require rebase.

## Goal

Prepare controlled installation of the user/admin-dev split menu inside the existing host, without adding a new Apps Script file.

## Mandatory doctrine

- one real `onOpen` only;
- do not create a second menu file;
- do not install V69D as a separate Apps Script file;
- replace only the existing `function onOpen()` block in the host;
- preserve all existing business/UI functions;
- no CLASP;
- live backup before and after;
- rollback documented.

## Authorized future scope

Single file:

`GDVG Cockpit - Controles & Reservations.gs`

Single block:

`function onOpen() { ... }`

## Out of scope

- `70_GDVG_GOUVERNANCE_ONGLETS_UI.gs`;
- import modules;
- reviews modules;
- tax modules;
- backup scripts;
- `appsscript.json`;
- triggers;
- sheet protections;
- sheet tabs.

## Gate

V69G prepares the install but does not apply it.

Required explicit phrase for action:

`GO INSTALL MENU`
