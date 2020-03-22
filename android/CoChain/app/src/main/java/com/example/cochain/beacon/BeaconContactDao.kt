package com.example.cochain.beacon

import androidx.lifecycle.LiveData
import androidx.room.*

@Dao
interface BeaconContactDao {
    @Query("SELECT * from beaconcontact")
    fun getAll(): List<BeaconContact>

    @Query("SELECT * from beaconcontact ORDER BY lastSeen DESC")
    fun getAllLiveOrdered(): LiveData<List<BeaconContact>>

    @Query("SELECT * from beaconcontact WHERE beaconId IN (:beaconIds)")
    fun loadByIds(beaconIds: Array<String>): List<BeaconContact>

    @Insert(onConflict = OnConflictStrategy.ABORT)
    fun insert(vararg beacons: BeaconContact)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun upsert(vararg beacons: BeaconContact)

    @Update
    fun update(vararg beacons: BeaconContact)

    @Delete
    fun delete(beacon: BeaconContact)

    @Query("DELETE from beaconcontact")
    fun deleteAll()
}
