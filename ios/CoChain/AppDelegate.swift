//
//  AppDelegate.swift
//  CoChain
//
//  Created by Lars Menzel on 20.03.20.
//  Copyright © 2020 Lars Menzel. All rights reserved.
//

import UIKit
import CoreLocation

public struct BeaconEvent {
    var deviceId: String
    var beaconId1: String
    var beaconId2: String
    var date: Date
    var distance: Float
    var duration: Int
}

public var serverUrl = "https://cochain.formatquadrat.de"
public var deviceIdString = ""
public var beaconIdString = ""
public var beaconRange = ""
public var eventList: [BeaconEvent] = []
public var beaconList: [CLBeacon] = []
public var myBeacon: CLBeaconRegion?

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, CLLocationManagerDelegate {

    private let locationManager: CLLocationManager = CLLocationManager()

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        self.createUIDs()
        self.locationManager.delegate = self
        return true
    }

    func createUIDs() {
        deviceIdString = UserDefaults.standard.string(forKey: "deviceIdString") ?? UUID().uuidString
        UserDefaults.standard.set(deviceIdString, forKey: "deviceIdString")
        print("deviceId: \(deviceIdString)")

        beaconIdString = UserDefaults.standard.string(forKey: "beaconIdString") ?? UUID().uuidString
        UserDefaults.standard.set(beaconIdString, forKey: "beaconIdString")
        print("beaconId: \(beaconIdString)")

        beaconRange = UserDefaults.standard.string(forKey: "beaconRange") ?? "7FA08BC7-A55F-45FC-85C0-0BF26F899530"
        UserDefaults.standard.set(beaconRange, forKey: "beaconRange")
        print("beaconRange: \(beaconRange)")
    }

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
    }
}

