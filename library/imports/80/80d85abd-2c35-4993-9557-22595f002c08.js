"use strict";
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