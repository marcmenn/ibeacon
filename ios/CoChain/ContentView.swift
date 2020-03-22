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

struct ContentView: View {
    @State var persons = [Person(name: "nobody met", infected: false, date: Date(), distance: 0, duration: 0)]
    @State var me = Me(infected: false)
    let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()
    @State private var showingAlert = false
    @State private var alertText = ""

    var body: some View {
       VStack {
        Image(systemName: "person.circle.fill").font(Font.system(size: 60)).foregroundColor(me.infected ? Color.red : Color.white)
        Text("\(me.infected ? "krank" : "fit")").bold().font(.largeTitle).padding(12).background(me.infected ? Color.red: Color.black).foregroundColor(Color.white).cornerRadius(12.0)
        Button(action:{self.reportContact()}, label:{Text("report contact")}).padding(20)
        Button(action:{self.healthState()}, label:{Text(me.infected ? "I feel healthy" : "I feel sick!")}).padding(20)
        Button(action:{self.getContacts()}, label:{Text("get contacts")}).padding(20)
        if(persons.count > 0) {
            ForEach(persons) { person in
                HStack {
                    Image(systemName: "person.circle.fill").font(Font.system(size: 52)).foregroundColor(Color.white).padding(5)
                    Text("Date\n\(formatedDate(date: person.date)) ").padding(5).foregroundColor(person.infected ? Color.red : Color.black).background(Color(red: 0.9, green: 0.9, blue: 0.9)).cornerRadius(6.0)
                    Text(String(format: "Distance\n%.2f m", person.distance)).padding(5).foregroundColor(person.infected ? Color.red : Color.black).background(Color(red: 0.9, green: 0.9, blue: 0.9)).cornerRadius(6.0)
                    Text("Duration\n\(person.duration) min").padding(5).foregroundColor(person.infected ? Color.red : Color.black).background(Color(red: 0.9, green: 0.9, blue: 0.9)).cornerRadius(6.0)
                }
            }
        }
    }
    .onReceive(timer) { _ in
        self.checkBeacons()
        }
    .alert(isPresented: $showingAlert) {
        Alert(title: Text("Server Response"), message: Text(self.alertText), dismissButton: .default(Text("Got it!")))
    }
    }

    func checkBeacons() {
        let sceneDelegate = UIApplication.shared.connectedScenes.first!.delegate as! SceneDelegate
        sceneDelegate.refreshBeacons()

        if (beaconList.count > 0) {
            persons = []
            for index in 0...beaconList.count - 1 {
//                print(beaconList[index])
                persons.append(Person(name: "\(beaconList[index].major)_\(beaconList[index].minor)", infected: false, date: Date(), distance: Float(beaconList[index].accuracy), duration: 0))
            }
        }
    }

    func showAlert(text: Any) {
        self.alertText = "\(text)"
        self.showingAlert = true
    }

    func reportContact() {
        postCall(route: "contact", parameters: ["beaconId": beaconIdString,"contactedBeaconId": UUID().uuidString,"timestamp": "\(Date())"], completion: showAlert)
    }

    func healthState() {
        me.infected = !me.infected
        postCall(route: "health-state", parameters: ["healthState": me.infected ? "sick" : "healthy","timestamp": "\(Date())"], completion: showAlert)
    }

    func getContacts() {
        getCall(route: "contact", completion: showAlert)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
