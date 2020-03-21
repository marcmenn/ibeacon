//
//  ContentView.swift
//  CoChain
//
//  Created by Lars Menzel on 20.03.20.
//  Copyright © 2020 Lars Menzel. All rights reserved.
//

import SwiftUI
import CoreLocation
import CoreBluetooth

struct Person: Identifiable {
    var id = UUID()
    var name: String
    var infected: Bool
    var risk: Int
    var distance: Float
}

struct ContentView: View {
    @State var persons = [
        Person(name: "nobody met", infected: false, risk: 0, distance: 0)
    ]

    @State var me = Person(name: "Me", infected: false, risk: Int(arc4random() % 100 + 1), distance: -1)

    let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

   var body: some View {
       VStack {
           Text("Contact Chain Tracker").bold().font(.largeTitle).padding(5)
           Text("\(me.name): \(me.risk)% ").bold().font(.largeTitle).padding(12).background(me.infected ? Color.red: Color.black).foregroundColor(Color.white).cornerRadius(12.0)
            .padding(100)
        if(persons.count > 0) {
            ForEach(persons) { person in
                Text("\(person.name): \(person.distance)m ").padding(5).foregroundColor(person.infected ? Color.red : Color.black).background(Color(red: 0.9, green: 0.9, blue: 0.9)).cornerRadius(6.0).padding(5)
            }
        }
        Image(systemName: "heart.circle.fill").font(Font.system(.largeTitle)).foregroundColor(me.infected ? Color.red : Color.white).padding(15)
        }
       .onReceive(timer) { _ in
            self.checkBeacons()
        }
   }

    func checkBeacons() {
        let sceneDelegate = UIApplication.shared.connectedScenes.first!.delegate as! SceneDelegate
        sceneDelegate.refreshBeacons()
        let beacons = sceneDelegate.beacons

        if (beacons.count > 0) {
            persons = []
            for index in 0...beacons.count - 1 {
                print(beacons[index])
                persons.append(Person(name: "\(beacons[index].major)_\(beacons[index].minor)", infected: false, risk: Int(beacons[index].accuracy * 100), distance: Float(beacons[index].accuracy)))
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
