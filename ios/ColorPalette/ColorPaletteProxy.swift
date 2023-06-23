//
//  ColorPaletteProxy.swift
//  starterGmNoExpo
//
//  Created by Giulio Milani on 20/06/23.
//

import SwiftUI

@objcMembers class SwiftUIPaletteProxy: NSObject {
  private var vc = UIHostingController(rootView: ColorPalette())
  static let storage = NSMutableDictionary()
  
  var colorNameState: String {
    set { vc.rootView.props.colorNameState = newValue }
    get { return vc.rootView.props.colorNameState }
  }
  
  var test: Int {
    set { vc.rootView.props.test = newValue }
    get { return vc.rootView.props.test }
  }
  
  var view: UIView {
    return vc.view
  }
}
