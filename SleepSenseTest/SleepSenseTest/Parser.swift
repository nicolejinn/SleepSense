//
//  Parser.swift
//  SleepSenseTest
//
//  Created by Nicole Jin on 2022-09-18.
//

import Foundation

class XMLTest : NSObject, XMLParserDelegate {
    
    func test(url: URL) {
        let parser = XMLParser(contentsOf: url)!
        parser.delegate = self
        let success = parser.parse()
        if success {
            print("done")
        } else {
            print("error \(parser.parserError!)")
        }
    }

    var depth = 0
    var depthIndent: String {
        return [String](repeating: "  ", count: self.depth).joined()
    }

    func parser(_ parser: XMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [String : String] = [:]) {
        print("\(self.depthIndent)>\(elementName)")
        self.depth += 1
    }

    func parser(_ parser: XMLParser, didEndElement elementName: String, namespaceURI: String?, qualifiedName qName: String?) {
        self.depth -= 1
        print("\(self.depthIndent)<\(elementName)")
    }
}
