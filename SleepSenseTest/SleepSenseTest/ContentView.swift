//
//  ContentView.swift
//  SleepSenseTest
//
//  Created by Nicole Jin on 2022-09-17.
//

import SwiftUI

func getSleepData(){
    
}

func parseSleepData(){
    if let path = URL(string: "file:///Users/nicolejin/Downloads/apple_health_export/export.xml"){ // temp placeholder xml file
        XMLTest().test(url: path)
    }
}

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundColor(.accentColor)
            Text("Hello, world!")
            Button("Print parsed sleep data", action: parseSleepData)

        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
