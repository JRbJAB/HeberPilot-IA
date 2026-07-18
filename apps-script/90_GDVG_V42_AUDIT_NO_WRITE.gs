/**
 * GDVG v4.2 — Audit NO-BREAK / NO-WRITE
 * Projet : 🏡 Gîte du Vert Galant
 * Date : 2026-07-06
 *
 * Usage :
 * - Ajouter ce fichier comme NOUVEAU module Apps Script.
 * - Ne pas remplacer Code.gs ni les modules UI existants.
 * - Exécuter uniquement GDVG_v42_runNoWriteAudit().
 *
 * Garanties :
 * - pas de menu automatique ;
 * - pas de trigger ;
 * - pas de déplacement Drive ;
 * - pas d’écriture dans le classeur ;
 * - lecture seule via SpreadsheetApp.
 */

const GDVG_V42_AUDIT_CONFIG = Object.freeze({
  version: 'GDVG_V42_NO_BREAK_AUDIT_2026_07_06',
  writeEnabled: false,
  expectedSheets: [
    '🎛️ 00_Dashboard',
    '💶 01_Reservations_CA',
    '📨 02_CRM_Demandes',
    '📈 03_Yield_Tarifs',
    '✅ 04_Todo_90J',
    '📣 05_Reseaux_Sociaux',
    '🤝 06_Partenaires_Canaux',
    '⭐ 07_Avis_Reputation',
    '⚙️ 08_Parametres',
    '📘 09_Mode_emploi',
    '🔌 12_Config_OTA_API',
    '🏡 13_Infos_Gite_Admin',
    '📋 15_Actions_Detail_90J',
    '🔎 17_Audit_Concurrents',
    '💸 18_Benchmark_Prix',
    '🕘 H01_Hist_Suivi_CA',
    '🧪 20_Audit_Rendu_QA',
    '🧰 21_Corrections_Chiffres',
    '🧾 23_Registre_Pieces',
    '🔗 24_API_Booking_Dev',
    '📥 25_Import_Booking_2026S1',
    '📁 26_Fichiers_Traites',
    '🔁 29_Reservations_Mutations',
    '🧭 Gouvernance_Onglets'
  ],
  dashboardSheet: '🎛️ 00_Dashboard',
  reservationsSheet: '💶 01_Reservations_CA',
  planningStagingSheet: '📥 38_Import_Planning_Visuel_TE',
  governanceSheet: '🧭 Gouvernance_Onglets',
  scriptRegistrySheet: '🔗 24_API_Booking_Dev'
});

