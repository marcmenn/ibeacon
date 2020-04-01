//
//  Globals.swift
//  CoChain
//
//  Created by Lars Menzel on 22.03.20.
//  Copyright © 2020 Lars Menzel. All rights reserved.
//

import CoreLocation

public struct BeaconEvent {
    var deviceId: String
    var beaconId1: String
    var beaconId2: String
    var date: Date
    var distance: Float
    var duration: Int
}

struct Person: Identifiable {
    var id = UUID()
    var name: String
    var infected: Bool
    var date: Date
    var distance: Float
    var duration: Int
}

struct Me: Identifiable {
    var id = UUID()
    var infected: Bool
}

public var deviceIdString = ""
public var beaconIdString = ""
public var beaconRange = ""
public var eventList: [BeaconEvent] = []
public var beaconList: [CLBeacon] = []
public var myBeacon: CLBeaconRegion?

