# Source publication status

Initial GitHub mirror created from the verified live Apps Script backup.

Published directly:
- project metadata and manifest
- complete file index
- Apps Script manifest
- V57 one-file backup module
- V64A global read-only audit module
- V65B public-safe script 97 source pieces audit module
- Backup Drive / CLASP / GitHub runbook
- V67 script naming and fusion doctrine
- V67 script renaming target map
- V68 script rationalization plan
- V68 script migration matrix
- V69 menu host audit
- V69 menu item matrix
- V69B public-safe menu inventory
- V69B target menu map
- V69C candidate menu map no-apply
- V69C candidate menu tree
- V69C preflight checklist
- V69D menu patch candidate no-apply
- V69D onOpen replacement candidate as documentation
- V69D preflight result
- V69E backup live gate
- V69E detailed backup action
- V69E preflight gate
- V69F fresh backup verification and menu comparison
- V69F file delta
- V69F preflight result
- V69G controlled menu install plan
- V69G detailed install action
- V69G preflight checklist
- V69G rollback plan
- V70 menu Backup Drive / CLASP / GitHub candidate
- V70 onOpen replacement candidate as public-safe documentation
- V70R2 active menu merge-preserve status
- V70R3 legacy menu host onOpen neutralization status
- V71 Backup Drive / CLASP / GitHub sync status

The remaining historical business scripts are preserved byte-for-byte in the verified Drive ZIP identified by trace `d85a1fb4` and SHA-256 `5d7a1f657280110f2f194eac25807039db642a6270986eec8d8bf6a25ec5cb98`.

V65 decision:
- raw script 97 is operationally read-only, but raw public publication is blocked because it contains internal Google Drive folder IDs.

V65B decision:
- publish only the public-safe script 97 variant;
- keep private Drive IDs in Apps Script Script Properties;
- do not commit property values;
- keep the raw script in the verified Drive ZIP source of truth.

V67 decision:
- do not multiply Apps Script files by default;
- fuse by business domain, technical function, or UI surface when useful;
- converge installed scripts toward coherent `HPIA_<DOMAIN>_<ROLE>_<SCOPE>_vNN.gs` names;
- hold V66 installation until a naming/fusion decision is made;
- keep one real `onOpen` only.

V68 decision:
- apply V67 to the full installed script landscape;
- V66 remains held and must not be installed as isolated sprawl;
- the next safe step is V69 menu host audit, because the menu host contains the only real `onOpen`;
- no Apps Script mutation, no CLASP, no install, no rename in V68.

V69 decision:
- the menu host is confirmed as the only real `onOpen`;
- raw menu source is not published because it contains private Drive configuration;
- split user menu and admin/dev menu before any patch;
- classify dry-run functions that append QA/staging/register rows as staging/log writes, not strict read-only;
- next safe step is V69B public-safe menu inventory and candidate menu map.

V69B decision:
- recommended user menu is reduced to safety, dashboard, import test control, version, help;
- admin/dev menu carries governance, imports/staging, Drive scans, UI/protections and diagnostics;
- functions with Drive scans, staging writes, QA append or protection actions should not be exposed in the normal user menu;
- next safe step is V69C candidate menu map, still no apply.

V69C decision:
- candidate menu map produced for user/admin-dev split;
- still no Apps Script patch, no install, no CLASP and no active menu mutation;
- V66 remains held and must not be mixed with menu work;
- V69D can only be a code-only patch candidate after a fresh live Drive backup, function existence preflight, one-`onOpen` verification and explicit human approval.

V69D decision:
- a code-only replacement candidate for the existing `onOpen()` block was prepared;
- the candidate is published as documentation only, not under `apps-script/`;
- it must not be added as a new Apps Script file, because that would create a second `onOpen`;
- no Apps Script mutation, no install and no CLASP were performed;
- V69E is blocked until a fresh live Drive backup is created and compared with the d85a1fb4 base.

V69E decision:
- gate opened for a fresh live Apps Script backup before any menu installation;
- no Apps Script menu patch, no CLASP and no GitHub script push were performed;
- waiting for user-provided `HPIA_V57_backupSourceToDriveApply` log with `zipFileId`, `zipUrl`, `traceId`, `fileCount` and `blobCount`;
- V69F will verify the new ZIP and compare the menu host before any installation plan.

V69F decision:
- fresh live backup `21449c49` was created in Drive by Apps Script and verified from the user log;
- fileCount increased from `14` to `16`, blobCount from `19` to `21`;
- the two added scripts are `HPIA_P0A_READINESS_AUDIT_DRY_RUN.gs` and `97_GDVG_V44A2_SOURCE_PIECES_AND_IMPORT_MODELS_AUDIT_NO_WRITE_INSTALL_READY.gs`;
- the menu host `GDVG Cockpit - Controles & Reservations.gs` is stable versus `d85a1fb4` by ZIP entry CRC/size comparison;
- V69D does not require rebase before the next controlled installation planning step;
- no Apps Script mutation, no CLASP, no active menu apply and no active script publication were performed.

V69G decision:
- controlled installation plan prepared for the V69D menu candidate;
- target remains the existing `onOpen` block in `GDVG Cockpit - Controles & Reservations.gs` only;
- no new Apps Script file may be created;
- no second `onOpen` is allowed;
- rollback and preflight are documented;
- no Apps Script mutation, no CLASP, and no active menu apply were performed in V69G;
- next action requires explicit `GO INSTALL MENU`.

V70 decision:
- V69D did not expose Backup Drive / CLASP / GitHub in the Admin Dev menu;
- V70 prepares a complete current replacement menu block plus safe helper functions;
- Backup Drive is active through the installed V57 functions;
- CLASP is not executable from Apps Script and remains an operator-controlled workflow;
- GitHub auto-push from Apps Script is not active and is not added by V70;
- the public GitHub candidate redacts private Drive folder details; use the Drive-ranged V70 file for installation;
- no Apps Script mutation, no CLASP, no GitHub write from Apps Script, no second `onOpen`, and no new Apps Script file were performed.

V70R2 decision:
- complete merge-preserve menu replacement prepared and installed by the operator;
- two top-level menus are expected: `HeberPilot IA` and `HPIA Admin Dev`;
- Backup Drive is active through V57 functions;
- CLASP and GitHub are visible as status/handoff workflows, not automatic execution;
- Help/Aide, controls, reservations, governance, imports, reviews, UI/protection and diagnostics entries are preserved.

V70R3 decision:
- the historical GDVG Cockpit menu host must no longer expose its own active `function onOpen()` once V70R2 is the active menu host;
- the legacy onOpen is neutralized as `HPIA_LEGACY_onOpen_DISABLED_v70_20260721` in the complete replacement file;
- business functions in the historical file are preserved;
- final cleanup and renaming must be handled in a later dedicated script rationalization wave.

V71 decision:
- latest live backup `510276fd` was created by V57 with `fileCount=17` and `blobCount=22`;
- Drive ZIP file is `16KTU_qtN9oZC-LIALsjHrns0k08JSOeW` and is the latest source-of-truth backup at this gate;
- the V57 process creates Backup Drive + CLASP-ready structure + GitHub handoff artifacts;
- the V57 process does not execute local CLASP and does not push GitHub automatically;
- GitHub was updated with this public-safe V71 status document;
- no Apps Script mutation, no CLASP operation and no GitHub auto-push from the sheet/menu were performed in V71.

Three additional read-only candidates passed static audit but were rejected by the connected publication channel during payload safety validation. The Drive ZIP remains the source of truth for future controlled imports.