package com.example.cochain

import android.content.Context
import android.util.Log
import androidx.lifecycle.LiveData
import com.example.cochain.beacon.BeaconContact
import com.example.cochain.beacon.BeaconContactDao
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class BeaconDataRepository(context: Context) {
    companion object {
        private val TAG = this::class.java.declaringClass!!.name
    }
    private val beaconContactDao: BeaconContactDao

    val allBeacons: LiveData<List<BeaconContact>>
        get() = beaconContactDao.getAllLiveOrdered()

    init {
        val db = BeaconContactDatabase.getDatabase(context)
        beaconContactDao = db.beaconContactDao()
    }

    suspend fun insert(vararg beaconContacts: BeaconContact) {
        withContext(Dispatchers.IO) {
            Log.d(TAG,"inserting beacons: ${beaconContacts}")
            beaconContactDao.insert(*beaconContacts)
        }
    }

    suspend fun upsert(vararg beaconContacts: BeaconContact) {
        withContext(Dispatchers.IO) {
            Log.d(TAG,"upserting beacons: ${beaconContacts}")
            beaconContactDao.upsert(*beaconContacts)
        }
    }

    suspend fun deleteAll() {
        withContext(Dispatchers.IO) {
            beaconContactDao.deleteAll()
        }
    }

    suspend fun delete(beaconContact: BeaconContact) {
        withContext(Dispatchers.IO) {
            beaconContactDao.delete(beaconContact)
        }
    }
}
