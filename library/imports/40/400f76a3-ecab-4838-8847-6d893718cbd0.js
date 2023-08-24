"use strict";
cc._RF.push(module, '400f7aj7KtIOIhHbYk3GMvQ', 'SkinItem');
// scripts/ui/SkinItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    actorAnim: sp.Skeleton,
    nameUI: cc.Label,
    skinData: {
      "default": {}
    },
    methodBtnGroup: [cc.Node]
  },
  onLoad: function onLoad() {
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_SHOP_CHOOSED_SHOW, this.updateUnLockShow.bind(this));
  },
  onDestroy: function onDestroy() {
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_SHOP_CHOOSED_SHOW);
  },
  // update (dt) {},
  init: function init(_skinData) {
    this.skinData = _skinData;
    this.initNameShow();
    this.initSkinShow();
    this.updateMethodShow();
  },
  initNameShow: function initNameShow() {
    this.nameUI.string = this.skinData.name;
    var colorIndex = Math.floor((this.skinData.skinid - 1) / 5);
    this.nameUI.node.color = new cc.Color().fromHEX(NameColor[colorIndex]);
  },
  initSkinShow: function initSkinShow() {
    var _this = this;

    if (this.skinData.skinid < 21) {
      this.actorAnim.skeletonData = GameApp.uiManager.normalSkinData;
      this.actorAnim.setSkin(this.skinData.skinname);
    } else {
      this.actorAnim.skeletonData = GameApp.uiManager.advanceSkinDataGroup[this.skinData.skinid - 21];
    }

    if (this.skinData.skinid < 21) {
      this.actorAnim.setAnimation(0, 'await', true);
    } else {
      this.actorAnim.setAnimation(0, 'await_main_1', false);
      this.actorAnim.setCompleteListener(function () {
        _this.actorAnim.setAnimation(0, 'await_main_' + Tools.randomNum(1, 3), false);
      });
    }
  },
  updateMethodShow: function updateMethodShow() {
    if (this.skinData.skinid > 25) {
      this.methodBtnGroup[2].children[1].getComponent(cc.Label).string = GameApp.dataManager.userData.havePieceNum[this.skinData.skinid] + '/' + this.skinData.needpiece;
      this.setpieceIcon(this.skinData.skinid);
    }

    this.updateUnLockShow();
  },
  updateUnLockShow: function updateUnLockShow() {
    var _this2 = this;

    this.methodBtnGroup[0].active = this.skinData.needcoin;
    this.methodBtnGroup[1].active = this.skinData.needgem;
    this.methodBtnGroup[2].active = this.skinData.needpiece;
    this.methodBtnGroup[3].active = false;
    this.methodBtnGroup[0].children[1].getComponent(cc.Label).string = this.skinData.needcoin;
    this.methodBtnGroup[1].children[1].getComponent(cc.Label).string = GameApp.dataManager.userData.playedVideoNum + '/' + this.skinData.needgem;
    var unlockarr = GameApp.dataManager.userData.unLockedSkinIdArr.concat();
    unlockarr.sort(function (a, b) {
      return a - b;
    });
    unlockarr.forEach(function (element) {
      if (element == _this2.skinData.skinid) {
        _this2.methodBtnGroup[0].active = false;
        _this2.methodBtnGroup[1].active = false;
        _this2.methodBtnGroup[2].active = false;
        _this2.methodBtnGroup[3].active = true;
        return;
      }
    });
    this.updateChoosedShow();
  },
  updateChoosedShow: function updateChoosedShow() {
    if (GameApp.dataManager.getChoosedSkinId() == this.skinData.skinid) {
      this.methodBtnGroup[3].children[0].active = false;
      this.methodBtnGroup[3].children[1].active = true;
    } else {
      this.methodBtnGroup[3].children[0].active = true;
      this.methodBtnGroup[3].children[1].active = false;
    }
  },
  setpieceIcon: function setpieceIcon(id) {
    var self = this;
    cc.loader.loadRes("texture/skin_piece/card_p_" + id, cc.SpriteFrame, function (err, spriteFrame) {
      self.methodBtnGroup[2].children[0].getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
  },
  frameBtnClick: function frameBtnClick() {
    var _this3 = this;

    GameApp.audioManager.playEffect('click');
    GameApp.uiManager.showPopup("SkinInfoPopup", function (node) {
      node.getComponent("SkinInfoPopup").init(_this3.skinData);
    }, false);
  },
  selelctBtnClick: function selelctBtnClick() {
    GameApp.audioManager.playEffect('click');
    GameApp.dataManager.setChoosedSkinId(this.skinData.skinid);
    GameApp.eventManager.emit(EventNames.EVENT_UPDATE_SHOP_CHOOSED_SHOW);
  }
});

cc._RF.pop();