function GDVG_v42_runNoWriteAudit() {
  const startedAt = new Date().toISOString();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const report = {
    version: GDVG_V42_AUDIT_CONFIG.version,
    startedAt: startedAt,
    spreadsheetName: ss.getName(),
    spreadsheetId: ss.getId(),
    writeEnabled: GDVG_V42_AUDIT_CONFIG.writeEnabled,
    safety: {
      noAutomaticMenu: true,
      noTriggerCreation: true,
      noDriveOperation: true,
      noSheetMutation: true,
      expectedExecution: 'manual'
    },
    sheets: GDVG_v42_auditSheetInventory_(ss),
    dashboard: GDVG_v42_auditDashboard_(ss),
    reservations: GDVG_v42_auditReservations_(ss),
    planningStaging: GDVG_v42_auditPlanningStaging_(ss),
    governance: GDVG_v42_auditGovernance_(ss),
    scriptRegistry: GDVG_v42_auditScriptRegistry_(ss),
    finishedAt: new Date().toISOString()
  };

  Logger.log(JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  return report;
}

function GDVG_v42_auditSheetInventory_(ss) {
  const sheets = ss.getSheets().map(function (sh, index) {
    return {
      index: index + 1,
      name: sh.getName(),
      lastRow: sh.getLastRow(),
      lastColumn: sh.getLastColumn()
    };
  });

  const names = sheets.map(function (s) { return s.name; });
  const missing = GDVG_V42_AUDIT_CONFIG.expectedSheets.filter(function (name) {
    return names.indexOf(name) === -1;
  });

  return {
    count: sheets.length,
    missingExpectedSheets: missing,
    sheets: sheets
  };
}

function GDVG_v42_auditDashboard_(ss) {
  const sh = GDVG_v42_getSheet_(ss, GDVG_V42_AUDIT_CONFIG.dashboardSheet);
  if (!sh) return { ok: false, reason: 'dashboard sheet not found' };

  const display = sh.getRange('A1:L66').getDisplayValues();
  const formulas = sh.getRange('A1:L66').getFormulas();

  const errorCells = GDVG_v42_findErrorsInDisplay_(display, 'A1');
  const nMinusOneFormulas = GDVG_v42_pickFormulas_(formulas, [
    'B53', 'C53', 'D53', 'E53', 'F53',
    'B54', 'C54', 'D54', 'E54', 'F54',
    'B55', 'C55', 'D55', 'E55', 'F55',
    'B56', 'C56', 'D66', 'E56', 'F56'
  ]);
  const channelFormulas = GDVG_v42_pickFormulas_(formulas, [
    'B60', 'C60', 'D60', 'E60', 'F60',
    'B61', 'C61', 'D61', 'E61', 'F61',
    'B62', 'C62', 'D62', 'E62', 'F62',
    'B63', 'C63', 'D63', 'E63', 'F63',
    'B64', 'C64', 'D64', 'E64', 'F64'
  ]);

  return {
    ok: errorCells.length === 0,
    errorCellCount: errorCells.length,
    errorCells: errorCells,
    selectedYearDisplay: GDVG_v42_cellDisplay_(display, 'B14'),
    annualSummaryBlock: GDVG_v42_extractTablePreview_(display, 6, 11, 5),
    nMinusOneFormulaCells: nMinusOneFormulas,
    channelFormulaCells: channelFormulas,
    recommendations: [
      'Sécuriser C53:F56 avec IFERROR / message N-1 absent.',
      'Contrôler B60:D64 pour les années historiques : le bloc canal ne doit pas lire uniquement 01 si B14 < 2025.',
      'Contrôler le bloc mensuel A23:G35 : il doit être assumé comme snapshot ou redevenir dynamique.'
    ]
  };
}

function GDVG_v42_auditReservations_(ss) {
  const sh = GDVG_v42_getSheet_(ss, GDVG_V42_AUDIT_CONFIG.reservationsSheet);
  if (!sh) return { ok: false, reason: 'reservations sheet not found' };

  const values = sh.getRange('A4:AJ136').getDisplayValues();
  if (values.length < 2) return { ok: false, reason: 'no reservation rows' };

  const header = values[0];
  const rows = values.slice(1).filter(function (row) { return row[0]; });

  const idx = GDVG_v42_headerIndex_(header);
  const reservationUidIndex = idx.reservation_uid;
  const uids = {};
  const duplicates = [];

  rows.forEach(function (row) {
    const uid = row[reservationUidIndex];
    if (!uid) return;
    if (uids[uid]) duplicates.push(uid);
    uids[uid] = true;
  });

  return {
    ok: duplicates.length === 0,
    rowCount: rows.length,
    statusCounts: GDVG_v42_countByColumn_(rows, idx.statut),
    channelCounts: GDVG_v42_countByColumn_(rows, idx.canal),
    controlStatusCounts: GDVG_v42_countByColumn_(rows, idx.statut_controle),
    duplicateReservationUids: duplicates,
    emptyProofRows: rows.filter(function (row) {
      return row[idx.statut] === 'Confirmée' && !row[idx.preuve_drive];
    }).length,
    recommendations: [
      'Traiter en priorité les lignes Confirmée avec preuve Drive vide.',
      'Fermer les statuts À vérifier avant automatisation upsert.',
      'Conserver 29_Reservations_Mutations append-only.'
    ]
  };
}

function GDVG_v42_auditPlanningStaging_(ss) {
  const sh = GDVG_v42_getSheet_(ss, GDVG_V42_AUDIT_CONFIG.planningStagingSheet);
  if (!sh) return { ok: false, reason: 'planning staging sheet not found' };

  const values = sh.getRange('A1:S42').getDisplayValues();
  const headerRowIndex = GDVG_v42_findHeaderRow_(values, 'id');
  if (headerRowIndex < 0) return { ok: false, reason: 'planning header not found' };

  const header = values[headerRowIndex];
  const rows = values.slice(headerRowIndex + 1).filter(function (row) { return row[0]; });
  const idx = GDVG_v42_headerIndex_(header);

  return {
    ok: true,
    rowCount: rows.length,
    phaseCounts: GDVG_v42_countByColumn_(rows, idx.phase),
    priorityCounts: GDVG_v42_countByColumn_(rows, idx.priorite),
    statusCounts: GDVG_v42_countByColumn_(rows, idx.statut),
    importStatusCounts: GDVG_v42_countByColumn_(rows, idx.import_status),
    reviewDecisionCounts: GDVG_v42_countByColumn_(rows, idx.review_decision),
    recommendations: [
      'Ne pas importer en masse vers 15_Actions_Detail_90J.',
      'Arbitrer chaque ligne : intégrer, conserver staging, archiver, ou transformer en action active.'
    ]
  };
}

function GDVG_v42_auditGovernance_(ss) {
  const sh = GDVG_v42_getSheet_(ss, GDVG_V42_AUDIT_CONFIG.governanceSheet);
  if (!sh) return { ok: false, reason: 'governance sheet not found' };

  const values = sh.getRange('A1:P48').getDisplayValues();
  const headerRowIndex = GDVG_v42_findHeaderRow_(values, 'ordre');
  if (headerRowIndex < 0) return { ok: false, reason: 'governance header not found' };

  const header = values[headerRowIndex];
  const rows = values.slice(headerRowIndex + 1).filter(function (row) { return row[0]; });
  const idx = GDVG_v42_headerIndex_(header);

  return {
    ok: true,
    rowCount: rows.length,
    priorityCounts: GDVG_v42_countByColumn_(rows, idx.priorite || idx['priorité']),
    statusCounts: GDVG_v42_countByColumn_(rows, idx.statut),
    lotScriptCounts: GDVG_v42_countByColumn_(rows, idx.lot_script),
    p0OpenRows: rows.filter(function (row) {
      const prio = row[idx.priorite] || row[idx['priorité']];
      const status = row[idx.statut];
      return prio === 'P0' && ['À contrôler', 'À compléter', 'À fiabiliser', 'À enrichir', 'À refondre', 'À auditer'].indexOf(status) !== -1;
    }).map(function (row) {
      return {
        onglet: row[idx.onglet],
        statut: row[idx.statut],
        actionRestante: row[idx.action_restante],
        lotScript: row[idx.lot_script]
      };
    })
  };
}

function GDVG_v42_auditScriptRegistry_(ss) {
  const sh = GDVG_v42_getSheet_(ss, GDVG_V42_AUDIT_CONFIG.scriptRegistrySheet);
  if (!sh) return { ok: false, reason: 'script registry sheet not found' };

  const values = sh.getRange('A18:N89').getDisplayValues();
  const rows = values.filter(function (row) { return row[0]; });

  return {
    ok: true,
    rowCount: rows.length,
    keepRows: rows.filter(function (row) { return String(row[10]).indexOf('KEEP') !== -1; }).map(GDVG_v42_compactRegistryRow_),
    candidateArchiveRows: rows.filter(function (row) { return String(row[10]).indexOf('Candidat') !== -1; }).map(GDVG_v42_compactRegistryRow_),
    nextRows: rows.filter(function (row) { return String(row[0]).indexOf('AUDIT-NEXT') === 0; }).map(GDVG_v42_compactRegistryRow_),
    recommendations: [
      'Préserver v0.7 et v0.9 MERGE_PRESERVE.',
      'Ne pas archiver les v0.8/v0.9.1 avant validation de la version fusion installée.',
      'Créer les nouveaux audits en modules séparés, sans onOpen automatique.'
    ]
  };
}

function GDVG_v42_getSheet_(ss, name) {
  return ss.getSheetByName(name);
}

function GDVG_v42_findErrorsInDisplay_(values, startCell) {
  const errors = [];
  const start = GDVG_v42_a1ToRowCol_(startCell);
  values.forEach(function (row, r) {
    row.forEach(function (value, c) {
      const text = String(value || '');
      if (/^#(N\/A|REF!|DIV\/0!|VALUE!|NAME\?|NUM!|NULL!)/.test(text)) {
        errors.push({
          address: GDVG_v42_rowColToA1_(start.row + r, start.col + c),
          value: text
        });
      }
    });
  });
  return errors;
}

function GDVG_v42_pickFormulas_(formulaGrid, addresses) {
  const out = {};
  addresses.forEach(function (address) {
    const rc = GDVG_v42_a1ToRowCol_(address);
    const formula = formulaGrid[rc.row - 1] && formulaGrid[rc.row - 1][rc.col - 1];
    if (formula) out[address] = formula;
  });
  return out;
}

function GDVG_v42_cellDisplay_(displayGrid, address) {
  const rc = GDVG_v42_a1ToRowCol_(address);
  return displayGrid[rc.row - 1] && displayGrid[rc.row - 1][rc.col - 1];
}

function GDVG_v42_extractTablePreview_(displayGrid, startRow, endRow, maxRows) {
  const rows = [];
  for (let r = startRow - 1; r < endRow && rows.length < maxRows; r++) {
    rows.push(displayGrid[r]);
  }
  return rows;
}

function GDVG_v42_findHeaderRow_(values, firstHeaderName) {
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === firstHeaderName) return i;
  }
  return -1;
}

