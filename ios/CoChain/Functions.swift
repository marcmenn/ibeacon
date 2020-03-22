//
//  Functions.swift
//  CoChain
//
//  Created by Lars Menzel on 22.03.20.
//  Copyright © 2020 Lars Menzel. All rights reserved.
//

import UIKit

func postCall(route: String, parameters: [String: Any], completion: @escaping (_ result: Any) -> Void) {
    let url = NSURL(string: "\(serverUrl)/api/device/\(deviceIdString)/\(route)")! as URL
    let jsonData = try? JSONSerialization.data(withJSONObject: parameters)

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.httpBody = jsonData
    request.allHTTPHeaderFields = ["Content-Type": "application/json"]

    let task = URLSession.shared.dataTask(with: request){data, response, error in
        guard error == nil && data != nil else {
            print("Error")
            return
        }
        if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200{
            completion("\(httpStatus.statusCode): \(String(describing: response))")
        }
        do {
           let json = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.mutableContainers) as! [String:AnyObject]
           completion(json)
        } catch {
           print("Error")
        }
    }
    task.resume()
}

func getCall(route: String, completion: @escaping (_ result: Any) -> Void) {

    let request = NSMutableURLRequest(url: NSURL(string: "\(serverUrl)/api/device/\(deviceIdString)/\(route)")! as URL, cachePolicy: .useProtocolCachePolicy, timeoutInterval: 10.0)
    request.httpMethod = "GET"
    request.allHTTPHeaderFields = ["cache-control": "no-cache"]

    let session = URLSession.shared
    _ = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
        if error == nil && data != nil {
            do {
                let json = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.mutableContainers) as! [String:AnyObject]
                completion(json)
            } catch {
               print("Error")
            }
        }
        else if error != nil {
            print("Error accessing api: \(String(describing: error))")
        }
    }).resume()
}

func formatedDate(date: Date) -> String {
    let formatter = DateFormatter()
    formatter.dateStyle = .short
    formatter.timeStyle = .none
    return formatter.string(for: date)!
}

func formatedUTC(date: Date) -> String {
    let format = DateFormatter()
    format.timeZone = .current
    format.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZ"
    return format.string(from: date)
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
