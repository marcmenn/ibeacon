package com.example.cochain.ui.query

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.cochain.ui.beacon.BeaconContactData

class QueryViewModel : ViewModel() {

    private val _beacons = MutableLiveData<LinkedHashMap<String, BeaconContactData>>().apply {
        value = LinkedHashMap()
    }
    val beacons: LiveData<LinkedHashMap<String, BeaconContactData>> = _beacons

    fun addBeaconContactData(beaconContactData: BeaconContactData) {
        _beacons.value?.put(beaconContactData.deviceId, beaconContactData)
        // update the LiveData value
        _beacons.value = _beacons.value
    }

}
