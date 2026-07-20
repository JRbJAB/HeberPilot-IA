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

Three additional read-only candidates passed static audit but were rejected by the connected publication channel during payload safety validation. The Drive ZIP remains the source of truth for future controlled imports.
