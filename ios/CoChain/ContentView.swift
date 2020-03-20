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
    var distance: CLLocationAccuracy
}

struct ContentView: View {
    @State var persons = [
        Person(name: "Peter", infected: false, risk: Int(arc4random() % 100 + 1), distance: -1),
        Person(name: "Marcus", infected: false, risk: Int(arc4random() % 100 + 1), distance: -1),
        Person(name: "Lars", infected: true, risk: Int(arc4random() % 100 + 1), distance: -1)
    ]

    @State var me = Person(name: "Me", infected: false, risk: Int(arc4random() % 100 + 1), distance: -1)

   var body: some View {
       VStack {
           Text("Contact Chain Tracker").bold().font(.largeTitle).padding(5)
           Text("\(me.name): \(me.risk)% ").bold().font(.largeTitle).padding(12).background(me.infected ? Color.red: Color.black).foregroundColor(Color.white).cornerRadius(12.0)
            .padding(100)
           ForEach(persons) { person in
            Text("\(person.name): \(person.risk)% ").padding(5).foregroundColor(person.infected ? Color.red : Color.black).background(Color(red: 0.9, green: 0.9, blue: 0.9)).cornerRadius(6.0).padding(5)
           }
        Image(systemName: "heart.circle.fill").font(Font.system(.largeTitle)).foregroundColor(me.infected ? Color.red : Color.white).padding(15)
        Button(action:{self.addPerson()}, label: {Text("Add Person")}).padding(25)
        Button(action:{self.removePerson()}, label:{Text("Remove Person")})
        }
   }

    func addPerson() {
        persons.append(Person(name: "Stranger", infected: true, risk: 100, distance: -1))
        me.infected = true
        me.risk = 100
    }

    func removePerson() {
        if (persons.count > 0) {
            persons.remove(at: persons.count - 1)
            me.infected = false
            me.risk = Int(arc4random() % 100 + 1)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
