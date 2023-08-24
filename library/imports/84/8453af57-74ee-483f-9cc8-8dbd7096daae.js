"use strict";
cc._RF.push(module, '8453a9XdO5IP5zIjb1wltqu', 'SkinUI');
// scripts/ui/SkinUI.js

"use strict";

var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {
    scrollView: cc.ScrollView,
    itemPrefab: cc.Prefab,
    coinUI: cc.Label,
    onceClick: {
      "default": true,
      visible: false
    }
  },
  onLoad: function onLoad() {
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_COIN_SHOW, this.updateCoinShow.bind(this));
    this.initData();
    this.updateCoinShow();
  },
  onDestroy: function onDestroy() {
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_COIN_SHOW);
  },
  initData: function initData() {
    var _this = this;

    this.scrollView.content.removeAllChildren();
    var i = 0;
    GameApp.dataManager.jsonData.SkinsData.forEach(function (skinData) {
      _this.scheduleOnce(function () {
        var item = cc.instantiate(_this.itemPrefab);

        _this.scrollView.content.addChild(item);

        item.getComponent("SkinItem").init(skinData);
      }, i += 0.05);
    });
  },
  updateCoinShow: function updateCoinShow() {
    this.coinUI.string = GameApp.dataManager.userData.coinNum;
  },
  coinBtnClick: function coinBtnClick() {
    if (window.wx) {
      GameApp.uiManager.showToast("暂未开放！");
      return;
    }

    if (!this.onceClick) return;
    this.onceClick = false;
    GameApp.audioManager.playEffect('click');
    var self = this;

    if (window.tt) {
      Utils.addVideo("addVideo", function () {
        //看完了
        self.onceClick = true;
        GameApp.uiManager.showToast("获得500金币");
        GameApp.dataManager.addCoin(500);
        self.updateCoinShow();
      }, function (_info) {
        //没看完
        self.onceClick = true;
        _info ? GameApp.uiManager.showToast(_info) : GameApp.uiManager.showToast("未看完视频！");
      });
    } else {
      self.onceClick = true;
      GameApp.uiManager.showToast("非真机,获得500金币");
      GameApp.dataManager.addCoin(500);
      self.updateCoinShow();
    }
  },
  backBtnClick: function backBtnClick() {
    GameApp.audioManager.playEffect('click');
    GameApp.uiManager.showUI('LoginUI');
  }
});

cc._RF.pop();