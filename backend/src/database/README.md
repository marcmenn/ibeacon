# database

## data structure

entity types (collections:

- person

### entity: `person`

key: beaconId

document:

```javascript
{
    beaconId: '' // mandatory string: beacon id (primary document id)
    deviceId: '' // mandatory string: device id
    registerTime: '' // mandatory ISO timestamp: timestamp of registration of person
    infected: false, // mandatory boolean: infection status
    infectReportTime: '', // optional ISO timestamp: timestamp of reporting the positive infection state
    infectedSinceTime: '', // optional ISO timestamp: timestamp of estimated infection
    infectHealedTime: '' // optional ISO timestamp string: timestamp of reporting the negative infection state (after positive)
    contactsByPerson: { // mandatory map of all contacts grouped by contact person
        beaconId: [ // mandatory string key: beacon id of contacted person => array of contacts (ordered by `time`)
            {
                id: '', // mandatory string: UUID to identify sibling "identic" contact entry on other contacted person
                time: '', // mandatory ISO timestamp string: timestamp beacon (contact) was received
                beaconId: '', // mandatory string: beacon id of contact
                distance: 17, // (optional) number: distance between two persons (unit: ???)
                duration: 11, // (optional) number: duration of contact (unit: seconds)
                ... // other infos (geolocation ...)
            }
        ]
    }
}
```
