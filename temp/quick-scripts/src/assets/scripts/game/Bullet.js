"use strict";
cc._RF.push(module, '72ba1bMe1VOy63ITcS26/28', 'Bullet');
// scripts/game/Bullet.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    _belongTag: -1,
    //区分子弹是哪个角色打出来的
    _belongName: "",
    //射出子弹角色名，用于展示击杀信息
    gunData: {
      "default": {}
    },
    _pbc: cc.PhysicsBoxCollider,
    _doFly: false,
    _flyDir: {
      "default": cc.v2(0, 0)
    },
    _flySpeed: 0,
    _maxRange: 500,
    _curRange: 0,
    _power: 0,
    _isCrit: false,
    _onceExec: true,
    bulletAtlas: cc.SpriteAtlas
  },
  onLoad: function onLoad() {
    this._pbc = this.node.getComponent(cc.PhysicsBoxCollider); // setTimeout(function () {
    //     this.node && this.node.destroy()
    // }.bind(this), 4000)
  },
  init: function init(_data, _power, _isCrit, _isDef) {
    this.gunData = _data;
    this._power = _power;
    this._isCrit = _isCrit;
    var cloneId = this.gunData.weaponid;

    if (cloneId > 1100) {
      cloneId -= 100;
    }

    this.getComponent(cc.Sprite).spriteFrame = this.bulletAtlas.getSpriteFrame(cloneId + 1000);
    this._flySpeed = this.gunData.speed;
    this._maxRange = this.gunData.range;
    this._pbc.size = new cc.size(60, 30);
    this._pbc.enabled = true;
    this._doFly = true;
  },
  update: function update(dt) {
    if (this._doFly) {
      this.node.x += this._flyDir.x * this._flySpeed * dt;
      this.node.y += this._flyDir.y * this._flySpeed * dt;
      this._curRange += this._flyDir.mag() * dt * 1000; // console.log(this._curRange)

      if (this._curRange > this._maxRange) {
        if (this.gunData.weaponid == 1005 || this.gunData.weaponid == 1105) {
          this._pbc.size = new cc.size(120, 120);

          this._pbc.apply();
        }

        this._doFly = false;
      }
    } else {
      this.doAnim();
    }
  },
  doAnim: function doAnim() {
    var _this = this;

    if (!this._onceExec) return;
    this._onceExec = false;
    this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
      _this._pbc.enabled = false;
    })));
    var bsp = this.getComponent(cc.Sprite);
    var spIndex = 1;
    this.node.runAction(cc.sequence(cc.callFunc(function () {
      var cloneId = _this.gunData.weaponid;

      if (cloneId > 1100) {
        cloneId -= 100;
      }

      var tempSp = _this.bulletAtlas.getSpriteFrame(cloneId + 1000 + '_' + spIndex);

      if (tempSp != null) {
        bsp.spriteFrame = tempSp;
        ++spIndex;
      } else {
        _this.node.destroy();
      }
    }), cc.delayTime(0.1)).repeatForever());
  },
  onBeginContact: function onBeginContact(contact, self, other) {
    if (other.tag == this._belongTag) return;

    if (other.tag == Tags.collider || other.tag == Tags.player || other.tag >= Tags.enemy) {
      // console.log("子弹撞到了实体")
      if (this.gunData.weaponid == 1005 || this.gunData.weaponid === 1105) {
        this._pbc.size = new cc.size(120, 120);

        this._pbc.apply();
      }

      this._doFly = false;
    }
  }
});

cc._RF.pop();