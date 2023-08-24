
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/PrepareUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2e391TZyyJPmYBLDqA+YUbL', 'PrepareUI');
// scripts/ui/PrepareUI.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    joystick: {
      "default": null,
      type: cc.Node,
      tooltip: '摇杆的脚本'
    },
    soundNode: cc.Node,
    shootBtn: cc.Node,
    reloadBtnNode: cc.Node,
    amoUI: cc.Label,
    allRoleNumUI: cc.Label,
    weaponBtnNode: cc.Node,
    prepareTopNode: cc.Node,
    countDownSpGroup: [cc.SpriteFrame],
    _shootFlag: false,
    _shootTimer: 0,
    _reloadFlag: false,
    _reloadTimer: 0,
    _timeCountDown: 20,
    _onceCountDownAnim: false,
    _onceExecute: true
  },
  onLoad: function onLoad() {
    var _this = this;

    GameApp.dataManager.globalData.isInGame = false;
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_AMO_SHOW, this.updateAmoShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_SHOW_GUN_UI, this.updateGunUIShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_SHOW_RELOAD_UI, this.updateReloadUIShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_SHOW_ALLROLENUM_UI, this.updateAllRoleNumUIShow.bind(this));
    this.shootBtn.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
    this.shootBtn.on(cc.Node.EventType.TOUCH_END, this.onTouchLeave, this);
    this.shootBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchLeave, this);
    GameApp.uiManager.showGame('PrepareMap');
    this.weaponBtnNode.children[0].runAction(cc.rotateBy(0.2, 90).repeatForever());
    this.prepareTopNode.children[0].runAction(cc.sequence(cc.callFunc(function () {
      _this.prepareTopNode.children[0].children[0].active = true;
    }), cc.delayTime(0.4), cc.callFunc(function () {
      _this.prepareTopNode.children[0].children[1].active = true;
    }), cc.delayTime(0.4), cc.callFunc(function () {
      _this.prepareTopNode.children[0].children[2].active = true;
    }), cc.delayTime(0.4), cc.callFunc(function () {
      _this.prepareTopNode.children[0].children[0].active = false;
      _this.prepareTopNode.children[0].children[1].active = false;
      _this.prepareTopNode.children[0].children[2].active = false;
    }), cc.delayTime(0.4)).repeatForever());
    this._timeCountDown = 20;
    GameApp.dataManager.globalData.inGameKillNum.push({
      _killNum: 0,
      _belongName: GameApp.dataManager.userData.playerName
    });
    this.updateSoundBtnShow();
  },
  onDestroy: function onDestroy() {
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_AMO_SHOW);
    GameApp.eventManager.removeListener(EventNames.EVENT_SHOW_GUN_UI);
    GameApp.eventManager.removeListener(EventNames.EVENT_SHOW_RELOAD_UI);
    GameApp.eventManager.removeListener(EventNames.EVENT_SHOW_ALLROLENUM_UI);
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

    this._timeCountDown -= dt;

    if (this._timeCountDown < 6) {
      this.prepareTopNode.children[0].active = false;
      this.prepareTopNode.children[1].active = true;
      this.prepareTopNode.children[2].active = true;
      this.countDownAnim();
      this.prepareTopNode.children[2].getComponent(cc.Sprite).spriteFrame = this.countDownSpGroup[Math.floor(this._timeCountDown - 1)];
    }

    if (Math.floor(this._timeCountDown) <= 0) {
      if (!this._onceExecute) return;
      this._onceExecute = false;
      GameApp.uiManager.showPopup('GiftPopup', function (node) {
        node.getComponent("GiftPopup").init("GameUI", 2);
      });
    }
  },
  showPlaneUI: function showPlaneUI(_speedUp) {
    GameApp.uiManager.showUI('PlaneUI', function (node) {
      node.getComponent('PlaneUI').init(_speedUp);
    });
  },
  countDownAnim: function countDownAnim() {
    var _this2 = this;

    if (this._onceCountDownAnim) return;
    this._onceCountDownAnim = true;
    cc.log("播放了");
    GameApp.audioManager.playEffect('waitSceneCutDown');
    var seq = cc.sequence(cc.scaleTo(0.2, 1.5), cc.scaleTo(0.3, 1), cc.delayTime(0.5), cc.callFunc(function () {
      _this2._onceCountDownAnim = false;
    }));
    this.prepareTopNode.children[2].runAction(seq);
  },
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
      console.log(_gunData);
      this.weaponBtnNode.getComponent(cc.Sprite).spriteFrame = GameApp.uiManager.commonAtlas.getSpriteFrame("ui_weapon_" + _gunData.weaponid);
      this.weaponBtnNode.children[1].children[0].getComponent(cc.Label).string = _gunData.name;
    }

    this.weaponBtnNode.active = event;

    if (event) {
      this.weaponBtnNode.scaleX = 0;
      this.weaponBtnNode.scaleY = 0;
      this.weaponBtnNode.runAction(cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
    }
  },
  updateReloadUIShow: function updateReloadUIShow(event) {
    this.reloadBtnNode.active = event;
  },
  updateAllRoleNumUIShow: function updateAllRoleNumUIShow() {
    this.allRoleNumUI.string = GameApp.dataManager.globalData.allRoleArr.length;
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
  backBtnClick: function backBtnClick() {
    GameApp.audioManager.playEffect('click');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXFByZXBhcmVVSS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImpveXN0aWNrIiwidHlwZSIsIk5vZGUiLCJ0b29sdGlwIiwic291bmROb2RlIiwic2hvb3RCdG4iLCJyZWxvYWRCdG5Ob2RlIiwiYW1vVUkiLCJMYWJlbCIsImFsbFJvbGVOdW1VSSIsIndlYXBvbkJ0bk5vZGUiLCJwcmVwYXJlVG9wTm9kZSIsImNvdW50RG93blNwR3JvdXAiLCJTcHJpdGVGcmFtZSIsIl9zaG9vdEZsYWciLCJfc2hvb3RUaW1lciIsIl9yZWxvYWRGbGFnIiwiX3JlbG9hZFRpbWVyIiwiX3RpbWVDb3VudERvd24iLCJfb25jZUNvdW50RG93bkFuaW0iLCJfb25jZUV4ZWN1dGUiLCJvbkxvYWQiLCJHYW1lQXBwIiwiZGF0YU1hbmFnZXIiLCJnbG9iYWxEYXRhIiwiaXNJbkdhbWUiLCJldmVudE1hbmFnZXIiLCJvbiIsIkV2ZW50TmFtZXMiLCJFVkVOVF9VUERBVEVfQU1PX1NIT1ciLCJ1cGRhdGVBbW9TaG93IiwiYmluZCIsIkVWRU5UX1NIT1dfR1VOX1VJIiwidXBkYXRlR3VuVUlTaG93IiwiRVZFTlRfU0hPV19SRUxPQURfVUkiLCJ1cGRhdGVSZWxvYWRVSVNob3ciLCJFVkVOVF9TSE9XX0FMTFJPTEVOVU1fVUkiLCJ1cGRhdGVBbGxSb2xlTnVtVUlTaG93IiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJvblRvdWNoQmVnaW4iLCJUT1VDSF9FTkQiLCJvblRvdWNoTGVhdmUiLCJUT1VDSF9DQU5DRUwiLCJ1aU1hbmFnZXIiLCJzaG93R2FtZSIsImNoaWxkcmVuIiwicnVuQWN0aW9uIiwicm90YXRlQnkiLCJyZXBlYXRGb3JldmVyIiwic2VxdWVuY2UiLCJjYWxsRnVuYyIsImFjdGl2ZSIsImRlbGF5VGltZSIsImluR2FtZUtpbGxOdW0iLCJwdXNoIiwiX2tpbGxOdW0iLCJfYmVsb25nTmFtZSIsInVzZXJEYXRhIiwicGxheWVyTmFtZSIsInVwZGF0ZVNvdW5kQnRuU2hvdyIsIm9uRGVzdHJveSIsInJlbW92ZUxpc3RlbmVyIiwidXBkYXRlIiwiZHQiLCJzaG9vdEludGVydmFsIiwic2hvb3QiLCJyZWxvYWRBbW8iLCJjb3VudERvd25BbmltIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJNYXRoIiwiZmxvb3IiLCJzaG93UG9wdXAiLCJub2RlIiwiaW5pdCIsInNob3dQbGFuZVVJIiwiX3NwZWVkVXAiLCJzaG93VUkiLCJsb2ciLCJhdWRpb01hbmFnZXIiLCJwbGF5RWZmZWN0Iiwic2VxIiwic2NhbGVUbyIsImV2ZW50IiwiZW1pdCIsIkVWRU5UX0FJTSIsIkVWRU5UX1BMQVlFUl9TSE9PVCIsInN0cmluZyIsImN1ckFtb051bSIsIkVWRU5UX1VQREFURV9UT1BCQVJfU0hPVyIsIl9ndW5EYXRhIiwiY29uc29sZSIsImNvbW1vbkF0bGFzIiwiZ2V0U3ByaXRlRnJhbWUiLCJ3ZWFwb25pZCIsIm5hbWUiLCJzY2FsZVgiLCJzY2FsZVkiLCJlYXNpbmciLCJlYXNlQmFja091dCIsImFsbFJvbGVBcnIiLCJsZW5ndGgiLCJyZWxvYWRCdG5DbGljayIsInJlbG9hZEludGVydmFsIiwiRVZFTlRfUExBWUVSX1JFTE9BRCIsIndlYXBvbkJ0bkNsaWNrIiwiRVZFTlRfUElDS1VQX1dFQVBPTiIsImJhY2tCdG5DbGljayIsInNvdW5kQnRuQ2xpY2siLCJvbm9mZiIsIl9lZmZlY3RPbiIsInNldEVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLElBRkg7QUFHTkMsTUFBQUEsT0FBTyxFQUFFO0FBSEgsS0FERjtBQU1SQyxJQUFBQSxTQUFTLEVBQUVSLEVBQUUsQ0FBQ00sSUFOTjtBQU9SRyxJQUFBQSxRQUFRLEVBQUVULEVBQUUsQ0FBQ00sSUFQTDtBQVFSSSxJQUFBQSxhQUFhLEVBQUVWLEVBQUUsQ0FBQ00sSUFSVjtBQVNSSyxJQUFBQSxLQUFLLEVBQUVYLEVBQUUsQ0FBQ1ksS0FURjtBQVVSQyxJQUFBQSxZQUFZLEVBQUViLEVBQUUsQ0FBQ1ksS0FWVDtBQVdSRSxJQUFBQSxhQUFhLEVBQUVkLEVBQUUsQ0FBQ00sSUFYVjtBQVlSUyxJQUFBQSxjQUFjLEVBQUVmLEVBQUUsQ0FBQ00sSUFaWDtBQWFSVSxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDaEIsRUFBRSxDQUFDaUIsV0FBSixDQWJWO0FBZVJDLElBQUFBLFVBQVUsRUFBRSxLQWZKO0FBZ0JSQyxJQUFBQSxXQUFXLEVBQUUsQ0FoQkw7QUFpQlJDLElBQUFBLFdBQVcsRUFBRSxLQWpCTDtBQWtCUkMsSUFBQUEsWUFBWSxFQUFFLENBbEJOO0FBb0JSQyxJQUFBQSxjQUFjLEVBQUUsRUFwQlI7QUFxQlJDLElBQUFBLGtCQUFrQixFQUFFLEtBckJaO0FBc0JSQyxJQUFBQSxZQUFZLEVBQUU7QUF0Qk4sR0FIUDtBQTRCTEMsRUFBQUEsTUE1Qkssb0JBNEJJO0FBQUE7O0FBQ0xDLElBQUFBLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQkMsVUFBcEIsQ0FBK0JDLFFBQS9CLEdBQTBDLEtBQTFDO0FBQ0FILElBQUFBLE9BQU8sQ0FBQ0ksWUFBUixDQUFxQkMsRUFBckIsQ0FBd0JDLFVBQVUsQ0FBQ0MscUJBQW5DLEVBQTBELEtBQUtDLGFBQUwsQ0FBbUJDLElBQW5CLENBQXdCLElBQXhCLENBQTFEO0FBQ0FULElBQUFBLE9BQU8sQ0FBQ0ksWUFBUixDQUFxQkMsRUFBckIsQ0FBd0JDLFVBQVUsQ0FBQ0ksaUJBQW5DLEVBQXNELEtBQUtDLGVBQUwsQ0FBcUJGLElBQXJCLENBQTBCLElBQTFCLENBQXREO0FBQ0FULElBQUFBLE9BQU8sQ0FBQ0ksWUFBUixDQUFxQkMsRUFBckIsQ0FBd0JDLFVBQVUsQ0FBQ00sb0JBQW5DLEVBQXlELEtBQUtDLGtCQUFMLENBQXdCSixJQUF4QixDQUE2QixJQUE3QixDQUF6RDtBQUNBVCxJQUFBQSxPQUFPLENBQUNJLFlBQVIsQ0FBcUJDLEVBQXJCLENBQXdCQyxVQUFVLENBQUNRLHdCQUFuQyxFQUE2RCxLQUFLQyxzQkFBTCxDQUE0Qk4sSUFBNUIsQ0FBaUMsSUFBakMsQ0FBN0Q7QUFDQSxTQUFLMUIsUUFBTCxDQUFjc0IsRUFBZCxDQUFpQi9CLEVBQUUsQ0FBQ00sSUFBSCxDQUFRb0MsU0FBUixDQUFrQkMsV0FBbkMsRUFBZ0QsS0FBS0MsWUFBckQsRUFBbUUsSUFBbkU7QUFDQSxTQUFLbkMsUUFBTCxDQUFjc0IsRUFBZCxDQUFpQi9CLEVBQUUsQ0FBQ00sSUFBSCxDQUFRb0MsU0FBUixDQUFrQkcsU0FBbkMsRUFBOEMsS0FBS0MsWUFBbkQsRUFBaUUsSUFBakU7QUFDQSxTQUFLckMsUUFBTCxDQUFjc0IsRUFBZCxDQUFpQi9CLEVBQUUsQ0FBQ00sSUFBSCxDQUFRb0MsU0FBUixDQUFrQkssWUFBbkMsRUFBaUQsS0FBS0QsWUFBdEQsRUFBb0UsSUFBcEU7QUFDQXBCLElBQUFBLE9BQU8sQ0FBQ3NCLFNBQVIsQ0FBa0JDLFFBQWxCLENBQTJCLFlBQTNCO0FBQ0EsU0FBS25DLGFBQUwsQ0FBbUJvQyxRQUFuQixDQUE0QixDQUE1QixFQUErQkMsU0FBL0IsQ0FBeUNuRCxFQUFFLENBQUNvRCxRQUFILENBQVksR0FBWixFQUFpQixFQUFqQixFQUFxQkMsYUFBckIsRUFBekM7QUFDQSxTQUFLdEMsY0FBTCxDQUFvQm1DLFFBQXBCLENBQTZCLENBQTdCLEVBQWdDQyxTQUFoQyxDQUEwQ25ELEVBQUUsQ0FBQ3NELFFBQUgsQ0FBWXRELEVBQUUsQ0FBQ3VELFFBQUgsQ0FBWSxZQUFNO0FBQ3BFLE1BQUEsS0FBSSxDQUFDeEMsY0FBTCxDQUFvQm1DLFFBQXBCLENBQTZCLENBQTdCLEVBQWdDQSxRQUFoQyxDQUF5QyxDQUF6QyxFQUE0Q00sTUFBNUMsR0FBcUQsSUFBckQ7QUFDSCxLQUZxRCxDQUFaLEVBRXRDeEQsRUFBRSxDQUFDeUQsU0FBSCxDQUFhLEdBQWIsQ0FGc0MsRUFFbkJ6RCxFQUFFLENBQUN1RCxRQUFILENBQVksWUFBTTtBQUNyQyxNQUFBLEtBQUksQ0FBQ3hDLGNBQUwsQ0FBb0JtQyxRQUFwQixDQUE2QixDQUE3QixFQUFnQ0EsUUFBaEMsQ0FBeUMsQ0FBekMsRUFBNENNLE1BQTVDLEdBQXFELElBQXJEO0FBQ0gsS0FGc0IsQ0FGbUIsRUFJdEN4RCxFQUFFLENBQUN5RCxTQUFILENBQWEsR0FBYixDQUpzQyxFQUluQnpELEVBQUUsQ0FBQ3VELFFBQUgsQ0FBWSxZQUFNO0FBQ3JDLE1BQUEsS0FBSSxDQUFDeEMsY0FBTCxDQUFvQm1DLFFBQXBCLENBQTZCLENBQTdCLEVBQWdDQSxRQUFoQyxDQUF5QyxDQUF6QyxFQUE0Q00sTUFBNUMsR0FBcUQsSUFBckQ7QUFDSCxLQUZzQixDQUptQixFQU10Q3hELEVBQUUsQ0FBQ3lELFNBQUgsQ0FBYSxHQUFiLENBTnNDLEVBTW5CekQsRUFBRSxDQUFDdUQsUUFBSCxDQUFZLFlBQU07QUFDckMsTUFBQSxLQUFJLENBQUN4QyxjQUFMLENBQW9CbUMsUUFBcEIsQ0FBNkIsQ0FBN0IsRUFBZ0NBLFFBQWhDLENBQXlDLENBQXpDLEVBQTRDTSxNQUE1QyxHQUFxRCxLQUFyRDtBQUNBLE1BQUEsS0FBSSxDQUFDekMsY0FBTCxDQUFvQm1DLFFBQXBCLENBQTZCLENBQTdCLEVBQWdDQSxRQUFoQyxDQUF5QyxDQUF6QyxFQUE0Q00sTUFBNUMsR0FBcUQsS0FBckQ7QUFDQSxNQUFBLEtBQUksQ0FBQ3pDLGNBQUwsQ0FBb0JtQyxRQUFwQixDQUE2QixDQUE3QixFQUFnQ0EsUUFBaEMsQ0FBeUMsQ0FBekMsRUFBNENNLE1BQTVDLEdBQXFELEtBQXJEO0FBQ0gsS0FKc0IsQ0FObUIsRUFVdEN4RCxFQUFFLENBQUN5RCxTQUFILENBQWEsR0FBYixDQVZzQyxFQVVuQkosYUFWbUIsRUFBMUM7QUFXQSxTQUFLL0IsY0FBTCxHQUFzQixFQUF0QjtBQUVBSSxJQUFBQSxPQUFPLENBQUNDLFdBQVIsQ0FBb0JDLFVBQXBCLENBQStCOEIsYUFBL0IsQ0FBNkNDLElBQTdDLENBQWtEO0FBQzlDQyxNQUFBQSxRQUFRLEVBQUUsQ0FEb0M7QUFFOUNDLE1BQUFBLFdBQVcsRUFBRW5DLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQm1DLFFBQXBCLENBQTZCQztBQUZJLEtBQWxEO0FBSUEsU0FBS0Msa0JBQUw7QUFDSCxHQXpESTtBQTBETEMsRUFBQUEsU0ExREssdUJBMERPO0FBQ1J2QyxJQUFBQSxPQUFPLENBQUNJLFlBQVIsQ0FBcUJvQyxjQUFyQixDQUFvQ2xDLFVBQVUsQ0FBQ0MscUJBQS9DO0FBQ0FQLElBQUFBLE9BQU8sQ0FBQ0ksWUFBUixDQUFxQm9DLGNBQXJCLENBQW9DbEMsVUFBVSxDQUFDSSxpQkFBL0M7QUFDQVYsSUFBQUEsT0FBTyxDQUFDSSxZQUFSLENBQXFCb0MsY0FBckIsQ0FBb0NsQyxVQUFVLENBQUNNLG9CQUEvQztBQUNBWixJQUFBQSxPQUFPLENBQUNJLFlBQVIsQ0FBcUJvQyxjQUFyQixDQUFvQ2xDLFVBQVUsQ0FBQ1Esd0JBQS9DO0FBRUgsR0FoRUk7QUFpRUwyQixFQUFBQSxNQWpFSyxrQkFpRUVDLEVBakVGLEVBaUVNO0FBQ1AsU0FBS2pELFdBQUwsSUFBb0JpRCxFQUFwQjs7QUFDQSxRQUFJLEtBQUtsRCxVQUFMLElBQW1CLEtBQUtDLFdBQUwsR0FBbUIsQ0FBdEMsSUFBMkMsQ0FBQyxLQUFLQyxXQUFyRCxFQUFrRTtBQUM5RCxXQUFLRCxXQUFMLEdBQW1CTyxPQUFPLENBQUNDLFdBQVIsQ0FBb0JDLFVBQXBCLENBQStCeUMsYUFBbEQ7QUFDQSxXQUFLQyxLQUFMO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLbEQsV0FBVCxFQUFzQjtBQUNsQixXQUFLQyxZQUFMLElBQXFCK0MsRUFBckI7O0FBQ0EsVUFBSSxLQUFLaEQsV0FBTCxJQUFvQixLQUFLQyxZQUFMLEdBQW9CLENBQTVDLEVBQStDO0FBQzNDLGFBQUtELFdBQUwsR0FBbUIsS0FBbkI7QUFDQU0sUUFBQUEsT0FBTyxDQUFDQyxXQUFSLENBQW9CNEMsU0FBcEI7QUFDSDtBQUNKOztBQUVELFNBQUtqRCxjQUFMLElBQXVCOEMsRUFBdkI7O0FBQ0EsUUFBSSxLQUFLOUMsY0FBTCxHQUFzQixDQUExQixFQUE2QjtBQUN6QixXQUFLUCxjQUFMLENBQW9CbUMsUUFBcEIsQ0FBNkIsQ0FBN0IsRUFBZ0NNLE1BQWhDLEdBQXlDLEtBQXpDO0FBQ0EsV0FBS3pDLGNBQUwsQ0FBb0JtQyxRQUFwQixDQUE2QixDQUE3QixFQUFnQ00sTUFBaEMsR0FBeUMsSUFBekM7QUFDQSxXQUFLekMsY0FBTCxDQUFvQm1DLFFBQXBCLENBQTZCLENBQTdCLEVBQWdDTSxNQUFoQyxHQUF5QyxJQUF6QztBQUNBLFdBQUtnQixhQUFMO0FBQ0EsV0FBS3pELGNBQUwsQ0FBb0JtQyxRQUFwQixDQUE2QixDQUE3QixFQUFnQ3VCLFlBQWhDLENBQTZDekUsRUFBRSxDQUFDMEUsTUFBaEQsRUFBd0RDLFdBQXhELEdBQXNFLEtBQUszRCxnQkFBTCxDQUFzQjRELElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUt2RCxjQUFMLEdBQXNCLENBQWpDLENBQXRCLENBQXRFO0FBQ0g7O0FBQ0QsUUFBSXNELElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUt2RCxjQUFoQixLQUFtQyxDQUF2QyxFQUEwQztBQUN0QyxVQUFJLENBQUMsS0FBS0UsWUFBVixFQUF3QjtBQUN4QixXQUFLQSxZQUFMLEdBQW9CLEtBQXBCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ3NCLFNBQVIsQ0FBa0I4QixTQUFsQixDQUE0QixXQUE1QixFQUF5QyxVQUFDQyxJQUFELEVBQVU7QUFDL0NBLFFBQUFBLElBQUksQ0FBQ04sWUFBTCxDQUFrQixXQUFsQixFQUErQk8sSUFBL0IsQ0FBb0MsUUFBcEMsRUFBOEMsQ0FBOUM7QUFDSCxPQUZEO0FBSUg7QUFDSixHQS9GSTtBQWdHTEMsRUFBQUEsV0FoR0ssdUJBZ0dPQyxRQWhHUCxFQWdHaUI7QUFDbEJ4RCxJQUFBQSxPQUFPLENBQUNzQixTQUFSLENBQWtCbUMsTUFBbEIsQ0FBeUIsU0FBekIsRUFBb0MsVUFBQ0osSUFBRCxFQUFVO0FBQzFDQSxNQUFBQSxJQUFJLENBQUNOLFlBQUwsQ0FBa0IsU0FBbEIsRUFBNkJPLElBQTdCLENBQWtDRSxRQUFsQztBQUNILEtBRkQ7QUFHSCxHQXBHSTtBQXFHTFYsRUFBQUEsYUFyR0ssMkJBcUdXO0FBQUE7O0FBQ1osUUFBSSxLQUFLakQsa0JBQVQsRUFBNkI7QUFDN0IsU0FBS0Esa0JBQUwsR0FBMEIsSUFBMUI7QUFDQXZCLElBQUFBLEVBQUUsQ0FBQ29GLEdBQUgsQ0FBTyxLQUFQO0FBQ0ExRCxJQUFBQSxPQUFPLENBQUMyRCxZQUFSLENBQXFCQyxVQUFyQixDQUFnQyxrQkFBaEM7QUFDQSxRQUFJQyxHQUFHLEdBQUd2RixFQUFFLENBQUNzRCxRQUFILENBQVl0RCxFQUFFLENBQUN3RixPQUFILENBQVcsR0FBWCxFQUFnQixHQUFoQixDQUFaLEVBQWtDeEYsRUFBRSxDQUFDd0YsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsQ0FBbEMsRUFBc0R4RixFQUFFLENBQUN5RCxTQUFILENBQWEsR0FBYixDQUF0RCxFQUF5RXpELEVBQUUsQ0FBQ3VELFFBQUgsQ0FBWSxZQUFNO0FBQ2pHLE1BQUEsTUFBSSxDQUFDaEMsa0JBQUwsR0FBMEIsS0FBMUI7QUFDSCxLQUZrRixDQUF6RSxDQUFWO0FBR0EsU0FBS1IsY0FBTCxDQUFvQm1DLFFBQXBCLENBQTZCLENBQTdCLEVBQWdDQyxTQUFoQyxDQUEwQ29DLEdBQTFDO0FBQ0gsR0E5R0k7QUErR0wzQyxFQUFBQSxZQS9HSyx3QkErR1E2QyxLQS9HUixFQStHZTtBQUNoQixTQUFLdkUsVUFBTCxHQUFrQixJQUFsQjtBQUVILEdBbEhJO0FBbUhMNEIsRUFBQUEsWUFuSEssd0JBbUhRMkMsS0FuSFIsRUFtSGU7QUFDaEIsU0FBS3ZFLFVBQUwsR0FBa0IsS0FBbEI7QUFDQVEsSUFBQUEsT0FBTyxDQUFDSSxZQUFSLENBQXFCNEQsSUFBckIsQ0FBMEIxRCxVQUFVLENBQUMyRCxTQUFyQyxFQUFnRCxLQUFoRDtBQUNILEdBdEhJO0FBdUhMckIsRUFBQUEsS0F2SEssbUJBdUhHO0FBQ0o1QyxJQUFBQSxPQUFPLENBQUNJLFlBQVIsQ0FBcUI0RCxJQUFyQixDQUEwQjFELFVBQVUsQ0FBQzJELFNBQXJDLEVBQWdELElBQWhEO0FBQ0FqRSxJQUFBQSxPQUFPLENBQUNJLFlBQVIsQ0FBcUI0RCxJQUFyQixDQUEwQjFELFVBQVUsQ0FBQzRELGtCQUFyQztBQUNILEdBMUhJO0FBMkhMMUQsRUFBQUEsYUEzSEssMkJBMkhXO0FBQ1osU0FBS3ZCLEtBQUwsQ0FBV2tGLE1BQVgsR0FBb0JuRSxPQUFPLENBQUNDLFdBQVIsQ0FBb0JDLFVBQXBCLENBQStCa0UsU0FBbkQ7QUFDQXBFLElBQUFBLE9BQU8sQ0FBQ0ksWUFBUixDQUFxQjRELElBQXJCLENBQTBCMUQsVUFBVSxDQUFDK0Qsd0JBQXJDO0FBQ0gsR0E5SEk7QUErSEwxRCxFQUFBQSxlQS9ISywyQkErSFdvRCxLQS9IWCxFQStIa0JPLFFBL0hsQixFQStINEI7QUFDN0IsUUFBSUEsUUFBSixFQUFjO0FBQ1ZDLE1BQUFBLE9BQU8sQ0FBQ2IsR0FBUixDQUFZWSxRQUFaO0FBQ0EsV0FBS2xGLGFBQUwsQ0FBbUIyRCxZQUFuQixDQUFnQ3pFLEVBQUUsQ0FBQzBFLE1BQW5DLEVBQTJDQyxXQUEzQyxHQUF5RGpELE9BQU8sQ0FBQ3NCLFNBQVIsQ0FBa0JrRCxXQUFsQixDQUE4QkMsY0FBOUIsQ0FBNkMsZUFBZUgsUUFBUSxDQUFDSSxRQUFyRSxDQUF6RDtBQUNBLFdBQUt0RixhQUFMLENBQW1Cb0MsUUFBbkIsQ0FBNEIsQ0FBNUIsRUFBK0JBLFFBQS9CLENBQXdDLENBQXhDLEVBQTJDdUIsWUFBM0MsQ0FBd0R6RSxFQUFFLENBQUNZLEtBQTNELEVBQWtFaUYsTUFBbEUsR0FBMkVHLFFBQVEsQ0FBQ0ssSUFBcEY7QUFDSDs7QUFDRCxTQUFLdkYsYUFBTCxDQUFtQjBDLE1BQW5CLEdBQTRCaUMsS0FBNUI7O0FBQ0EsUUFBSUEsS0FBSixFQUFXO0FBQ1AsV0FBSzNFLGFBQUwsQ0FBbUJ3RixNQUFuQixHQUE0QixDQUE1QjtBQUNBLFdBQUt4RixhQUFMLENBQW1CeUYsTUFBbkIsR0FBNEIsQ0FBNUI7QUFDQSxXQUFLekYsYUFBTCxDQUFtQnFDLFNBQW5CLENBQTZCbkQsRUFBRSxDQUFDd0YsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsRUFBbUJnQixNQUFuQixDQUEwQnhHLEVBQUUsQ0FBQ3lHLFdBQUgsRUFBMUIsQ0FBN0I7QUFDSDtBQUNKLEdBM0lJO0FBNElMbEUsRUFBQUEsa0JBNUlLLDhCQTRJY2tELEtBNUlkLEVBNElxQjtBQUN0QixTQUFLL0UsYUFBTCxDQUFtQjhDLE1BQW5CLEdBQTRCaUMsS0FBNUI7QUFDSCxHQTlJSTtBQStJTGhELEVBQUFBLHNCQS9JSyxvQ0ErSW9CO0FBQ3JCLFNBQUs1QixZQUFMLENBQWtCZ0YsTUFBbEIsR0FBMkJuRSxPQUFPLENBQUNDLFdBQVIsQ0FBb0JDLFVBQXBCLENBQStCOEUsVUFBL0IsQ0FBMENDLE1BQXJFO0FBQ0gsR0FqSkk7QUFrSkxDLEVBQUFBLGNBbEpLLDRCQWtKWTtBQUNibEYsSUFBQUEsT0FBTyxDQUFDMkQsWUFBUixDQUFxQkMsVUFBckIsQ0FBZ0MsT0FBaEM7QUFDQSxRQUFJLEtBQUtsRSxXQUFULEVBQXNCO0FBQ3RCLFNBQUtDLFlBQUwsR0FBb0JLLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQkMsVUFBcEIsQ0FBK0JpRixjQUFuRDtBQUNBLFNBQUt6RixXQUFMLEdBQW1CLElBQW5CO0FBQ0FNLElBQUFBLE9BQU8sQ0FBQ0ksWUFBUixDQUFxQjRELElBQXJCLENBQTBCMUQsVUFBVSxDQUFDOEUsbUJBQXJDO0FBQ0gsR0F4Skk7QUF5SkxDLEVBQUFBLGNBekpLLDRCQXlKWTtBQUNickYsSUFBQUEsT0FBTyxDQUFDMkQsWUFBUixDQUFxQkMsVUFBckIsQ0FBZ0MsT0FBaEM7QUFDQTVELElBQUFBLE9BQU8sQ0FBQ0ksWUFBUixDQUFxQjRELElBQXJCLENBQTBCMUQsVUFBVSxDQUFDZ0YsbUJBQXJDO0FBQ0gsR0E1Skk7QUE2SkxDLEVBQUFBLFlBN0pLLDBCQTZKVTtBQUNYdkYsSUFBQUEsT0FBTyxDQUFDMkQsWUFBUixDQUFxQkMsVUFBckIsQ0FBZ0MsT0FBaEM7QUFDQTVELElBQUFBLE9BQU8sQ0FBQ3NCLFNBQVIsQ0FBa0JtQyxNQUFsQixDQUF5QixTQUF6QjtBQUNILEdBaEtJO0FBaUtMK0IsRUFBQUEsYUFqS0ssMkJBaUtXO0FBQ1p4RixJQUFBQSxPQUFPLENBQUMyRCxZQUFSLENBQXFCQyxVQUFyQixDQUFnQyxPQUFoQztBQUNBLFFBQUk2QixLQUFLLEdBQUcsQ0FBQ3pGLE9BQU8sQ0FBQzJELFlBQVIsQ0FBcUIrQixTQUFsQztBQUNBMUYsSUFBQUEsT0FBTyxDQUFDMkQsWUFBUixDQUFxQmdDLFNBQXJCLENBQStCRixLQUEvQixFQUhZLENBSVo7O0FBQ0EsU0FBS25ELGtCQUFMO0FBQ0gsR0F2S0k7QUF3S0xBLEVBQUFBLGtCQXhLSyxnQ0F3S2dCO0FBQ2pCLFNBQUt4RCxTQUFMLENBQWUwQyxRQUFmLENBQXdCLENBQXhCLEVBQTJCTSxNQUEzQixHQUFvQzlCLE9BQU8sQ0FBQzJELFlBQVIsQ0FBcUIrQixTQUF6RDtBQUNBLFNBQUs1RyxTQUFMLENBQWUwQyxRQUFmLENBQXdCLENBQXhCLEVBQTJCTSxNQUEzQixHQUFvQyxDQUFDOUIsT0FBTyxDQUFDMkQsWUFBUixDQUFxQitCLFNBQTFEO0FBQ0gsR0EzS0ksQ0E0S0w7O0FBNUtLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGpveXN0aWNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfmkYfmnYbnmoTohJrmnKwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzb3VuZE5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgc2hvb3RCdG46IGNjLk5vZGUsXHJcbiAgICAgICAgcmVsb2FkQnRuTm9kZTogY2MuTm9kZSxcclxuICAgICAgICBhbW9VSTogY2MuTGFiZWwsXHJcbiAgICAgICAgYWxsUm9sZU51bVVJOiBjYy5MYWJlbCxcclxuICAgICAgICB3ZWFwb25CdG5Ob2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHByZXBhcmVUb3BOb2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNvdW50RG93blNwR3JvdXA6IFtjYy5TcHJpdGVGcmFtZV0sXHJcblxyXG4gICAgICAgIF9zaG9vdEZsYWc6IGZhbHNlLFxyXG4gICAgICAgIF9zaG9vdFRpbWVyOiAwLFxyXG4gICAgICAgIF9yZWxvYWRGbGFnOiBmYWxzZSxcclxuICAgICAgICBfcmVsb2FkVGltZXI6IDAsXHJcblxyXG4gICAgICAgIF90aW1lQ291bnREb3duOiAyMCxcclxuICAgICAgICBfb25jZUNvdW50RG93bkFuaW06IGZhbHNlLFxyXG4gICAgICAgIF9vbmNlRXhlY3V0ZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5pc0luR2FtZSA9IGZhbHNlXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfQU1PX1NIT1csIHRoaXMudXBkYXRlQW1vU2hvdy5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfU0hPV19HVU5fVUksIHRoaXMudXBkYXRlR3VuVUlTaG93LmJpbmQodGhpcykpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9TSE9XX1JFTE9BRF9VSSwgdGhpcy51cGRhdGVSZWxvYWRVSVNob3cuYmluZCh0aGlzKSlcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5vbihFdmVudE5hbWVzLkVWRU5UX1NIT1dfQUxMUk9MRU5VTV9VSSwgdGhpcy51cGRhdGVBbGxSb2xlTnVtVUlTaG93LmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5zaG9vdEJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoQmVnaW4sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2hvb3RCdG4ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hMZWF2ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zaG9vdEJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25Ub3VjaExlYXZlLCB0aGlzKTtcclxuICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93R2FtZSgnUHJlcGFyZU1hcCcpXHJcbiAgICAgICAgdGhpcy53ZWFwb25CdG5Ob2RlLmNoaWxkcmVuWzBdLnJ1bkFjdGlvbihjYy5yb3RhdGVCeSgwLjIsIDkwKS5yZXBlYXRGb3JldmVyKCkpXHJcbiAgICAgICAgdGhpcy5wcmVwYXJlVG9wTm9kZS5jaGlsZHJlblswXS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVUb3BOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKDAuNCksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVG9wTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfSksIGNjLmRlbGF5VGltZSgwLjQpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVRvcE5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMl0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0pLCBjYy5kZWxheVRpbWUoMC40KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVUb3BOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVRvcE5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVG9wTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblsyXS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH0pLCBjYy5kZWxheVRpbWUoMC40KSkucmVwZWF0Rm9yZXZlcigpKVxyXG4gICAgICAgIHRoaXMuX3RpbWVDb3VudERvd24gPSAyMFxyXG5cclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuaW5HYW1lS2lsbE51bS5wdXNoKHtcclxuICAgICAgICAgICAgX2tpbGxOdW06IDAsXHJcbiAgICAgICAgICAgIF9iZWxvbmdOYW1lOiBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLnBsYXllck5hbWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMudXBkYXRlU291bmRCdG5TaG93KClcclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfQU1PX1NIT1cpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9TSE9XX0dVTl9VSSlcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX1NIT1dfUkVMT0FEX1VJKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKEV2ZW50TmFtZXMuRVZFTlRfU0hPV19BTExST0xFTlVNX1VJKVxyXG5cclxuICAgIH0sXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICB0aGlzLl9zaG9vdFRpbWVyIC09IGR0XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob290RmxhZyAmJiB0aGlzLl9zaG9vdFRpbWVyIDwgMCAmJiAhdGhpcy5fcmVsb2FkRmxhZykge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9vdFRpbWVyID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLnNob290SW50ZXJ2YWxcclxuICAgICAgICAgICAgdGhpcy5zaG9vdCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9yZWxvYWRGbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbG9hZFRpbWVyIC09IGR0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWxvYWRGbGFnICYmIHRoaXMuX3JlbG9hZFRpbWVyIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVsb2FkRmxhZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLnJlbG9hZEFtbygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVDb3VudERvd24gLT0gZHRcclxuICAgICAgICBpZiAodGhpcy5fdGltZUNvdW50RG93biA8IDYpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVG9wTm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVUb3BOb2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVG9wTm9kZS5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuY291bnREb3duQW5pbSgpXHJcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVRvcE5vZGUuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmNvdW50RG93blNwR3JvdXBbTWF0aC5mbG9vcih0aGlzLl90aW1lQ291bnREb3duIC0gMSldXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMuX3RpbWVDb3VudERvd24pIDw9IDApIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9vbmNlRXhlY3V0ZSkgcmV0dXJuXHJcbiAgICAgICAgICAgIHRoaXMuX29uY2VFeGVjdXRlID0gZmFsc2VcclxuICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1BvcHVwKCdHaWZ0UG9wdXAnLCAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJHaWZ0UG9wdXBcIikuaW5pdChcIkdhbWVVSVwiLCAyKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2hvd1BsYW5lVUkoX3NwZWVkVXApIHtcclxuICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93VUkoJ1BsYW5lVUknLCAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnUGxhbmVVSScpLmluaXQoX3NwZWVkVXApXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBjb3VudERvd25BbmltKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbmNlQ291bnREb3duQW5pbSkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5fb25jZUNvdW50RG93bkFuaW0gPSB0cnVlXHJcbiAgICAgICAgY2MubG9nKFwi5pKt5pS+5LqGXCIpXHJcbiAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnd2FpdFNjZW5lQ3V0RG93bicpXHJcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLCAxLjUpLCBjYy5zY2FsZVRvKDAuMywgMSksIGNjLmRlbGF5VGltZSgwLjUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uY2VDb3VudERvd25BbmltID0gZmFsc2VcclxuICAgICAgICB9KSlcclxuICAgICAgICB0aGlzLnByZXBhcmVUb3BOb2RlLmNoaWxkcmVuWzJdLnJ1bkFjdGlvbihzZXEpXHJcbiAgICB9LFxyXG4gICAgb25Ub3VjaEJlZ2luKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fc2hvb3RGbGFnID0gdHJ1ZVxyXG5cclxuICAgIH0sXHJcbiAgICBvblRvdWNoTGVhdmUoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9zaG9vdEZsYWcgPSBmYWxzZVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9BSU0sIGZhbHNlKVxyXG4gICAgfSxcclxuICAgIHNob290KCkge1xyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9BSU0sIHRydWUpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1BMQVlFUl9TSE9PVClcclxuICAgIH0sXHJcbiAgICB1cGRhdGVBbW9TaG93KCkge1xyXG4gICAgICAgIHRoaXMuYW1vVUkuc3RyaW5nID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmN1ckFtb051bVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfVE9QQkFSX1NIT1cpXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlR3VuVUlTaG93KGV2ZW50LCBfZ3VuRGF0YSkge1xyXG4gICAgICAgIGlmIChfZ3VuRGF0YSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZ3VuRGF0YSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25CdG5Ob2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gR2FtZUFwcC51aU1hbmFnZXIuY29tbW9uQXRsYXMuZ2V0U3ByaXRlRnJhbWUoXCJ1aV93ZWFwb25fXCIgKyBfZ3VuRGF0YS53ZWFwb25pZClcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25CdG5Ob2RlLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gX2d1bkRhdGEubmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLndlYXBvbkJ0bk5vZGUuYWN0aXZlID0gZXZlbnRcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25CdG5Ob2RlLnNjYWxlWCA9IDBcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25CdG5Ob2RlLnNjYWxlWSA9IDBcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25CdG5Ob2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSkuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1cGRhdGVSZWxvYWRVSVNob3coZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnJlbG9hZEJ0bk5vZGUuYWN0aXZlID0gZXZlbnRcclxuICAgIH0sXHJcbiAgICB1cGRhdGVBbGxSb2xlTnVtVUlTaG93KCkge1xyXG4gICAgICAgIHRoaXMuYWxsUm9sZU51bVVJLnN0cmluZyA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxSb2xlQXJyLmxlbmd0aFxyXG4gICAgfSxcclxuICAgIHJlbG9hZEJ0bkNsaWNrKCkge1xyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2NsaWNrJylcclxuICAgICAgICBpZiAodGhpcy5fcmVsb2FkRmxhZykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3JlbG9hZFRpbWVyID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLnJlbG9hZEludGVydmFsXHJcbiAgICAgICAgdGhpcy5fcmVsb2FkRmxhZyA9IHRydWVcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfUExBWUVSX1JFTE9BRClcclxuICAgIH0sXHJcbiAgICB3ZWFwb25CdG5DbGljaygpIHtcclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdjbGljaycpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1BJQ0tVUF9XRUFQT04pXHJcbiAgICB9LFxyXG4gICAgYmFja0J0bkNsaWNrKCkge1xyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2NsaWNrJylcclxuICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93VUkoJ0xvZ2luVUknKVxyXG4gICAgfSxcclxuICAgIHNvdW5kQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnY2xpY2snKVxyXG4gICAgICAgIHZhciBvbm9mZiA9ICFHYW1lQXBwLmF1ZGlvTWFuYWdlci5fZWZmZWN0T25cclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5zZXRFZmZlY3Qob25vZmYpXHJcbiAgICAgICAgLy8gR2FtZUFwcC5hdWRpb01hbmFnZXIuc2V0RWZmZWN0KG9ub2ZmKVxyXG4gICAgICAgIHRoaXMudXBkYXRlU291bmRCdG5TaG93KClcclxuICAgIH0sXHJcbiAgICB1cGRhdGVTb3VuZEJ0blNob3coKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZE5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gR2FtZUFwcC5hdWRpb01hbmFnZXIuX2VmZmVjdE9uXHJcbiAgICAgICAgdGhpcy5zb3VuZE5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gIUdhbWVBcHAuYXVkaW9NYW5hZ2VyLl9lZmZlY3RPblxyXG4gICAgfSxcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19