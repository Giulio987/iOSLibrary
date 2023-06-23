//
//  CalendarPickerManager.m
//  starterGmNoExpo
//
//  Created by Giulio Milani on 23/06/23.
//

#import <Foundation/Foundation.h>
#import "starterGmNoExpo-Swift.h"
#import "React/RCTViewManager.h"
#import "React/RCTComponentEvent.h"
#import "iosLib-Bridging-Header.h"

@interface CalendarPickerManager : RCTViewManager
@end

@implementation CalendarPickerManager

RCT_EXPORT_MODULE()

RCT_EXPORT_SWIFTUI_PROPERTY_STR(dateString, NSString *, CalendarPickerProxy)
RCT_EXPORT_SWIFTUI_CALLBACK(onDateChange, RCTDirectEventBlock, CalendarPickerProxy)


- (UIView *) view{
  CalendarPickerProxy *proxy = [[CalendarPickerProxy alloc] init];
  UIView *view = [proxy view];
  NSMutableDictionary *storage = [CalendarPickerProxy storage];
  storage[[NSValue valueWithNonretainedObject:view]] = proxy;
  return view;
}

@end
