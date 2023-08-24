
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/GunUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXEd1blVJLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmFja0J0bkNsaWNrIiwiR2FtZUFwcCIsImF1ZGlvTWFuYWdlciIsInBsYXlFZmZlY3QiLCJ1aU1hbmFnZXIiLCJzaG93VUkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBT0xDLEVBQUFBLFlBUEssMEJBT1U7QUFDWEMsSUFBQUEsT0FBTyxDQUFDQyxZQUFSLENBQXFCQyxVQUFyQixDQUFnQyxPQUFoQztBQUNBRixJQUFBQSxPQUFPLENBQUNHLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCLFNBQXpCO0FBQ0g7QUFWSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJhY2tCdG5DbGljaygpIHtcclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdjbGljaycpXHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1VJKCdMb2dpblVJJylcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=