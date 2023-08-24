"use strict";
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