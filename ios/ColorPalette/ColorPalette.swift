//
//  ColorPalette.swift
//  starterGmNoExpo
//
//  Created by Giulio Milani on 20/06/23.
//

import SwiftUI

let colorNames = [
"clear",
"black",
"white",
"gray",
"red",
"green",
"blue",
"orange",
"yellow",
"pink",
"purple",
"primary",
]

extension Color {
    init?(wordName: String) {
        switch wordName {
        case "clear":       self = .clear
        case "black":       self = .black
        case "white":       self = .white
        case "gray":        self = .gray
        case "red":         self = .red
        case "green":       self = .green
        case "blue":        self = .blue
        case "orange":      self = .orange
        case "yellow":      self = .yellow
        case "pink":        self = .pink
        case "purple":      self = .purple
        case "primary":     self = .primary
        case "secondary":   self = .secondary
        default:            return nil
        }
    }
}


class ColorProps: ObservableObject {
  @Published var colorNameState: String = "red"
  @Published var test: Int = 1
}

struct ColorPalette: View {
  @ObservedObject var props = ColorProps()
    var body: some View {
        ScrollView(showsIndicators: false){
            ForEach(colorNames, id: \.self){ color in
              ColorComponent(colorName: color, props: props)
            }
        }.padding(20)
    }
}


struct ColorComponent: View {
  @State var colorName = "red"
  @ObservedObject var props: ColorProps
    var body: some View {
        ZStack(alignment: .top){
            RoundedRectangle(cornerRadius: 20).stroke()
            VStack(alignment: .leading){
              RoundedRectangle(cornerRadius: 20).foregroundColor(Color(wordName: colorName)).frame(height: 200).padding(10)
                Text(colorName).padding(.leading, 10)
              Text("\(props.test) + \(props.colorNameState)").padding([.leading, .bottom], 10).padding(.top, 1)
            }
        }.padding(.top, 10)
    }
}
