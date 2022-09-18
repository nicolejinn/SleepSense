//
//  ContentView.swift
//  CandleLight Watch App
//
//  Created by Nadia on 2022-09-17.
//

import SwiftUI

let endpoint = URL(string: "http://bore.pub:35857/light")!

func postJson(json: [String:Any]) {
    do {
        let data = try JSONSerialization.data(withJSONObject: json, options: [])
        
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.httpBody = data
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        request.addValue("A62207BE-421F-45D3-BC93-713A86FCF5C3", forHTTPHeaderField: "x-access-token")
        
        let task = URLSession.shared.dataTask(with: request)
        task.resume()
    } catch {}
}

struct ContentView: View {
    @State private var on: Bool = false
    @State private var bri: Float = 0
    
    var body: some View {
        VStack {
            Text("SleepSense").font(.headline).scaleEffect(1.5).padding()
            HStack {
                Button("W", action: { postJson(json: ["sat": 0]) })
                Button("R", action: { postJson(json: ["hue": 0, "sat": 254]) })
            }
            Toggle("", isOn: $on).labelsHidden().padding().onChange(of: on) { value in
                postJson(json: ["on": value])
            }.scaleEffect(1.8).padding()
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View { ContentView() }
}
