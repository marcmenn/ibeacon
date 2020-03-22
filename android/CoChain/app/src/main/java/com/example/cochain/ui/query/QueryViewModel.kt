package com.example.cochain.ui.query

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.viewModelScope
import com.example.cochain.BeaconDataRepository
import com.example.cochain.beacon.BeaconContact
import kotlinx.coroutines.launch
import org.altbeacon.beacon.BeaconData

class QueryViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: BeaconDataRepository

    val beacons: LiveData<List<BeaconContact>>

    init {
        repository = BeaconDataRepository(application)
        beacons = repository.allBeacons;
    }

    fun insert(vararg beaconContacts: BeaconContact) {
        viewModelScope.launch { repository.insert(*beaconContacts) }
    }

    fun upsert(vararg beaconContacts: BeaconContact) {
        viewModelScope.launch { repository.upsert(*beaconContacts) }
    }

    fun deleteAll() {
        viewModelScope.launch { repository.deleteAll() }
    }

    fun delete(beaconContact: BeaconContact) {
        viewModelScope.launch { repository.delete(beaconContact) }
    }
}
