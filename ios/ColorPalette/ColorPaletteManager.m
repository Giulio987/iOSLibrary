//
//  ColorPaletteManager.m
//  starterGmNoExpo
//
//  Created by Giulio Milani on 20/06/23.
//

#import <Foundation/Foundation.h>
#import "starterGmNoExpo-Swift.h"
#import "React/RCTViewManager.h"
#import "React/RCTComponentEvent.h"
#import "iosLib-Bridging-Header.h"

@interface ColorPaletteManager : RCTViewManager
@end

@implementation ColorPaletteManager

RCT_EXPORT_MODULE()


RCT_EXPORT_SWIFTUI_PROPERTY_STR(colorNameState, NSString *, SwiftUIPaletteProxy);
RCT_EXPORT_SWIFTUI_PROPERTY(test, int, SwiftUIPaletteProxy);

- (UIView *)view {
  SwiftUIPaletteProxy *proxy = [[SwiftUIPaletteProxy alloc] init];
  UIView *view = [proxy view];
  NSMutableDictionary *storage = [SwiftUIPaletteProxy storage];
  storage[[NSValue valueWithNonretainedObject:view]] = proxy;
  return view;
}

@end
