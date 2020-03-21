//
//  SceneDelegate.swift
//  CoChain
//
//  Created by Lars Menzel on 20.03.20.
//  Copyright © 2020 Lars Menzel. All rights reserved.
//

import Foundation
import UIKit
import SwiftUI
import CoreLocation
import CoreBluetooth

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    var beacons: [CLBeacon] = []
    var beacon: CLBeaconRegion?
    var peripheralManager: CBPeripheralManager?
    var location: CLLocationManager?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        let contentView = ContentView()

        if let windowScene = scene as? UIWindowScene {
            let window = UIWindow(windowScene: windowScene)
            window.rootViewController = UIHostingController(rootView: contentView)
            self.window = window

            self.createBeacon()
            self.createLocationManageer()
            self.refreshBeacons()

            window.makeKeyAndVisible()
        }
    }

    func createBeacon() -> Void {
        let major: CLBeaconMajorValue = CLBeaconMajorValue(arc4random() % 100 + 1)
        let minor: CLBeaconMinorValue = CLBeaconMinorValue(arc4random() % 2 + 1)
        self.beacon = CLBeaconRegion(uuid: iBeaconConfiguration.uuid, major: major, minor: minor, identifier: "com.menzelapps.CoChain")
        self.peripheralManager = CBPeripheralManager(delegate: self, queue: nil)
    }

    func createLocationManageer() -> Void {
        self.location = CLLocationManager()
        self.location!.delegate = self
        self.location!.requestAlwaysAuthorization()
    }

    func refreshBeacons() -> Void {
        let beaconRegion: CLBeaconRegion = CLBeaconRegion(uuid: iBeaconConfiguration.uuid, identifier: "com.menzelapps.CoChain")
        self.location!.startMonitoring(for: beaconRegion)
    }

    func sceneDidDisconnect(_ scene: UIScene) {
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
    }

    func sceneWillResignActive(_ scene: UIScene) {
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
    }
}

extension SceneDelegate: CBPeripheralManagerDelegate {
    func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
        let state: CBManagerState = peripheralManager!.state

        if state == .poweredOff {
            print("Bluetooth Off")
        }

        if state == .unsupported {
            print("Unsupported Beacon")
        }

        if state == .poweredOn {
            print("Broadcast")

            let UUID:UUID = (self.beacon?.uuid)!
            let serviceUUIDs: Array<CBUUID> = [CBUUID(nsuuid: UUID)]

            // Why NSMutableDictionary can not convert to Dictionary<String, Any> 😂
            var peripheralData: Dictionary<String, Any> = self.beacon!.peripheralData(withMeasuredPower: nil)  as NSDictionary as! Dictionary<String, Any>
            peripheralData[CBAdvertisementDataLocalNameKey] = "Contact Chain"
            peripheralData[CBAdvertisementDataServiceUUIDsKey] = serviceUUIDs

            self.peripheralManager!.startAdvertising(peripheralData)
        }
    }
}

extension SceneDelegate: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus)
    {
        guard status == .authorizedAlways else {
            print("******** User not authorized !!!!")
            return
        }
    }

    func locationManager(_ manager: CLLocationManager, didStartMonitoringFor region: CLRegion)
    {
        manager.requestState(for: region)
    }

    func locationManager(_ manager: CLLocationManager, didDetermineState state: CLRegionState, for region: CLRegion)
    {
        if state == .inside {
            manager.startRangingBeacons(in: region as! CLBeaconRegion)
            return
        }

        manager.stopRangingBeacons(in: region as! CLBeaconRegion)
    }

    func locationManager(_ manager: CLLocationManager, didRangeBeacons beacons: [CLBeacon], in region: CLBeaconRegion) {
        self.beacons = beacons
        if (self.beacons.count > 0) {
            let bea = self.beacons.first!
            print("\(bea)")
            print("accuracy \(bea.accuracy)")
            print("rssi \(bea.rssi)")
            print("proximity \(bea.proximity.rawValue)")
        }
        manager.stopRangingBeacons(in: region)
    }
}
