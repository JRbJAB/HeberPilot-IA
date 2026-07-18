function HPIA_V57_backupStatus() {
  return HPIA_V57_backupRun_('STATUS');
}

function HPIA_V57_backupSourceDryRun() {
  return HPIA_V57_backupRun_('DRY_RUN');
}

function HPIA_V57_backupSourceToDriveApply() {
  return HPIA_V57_backupRun_('APPLY');
}

function HPIA_V57_backupRun_(mode) {
  var config = HPIA_V57_backupGetConfig_();
  var scriptId = ScriptApp.getScriptId();
  var traceId = HPIA_V57_backupTraceId_();
  var result = {
    ok: false,
    mode: mode,
    version: config.version,
    traceId: traceId,
    scriptId: scriptId,
    fileCount: 0,
    blobCount: 0,
    zipFileId: '',
    zipUrl: '',
    message: ''
  };

  try {
    var content = HPIA_V57_backupFetchProjectContent_(scriptId);
    var files = content.files || [];
    var blobs = HPIA_V57_backupBuildBlobs_(files, scriptId, traceId, config);
    result.fileCount = files.length;
    result.blobCount = blobs.length;

    if (mode === 'STATUS' || mode === 'DRY_RUN') {
      result.ok = true;
      result.message = 'HPIA V57 backup ' + mode + ' OK. No Drive ZIP created.';
      Logger.log(JSON.stringify(result, null, 2));
      return result;
    }

    if (mode !== 'APPLY') {
      throw new Error('Unknown mode: ' + mode);
    }

    if (!config.allowSourceBackupWrite) {
      throw new Error('APPLY blocked: set HPIA_V57_ALLOW_SOURCE_BACKUP_WRITE=TRUE only after dry-run OK.');
    }
    if (!config.sourceBackupFolderId) {
      throw new Error('APPLY blocked: missing HPIA_V57_SOURCE_BACKUP_FOLDER_ID.');
    }

    var folder = DriveApp.getFolderById(config.sourceBackupFolderId);
    var zipName = HPIA_V57_backupZipName_(config.backupNamePrefix, traceId);
    var zipFile = folder.createFile(Utilities.zip(blobs, zipName));
    result.zipFileId = zipFile.getId();
    result.zipUrl = zipFile.getUrl();
    result.ok = true;
    result.message = 'HPIA V57 live Apps Script source backup ZIP created in Drive.';
    Logger.log(JSON.stringify(result, null, 2));
    return result;
  } catch (err) {
    result.ok = false;
    result.message = String(err && err.message ? err.message : err);
    Logger.log(JSON.stringify(result, null, 2));
    throw err;
  }
}

function HPIA_V57_backupGetConfig_() {
  var props = PropertiesService.getScriptProperties();
  return {
    version: 'HPIA_V57_ONE_FILE_BACKUP_CORE_0_1_2',
    allowSourceBackupWrite: String(props.getProperty('HPIA_V57_ALLOW_SOURCE_BACKUP_WRITE') || 'FALSE').toUpperCase() === 'TRUE',
    sourceBackupFolderId: props.getProperty('HPIA_V57_SOURCE_BACKUP_FOLDER_ID') || '',
    backupNamePrefix: props.getProperty('HPIA_V57_BACKUP_NAME_PREFIX') || 'hpia_apps_script_live_source_backup'
  };
}

function HPIA_V57_backupFetchProjectContent_(scriptId) {
  var url = 'https://script.googleapis.com/v1/projects/' + encodeURIComponent(scriptId) + '/content';
  var response = UrlFetchApp.fetch(url, {
    method: 'get',
    muteHttpExceptions: true,
    headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
    }
  });
  var status = response.getResponseCode();
  var text = response.getContentText();
  if (status < 200 || status >= 300) {
    throw new Error('Apps Script API projects.getContent failed. HTTP ' + status + ': ' + text);
  }
  return JSON.parse(text);
}

