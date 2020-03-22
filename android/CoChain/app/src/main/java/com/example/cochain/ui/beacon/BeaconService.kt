package com.example.cochain.ui.beacon

import android.app.IntentService
import android.app.Service
import android.content.Intent
import android.os.Binder
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.annotation.RequiresApi
import org.altbeacon.beacon.*

class BeaconServiceBinder(service: BeaconService) : Binder() {
    var service: BeaconService = service
        get() = field
}

class BeaconService : Service(), BeaconConsumer {

    companion object {
        private const val TAG = "BeaconService"
        // TODO: do we need to hard code these for CoChain, sync with iOS app?
        const val MAJOR_IDENTIFIER = 1234;
        const val MINOR_IDENTIFIER = 4711;
        val SCANNING_REGION = Region("CoChainScanningRegion", null, Identifier.fromInt(BeaconService.MAJOR_IDENTIFIER), Identifier.fromInt(BeaconService.MINOR_IDENTIFIER))
        // for testing only: all beacons
        //val SCANNING_REGION = Region("CoChainScanningRegion", null, null, null)
    }

    private val rangeNotifer = RangeNotifier { beacons: MutableCollection<Beacon>, region: Region ->
        Log.i(TAG, "RangeNotifier update, number of beacons in region: ${beacons.size}, region: ${region}")
        if (beacons.size > 0) {
            beacons.forEach { beacon: Beacon ->
                Log.d(TAG, "RangeNotifier beacon detected: ${beacon}")
            }
        }
    }

    private lateinit var beaconManager: BeaconManager

    override fun onBind(intent: Intent?): IBinder? {
        return BeaconServiceBinder(this)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.i(TAG, "starting service")
        if (null != intent) {
            beaconManager = BeaconManager.getInstanceForApplication(this)
            beaconManager.bind(this)
            // don't need to be sticky... if killed and restarted, the MainActivity BootstrapNotifier will restart the service
        }
        return START_NOT_STICKY
    }

    override fun onDestroy() {
        Log.i(TAG, "destroying service")
        super.onDestroy()
        beaconManager.removeRangeNotifier(rangeNotifer)
        beaconManager.unbind(this)
    }

    override fun onBeaconServiceConnect() {
        Log.i(TAG, "beaconService connected, start range scanning...")
        beaconManager.addRangeNotifier(rangeNotifer)
        beaconManager.startRangingBeaconsInRegion(SCANNING_REGION)
    }

}
