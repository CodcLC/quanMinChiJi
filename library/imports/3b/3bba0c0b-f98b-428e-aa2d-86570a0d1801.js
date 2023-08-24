"use strict";
cc._RF.push(module, '3bba0wL+YtCjqothlcKDRgB', 'LaunchScript');
// scripts/Launch/LaunchScript.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Player: {
      "default": null,
      type: sp.Skeleton,
      displayName: '玩家动画'
    }
  },
  start: function start() {
    this.loadSkeletonDataResources();
  },
  loadSkeletonDataResources: function loadSkeletonDataResources() {// cc.loader.loadResDir("spine", sp.SkeletonData, function (err, assets) {
    //     if (!err) {
    //         cc.SkeletonData = assets;
    //         //console.log('加载动画文件成功:', cc.SkeletonData);
    //         let data = this.getSkeletonDataByName('player');
    //         console.log('玩家动画:', data);
    //         //this.Player.skeletonData = this.PlayerSkeletonData;
    //         this.Player.skeletonData = data;
    //         this.Player.setSkin("cook");
    //         this.Player.setAnimation(0, "await", true);
    //     }
    // }.bind(this));
  },
  getSkeletonDataByName: function getSkeletonDataByName(data) {
    for (var i = 0; i < cc.SkeletonData.length; i++) {
      var skeletonData = cc.SkeletonData[i];
      var name = skeletonData.name;

      if (name === data) {
        return skeletonData;
      }
    }
  }
});

cc._RF.pop();