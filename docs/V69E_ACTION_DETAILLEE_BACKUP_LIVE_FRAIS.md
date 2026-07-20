# HPIA V69E - Action détaillée backup live frais

Status: WAITING_FOR_USER_LIVE_BACKUP_APPLY_LOG

## Objectif

Créer un nouveau ZIP live Apps Script dans Drive avant toute installation du menu V69D.

V69E ne modifie pas le menu.

```text
NO_APPS_SCRIPT_MENU_PATCH
NO_CLASP
NO_GITHUB_SCRIPT_PUSH
NO_ONOPEN_REPLACEMENT
```

## Action dans Apps Script

Dans le projet Apps Script HPIA, lance dans cet ordre :

```text
HPIA_V57_backupStatus
```

Résultat attendu :

```text
ok = true
mode = STATUS
fileCount > 0
blobCount > 0
zipFileId = ""
```

Puis lance :

```text
HPIA_V57_backupSourceDryRun
```

Résultat attendu :

```text
ok = true
mode = DRY_RUN
zipFileId = ""
```

Ensuite, dans les propriétés script, passe temporairement :

```text
HPIA_V57_ALLOW_SOURCE_BACKUP_WRITE = TRUE
```

Puis lance :

```text
HPIA_V57_backupSourceToDriveApply
```

Résultat attendu :

```text
ok = true
mode = APPLY
zipFileId = ...
zipUrl = https://drive.google.com/...
```

Après succès, remets immédiatement :

```text
HPIA_V57_ALLOW_SOURCE_BACKUP_WRITE = FALSE
```

## Ce que tu me colles ensuite

Colle le log complet de :

```text
HPIA_V57_backupSourceToDriveApply
```

Il doit contenir :

```text
traceId
fileCount
blobCount
zipFileId
zipUrl
```

## Après ton log

Je ferai V69F :

1. vérifier que le nouveau ZIP est bien dans Drive ;
2. comparer le menu host du nouveau ZIP avec la base d85a1fb4 ;
3. décider si le candidat V69D est encore applicable ;
4. préparer seulement ensuite une procédure d'installation contrôlée.
