
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/DailyPopup.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3aba0X4OkJLfae48HsS/dWc', 'DailyPopup');
// scripts/ui/DailyPopup.js

"use strict";

var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {
    dailyGroup: cc.Node,
    dailyGotNum: {
      "default": 0,
      type: cc.number,
      visible: false
    },
    closeBtn: cc.Node,
    onceClick: true
  },
  onLoad: function onLoad() {
    this.dailyGotNum = cc.sys.localStorage.getItem("EatChicken_dailyGotNum");

    if (this.dailyGotNum == null || this.dailyGotNum == undefined || this.dailyGotNum == "") {
      this.dailyGotNum = 0;
      cc.sys.localStorage.setItem("EatChicken_dailyGotNum", 0);
    } else {
      this.dailyGotNum = parseInt(this.dailyGotNum);
    }

    this.initShow();
    var show = cc.sequence(cc.delayTime(3), cc.scaleTo(0.3, 1));
    this.closeBtn.runAction(show);

    if (GameApp.dataManager.globalData.curDailyGot) {
      this.dailyGroup.children[this.dailyGotNum - 1].getComponent(cc.Button).interactable = false;
      this.dailyGroup.children[this.dailyGotNum - 1].children[0].active = true;
    } else {
      this.dailyGroup.children[this.dailyGotNum].children[0].active = true;
    }
  },
  initShow: function initShow() {
    if (this.dailyGotNum > 0) {
      for (var i = 0; i < this.dailyGotNum; i++) {
        this.dailyGroup.children[i].children[1].runAction(cc.scaleTo(0.5, 1).easing(cc.easeBackOut()));
      }
    }
  },
  // sureBtnClick() {
  //     if (!this.onceClick) return
  //     this.onceClick = false
  //     GameApp.audioManager.playEffect('btn_press')
  //     var self = this
  //     if (window.tt) {
  //         Utils.addVideo("addVideo", function () { //看完了
  //             self.onceClick = true
  //             self.getBtn.interactable = false
  //             self.skipBtn.interactable = false
  //             self.getBtn.node.stopAllActions()
  //             GameApp.dataManager.globalData.curDailyGot = true
  //             cc.sys.localStorage.setItem("EatChicken_dailyGotState", true);
  //             self.dailyGroup.children[self.dailyGotNum].children[2].runAction(cc.sequence(cc.scaleTo(0.5, 0.5).easing(cc.easeBackOut()), cc.callFunc(function () {
  //                 var arr1 = [1, 2, 1, 2, 1, 2, 2] //物品表
  //                 var arr2 = [1, 1, 2, 2, 3, 3, 4] //数量表
  //                 if (arr1[self.dailyGotNum] == 1) {
  //                     GameApp.uiManager.showToast("获取 <color=#0fffff>体力x" + arr2[self.dailyGotNum] * 2 + " </color>")
  //                     GameApp.dataManager.addHealthNum(arr2[self.dailyGotNum] * 2)
  //                 } else if (arr1[self.dailyGotNum] == 2) {
  //                     GameApp.uiManager.showToast("获取 <color=#0fffff>提示卡x" + arr2[self.dailyGotNum] * 2 + " </color>")
  //                     GameApp.dataManager.addTipNum(arr2[self.dailyGotNum] * 2)
  //                 }
  //                 self.dailyGotNum++
  //                 if (self.dailyGotNum > 7) {
  //                     self.dailyGotNum = 0
  //                 }
  //                 cc.sys.localStorage.setItem("EatChicken_dailyGotNum", self.dailyGotNum)
  //             }.bind(self), self)))
  //         }, function (_info) { //没看完
  //             self.onceClick = true
  //             _info ? GameApp.uiManager.showToast(_info) : GameApp.uiManager.showToast("未看完视频")
  //         })
  //     } else {
  //         self.onceClick = true
  //         this.getBtn.interactable = false
  //         this.skipBtn.interactable = false
  //         this.getBtn.node.stopAllActions()
  //         GameApp.dataManager.globalData.curDailyGot = true
  //         cc.sys.localStorage.setItem("EatChicken_dailyGotState", true);
  //         this.dailyGroup.children[this.dailyGotNum].children[2].runAction(cc.sequence(cc.scaleTo(0.5, 0.5).easing(cc.easeBackOut()), cc.callFunc(function () {
  //             var arr1 = [1, 2, 1, 2, 1, 2, 2] //物品表
  //             var arr2 = [1, 1, 2, 2, 3, 3, 4] //数量表
  //             if (arr1[this.dailyGotNum] == 1) {
  //                 GameApp.uiManager.showToast("获取 <color=#0fffff>体力x" + arr2[this.dailyGotNum] * 2 + " </color>")
  //                 GameApp.dataManager.addHealthNum(arr2[this.dailyGotNum] * 2)
  //             } else if (arr1[this.dailyGotNum] == 2) {
  //                 GameApp.uiManager.showToast("获取 <color=#0fffff>提示卡x" + arr2[this.dailyGotNum] * 2 + " </color>")
  //                 GameApp.dataManager.addTipNum(arr2[this.dailyGotNum] * 2)
  //             }
  //             this.dailyGotNum++
  //             if (this.dailyGotNum == 7) {
  //                 this.dailyGotNum = 0
  //             }
  //             cc.sys.localStorage.setItem("EatChicken_dailyGotNum", this.dailyGotNum)
  //         }.bind(this), this)))
  //     }
  // },
  getBtnClick: function getBtnClick(eventTouch, customEventData) {
    var selectId = parseInt(customEventData);
    if (GameApp.dataManager.globalData.curDailyGot) return;
    if (this.dailyGotNum != selectId - 1) return;
    GameApp.audioManager.playEffect('click');
    var self = this;
    self.onceClick = true;
    this.dailyGroup.children[this.dailyGotNum].getComponent(cc.Button).interactable = false;
    GameApp.dataManager.globalData.curDailyGot = true;
    cc.sys.localStorage.setItem("EatChicken_dailyGotState", true);
    this.dailyGroup.children[this.dailyGotNum].children[1].runAction(cc.sequence(cc.scaleTo(0.5, 1).easing(cc.easeBackOut()), cc.callFunc(function () {
      var arr1 = [1, 2, 1, 2, 1, 2, 1]; //物品表

      var arr2 = [50, 5, 50, 5, 100, 5, 500]; //数量表

      if (arr1[this.dailyGotNum] == 1) {
        GameApp.uiManager.showToast("获得金币*" + arr2[this.dailyGotNum]);
        GameApp.dataManager.addCoin(arr2[this.dailyGotNum]);
      } else if (arr1[this.dailyGotNum] == 2) {
        GameApp.uiManager.showToast("获得<color=#faf80d>" + GameApp.dataManager.getSkinDataById(27).name + "</color> 碎片*" + arr2[this.dailyGotNum]);
        GameApp.dataManager.addPieceNum(27, arr2[this.dailyGotNum]);
      }

      this.dailyGotNum++;

      if (this.dailyGotNum == 7) {
        this.dailyGotNum = 0;
      }

      cc.sys.localStorage.setItem("EatChicken_dailyGotNum", this.dailyGotNum);
    }.bind(this), this)));
  },
  closeBtnClick: function closeBtnClick() {
    GameApp.audioManager.playEffect('click');
    this.node.destroy();
  } // var delay = cc.delayTime(0.01)
  //     var act = cc.callFunc(function () {
  //     this.winSprite.fillRange += 0.01
  //     if (this.winSprite.fillRange >= 1) {
  //         this.winSprite.node.stopAllActions()
  //         GameApp.uiManager.showPopup('ResultPopup', function (node) {
  //             var popup = node.getComponent('ResultPopup')
  //             popup.init(true)
  //         }.bind(this))
  //     }
  // }.bind(this), this)
  //     this.winSprite.node.runAction(cc.sequence(delay, act).repeatForever())

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXERhaWx5UG9wdXAuanMiXSwibmFtZXMiOlsiVXRpbHMiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJkYWlseUdyb3VwIiwiTm9kZSIsImRhaWx5R290TnVtIiwidHlwZSIsIm51bWJlciIsInZpc2libGUiLCJjbG9zZUJ0biIsIm9uY2VDbGljayIsIm9uTG9hZCIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ1bmRlZmluZWQiLCJzZXRJdGVtIiwicGFyc2VJbnQiLCJpbml0U2hvdyIsInNob3ciLCJzZXF1ZW5jZSIsImRlbGF5VGltZSIsInNjYWxlVG8iLCJydW5BY3Rpb24iLCJHYW1lQXBwIiwiZGF0YU1hbmFnZXIiLCJnbG9iYWxEYXRhIiwiY3VyRGFpbHlHb3QiLCJjaGlsZHJlbiIsImdldENvbXBvbmVudCIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsImFjdGl2ZSIsImkiLCJlYXNpbmciLCJlYXNlQmFja091dCIsImdldEJ0bkNsaWNrIiwiZXZlbnRUb3VjaCIsImN1c3RvbUV2ZW50RGF0YSIsInNlbGVjdElkIiwiYXVkaW9NYW5hZ2VyIiwicGxheUVmZmVjdCIsInNlbGYiLCJjYWxsRnVuYyIsImFycjEiLCJhcnIyIiwidWlNYW5hZ2VyIiwic2hvd1RvYXN0IiwiYWRkQ29pbiIsImdldFNraW5EYXRhQnlJZCIsIm5hbWUiLCJhZGRQaWVjZU51bSIsImJpbmQiLCJjbG9zZUJ0bkNsaWNrIiwibm9kZSIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsT0FBRCxDQUFyQjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRUosRUFBRSxDQUFDSyxJQURQ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S0FBS1gsV0FBM0Q7QUFFSCxLQWpCcUksQ0FpQnBJK0MsSUFqQm9JLENBaUIvSCxJQWpCK0gsQ0FBWixFQWlCNUcsSUFqQjRHLENBQXpELENBQWpFO0FBa0JILEdBdElJO0FBdUlMQyxFQUFBQSxhQXZJSywyQkF1SVc7QUFDWjdCLElBQUFBLE9BQU8sQ0FBQ2dCLFlBQVIsQ0FBcUJDLFVBQXJCLENBQWdDLE9BQWhDO0FBQ0EsU0FBS2EsSUFBTCxDQUFVQyxPQUFWO0FBQ0gsR0ExSUksQ0E2SUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXhKSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBVdGlscyA9IHJlcXVpcmUoXCJVdGlsc1wiKVxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBkYWlseUdyb3VwOiBjYy5Ob2RlLFxyXG4gICAgICAgIGRhaWx5R290TnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLm51bWJlcixcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlQnRuOiBjYy5Ob2RlLFxyXG5cclxuICAgICAgICBvbmNlQ2xpY2s6IHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZGFpbHlHb3ROdW0gPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJFYXRDaGlja2VuX2RhaWx5R290TnVtXCIpXHJcbiAgICAgICAgaWYgKHRoaXMuZGFpbHlHb3ROdW0gPT0gbnVsbCB8fCB0aGlzLmRhaWx5R290TnVtID09IHVuZGVmaW5lZCB8fCB0aGlzLmRhaWx5R290TnVtID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYWlseUdvdE51bSA9IDBcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiRWF0Q2hpY2tlbl9kYWlseUdvdE51bVwiLCAwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGFpbHlHb3ROdW0gPSBwYXJzZUludCh0aGlzLmRhaWx5R290TnVtKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRTaG93KClcclxuXHJcbiAgICAgICAgdmFyIHNob3cgPSBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMyksIGNjLnNjYWxlVG8oMC4zLCAxKSlcclxuICAgICAgICB0aGlzLmNsb3NlQnRuLnJ1bkFjdGlvbihzaG93KVxyXG4gICAgICAgIGlmIChHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuY3VyRGFpbHlHb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5kYWlseUdyb3VwLmNoaWxkcmVuW3RoaXMuZGFpbHlHb3ROdW0gLSAxXS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmRhaWx5R3JvdXAuY2hpbGRyZW5bdGhpcy5kYWlseUdvdE51bSAtIDFdLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhaWx5R3JvdXAuY2hpbGRyZW5bdGhpcy5kYWlseUdvdE51bV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgaW5pdFNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGFpbHlHb3ROdW0gPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kYWlseUdvdE51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhaWx5R3JvdXAuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0ucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC41LCAxKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gc3VyZUJ0bkNsaWNrKCkge1xyXG4gICAgLy8gICAgIGlmICghdGhpcy5vbmNlQ2xpY2spIHJldHVyblxyXG4gICAgLy8gICAgIHRoaXMub25jZUNsaWNrID0gZmFsc2VcclxuICAgIC8vICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdidG5fcHJlc3MnKVxyXG5cclxuICAgIC8vICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgIC8vICAgICBpZiAod2luZG93LnR0KSB7XHJcbiAgICAvLyAgICAgICAgIFV0aWxzLmFkZFZpZGVvKFwiYWRkVmlkZW9cIiwgZnVuY3Rpb24gKCkgeyAvL+eci+WujOS6hlxyXG4gICAgLy8gICAgICAgICAgICAgc2VsZi5vbmNlQ2xpY2sgPSB0cnVlXHJcbiAgICAvLyAgICAgICAgICAgICBzZWxmLmdldEJ0bi5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgLy8gICAgICAgICAgICAgc2VsZi5za2lwQnRuLmludGVyYWN0YWJsZSA9IGZhbHNlXHJcbiAgICAvLyAgICAgICAgICAgICBzZWxmLmdldEJ0bi5ub2RlLnN0b3BBbGxBY3Rpb25zKClcclxuICAgIC8vICAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5jdXJEYWlseUdvdCA9IHRydWVcclxuICAgIC8vICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkVhdENoaWNrZW5fZGFpbHlHb3RTdGF0ZVwiLCB0cnVlKTtcclxuICAgIC8vICAgICAgICAgICAgIHNlbGYuZGFpbHlHcm91cC5jaGlsZHJlbltzZWxmLmRhaWx5R290TnVtXS5jaGlsZHJlblsyXS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDAuNSkuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdmFyIGFycjEgPSBbMSwgMiwgMSwgMiwgMSwgMiwgMl0gLy/nianlk4HooahcclxuICAgIC8vICAgICAgICAgICAgICAgICB2YXIgYXJyMiA9IFsxLCAxLCAyLCAyLCAzLCAzLCA0XSAvL+aVsOmHj+ihqFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChhcnIxW3NlbGYuZGFpbHlHb3ROdW1dID09IDEpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi6I635Y+WIDxjb2xvcj0jMGZmZmZmPuS9k+WKm3hcIiArIGFycjJbc2VsZi5kYWlseUdvdE51bV0gKiAyICsgXCIgPC9jb2xvcj5cIilcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5hZGRIZWFsdGhOdW0oYXJyMltzZWxmLmRhaWx5R290TnVtXSAqIDIpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhcnIxW3NlbGYuZGFpbHlHb3ROdW1dID09IDIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi6I635Y+WIDxjb2xvcj0jMGZmZmZmPuaPkOekuuWNoXhcIiArIGFycjJbc2VsZi5kYWlseUdvdE51bV0gKiAyICsgXCIgPC9jb2xvcj5cIilcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5hZGRUaXBOdW0oYXJyMltzZWxmLmRhaWx5R290TnVtXSAqIDIpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNlbGYuZGFpbHlHb3ROdW0rK1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhaWx5R290TnVtID4gNykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBzZWxmLmRhaWx5R290TnVtID0gMFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX2RhaWx5R290TnVtXCIsIHNlbGYuZGFpbHlHb3ROdW0pXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgfS5iaW5kKHNlbGYpLCBzZWxmKSkpXHJcblxyXG4gICAgLy8gICAgICAgICB9LCBmdW5jdGlvbiAoX2luZm8pIHsgLy/msqHnnIvlroxcclxuICAgIC8vICAgICAgICAgICAgIHNlbGYub25jZUNsaWNrID0gdHJ1ZVxyXG4gICAgLy8gICAgICAgICAgICAgX2luZm8gPyBHYW1lQXBwLnVpTWFuYWdlci5zaG93VG9hc3QoX2luZm8pIDogR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi5pyq55yL5a6M6KeG6aKRXCIpXHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgc2VsZi5vbmNlQ2xpY2sgPSB0cnVlXHJcbiAgICAvLyAgICAgICAgIHRoaXMuZ2V0QnRuLmludGVyYWN0YWJsZSA9IGZhbHNlXHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2tpcEJ0bi5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgLy8gICAgICAgICB0aGlzLmdldEJ0bi5ub2RlLnN0b3BBbGxBY3Rpb25zKClcclxuICAgIC8vICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmN1ckRhaWx5R290ID0gdHJ1ZVxyXG4gICAgLy8gICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX2RhaWx5R290U3RhdGVcIiwgdHJ1ZSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuZGFpbHlHcm91cC5jaGlsZHJlblt0aGlzLmRhaWx5R290TnVtXS5jaGlsZHJlblsyXS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDAuNSkuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB2YXIgYXJyMSA9IFsxLCAyLCAxLCAyLCAxLCAyLCAyXSAvL+eJqeWTgeihqFxyXG4gICAgLy8gICAgICAgICAgICAgdmFyIGFycjIgPSBbMSwgMSwgMiwgMiwgMywgMywgNF0gLy/mlbDph4/ooahcclxuICAgIC8vICAgICAgICAgICAgIGlmIChhcnIxW3RoaXMuZGFpbHlHb3ROdW1dID09IDEpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93VG9hc3QoXCLojrflj5YgPGNvbG9yPSMwZmZmZmY+5L2T5YqbeFwiICsgYXJyMlt0aGlzLmRhaWx5R290TnVtXSAqIDIgKyBcIiA8L2NvbG9yPlwiKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuYWRkSGVhbHRoTnVtKGFycjJbdGhpcy5kYWlseUdvdE51bV0gKiAyKVxyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIGlmIChhcnIxW3RoaXMuZGFpbHlHb3ROdW1dID09IDIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93VG9hc3QoXCLojrflj5YgPGNvbG9yPSMwZmZmZmY+5o+Q56S65Y2heFwiICsgYXJyMlt0aGlzLmRhaWx5R290TnVtXSAqIDIgKyBcIiA8L2NvbG9yPlwiKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuYWRkVGlwTnVtKGFycjJbdGhpcy5kYWlseUdvdE51bV0gKiAyKVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuZGFpbHlHb3ROdW0rK1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuZGFpbHlHb3ROdW0gPT0gNykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuZGFpbHlHb3ROdW0gPSAwXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX2RhaWx5R290TnVtXCIsIHRoaXMuZGFpbHlHb3ROdW0pXHJcblxyXG4gICAgLy8gICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpKSlcclxuXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSxcclxuICAgIGdldEJ0bkNsaWNrKGV2ZW50VG91Y2gsIGN1c3RvbUV2ZW50RGF0YSkge1xyXG4gICAgICAgIHZhciBzZWxlY3RJZCA9IHBhcnNlSW50KGN1c3RvbUV2ZW50RGF0YSlcclxuICAgICAgICBpZiAoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmN1ckRhaWx5R290KSByZXR1cm5cclxuICAgICAgICBpZiAodGhpcy5kYWlseUdvdE51bSAhPSAoc2VsZWN0SWQgLSAxKSkgcmV0dXJuXHJcbiAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnY2xpY2snKVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYub25jZUNsaWNrID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuZGFpbHlHcm91cC5jaGlsZHJlblt0aGlzLmRhaWx5R290TnVtXS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5jdXJEYWlseUdvdCA9IHRydWVcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX2RhaWx5R290U3RhdGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5kYWlseUdyb3VwLmNoaWxkcmVuW3RoaXMuZGFpbHlHb3ROdW1dLmNoaWxkcmVuWzFdLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuNSwgMSkuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIxID0gWzEsIDIsIDEsIDIsIDEsIDIsIDFdIC8v54mp5ZOB6KGoXHJcbiAgICAgICAgICAgIHZhciBhcnIyID0gWzUwLCA1LCA1MCwgNSwgMTAwLCA1LCA1MDBdIC8v5pWw6YeP6KGoXHJcbiAgICAgICAgICAgIGlmIChhcnIxW3RoaXMuZGFpbHlHb3ROdW1dID09IDEpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdChcIuiOt+W+l+mHkeW4gSpcIiArIGFycjJbdGhpcy5kYWlseUdvdE51bV0pXHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmFkZENvaW4oYXJyMlt0aGlzLmRhaWx5R290TnVtXSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcnIxW3RoaXMuZGFpbHlHb3ROdW1dID09IDIpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdChcIuiOt+W+lzxjb2xvcj0jZmFmODBkPlwiICsgR2FtZUFwcC5kYXRhTWFuYWdlci5nZXRTa2luRGF0YUJ5SWQoMjcpLm5hbWUgKyBcIjwvY29sb3I+IOeijueJhypcIiArIGFycjJbdGhpcy5kYWlseUdvdE51bV0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5hZGRQaWVjZU51bSgyNywgYXJyMlt0aGlzLmRhaWx5R290TnVtXSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kYWlseUdvdE51bSsrXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhaWx5R290TnVtID09IDcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGFpbHlHb3ROdW0gPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiRWF0Q2hpY2tlbl9kYWlseUdvdE51bVwiLCB0aGlzLmRhaWx5R290TnVtKVxyXG5cclxuICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpKSlcclxuICAgIH0sXHJcbiAgICBjbG9zZUJ0bkNsaWNrKCkge1xyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2NsaWNrJylcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvLyB2YXIgZGVsYXkgPSBjYy5kZWxheVRpbWUoMC4wMSlcclxuICAgIC8vICAgICB2YXIgYWN0ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgIHRoaXMud2luU3ByaXRlLmZpbGxSYW5nZSArPSAwLjAxXHJcbiAgICAvLyAgICAgaWYgKHRoaXMud2luU3ByaXRlLmZpbGxSYW5nZSA+PSAxKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMud2luU3ByaXRlLm5vZGUuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgLy8gICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93UG9wdXAoJ1Jlc3VsdFBvcHVwJywgZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIC8vICAgICAgICAgICAgIHZhciBwb3B1cCA9IG5vZGUuZ2V0Q29tcG9uZW50KCdSZXN1bHRQb3B1cCcpXHJcbiAgICAvLyAgICAgICAgICAgICBwb3B1cC5pbml0KHRydWUpXHJcbiAgICAvLyAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9LmJpbmQodGhpcyksIHRoaXMpXHJcbiAgICAvLyAgICAgdGhpcy53aW5TcHJpdGUubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZGVsYXksIGFjdCkucmVwZWF0Rm9yZXZlcigpKVxyXG59KTtcclxuIl19