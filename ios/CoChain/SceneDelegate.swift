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

class SceneDelegate: UIResponder, UIWindowSceneDelegate, CBPeripheralManagerDelegate {
    func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager)     {
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

    var window: UIWindow?
    var beacons: [CLBeacon] = []
    var beacon: CLBeaconRegion?
    var location: CLLocationManager?
    var peripheralManager: CBPeripheralManager?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        // Use this method to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`.
        // If using a storyboard, the `window` property will automatically be initialized and attached to the scene.
        // This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead).

        // Create the SwiftUI view that provides the window contents.
        let contentView = ContentView()

        // Use a UIHostingController as window root view controller.
        if let windowScene = scene as? UIWindowScene {
            let window = UIWindow(windowScene: windowScene)
            window.rootViewController = UIHostingController(rootView: contentView)
            self.window = window
            window.makeKeyAndVisible()


            let uuid = UUID(uuidString: "7FA08BC7-A55F-45FC-85C0-0BF26F899530")!
            let major: CLBeaconMajorValue = CLBeaconMajorValue(arc4random() % 100 + 1)
            let minor: CLBeaconMinorValue = CLBeaconMinorValue(arc4random() % 2 + 1)
            self.beacon = CLBeaconRegion(proximityUUID: uuid, major: major, minor: minor, identifier: "com.menzelapps.CoChain")
            self.peripheralManager = CBPeripheralManager(delegate: self, queue: nil)
        }
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        // Called as the scene is being released by the system.
        // This occurs shortly after the scene enters the background, or when its session is discarded.
        // Release any resources associated with this scene that can be re-created the next time the scene connects.
        // The scene may re-connect later, as its session was not neccessarily discarded (see `application:didDiscardSceneSessions` instead).
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        // Called when the scene has moved from an inactive state to an active state.
        // Use this method to restart any tasks that were paused (or not yet started) when the scene was inactive.
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Called when the scene will move from an active state to an inactive state.
        // This may occur due to temporary interruptions (ex. an incoming phone call).
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        // Called as the scene transitions from the background to the foreground.
        // Use this method to undo the changes made on entering the background.
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // Called as the scene transitions from the foreground to the background.
        // Use this method to save data, release shared resources, and store enough scene-specific state information
        // to restore the scene back to its current state.
    }


}

