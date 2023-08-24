"use strict";
cc._RF.push(module, '31f24zVlipJbrVcAJ0zIaIp', 'PlaneUI');
// scripts/ui/PlaneUI.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    planeNode: cc.Node,
    mapNode: cc.Node,
    _chooseType: 0,
    //0是左对角,1是右对角
    _speedUp: false
  },
  onLoad: function onLoad() {},
  init: function init(_speedUp) {
    this._speedUp = _speedUp;
    var angleArr = [-135, 135, 45, -45];
    var posIndex = Tools.randomNum(0, 3);
    this._chooseType = posIndex % 2;
    this.planeNode.setPosition(this.node.children[0].convertToNodeSpaceAR(this.mapNode.children[posIndex].convertToWorldSpaceAR(cc.v2(0, 0))));
    this.planeNode.angle = angleArr[posIndex];

    switch (posIndex) {
      case 0:
        this.planeNode.runAction(cc.moveTo(5, this.mapNode.children[2].position));
        break;

      case 1:
        this.planeNode.runAction(cc.moveTo(5, this.mapNode.children[3].position));
        break;

      case 2:
        this.planeNode.runAction(cc.moveTo(5, this.mapNode.children[0].position));
        break;

      case 3:
        this.planeNode.runAction(cc.moveTo(5, this.mapNode.children[1].position));
        break;
    }

    GameApp.audioManager.playEffect('plane', 1, 2);
  },
  // update (dt) {},
  jumpBtnClick: function jumpBtnClick() {
    var _this = this;

    GameApp.audioManager.playEffect('click');
    this.planeNode.stopAllActions();
    GameApp.uiManager.showUI('GameUI', function (node) {
      var allL = 0;
      var curL = 0; // var tempChooseType = this._chooseType % 2

      if (_this._chooseType == 0) {
        allL = cc.v2(_this.mapNode.children[0].position).sub(_this.mapNode.children[2].position).mag();
        curL = cc.v2(_this.planeNode.position).sub(_this.mapNode.children[0].position).mag();
      } else {
        allL = cc.v2(_this.mapNode.children[1].position).sub(_this.mapNode.children[3].position).mag();
        curL = cc.v2(_this.planeNode.position).sub(_this.mapNode.children[3].position).mag();
      }

      var bili = curL / allL;
      node.getComponent("GameUI").init(_this._chooseType, bili, _this._speedUp);
    });
  }
});

cc._RF.pop();