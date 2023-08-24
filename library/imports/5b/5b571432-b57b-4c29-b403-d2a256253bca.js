"use strict";
cc._RF.push(module, '5b571QytXtMKbQD0qJWJTvK', 'GunUI');
// scripts/ui/GunUI.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  backBtnClick: function backBtnClick() {
    GameApp.audioManager.playEffect('click');
    GameApp.uiManager.showUI('LoginUI');
  }
});

cc._RF.pop();