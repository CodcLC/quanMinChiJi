
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/OverPopup.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9381aqM1mNENZMWDyiPSiym', 'OverPopup');
// scripts/ui/OverPopup.js

"use strict";

var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {
    winTitle: cc.Node,
    winSprite: cc.Node,
    loseTitle: cc.Node,
    nameUI: cc.Label,
    rankUI: cc.Label,
    killUI: cc.Label,
    allRewardUI: cc.Label,
    rankRewardUI: cc.Label,
    killRewardUI: cc.Label,
    rewardBtnNode: cc.Button,
    homeBtnNode: cc.Node,
    onceClick: {
      "default": true,
      visible: false
    },
    clickedShare: {
      "default": false,
      visible: false
    }
  },
  onLoad: function onLoad() {
    var _this = this;

    // Utils.addInsertAd("addInsertAd")
    this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
      _this.homeBtnNode.active = true;
    })));
    Tools.scaleUpAndDowm(this.rewardBtnNode.node);
  },
  init: function init(_isWin, rank) {
    if (_isWin) {
      rank = 1;
      this.winTitle.active = true;
      this.winSprite.active = true;
      GameApp.dataManager.userData.winNum++;
      GameApp.dataManager.addActivityNum(2, 1);
    } else {
      this.loseTitle.active = true;
      GameApp.dataManager.userData.alDieNum++;
    }

    if (rank <= 5) {
      GameApp.dataManager.userData.top5Num++;
    }

    this.nameUI.string = GameApp.dataManager.userData.playerName;
    this.rankUI.string = rank;
    var killNum = GameApp.dataManager.globalData.inGameKillNum[0]._killNum;
    GameApp.dataManager.userData.allKillNum += killNum;
    this.killUI.string = killNum;
    var rankCoin = (30 - rank) * 50;
    var killCoin = 100 * killNum;
    var allCoin = rankCoin + killCoin;
    this.allRewardUI.string = allCoin;
    this.rankRewardUI.string = rankCoin;
    this.killRewardUI.string = killCoin;
    GameApp.dataManager.userData.allPlayNum++;
    GameApp.dataManager.userData.winRate = (GameApp.dataManager.userData.winNum / GameApp.dataManager.userData.allPlayNum).toFixed(2);
    GameApp.dataManager.userData.kd = (GameApp.dataManager.userData.allKillNum / (GameApp.dataManager.userData.alDieNum == 0 ? 1 : GameApp.dataManager.userData.alDieNum)).toFixed(2);
    GameApp.dataManager.userData.avgRank = parseInt((GameApp.dataManager.userData.avgRank + rank) / GameApp.dataManager.userData.allPlayNum);
    GameApp.dataManager.userData.mostKill = killNum > GameApp.dataManager.userData.mostKill ? killNum : GameApp.dataManager.userData.mostKill;
    GameApp.dataManager.userData.avgLifeTime = parseInt((GameApp.dataManager.userData.avgLifeTime + GameApp.dataManager.globalData.lifeTime) / GameApp.dataManager.userData.allPlayNum);
    GameApp.dataManager.addCoin(allCoin);
  },
  homeBtnClick: function homeBtnClick() {
    GameApp.audioManager.playEffect('click');
    GameApp.uiManager.showUI("LoginUI");
  },
  rewardBtnClick: function rewardBtnClick() {
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
        GameApp.dataManager.addPlayedVideoNum();
        GameApp.uiManager.showPopup('OpenBoxPopup', function (node) {
          var getNum = Tools.randomNum(100, 1000);
          GameApp.dataManager.addCoin(getNum);
          node.getComponent('OpenBoxPopup').init(GameApp.uiManager.boxSkinDataGroup[1], 1, getNum);
          self.onceClick = true;
          self.rewardBtnNode.interactable = false;
        }, false);
      }, function (_info) {
        //没看完
        self.onceClick = true;
        _info ? GameApp.uiManager.showToast(_info) : GameApp.uiManager.showToast("未看完视频！");
      });
    } else {
      self.onceClick = true;
      GameApp.dataManager.addPlayedVideoNum();
      GameApp.uiManager.showPopup('OpenBoxPopup', function (node) {
        var getNum = Tools.randomNum(100, 1000);
        GameApp.dataManager.addCoin(getNum);
        node.getComponent('OpenBoxPopup').init(GameApp.uiManager.boxSkinDataGroup[1], 1, getNum);
        self.onceClick = true;
        self.rewardBtnNode.interactable = false;
      }, false);
    }
  },
  recordBtnClick: function recordBtnClick() {
    if (!this.onceClick) return;
    this.onceClick = false;
    var self = this;
    GameApp.audioManager.playEffect('click');

    if (this.clickedShare) {
      Utils.shareRecord(GameApp.dataManager.globalData.recordPath, function () {
        // GameApp.dataManager.changeRecordState(RecordState.RECORD)
        self.onceClick = true;
        console.log("分享完成了");
      }, function () {
        self.onceClick = true;
        console.log("分享失败了");
      });
      GameApp.dataManager.changeRecordState(RecordState.READY);
      return;
    }

    if (GameApp.dataManager.globalData.recordTimer < 3) {
      self.onceClick = true;
      GameApp.uiManager.showToast("录屏时间小于3秒!"); // console.log("请过一会儿再分享")

      return;
    } else {
      console.log("结束了");
      var self = this;
      Utils.stopRecord(function (res) {
        if (res != null) {
          GameApp.dataManager.globalData.recordPath = res.videoPath;
        }

        self.clickedShare = true;
        GameApp.dataManager.changeRecordState(RecordState.READY);
        Utils.shareRecord(GameApp.dataManager.globalData.recordPath, function () {
          // GameApp.dataManager.changeRecordState(RecordState.RECORD)
          self.onceClick = true;
          console.log("分享完成了");
        }, function () {
          self.onceClick = true;
          console.log("分享失败了");
        });
      });
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXE92ZXJQb3B1cC5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIndpblRpdGxlIiwiTm9kZSIsIndpblNwcml0ZSIsImxvc2VUaXRsZSIsIm5hbWVVSSIsIkxhYmVsIiwicmFua1VJIiwia2lsbFVJIiwiYWxsUmV3YXJkVUkiLCJyYW5rUmV3YXJkVUkiLCJraWxsUmV3YXJkVUkiLCJyZXdhcmRCdG5Ob2RlIiwiQnV0dG9uIiwiaG9tZUJ0bk5vZGUiLCJvbmNlQ2xpY2siLCJ2aXNpYmxlIiwiY2xpY2tlZFNoYXJlIiwib25Mb2FkIiwibm9kZSIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJhY3RpdmUiLCJUb29scyIsInNjYWxlVXBBbmREb3dtIiwiaW5pdCIsIl9pc1dpbiIsInJhbmsiLCJHYW1lQXBwIiwiZGF0YU1hbmFnZXIiLCJ1c2VyRGF0YSIsIndpbk51bSIsImFkZEFjdGl2aXR5TnVtIiwiYWxEaWVOdW0iLCJ0b3A1TnVtIiwic3RyaW5nIiwicGxheWVyTmFtZSIsImtpbGxOdW0iLCJnbG9iYWxEYXRhIiwiaW5HYW1lS2lsbE51bSIsIl9raWxsTnVtIiwiYWxsS2lsbE51bSIsInJhbmtDb2luIiwia2lsbENvaW4iLCJhbGxDb2luIiwiYWxsUGxheU51bSIsIndpblJhdGUiLCJ0b0ZpeGVkIiwia2QiLCJhdmdSYW5rIiwicGFyc2VJbnQiLCJtb3N0S2lsbCIsImF2Z0xpZmVUaW1lIiwibGlmZVRpbWUiLCJhZGRDb2luIiwiaG9tZUJ0bkNsaWNrIiwiYXVkaW9NYW5hZ2VyIiwicGxheUVmZmVjdCIsInVpTWFuYWdlciIsInNob3dVSSIsInJld2FyZEJ0bkNsaWNrIiwid2luZG93Iiwid3giLCJzaG93VG9hc3QiLCJzZWxmIiwidHQiLCJhZGRWaWRlbyIsImFkZFBsYXllZFZpZGVvTnVtIiwic2hvd1BvcHVwIiwiZ2V0TnVtIiwicmFuZG9tTnVtIiwiZ2V0Q29tcG9uZW50IiwiYm94U2tpbkRhdGFHcm91cCIsImludGVyYWN0YWJsZSIsIl9pbmZvIiwicmVjb3JkQnRuQ2xpY2siLCJzaGFyZVJlY29yZCIsInJlY29yZFBhdGgiLCJjb25zb2xlIiwibG9nIiwiY2hhbmdlUmVjb3JkU3RhdGUiLCJSZWNvcmRTdGF0ZSIsIlJFQURZIiwicmVjb3JkVGltZXIiLCJzdG9wUmVjb3JkIiwicmVzIiwidmlkZW9QYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLE9BQUQsQ0FBckI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUVKLEVBQUUsQ0FBQ0ssSUFETDtBQUVSQyxJQUFBQSxTQUFTLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGTjtBQUdSRSxJQUFBQSxTQUFTLEVBQUVQLEVBQUUsQ0FBQ0ssSUFITjtBQUlSRyxJQUFBQSxNQUFNLEVBQUVSLEVBQUUsQ0FBQ1MsS0FKSDtBQUtSQyxJQUFBQSxNQUFNLEVBQUVWLEVBQUUsQ0FBQ1MsS0FMSDtBQU1SRSxJQUFBQSxNQUFNLEVBQUVYLEVBQUUsQ0FBQ1MsS0FOSDtBQU9SRyxJQUFBQSxXQUFXLEVBQUVaLEVBQUUsQ0FBQ1MsS0FQUjtBQVFSSSxJQUFBQSxZQUFZLEVBQUViLEVBQUUsQ0FBQ1MsS0FSVDtBQVNSSyxJQUFBQSxZQUFZLEVBQUVkLEVBQUUsQ0FBQ1MsS0FUVDtBQVVSTSxJQUFBQSxhQUFhLEVBQUVmLEVBQUUsQ0FBQ2dCLE1BVlY7QUFXUkMsSUFBQUEsV0FBVyxFQUFFakIsRUFBRSxDQUFDSyxJQVhSO0FBWVJhLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUEMsTUFBQUEsT0FBTyxFQUFFO0FBRkYsS0FaSDtBQWdCUkMsSUFBQUEsWUFB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QUFPLENBQUNDLFdBQVIsQ0FBb0JTLFVBQXBCLENBQStCdUMsVUFBL0IsR0FBNENRLEdBQUcsQ0FBQ0MsU0FBaEQ7QUFDSDs7QUFDRHRCLFFBQUFBLElBQUksQ0FBQ2pELFlBQUwsR0FBb0IsSUFBcEI7QUFDQWEsUUFBQUEsT0FBTyxDQUFDQyxXQUFSLENBQW9CbUQsaUJBQXBCLENBQXNDQyxXQUFXLENBQUNDLEtBQWxEO0FBQ0F6RixRQUFBQSxLQUFLLENBQUNtRixXQUFOLENBQWtCaEQsT0FBTyxDQUFDQyxXQUFSLENBQW9CUyxVQUFwQixDQUErQnVDLFVBQWpELEVBQTZELFlBQVk7QUFDckU7QUFDQWIsVUFBQUEsSUFBSSxDQUFDbkQsU0FBTCxHQUFpQixJQUFqQjtBQUNBaUUsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWjtBQUNILFNBSkQsRUFJRyxZQUFZO0FBQ1hmLFVBQUFBLElBQUksQ0FBQ25ELFNBQUwsR0FBaUIsSUFBakI7QUFDQWlFLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVo7QUFDSCxTQVBEO0FBU0gsT0FmRDtBQWlCSDtBQUNKO0FBekpJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgd2luVGl0bGU6IGNjLk5vZGUsXHJcbiAgICAgICAgd2luU3ByaXRlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxvc2VUaXRsZTogY2MuTm9kZSxcclxuICAgICAgICBuYW1lVUk6IGNjLkxhYmVsLFxyXG4gICAgICAgIHJhbmtVSTogY2MuTGFiZWwsXHJcbiAgICAgICAga2lsbFVJOiBjYy5MYWJlbCxcclxuICAgICAgICBhbGxSZXdhcmRVSTogY2MuTGFiZWwsXHJcbiAgICAgICAgcmFua1Jld2FyZFVJOiBjYy5MYWJlbCxcclxuICAgICAgICBraWxsUmV3YXJkVUk6IGNjLkxhYmVsLFxyXG4gICAgICAgIHJld2FyZEJ0bk5vZGU6IGNjLkJ1dHRvbixcclxuICAgICAgICBob21lQnRuTm9kZTogY2MuTm9kZSxcclxuICAgICAgICBvbmNlQ2xpY2s6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsaWNrZWRTaGFyZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIFV0aWxzLmFkZEluc2VydEFkKFwiYWRkSW5zZXJ0QWRcIilcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgzKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhvbWVCdG5Ob2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9KSkpXHJcbiAgICAgICAgVG9vbHMuc2NhbGVVcEFuZERvd20odGhpcy5yZXdhcmRCdG5Ob2RlLm5vZGUpXHJcbiAgICB9LFxyXG4gICAgaW5pdChfaXNXaW4sIHJhbmspIHtcclxuICAgICAgICBpZiAoX2lzV2luKSB7XHJcbiAgICAgICAgICAgIHJhbmsgPSAxXHJcbiAgICAgICAgICAgIHRoaXMud2luVGl0bGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLndpblNwcml0ZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEud2luTnVtKytcclxuICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5hZGRBY3Rpdml0eU51bSgyLCAxKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9zZVRpdGxlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5hbERpZU51bSsrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyYW5rIDw9IDUpIHtcclxuICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS50b3A1TnVtKytcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubmFtZVVJLnN0cmluZyA9IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEucGxheWVyTmFtZVxyXG4gICAgICAgIHRoaXMucmFua1VJLnN0cmluZyA9IHJhbmtcclxuICAgICAgICB2YXIga2lsbE51bSA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5pbkdhbWVLaWxsTnVtWzBdLl9raWxsTnVtXHJcblxyXG4gICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuYWxsS2lsbE51bSArPSBraWxsTnVtXHJcblxyXG4gICAgICAgIHRoaXMua2lsbFVJLnN0cmluZyA9IGtpbGxOdW1cclxuICAgICAgICB2YXIgcmFua0NvaW4gPSAoMzAgLSByYW5rKSAqIDUwXHJcbiAgICAgICAgdmFyIGtpbGxDb2luID0gMTAwICoga2lsbE51bVxyXG4gICAgICAgIHZhciBhbGxDb2luID0gcmFua0NvaW4gKyBraWxsQ29pblxyXG4gICAgICAgIHRoaXMuYWxsUmV3YXJkVUkuc3RyaW5nID0gYWxsQ29pblxyXG4gICAgICAgIHRoaXMucmFua1Jld2FyZFVJLnN0cmluZyA9IHJhbmtDb2luXHJcbiAgICAgICAgdGhpcy5raWxsUmV3YXJkVUkuc3RyaW5nID0ga2lsbENvaW5cclxuXHJcbiAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5hbGxQbGF5TnVtKytcclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLndpblJhdGUgPSAoR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS53aW5OdW0gLyBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmFsbFBsYXlOdW0pLnRvRml4ZWQoMilcclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmtkID0gKEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuYWxsS2lsbE51bSAvIChHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmFsRGllTnVtID09IDAgPyAxIDogR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5hbERpZU51bSkpLnRvRml4ZWQoMilcclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmF2Z1JhbmsgPSBwYXJzZUludCgoR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5hdmdSYW5rICsgcmFuaykgLyBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmFsbFBsYXlOdW0pXHJcbiAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5tb3N0S2lsbCA9IGtpbGxOdW0gPiBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLm1vc3RLaWxsID8ga2lsbE51bSA6IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEubW9zdEtpbGxcclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmF2Z0xpZmVUaW1lID0gcGFyc2VJbnQoKEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuYXZnTGlmZVRpbWUgKyBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEubGlmZVRpbWUpIC8gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5hbGxQbGF5TnVtKVxyXG4gICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuYWRkQ29pbihhbGxDb2luKVxyXG4gICAgfSxcclxuICAgIGhvbWVCdG5DbGljaygpIHtcclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdjbGljaycpXHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1VJKFwiTG9naW5VSVwiKVxyXG4gICAgfSxcclxuICAgIHJld2FyZEJ0bkNsaWNrKCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cud3gpIHtcclxuICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi5pqC5pyq5byA5pS+77yBXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMub25jZUNsaWNrKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vbmNlQ2xpY2sgPSBmYWxzZVxyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2NsaWNrJylcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgICBpZiAod2luZG93LnR0KSB7XHJcbiAgICAgICAgICAgIFV0aWxzLmFkZFZpZGVvKFwiYWRkVmlkZW9cIiwgZnVuY3Rpb24gKCkgeyAvL+eci+WujOS6hlxyXG4gICAgICAgICAgICAgICAgc2VsZi5vbmNlQ2xpY2sgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmFkZFBsYXllZFZpZGVvTnVtKClcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dQb3B1cCgnT3BlbkJveFBvcHVwJywgKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0TnVtID0gVG9vbHMucmFuZG9tTnVtKDEwMCwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmFkZENvaW4oZ2V0TnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdPcGVuQm94UG9wdXAnKS5pbml0KEdhbWVBcHAudWlNYW5hZ2VyLmJveFNraW5EYXRhR3JvdXBbMV0sIDEsIGdldE51bSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uY2VDbGljayA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJld2FyZEJ0bk5vZGUuaW50ZXJhY3RhYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoX2luZm8pIHsgLy/msqHnnIvlroxcclxuICAgICAgICAgICAgICAgIHNlbGYub25jZUNsaWNrID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgX2luZm8gPyBHYW1lQXBwLnVpTWFuYWdlci5zaG93VG9hc3QoX2luZm8pIDogR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi5pyq55yL5a6M6KeG6aKR77yBXCIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5vbmNlQ2xpY2sgPSB0cnVlXHJcbiAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuYWRkUGxheWVkVmlkZW9OdW0oKVxyXG4gICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93UG9wdXAoJ09wZW5Cb3hQb3B1cCcsIChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ2V0TnVtID0gVG9vbHMucmFuZG9tTnVtKDEwMCwgMTAwMClcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuYWRkQ29pbihnZXROdW0pXHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnT3BlbkJveFBvcHVwJykuaW5pdChHYW1lQXBwLnVpTWFuYWdlci5ib3hTa2luRGF0YUdyb3VwWzFdLCAxLCBnZXROdW0pXHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uY2VDbGljayA9IHRydWVcclxuICAgICAgICAgICAgICAgIHNlbGYucmV3YXJkQnRuTm9kZS5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9LCBmYWxzZSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVjb3JkQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm9uY2VDbGljaykgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5vbmNlQ2xpY2sgPSBmYWxzZVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2NsaWNrJylcclxuICAgICAgICBpZiAodGhpcy5jbGlja2VkU2hhcmUpIHtcclxuICAgICAgICAgICAgVXRpbHMuc2hhcmVSZWNvcmQoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLnJlY29yZFBhdGgsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVBcHAuZGF0YU1hbmFnZXIuY2hhbmdlUmVjb3JkU3RhdGUoUmVjb3JkU3RhdGUuUkVDT1JEKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5vbmNlQ2xpY2sgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+WujOaIkOS6hlwiKVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uY2VDbGljayA9IHRydWVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr5aSx6LSl5LqGXCIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuY2hhbmdlUmVjb3JkU3RhdGUoUmVjb3JkU3RhdGUuUkVBRFkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5yZWNvcmRUaW1lciA8IDMpIHtcclxuICAgICAgICAgICAgc2VsZi5vbmNlQ2xpY2sgPSB0cnVlXHJcbiAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdChcIuW9leWxj+aXtumXtOWwj+S6jjPnp5IhXCIpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6K+36L+H5LiA5Lya5YS/5YaN5YiG5LqrXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIue7k+adn+S6hlwiKVxyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgVXRpbHMuc3RvcFJlY29yZChmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEucmVjb3JkUGF0aCA9IHJlcy52aWRlb1BhdGhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuY2xpY2tlZFNoYXJlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5jaGFuZ2VSZWNvcmRTdGF0ZShSZWNvcmRTdGF0ZS5SRUFEWSlcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNoYXJlUmVjb3JkKEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5yZWNvcmRQYXRoLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2FtZUFwcC5kYXRhTWFuYWdlci5jaGFuZ2VSZWNvcmRTdGF0ZShSZWNvcmRTdGF0ZS5SRUNPUkQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbmNlQ2xpY2sgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliIbkuqvlrozmiJDkuoZcIilcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uY2VDbGljayA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+Wksei0peS6hlwiKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=