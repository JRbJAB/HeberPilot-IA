# HPIA V69E - Gate backup live frais avant menu

Status: WAITING_FOR_USER_LIVE_BACKUP_APPLY_LOG

## Objet

V69E ouvre le passage vers une future installation éventuelle du menu V69D, mais ne l'applique pas.

Le point bloquant est volontaire :

```text
fresh_live_drive_backup_required = true
```

## Pourquoi

Le candidat V69D a été préparé depuis la base live Drive `d85a1fb4`.

Avant de remplacer le bloc `onOpen()` du menu installé, il faut vérifier que le code live actuel n'a pas changé.

## Décision

V69E ne fait aucun changement dans Apps Script.

V69E demande seulement :

1. un `STATUS` ;
2. un `DRY_RUN` ;
3. un `APPLY` backup live Drive ;
4. la remise immédiate du write flag à `FALSE`.

## Sortie attendue

Un nouveau ZIP live Drive, avec :

```text
zipFileId
zipUrl
traceId
fileCount
blobCount
```

## Next

V69F comparera le nouveau ZIP live avec d85a1fb4.

Si le menu host est identique ou si le diff est compris, on pourra préparer un plan d'installation contrôlée.
