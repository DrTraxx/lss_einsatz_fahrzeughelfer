# lss_einsatz_fahrzeughelfer

Ein Discord-Bot fuer das Leitstellenspiel

## Beschreibung

### Commands

#### help

-   zeigt eine Hilfe für die zur Verfügung stehenden Commands an

#### einsatz X

-   generiert ein Embed mit Infos zu Einsatz X
-   mögliche Eingaben:
    -   Einsatz-ID
    -   Einsatzname

#### fahrzeug X

-   generiert ein Embed mit Infos zu Fahrzeug X
-   mögliche Eingaben:
    -   Fahrzeugtyp-ID
    -   Fahrzeugname
    -   Fahrzeugkurzname
    -   Fahrzeugklasse

#### dev Title; Message

-   eine Mitteilung an alle in der "config.json" angegebenen Channel
-   Nur durch Bot-Besitzer möglich ("bot_owner")
-   Mitteilung wird als Embed dargestellt

## Anleitung

1. "sample_config.json" anpassen und in "config.json" umbenennen
2. Ordner in Powershell (o.ä.) öffnen
3. "npm install"
4. Mit "npm start" starten

## Changelog

### v 1.0.0

initial commit
