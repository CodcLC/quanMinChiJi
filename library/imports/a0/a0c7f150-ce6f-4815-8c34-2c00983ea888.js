"use strict";
cc._RF.push(module, 'a0c7fFQzm9IFYw0LACYPqiI', 'ToastUI');
// scripts/ui/ToastUI.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    labTxt: cc.RichText,
    _callback: null,
    //连续击杀的tip
    playerName: cc.RichText,
    killNum: cc.Label,
    killTipNode: cc.Node
  },
  start: function start() {
    this.node.setScale(0, 0);
  },
  show: function show(msg, callback, num) {
    this._callback = callback;
    this.node.stopAllActions();

    if (num) {
      this.playerName.string = msg;
      this.killNum.string = num;
      this.killTipNode.active = true;
    } else {
      this.labTxt.string = msg;
    }

    this.node.runAction(cc.sequence(cc.scaleTo(0.3, 1).easing(cc.easeBounceOut(2)), cc.delayTime(1), cc.callFunc(function () {
      this.dis();
    }.bind(this))));
  },
  dis: function dis() {
    this.node.runAction(cc.sequence(cc.spawn(cc.fadeOut(1), cc.moveBy(1, cc.v2(0, this.node.height))), cc.callFunc(function () {
      this.disIme();
    }.bind(this))));
  },
  //立即消失
  disIme: function disIme() {
    this.node.active = false;
    this.node.removeFromParent();
    this._callback && this._callback();
  }
});

cc._RF.pop();