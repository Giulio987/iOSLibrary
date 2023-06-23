//
//  CalendarPicker.swift
//  starterGmNoExpo
//
//  Created by Giulio Milani on 23/06/23.
//

import SwiftUI

class CalendarProps: ObservableObject {
    @Published var dateString: String {
        didSet {
            if let newDate = dateFormatter.date(from: dateString), newDate != date {
                date = newDate
            }
        }
    }
    
    @Published var date: Date {
        didSet {
            if dateString != dateFormatter.string(from: date) {
                dateString = dateFormatter.string(from: date)
            }
        }
    }
  
  @Published var onDateChange: RCTDirectEventBlock = {_ in}
    
    private let dateFormatter: DateFormatter
    
    init(initialDate: Date) {
        self.dateFormatter = DateFormatter()
        self.dateFormatter.dateFormat = "yyyy-MM-dd"
        self.date = initialDate
        self.dateString = self.dateFormatter.string(from: initialDate)
    }
}

struct CalendarPicker: View {
    @ObservedObject var props = CalendarProps(initialDate: Date())

    var body: some View {
        VStack {
            DatePicker("Enter your birthday", selection: $props.date, displayedComponents: [.date])
                .datePickerStyle(.graphical)
                .frame(maxHeight: 400)
                .onChange(of: props.date, perform: {newValue in
                     let dateFormatter = DateFormatter()
                     dateFormatter.dateFormat = "yyyy-MM-dd"
                     let dateString = dateFormatter.string(from: newValue)
                     
                     NSLog("props.date: %@", newValue as NSDate)
                     NSLog("props.dateString: %@", dateString)
                     
                     props.dateString = dateString
                     props.onDateChange(["Date": dateString])
                })
        }
    }
}
