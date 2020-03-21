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
        Button(action:{self.setState()}, label:{Text("I feel sick!")}).padding(20)
        Button(action:{self.metOne()}, label:{Text("met one")}).padding(20)
        Button(action:{self.getState()}, label:{Text("get state one")}).padding(20)
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

    func metOne() {
        let url = NSURL(string: "https://jsonplaceholder.typicode.com/todos/1")! as URL
        var components = URLComponents(url: url, resolvingAgainstBaseURL: false)!
        components.queryItems = [
            URLQueryItem(name: "deviceId", value: "deviceId"),
            URLQueryItem(name: "beaconIdMe", value: "beaconId1"),
            URLQueryItem(name: "beaconIdMet", value: "beaconId2"),
            URLQueryItem(name: "timestamp", value: "2020=03=12")
        ]
        let query = components.url!.query

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = Data(query!.utf8)

        let task = URLSession.shared.dataTask(with: request){data, response, error in
            guard error == nil && data != nil else {
                print("error")
                return
            }
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200{
                print("statusCode: \(httpStatus.statusCode)")
                print("response = \(String(describing: response))")
            }
            let responseString = String(data: data!, encoding: String.Encoding.utf8)
            print("responseString = \(String(describing: responseString))")
        }
        task.resume()
    }

    func setState() {
        let url = NSURL(string: "https://jsonplaceholder.typicode.com/todos/1")! as URL
        var components = URLComponents(url: url, resolvingAgainstBaseURL: false)!
        components.queryItems = [
            URLQueryItem(name: "deviceId", value: "deviceId"),
            URLQueryItem(name: "beaconId", value: "beaconId"),
            URLQueryItem(name: "state", value: "infected")
        ]
        let query = components.url!.query

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = Data(query!.utf8)

        let task = URLSession.shared.dataTask(with: request){data, response, error in
            guard error == nil && data != nil else {
                print("error")
                return
            }
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200{
                print("statusCode: \(httpStatus.statusCode)")
                print("response = \(String(describing: response))")
            }
            let responseString = String(data: data!, encoding: String.Encoding.utf8)
            print("responseString = \(String(describing: responseString))")
        }
        task.resume()
    }

    func getState() {
        me.infected = !me.infected

        let request = NSMutableURLRequest(url: NSURL(string: "https://jsonplaceholder.typicode.com/todos/1")! as URL, cachePolicy: .useProtocolCachePolicy, timeoutInterval: 10.0)
        request.httpMethod = "GET"
        request.allHTTPHeaderFields = ["cache-control": "no-cache"]

        let session = URLSession.shared
        _ = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
            if error == nil && data != nil {
                do {
                    let json = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.mutableContainers) as! [String:AnyObject]
                    print(json)
                } catch {
                   print("Error")
                }
            }
            else if error != nil {
                print("Error accessing api: \(String(describing: error))")
            }
        }).resume()
    }

    func checkBeacons() {
        let sceneDelegate = UIApplication.shared.connectedScenes.first!.delegate as! SceneDelegate
        sceneDelegate.refreshBeacons()

        if (beaconList.count > 0) {
            persons = []
            for index in 0...beaconList.count - 1 {
                print(beaconList[index])
                persons.append(Person(name: "\(beaconList[index].major)_\(beaconList[index].minor)", infected: false, date: Date(), distance: Float(beaconList[index].accuracy), duration: 0))
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
