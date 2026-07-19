/**
 * GDVG v4.4A2 - Source pieces + import models audit PUBLIC SAFE
 * Version: HPIA_V65B_PUBLIC_SAFE_2026_07_19
 *
 * Public-safe doctrine:
 * - no private Drive folder ID is hardcoded in this source;
 * - Drive IDs must live in Apps Script Properties;
 * - no spreadsheet mutation;
 * - no Drive mutation;
 * - no menu, trigger, move, delete, rename or UI replacement.
 */

const GDVG_V44A2_PUBLIC_SAFE_CFG = Object.freeze({
  version: 'GDVG_V44A2_SOURCE_PIECES_AND_IMPORT_MODELS_AUDIT_NO_WRITE_PUBLIC_SAFE_2026_07_19',
  writeEnabled: false,
  driveWriteEnabled: false,
  bookingRootFolderIdProperty: 'GDVG_V44A2_BOOKING_ROOT_FOLDER_ID',
  yearFolderProperties: Object.freeze([
    'GDVG_V44A2_BOOKING_2023_FOLDER_ID',
    'GDVG_V44A2_BOOKING_2024_FOLDER_ID',
    'GDVG_V44A2_BOOKING_2025_FOLDER_ID',
    'GDVG_V44A2_BOOKING_2026_FOLDER_ID'
  ]),
  targetModelSheetName: '🔗 41_Modeles_Import_Partenaires',
  maxFilesToScan: 600,
  maxDepth: 6,
  safety: Object.freeze({
    noSpreadsheetMutation: true,
    noDriveMutation: true,
    noAutomaticMenu: true,
    noTriggerCreation: true,
    noSheetRenameDeleteMove: true,
    noUiScriptReplacement: true,
    manualExecutionOnly: true,
    metadataOnly: true,
    pdfTextParsing: false,
    publicSafeNoHardcodedDriveIds: true
  })
});

