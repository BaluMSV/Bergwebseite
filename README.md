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
Ergebnis dort prüfen. Vor jedem Upload erzeugt
`scripts/generate_sitemap.py` eine neue `sitemap.xml` aus allen HTML-Seiten im
Projektstamm. Die Sitemap verwendet `https://bahnberge.de` als Hauptdomain und
wird zusammen mit den übrigen Website-Dateien hochgeladen.


## E-Mail-Versand des Kontaktformulars

Die Formulare auf `feedback.html` und `kontakt.html` senden an
`send-feedback.php`. Dieses Skript verwendet die PHP-Mailfunktion des IONOS-
Webhostings; Absender und Empfänger sind standardmäßig `info@bahnberge.de`.
Die E-Mail-Adresse der absendenden Person wird als Antwortadresse verwendet.
Es ist kein Web3Forms-Konto und kein im Browser gespeichertes Mailbox-Passwort
erforderlich.

Der automatische IONOS-Upload überträgt auch `send-feedback.php` und den
Ordner `private`. Die Mailadressen in `private/feedback-mail.php` sind bereits
auf `info@bahnberge.de` gesetzt. `private/.htaccess` sperrt den direkten
Webzugriff auf die Konfiguration; das PHP-Skript schützt sie zusätzlich vor
direktem Aufruf. Sende nach dem Upload ein Testformular über die gehostete
Website und prüfe den Posteingang sowie den Spam-Ordner.

Der IONOS-Webserver muss PHP-Mail mit der Absenderadresse der eigenen Domain
zulassen. Sollte IONOS den Versand über `mail()` im gebuchten Tarif nicht
zulassen oder die Nachricht nicht zustellen, kann der Endpunkt auf
authentifiziertes SMTP umgestellt werden; SMTP-Zugangsdaten gehören ebenfalls
nur in die nicht versionierte `private/feedback-mail.php`.

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
