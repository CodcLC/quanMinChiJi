"use strict";
cc._RF.push(module, 'd852dPR0w5Ho5tjM6fqnxy9', 'GameApp');
// scripts/GameApp.js

"use strict";

var AudioManager = require('AudioManager');

var UIManager = require('UIManager');

var DataManager = require('DataManager');

var EventManager = require('EventManager');

var GameApp = cc.Class({
  properties: {
    eventManager: EventManager,
    dataManager: DataManager,
    audioManager: AudioManager,
    // httpManager: HttpManager,
    // socketManager: SocketManager,
    uiManager: UIManager
  },
  ctor: function ctor() {
    this.eventManager = new EventManager();
    this.dataManager = new DataManager();
    this.audioManager = new AudioManager(); // this.httpManager = new HttpManager();
    // this.socketManager = new SocketManager();

    this.uiManager = null; // this.protocol = require("Protocol");
  },
  Start: function Start() {// this.protocol.Initialize();
    // cc.debug.setDisplayStats(false);   // 关闭Creator调试的时候左下角的fps面板
    // var manager = cc.director.getCollisionManager();  // 获取碰撞检测类
    // manager.enabled = true   //开启碰撞检测
    // manager.enabledDebugDraw = true //显示碰撞检测区域
  }
});

if (!CC_EDITOR) {
  console.log('初始化GameApp');
  window.GameApp = new GameApp();
  window.GameApp.Start();
}

cc._RF.pop();