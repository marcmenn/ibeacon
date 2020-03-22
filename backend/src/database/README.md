# database

## data structure

entity types (collections:

- event

### entity: `event`

key: uuid

document: (event type specific)

```javascript
{
    type: 'register|contact|health-state' // event type
    deviceId: '' // mandatory string: device id
    beaconId: '' // mandator string: beacon id
    timestamp: '' // mandatory ISO timestamp of event
    payload: {} // event type specific payload
}
```

#### event type `register`

```javascript
{
    type: 'register' // event type
    ... // standard event props
    payload: {
      beaconId: '' // mandatory string: beacon id of own device
    }
}
```

#### event type `contact`

```javascript
{
    type: 'contact' // event type
    ... // standard event props
    payload: {
        contactedBeaconId: '' // mandatory string: contacted foreign beacon id
        distance: 17 // (optional) number: distance between devices (unit: meter)
    }
}
```

#### event type `health-state`

```javascript
{
    type: 'health-state' // event type
    ... // standard event props
    payload: {
      healthState: 'healthy|sick|maybe' // mandatory boolean: health state
    }
}
```