function GDVG_v44a2_configStatus_NO_WRITE() {
  const result = {
    version: GDVG_V44A2_PUBLIC_SAFE_CFG.version,
    mode: 'CONFIG_STATUS_ONLY_NO_WRITE',
    status: 'OK_PUBLIC_SAFE_CONFIG_KEYS_NO_VALUES_EXPOSED',
    requiredProperties: _gdvgV44A2_requiredPropertyKeys_(),
    configuredProperties: _gdvgV44A2_readKnownFolderProperties_(),
    writeEnabled: GDVG_V44A2_PUBLIC_SAFE_CFG.writeEnabled,
    driveWriteEnabled: GDVG_V44A2_PUBLIC_SAFE_CFG.driveWriteEnabled,
    safety: GDVG_V44A2_PUBLIC_SAFE_CFG.safety
  };
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function GDVG_v44a2_sourcePiecesAndImportModelsAudit_NO_WRITE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const bookingRootFolderId = _gdvgV44A2_getRequiredScriptProperty_(
    GDVG_V44A2_PUBLIC_SAFE_CFG.bookingRootFolderIdProperty
  );
  const root = DriveApp.getFolderById(bookingRootFolderId);
  const scan = _gdvgV44A2_scanFolderMetadata_(root);
  const result = {
    version: GDVG_V44A2_PUBLIC_SAFE_CFG.version,
    mode: 'SOURCE_PIECES_AND_IMPORT_MODELS_AUDIT_NO_WRITE_PUBLIC_SAFE',
    auditedAt: new Date().toISOString(),
    spreadsheetId: ss.getId(),
    spreadsheetName: ss.getName(),
    bookingRoot: {
      configured: true,
      name: root.getName(),
      idExposedInLogs: false
    },
    configuredFolders: _gdvgV44A2_readKnownFolderProperties_(),
    targetSheetAudit: _gdvgV44A2_auditTargetModelSheet_(ss),
    scanStats: scan.stats,
    yearSummary: _gdvgV44A2_buildYearSummary_(scan.files),
    profileSummary: _gdvgV44A2_buildProfileSummary_(scan.files),
    importModelDoctrine: _gdvgV44A2_importModelDoctrine_(),
    writeEnabled: GDVG_V44A2_PUBLIC_SAFE_CFG.writeEnabled,
    driveWriteEnabled: GDVG_V44A2_PUBLIC_SAFE_CFG.driveWriteEnabled,
    safety: GDVG_V44A2_PUBLIC_SAFE_CFG.safety
  };
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function GDVG_v44a2_importModelsSealStatus_NO_WRITE() {
  const result = {
    version: GDVG_V44A2_PUBLIC_SAFE_CFG.version,
    mode: 'SEAL_STATUS_ONLY_NO_WRITE',
    status: 'READY_PUBLIC_SAFE_NO_WRITE',
    retainedFunctions: [
      'GDVG_v44a2_configStatus_NO_WRITE',
      'GDVG_v44a2_sourcePiecesAndImportModelsAudit_NO_WRITE',
      'GDVG_v44a2_importModelsSealStatus_NO_WRITE'
    ],
    safety: GDVG_V44A2_PUBLIC_SAFE_CFG.safety
  };
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function _gdvgV44A2_requiredPropertyKeys_() {
  return [GDVG_V44A2_PUBLIC_SAFE_CFG.bookingRootFolderIdProperty]
    .concat(GDVG_V44A2_PUBLIC_SAFE_CFG.yearFolderProperties);
}

function _gdvgV44A2_getRequiredScriptProperty_(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) throw new Error('Missing required script property: ' + key);
  return value;
}

function _gdvgV44A2_readKnownFolderProperties_() {
  const props = PropertiesService.getScriptProperties();
  const out = {};
  _gdvgV44A2_requiredPropertyKeys_().forEach(function(key) {
    out[key] = { configured: Boolean(props.getProperty(key)), valueExposed: false };
  });
  return out;
}

function _gdvgV44A2_scanFolderMetadata_(root) {
  const files = [];
  const folders = [];
  const stats = { fileCount: 0, folderCount: 0, truncated: false };
  _gdvgV44A2_scanRecursive_(root, root.getName(), 0, files, folders, stats);
  stats.fileCount = files.length;
  stats.folderCount = folders.length;
  return { files: files, folders: folders, stats: stats };
}

function _gdvgV44A2_scanRecursive_(folder, path, depth, files, folders, stats) {
  if (depth > GDVG_V44A2_PUBLIC_SAFE_CFG.maxDepth) return;
  if (files.length >= GDVG_V44A2_PUBLIC_SAFE_CFG.maxFilesToScan) {
    stats.truncated = true;
    return;
  }
  folders.push({ name: folder.getName(), path: path, depth: depth });
  const fileIt = folder.getFiles();
  while (fileIt.hasNext()) {
    if (files.length >= GDVG_V44A2_PUBLIC_SAFE_CFG.maxFilesToScan) {
      stats.truncated = true;
      return;
    }
    const file = fileIt.next();
    files.push({
      title: file.getName(),
      mimeType: file.getMimeType(),
      size: _gdvgV44A2_safeGetSize_(file),
      folderPath: path,
      year: _gdvgV44A2_extractYear_(path + ' ' + file.getName()),
      sourceProfile: _gdvgV44A2_classifyProfile_(file.getName(), file.getMimeType(), path)
    });
  }
  const folderIt = folder.getFolders();
  while (folderIt.hasNext()) {
    const sub = folderIt.next();
    _gdvgV44A2_scanRecursive_(sub, path + ' / ' + sub.getName(), depth + 1, files, folders, stats);
  }
}

function _gdvgV44A2_safeGetSize_(file) {
  try { return file.getSize(); } catch (e) { return null; }
}

function _gdvgV44A2_classifyProfile_(title, mime, path) {
  const t = String(title || '').toLowerCase();
  const p = String(path || '').toLowerCase();
  const m = String(mime || '').toLowerCase();
  const isPdf = m.indexOf('pdf') !== -1 || t.endsWith('.pdf');
  const isZip = m.indexOf('zip') !== -1 || t.endsWith('.zip');
  const isCsv = m.indexOf('csv') !== -1 || t.endsWith('.csv');
  if (p.indexOf('relevé de réservations') !== -1 || p.indexOf('releve de reservations') !== -1 || t.indexOf('reservation') !== -1 || t.indexOf('réservation') !== -1) return isZip ? 'BOOKING_RESERVATION_STATEMENT_ZIP' : (isCsv ? 'BOOKING_RESERVATION_STATEMENT_CSV' : 'BOOKING_RESERVATION_STATEMENT_FILE');
  if (p.indexOf('informations de versement') !== -1 || t.indexOf('payout_summary') !== -1 || t.indexOf('versement') !== -1) return isPdf ? 'BOOKING_PAYOUT_SUMMARY_PDF' : 'BOOKING_PAYOUT_FILE';
  if (p.indexOf('factures et documents') !== -1 || t.indexOf('invoice') !== -1 || t.indexOf('facture') !== -1 || t.match(/^1000-[0-9]+\.pdf$/)) return 'BOOKING_INVOICE_DOCUMENT_PDF';
  return isPdf ? 'BOOKING_OTHER_PDF' : (isZip ? 'BOOKING_OTHER_ZIP' : (isCsv ? 'BOOKING_OTHER_CSV' : 'BOOKING_OTHER_FILE'));
}

function _gdvgV44A2_extractYear_(text) {
  const m = String(text || '').match(/20[0-9]{2}/);
  return m ? m[0] : 'YEAR_UNKNOWN';
}

function _gdvgV44A2_buildYearSummary_(files) {
  const out = {};
  files.forEach(function(file) {
    if (!out[file.year]) out[file.year] = { fileCount: 0, profiles: {} };
    out[file.year].fileCount += 1;
    out[file.year].profiles[file.sourceProfile] = (out[file.year].profiles[file.sourceProfile] || 0) + 1;
  });
  return out;
}

function _gdvgV44A2_buildProfileSummary_(files) {
  const out = {};
  files.forEach(function(file) {
    if (!out[file.sourceProfile]) out[file.sourceProfile] = { count: 0, years: {} };
    out[file.sourceProfile].count += 1;
    out[file.sourceProfile].years[file.year] = (out[file.sourceProfile].years[file.year] || 0) + 1;
  });
  return out;
}

function _gdvgV44A2_importModelDoctrine_() {
  return {
    bookingReservationCsv: 'CSV mapping first, no tax conclusion before column audit.',
    bookingPayoutPdf: 'PDF text audit required before tax/owner revenue split.',
    bookingInvoicePdf: 'Priority source for tax line audit.',
    direct: 'Manual guided form only after official tax model is sealed.',
    github: 'This public-safe script stores private Drive IDs only in Script Properties.'
  };
}

function _gdvgV44A2_auditTargetModelSheet_(ss) {
  const sheet = ss.getSheetByName(GDVG_V44A2_PUBLIC_SAFE_CFG.targetModelSheetName);
  return {
    targetSheetName: GDVG_V44A2_PUBLIC_SAFE_CFG.targetModelSheetName,
    exists: Boolean(sheet),
    recommendation: sheet ? 'Registry exists; patch through separate reviewed pack only.' : 'Create registry through separate reviewed pack only.'
  };
}