function GDVG_v42_headerIndex_(header) {
  const out = {};
  header.forEach(function (name, index) {
    if (!name) return;
    const normalized = String(name)
      .trim()
      .toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    out[normalized] = index;
    out[name] = index;
  });
  return out;
}

function GDVG_v42_countByColumn_(rows, index) {
  const counts = {};
  if (index === undefined || index === null) return counts;
  rows.forEach(function (row) {
    const value = row[index] || '(vide)';
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

function GDVG_v42_compactRegistryRow_(row) {
  return {
    id: row[0],
    type: row[1],
    name: row[2],
    description: row[3],
    linkOrPack: row[5],
    writeMode: row[7],
    priority: row[9],
    status: row[10],
    nextAction: row[11],
    scope: row[12],
    note: row[13]
  };
}

function GDVG_v42_a1ToRowCol_(a1) {
  const match = String(a1).match(/^([A-Z]+)([0-9]+)$/i);
  if (!match) throw new Error('Invalid A1 address: ' + a1);
  const letters = match[1].toUpperCase();
  let col = 0;
  for (let i = 0; i < letters.length; i++) {
    col = col * 26 + letters.charCodeAt(i) - 64;
  }
  return { row: Number(match[2]), col: col };
}

function GDVG_v42_rowColToA1_(row, col) {
  let letters = '';
  let n = col;
  while (n > 0) {
    const mod = (n - 1) % 26;
    letters = String.fromCharCode(65 + mod) + letters;
    n = Math.floor((n - mod) / 26);
  }
  return letters + row;
}
