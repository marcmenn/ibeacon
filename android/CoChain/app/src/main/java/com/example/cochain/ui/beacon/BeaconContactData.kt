package com.example.cochain.ui.beacon

import java.time.LocalDate

class BeaconContactData(
    deviceId: String,
    beaconId: String,
    lastSeen: LocalDate,
    minimumDistance: Int,
    duration: Int,
    fit: Boolean
) {
    var deviceId: String = deviceId
        get() = field
    var beaconId: String = beaconId
        get() = field
    var lastSeen: LocalDate = lastSeen
        get() = field
    var minimumDistance: Int = minimumDistance
        get() = field
    var duration: Int = duration
        get() = field
    var fit: Boolean = fit
        get() = field

}
