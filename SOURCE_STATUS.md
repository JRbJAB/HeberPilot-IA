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

Three additional read-only candidates passed static audit but were rejected by the connected publication channel during payload safety validation. The Drive ZIP remains the source of truth for future controlled imports.
