
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/manager/DataManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ad44fXOFxB4J34LEZZE1b8', 'DataManager');
// scripts/manager/DataManager.js

"use strict";

/**录屏状态 */
window.RecordState = cc.Enum({
  READY: 0,
  RECORD: 1,
  PAUSE: 2
});
cc.Class({
  name: "DataManager",
  properties: {
    MD5Code: null,
    userData: {
      "default": {}
    }
  },
  ctor: function ctor() {
    this.userData = {
      isFirstPlay: true,
      playerName: "菠萝吹雪",
      coinNum: 0,
      choosedSkinId: 1,
      //21~30是独立的spine文件
      unLockedSkinIdArr: [1],
      playedVideoNum: 0,
      havePieceNum: {
        26: 0,
        27: 0,
        28: 0,
        29: 0,
        30: 0
      },
      box1NeedCoinNum: 100,
      box1RewardCoinNum: [50, 150],
      box2RewardCoinNum: [250, 500],
      //下面是人物基础属性
      baseHp: 100,
      baseDamage: 1,
      baseCrit: 0,
      baseSpeed: 200,
      baseCd: 0,
      baseDef: 0,
      baseRecovery: 1,
      //下面是战绩统计
      alDieNum: 0,
      allKillNum: 0,
      allPlayNum: 0,
      winNum: 0,
      top5Num: 0,
      winRate: 0,
      kd: 0,
      avgRank: 0,
      mostKill: 0,
      avgLifeTime: 0
    };
    this.globalData = {
      days: 1,
      curDailyGot: false,
      shootInterval: 0,
      reloadInterval: 0,
      maxAmoNum: 20,
      curAmoNum: 20,
      maxHp: 100,
      curHp: 100,
      curDamage: 0,
      curCrit: 0,
      curSpeed: 200,
      curCd: 0,
      curDef: 0,
      curRecovery: 0,
      allRoleArr: [],
      allGunArr: [],
      allBoxArr: [],
      isInGame: false,
      //用于区分准备场景和游戏场景，准备场景是不会造成伤害的，也不显示一些UI
      inGameKillNum: [],
      gasConfig: null,
      getItemAttrArr: [{
        rank: 0,
        item: null
      }, {
        rank: 0,
        item: null
      }, {
        rank: 0,
        item: null
      }, {
        rank: 0,
        item: null
      }],
      //伤害，防御，移速，暴击
      equipItemAttr: [0, 0, 0, 0],
      //(装备带来的属性)伤害，防御，移速，暴击
      lifeTime: 0,
      //在线相关
      onLineTime: 0,
      //累计在线时长
      onLineGifts: [2, 2, 2],
      //0未完成，1可领取，2已领取
      onLineGiftCurNum: 0,
      //当前一批任务最大金币数和所需在线时长(+5)
      //活跃相关
      activeValue: 0,
      //活跃值
      activityGifts: [2, 2, 2],
      //0未完成，1可领取，2已领取
      activityNum: [0, 0, 0],
      //当前三个任务完成数量
      activityCurNum: [0, 0, 0],
      activityCurCoin: [0, 0, 0],
      progressGifts: [0, 0, 0, 0],
      //0是未达成，1是可领取，2是已领取
      activityAddNum: [1, 3, 1],
      //每阶段任务增量
      activityAddCoin: [50, 100, 100],
      //每阶段金币增量
      //////
      playerNameArr: ["隋晗蕾", "驹夏之", "壬紫雪", "华清涵", "厍岚彩", "依雪兰", "俟骊婧", "声采珊", "愈成济", "暴雨", "党雁丝", "柴俊郎", "潜春芳", "衷亦巧", "越世敏", "祈桐", "菅昆锐", "卑绍钧", "浑秀英", "牛俊悟", "汲永康", "虎胤文", "宿巧春", "海合瑞", "朋曾", "哈蝶", "宏睿文", "黎泰然"],
      recordPath: null,
      recordTimer: 0,
      recordState: RecordState.READY
    }; //皮肤

    this.jsonData = {
      SkinsData: [],
      WeaponData: [],
      RobotName: []
    };
  },
  initSomeAttr: function initSomeAttr() {
    var _this = this;

    cc.game.on(cc.game.EVENT_HIDE, function () {
      console.log("进入后台前存储了数据");
      cc.sys.localStorage.setItem("EatChicken_onLineTime", parseInt(_this.globalData.onLineTime));
    });
    var getState = cc.sys.localStorage.getItem("EatChicken_dailyGotState");

    if (getState == "true" || getState == true) {
      this.globalData.curDailyGot = true;
    } else {
      this.globalData.curDailyGot = false;
    }

    var tempOnLinetime = cc.sys.localStorage.getItem("EatChicken_onLineTime");

    if (tempOnLinetime == null || tempOnLinetime == undefined || tempOnLinetime == "") {
      tempOnLinetime = 0;
      cc.sys.localStorage.setItem("EatChicken_onLineTime", 0);
    } else {
      tempOnLinetime = parseInt(tempOnLinetime);
    }

    this.globalData.onLineTime = tempOnLinetime;
    var tempOnLineGifts = cc.sys.localStorage.getItem("EatChicken_onLineGifts");

    if (tempOnLineGifts == null || tempOnLineGifts == undefined || tempOnLineGifts == "") {
      tempOnLineGifts = [2, 2, 2];
      cc.sys.localStorage.setItem("EatChicken_onLineGifts", JSON.stringify(tempOnLineGifts));
    } else {
      tempOnLineGifts = JSON.parse(tempOnLineGifts);
    }

    this.globalData.onLineGifts = tempOnLineGifts;
    var tempOnLineGiftCurNum = cc.sys.localStorage.getItem("EatChicken_onLineGiftCurNum");

    if (tempOnLineGiftCurNum == null || tempOnLineGiftCurNum == undefined || tempOnLineGiftCurNum == "") {
      tempOnLineGiftCurNum = 0;
      cc.sys.localStorage.setItem("EatChicken_onLineGiftCurNum", 0);
    } else {
      tempOnLineGiftCurNum = parseInt(tempOnLineGiftCurNum);
    }

    this.globalData.onLineGiftCurNum = tempOnLineGiftCurNum;
    var tempactiveValue = cc.sys.localStorage.getItem("EatChicken_activeValue");

    if (tempactiveValue == null || tempactiveValue == undefined || tempactiveValue == "") {
      tempactiveValue = 0;
      cc.sys.localStorage.setItem("EatChicken_activeValue", 0);
    } else {
      tempactiveValue = parseInt(tempactiveValue);
    }

    this.globalData.activeValue = tempactiveValue;
    var tempactivityGifts = cc.sys.localStorage.getItem("EatChicken_activityGifts");

    if (tempactivityGifts == null || tempactivityGifts == undefined || tempactivityGifts == "") {
      tempactivityGifts = [2, 2, 2];
      cc.sys.localStorage.setItem("EatChicken_activityGifts", JSON.stringify(tempactivityGifts));
    } else {
      tempactivityGifts = JSON.parse(tempactivityGifts);
    }

    this.globalData.activityGifts = tempactivityGifts;
    var tempactivityNum = cc.sys.localStorage.getItem("EatChicken_activityNum");

    if (tempactivityNum == null || tempactivityNum == undefined || tempactivityNum == "") {
      tempactivityNum = [0, 0, 0];
      cc.sys.localStorage.setItem("EatChicken_activityNum", JSON.stringify(tempactivityNum));
    } else {
      tempactivityNum = JSON.parse(tempactivityNum);
    }

    this.globalData.activityNum = tempactivityNum;
    var tempactivityCurNum = cc.sys.localStorage.getItem("EatChicken_activityCurNum");

    if (tempactivityCurNum == null || tempactivityCurNum == undefined || tempactivityCurNum == "") {
      tempactivityCurNum = [0, 0, 0];
      cc.sys.localStorage.setItem("EatChicken_activityCurNum", JSON.stringify(tempactivityCurNum));
    } else {
      tempactivityCurNum = JSON.parse(tempactivityCurNum);
    }

    this.globalData.activityCurNum = tempactivityCurNum;
    var tempactivityCurCoin = cc.sys.localStorage.getItem("EatChicken_activityCurCoin");

    if (tempactivityCurCoin == null || tempactivityCurCoin == undefined || tempactivityCurCoin == "") {
      tempactivityCurCoin = [0, 0, 0];
      cc.sys.localStorage.setItem("EatChicken_activityCurCoin", JSON.stringify(tempactivityCurCoin));
    } else {
      tempactivityCurCoin = JSON.parse(tempactivityCurCoin);
    }

    this.globalData.activityCurCoin = tempactivityCurCoin;
    var tempprogressGifts = cc.sys.localStorage.getItem("EatChicken_progressGifts");

    if (tempprogressGifts == null || tempprogressGifts == undefined || tempprogressGifts == "") {
      tempprogressGifts = [0, 0, 0, 0];
      cc.sys.localStorage.setItem("EatChicken_progressGifts", JSON.stringify(tempprogressGifts));
    } else {
      tempprogressGifts = JSON.parse(tempprogressGifts);
    }

    this.globalData.progressGifts = tempprogressGifts;
    this.globalData.allRoleArr = [];
    this.globalData.allGunArr = [];
    this.globalData.allBoxArr = [];
    this.globalData.inGameKillNum = [];
    this.globalData.gasConfig = null;
    this.globalData.getItemAttrArr = [{
      rank: 0,
      item: null
    }, {
      rank: 0,
      item: null
    }, {
      rank: 0,
      item: null
    }, {
      rank: 0,
      item: null
    }]; //伤害，防御，移速，暴击

    this.globalData.equipItemAttr = [0, 0, 0, 0];
    this.globalData.maxHp = this.globalData.curHp = this.userData.baseHp;
    this.globalData.curDamage = this.userData.baseDamage;
    this.globalData.curCrit = this.userData.baseCrit;
    this.globalData.curSpeed = this.userData.baseSpeed;
    this.globalData.curCd = this.userData.baseCd;
    this.globalData.curDef = this.userData.baseDef;
    this.globalData.curRecovery = this.userData.baseRecovery; // for (let i = 0; i < 30; i++) {
    //     this.globalData.inGameKillNum.push({
    //         _killNum: 0,
    //         _belongName: ""
    //     })
    // }
  },
  setPlayerName: function setPlayerName(_name) {
    this.userData.playerName = _name;
    this.save();
  },
  addCoin: function addCoin(_num) {
    this.userData.coinNum += _num;
    GameApp.eventManager.emit(EventNames.EVENT_UPDATE_COIN_SHOW);
    this.save();
  },
  reduceCoin: function reduceCoin(_num) {
    var a = this.userData.coinNum - _num;

    if (a < 0) {
      return false;
    } else {
      this.userData.coinNum = a;
      GameApp.eventManager.emit(EventNames.EVENT_UPDATE_COIN_SHOW);
      this.save();
      return true;
    }
  },
  unLockSkin: function unLockSkin(_skinId) {
    if (this.userData.unLockedSkinIdArr.indexOf(_skinId) == -1) {
      this.userData.unLockedSkinIdArr.push(_skinId);
    }
  },
  addPieceNum: function addPieceNum(_pieceIndex, _num) {
    var _this2 = this;

    this.userData.havePieceNum[_pieceIndex] += _num;
    var arr = [26, 27, 28, 29, 30];
    arr.forEach(function (index) {
      if (_this2.userData.havePieceNum[index] >= _this2.getSkinDataById(index).needpiece) {
        _this2.unLockSkin(index);
      }
    });
    this.save();
  },
  addPlayedVideoNum: function addPlayedVideoNum() {
    var _this3 = this;

    this.userData.playedVideoNum++;
    var arr = [21, 22, 23, 24, 25];
    arr.forEach(function (index) {
      if (_this3.userData.playedVideoNum >= _this3.getSkinDataById(index).needgem) {
        _this3.unLockSkin(index);
      }
    });
    this.save();
  },
  getSkinDataById: function getSkinDataById(_skinId) {
    return this.jsonData.SkinsData[_skinId - 1];
  },
  setChoosedSkinId: function setChoosedSkinId(_val) {
    _val > 30 && (_val = 1);
    _val < 1 && (_val = 30);
    this.userData.choosedSkinId = _val;
    this.addSkinAttr();
    this.save();
  },
  addSkinAttr: function addSkinAttr() {
    var curSkinData = this.getSkinDataById(this.userData.choosedSkinId);
    this.globalData.maxHp = this.globalData.curHp = this.userData.baseHp + Math.floor(this.userData.baseHp * (curSkinData.att_hpmax / 100));
    this.globalData.curDamage = this.userData.baseDamage + curSkinData.att_damage / 100;
    this.globalData.curCrit = this.userData.baseCrit + curSkinData.att_crit / 10;
    this.globalData.curSpeed = this.userData.baseSpeed + Math.floor(this.userData.baseSpeed * (curSkinData.att_speed / 100));
    this.globalData.curCd = this.userData.baseCd + curSkinData.att_cd / 100;
    this.globalData.curDef = this.userData.baseDef + curSkinData.att_defense / 100;
    this.globalData.curRecovery = this.userData.baseRecovery + curSkinData.att_recovery / 100;
  },
  getChoosedSkinId: function getChoosedSkinId() {
    return this.userData.choosedSkinId;
  },
  reduceHp: function reduceHp(_num) {
    var a = this.globalData.curHp - _num;

    if (a <= 0) {
      this.globalData.curHp = 0;
      GameApp.eventManager.emit(EventNames.EVENT_UPDATE_TOPBAR_SHOW);
      return false;
    } else {
      this.globalData.curHp = a;
      GameApp.eventManager.emit(EventNames.EVENT_UPDATE_TOPBAR_SHOW);
      return true;
    }
  },
  getResumeHealthNum: function getResumeHealthNum() {
    return 10 * this.globalData.curRecovery;
  },
  getSkillCD: function getSkillCD() {
    return 10 * (1 - this.globalData.curCd);
  },
  addHp: function addHp(_num) {
    var a = this.globalData.curHp + _num;

    if (a > this.globalData.maxHp) {
      this.globalData.curHp = this.globalData.maxHp;
    } else {
      this.globalData.curHp = a;
    }

    GameApp.eventManager.emit(EventNames.EVENT_UPDATE_TOPBAR_SHOW);
  },
  reduceAmo: function reduceAmo() {
    var a = this.globalData.curAmoNum - 1;

    if (a < 0) {
      this.globalData.curAmoNum = 0;
      GameApp.eventManager.emit(EventNames.EVENT_UPDATE_AMO_SHOW);
      return false;
    } else {
      this.globalData.curAmoNum = a;
      GameApp.eventManager.emit(EventNames.EVENT_UPDATE_AMO_SHOW);
      return true;
    }
  },
  reloadAmo: function reloadAmo() {
    this.globalData.curAmoNum = this.globalData.maxAmoNum;
    GameApp.eventManager.emit(EventNames.EVENT_UPDATE_AMO_SHOW);
  },
  addKillNum: function addKillNum(_index, _belongName) {
    if (_index == 1) {
      _index = 0;
    } else {
      _index -= 9;
    }

    this.globalData.inGameKillNum[_index]._killNum++;
    this.globalData.inGameKillNum[_index]._belongName = _belongName;
    GameApp.eventManager.emit(EventNames.EVENT_UPDATE_RANK_SHOW);
    return this.globalData.inGameKillNum[_index]._killNum;
  },
  equipBoxItem: function equipBoxItem(_index) {
    var _rank = this.globalData.getItemAttrArr[_index].rank + 1;

    this.globalData.getItemAttrArr[_index] = {
      rank: _rank,
      item: ItemAttr[_index][_rank - 1]
    }; // var _num = 1
    // if (_index == 3) {
    //     _num = 0
    // }

    this.globalData.equipItemAttr[_index] = this.globalData.getItemAttrArr[_index].item.attr;
    GameApp.eventManager.emit(EventNames.EVENT_UPDATE_STAR_SHOW);
  },
  getEquipItemAttr: function getEquipItemAttr(_index) {
    return this.globalData.equipItemAttr[_index];
  },
  getEquipShowAttr: function getEquipShowAttr() {
    var arr = [];

    for (var i in this.globalData.getItemAttrArr) {
      var _rank = this.globalData.getItemAttrArr[i].rank;

      if (_rank == 0) {
        arr.push(null);
      } else {
        arr.push(this.globalData.getItemAttrArr[i]);
      }
    }

    return arr;
  },
  getOnLineGiftsState: function getOnLineGiftsState(_index) {
    return this.globalData.onLineGifts[_index];
  },
  getActivityGiftsState: function getActivityGiftsState(_index) {
    return this.globalData.activityGifts[_index];
  },
  setOnLineGiftsState: function setOnLineGiftsState(_index, _state) {
    this.globalData.onLineGifts[_index] = _state;
    cc.sys.localStorage.setItem("EatChicken_onLineGifts", JSON.stringify(this.globalData.onLineGifts));
  },
  setActivityGiftsState: function setActivityGiftsState(_index, _state) {
    this.globalData.activityGifts[_index] = _state;
    cc.sys.localStorage.setItem("EatChicken_activityGifts", JSON.stringify(this.globalData.activityGifts));
  },
  getOnlineTimeMinute: function getOnlineTimeMinute() {
    var minuteTime = 0;
    var newtime = Tools.toTimeString2(this.globalData.onLineTime);
    minuteTime = Math.floor(newtime.hour * 60 + newtime.minute);
    return minuteTime;
  },
  addActiveValue: function addActiveValue(_num) {
    var a = this.globalData.activeValue + _num;

    if (a > 120) {
      a = 120;
    }

    this.globalData.activeValue = a;
    var arr = [30, 60, 90, 120];

    for (var i in arr) {
      if (this.globalData.progressGifts[i] == 0) {
        if (this.globalData.activeValue >= arr[i]) {
          this.setProgressGifts(i, 1);
        }
      }
    }

    cc.sys.localStorage.setItem("EatChicken_activeValue", this.globalData.activeValue);
  },
  addActivityNum: function addActivityNum(_index, _num) {
    //更新对应任务完成数量
    this.globalData.activityNum[_index] += _num;
    cc.sys.localStorage.setItem("EatChicken_activityNum", JSON.stringify(this.globalData.activityNum));
  },
  setProgressGifts: function setProgressGifts(_index, _state) {
    this.globalData.progressGifts[_index] = _state;
    cc.sys.localStorage.setItem("EatChicken_progressGifts", JSON.stringify(this.globalData.progressGifts));
  },
  save: function save() {
    cc.sys.localStorage.setItem("EatChicken_UserData", JSON.stringify(this.userData));
  },
  //////////////////////////////////////////////////////////下卖弄是通用的
  changeRecordState: function changeRecordState(state) {
    this.globalData.recordState = state;
  },
  setMD5Code: function setMD5Code(_data) {
    this.MD5Code = _data;
  },
  getMD5Code: function getMD5Code() {
    return this.MD5Code;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFuYWdlclxcRGF0YU1hbmFnZXIuanMiXSwibmFtZXMiOlsid2luZG93IiwiUmVjb3JkU3RhdGUiLCJjYyIsIkVudW0iLCJSRUFEWSIsIlJFQ09SRCIsIlBBVVNFIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk1ENUNvZGUiLCJ1c2VyRGF0YSIsImN0b3IiLCJpc0ZpcnN0UGxheSIsInBsYXllck5hbWUiLCJjb2luTnVtIiwiY2hvb3NlZFNraW5JZCIsInVuTG9ja2VkU2tpbklkQXJyIiwicGxheWVkVmlkZW9OdW0iLCJoYXZlUGllY2VOdW0iLCJib3gxTmVlZENvaW5OdW0iLCJib3gxUmV3YXJkQ29pbk51bSIsImJveDJSZXdhcmRDb2luTnVtIiwiYmFzZUhwIiwiYmFzZURhbWFnZSIsImJhc2VDcml0IiwiYmFzZVNwZWVkIiwiYmFzZUNkIiwiYmFzZURlZiIsImJhc2VSZWNvdmVyeSIsImFsRGllTnVtIiwiYWxsS2lsbE51bSIsImFsbFBsYXlOdW0iLCJ3aW5OdW0iLCJ0b3A1TnVtIiwid2luUmF0ZSIsImtkIiwiYXZnUmFuayIsIm1vc3RLaWxsIiwiYXZnTGlmZVRpbWUiLCJnbG9iYWxEYXRhIiwiZGF5cyIsImN1ckRhaWx5R290Iiwic2hvb3RJbnRlcnZhbCIsInJlbG9hZEludGVydmFsIiwibWF4QW1vTnVtIiwiY3VyQW1vTnVtIiwibWF4SHAiLCJjdXJIcCIsImN1ckRhbWFnZSIsImN1ckNyaXQiLCJjdXJTcGVlZCIsImN1ckNkIiwiY3VyRGVmIiwiY3VyUmVjb3ZlcnkiLCJhbGxSb2xlQXJyIiwiYWxsR3VuQXJyIiwiYWxsQm94QXJyIiwiaXNJbkdhbWUiLCJpbkdhbWVLaWxsTnVtIiwiZ2FzQ29uZmlnIiwiZ2V0SXRlbUF0dHJBcnIiLCJyYW5rIiwiaXRlbSIsImVxdWlwSXRlbUF0dHIiLCJsaWZlVGltZSIsIm9uTGluZVRpbWUiLCJvbkxpbmVHaWZ0cyIsIm9uTGluZUdpZnRDdXJOdW0iLCJhY3RpdmVWYWx1ZSIsImFjdGl2aXR5R2lmdHMiLCJhY3Rpdml0eU51bSIsImFjdGl2aXR5Q3VyTnVtIiwiYWN0aXZpdHlDdXJDb2luIiwicHJvZ3Jlc3NHaWZ0cyIsImFjdGl2aXR5QWRkTnVtIiwiYWN0aXZpdHlBZGRDb2luIiwicGxheWVyTmFtZUFyciIsInJlY29yZFBhdGgiLCJyZWNvcmRUaW1lciIsInJlY29yZFN0YXRlIiwianNvbkRhdGEiLCJTa2luc0RhdGEiLCJXZWFwb25EYXRhIiwiUm9ib3ROYW1lIiwiaW5pdFNvbWVBdHRyIiwiZ2FtZSIsIm9uIiwiRVZFTlRfSElERSIsImNvbnNvbGUiLCJsb2ciLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwicGFyc2VJbnQiLCJnZXRTdGF0ZSIsImdldEl0ZW0iLCJ0ZW1wT25MaW5ldGltZSIsInVuZGVmaW5lZCIsInRlbXBPbkxpbmVHaWZ0cyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsInRlbXBPbkxpbmVHaWZ0Q3VyTnVtIiwidGVtcGFjdGl2ZVZhbHVlIiwidGVtcGFjdGl2aXR5R2lmdHMiLCJ0ZW1wYWN0aXZpdHlOdW0iLCJ0ZW1wYWN0aXZpdHlDdXJOdW0iLCJ0ZW1wYWN0aXZpdHlDdXJDb2luIiwidGVtcHByb2dyZXNzR2lmdHMiLCJzZXRQbGF5ZXJOYW1lIiwiX25hbWUiLCJzYXZlIiwiYWRkQ29pbiIsIl9udW0iLCJHYW1lQXBwIiwiZXZlbnRNYW5hZ2VyIiwiZW1pdCIsIkV2ZW50TmFtZXMiLCJFVkVOVF9VUERBVEVfQ09JTl9TSE9XIiwicmVkdWNlQ29pbiIsImEiLCJ1bkxvY2tTa2luIiwiX3NraW5JZCIsImluZGV4T2YiLCJwdXNoIiwiYWRkUGllY2VOdW0iLCJfcGllY2VJbmRleCIsImFyciIsImZvckVhY2giLCJpbmRleCIsImdldFNraW5EYXRhQnlJZCIsIm5lZWRwaWVjZSIsImFkZFBsYXllZFZpZGVvTnVtIiwibmVlZGdlbSIsInNldENob29zZWRTa2luSWQiLCJfdmFsIiwiYWRkU2tpbkF0dHIiLCJjdXJTa2luRGF0YSIsIk1hdGgiLCJmbG9vciIsImF0dF9ocG1heCIsImF0dF9kYW1hZ2UiLCJhdHRfY3JpdCIsImF0dF9zcGVlZCIsImF0dF9jZCIsImF0dF9kZWZlbnNlIiwiYXR0X3JlY292ZXJ5IiwiZ2V0Q2hvb3NlZFNraW5JZCIsInJlZHVjZUhwIiwiRVZFTlRfVVBEQVRFX1RPUEJBUl9TSE9XIiwiZ2V0UmVzdW1lSGVhbHRoTnVtIiwiZ2V0U2tpbGxDRCIsImFkZEhwIiwicmVkdWNlQW1vIiwiRVZFTlRfVVBEQVRFX0FNT19TSE9XIiwicmVsb2FkQW1vIiwiYWRkS2lsbE51bSIsIl9pbmRleCIsIl9iZWxvbmdOYW1lIiwiX2tpbGxOdW0iLCJFVkVOVF9VUERBVEVfUkFOS19TSE9XIiwiZXF1aXBCb3hJdGVtIiwiX3JhbmsiLCJJdGVtQXR0ciIsImF0dHIiLCJFVkVOVF9VUERBVEVfU1RBUl9TSE9XIiwiZ2V0RXF1aXBJdGVtQXR0ciIsImdldEVxdWlwU2hvd0F0dHIiLCJpIiwiZ2V0T25MaW5lR2lmdHNTdGF0ZSIsImdldEFjdGl2aXR5R2lmdHNTdGF0ZSIsInNldE9uTGluZUdpZnRzU3RhdGUiLCJfc3RhdGUiLCJzZXRBY3Rpdml0eUdpZnRzU3RhdGUiLCJnZXRPbmxpbmVUaW1lTWludXRlIiwibWludXRlVGltZSIsIm5ld3RpbWUiLCJUb29scyIsInRvVGltZVN0cmluZzIiLCJob3VyIiwibWludXRlIiwiYWRkQWN0aXZlVmFsdWUiLCJzZXRQcm9ncmVzc0dpZnRzIiwiYWRkQWN0aXZpdHlOdW0iLCJjaGFuZ2VSZWNvcmRTdGF0ZSIsInN0YXRlIiwic2V0TUQ1Q29kZSIsIl9kYXRhIiwiZ2V0TUQ1Q29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBQSxNQUFNLENBQUNDLFdBQVAsR0FBcUJDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3pCQyxFQUFBQSxLQUFLLEVBQUUsQ0FEa0I7QUFFekJDLEVBQUFBLE1BQU0sRUFBRSxDQUZpQjtBQUd6QkMsRUFBQUEsS0FBSyxFQUFFO0FB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QUNILEdBL2RJO0FBZ2VMO0FBQ0E4SyxFQUFBQSxpQkFqZUssNkJBaWVhQyxLQWplYixFQWllb0I7QUFDckIsU0FBS2xKLFVBQUwsQ0FBZ0J3QyxXQUFoQixHQUE4QjBHLEtBQTlCO0FBQ0gsR0FuZUk7QUFvZUxDLEVBQUFBLFVBcGVLLHNCQW9lTUMsS0FwZU4sRUFvZWE7QUFDZCxTQUFLbEwsT0FBTCxHQUFla0wsS0FBZjtBQUNILEdBdGVJO0FBd2VMQyxFQUFBQSxVQXhlSyx3QkF3ZVE7QUFDVCxXQUFPLEtBQUtuTCxPQUFaO0FBQ0g7QUExZUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoq5b2V5bGP54q25oCBICovXHJcbndpbmRvdy5SZWNvcmRTdGF0ZSA9IGNjLkVudW0oe1xyXG4gICAgUkVBRFk6IDAsXHJcbiAgICBSRUNPUkQ6IDEsXHJcbiAgICBQQVVTRTogMlxyXG59KTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJEYXRhTWFuYWdlclwiLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBNRDVDb2RlOiBudWxsLFxyXG4gICAgICAgIHVzZXJEYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YSA9IHtcclxuICAgICAgICAgICAgaXNGaXJzdFBsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIHBsYXllck5hbWU6IFwi6I+g6JCd5ZC56ZuqXCIsXHJcbiAgICAgICAgICAgIGNvaW5OdW06IDAsXHJcbiAgICAgICAgICAgIGNob29zZWRTa2luSWQ6IDEsIC8vMjF+MzDmmK/ni6znq4vnmoRzcGluZeaWh+S7tlxyXG4gICAgICAgICAgICB1bkxvY2tlZFNraW5JZEFycjogWzFdLFxyXG5cclxuICAgICAgICAgICAgcGxheWVkVmlkZW9OdW06IDAsXHJcbiAgICAgICAgICAgIGhhdmVQaWVjZU51bToge1xyXG4gICAgICAgICAgICAgICAgMjY6IDAsXHJcbiAgICAgICAgICAgICAgICAyNzogMCxcclxuICAgICAgICAgICAgICAgIDI4OiAwLFxyXG4gICAgICAgICAgICAgICAgMjk6IDAsXHJcbiAgICAgICAgICAgICAgICAzMDogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm94MU5lZWRDb2luTnVtOiAxMDAsXHJcbiAgICAgICAgICAgIGJveDFSZXdhcmRDb2luTnVtOiBbNTAsIDE1MF0sXHJcbiAgICAgICAgICAgIGJveDJSZXdhcmRDb2luTnVtOiBbMjUwLCA1MDBdLFxyXG5cclxuICAgICAgICAgICAgLy/kuIvpnaLmmK/kurrnianln7rnoYDlsZ7mgKdcclxuICAgICAgICAgICAgYmFzZUhwOiAxMDAsXHJcbiAgICAgICAgICAgIGJhc2VEYW1hZ2U6IDEsXHJcbiAgICAgICAgICAgIGJhc2VDcml0OiAwLFxyXG4gICAgICAgICAgICBiYXNlU3BlZWQ6IDIwMCxcclxuICAgICAgICAgICAgYmFzZUNkOiAwLFxyXG4gICAgICAgICAgICBiYXNlRGVmOiAwLFxyXG4gICAgICAgICAgICBiYXNlUmVjb3Zlcnk6IDEsXHJcblxyXG4gICAgICAgICAgICAvL+S4i+mdouaYr+aImOe7qee7n+iuoVxyXG4gICAgICAgICAgICBhbERpZU51bTogMCxcclxuICAgICAgICAgICAgYWxsS2lsbE51bTogMCxcclxuICAgICAgICAgICAgYWxsUGxheU51bTogMCxcclxuICAgICAgICAgICAgd2luTnVtOiAwLFxyXG4gICAgICAgICAgICB0b3A1TnVtOiAwLFxyXG4gICAgICAgICAgICB3aW5SYXRlOiAwLFxyXG4gICAgICAgICAgICBrZDogMCxcclxuICAgICAgICAgICAgYXZnUmFuazogMCxcclxuICAgICAgICAgICAgbW9zdEtpbGw6IDAsXHJcbiAgICAgICAgICAgIGF2Z0xpZmVUaW1lOiAwLFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEgPSB7XHJcbiAgICAgICAgICAgIGRheXM6IDEsXHJcbiAgICAgICAgICAgIGN1ckRhaWx5R290OiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHNob290SW50ZXJ2YWw6IDAsXHJcbiAgICAgICAgICAgIHJlbG9hZEludGVydmFsOiAwLFxyXG4gICAgICAgICAgICBtYXhBbW9OdW06IDIwLFxyXG4gICAgICAgICAgICBjdXJBbW9OdW06IDIwLFxyXG5cclxuICAgICAgICAgICAgbWF4SHA6IDEwMCxcclxuICAgICAgICAgICAgY3VySHA6IDEwMCxcclxuICAgICAgICAgICAgY3VyRGFtYWdlOiAwLFxyXG4gICAgICAgICAgICBjdXJDcml0OiAwLFxyXG4gICAgICAgICAgICBjdXJTcGVlZDogMjAwLFxyXG4gICAgICAgICAgICBjdXJDZDogMCxcclxuICAgICAgICAgICAgY3VyRGVmOiAwLFxyXG4gICAgICAgICAgICBjdXJSZWNvdmVyeTogMCxcclxuXHJcbiAgICAgICAgICAgIGFsbFJvbGVBcnI6IFtdLFxyXG4gICAgICAgICAgICBhbGxHdW5BcnI6IFtdLFxyXG4gICAgICAgICAgICBhbGxCb3hBcnI6IFtdLFxyXG4gICAgICAgICAgICBpc0luR2FtZTogZmFsc2UsLy/nlKjkuo7ljLrliIblh4blpIflnLrmma/lkozmuLjmiI/lnLrmma/vvIzlh4blpIflnLrmma/mmK/kuI3kvJrpgKDmiJDkvKTlrrPnmoTvvIzkuZ/kuI3mmL7npLrkuIDkuptVSVxyXG4gICAgICAgICAgICBpbkdhbWVLaWxsTnVtOiBbXSxcclxuICAgICAgICAgICAgZ2FzQ29uZmlnOiBudWxsLFxyXG4gICAgICAgICAgICBnZXRJdGVtQXR0ckFycjogW3tcclxuICAgICAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgICAgICBpdGVtOiBudWxsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgICAgICBpdGVtOiBudWxsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgICAgICBpdGVtOiBudWxsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgICAgICBpdGVtOiBudWxsXHJcbiAgICAgICAgICAgIH1dLC8v5Lyk5a6z77yM6Ziy5b6h77yM56e76YCf77yM5pq05Ye7XHJcbiAgICAgICAgICAgIGVxdWlwSXRlbUF0dHI6IFswLCAwLCAwLCAwXSwvLyjoo4XlpIfluKbmnaXnmoTlsZ7mgKcp5Lyk5a6z77yM6Ziy5b6h77yM56e76YCf77yM5pq05Ye7XHJcblxyXG4gICAgICAgICAgICBsaWZlVGltZTogMCxcclxuXHJcblxyXG4gICAgICAgICAgICAvL+WcqOe6v+ebuOWFs1xyXG4gICAgICAgICAgICBvbkxpbmVUaW1lOiAwLC8v57Sv6K6h5Zyo57q/5pe26ZW/XHJcbiAgICAgICAgICAgIG9uTGluZUdpZnRzOiBbMiwgMiwgMl0sLy8w5pyq5a6M5oiQ77yMMeWPr+mihuWPlu+8jDLlt7Lpooblj5ZcclxuICAgICAgICAgICAgb25MaW5lR2lmdEN1ck51bTogMCwvL+W9k+WJjeS4gOaJueS7u+WKoeacgOWkp+mHkeW4geaVsOWSjOaJgOmcgOWcqOe6v+aXtumVvygrNSlcclxuXHJcbiAgICAgICAgICAgIC8v5rS76LeD55u45YWzXHJcbiAgICAgICAgICAgIGFjdGl2ZVZhbHVlOiAwLC8v5rS76LeD5YC8XHJcbiAgICAgICAgICAgIGFjdGl2aXR5R2lmdHM6IFsyLCAyLCAyXSwvLzDmnKrlrozmiJDvvIwx5Y+v6aKG5Y+W77yMMuW3sumihuWPllxyXG4gICAgICAgICAgICBhY3Rpdml0eU51bTogWzAsIDAsIDBdLC8v5b2T5YmN5LiJ5Liq5Lu75Yqh5a6M5oiQ5pWw6YePXHJcbiAgICAgICAgICAgIGFjdGl2aXR5Q3VyTnVtOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIGFjdGl2aXR5Q3VyQ29pbjogWzAsIDAsIDBdLFxyXG5cclxuICAgICAgICAgICAgcHJvZ3Jlc3NHaWZ0czogWzAsIDAsIDAsIDBdLC8vMOaYr+acqui+vuaIkO+8jDHmmK/lj6/pooblj5bvvIwy5piv5bey6aKG5Y+WXHJcblxyXG4gICAgICAgICAgICBhY3Rpdml0eUFkZE51bTogWzEsIDMsIDFdLC8v5q+P6Zi25q615Lu75Yqh5aKe6YePXHJcbiAgICAgICAgICAgIGFjdGl2aXR5QWRkQ29pbjogWzUwLCAxMDAsIDEwMF0sLy/mr4/pmLbmrrXph5HluIHlop7ph49cclxuICAgICAgICAgICAgLy8vLy8vXHJcbiAgICAgICAgICAgIHBsYXllck5hbWVBcnI6IFtcclxuICAgICAgICAgICAgICAgIFwi6ZqL5pmX6JW+XCIsXHJcbiAgICAgICAgICAgICAgICBcIumpueWkj+S5i1wiLFxyXG4gICAgICAgICAgICAgICAgXCLlo6zntKvpm6pcIixcclxuICAgICAgICAgICAgICAgIFwi5Y2O5riF5ra1XCIsXHJcbiAgICAgICAgICAgICAgICBcIuWOjeWymuW9qVwiLFxyXG4gICAgICAgICAgICAgICAgXCLkvp3pm6rlhbBcIixcclxuICAgICAgICAgICAgICAgIFwi5L+f6aqK5amnXCIsXHJcbiAgICAgICAgICAgICAgICBcIuWjsOmHh+ePilwiLFxyXG4gICAgICAgICAgICAgICAgXCLmhIjmiJDmtY5cIixcclxuICAgICAgICAgICAgICAgIFwi5pq06ZuoXCIsXHJcbiAgICAgICAgICAgICAgICBcIuWFmumbgeS4nVwiLFxyXG4gICAgICAgICAgICAgICAgXCLmn7Tkv4rpg45cIixcclxuICAgICAgICAgICAgICAgIFwi5r2c5pil6IqzXCIsXHJcbiAgICAgICAgICAgICAgICBcIuiht+S6puW3p1wiLFxyXG4gICAgICAgICAgICAgICAgXCLotorkuJbmlY9cIixcclxuICAgICAgICAgICAgICAgIFwi56WI5qGQXCIsXHJcbiAgICAgICAgICAgICAgICBcIuiPheaYhumUkFwiLFxyXG4gICAgICAgICAgICAgICAgXCLljZHnu43pkqdcIixcclxuICAgICAgICAgICAgICAgIFwi5rWR56eA6IuxXCIsXHJcbiAgICAgICAgICAgICAgICBcIueJm+S/iuaCn1wiLFxyXG4gICAgICAgICAgICAgICAgXCLmsbLmsLjlurdcIixcclxuICAgICAgICAgICAgICAgIFwi6JmO6IOk5paHXCIsXHJcbiAgICAgICAgICAgICAgICBcIuWuv+W3p+aYpVwiLFxyXG4gICAgICAgICAgICAgICAgXCLmtbflkIjnkZ5cIixcclxuICAgICAgICAgICAgICAgIFwi5pyL5pu+XCIsXHJcbiAgICAgICAgICAgICAgICBcIuWTiOidtlwiLFxyXG4gICAgICAgICAgICAgICAgXCLlro/nnb/mlodcIixcclxuICAgICAgICAgICAgICAgIFwi6buO5rOw54S2XCJdLFxyXG4gICAgICAgICAgICByZWNvcmRQYXRoOiBudWxsLFxyXG4gICAgICAgICAgICByZWNvcmRUaW1lcjogMCxcclxuICAgICAgICAgICAgcmVjb3JkU3RhdGU6IFJlY29yZFN0YXRlLlJFQURZLFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+earuiCpFxyXG4gICAgICAgIHRoaXMuanNvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgIFNraW5zRGF0YTogW10sXHJcbiAgICAgICAgICAgIFdlYXBvbkRhdGE6IFtdLFxyXG4gICAgICAgICAgICBSb2JvdE5hbWU6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGluaXRTb21lQXR0cigpIHtcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/m+WFpeWQjuWPsOWJjeWtmOWCqOS6huaVsOaNrlwiKTtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiRWF0Q2hpY2tlbl9vbkxpbmVUaW1lXCIsIHBhcnNlSW50KHRoaXMuZ2xvYmFsRGF0YS5vbkxpbmVUaW1lKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBnZXRTdGF0ZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkVhdENoaWNrZW5fZGFpbHlHb3RTdGF0ZVwiKTtcclxuICAgICAgICBpZiAoZ2V0U3RhdGUgPT0gXCJ0cnVlXCIgfHwgZ2V0U3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuY3VyRGFpbHlHb3QgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmN1ckRhaWx5R290ID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRlbXBPbkxpbmV0aW1lID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiRWF0Q2hpY2tlbl9vbkxpbmVUaW1lXCIpXHJcbiAgICAgICAgaWYgKHRlbXBPbkxpbmV0aW1lID09IG51bGwgfHwgdGVtcE9uTGluZXRpbWUgPT0gdW5kZWZpbmVkIHx8IHRlbXBPbkxpbmV0aW1lID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGVtcE9uTGluZXRpbWUgPSAwXHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkVhdENoaWNrZW5fb25MaW5lVGltZVwiLCAwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXBPbkxpbmV0aW1lID0gcGFyc2VJbnQodGVtcE9uTGluZXRpbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5vbkxpbmVUaW1lID0gdGVtcE9uTGluZXRpbWVcclxuXHJcbiAgICAgICAgdmFyIHRlbXBPbkxpbmVHaWZ0cyA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkVhdENoaWNrZW5fb25MaW5lR2lmdHNcIilcclxuICAgICAgICBpZiAodGVtcE9uTGluZUdpZnRzID09IG51bGwgfHwgdGVtcE9uTGluZUdpZnRzID09IHVuZGVmaW5lZCB8fCB0ZW1wT25MaW5lR2lmdHMgPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0ZW1wT25MaW5lR2lmdHMgPSBbMiwgMiwgMl1cclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiRWF0Q2hpY2tlbl9vbkxpbmVHaWZ0c1wiLCBKU09OLnN0cmluZ2lmeSh0ZW1wT25MaW5lR2lmdHMpKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXBPbkxpbmVHaWZ0cyA9IEpTT04ucGFyc2UodGVtcE9uTGluZUdpZnRzKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEub25MaW5lR2lmdHMgPSB0ZW1wT25MaW5lR2lmdHNcclxuXHJcblxyXG4gICAgICAgIHZhciB0ZW1wT25MaW5lR2lmdEN1ck51bSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkVhdENoaWNrZW5fb25MaW5lR2lmdEN1ck51bVwiKVxyXG4gICAgICAgIGlmICh0ZW1wT25MaW5lR2lmdEN1ck51bSA9PSBudWxsIHx8IHRlbXBPbkxpbmVHaWZ0Q3VyTnVtID09IHVuZGVmaW5lZCB8fCB0ZW1wT25MaW5lR2lmdEN1ck51bSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRlbXBPbkxpbmVHaWZ0Q3VyTnVtID0gMFxyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX29uTGluZUdpZnRDdXJOdW1cIiwgMClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZW1wT25MaW5lR2lmdEN1ck51bSA9IHBhcnNlSW50KHRlbXBPbkxpbmVHaWZ0Q3VyTnVtKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEub25MaW5lR2lmdEN1ck51bSA9IHRlbXBPbkxpbmVHaWZ0Q3VyTnVtXHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIHRlbXBhY3RpdmVWYWx1ZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkVhdENoaWNrZW5fYWN0aXZlVmFsdWVcIilcclxuICAgICAgICBpZiAodGVtcGFjdGl2ZVZhbHVlID09IG51bGwgfHwgdGVtcGFjdGl2ZVZhbHVlID09IHVuZGVmaW5lZCB8fCB0ZW1wYWN0aXZlVmFsdWUgPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0ZW1wYWN0aXZlVmFsdWUgPSAwXHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkVhdENoaWNrZW5fYWN0aXZlVmFsdWVcIiwgMClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZW1wYWN0aXZlVmFsdWUgPSBwYXJzZUludCh0ZW1wYWN0aXZlVmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5hY3RpdmVWYWx1ZSA9IHRlbXBhY3RpdmVWYWx1ZVxyXG5cclxuICAgICAgICB2YXIgdGVtcGFjdGl2aXR5R2lmdHMgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJFYXRDaGlja2VuX2FjdGl2aXR5R2lmdHNcIilcclxuICAgICAgICBpZiAodGVtcGFjdGl2aXR5R2lmdHMgPT0gbnVsbCB8fCB0ZW1wYWN0aXZpdHlHaWZ0cyA9PSB1bmRlZmluZWQgfHwgdGVtcGFjdGl2aXR5R2lmdHMgPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0ZW1wYWN0aXZpdHlHaWZ0cyA9IFsyLCAyLCAyXVxyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX2FjdGl2aXR5R2lmdHNcIiwgSlNPTi5zdHJpbmdpZnkodGVtcGFjdGl2aXR5R2lmdHMpKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXBhY3Rpdml0eUdpZnRzID0gSlNPTi5wYXJzZSh0ZW1wYWN0aXZpdHlHaWZ0cylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmFjdGl2aXR5R2lmdHMgPSB0ZW1wYWN0aXZpdHlHaWZ0c1xyXG5cclxuICAgICAgICB2YXIgdGVtcGFjdGl2aXR5TnVtID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiRWF0Q2hpY2tlbl9hY3Rpdml0eU51bVwiKVxyXG4gICAgICAgIGlmICh0ZW1wYWN0aXZpdHlOdW0gPT0gbnVsbCB8fCB0ZW1wYWN0aXZpdHlOdW0gPT0gdW5kZWZpbmVkIHx8IHRlbXBhY3Rpdml0eU51bSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRlbXBhY3Rpdml0eU51bSA9IFswLCAwLCAwXVxyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX2FjdGl2aXR5TnVtXCIsIEpTT04uc3RyaW5naWZ5KHRlbXBhY3Rpdml0eU51bSkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcGFjdGl2aXR5TnVtID0gSlNPTi5wYXJzZSh0ZW1wYWN0aXZpdHlOdW0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5hY3Rpdml0eU51bSA9IHRlbXBhY3Rpdml0eU51bVxyXG5cclxuICAgICAgICB2YXIgdGVtcGFjdGl2aXR5Q3VyTnVtID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiRWF0Q2hpY2tlbl9hY3Rpdml0eUN1ck51bVwiKVxyXG4gICAgICAgIGlmICh0ZW1wYWN0aXZpdHlDdXJOdW0gPT0gbnVsbCB8fCB0ZW1wYWN0aXZpdHlDdXJOdW0gPT0gdW5kZWZpbmVkIHx8IHRlbXBhY3Rpdml0eUN1ck51bSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRlbXBhY3Rpdml0eUN1ck51bSA9IFswLCAwLCAwXVxyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX2FjdGl2aXR5Q3VyTnVtXCIsIEpTT04uc3RyaW5naWZ5KHRlbXBhY3Rpdml0eUN1ck51bSkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcGFjdGl2aXR5Q3VyTnVtID0gSlNPTi5wYXJzZSh0ZW1wYWN0aXZpdHlDdXJOdW0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5hY3Rpdml0eUN1ck51bSA9IHRlbXBhY3Rpdml0eUN1ck51bVxyXG5cclxuICAgICAgICB2YXIgdGVtcGFjdGl2aXR5Q3VyQ29pbiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkVhdENoaWNrZW5fYWN0aXZpdHlDdXJDb2luXCIpXHJcbiAgICAgICAgaWYgKHRlbXBhY3Rpdml0eUN1ckNvaW4gPT0gbnVsbCB8fCB0ZW1wYWN0aXZpdHlDdXJDb2luID09IHVuZGVmaW5lZCB8fCB0ZW1wYWN0aXZpdHlDdXJDb2luID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGVtcGFjdGl2aXR5Q3VyQ29pbiA9IFswLCAwLCAwXVxyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX2FjdGl2aXR5Q3VyQ29pblwiLCBKU09OLnN0cmluZ2lmeSh0ZW1wYWN0aXZpdHlDdXJDb2luKSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZW1wYWN0aXZpdHlDdXJDb2luID0gSlNPTi5wYXJzZSh0ZW1wYWN0aXZpdHlDdXJDb2luKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuYWN0aXZpdHlDdXJDb2luID0gdGVtcGFjdGl2aXR5Q3VyQ29pblxyXG5cclxuICAgICAgICB2YXIgdGVtcHByb2dyZXNzR2lmdHMgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJFYXRDaGlja2VuX3Byb2dyZXNzR2lmdHNcIilcclxuICAgICAgICBpZiAodGVtcHByb2dyZXNzR2lmdHMgPT0gbnVsbCB8fCB0ZW1wcHJvZ3Jlc3NHaWZ0cyA9PSB1bmRlZmluZWQgfHwgdGVtcHByb2dyZXNzR2lmdHMgPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0ZW1wcHJvZ3Jlc3NHaWZ0cyA9IFswLCAwLCAwLCAwXVxyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX3Byb2dyZXNzR2lmdHNcIiwgSlNPTi5zdHJpbmdpZnkodGVtcHByb2dyZXNzR2lmdHMpKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXBwcm9ncmVzc0dpZnRzID0gSlNPTi5wYXJzZSh0ZW1wcHJvZ3Jlc3NHaWZ0cylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnByb2dyZXNzR2lmdHMgPSB0ZW1wcHJvZ3Jlc3NHaWZ0c1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmFsbFJvbGVBcnIgPSBbXVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5hbGxHdW5BcnIgPSBbXVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5hbGxCb3hBcnIgPSBbXVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5pbkdhbWVLaWxsTnVtID0gW11cclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuZ2FzQ29uZmlnID0gbnVsbFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5nZXRJdGVtQXR0ckFyciA9IFt7XHJcbiAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9XS8v5Lyk5a6z77yM6Ziy5b6h77yM56e76YCf77yM5pq05Ye7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmVxdWlwSXRlbUF0dHIgPSBbMCwgMCwgMCwgMF1cclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEubWF4SHAgPSB0aGlzLmdsb2JhbERhdGEuY3VySHAgPSB0aGlzLnVzZXJEYXRhLmJhc2VIcFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5jdXJEYW1hZ2UgPSB0aGlzLnVzZXJEYXRhLmJhc2VEYW1hZ2VcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuY3VyQ3JpdCA9IHRoaXMudXNlckRhdGEuYmFzZUNyaXRcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuY3VyU3BlZWQgPSB0aGlzLnVzZXJEYXRhLmJhc2VTcGVlZFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5jdXJDZCA9IHRoaXMudXNlckRhdGEuYmFzZUNkXHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmN1ckRlZiA9IHRoaXMudXNlckRhdGEuYmFzZURlZlxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5jdXJSZWNvdmVyeSA9IHRoaXMudXNlckRhdGEuYmFzZVJlY292ZXJ5XHJcblxyXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgMzA7IGkrKykge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmdsb2JhbERhdGEuaW5HYW1lS2lsbE51bS5wdXNoKHtcclxuICAgICAgICAvLyAgICAgICAgIF9raWxsTnVtOiAwLFxyXG4gICAgICAgIC8vICAgICAgICAgX2JlbG9uZ05hbWU6IFwiXCJcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9XHJcbiAgICB9LFxyXG4gICAgc2V0UGxheWVyTmFtZShfbmFtZSkge1xyXG4gICAgICAgIHRoaXMudXNlckRhdGEucGxheWVyTmFtZSA9IF9uYW1lXHJcbiAgICAgICAgdGhpcy5zYXZlKClcclxuICAgIH0sXHJcbiAgICBhZGRDb2luKF9udW0pIHtcclxuICAgICAgICB0aGlzLnVzZXJEYXRhLmNvaW5OdW0gKz0gX251bVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfQ09JTl9TSE9XKVxyXG4gICAgICAgIHRoaXMuc2F2ZSgpXHJcbiAgICB9LFxyXG4gICAgcmVkdWNlQ29pbihfbnVtKSB7XHJcbiAgICAgICAgdmFyIGEgPSB0aGlzLnVzZXJEYXRhLmNvaW5OdW0gLSBfbnVtXHJcbiAgICAgICAgaWYgKGEgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuY29pbk51bSA9IGFcclxuICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1VQREFURV9DT0lOX1NIT1cpXHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZSgpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1bkxvY2tTa2luKF9za2luSWQpIHtcclxuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS51bkxvY2tlZFNraW5JZEFyci5pbmRleE9mKF9za2luSWQpID09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEudW5Mb2NrZWRTa2luSWRBcnIucHVzaChfc2tpbklkKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhZGRQaWVjZU51bShfcGllY2VJbmRleCwgX251bSkge1xyXG4gICAgICAgIHRoaXMudXNlckRhdGEuaGF2ZVBpZWNlTnVtW19waWVjZUluZGV4XSArPSBfbnVtXHJcbiAgICAgICAgdmFyIGFyciA9IFsyNiwgMjcsIDI4LCAyOSwgMzBdXHJcbiAgICAgICAgYXJyLmZvckVhY2goaW5kZXggPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5oYXZlUGllY2VOdW1baW5kZXhdID49IHRoaXMuZ2V0U2tpbkRhdGFCeUlkKGluZGV4KS5uZWVkcGllY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5Mb2NrU2tpbihpbmRleClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2F2ZSgpXHJcbiAgICB9LFxyXG4gICAgYWRkUGxheWVkVmlkZW9OdW0oKSB7XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YS5wbGF5ZWRWaWRlb051bSsrXHJcbiAgICAgICAgdmFyIGFyciA9IFsyMSwgMjIsIDIzLCAyNCwgMjVdXHJcbiAgICAgICAgYXJyLmZvckVhY2goaW5kZXggPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5wbGF5ZWRWaWRlb051bSA+PSB0aGlzLmdldFNraW5EYXRhQnlJZChpbmRleCkubmVlZGdlbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bkxvY2tTa2luKGluZGV4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zYXZlKClcclxuICAgIH0sXHJcbiAgICBnZXRTa2luRGF0YUJ5SWQoX3NraW5JZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmpzb25EYXRhLlNraW5zRGF0YVtfc2tpbklkIC0gMV1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0Q2hvb3NlZFNraW5JZChfdmFsKSB7XHJcbiAgICAgICAgKF92YWwgPiAzMCkgJiYgKF92YWwgPSAxKTtcclxuICAgICAgICAoX3ZhbCA8IDEpICYmIChfdmFsID0gMzApO1xyXG4gICAgICAgIHRoaXMudXNlckRhdGEuY2hvb3NlZFNraW5JZCA9IF92YWxcclxuICAgICAgICB0aGlzLmFkZFNraW5BdHRyKClcclxuICAgICAgICB0aGlzLnNhdmUoKVxyXG4gICAgfSxcclxuICAgIGFkZFNraW5BdHRyKCkge1xyXG4gICAgICAgIHZhciBjdXJTa2luRGF0YSA9IHRoaXMuZ2V0U2tpbkRhdGFCeUlkKHRoaXMudXNlckRhdGEuY2hvb3NlZFNraW5JZClcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEubWF4SHAgPSB0aGlzLmdsb2JhbERhdGEuY3VySHAgPSB0aGlzLnVzZXJEYXRhLmJhc2VIcCArIE1hdGguZmxvb3IodGhpcy51c2VyRGF0YS5iYXNlSHAgKiAoY3VyU2tpbkRhdGEuYXR0X2hwbWF4IC8gMTAwKSlcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuY3VyRGFtYWdlID0gdGhpcy51c2VyRGF0YS5iYXNlRGFtYWdlICsgY3VyU2tpbkRhdGEuYXR0X2RhbWFnZSAvIDEwMFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5jdXJDcml0ID0gdGhpcy51c2VyRGF0YS5iYXNlQ3JpdCArIGN1clNraW5EYXRhLmF0dF9jcml0IC8gMTBcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuY3VyU3BlZWQgPSB0aGlzLnVzZXJEYXRhLmJhc2VTcGVlZCArIE1hdGguZmxvb3IodGhpcy51c2VyRGF0YS5iYXNlU3BlZWQgKiAoY3VyU2tpbkRhdGEuYXR0X3NwZWVkIC8gMTAwKSlcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuY3VyQ2QgPSB0aGlzLnVzZXJEYXRhLmJhc2VDZCArIGN1clNraW5EYXRhLmF0dF9jZCAvIDEwMFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5jdXJEZWYgPSB0aGlzLnVzZXJEYXRhLmJhc2VEZWYgKyBjdXJTa2luRGF0YS5hdHRfZGVmZW5zZSAvIDEwMFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5jdXJSZWNvdmVyeSA9IHRoaXMudXNlckRhdGEuYmFzZVJlY292ZXJ5ICsgY3VyU2tpbkRhdGEuYXR0X3JlY292ZXJ5IC8gMTAwXHJcbiAgICB9LFxyXG4gICAgZ2V0Q2hvb3NlZFNraW5JZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YS5jaG9vc2VkU2tpbklkXHJcbiAgICB9LFxyXG4gICAgcmVkdWNlSHAoX251bSkge1xyXG4gICAgICAgIHZhciBhID0gdGhpcy5nbG9iYWxEYXRhLmN1ckhwIC0gX251bVxyXG4gICAgICAgIGlmIChhIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmN1ckhwID0gMFxyXG4gICAgICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfVVBEQVRFX1RPUEJBUl9TSE9XKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuY3VySHAgPSBhXHJcbiAgICAgICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfVE9QQkFSX1NIT1cpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldFJlc3VtZUhlYWx0aE51bSgpIHtcclxuICAgICAgICByZXR1cm4gMTAgKiB0aGlzLmdsb2JhbERhdGEuY3VyUmVjb3ZlcnlcclxuICAgIH0sXHJcbiAgICBnZXRTa2lsbENEKCkge1xyXG4gICAgICAgIHJldHVybiAxMCAqICgxIC0gdGhpcy5nbG9iYWxEYXRhLmN1ckNkKVxyXG4gICAgfSxcclxuICAgIGFkZEhwKF9udW0pIHtcclxuICAgICAgICB2YXIgYSA9IHRoaXMuZ2xvYmFsRGF0YS5jdXJIcCArIF9udW1cclxuICAgICAgICBpZiAoYSA+IHRoaXMuZ2xvYmFsRGF0YS5tYXhIcCkge1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuY3VySHAgPSB0aGlzLmdsb2JhbERhdGEubWF4SHBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuY3VySHAgPSBhXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfVE9QQkFSX1NIT1cpXHJcbiAgICB9LFxyXG4gICAgcmVkdWNlQW1vKCkge1xyXG4gICAgICAgIHZhciBhID0gdGhpcy5nbG9iYWxEYXRhLmN1ckFtb051bSAtIDFcclxuICAgICAgICBpZiAoYSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmN1ckFtb051bSA9IDBcclxuICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1VQREFURV9BTU9fU0hPVylcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmN1ckFtb051bSA9IGFcclxuICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1VQREFURV9BTU9fU0hPVylcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVsb2FkQW1vKCkge1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5jdXJBbW9OdW0gPSB0aGlzLmdsb2JhbERhdGEubWF4QW1vTnVtXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1VQREFURV9BTU9fU0hPVylcclxuICAgIH0sXHJcbiAgICBhZGRLaWxsTnVtKF9pbmRleCwgX2JlbG9uZ05hbWUpIHtcclxuICAgICAgICBpZiAoX2luZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgX2luZGV4ID0gMFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9pbmRleCAtPSA5XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5pbkdhbWVLaWxsTnVtW19pbmRleF0uX2tpbGxOdW0rK1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5pbkdhbWVLaWxsTnVtW19pbmRleF0uX2JlbG9uZ05hbWUgPSBfYmVsb25nTmFtZVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfUkFOS19TSE9XKVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEuaW5HYW1lS2lsbE51bVtfaW5kZXhdLl9raWxsTnVtXHJcbiAgICB9LFxyXG4gICAgZXF1aXBCb3hJdGVtKF9pbmRleCkge1xyXG4gICAgICAgIHZhciBfcmFuayA9IHRoaXMuZ2xvYmFsRGF0YS5nZXRJdGVtQXR0ckFycltfaW5kZXhdLnJhbmsgKyAxXHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmdldEl0ZW1BdHRyQXJyW19pbmRleF0gPSB7XHJcbiAgICAgICAgICAgIHJhbms6IF9yYW5rLFxyXG4gICAgICAgICAgICBpdGVtOiBJdGVtQXR0cltfaW5kZXhdW19yYW5rIC0gMV1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdmFyIF9udW0gPSAxXHJcbiAgICAgICAgLy8gaWYgKF9pbmRleCA9PSAzKSB7XHJcbiAgICAgICAgLy8gICAgIF9udW0gPSAwXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5lcXVpcEl0ZW1BdHRyW19pbmRleF0gPSB0aGlzLmdsb2JhbERhdGEuZ2V0SXRlbUF0dHJBcnJbX2luZGV4XS5pdGVtLmF0dHJcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfVVBEQVRFX1NUQVJfU0hPVylcclxuICAgIH0sXHJcbiAgICBnZXRFcXVpcEl0ZW1BdHRyKF9pbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEuZXF1aXBJdGVtQXR0cltfaW5kZXhdXHJcbiAgICB9LFxyXG4gICAgZ2V0RXF1aXBTaG93QXR0cigpIHtcclxuICAgICAgICB2YXIgYXJyID0gW11cclxuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuZ2xvYmFsRGF0YS5nZXRJdGVtQXR0ckFycikge1xyXG4gICAgICAgICAgICB2YXIgX3JhbmsgPSB0aGlzLmdsb2JhbERhdGEuZ2V0SXRlbUF0dHJBcnJbaV0ucmFua1xyXG4gICAgICAgICAgICBpZiAoX3JhbmsgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobnVsbClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHRoaXMuZ2xvYmFsRGF0YS5nZXRJdGVtQXR0ckFycltpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyXHJcbiAgICB9LFxyXG4gICAgZ2V0T25MaW5lR2lmdHNTdGF0ZShfaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLm9uTGluZUdpZnRzW19pbmRleF1cclxuICAgIH0sXHJcbiAgICBnZXRBY3Rpdml0eUdpZnRzU3RhdGUoX2luZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS5hY3Rpdml0eUdpZnRzW19pbmRleF1cclxuICAgIH0sXHJcbiAgICBzZXRPbkxpbmVHaWZ0c1N0YXRlKF9pbmRleCwgX3N0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLm9uTGluZUdpZnRzW19pbmRleF0gPSBfc3RhdGVcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX29uTGluZUdpZnRzXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZ2xvYmFsRGF0YS5vbkxpbmVHaWZ0cykpXHJcbiAgICB9LFxyXG4gICAgc2V0QWN0aXZpdHlHaWZ0c1N0YXRlKF9pbmRleCwgX3N0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmFjdGl2aXR5R2lmdHNbX2luZGV4XSA9IF9zdGF0ZVxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkVhdENoaWNrZW5fYWN0aXZpdHlHaWZ0c1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmdsb2JhbERhdGEuYWN0aXZpdHlHaWZ0cykpXHJcbiAgICB9LFxyXG4gICAgZ2V0T25saW5lVGltZU1pbnV0ZSgpIHtcclxuICAgICAgICB2YXIgbWludXRlVGltZSA9IDBcclxuICAgICAgICB2YXIgbmV3dGltZSA9IFRvb2xzLnRvVGltZVN0cmluZzIodGhpcy5nbG9iYWxEYXRhLm9uTGluZVRpbWUpXHJcbiAgICAgICAgbWludXRlVGltZSA9IE1hdGguZmxvb3IobmV3dGltZS5ob3VyICogNjAgKyBuZXd0aW1lLm1pbnV0ZSlcclxuICAgICAgICByZXR1cm4gbWludXRlVGltZVxyXG4gICAgfSxcclxuICAgIGFkZEFjdGl2ZVZhbHVlKF9udW0pIHtcclxuICAgICAgICB2YXIgYSA9IHRoaXMuZ2xvYmFsRGF0YS5hY3RpdmVWYWx1ZSArIF9udW1cclxuICAgICAgICBpZiAoYSA+IDEyMCkge1xyXG4gICAgICAgICAgICBhID0gMTIwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5hY3RpdmVWYWx1ZSA9IGFcclxuICAgICAgICB2YXIgYXJyID0gWzMwLCA2MCwgOTAsIDEyMF1cclxuICAgICAgICBmb3IgKHZhciBpIGluIGFycikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnByb2dyZXNzR2lmdHNbaV0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS5hY3RpdmVWYWx1ZSA+PSBhcnJbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByb2dyZXNzR2lmdHMoaSwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJFYXRDaGlja2VuX2FjdGl2ZVZhbHVlXCIsIHRoaXMuZ2xvYmFsRGF0YS5hY3RpdmVWYWx1ZSlcclxuICAgIH0sXHJcbiAgICBhZGRBY3Rpdml0eU51bShfaW5kZXgsIF9udW0pIHsgLy/mm7TmlrDlr7nlupTku7vliqHlrozmiJDmlbDph49cclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuYWN0aXZpdHlOdW1bX2luZGV4XSArPSBfbnVtXHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiRWF0Q2hpY2tlbl9hY3Rpdml0eU51bVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmdsb2JhbERhdGEuYWN0aXZpdHlOdW0pKVxyXG4gICAgfSxcclxuICAgIHNldFByb2dyZXNzR2lmdHMoX2luZGV4LCBfc3RhdGUpIHtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEucHJvZ3Jlc3NHaWZ0c1tfaW5kZXhdID0gX3N0YXRlXHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiRWF0Q2hpY2tlbl9wcm9ncmVzc0dpZnRzXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZ2xvYmFsRGF0YS5wcm9ncmVzc0dpZnRzKSlcclxuICAgIH0sXHJcbiAgICBzYXZlKCkge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkVhdENoaWNrZW5fVXNlckRhdGFcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyRGF0YSkpXHJcbiAgICB9LFxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+S4i+WNluW8hOaYr+mAmueUqOeahFxyXG4gICAgY2hhbmdlUmVjb3JkU3RhdGUoc3RhdGUpIHtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEucmVjb3JkU3RhdGUgPSBzdGF0ZVxyXG4gICAgfSxcclxuICAgIHNldE1ENUNvZGUoX2RhdGEpIHtcclxuICAgICAgICB0aGlzLk1ENUNvZGUgPSBfZGF0YVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRNRDVDb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1ENUNvZGVcclxuICAgIH0sXHJcblxyXG59KTsiXX0=