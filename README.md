## inspiration
Movement patterns can be extracted from **cell phone movement data** from network providers, which have to be **anonymously processed**.
This data only shows where and how many people were in one place with an inaccuracy unworthy of droplet infection.

At the same time, devices in Apple Stores speak to our cell phones as soon as they are close enough - without revealing the owner's personal information.

Corona and other viruses are also transmitted in close proximity. So why not use the same technology to show reliable contact chains?

## technical implementation
Our CoChain app works with iBeacons. It forms an individual code and exchanges it with other CoChain apps on the devices of our fellow human beings - in the background. The identity of the owner remains unaffected. Only the apps talk to each other. Micro-location is not a problem. CoChain remembers ** date, duration and distance ** and creates an individual history for each device. It also assesses the likelihood of infection risk.

As soon as one of these "hit" devices reports as "infected", my app CoChain updates the information and shows this in my personal infection chain.

## our team
We got together during [#WirVsVirus](https://wirvsvirushackathon.devpost.com) in a team of five and divided up according to our abilities.

* Marcus: Idea, Repository, Docker, Database
* Lars: iOS
* Peter: Backend
* Patty: Android
* Katrin: UX, UI

## What we achieved during [#WirVsVirus](https://wirvsvirushackathon.devpost.com) and [COVID-19 Global Hackathon](https://covid-global-hackathon.devpost.com)
### UX, UI Prototype
[Click dummy](https://preview.uxpin.com/d79ffda249b526f03849c42e13cc21692c6e422d#/pages/127141116/simulate/sitemap?mode=if)

### iOS app
Working prototype that can be distributed via TestFlight.
IBeacons are broadcast and received. The data is uploaded to the server, and the health status can also be set.

### Android app
Prototype that broadcasts and receives beacons. The beacons should be compatible with the iOS version.

### backend
Docker environment on a test server with [Couchbase] (https://couchbase.com) and [NodeJS] (https://nodejs.org), which (theoretically) can be scaled up (12factor, stateless, shared-nothing multimaster database)

### anonymization
Only anonymous BeaconIds are exchanged between devices via Bluetooth and uploaded to the server. The implications here are the same with a given SDK as for any device that sends ids. In order to prevent third-party tracking, the ids could still be rotated randomly in the future.
The user can use the app to switch to "sick" or "healthy". Other users who have received beacons from a potentially infected user only find out when they were in contact, not with whom.

### Logic
It is insane how complex it is to produce map-reduce views in a short time that compare the intervals in which a user could be infectious and in which he met another. All of this, of course, retrospectively to cover the unconscious incubation period.

## What's next with CoChain?
The possibilities are many. We would start with this app.
* _International_ available
* _Interchangeable_ for all kinds of viruses
* _Expandable_ for publicly visited places
(Equip elevators, toilets, car sharing with iBeacons that contain information as to whether they are contaminated or not)
* _Cooperation_ with Apple / Google to integrate the basic functionality into the respective operating / ecosystem without the need for an app in the foreground. </br>
This is the only way to reach a relevant number of users.

## Inspiration
Man kann mit **Handybewegungsdaten** von Netzwerkprovidern, die aufwändig **anonymisiert** werden müssen, Bewegungsmuster nachvollziehen. Diese Daten nur, wo und wie viele Menschen an einem Ort waren, mit einer Ungenauigkeit, die einer Tröpfcheninfektion unwürdig ist.

Zur gleichen Zeit sprechen in Apple Stores die Devices mit unseren Handys, sobald sie sich nahe genug sind – ohne persönliche Informationen des Besitzers zu verraten.

Corona und andere Viren übertragen sich ebenfalls in nächster Nähe. Warum also nutzt man nicht die selbe Technik, um verlässliche Kontaktketten aufzuzeigen?

## Die technische Umsetzung
Unsere App CoChain arbeitet mit iBeacons. Sie bildet einen individuellen Code und tauscht diesen mit anderen CoChain Apps auf den Devices unserer Mitmenschen aus – im Hintergrund. Die Identität der Besitzer bleibt unberührt. Nur die Apps sprechen miteinander. Mikro-Ortung ist kein Problem. CoChain merkt sich **Datum, Dauer und Distanz** und bildet daraus eine individuelle Historie pro Device. Außerdem bewertet Sie die Wahrscheinlichkeit des Infektionsrisikos.

Sobald sich einer dieser "getroffenen" Devices als "infiziert" meldet, aktualisiert meine App CoChain die Info und zeigt das in meiner persönlichen Infektionskette an.

## Unser Team
Wir haben uns zu [#WirVsVirus](https://wirvsvirushackathon.devpost.com) in einem 5-köpfigen Team zusammengefunden und uns entsprechend unserer Fähigkeiten aufgeteilt.

* Marcus: Idee, Repository, Docker, Database
* Lars: iOS
* Peter: Backend
* Patty: Android
* Katrin: UX, UI

## Was wir erreicht haben während [#WirVsVirus](https://wirvsvirushackathon.devpost.com) und [COVID-19 Global Hackathon](https://covid-global-hackathon.devpost.com)
### UX, UI Prototype
[Zum Klickdummy](https://preview.uxpin.com/41142dc5460294bdeb6622fc90d243534ca479cb#/pages/126869107/simulate/sitemap?mode=if)

### iOS App
Funktionierender Prototyp, der über TestFlight verteilt werden kann.
Es werden iBeacons gebroadcasted und empfangen. Die Daten werden zum Server hochgeladen, ebenso kann der Gesundstatus eingestellt werden.

### Android App
Prototyp, der Beacons broadcasted und empfängt. Die Beacons sollten mit der iOS Version kompatibel sein.

### Backend
Dockerisierte Umgebung auf einem Testserver mit [Couchbase](https://couchbase.com) und [NodeJS](https://nodejs.org), die (theoretisch) hochskalierbar ist (12factor, stateless, shared-nothing multimaster Datenbank)

### Anonymisierung
Es werden nur anonyme BeaconIds per Bluetooth zwischen Geräten ausgetauscht und zum Server hochgeladen. Die Implikationen hier sind mit gegebenem SDK die gleichen, wie bei jedem Gerät, dass ids sendet. Um ein Fremdtracking zu verhindern, könnten die ids zukünftig noch zufällig durchrotiert werden.
Der User kann sich per App auf "krank" oder "gesund" stellen. Andere User, die Beacons von einem potentiell infizierten User empfangen haben, erfahren nur, wann sie Kontakt hatten, nicht, mit wem.

### Logik
Irrwitzig, wie komplex es ist, map-reduce views in kurzer Zeit herzustellen, die die Intervalle abgleichen, in denen ein User infektiös sein könnte und in denen er einen anderen getroffen hat. Das ganze natürlich rückwirkend, um die unbewusste Inkubationszeit abzudecken.

## Wie geht's weiter mit CoChain?
Die Möglichkeiten sind vielfältig. Wir würden mit dieser App starten.
* _International_ verfügbar
* _Austauschbar_ für Viren aller Art
* _Erweiterbar_ für öffentlich stark besuchte Orte
(Fahrstühle, Toiletten, Carsharing mit iBeacons ausstatten, die Infos tragen,  ob sie kontaminiert sind oder nicht) </br>
* _Kooperation_ mit Apple/Google, um die Basis Funktionalität in das jeweilige Betriebs-/Ökosystem zu integrieren, ohne eine App im Vordergrund zu benötigen. </br>
Nur so können relevant viele User erreicht werden.
