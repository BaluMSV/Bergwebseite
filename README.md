# Bahnberge.de

Statische Website für Wanderungen mit der Bahn ab München. Die Seiten liegen
als HTML-, CSS- und JavaScript-Dateien im Projektstamm; ein Build-Schritt ist
nicht erforderlich.

## GitHub Pages

Der Workflow `.github/workflows/pages.yml` wird manuell gestartet. Für die
Veröffentlichung unter `BaluMSV/Bergwebseite`:

1. Ein öffentliches Repository namens `Bergwebseite` auf GitHub anlegen.
2. Den Projektinhalt in dieses Repository pushen.
3. Unter **Settings > Pages** als Build- und Deploymentquelle **GitHub Actions**
   auswählen.
4. Unter **Actions** den Workflow **Deploy to GitHub Pages** manuell starten.

Nach erfolgreichem Deployment ist die Website unter
`https://balumsv.github.io/Bergwebseite/` erreichbar. Das Repository und sein
Quellcode sind bei dieser öffentlichen Einstellung ebenfalls öffentlich.
Auch bei einem privaten Repository ist der Browser-Code einer veröffentlichten
Website für Besucher einsehbar: HTML, CSS, JavaScript und ausgelieferte Dateien
werden an deren Browser gesendet. Ein privates Repository schützt den
Repository-Zugriff, nicht den Code, der für eine öffentliche Website benötigt
wird.

## Automatischer Upload zu IONOS

Der Workflow `.github/workflows/deploy-ionos.yml` lädt die Dateien bei jedem
Push auf `main` zusätzlich per SFTP auf den IONOS-Webspace. Lege dafür unter
**Settings > Secrets and variables > Actions** folgende Repository-Secrets an:

- `SFTP_HOST`: Servername aus den IONOS-SFTP-Zugangsdaten
- `SFTP_PORT`: SFTP-Port, üblicherweise `22`
- `SFTP_USERNAME`: SFTP-Benutzername
- `SFTP_PASSWORD`: SFTP-Passwort
- `SFTP_KNOWN_HOSTS`: geprüfter SSH-Hostkey des SFTP-Servers im OpenSSH-Format
- `SFTP_TARGET_DIR`: Ordner im Webspace, der als Dokumentenstamm für die Domain
  konfiguriert ist. Falls er noch nicht existiert, erstellt der Workflow ihn;
  sein übergeordneter Ordner muss bereits vorhanden sein.

Den Hostkey erhältst du von IONOS oder mit `ssh-keyscan -p <Port> <Host>`.
Vergleiche in jedem Fall den ausgegebenen Fingerprint mit einer offiziellen
IONOS-Angabe, bevor du ihn als `SFTP_KNOWN_HOSTS` speicherst.
Der Workflow löscht keine Dateien auf dem Webspace. Du kannst ihn zum ersten
Mal unter **Actions > Deploy to IONOS > Run workflow** manuell starten und das
Ergebnis dort prüfen.


## Kommentarformular (Web3Forms)

Die Kommentarformulare auf `feedback.html` und `kontakt.html` verwenden
[Web3Forms](https://web3forms.com/) für den E-Mail-Versand. Nach dem Erstellen
des Formulars und der Bestätigung deiner Empfängeradresse:

1. Kopiere den Access Key aus Web3Forms.
2. Öffne `feedback.js` und füge den Schlüssel in `WEB3FORMS_ACCESS_KEY` ein.
3. Der Access Key ist mit der Empfängeradresse verknüpft. Bei einem späteren
   Wechsel der Empfängeradresse generiere einen neuen Schlüssel und ersetze
   denselben Wert in `feedback.js`.

Der Access Key ist laut Web3Forms für die Verwendung im Browser vorgesehen.
Name, E-Mail-Adresse und Kommentar werden an Web3Forms übertragen; der
Kommentar wird in der E-Mail zusammen mit Name und E-Mail-Adresse aufgeführt.

## Busanforderung bei Gipfeln

In `data/summits.js` kann bei jedem Gipfeleintrag `busRequired` auf `true` oder
`false` gesetzt werden. Bei `true` wird der Gipfel beim Ausgrauen so behandelt,
als wären für die Anreise 30 Minuten und ein Umstieg zusätzlich erforderlich.
Ohne Angabe oder bei `false` bleibt die bisherige Berechnung unverändert.

## Outdooractive-Links

Die Tour-Schaltfläche auf den Gipfelseiten heißt **Details** und führt weiterhin
zur bisherigen Tourplanung. Wenn für den Gipfel ein Outdooractive-Link
hinterlegt ist, öffnet sich dieser zusätzlich in einem neuen Tab. Die Links
werden zentral in `Data/Touren-links.js` gepflegt: Trage die URL jeweils beim
passenden Gipfel-Schlüssel zwischen die Anführungszeichen ein. Zwei bereits
vorhandene Outdooractive-Links sind dort übernommen.
