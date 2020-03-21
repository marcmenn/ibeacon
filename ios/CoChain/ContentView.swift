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
    var date: Date
    var distance: Float
    var duration: Int
}

struct Me: Identifiable {
    var id = UUID()
    var infected: Bool
}

struct ContentView: View {
    @State var persons = [
        Person(name: "nobody met", infected: false, date: Date(), distance: 0, duration: 0)
    ]

    @State var me = Me(infected: false)

    let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

   var body: some View {
       VStack {
        Image(systemName: "person.circle.fill").font(Font.system(size: 60)).foregroundColor(me.infected ? Color.red : Color.white)
        Text("\(me.infected ? "krank" : "fit")").bold().font(.largeTitle).padding(12).background(me.infected ? Color.red: Color.black).foregroundColor(Color.white).cornerRadius(12.0)
        if(persons.count > 0) {
            ForEach(persons) { person in
                HStack {
                    Image(systemName: "person.circle.fill").font(Font.system(size: 52)).foregroundColor(Color.white).padding(5)
                    Text("Date\n\(self.formatedDate(date: person.date)) ").padding(5).foregroundColor(person.infected ? Color.red : Color.black).background(Color(red: 0.9, green: 0.9, blue: 0.9)).cornerRadius(6.0)
                    Text(String(format: "Distance\n%.2f m", person.distance)).padding(5).foregroundColor(person.infected ? Color.red : Color.black).background(Color(red: 0.9, green: 0.9, blue: 0.9)).cornerRadius(6.0)
                    Text("Duration\n\(person.duration) min").padding(5).foregroundColor(person.infected ? Color.red : Color.black).background(Color(red: 0.9, green: 0.9, blue: 0.9)).cornerRadius(6.0)
                }
            }
        }
    }
   .onReceive(timer) { _ in
        self.checkBeacons()
    }
   }

    func formatedDate(date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .none
        return formatter.string(for: date)!
    }


    func checkBeacons() {
        let sceneDelegate = UIApplication.shared.connectedScenes.first!.delegate as! SceneDelegate
        sceneDelegate.refreshBeacons()
        let beacons = sceneDelegate.beacons

        if (beacons.count > 0) {
            persons = []
            for index in 0...beacons.count - 1 {
                print(beacons[index])
                persons.append(Person(name: "\(beacons[index].major)_\(beacons[index].minor)", infected: false, date: Date(), distance: Float(beacons[index].accuracy), duration: 0))
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
