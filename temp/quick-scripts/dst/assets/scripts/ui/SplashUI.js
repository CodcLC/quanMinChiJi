
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/SplashUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80d85q9LDVJk5VXIllfACwI', 'SplashUI');
// scripts/ui/SplashUI.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
      GameApp.uiManager.showUI("LoginUI");
    })));
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXFNwbGFzaFVJLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibm9kZSIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJHYW1lQXBwIiwidWlNYW5hZ2VyIiwic2hvd1VJIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQVFMQyxFQUFBQSxNQVJLLG9CQVFJO0FBQ0wsU0FBS0MsSUFBTCxDQUFVQyxTQUFWLENBQW9CTixFQUFFLENBQUNPLFFBQUgsQ0FBWVAsRUFBRSxDQUFDUSxTQUFILENBQWEsQ0FBYixDQUFaLEVBQTZCUixFQUFFLENBQUNTLFFBQUgsQ0FBWSxZQUFNO0FBQy9EQyxNQUFBQSxPQUFPLENBQUNDLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCLFNBQXpCO0FBQ0gsS0FGZ0QsQ0FBN0IsQ0FBcEI7QUFHSDtBQVpJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgyKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93VUkoXCJMb2dpblVJXCIpXHJcbiAgICAgICAgfSkpKVxyXG4gICAgfSxcclxuXHJcblxyXG59KTtcclxuIl19