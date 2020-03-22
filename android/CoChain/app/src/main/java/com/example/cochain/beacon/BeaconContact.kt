package com.example.cochain.beacon

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.time.LocalDateTime

@Entity
data class BeaconContact(
    @PrimaryKey val beaconId: String,
    var lastSeen: Long,
    var minimumDistance: Float,
    var duration: Float,
    var fit: Boolean
) {
    override fun toString(): String {
        return "BeaconContact(beaconId='$beaconId', lastSeen=$lastSeen, minimumDistance=$minimumDistance, duration=$duration, fit=$fit)"
    }
}
