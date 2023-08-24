
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/RankUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d7790HceZM3JqLL+gUKux9', 'RankUI');
// scripts/ui/RankUI.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    allPlayNumUI: cc.Label,
    winNumUI: cc.Label,
    top5NumUI: cc.Label,
    winRateUI: cc.Label,
    kdUI: cc.Label,
    avgRankUI: cc.Label,
    mostKillUI: cc.Label,
    avgLifeTimeUI: cc.Label
  },
  onLoad: function onLoad() {
    this.allPlayNumUI.string = GameApp.dataManager.userData.allPlayNum;
    this.winNumUI.string = GameApp.dataManager.userData.winNum;
    this.top5NumUI.string = GameApp.dataManager.userData.top5Num;
    this.winRateUI.string = GameApp.dataManager.userData.winRate * 100 + "%";
    this.kdUI.string = GameApp.dataManager.userData.kd;
    this.avgRankUI.string = GameApp.dataManager.userData.avgRank;
    this.mostKillUI.string = GameApp.dataManager.userData.mostKill;
    this.avgLifeTimeUI.string = Tools.toTimeString(GameApp.dataManager.userData.avgLifeTime);
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXFJhbmtVSS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImFsbFBsYXlOdW1VSSIsIkxhYmVsIiwid2luTnVtVUkiLCJ0b3A1TnVtVUkiLCJ3aW5SYXRlVUkiLCJrZFVJIiwiYXZnUmFua1VJIiwibW9zdEtpbGxVSSIsImF2Z0xpZmVUaW1lVUkiLCJvbkxvYWQiLCJzdHJpbmciLCJHYW1lQXBwIiwiZGF0YU1hbmFnZXIiLCJ1c2VyRGF0YSIsImFsbFBsYXlOdW0iLCJ3aW5OdW0iLCJ0b3A1TnVtIiwid2luUmF0ZSIsImtkIiwiYXZnUmFuayIsIm1vc3RLaWxsIiwiVG9vbHMiLCJ0b1RpbWVTdHJpbmciLCJhdmdMaWZlVGltZSIsImJhY2tCdG5DbGljayIsImF1ZGlvTWFuYWdlciIsInBsYXlFZmZlY3QiLCJ1aU1hbmFnZXIiLCJzaG93VUkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUVKLEVBQUUsQ0FBQ0ssS0FEVDtBQUVSQyxJQUFBQSxRQUFRLEVBQUVOLEVBQUUsQ0FBQ0ssS0FGTDtBQUdSRSxJQUFBQSxTQUFTLEVBQUVQLEVBQUUsQ0FBQ0ssS0FITjtBQUlSRyxJQUFBQSxTQUFTLEVBQUVSLEVBQUUsQ0FBQ0ssS0FKTjtBQUtSSSxJQUFBQSxJQUFJLEVBQUVULEVBQUUsQ0FBQ0ssS0FMRDtBQU1SSyxJQUFBQSxTQUFTLEVBQUVWLEVBQUUsQ0FBQ0ssS0FOTjtBQU9STSxJQUFBQSxVQUFVLEVBQUVYLEVBQUUsQ0FBQ0ssS0FQUDtBQVFSTyxJQUFBQSxhQUFhLEVBQUVaLEVBQUUsQ0FBQ0s7QUFSVixHQUhQO0FBZUxRLEVBQUFBLE1BZkssb0JBZUk7QUFDTCxTQUFLVCxZQUFMLENBQWtCVSxNQUFsQixHQUEyQkMsT0FBTyxDQUFDQyxXQUFSLENBQW9CQyxRQUFwQixDQUE2QkMsVUFBeEQ7QUFDQSxTQUFLWixRQUFMLENBQWNRLE1BQWQsR0FBdUJDLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQkMsUUFBcEIsQ0FBNkJFLE1BQXBEO0FBQ0EsU0FBS1osU0FBTCxDQUFlTyxNQUFmLEdBQXdCQyxPQUFPLENBQUNDLFdBQVIsQ0FBb0JDLFFBQXBCLENBQTZCRyxPQUFyRDtBQUNBLFNBQUtaLFNBQUwsQ0FBZU0sTUFBZixHQUF3QkMsT0FBTyxDQUFDQyxXQUFSLENBQW9CQyxRQUFwQixDQUE2QkksT0FBN0IsR0FBdUMsR0FBdkMsR0FBNkMsR0FBckU7QUFDQSxTQUFLWixJQUFMLENBQVVLLE1BQVYsR0FBbUJDLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQkMsUUFBcEIsQ0FBNkJLLEVBQWhEO0FBQ0EsU0FBS1osU0FBTCxDQUFlSSxNQUFmLEdBQXdCQyxPQUFPLENBQUNDLFdBQVIsQ0FBb0JDLFFBQXBCLENBQTZCTSxPQUFyRDtBQUNBLFNBQUtaLFVBQUwsQ0FBZ0JHLE1BQWhCLEdBQXlCQyxPQUFPLENBQUNDLFdBQVIsQ0FBb0JDLFFBQXBCLENBQTZCTyxRQUF0RDtBQUNBLFNBQUtaLGFBQUwsQ0FBbUJFLE1BQW5CLEdBQTRCVyxLQUFLLENBQUNDLFlBQU4sQ0FBbUJYLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQkMsUUFBcEIsQ0FBNkJVLFdBQWhELENBQTVCO0FBQ0gsR0F4Qkk7QUF5QkxDLEVBQUFBLFlBekJLLDBCQXlCVTtBQUNYYixJQUFBQSxPQUFPLENBQUNjLFlBQVIsQ0FBcUJDLFVBQXJCLENBQWdDLE9BQWhDO0FBQ0FmLElBQUFBLE9BQU8sQ0FBQ2dCLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCLFNBQXpCO0FBQ0g7QUE1QkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYWxsUGxheU51bVVJOiBjYy5MYWJlbCxcclxuICAgICAgICB3aW5OdW1VSTogY2MuTGFiZWwsXHJcbiAgICAgICAgdG9wNU51bVVJOiBjYy5MYWJlbCxcclxuICAgICAgICB3aW5SYXRlVUk6IGNjLkxhYmVsLFxyXG4gICAgICAgIGtkVUk6IGNjLkxhYmVsLFxyXG4gICAgICAgIGF2Z1JhbmtVSTogY2MuTGFiZWwsXHJcbiAgICAgICAgbW9zdEtpbGxVSTogY2MuTGFiZWwsXHJcbiAgICAgICAgYXZnTGlmZVRpbWVVSTogY2MuTGFiZWxcclxuICAgIH0sXHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmFsbFBsYXlOdW1VSS5zdHJpbmcgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmFsbFBsYXlOdW1cclxuICAgICAgICB0aGlzLndpbk51bVVJLnN0cmluZyA9IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEud2luTnVtXHJcbiAgICAgICAgdGhpcy50b3A1TnVtVUkuc3RyaW5nID0gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS50b3A1TnVtXHJcbiAgICAgICAgdGhpcy53aW5SYXRlVUkuc3RyaW5nID0gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS53aW5SYXRlICogMTAwICsgXCIlXCJcclxuICAgICAgICB0aGlzLmtkVUkuc3RyaW5nID0gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5rZFxyXG4gICAgICAgIHRoaXMuYXZnUmFua1VJLnN0cmluZyA9IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuYXZnUmFua1xyXG4gICAgICAgIHRoaXMubW9zdEtpbGxVSS5zdHJpbmcgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLm1vc3RLaWxsXHJcbiAgICAgICAgdGhpcy5hdmdMaWZlVGltZVVJLnN0cmluZyA9IFRvb2xzLnRvVGltZVN0cmluZyhHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmF2Z0xpZmVUaW1lKVxyXG4gICAgfSxcclxuICAgIGJhY2tCdG5DbGljaygpIHtcclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdjbGljaycpXHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1VJKCdMb2dpblVJJylcclxuICAgIH0sXHJcblxyXG59KTtcclxuIl19