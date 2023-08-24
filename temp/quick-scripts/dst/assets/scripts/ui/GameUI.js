
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/GameUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '22560Ckc7ZILqFwWW4hovUj', 'GameUI');
// scripts/ui/GameUI.js

"use strict";

var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {
    joystick: {
      "default": null,
      type: cc.Node,
      tooltip: '摇杆的脚本'
    },
    btnArr: {
      "default": [],
      type: [cc.Node]
    },
    soundNode: cc.Node,
    gameUIPanel: cc.Node,
    shootBtn: cc.Node,
    reloadBtnNode: cc.Node,
    amoUI: cc.Label,
    allRoleNumUI: cc.Label,
    weaponBtnNode: cc.Node,
    mipmapNode: cc.Node,
    prepareTopNode: cc.Node,
    // readActSp: cc.SpriteFrame,
    countDownSpGroup: [cc.SpriteFrame],
    rankGroup: [cc.Node],
    _shootFlag: false,
    _shootTimer: 0,
    _reloadFlag: false,
    _reloadTimer: 0,
    _theGameBegin: false,
    _protectTimeCountDown: 8,
    _onceCountDownAnim: false,
    _onceGasCountDownAnim: false,
    gasNodeUI: cc.Node,
    safeNode: cc.Node,
    gasNode: cc.Node,
    boomNode: cc.Node,
    _gasState: 0,
    //0是不动圈,不现时。1是画圈,倒计时。2是缩圈,提示字。
    _gasCountDownTimer: 40,
    _gasCountDownInterval: 20,
    safeCircle: 150,
    _boxCountDownTimer: 20,
    _boxCountDownInterval: 50,
    _dropTime: 0,
    _boomCountDownTimer: 30,
    _boomCountDownInterval: 50,
    tipNode: cc.Node,
    flashBtn: cc.Node,
    flashCDUI: cc.Label,
    healthBtn: cc.Node,
    healthCDUI: cc.Label,
    _flashTimer: 0,
    _flashInCD: false,
    _healthTimer: 0,
    _healthInCD: false,
    mipNode: cc.Node,
    _mipBoxGroup: [],
    boxAttrNodeGroup: [cc.Node],
    equipAttrNodeGroup: [cc.Node]
  },
  onLoad: function onLoad() {
    this._gasState = 0;
    this._gasCountDownTimer = 40;
    this._gasCountDownInterval = 20;
    this.safeCircle = 150;
    this._boxCountDownTimer = 20;
    this._boxCountDownInterval = 50;
    this._boomCountDownTimer = 30;
    this._boomCountDownInterval = 50;
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_AMO_SHOW, this.updateAmoShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_SHOW_GUN_UI, this.updateGunUIShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_SHOW_RELOAD_UI, this.updateReloadUIShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_SHOW_ALLROLENUM_UI, this.updateAllRoleNumUIShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_GAME_BEGIN, this.gameBegin.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_MIPMAP_PLAYER, this.updateMipmapPlayer.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_RANK_SHOW, this.updateRankShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_NOTYFY_BOX_DISMISS, this.notifyBoxDismiss.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_NOTYFY_BOOM_DISMISS, this.notifyBoomDismiss.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_SHOW_BOXITEM, this.showBoxItemUI.bind(this));
    this.shootBtn.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
    this.shootBtn.on(cc.Node.EventType.TOUCH_END, this.onTouchLeave, this);
    this.shootBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchLeave, this);
    this.weaponBtnNode.children[0].runAction(cc.rotateBy(0.2, 90).repeatForever());

    if (GameApp.dataManager.userData.isFirstPlay) {
      this.tipNode.active = true;
      this.tipNode.children[0].runAction(cc.sequence(cc.moveTo(0.5, cc.v2(0, 10)), cc.moveTo(0.5, cc.v2(0, -10))).repeatForever());
    }

    this.updateSoundBtnShow();
  },
  onDestroy: function onDestroy() {
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_AMO_SHOW);
    GameApp.eventManager.removeListener(EventNames.EVENT_SHOW_GUN_UI);
    GameApp.eventManager.removeListener(EventNames.EVENT_SHOW_RELOAD_UI);
    GameApp.eventManager.removeListener(EventNames.EVENT_SHOW_ALLROLENUM_UI);
    GameApp.eventManager.removeListener(EventNames.EVENT_GAME_BEGIN);
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_MIPMAP_PLAYER);
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_RANK_SHOW);
    GameApp.eventManager.removeListener(EventNames.EVENT_NOTYFY_BOX_DISMISS);
    GameApp.eventManager.removeListener(EventNames.EVENT_NOTYFY_BOOM_DISMISS);
    GameApp.eventManager.removeListener(EventNames.EVENT_SHOW_BOXITEM);
  },
  init: function init(_chooseType, _bili, _speedUpJump) {
    GameApp.uiManager.showGame('GameMap', function (node) {
      node.getComponent("GameMap").init(_chooseType, _bili, _speedUpJump);
    });
    GameApp.uiManager.showToast("落地后请尽快寻找枪械");
  },
  gameBegin: function gameBegin() {
    this._theGameBegin = true;
    this.gameUIPanel.active = true;
  },
  update: function update(dt) {
    this._shootTimer -= dt;

    if (this._shootFlag && this._shootTimer < 0 && !this._reloadFlag) {
      this._shootTimer = GameApp.dataManager.globalData.shootInterval;
      this.shoot();
    }

    if (this._reloadFlag) {
      this._reloadTimer -= dt;

      if (this._reloadFlag && this._reloadTimer < 0) {
        this._reloadFlag = false;
        GameApp.dataManager.reloadAmo();
      }
    }

    this.gasCountDown(dt);
    this.boxCountDown(dt);
    this.boomCountDown(dt);
    this.duleFlash(dt);
    this.duleHealth(dt);
    if (!this._theGameBegin) return;
    this.protectCcountDown(dt);
  },
  duleFlash: function duleFlash(dt) {
    this._flashTimer -= dt;

    if (this._flashTimer < 0) {
      this._flashInCD = false;
      this.flashBtn.children[0].active = true;
      this.flashBtn.children[1].active = false;
    }

    if (this._flashInCD) {
      this.flashCDUI.string = Math.floor(this._flashTimer);
    } else {
      this.flashCDUI.string = "";
    }
  },
  duleHealth: function duleHealth(dt) {
    this._healthTimer -= dt;

    if (this._healthTimer < 0) {
      this._healthInCD = false;
      this.healthBtn.children[0].active = true;
      this.healthBtn.children[1].active = false;
    }

    if (this._healthInCD) {
      this.healthCDUI.string = Math.floor(this._healthTimer);
    } else {
      this.healthCDUI.string = "";
    }
  },
  protectCcountDown: function protectCcountDown(dt) {
    this._protectTimeCountDown -= dt;

    if (this._protectTimeCountDown < 6) {
      this.prepareTopNode.children[1].active = true;
      this.protectCcountDownAnim();
      this.prepareTopNode.children[1].getComponent(cc.Sprite).spriteFrame = this.countDownSpGroup[Math.floor(this._protectTimeCountDown - 1)];
    }

    if (Math.floor(this._protectTimeCountDown) <= 0) {
      GameApp.eventManager.emit(EventNames.EVENT_THEGAMESTART);
      this.prepareTopNode.active = false;
      this._theGameBegin = false;
    }
  },
  protectCcountDownAnim: function protectCcountDownAnim() {
    var _this = this;

    if (this._onceCountDownAnim) return;
    this._onceCountDownAnim = true;
    GameApp.audioManager.playEffect('waitSceneCutDown');
    var seq = cc.sequence(cc.scaleTo(0.2, 1.5), cc.scaleTo(0.3, 1), cc.delayTime(0.5), cc.callFunc(function () {
      _this._onceCountDownAnim = false;
    }));
    this.prepareTopNode.children[1].runAction(seq);
  },
  gasCountDown: function gasCountDown(dt) {
    this._gasCountDownTimer -= dt; //0是不动圈,不现时。1是画圈,倒计时。2是缩圈,提示字。

    switch (this._gasState) {
      case 0:
        this.quietGasState();
        break;

      case 1:
        this.refreshCircleAndCD(dt);
        break;

      case 2:
        this.reduceCircleAndTip(dt);
        break;
    }
  },
  quietGasState: function quietGasState() {
    if (this._gasCountDownTimer < 16) {
      this.gasNodeUI.children[0].active = true;
      this.gasNodeUI.children[1].active = true;
      this.gasNodeUI.children[2].active = false;
      this.gasNodeUI.children[3].getComponent(cc.RichText).string = "毒气倒计时";
      this.gasNodeUI.active = true;
      this.safeNode.children[0].active = true;
      this.safeNode.children[0].width = this.safeNode.children[0].height = this.safeCircle + 5;
      var theWidth = this.gasNode.width;

      if (theWidth == 300) {
        theWidth = 204;
      }

      if (this.safeCircle == 0) {
        this.safeNode.setPosition(this.gasNode.position);
      } else {
        this.safeNode.setPosition(Tools.pointOfRandom(this.safeNode.position, theWidth / 2, this.safeCircle / 2));
      }

      this.safeNode.width = this.safeNode.height = this.safeCircle;
      GameApp.audioManager.playEffect('gasAlert');
      GameApp.audioManager.playEffect('noticeGasComing');
      this.safeNode.children[0].runAction(cc.sequence(cc.spawn(cc.scaleTo(0, 1), cc.fadeIn(0)), cc.spawn(cc.scaleTo(1, 1.3), cc.fadeOut(1))).repeat(2));
      this._gasState = 1; // GameApp.eventManager.emit(EventNames.EVENT_UPDATE_GAS_SHOW, 1, this.safeCircle)
    }
  },
  refreshCircleAndCD: function refreshCircleAndCD(dt) {
    this.gasNodeUI.children[0].getComponent(cc.RichText).string = Math.floor(this._gasCountDownTimer) + "秒";

    if (this._gasCountDownTimer < 0) {
      this.gasNodeUI.children[0].active = false;
      this.gasNodeUI.children[1].active = false;
      this.gasNodeUI.children[2].active = true;
      this.gasNodeUI.children[3].getComponent(cc.RichText).string = "<color=#0fffff>毒气正在扩散</color>";
      GameApp.audioManager.playEffect('noticeGasDiffusion');
      this.gasNodeUI.children[2].runAction(cc.sequence(cc.fadeOut(0.3), cc.fadeIn(0.5)).repeatForever());
      this._gasState = 2;
      GameApp.eventManager.emit(EventNames.EVENT_UPDATE_GAS_SHOW, 2, {
        safeCircle: this.safeCircle,
        safePosition: this.safeNode.position
      });
    }
  },
  reduceCircleAndTip: function reduceCircleAndTip(dt) {
    if (this.safeCircle < 0) {
      return;
    }

    if (this.gasNode.width <= this.safeCircle) {
      this._gasCountDownTimer = this._gasCountDownInterval;
      this.gasNode.width = this.gasNode.height = this.safeCircle;
      this.safeCircle -= 50;
      this.gasNodeUI.active = false;

      if (this.safeCircle < 0) {
        GameApp.audioManager.playEffect('noticeGasNoWay');
        return;
      }

      this._gasState = 0;
      return;
    }

    this.gasNode.width -= dt * 10;
    this.gasNode.height -= dt * 10;
    if (this.safeCircle == 0) return;

    if (!Tools.isIntersect(this.gasNode.position, this.gasNode.width / 2, this.safeNode.position, this.safeCircle / 2)) {} else {
      if (Math.abs(this.gasNode.width - this.safeCircle) > 0.05) //外圈和内圈圆心重合,半径相同
        {
          // k = y/x
          // y = kx
          // x^2+y^2 = 1
          // x^2 = 1/(k^2+1)
          var k = (this.gasNode.y - this.safeNode.y) / (this.gasNode.x - this.safeNode.x);
          var x_off = dt * 10 * parseFloat(Math.sqrt(1 / (k * k + 1))); // 通过mPoint_outer和mPoint_inner的x坐标来判断此时外圆圆心要移动的是该 + x_off（x轴偏移量）还是 -x_off

          this.gasNode.x += 1 * (this.gasNode.x < this.safeNode.x ? 1 : -1) * x_off; // 知道变化后的外圈圆心的x坐标，和直线方程来求对应的y坐标

          this.gasNode.y = k * (this.gasNode.x - this.safeNode.x) + this.safeNode.y;
        }
    }
  },
  boxCountDown: function boxCountDown(dt) {
    if (this._dropTime >= 2) return;
    this._boxCountDownTimer -= dt;

    if (this._boxCountDownTimer < 0) {
      this._boxCountDownTimer = this._boxCountDownInterval;
      this.dropBox();
    }
  },
  boomCountDown: function boomCountDown(dt) {
    if (this._dropTime >= 2) return;
    this._boomCountDownTimer -= dt;

    if (this._boomCountDownTimer < 0) {
      this._boomCountDownTimer = this._boomCountDownInterval;
      this.dropBoom();
    }
  },
  dropBox: function dropBox() {
    var _this2 = this;

    GameApp.audioManager.playEffect('noticeExpShow');
    var theNumArr = [10, 6, 3, 2];

    var _loop = function _loop(i) {
      GameApp.uiManager.showGameObject("MipBox", function (node) {
        _this2._mipBoxGroup.push(node);

        var thePos = Tools.pointOfRandom(_this2.safeNode.position, _this2.safeCircle / 2, 0);
        node.setPosition(thePos);

        var paramPos = _this2.mipNode.convertToNodeSpaceAR(node.convertToWorldSpaceAR(cc.v2(0.5, 0.5)));

        GameApp.eventManager.emit(EventNames.EVENT_DROP_BOX, paramPos, _this2._dropTime + "" + i);
        node.children[0].runAction(cc.sequence(cc.scaleTo(1, 4), cc.scaleTo(0, 1), cc.fadeOut(0)).repeat(2)); // node.getComponent("DropBox").init()
      }, _this2.mipNode);
    };

    for (var i = 0; i < theNumArr[this._dropTime]; i++) {
      _loop(i);
    }

    this._dropTime++; // GameApp.eventManager.emit(EventNames.EVENT_DROP_BOX, this.safeCircle)
  },
  dropBoom: function dropBoom() {
    if (this.safeCircle <= 0) return;
    GameApp.audioManager.playEffect('noticeBoomComing');
    this.boomNode.active = true;
    this.boomNode.setPosition(Tools.pointOfRandom(this.safeNode.position, this.safeCircle / 2, this.boomNode.width / 2));
    GameApp.eventManager.emit(EventNames.EVENT_DROP_BOOM, this.mipNode.convertToNodeSpaceAR(this.boomNode.convertToWorldSpaceAR(cc.v2(0.5, 0.5))), this.boomNode.width);
  },
  notifyBoxDismiss: function notifyBoxDismiss(_index) {
    this._mipBoxGroup[parseInt(_index)].destroy();
  },
  notifyBoomDismiss: function notifyBoomDismiss(_index) {
    this.boomNode.active = false;
  },
  showBoxItemUI: function showBoxItemUI() {
    var _this3 = this;

    this.boxAttrNodeGroup.forEach(function (element) {
      element.active = false;
    });
    var arr = [0, 1, 2, 3];
    var randNum = Tools.randomNum(3, 4);
    var randArr = Tools.getRandomAmountElementUnRepeat(arr, randNum).nodeArr; // console.log(randArr)

    randArr.forEach(function (element) {
      var _rank = GameApp.dataManager.globalData.getItemAttrArr[element].rank;

      if (_rank == 3) {
        // console.log(element + "号关闭了")
        _this3.boxAttrNodeGroup[element].active = false;
      } else {
        var param = {
          rank: _rank + 1,
          item: ItemAttr[element][_rank]
        };
        _this3.boxAttrNodeGroup[element].children[0].getComponent(cc.Label).string = param.rank + "级";
        _this3.boxAttrNodeGroup[element].children[1].getComponent(cc.Label).string = param.item.des;

        _this3.boxAttrNodeGroup[element].children[2].runAction(cc.rotateBy(0.2, 90).repeatForever());

        _this3.boxAttrNodeGroup[element].active = true; // console.log(element + "号打开了")
      }
    });
  },
  boxItemUIBtnClick: function boxItemUIBtnClick(eventTouch, customEventData) {
    var _selectIndex = parseInt(customEventData) - 1; // console.log("选择了" + _selectIndex + "号装备")


    GameApp.dataManager.equipBoxItem(_selectIndex);
    this.boxAttrNodeGroup.forEach(function (element) {
      element.active = false;
    });
    this.updateEquipShowUI();
  },
  updateEquipShowUI: function updateEquipShowUI() {
    var arr = GameApp.dataManager.getEquipShowAttr();

    for (var i in this.equipAttrNodeGroup) {
      if (arr[i] == null) {
        this.equipAttrNodeGroup[i].active = false;
      } else {
        this.equipAttrNodeGroup[i].children[0].getComponent(cc.Label).string = arr[i].rank + "级";
        this.equipAttrNodeGroup[i].children[1].getComponent(cc.Label).string = arr[i].item.des;
        this.equipAttrNodeGroup[i].active = true;
      }
    }
  },
  // gasCountDownAnim() {
  //     if (this._onceGasCountDownAnim) return
  //     this._onceGasCountDownAnim = true
  // },
  onTouchBegin: function onTouchBegin(event) {
    this._shootFlag = true;
  },
  onTouchLeave: function onTouchLeave(event) {
    this._shootFlag = false;
    GameApp.eventManager.emit(EventNames.EVENT_AIM, false);
  },
  shoot: function shoot() {
    GameApp.eventManager.emit(EventNames.EVENT_AIM, true);
    GameApp.eventManager.emit(EventNames.EVENT_PLAYER_SHOOT);
  },
  updateAmoShow: function updateAmoShow() {
    this.amoUI.string = GameApp.dataManager.globalData.curAmoNum;
    GameApp.eventManager.emit(EventNames.EVENT_UPDATE_TOPBAR_SHOW);
  },
  updateGunUIShow: function updateGunUIShow(event, _gunData) {
    if (_gunData) {
      this.weaponBtnNode.getComponent(cc.Sprite).spriteFrame = GameApp.uiManager.commonAtlas.getSpriteFrame("ui_weapon_" + _gunData.weaponid);
      this.weaponBtnNode.children[1].children[0].getComponent(cc.Label).string = _gunData.name;
    }

    this.weaponBtnNode.active = event;
  },
  updateReloadUIShow: function updateReloadUIShow(event) {
    this.reloadBtnNode.active = event;
  },
  updateAllRoleNumUIShow: function updateAllRoleNumUIShow() {
    var theRank = GameApp.dataManager.globalData.allRoleArr.length;

    if (theRank == 1) {
      var theRole = GameApp.dataManager.globalData.allRoleArr[0];

      if (theRole._pbc.tag == Tags.player) {
        GameApp.uiManager.getPopup("OverPopup") == null && GameApp.uiManager.showPopup("OverPopup", function (node) {
          node.getComponent("OverPopup").init(true, theRank);
        });
      }
    }

    this.allRoleNumUI.string = theRank + "人存活";
  },
  updateMipmapPlayer: function updateMipmapPlayer(event) {
    this.mipmapNode.children[2].setPosition(event);
  },
  updateMipmapBox: function updateMipmapBox(event) {},
  updateRankShow: function updateRankShow() {
    var theArr = GameApp.dataManager.globalData.inGameKillNum.concat();
    theArr.sort(function (a, b) {
      return b._killNum - a._killNum;
    });

    for (var i = 0; i < 5; i++) {
      var theName = theArr[i]._belongName;

      if (theName == GameApp.dataManager.userData.playerName) {
        theName = "<color=#0fffff>" + theArr[i]._belongName + "</color>";
      }

      this.rankGroup[i].children[0].getComponent(cc.RichText).string = theName;
      this.rankGroup[i].children[1].getComponent(cc.Label).string = theArr[i]._killNum;
    }
  },
  reloadBtnClick: function reloadBtnClick() {
    GameApp.audioManager.playEffect('click');
    if (this._reloadFlag) return;
    this._reloadTimer = GameApp.dataManager.globalData.reloadInterval;
    this._reloadFlag = true;
    GameApp.eventManager.emit(EventNames.EVENT_PLAYER_RELOAD);
  },
  weaponBtnClick: function weaponBtnClick() {
    GameApp.audioManager.playEffect('click');
    GameApp.eventManager.emit(EventNames.EVENT_PICKUP_WEAPON);
  },
  flashBtnClick: function flashBtnClick() {
    if (this._flashInCD) {
      GameApp.uiManager.showToast("技能正在冷却中");
    } else {
      this.tipNode.active = false;
      GameApp.eventManager.emit(EventNames.EVENT_FLASH);
      this.flashBtn.children[0].active = false;
      this.flashBtn.children[1].active = true;
      this._flashTimer = GameApp.dataManager.getSkillCD();
      this._flashInCD = true;
    }
  },
  healthBtnClick: function healthBtnClick() {
    GameApp.audioManager.playEffect('click');

    if (this._healthInCD) {
      GameApp.uiManager.showToast("技能正在冷却中");
    } else {
      GameApp.eventManager.emit(EventNames.EVENT_RESUME_HEALTH);
      this.healthBtn.children[0].active = false;
      this.healthBtn.children[1].active = true;
      this._healthTimer = GameApp.dataManager.getSkillCD();
      this._healthInCD = true;
    }
  },
  backBtnClick: function backBtnClick() {
    GameApp.uiManager.showUI('LoginUI');
  },
  soundBtnClick: function soundBtnClick() {
    GameApp.audioManager.playEffect('click');
    var onoff = !GameApp.audioManager._effectOn;
    GameApp.audioManager.setEffect(onoff); // GameApp.audioManager.setEffect(onoff)

    this.updateSoundBtnShow();
  },
  updateSoundBtnShow: function updateSoundBtnShow() {
    this.soundNode.children[0].active = GameApp.audioManager._effectOn;
    this.soundNode.children[1].active = !GameApp.audioManager._effectOn;
  },
  updateRecordBtnShow: function updateRecordBtnShow() {
    this.btnArr[0].active = GameApp.dataManager.globalData.recordState == RecordState.RECORD;
    this.btnArr[1].active = GameApp.dataManager.globalData.recordState == RecordState.PAUSE || GameApp.dataManager.globalData.recordState == RecordState.READY;
  },
  recordBtnClick: function recordBtnClick() {
    GameApp.audioManager.playEffect('click');
    var self = this;

    switch (GameApp.dataManager.globalData.recordState) {
      case RecordState.RECORD:
        Utils.pauseRecord(function () {
          GameApp.dataManager.changeRecordState(RecordState.PAUSE);
          self.updateRecordBtnShow();
        });
        break;

      case RecordState.PAUSE:
        Utils.resumeRecord(function () {
          GameApp.dataManager.changeRecordState(RecordState.RECORD);
          self.updateRecordBtnShow();
        });
        break;
      //预备bug情况

      case RecordState.READY:
        console.log("录屏bug了");
        break;
    }
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXEdhbWVVSS5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImpveXN0aWNrIiwidHlwZSIsIk5vZGUiLCJ0b29sdGlwIiwiYnRuQXJyIiwic291bmROb2RlIiwiZ2FtZVVJUGFuZWwiLCJzaG9vdEJ0biIsInJlbG9hZEJ0bk5vZGUiLCJhbW9VSSIsIkxhYmVsIiwiYWxsUm9sZU51bVVJIiwid2VhcG9uQnRuTm9kZSIsIm1pcG1hcE5vZGUiLCJwcmVwYXJlVG9wTm9kZSIsImNvdW50RG93blNwR3JvdXAiLCJTcHJpdGVGcmFtZSIsInJhbmtHcm91cCIsIl9zaG9vdEZsYWciLCJfc2hvb3RUaW1lciIsIl9yZWxvYWRGbGFnIiwiX3JlbG9hZFRpbWVyIiwiX3RoZUdhbWVCZWdpbiIsIl9wcm90ZWN0VGltZUNvdW50RG93biIsIl9vbmNlQ291bnREb3duQW5pbSIsIl9vbmNlR2FzQ291bnREb3duQW5pbSIsImdhc05vZGVVSSIsInNhZmVOb2RlIiwiZ2FzTm9kZSIsImJvb21Ob2RlIiwiX2dhc1N0YXRlIiwiX2dhc0NvdW50RG93blRpbWVyIiwiX2dhc0NvdW50RG93bkludGVydmFsIiwic2FmZUNpcmNsZSIsIl9ib3hDb3VudERvd25UaW1lciIsIl9ib3hDb3VudERvd25JbnRlcnZhbCIsIl9kcm9wVGltZSIsIl9ib29tQ291bnREb3duVGltZXIiLCJfYm9vbUNvdW50RG93bkludGVydmFsIiwidGlwTm9kZSIsImZsYXNoQnRuIiwiZmxhc2hDRFVJIiwiaGVhbHRoQnRuIiwiaGVhbHRoQ0RVSSIsIl9mbGFzaFRpbWVyIiwiX2ZsYXNoSW5DRCIsIl9oZWFsdGhUaW1lciIsIl9oZWFsdGhJbkNEIiwibWlwTm9kZSIsIl9taXBCb3hHcm91cCIsImJveEF0dHJOb2RlR3JvdXAiLCJlcXVpcEF0dHJOb2RlR3JvdXAiLCJvbkxvYWQiLCJHYW1lQXBwIiwiZXZlbnRNYW5hZ2VyIiwib24iLCJFdmVudE5hbWVzIiwiRVZFTlRfVVBEQVRFX0FNT19TSE9XIiwidXBkYXRlQW1vU2hvdyIsImJpbmQiLCJFVkVOVF9TSE9XX0dVTl9VSSIsInVwZGF0ZUd1blVJU2hvdyIsIkVWRU5UX1NIT1dfUkVMT0FEX1VJIiwidXBkYXRlUmVsb2FkVUlTaG93IiwiRVZFTlRfU0hPV19BTExST0xFTlVNX1VJIiwidXBkYXRlQWxsUm9sZU51bVVJU2hvdyIsIkVWRU5UX0dBTUVfQkVHSU4iLCJnYW1lQmVnaW4iLCJFVkVOVF9VUERBVEVfTUlQTUFQX1BMQVlFUiIsInVwZGF0ZU1pcG1hcFBsYXllciIsIkVWRU5UX1VQREFURV9SQU5LX1NIT1ciLCJ1cGRhdGVSYW5rU2hvdyIsIkVWRU5UX05PVFlGWV9CT1hfRElTTUlTUyIsIm5vdGlmeUJveERpc21pc3MiLCJFVkVOVF9OT1RZRllfQk9PTV9ESVNNSVNTIiwibm90aWZ5Qm9vbURpc21pc3MiLCJFVkVOVF9TSE9XX0JPWElURU0iLCJzaG93Qm94SXRlbVVJIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJvblRvdWNoQmVnaW4iLCJUT1VDSF9FTkQiLCJvblRvdWNoTGVhdmUiLCJUT1VDSF9DQU5DRUwiLCJjaGlsZHJlbiIsInJ1bkFjdGlvbiIsInJvdGF0ZUJ5IiwicmVwZWF0Rm9yZXZlciIsImRhdGFNYW5hZ2VyIiwidXNlckRhdGEiLCJpc0ZpcnN0UGxheSIsImFjdGl2ZSIsInNlcXVlbmNlIiwibW92ZVRvIiwidjIiLCJ1cGRhdGVTb3VuZEJ0blNob3ciLCJvbkRlc3Ryb3kiLCJyZW1vdmVMaXN0ZW5lciIsImluaXQiLCJfY2hvb3NlVHlwZSIsIl9iaWxpIiwiX3NwZWVkVXBKdW1wIiwidWlNYW5hZ2VyIiwic2hvd0dhbWUiLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic2hvd1RvYXN0IiwidXBkYXRlIiwiZHQiLCJnbG9iYWxEYXRhIiwic2hvb3RJbnRlcnZhbCIsInNob290IiwicmVsb2FkQW1vIiwiZ2FzQ291bnREb3duIiwiYm94Q291bnREb3duIiwiYm9vbUNvdW50RG93biIsImR1bGVGbGFzaCIsImR1bGVIZWFsdGgiLCJwcm90ZWN0Q2NvdW50RG93biIsInN0cmluZyIsIk1hdGgiLCJmbG9vciIsInByb3RlY3RDY291bnREb3duQW5pbSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiZW1pdCIsIkVWRU5UX1RIRUdBTUVTVEFSVCIsImF1ZGlvTWFuYWdlciIsInBsYXlFZmZlY3QiLCJzZXEiLCJzY2FsZVRvIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJxdWlldEdhc1N0YXRlIiwicmVmcmVzaENpcmNsZUFuZENEIiwicmVkdWNlQ2lyY2xlQW5kVGlwIiwiUmljaFRleHQiLCJ3aWR0aCIsImhlaWdodCIsInRoZVdpZHRoIiwic2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsIlRvb2xzIiwicG9pbnRPZlJhbmRvbSIsInNwYXduIiwiZmFkZUluIiwiZmFkZU91dCIsInJlcGVhdCIsIkVWRU5UX1VQREFURV9HQVNfU0hPVyIsInNhZmVQb3NpdGlvbiIsImlzSW50ZXJzZWN0IiwiYWJzIiwiayIsInkiLCJ4IiwieF9vZmYiLCJwYXJzZUZsb2F0Iiwic3FydCIsImRyb3BCb3giLCJkcm9wQm9vbSIsInRoZU51bUFyciIsImkiLCJzaG93R2FtZU9iamVjdCIsInB1c2giLCJ0aGVQb3MiLCJwYXJhbVBvcyIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwiRVZFTlRfRFJPUF9CT1giLCJFVkVOVF9EUk9QX0JPT00iLCJfaW5kZXgiLCJwYXJzZUludCIsImRlc3Ryb3kiLCJmb3JFYWNoIiwiZWxlbWVudCIsImFyciIsInJhbmROdW0iLCJyYW5kb21OdW0iLCJyYW5kQXJyIiwiZ2V0UmFuZG9tQW1vdW50RWxlbWVudFVuUmVwZWF0Iiwibm9kZUFyciIsIl9yYW5rIiwiZ2V0SXRlbUF0dHJBcnIiLCJyYW5rIiwicGFyYW0iLCJpdGVtIiwiSXRlbUF0dHIiLCJkZXMiLCJib3hJdGVtVUlCdG5DbGljayIsImV2ZW50VG91Y2giLCJjdXN0b21FdmVudERhdGEiLCJfc2VsZWN0SW5kZXgiLCJlcXVpcEJveEl0ZW0iLCJ1cGRhdGVFcXVpcFNob3dVSSIsImdldEVxdWlwU2hvd0F0dHIiLCJldmVudCIsIkVWRU5UX0FJTSIsIkVWRU5UX1BMQVlFUl9TSE9PVCIsImN1ckFtb051bSIsIkVWRU5UX1VQREFURV9UT1BCQVJfU0hPVyIsIl9ndW5EYXRhIiwiY29tbW9uQXRsYXMiLCJnZXRTcHJpdGVGcmFtZSIsIndlYXBvbmlkIiwibmFtZSIsInRoZVJhbmsiLCJhbGxSb2xlQXJyIiwibGVuZ3RoIiwidGhlUm9sZSIsIl9wYmMiLCJ0YWciLCJUYWdzIiwicGxheWVyIiwiZ2V0UG9wdXAiLCJzaG93UG9wdXAiLCJ1cGRhdGVNaXBtYXBCb3giLCJ0aGVBcnIiLCJpbkdhbWVLaWxsTnVtIiwiY29uY2F0Iiwic29ydCIsImEiLCJiIiwiX2tpbGxOdW0iLCJ0aGVOYW1lIiwiX2JlbG9uZ05hbWUiLCJwbGF5ZXJOYW1lIiwicmVsb2FkQnRuQ2xpY2siLCJyZWxvYWRJbnRlcnZhbCIsIkVWRU5UX1BMQVlFUl9SRUxPQUQiLCJ3ZWFwb25CdG5DbGljayIsIkVWRU5UX1BJQ0tVUF9XRUFQT04iLCJmbGFzaEJ0bkNsaWNrIiwiRVZFTlRfRkxBU0giLCJnZXRTa2lsbENEIiwiaGVhbHRoQnRuQ2xpY2siLCJFVkVOVF9SRVNVTUVfSEVBTFRIIiwiYmFja0J0bkNsaWNrIiwic2hvd1VJIiwic291bmRCdG5DbGljayIsIm9ub2ZmIiwiX2VmZmVjdE9uIiwic2V0RWZmZWN0IiwidXBkYXRlUmVjb3JkQnRuU2hvdyIsInJlY29yZFN0YXRlIiwiUmVjb3JkU3RhdGUiLCJSRUNPUkQiLCJQQVVTRSIsIlJFQURZIiwicmVjb3JkQnRuQ2xpY2siLCJzZWxmIiwicGF1c2VSZWNvcmQiLCJjaGFuZ2VSZWNvcmRTdGF0ZSIsInJlc3VtZVJlY29yZCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEs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QUFDQSxZQUFRcE0sT0FBTyxDQUFDbUMsV0FBUixDQUFvQnFCLFVBQXBCLENBQStCc0ksV0FBdkM7QUFDSSxXQUFLQyxXQUFXLENBQUNDLE1BQWpCO0FBQXlCM1AsUUFBQUEsS0FBSyxDQUFDZ1EsV0FBTixDQUFrQixZQUFZO0FBQ25Eck0sVUFBQUEsT0FBTyxDQUFDbUMsV0FBUixDQUFvQm1LLGlCQUFwQixDQUFzQ1AsV0FBVyxDQUFDRSxLQUFsRDtBQUNBRyxVQUFBQSxJQUFJLENBQUNQLG1CQUFMO0FBQ0gsU0FId0I7QUFHckI7O0FBQ0osV0FBS0UsV0FBVyxDQUFDRSxLQUFqQjtBQUF3QjVQLFFBQUFBLEtBQUssQ0FBQ2tRLFlBQU4sQ0FBbUIsWUFBWTtBQUNuRHZNLFVBQUFBLE9BQU8sQ0FBQ21DLFdBQVIsQ0FBb0JtSyxpQkFBcEIsQ0FBc0NQLFdBQVcsQ0FBQ0MsTUFBbEQ7QUFDQUksVUFBQUEsSUFBSSxDQUFDUCxtQkFBTDtBQUNILFNBSHVCO0FBR3BCO0FBQ0o7O0FBQ0EsV0FBS0UsV0FBVyxDQUFDRyxLQUFqQjtBQUF3Qk0sUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWjtBQUF1QjtBQVZuRDtBQVlILEdBMWZJLENBMmZMOztBQTNmSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBVdGlscyA9IHJlcXVpcmUoXCJVdGlsc1wiKVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGpveXN0aWNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfmkYfmnYbnmoTohJrmnKwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5BcnI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kTm9kZTogY2MuTm9kZSxcclxuICAgICAgICBnYW1lVUlQYW5lbDogY2MuTm9kZSxcclxuICAgICAgICBzaG9vdEJ0bjogY2MuTm9kZSxcclxuICAgICAgICByZWxvYWRCdG5Ob2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGFtb1VJOiBjYy5MYWJlbCxcclxuICAgICAgICBhbGxSb2xlTnVtVUk6IGNjLkxhYmVsLFxyXG4gICAgICAgIHdlYXBvbkJ0bk5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgbWlwbWFwTm9kZTogY2MuTm9kZSxcclxuXHJcbiAgICAgICAgcHJlcGFyZVRvcE5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgLy8gcmVhZEFjdFNwOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICBjb3VudERvd25TcEdyb3VwOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHJhbmtHcm91cDogW2NjLk5vZGVdLFxyXG4gICAgICAgIF9zaG9vdEZsYWc6IGZhbHNlLFxyXG4gICAgICAgIF9zaG9vdFRpbWVyOiAwLFxyXG4gICAgICAgIF9yZWxvYWRGbGFnOiBmYWxzZSxcclxuICAgICAgICBfcmVsb2FkVGltZXI6IDAsXHJcblxyXG4gICAgICAgIF90aGVHYW1lQmVnaW46IGZhbHNlLFxyXG4gICAgICAgIF9wcm90ZWN0VGltZUNvdW50RG93bjogOCxcclxuICAgICAgICBfb25jZUNvdW50RG93bkFuaW06IGZhbHNlLFxyXG4gICAgICAgIF9vbmNlR2FzQ291bnREb3duQW5pbTogZmFsc2UsXHJcbiAgICAgICAgZ2FzTm9kZVVJOiBjYy5Ob2RlLFxyXG4gICAgICAgIHNhZmVOb2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGdhc05vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgYm9vbU5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgX2dhc1N0YXRlOiAwLC8vMOaYr+S4jeWKqOWciCzkuI3njrDml7bjgIIx5piv55S75ZyILOWAkuiuoeaXtuOAgjLmmK/nvKnlnIgs5o+Q56S65a2X44CCXHJcbiAgICAgICAgX2dhc0NvdW50RG93blRpbWVyOiA0MCxcclxuICAgICAgICBfZ2FzQ291bnREb3duSW50ZXJ2YWw6IDIwLFxyXG4gICAgICAgIHNhZmVDaXJjbGU6IDE1MCxcclxuICAgICAgICBfYm94Q291bnREb3duVGltZXI6IDIwLFxyXG4gICAgICAgIF9ib3hDb3VudERvd25JbnRlcnZhbDogNTAsXHJcbiAgICAgICAgX2Ryb3BUaW1lOiAwLFxyXG4gICAgICAgIF9ib29tQ291bnREb3duVGltZXI6IDMwLFxyXG4gICAgICAgIF9ib29tQ291bnREb3duSW50ZXJ2YWw6IDUwLFxyXG4gICAgICAgIHRpcE5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgZmxhc2hCdG46IGNjLk5vZGUsXHJcbiAgICAgICAgZmxhc2hDRFVJOiBjYy5MYWJlbCxcclxuICAgICAgICBoZWFsdGhCdG46IGNjLk5vZGUsXHJcbiAgICAgICAgaGVhbHRoQ0RVSTogY2MuTGFiZWwsXHJcbiAgICAgICAgX2ZsYXNoVGltZXI6IDAsXHJcbiAgICAgICAgX2ZsYXNoSW5DRDogZmFsc2UsXHJcbiAgICAgICAgX2hlYWx0aFRpbWVyOiAwLFxyXG4gICAgICAgIF9oZWFsdGhJbkNEOiBmYWxzZSxcclxuXHJcbiAgICAgICAgbWlwTm9kZTogY2MuTm9kZSxcclxuICAgICAgICBfbWlwQm94R3JvdXA6IFtdLFxyXG4gICAgICAgIGJveEF0dHJOb2RlR3JvdXA6IFtjYy5Ob2RlXSxcclxuICAgICAgICBlcXVpcEF0dHJOb2RlR3JvdXA6IFtjYy5Ob2RlXSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX2dhc1N0YXRlID0gMFxyXG4gICAgICAgIHRoaXMuX2dhc0NvdW50RG93blRpbWVyID0gNDBcclxuICAgICAgICB0aGlzLl9nYXNDb3VudERvd25JbnRlcnZhbCA9IDIwXHJcbiAgICAgICAgdGhpcy5zYWZlQ2lyY2xlID0gMTUwXHJcbiAgICAgICAgdGhpcy5fYm94Q291bnREb3duVGltZXIgPSAyMFxyXG4gICAgICAgIHRoaXMuX2JveENvdW50RG93bkludGVydmFsID0gNTBcclxuXHJcbiAgICAgICAgdGhpcy5fYm9vbUNvdW50RG93blRpbWVyID0gMzBcclxuICAgICAgICB0aGlzLl9ib29tQ291bnREb3duSW50ZXJ2YWwgPSA1MFxyXG5cclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5vbihFdmVudE5hbWVzLkVWRU5UX1VQREFURV9BTU9fU0hPVywgdGhpcy51cGRhdGVBbW9TaG93LmJpbmQodGhpcykpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9TSE9XX0dVTl9VSSwgdGhpcy51cGRhdGVHdW5VSVNob3cuYmluZCh0aGlzKSlcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5vbihFdmVudE5hbWVzLkVWRU5UX1NIT1dfUkVMT0FEX1VJLCB0aGlzLnVwZGF0ZVJlbG9hZFVJU2hvdy5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfU0hPV19BTExST0xFTlVNX1VJLCB0aGlzLnVwZGF0ZUFsbFJvbGVOdW1VSVNob3cuYmluZCh0aGlzKSlcclxuXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9HQU1FX0JFR0lOLCB0aGlzLmdhbWVCZWdpbi5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfVVBEQVRFX01JUE1BUF9QTEFZRVIsIHRoaXMudXBkYXRlTWlwbWFwUGxheWVyLmJpbmQodGhpcykpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfUkFOS19TSE9XLCB0aGlzLnVwZGF0ZVJhbmtTaG93LmJpbmQodGhpcykpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9OT1RZRllfQk9YX0RJU01JU1MsIHRoaXMubm90aWZ5Qm94RGlzbWlzcy5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfTk9UWUZZX0JPT01fRElTTUlTUywgdGhpcy5ub3RpZnlCb29tRGlzbWlzcy5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfU0hPV19CT1hJVEVNLCB0aGlzLnNob3dCb3hJdGVtVUkuYmluZCh0aGlzKSlcclxuICAgICAgICB0aGlzLnNob290QnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hCZWdpbiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zaG9vdEJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaExlYXZlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNob290QnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoTGVhdmUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMud2VhcG9uQnRuTm9kZS5jaGlsZHJlblswXS5ydW5BY3Rpb24oY2Mucm90YXRlQnkoMC4yLCA5MCkucmVwZWF0Rm9yZXZlcigpKVxyXG4gICAgICAgIGlmIChHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmlzRmlyc3RQbGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMudGlwTm9kZS5jaGlsZHJlblswXS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuNSwgY2MudjIoMCwgMTApKSwgY2MubW92ZVRvKDAuNSwgY2MudjIoMCwgLTEwKSkpLnJlcGVhdEZvcmV2ZXIoKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVTb3VuZEJ0blNob3coKVxyXG4gICAgfSxcclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX1VQREFURV9BTU9fU0hPVylcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX1NIT1dfR1VOX1VJKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKEV2ZW50TmFtZXMuRVZFTlRfU0hPV19SRUxPQURfVUkpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9TSE9XX0FMTFJPTEVOVU1fVUkpXHJcblxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKEV2ZW50TmFtZXMuRVZFTlRfR0FNRV9CRUdJTilcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX1VQREFURV9NSVBNQVBfUExBWUVSKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKEV2ZW50TmFtZXMuRVZFTlRfVVBEQVRFX1JBTktfU0hPVylcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX05PVFlGWV9CT1hfRElTTUlTUylcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX05PVFlGWV9CT09NX0RJU01JU1MpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9TSE9XX0JPWElURU0pXHJcblxyXG4gICAgfSxcclxuICAgIGluaXQoX2Nob29zZVR5cGUsIF9iaWxpLCBfc3BlZWRVcEp1bXApIHtcclxuICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93R2FtZSgnR2FtZU1hcCcsIChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiR2FtZU1hcFwiKS5pbml0KF9jaG9vc2VUeXBlLCBfYmlsaSwgX3NwZWVkVXBKdW1wKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi6JC95Zyw5ZCO6K+35bC95b+r5a+75om+5p6q5qKwXCIpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnYW1lQmVnaW4oKSB7XHJcbiAgICAgICAgdGhpcy5fdGhlR2FtZUJlZ2luID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuZ2FtZVVJUGFuZWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIHRoaXMuX3Nob290VGltZXIgLT0gZHRcclxuICAgICAgICBpZiAodGhpcy5fc2hvb3RGbGFnICYmIHRoaXMuX3Nob290VGltZXIgPCAwICYmICF0aGlzLl9yZWxvYWRGbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob290VGltZXIgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuc2hvb3RJbnRlcnZhbFxyXG4gICAgICAgICAgICB0aGlzLnNob290KClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlbG9hZEZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVsb2FkVGltZXIgLT0gZHRcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbG9hZEZsYWcgJiYgdGhpcy5fcmVsb2FkVGltZXIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWxvYWRGbGFnID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIucmVsb2FkQW1vKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhc0NvdW50RG93bihkdClcclxuICAgICAgICB0aGlzLmJveENvdW50RG93bihkdClcclxuICAgICAgICB0aGlzLmJvb21Db3VudERvd24oZHQpXHJcbiAgICAgICAgdGhpcy5kdWxlRmxhc2goZHQpXHJcbiAgICAgICAgdGhpcy5kdWxlSGVhbHRoKGR0KVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3RoZUdhbWVCZWdpbikgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5wcm90ZWN0Q2NvdW50RG93bihkdClcclxuICAgIH0sXHJcbiAgICBkdWxlRmxhc2goZHQpIHtcclxuICAgICAgICB0aGlzLl9mbGFzaFRpbWVyIC09IGR0XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZsYXNoVGltZXIgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsYXNoSW5DRCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZmxhc2hCdG4uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmZsYXNoQnRuLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9mbGFzaEluQ0QpIHtcclxuICAgICAgICAgICAgdGhpcy5mbGFzaENEVUkuc3RyaW5nID0gTWF0aC5mbG9vcih0aGlzLl9mbGFzaFRpbWVyKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmxhc2hDRFVJLnN0cmluZyA9IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHVsZUhlYWx0aChkdCkge1xyXG4gICAgICAgIHRoaXMuX2hlYWx0aFRpbWVyIC09IGR0XHJcbiAgICAgICAgaWYgKHRoaXMuX2hlYWx0aFRpbWVyIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFsdGhJbkNEID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5oZWFsdGhCdG4uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmhlYWx0aEJ0bi5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faGVhbHRoSW5DRCkge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWx0aENEVUkuc3RyaW5nID0gTWF0aC5mbG9vcih0aGlzLl9oZWFsdGhUaW1lcilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWx0aENEVUkuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwcm90ZWN0Q2NvdW50RG93bihkdCkge1xyXG4gICAgICAgIHRoaXMuX3Byb3RlY3RUaW1lQ291bnREb3duIC09IGR0XHJcbiAgICAgICAgaWYgKHRoaXMuX3Byb3RlY3RUaW1lQ291bnREb3duIDwgNikge1xyXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVUb3BOb2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5wcm90ZWN0Q2NvdW50RG93bkFuaW0oKVxyXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVUb3BOb2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5jb3VudERvd25TcEdyb3VwW01hdGguZmxvb3IodGhpcy5fcHJvdGVjdFRpbWVDb3VudERvd24gLSAxKV1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IodGhpcy5fcHJvdGVjdFRpbWVDb3VudERvd24pIDw9IDApIHtcclxuICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1RIRUdBTUVTVEFSVClcclxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVG9wTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLl90aGVHYW1lQmVnaW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwcm90ZWN0Q2NvdW50RG93bkFuaW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uY2VDb3VudERvd25BbmltKSByZXR1cm5cclxuICAgICAgICB0aGlzLl9vbmNlQ291bnREb3duQW5pbSA9IHRydWVcclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCd3YWl0U2NlbmVDdXREb3duJylcclxuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjIsIDEuNSksIGNjLnNjYWxlVG8oMC4zLCAxKSwgY2MuZGVsYXlUaW1lKDAuNSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fb25jZUNvdW50RG93bkFuaW0gPSBmYWxzZVxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHRoaXMucHJlcGFyZVRvcE5vZGUuY2hpbGRyZW5bMV0ucnVuQWN0aW9uKHNlcSlcclxuICAgIH0sXHJcbiAgICBnYXNDb3VudERvd24oZHQpIHtcclxuICAgICAgICB0aGlzLl9nYXNDb3VudERvd25UaW1lciAtPSBkdFxyXG4gICAgICAgIC8vMOaYr+S4jeWKqOWciCzkuI3njrDml7bjgIIx5piv55S75ZyILOWAkuiuoeaXtuOAgjLmmK/nvKnlnIgs5o+Q56S65a2X44CCXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9nYXNTdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6IHRoaXMucXVpZXRHYXNTdGF0ZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOiB0aGlzLnJlZnJlc2hDaXJjbGVBbmRDRChkdCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6IHRoaXMucmVkdWNlQ2lyY2xlQW5kVGlwKGR0KTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBxdWlldEdhc1N0YXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYXNDb3VudERvd25UaW1lciA8IDE2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FzTm9kZVVJLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5nYXNOb2RlVUkuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmdhc05vZGVVSS5jaGlsZHJlblsyXS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmdhc05vZGVVSS5jaGlsZHJlblszXS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwi5q+S5rCU5YCS6K6h5pe2XCJcclxuICAgICAgICAgICAgdGhpcy5nYXNOb2RlVUkuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnNhZmVOb2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5zYWZlTm9kZS5jaGlsZHJlblswXS53aWR0aCA9IHRoaXMuc2FmZU5vZGUuY2hpbGRyZW5bMF0uaGVpZ2h0ID0gdGhpcy5zYWZlQ2lyY2xlICsgNVxyXG4gICAgICAgICAgICB2YXIgdGhlV2lkdGggPSB0aGlzLmdhc05vZGUud2lkdGhcclxuICAgICAgICAgICAgaWYgKHRoZVdpZHRoID09IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlV2lkdGggPSAyMDRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zYWZlQ2lyY2xlID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2FmZU5vZGUuc2V0UG9zaXRpb24odGhpcy5nYXNOb2RlLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYWZlTm9kZS5zZXRQb3NpdGlvbihUb29scy5wb2ludE9mUmFuZG9tKHRoaXMuc2FmZU5vZGUucG9zaXRpb24sIHRoZVdpZHRoIC8gMiwgdGhpcy5zYWZlQ2lyY2xlIC8gMikpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zYWZlTm9kZS53aWR0aCA9IHRoaXMuc2FmZU5vZGUuaGVpZ2h0ID0gdGhpcy5zYWZlQ2lyY2xlXHJcbiAgICAgICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2dhc0FsZXJ0JylcclxuICAgICAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnbm90aWNlR2FzQ29taW5nJylcclxuICAgICAgICAgICAgdGhpcy5zYWZlTm9kZS5jaGlsZHJlblswXS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc3Bhd24oY2Muc2NhbGVUbygwLCAxKSwgY2MuZmFkZUluKDApKSwgY2Muc3Bhd24oY2Muc2NhbGVUbygxLCAxLjMpLCBjYy5mYWRlT3V0KDEpKSkucmVwZWF0KDIpKVxyXG4gICAgICAgICAgICB0aGlzLl9nYXNTdGF0ZSA9IDFcclxuICAgICAgICAgICAgLy8gR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1VQREFURV9HQVNfU0hPVywgMSwgdGhpcy5zYWZlQ2lyY2xlKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZWZyZXNoQ2lyY2xlQW5kQ0QoZHQpIHtcclxuICAgICAgICB0aGlzLmdhc05vZGVVSS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IE1hdGguZmxvb3IodGhpcy5fZ2FzQ291bnREb3duVGltZXIpICsgXCLnp5JcIlxyXG4gICAgICAgIGlmICh0aGlzLl9nYXNDb3VudERvd25UaW1lciA8IDApIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2FzTm9kZVVJLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FzTm9kZVVJLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FzTm9kZVVJLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5nYXNOb2RlVUkuY2hpbGRyZW5bM10uZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIjxjb2xvcj0jMGZmZmZmPuavkuawlOato+WcqOaJqeaVozwvY29sb3I+XCJcclxuICAgICAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnbm90aWNlR2FzRGlmZnVzaW9uJylcclxuICAgICAgICAgICAgdGhpcy5nYXNOb2RlVUkuY2hpbGRyZW5bMl0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC4zKSwgY2MuZmFkZUluKDAuNSkpLnJlcGVhdEZvcmV2ZXIoKSlcclxuICAgICAgICAgICAgdGhpcy5fZ2FzU3RhdGUgPSAyXHJcblxyXG4gICAgICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfVVBEQVRFX0dBU19TSE9XLCAyLCB7IHNhZmVDaXJjbGU6IHRoaXMuc2FmZUNpcmNsZSwgc2FmZVBvc2l0aW9uOiB0aGlzLnNhZmVOb2RlLnBvc2l0aW9uIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZWR1Y2VDaXJjbGVBbmRUaXAoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5zYWZlQ2lyY2xlIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FzTm9kZS53aWR0aCA8PSB0aGlzLnNhZmVDaXJjbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2FzQ291bnREb3duVGltZXIgPSB0aGlzLl9nYXNDb3VudERvd25JbnRlcnZhbFxyXG4gICAgICAgICAgICB0aGlzLmdhc05vZGUud2lkdGggPSB0aGlzLmdhc05vZGUuaGVpZ2h0ID0gdGhpcy5zYWZlQ2lyY2xlXHJcbiAgICAgICAgICAgIHRoaXMuc2FmZUNpcmNsZSAtPSA1MFxyXG4gICAgICAgICAgICB0aGlzLmdhc05vZGVVSS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zYWZlQ2lyY2xlIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnbm90aWNlR2FzTm9XYXknKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZ2FzU3RhdGUgPSAwXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhc05vZGUud2lkdGggLT0gZHQgKiAxMFxyXG4gICAgICAgIHRoaXMuZ2FzTm9kZS5oZWlnaHQgLT0gZHQgKiAxMFxyXG4gICAgICAgIGlmICh0aGlzLnNhZmVDaXJjbGUgPT0gMCkgcmV0dXJuXHJcbiAgICAgICAgaWYgKCFUb29scy5pc0ludGVyc2VjdCh0aGlzLmdhc05vZGUucG9zaXRpb24sIHRoaXMuZ2FzTm9kZS53aWR0aCAvIDIsIHRoaXMuc2FmZU5vZGUucG9zaXRpb24sIHRoaXMuc2FmZUNpcmNsZSAvIDIpKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmdhc05vZGUud2lkdGggLSB0aGlzLnNhZmVDaXJjbGUpID4gMC4wNSkgIC8v5aSW5ZyI5ZKM5YaF5ZyI5ZyG5b+D6YeN5ZCILOWNiuW+hOebuOWQjFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBrID0geS94XHJcbiAgICAgICAgICAgICAgICAvLyB5ID0ga3hcclxuICAgICAgICAgICAgICAgIC8vIHheMit5XjIgPSAxXHJcbiAgICAgICAgICAgICAgICAvLyB4XjIgPSAxLyhrXjIrMSlcclxuICAgICAgICAgICAgICAgIHZhciBrID0gKHRoaXMuZ2FzTm9kZS55IC0gdGhpcy5zYWZlTm9kZS55KSAvICh0aGlzLmdhc05vZGUueCAtIHRoaXMuc2FmZU5vZGUueCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHhfb2ZmID0gZHQgKiAxMCAqIHBhcnNlRmxvYXQoTWF0aC5zcXJ0KDEgLyAoayAqIGsgKyAxKSkpXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g6YCa6L+HbVBvaW50X291dGVy5ZKMbVBvaW50X2lubmVy55qEeOWdkOagh+adpeWIpOaWreatpOaXtuWkluWchuWchuW/g+imgeenu+WKqOeahOaYr+ivpSArIHhfb2Zm77yIeOi9tOWBj+enu+mHj++8iei/mOaYryAteF9vZmZcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FzTm9kZS54ICs9IDEgKiAodGhpcy5nYXNOb2RlLnggPCB0aGlzLnNhZmVOb2RlLnggPyAxIDogLTEpICogeF9vZmY7XHJcbiAgICAgICAgICAgICAgICAvLyDnn6XpgZPlj5jljJblkI7nmoTlpJblnIjlnIblv4PnmoR45Z2Q5qCH77yM5ZKM55u057q/5pa556iL5p2l5rGC5a+55bqU55qEeeWdkOagh1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYXNOb2RlLnkgPSBrICogKHRoaXMuZ2FzTm9kZS54IC0gdGhpcy5zYWZlTm9kZS54KSArIHRoaXMuc2FmZU5vZGUueTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYm94Q291bnREb3duKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Ryb3BUaW1lID49IDIpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9ib3hDb3VudERvd25UaW1lciAtPSBkdFxyXG4gICAgICAgIGlmICh0aGlzLl9ib3hDb3VudERvd25UaW1lciA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fYm94Q291bnREb3duVGltZXIgPSB0aGlzLl9ib3hDb3VudERvd25JbnRlcnZhbFxyXG4gICAgICAgICAgICB0aGlzLmRyb3BCb3goKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBib29tQ291bnREb3duKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Ryb3BUaW1lID49IDIpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9ib29tQ291bnREb3duVGltZXIgLT0gZHRcclxuICAgICAgICBpZiAodGhpcy5fYm9vbUNvdW50RG93blRpbWVyIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ib29tQ291bnREb3duVGltZXIgPSB0aGlzLl9ib29tQ291bnREb3duSW50ZXJ2YWxcclxuICAgICAgICAgICAgdGhpcy5kcm9wQm9vbSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRyb3BCb3goKSB7XHJcbiAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnbm90aWNlRXhwU2hvdycpXHJcbiAgICAgICAgdmFyIHRoZU51bUFyciA9IFsxMCwgNiwgMywgMl1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoZU51bUFyclt0aGlzLl9kcm9wVGltZV07IGkrKykge1xyXG4gICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93R2FtZU9iamVjdChcIk1pcEJveFwiLCAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWlwQm94R3JvdXAucHVzaChub2RlKVxyXG4gICAgICAgICAgICAgICAgdmFyIHRoZVBvcyA9IFRvb2xzLnBvaW50T2ZSYW5kb20odGhpcy5zYWZlTm9kZS5wb3NpdGlvbiwgdGhpcy5zYWZlQ2lyY2xlIC8gMiwgMClcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24odGhlUG9zKVxyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtUG9zID0gdGhpcy5taXBOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAuNSwgMC41KSkpXHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfRFJPUF9CT1gsIHBhcmFtUG9zLCB0aGlzLl9kcm9wVGltZSArIFwiXCIgKyBpKVxyXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlblswXS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygxLCA0KSwgY2Muc2NhbGVUbygwLCAxKSwgY2MuZmFkZU91dCgwKSkucmVwZWF0KDIpKVxyXG4gICAgICAgICAgICAgICAgLy8gbm9kZS5nZXRDb21wb25lbnQoXCJEcm9wQm94XCIpLmluaXQoKVxyXG4gICAgICAgICAgICB9LCB0aGlzLm1pcE5vZGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Ryb3BUaW1lKytcclxuICAgICAgICAvLyBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfRFJPUF9CT1gsIHRoaXMuc2FmZUNpcmNsZSlcclxuICAgIH0sXHJcbiAgICBkcm9wQm9vbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zYWZlQ2lyY2xlIDw9IDApIHJldHVyblxyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ25vdGljZUJvb21Db21pbmcnKVxyXG4gICAgICAgIHRoaXMuYm9vbU5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuYm9vbU5vZGUuc2V0UG9zaXRpb24oVG9vbHMucG9pbnRPZlJhbmRvbSh0aGlzLnNhZmVOb2RlLnBvc2l0aW9uLCB0aGlzLnNhZmVDaXJjbGUgLyAyLCB0aGlzLmJvb21Ob2RlLndpZHRoIC8gMikpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX0RST1BfQk9PTSwgdGhpcy5taXBOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuYm9vbU5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAuNSwgMC41KSkpLCB0aGlzLmJvb21Ob2RlLndpZHRoKVxyXG4gICAgfSxcclxuICAgIG5vdGlmeUJveERpc21pc3MoX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5fbWlwQm94R3JvdXBbcGFyc2VJbnQoX2luZGV4KV0uZGVzdHJveSgpXHJcbiAgICB9LFxyXG4gICAgbm90aWZ5Qm9vbURpc21pc3MoX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5ib29tTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIHNob3dCb3hJdGVtVUkoKSB7XHJcbiAgICAgICAgdGhpcy5ib3hBdHRyTm9kZUdyb3VwLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgYXJyID0gWzAsIDEsIDIsIDNdXHJcbiAgICAgICAgdmFyIHJhbmROdW0gPSBUb29scy5yYW5kb21OdW0oMywgNClcclxuICAgICAgICB2YXIgcmFuZEFyciA9IFRvb2xzLmdldFJhbmRvbUFtb3VudEVsZW1lbnRVblJlcGVhdChhcnIsIHJhbmROdW0pLm5vZGVBcnJcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYW5kQXJyKVxyXG4gICAgICAgIHJhbmRBcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgdmFyIF9yYW5rID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmdldEl0ZW1BdHRyQXJyW2VsZW1lbnRdLnJhbmtcclxuICAgICAgICAgICAgaWYgKF9yYW5rID09IDMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVsZW1lbnQgKyBcIuWPt+WFs+mXreS6hlwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3hBdHRyTm9kZUdyb3VwW2VsZW1lbnRdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuazogX3JhbmsgKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW06IEl0ZW1BdHRyW2VsZW1lbnRdW19yYW5rXSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYm94QXR0ck5vZGVHcm91cFtlbGVtZW50XS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHBhcmFtLnJhbmsgKyBcIue6p1wiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJveEF0dHJOb2RlR3JvdXBbZWxlbWVudF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBwYXJhbS5pdGVtLmRlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3hBdHRyTm9kZUdyb3VwW2VsZW1lbnRdLmNoaWxkcmVuWzJdLnJ1bkFjdGlvbihjYy5yb3RhdGVCeSgwLjIsIDkwKS5yZXBlYXRGb3JldmVyKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJveEF0dHJOb2RlR3JvdXBbZWxlbWVudF0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZWxlbWVudCArIFwi5Y+35omT5byA5LqGXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBib3hJdGVtVUlCdG5DbGljayhldmVudFRvdWNoLCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICB2YXIgX3NlbGVjdEluZGV4ID0gcGFyc2VJbnQoY3VzdG9tRXZlbnREYXRhKSAtIDFcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIumAieaLqeS6hlwiICsgX3NlbGVjdEluZGV4ICsgXCLlj7foo4XlpIdcIilcclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmVxdWlwQm94SXRlbShfc2VsZWN0SW5kZXgpXHJcbiAgICAgICAgdGhpcy5ib3hBdHRyTm9kZUdyb3VwLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUVxdWlwU2hvd1VJKClcclxuICAgIH0sXHJcbiAgICB1cGRhdGVFcXVpcFNob3dVSSgpIHtcclxuICAgICAgICB2YXIgYXJyID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nZXRFcXVpcFNob3dBdHRyKClcclxuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuZXF1aXBBdHRyTm9kZUdyb3VwKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcXVpcEF0dHJOb2RlR3JvdXBbaV0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXF1aXBBdHRyTm9kZUdyb3VwW2ldLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYXJyW2ldLnJhbmsgKyBcIue6p1wiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVxdWlwQXR0ck5vZGVHcm91cFtpXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFycltpXS5pdGVtLmRlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcXVpcEF0dHJOb2RlR3JvdXBbaV0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIGdhc0NvdW50RG93bkFuaW0oKSB7XHJcbiAgICAvLyAgICAgaWYgKHRoaXMuX29uY2VHYXNDb3VudERvd25BbmltKSByZXR1cm5cclxuICAgIC8vICAgICB0aGlzLl9vbmNlR2FzQ291bnREb3duQW5pbSA9IHRydWVcclxuXHJcbiAgICAvLyB9LFxyXG4gICAgb25Ub3VjaEJlZ2luKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RGbGFnID0gdHJ1ZVxyXG5cclxuICAgIH0sXHJcbiAgICBvblRvdWNoTGVhdmUoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9zaG9vdEZsYWcgPSBmYWxzZVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9BSU0sIGZhbHNlKVxyXG4gICAgfSxcclxuICAgIHNob290KCkge1xyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9BSU0sIHRydWUpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1BMQVlFUl9TSE9PVClcclxuICAgIH0sXHJcbiAgICB1cGRhdGVBbW9TaG93KCkge1xyXG4gICAgICAgIHRoaXMuYW1vVUkuc3RyaW5nID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmN1ckFtb051bVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfVE9QQkFSX1NIT1cpXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlR3VuVUlTaG93KGV2ZW50LCBfZ3VuRGF0YSkge1xyXG4gICAgICAgIGlmIChfZ3VuRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvbkJ0bk5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBHYW1lQXBwLnVpTWFuYWdlci5jb21tb25BdGxhcy5nZXRTcHJpdGVGcmFtZShcInVpX3dlYXBvbl9cIiArIF9ndW5EYXRhLndlYXBvbmlkKVxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbkJ0bk5vZGUuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBfZ3VuRGF0YS5uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2VhcG9uQnRuTm9kZS5hY3RpdmUgPSBldmVudFxyXG4gICAgfSxcclxuICAgIHVwZGF0ZVJlbG9hZFVJU2hvdyhldmVudCkge1xyXG4gICAgICAgIHRoaXMucmVsb2FkQnRuTm9kZS5hY3RpdmUgPSBldmVudFxyXG4gICAgfSxcclxuICAgIHVwZGF0ZUFsbFJvbGVOdW1VSVNob3coKSB7XHJcbiAgICAgICAgdmFyIHRoZVJhbmsgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsUm9sZUFyci5sZW5ndGhcclxuICAgICAgICBpZiAodGhlUmFuayA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGVSb2xlID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbFJvbGVBcnJbMF1cclxuICAgICAgICAgICAgaWYgKHRoZVJvbGUuX3BiYy50YWcgPT0gVGFncy5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLmdldFBvcHVwKFwiT3ZlclBvcHVwXCIpID09IG51bGwgJiYgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1BvcHVwKFwiT3ZlclBvcHVwXCIsIChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJPdmVyUG9wdXBcIikuaW5pdCh0cnVlLCB0aGVSYW5rKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFsbFJvbGVOdW1VSS5zdHJpbmcgPSB0aGVSYW5rICsgXCLkurrlrZjmtLtcIlxyXG4gICAgfSxcclxuICAgIHVwZGF0ZU1pcG1hcFBsYXllcihldmVudCkge1xyXG4gICAgICAgIHRoaXMubWlwbWFwTm9kZS5jaGlsZHJlblsyXS5zZXRQb3NpdGlvbihldmVudClcclxuICAgIH0sXHJcbiAgICB1cGRhdGVNaXBtYXBCb3goZXZlbnQpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlUmFua1Nob3coKSB7XHJcbiAgICAgICAgdmFyIHRoZUFyciA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5pbkdhbWVLaWxsTnVtLmNvbmNhdCgpXHJcbiAgICAgICAgdGhlQXJyLnNvcnQoKGEsIGIpID0+IGIuX2tpbGxOdW0gLSBhLl9raWxsTnVtKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGVOYW1lID0gdGhlQXJyW2ldLl9iZWxvbmdOYW1lXHJcbiAgICAgICAgICAgIGlmICh0aGVOYW1lID09IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEucGxheWVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhlTmFtZSA9IFwiPGNvbG9yPSMwZmZmZmY+XCIgKyB0aGVBcnJbaV0uX2JlbG9uZ05hbWUgKyBcIjwvY29sb3I+XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJhbmtHcm91cFtpXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IHRoZU5hbWVcclxuICAgICAgICAgICAgdGhpcy5yYW5rR3JvdXBbaV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGVBcnJbaV0uX2tpbGxOdW1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVsb2FkQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnY2xpY2snKVxyXG4gICAgICAgIGlmICh0aGlzLl9yZWxvYWRGbGFnKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fcmVsb2FkVGltZXIgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEucmVsb2FkSW50ZXJ2YWxcclxuICAgICAgICB0aGlzLl9yZWxvYWRGbGFnID0gdHJ1ZVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9QTEFZRVJfUkVMT0FEKVxyXG4gICAgfSxcclxuICAgIHdlYXBvbkJ0bkNsaWNrKCkge1xyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2NsaWNrJylcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfUElDS1VQX1dFQVBPTilcclxuICAgIH0sXHJcbiAgICBmbGFzaEJ0bkNsaWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9mbGFzaEluQ0QpIHtcclxuICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi5oqA6IO95q2j5Zyo5Ya35Y205LitXCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50aXBOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9GTEFTSClcclxuICAgICAgICAgICAgdGhpcy5mbGFzaEJ0bi5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmZsYXNoQnRuLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5fZmxhc2hUaW1lciA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2V0U2tpbGxDRCgpXHJcbiAgICAgICAgICAgIHRoaXMuX2ZsYXNoSW5DRCA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGVhbHRoQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnY2xpY2snKVxyXG4gICAgICAgIGlmICh0aGlzLl9oZWFsdGhJbkNEKSB7XHJcbiAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdChcIuaKgOiDveato+WcqOWGt+WNtOS4rVwiKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9SRVNVTUVfSEVBTFRIKVxyXG4gICAgICAgICAgICB0aGlzLmhlYWx0aEJ0bi5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmhlYWx0aEJ0bi5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuX2hlYWx0aFRpbWVyID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nZXRTa2lsbENEKClcclxuICAgICAgICAgICAgdGhpcy5faGVhbHRoSW5DRCA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmFja0J0bkNsaWNrKCkge1xyXG4gICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dVSSgnTG9naW5VSScpXHJcbiAgICB9LFxyXG4gICAgc291bmRCdG5DbGljaygpIHtcclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdjbGljaycpXHJcbiAgICAgICAgdmFyIG9ub2ZmID0gIUdhbWVBcHAuYXVkaW9NYW5hZ2VyLl9lZmZlY3RPblxyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnNldEVmZmVjdChvbm9mZilcclxuICAgICAgICAvLyBHYW1lQXBwLmF1ZGlvTWFuYWdlci5zZXRFZmZlY3Qob25vZmYpXHJcbiAgICAgICAgdGhpcy51cGRhdGVTb3VuZEJ0blNob3coKVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZVNvdW5kQnRuU2hvdygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kTm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBHYW1lQXBwLmF1ZGlvTWFuYWdlci5fZWZmZWN0T25cclxuICAgICAgICB0aGlzLnNvdW5kTm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSAhR2FtZUFwcC5hdWRpb01hbmFnZXIuX2VmZmVjdE9uXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlUmVjb3JkQnRuU2hvdygpIHtcclxuICAgICAgICB0aGlzLmJ0bkFyclswXS5hY3RpdmUgPSAoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLnJlY29yZFN0YXRlID09IFJlY29yZFN0YXRlLlJFQ09SRClcclxuICAgICAgICB0aGlzLmJ0bkFyclsxXS5hY3RpdmUgPSAoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLnJlY29yZFN0YXRlID09IFJlY29yZFN0YXRlLlBBVVNFIHx8IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5yZWNvcmRTdGF0ZSA9PSBSZWNvcmRTdGF0ZS5SRUFEWSlcclxuICAgIH0sXHJcbiAgICByZWNvcmRCdG5DbGljaygpIHtcclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdjbGljaycpXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgc3dpdGNoIChHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEucmVjb3JkU3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBSZWNvcmRTdGF0ZS5SRUNPUkQ6IFV0aWxzLnBhdXNlUmVjb3JkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuY2hhbmdlUmVjb3JkU3RhdGUoUmVjb3JkU3RhdGUuUEFVU0UpXHJcbiAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVJlY29yZEJ0blNob3coKVxyXG4gICAgICAgICAgICB9KTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVjb3JkU3RhdGUuUEFVU0U6IFV0aWxzLnJlc3VtZVJlY29yZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmNoYW5nZVJlY29yZFN0YXRlKFJlY29yZFN0YXRlLlJFQ09SRClcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUmVjb3JkQnRuU2hvdygpXHJcbiAgICAgICAgICAgIH0pOyBicmVhaztcclxuICAgICAgICAgICAgLy/pooTlpIdidWfmg4XlhrVcclxuICAgICAgICAgICAgY2FzZSBSZWNvcmRTdGF0ZS5SRUFEWTogY29uc29sZS5sb2coXCLlvZXlsY9idWfkuoZcIik7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19