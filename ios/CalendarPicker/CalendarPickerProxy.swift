//
//  CalendarPickerProxy.swift
//  starterGmNoExpo
//
//  Created by Giulio Milani on 23/06/23.
//

import SwiftUI

@objcMembers class CalendarPickerProxy: NSObject {
  private var vc = UIHostingController(rootView: CalendarPicker())
  static let storage = NSMutableDictionary()
  
  var dateString: String {
    get {
      vc.rootView.props.dateString
    }
    set {
      vc.rootView.props.dateString = newValue
    }
  }
  
  var onDateChange: RCTBubblingEventBlock {
    set { vc.rootView.props.onDateChange = newValue }
    get { return vc.rootView.props.onDateChange }
  }
  
  var view: UIView {
    return vc.view
  }
}

