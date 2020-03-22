## Inspiration
Das **Robert Koch Institut** bekommt Handybewegungsdaten von der **Telekom**, die wiederum aufwendig **anonymisiert** werden müssen. Zudem sagen die Daten nur wo und wieviele Menschen dort waren, mit einer Ungenauigkeit, die einer Tröpfcheninfektion unwürdig ist.

Zur gleichen Zeit sprechen in Apple Stores die Devices mit unseren Handys, sobald sie sich nahe genug sind – ohne persönliche Informationen des Besitzers zu verraten.

Corona und andere Viren übertragen sich ebenfalls in nächster Nähe. Warum also nutzt man nicht die selbe Technik, um verlässliche Kontaktketten aufzuzeigen?

## Die technische Umsetzung
Unsere App CoChain arbeitet mit iBeacons. Sie bildet einen individuellen Code und tauscht diesen mit anderen CoChain Apps auf den Devices unserer Mitmenschen aus – im Hintergrund. Die Identität der Besitzer bleibt unberührt. Nur die Apps sprechen miteinander. Mikro-Ortung ist kein Problem. CoChain merkt sich **Datum, Dauer und Distanz** und bildet daraus eine individuelle Historie pro Device. Außerdem bewertet Sie die Wahrscheinlichkeit des Infektionsrisikos.

Sobald sich einer dieser "getroffenen" Devices als "infiziert" meldet, aktualisiert meine App CoChain die Info und zeigt das in meiner persönlichen Infektionskette an.

## Unser Team
Wir haben uns am Freitag in einem 5-köpfigen Team zusammengefunden und uns entsprechend unserer Fähigkeiten aufgeteilt.

Marcus: Idee, Repository, Docker, Database </br>
Lars: iOS </br>
Peter: Backend </br>
Patty: Android </br>
Katrin: UX, UI </br>


## Was wir in den letzten 48h erreicht haben
**UX, UI Prototype**
[Zum Klickdummy](https://preview.uxpin.com/41142dc5460294bdeb6622fc90d243534ca479cb#/pages/126869107/simulate/sitemap?mode=if)

**iOS App**
Funktionierender Prototyp, der über TestFlight verteilt werden kann.
Es werden iBeacons gebroadcasted und empfangen. Die Daten werden zum Server hochgeladen, ebenso kann der Gesundstatus eingestellt werden.

**Android App**
Prototyp, der Beacons broadcasted und empfängt. Die Beacons sollten mit der iOS Version kompatibel sein.

**Backend**
Dockerisierte Umgebung auf einem Testserver mit [Couchbase](https://couchbase.com) und [NodeJS](https://nodejs.org), die (theoretisch) hochskalierbar ist (12factor, stateless, shared-nothing multimaster Datenbank)

**Anonymisierung**
Es werden nur anonyme BeaconIds per Bluetooth zwischen Geräten ausgetauscht und zum Server hochgeladen. Die Implikationen hier sind mit gegebenem SDK die gleichen, wie bei jedem Gerät, dass ids sendet. Um ein Fremdtracking zu verhindern, könnten die ids zukünftig noch zufällig durchrotiert werden.
Der User kann sich per App auf "krank" oder "gesund" stellen. Andere User, die Beacons von einem potentiell infizierten User empfangen haben, erfahren nur, wann sie Kontakt hatten, nicht, mit wem.

**Logik**
Irrwitzig, wie komplex es ist, map-reduce views in kurzer Zeit herzustellen, die die Intervalle abgleichen, in denen ein User infektiös sein könnte und in denen er einen anderen getroffen hat. Das ganze natürlich rückwirkend, um die unbewusste Inkubationszeit abzudecken.

## Wie geht's weiter mit CoChain?
Die Möglichkeiten sind vielfältig. Wir würden mit dieser App starten. </br>
_ International _ verfügbar </br>
_ Austauschbar _ für Viren aller Art </br>
_ Erweiterbar _ für öffentlich stark besuchte Orte  </br>
(Fahrstühle, Toiletten, Carsharing mit iBeacons ausstatten, die Infos tragen,  ob sie kontaminiert sind oder nicht) </br>
_Kooperation_ mit Apple/Google, um die Basis Funktionalität in das jeweilige Betriebs-/Ökosystem zu integrieren, ohne eine App im Vordergrund zu benötigen. </br>
Nur so können relevant viele User erreicht werden.