function HPIA_V57_backupBuildBlobs_(files, scriptId, traceId, config) {
  var blobs = [];
  var indexRows = [['path', 'name', 'type', 'bytes']];

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var path = HPIA_V57_backupFilePath_(file);
    var source = file.source || '';
    blobs.push(Utilities.newBlob(source, 'text/plain', path));
    indexRows.push([path, file.name || '', file.type || '', String(source.length)]);
  }

  var manifest = {
    project: 'HPIA',
    version: config.version,
    traceId: traceId,
    scriptId: scriptId,
    createdAt: new Date().toISOString(),
    fileCount: files.length,
    rootDir: 'apps-script',
    safety: {
      githubWrite: 'OFF_IN_V57',
      noMenuCreatedByThisModule: true,
      oneFileInstall: true
    }
  };

  blobs.push(Utilities.newBlob(JSON.stringify(manifest, null, 2), 'application/json', '_backup_manifest.json'));
  blobs.push(Utilities.newBlob(HPIA_V57_backupCsv_(indexRows), 'text/csv', '_file_index.csv'));
  blobs.push(Utilities.newBlob(JSON.stringify({ scriptId: scriptId, rootDir: 'apps-script' }, null, 2), 'application/json', '.clasp.json'));
  blobs.push(Utilities.newBlob(HPIA_V57_backupHandoffMarkdown_(manifest), 'text/markdown', 'CLASP_GITHUB_HANDOFF.md'));
  blobs.push(Utilities.newBlob(HPIA_V57_backupReadmeMarkdown_(manifest), 'text/markdown', 'README.md'));
  return blobs;
}

function HPIA_V57_backupFilePath_(file) {
  var name = String(file.name || 'unnamed').replace(/[\\\/]+/g, '_');
  var ext = HPIA_V57_backupExtension_(file.type);
  if (name.slice(-ext.length) === ext) return 'apps-script/' + name;
  return 'apps-script/' + name + ext;
}

function HPIA_V57_backupExtension_(type) {
  switch (String(type || '').toUpperCase()) {
    case 'SERVER_JS': return '.gs';
    case 'HTML': return '.html';
    case 'JSON': return '.json';
    default: return '.txt';
  }
}

function HPIA_V57_backupHandoffMarkdown_(manifest) {
  return [
    '# HPIA CLASP / GitHub handoff',
    '',
    'Trace: ' + manifest.traceId,
    'Script ID: ' + manifest.scriptId,
    '',
    'Generated from live Apps Script via projects.getContent.',
    '',
    'Allowed local checks after extracting:',
    'clasp status',
    'clasp pull',
    '',
    'Forbidden by default:',
    'clasp push',
    '',
    'GitHub write is OFF in V57.'
  ].join('\n');
}

function HPIA_V57_backupReadmeMarkdown_(manifest) {
  return [
    '# HPIA live Apps Script source backup',
    '',
    'Version: ' + manifest.version,
    'Trace: ' + manifest.traceId,
    'Files: ' + manifest.fileCount,
    '',
    'Use this ZIP as source of truth for future patches.'
  ].join('\n');
}

function HPIA_V57_backupCsv_(rows) {
  return rows.map(function(row) {
    return row.map(function(cell) {
      var s = String(cell === null || cell === undefined ? '' : cell);
      return '"' + s.replace(/"/g, '""') + '"';
    }).join(',');
  }).join('\n');
}

function HPIA_V57_backupZipName_(prefix, traceId) {
  var tz = Session.getScriptTimeZone() || 'Europe/Paris';
  var stamp = Utilities.formatDate(new Date(), tz, 'yyyyMMdd_HHmmss');
  return prefix + '_' + stamp + '_' + traceId + '.zip';
}

function HPIA_V57_backupTraceId_() {
  return Utilities.getUuid().replace(/-/g, '').slice(0, 8);
}
