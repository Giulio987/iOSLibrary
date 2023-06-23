
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"
#import <React/RCTViewManager.h>

//FUNZIONE PER L'EXPORTING DI TUTTI I TIPI TRANNE LE STRINGHE
#define RCT_EXPORT_SWIFTUI_PROPERTY(name, type, proxyClass)                                                 \
RCT_REMAP_VIEW_PROPERTY(name, __custom__, type)                                                             \
- (void)set_##name:(id)json forView:(UIView *)view withDefaultView:(UIView *)defaultView RCT_DYNAMIC {      \
  NSMutableDictionary *storage = [proxyClass storage];                                                      \
  proxyClass *proxy = storage[[NSValue valueWithNonretainedObject:view]];                                   \
  proxy.name = [json type##Value];                                                                          \
}                                                                                                           \

//FUNZIONE PER L'EXPORTING DI STRINGHE
#define RCT_EXPORT_SWIFTUI_PROPERTY_STR(name, type, proxyClass)                                              \
RCT_REMAP_VIEW_PROPERTY(name, __custom__, type)                                                              \
- (void)set_##name:(NSString *)jsonString forView:(UIView *)view withDefaultView:(UIView *)defaultView {     \
  NSMutableDictionary *storage = [proxyClass storage];                                                       \
  proxyClass *proxy = storage[[NSValue valueWithNonretainedObject:view]];                                    \
  proxy.name = jsonString;                                                                                   \
}                                                                                                            \

//FUNZIONE PER L'EXPORTING DI CALLBACK
#define RCT_EXPORT_SWIFTUI_CALLBACK(name, type, proxyClass)                                                 \
RCT_REMAP_VIEW_PROPERTY(name, __custom__, type)                                                             \
- (void)set_##name:(id)json forView:(UIView *)view withDefaultView:(UIView *)defaultView RCT_DYNAMIC {      \
  NSMutableDictionary *storage = [proxyClass storage];                                                      \
  proxyClass *proxy = storage[[NSValue valueWithNonretainedObject:view]];                                   \
  void (^eventHandler)(NSDictionary *event) = ^(NSDictionary *event) {                                      \
  RCTComponentEvent *componentEvent = [[RCTComponentEvent alloc] initWithName:@""#name                      \
                                                                        viewTag:view.reactTag               \
                                                                           body:event];                     \
    [self.bridge.eventDispatcher sendEvent:componentEvent];                                                 \
  };                                                                                                        \
  proxy.name = eventHandler;                                                                                \
}
