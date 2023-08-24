
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/Enemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'db4d1xBOmVGm7LWfdofEM+7', 'Enemy');
// scripts/game/Enemy.js

"use strict";

var _JoystickCommon = require("JoystickCommon");

cc.Class({
  "extends": cc.Component,
  properties: {
    // from joystick
    moveDir: {
      "default": cc.v2(0, 0),
      displayName: 'Move Dir',
      tooltip: '移动方向'
    },
    _speedType: {
      "default": _JoystickCommon.SpeedType.STOP,
      displayName: 'Speed Type',
      type: _JoystickCommon.SpeedType,
      tooltip: '速度级别'
    },
    // from self
    _moveSpeed: {
      "default": 0,
      displayName: 'Move Speed',
      tooltip: '移动速度'
    },
    stopSpeed: {
      "default": 0,
      type: cc.Integer,
      tooltip: '停止时速度'
    },
    normalSpeed: {
      "default": 200,
      type: cc.Integer,
      tooltip: '正常速度'
    },
    fastSpeed: {
      "default": 200,
      type: cc.Integer,
      tooltip: '最快速度'
    },
    roleAnim: {
      "default": null,
      type: sp.Skeleton,
      tooltip: '角色的Spine动画组件'
    },
    _gunDir: {
      "default": cc.v2(1, 0)
    },
    gunAnim: {
      "default": null,
      type: sp.Skeleton,
      tooltip: '枪的Spine动画组件'
    },
    gunNode: {
      "default": null,
      type: cc.Node,
      tooltip: '枪节点'
    },
    _haveGun: false,
    _mapNoGun: false,
    _mapNoBox: true,
    thisName: "",
    gunData: {
      "default": {}
    },
    skinData: {
      "default": {}
    },
    _pbc: cc.PhysicsBoxCollider,
    nameUI: cc.Label,
    bulletPrefab: cc.Prefab,
    _choosedSkinId: 0,
    hpBar: cc.ProgressBar,
    amoBar: cc.ProgressBar,
    starNode: cc.Node,
    _maxHp: 100,
    _curHp: 100,
    _shootInterval: 0,
    _reloadInterval: 0,
    _maxAmoNum: 20,
    _curAmoNum: 20,
    _curDamage: 0,
    _curCrit: 0,
    _curSpeed: 200,
    _curCd: 0,
    _curDef: 0,
    _curRecovery: 0,
    getItemAttrArr: [],
    //伤害，防御，移速，暴击
    equipItemAttr: [],
    //(装备带来的属性)伤害，防御，移速，暴击
    _shootFlag: false,
    _shootTimer: 0.3,
    _reloadFlag: false,
    _reloadTimer: 0,
    lastHitBullet: null,
    _desTime: 0,
    //巡逻的变向频率
    _desTime2: 0,
    // 追踪或逃跑的变向频率
    _isAim: false,
    //瞄准状态，此状态下枪不可自主转向，避免鬼畜
    _aimDir: null,
    _aimTimer: 0,
    _aimInterval: 0.1,
    _isDie: false,
    _move: false,
    _isProtect: false,
    _isBlock: false,
    _isGas: false,
    _inGasTimer: 0,
    _inGasInterval: 0.5
  },
  onLoad: function onLoad() {
    this.getItemAttrArr = [{
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

    this.equipItemAttr = [0, 0, 0, 0]; //(装备带来的属性)伤害，防御，移速，暴击

    GameApp.eventManager.on(EventNames.EVENT_THEGAMESTART, this.theGameStart.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_NOTIFY_ENEMY_MAPBOX, this.notifyMapBox.bind(this)); // this._pbc = this.getComponent(cc.PhysicsBoxCollider)
    // this._pbc.tag = Tags.role

    this._pbc = this.getComponent(cc.PhysicsBoxCollider); // this._desTime = Tools.randomNum(1, 3)
  },
  onEnable: function onEnable() {},
  onDisable: function onDisable() {},
  onDestroy: function onDestroy() {
    GameApp.eventManager.removeListener(EventNames.EVENT_THEGAMESTART);
    GameApp.eventManager.removeListener(EventNames.EVENT_NOTIFY_ENEMY_MAPBOX);
  },
  init: function init(_index, _names) {
    // this.schedule(() => {
    //     console.log(GameApp.dataManager.userData.choosedSkinId)
    //     GameApp.dataManager.setSkinId(GameApp.dataManager.userData.choosedSkinId += 1)
    // }, 2);
    if (GameApp.dataManager.globalData.isInGame) {
      this.roleProtect();
    }

    this._choosedSkinId = _index;
    this.skinData = GameApp.dataManager.jsonData.SkinsData[_index - 1];
    this.addSkinAttr();
    this.initNameShow(_names);
    this.initSkinShow();
    this.setSpeedType(_JoystickCommon.SpeedType.FAST); // console.log(this._pbc.tag)
  },
  addSkinAttr: function addSkinAttr() {
    var curSkinData = this.skinData;
    this._maxHp = this._curHp = GameApp.dataManager.userData.baseHp + Math.floor(GameApp.dataManager.userData.baseHp * (curSkinData.att_hpmax / 100));
    this._curDamage = GameApp.dataManager.userData.baseDamage + curSkinData.att_damage / 100;
    this._curCrit = GameApp.dataManager.userData.baseCrit + curSkinData.att_crit / 10;
    this._curSpeed = GameApp.dataManager.userData.baseSpeed + Math.floor(GameApp.dataManager.userData.baseSpeed * (curSkinData.att_speed / 100));
    this._curCd = GameApp.dataManager.userData.baseCd + curSkinData.att_cd / 100;
    this._curDef = GameApp.dataManager.userData.baseDef + curSkinData.att_defense / 100;
    this._curRecovery = GameApp.dataManager.userData.baseRecovery + curSkinData.att_recovery / 100;
  },
  roleProtect: function roleProtect() {
    this._isProtect = true;
    this.node.opacity = 0;
  },
  theGameStart: function theGameStart() {
    this.node.opacity = 255;
    this._isProtect = false;
  },
  notifyMapBox: function notifyMapBox() {
    this._mapNoBox = false;
  },
  enemyEquipBoxItem: function enemyEquipBoxItem() {
    var arr = [0, 1, 2, 3];
    var _selectIndex = 0;

    while (this.getItemAttrArr[_selectIndex].rank == 3) {
      Tools.removeArray(arr, _selectIndex);

      if (arr.length == 0) {
        return;
      }

      _selectIndex = Tools.getRandomElement(arr);
    } // console.log("选择了" + _selectIndex)


    var _rank = this.getItemAttrArr[_selectIndex].rank + 1;

    this.getItemAttrArr[_selectIndex] = {
      rank: _rank,
      item: ItemAttr[_selectIndex][_rank - 1]
    };
    this.equipItemAttr[_selectIndex] = this.getItemAttrArr[_selectIndex].item.attr;
    this.updateStarShow();
  },
  updateStarShow: function updateStarShow() {
    var _sum = 0;

    for (var i = 0; i < 4; i++) {
      _sum += this.getItemAttrArr[i].rank;
    }

    if (_sum == 0) {
      this.starNode.active = false;
    } else {
      var level = parseInt((_sum - 1) / 3);
      var starNum = _sum - level * 3;
      this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = GameApp.uiManager.commonAtlas.getSpriteFrame("level_bg_" + (level + 1));
      this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = GameApp.uiManager.commonAtlas.getSpriteFrame("level_star_" + (level + 1) + "_" + starNum);
      this.starNode.active = true;
    }
  },
  initNameShow: function initNameShow(_names) {
    this.thisName = _names;
    this.nameUI.string = _names;

    if (!GameApp.dataManager.globalData.isInGame) {
      this.hpBar.node.active = false;
    } // var colorIndex = Math.floor((this.skinData.skinid - 1) / 5)
    // this.nameUI.node.color = new cc.Color().fromHEX(NameColor[colorIndex]);

  },
  initSkinShow: function initSkinShow() {
    if (this._choosedSkinId < 21) {
      this.roleAnim.skeletonData = GameApp.uiManager.normalSkinData;
      this.roleAnim.setSkin(this.skinData.skinname);
    } else {
      this.roleAnim.skeletonData = GameApp.uiManager.advanceSkinDataGroup[this._choosedSkinId - 21];
    }

    var arr = this._choosedSkinId < 21 ? ['await'] : ['await_fight_1'];
    this.roleAnim.setAnimation(0, arr[0], true);
  },
  // methods
  move: function move(dt) {
    // this.node.rotation = 90 - cc.misc.radiansToDegrees(
    //     Math.atan2(this.moveDir.y, this.moveDir.x)
    // );
    if (!this.moveDir) return;
    var theAngle = 90 - cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x));

    if (theAngle > 180 || theAngle < 0) {
      this.roleAnim.node.scaleX = -1;
    } else {
      this.roleAnim.node.scaleX = 1;
    }

    var newPos = this.node.position.add(this.moveDir.mul(this._moveSpeed * dt));
    this.node.setPosition(newPos); // this.roleAnim.node.setPosition(0, 0)
  },
  doParser: function doParser(dt) {
    this._desTime -= dt;
    this._desTime2 -= dt;

    if (this._isAim) {
      if (this._desTime2 < 0) {
        this._desTime2 = 1;

        if (this._haveGun) {
          // console.log("追踪")
          !this._isBlock && this.setDir(this._aimDir);
        } else {
          // console.log("逃跑")
          !this._isBlock && this.setDir(this._aimDir.rotate(180));
        }
      }

      return;
    }

    if (GameApp.dataManager.globalData.gasConfig != null) {
      var dir = cc.v2(GameApp.dataManager.globalData.gasConfig.safePosition).sub(cc.v2(this.node.position));
      var distance = dir.mag();

      if (GameApp.dataManager.globalData.gasConfig.gasCircle > 0 && distance > GameApp.dataManager.globalData.gasConfig.gasCircle / 2) {
        this._inGasTimer -= dt;

        if (this._inGasTimer < 0) {
          this._inGasTimer = this._inGasInterval;
          this.beDamage(5, -1);
        }

        this._isGas = true;
        !this._isBlock && this.setDir(dir.normalize());
        return;
      } else {
        this._isGas = false;
      }
    } else {
      this._isGas = false;
    }

    if (this._desTime < 0) {
      //1 1 不找  1 0 找  0 1 不找  0 0 不找
      if (!this._isGas && !this._mapNoGun && !this._haveGun) {
        this._desTime = 0.3; // console.log("找枪")

        !this._isBlock && this.searchGun();
      } else {
        if (!this._isGas && GameApp.dataManager.globalData.isInGame && !this._mapNoBox && this._haveGun) {
          this._desTime = 0.3; // console.log("找箱子")

          this.searchBox();
        } else {
          // console.log("巡逻")
          this._desTime = Tools.randomNum(1, 3);
          var desDir = cc.v2(0, 1).rotate(cc.misc.radiansToDegrees(Tools.randomNum(0, 360)));
          !this._isBlock && this.setDir(desDir);
        }
      }
    }
  },
  searchGun: function searchGun() {
    var allGunArr = GameApp.dataManager.globalData.allGunArr.concat();
    var minDis = 1000000;
    var index = -1;

    for (var i = 0; i < allGunArr.length; i++) {
      var distance = cc.v2(allGunArr[i].position).sub(cc.v2(this.node.position)).mag();

      if (distance < minDis) {
        if (GameApp.dataManager.globalData.gasConfig != null) {
          var dirDistance = cc.v2(GameApp.dataManager.globalData.gasConfig.safePosition).sub(cc.v2(allGunArr[i].position)).mag();

          if (dirDistance > GameApp.dataManager.globalData.gasConfig.gasCircle / 2) {
            continue;
          }
        }

        minDis = distance;
        index = i;
      }
    }

    var dir = null;

    if (index == -1) {
      this._mapNoGun = true;
    } else {
      var aimGun = allGunArr[index];
      dir = cc.v2(aimGun.position).sub(cc.v2(this.node.position)).normalize();
    }

    this.setDir(dir);
  },
  searchBox: function searchBox() {
    var allBoxArr = GameApp.dataManager.globalData.allBoxArr.concat();
    var minDis = 1000000;
    var index = -1;

    for (var i = 0; i < allBoxArr.length; i++) {
      var distance = cc.v2(allBoxArr[i].position).sub(cc.v2(this.node.position)).mag();

      if (distance < 10) {
        this.setDir(cc.v2(0, 0));
        return;
      }

      if (distance < minDis) {
        if (GameApp.dataManager.globalData.gasConfig != null) {
          var dirDistance = cc.v2(GameApp.dataManager.globalData.gasConfig.safePosition).sub(cc.v2(allBoxArr[i].position)).mag();

          if (dirDistance > GameApp.dataManager.globalData.gasConfig.gasCircle / 2) {
            continue;
          }
        }

        minDis = distance;
        index = i;
      }
    }

    var dir = cc.v2(0, 0);

    if (index == -1) {
      this._mapNoBox = true;
    } else {
      var aimBox = allBoxArr[index];
      dir = cc.v2(aimBox.position).sub(cc.v2(this.node.position)).normalize();
    }

    this.setDir(dir);
  },
  setSpeedType: function setSpeedType(_type) {
    if (this._isDie) return;

    if (this._speedType != _type) {
      this._speedType = _type;
      var arr = this._choosedSkinId < 21 ? ['await', 'run2', 'run2'] : ['await_fight_1', 'run', 'run'];
      this.roleAnim.setAnimation(0, arr[_type], true);
    }
  },
  setDir: function setDir(_dir) {
    if (this._isDie) return;

    if (_dir && _dir.mag() == 0) {
      this.setSpeedType(_JoystickCommon.SpeedType.STOP);
    } else {
      this.setSpeedType(_JoystickCommon.SpeedType.FAST);
    }

    this.moveDir = _dir;
    if (this._isAim) return;
    this.setGunDir(_dir);
  },
  setGunDir: function setGunDir(_dir) {
    if (_dir == null) {
      _dir = this.moveDir;
    }

    this._gunDir = _dir;
    this._aimDir = _dir;
    if (!this._haveGun) return;
    this.gunNode.rotation = -cc.misc.radiansToDegrees(Math.atan2(_dir.y, _dir.x));
    var theAngle = 90 - this.gunNode.rotation;

    if (theAngle > 180 || theAngle < 0) {
      this.gunNode.scaleY = -1;
    } else {
      this.gunNode.scaleY = 1;
    }
  },
  update: function update(dt) {
    if (this._isDie) return;
    this.doParser(dt);

    switch (this._speedType) {
      case _JoystickCommon.SpeedType.STOP:
        this._moveSpeed = this.stopSpeed;
        break;

      case _JoystickCommon.SpeedType.NORMAL:
        this._moveSpeed = this.normalSpeed; // this._moveSpeed = this.fastSpeed;

        break;

      case _JoystickCommon.SpeedType.FAST:
        this._moveSpeed = this._curSpeed + Math.floor(this._curSpeed * this.equipItemAttr[EquipType.speed]);
        break;

      default:
        break;
    }

    this.move(dt);
    if (this._isProtect) return;
    this._aimTimer -= dt;

    if (this._aimTimer < 0) {
      this._aimTimer = this._aimInterval;
      this.aimToNearest();
    }

    if (this._isAim) {
      this._shootTimer -= dt;

      if (this._shootTimer < 0 && !this._reloadFlag) {
        this._shootTimer = this._shootInterval;
        this.shoot();
      }
    }

    if (this._reloadFlag) {
      this._reloadTimer -= dt;

      if (this._reloadFlag && this._reloadTimer < 0) {
        this._reloadFlag = false;
        this.reloadAmo();
      }
    }
  },
  lateUpdate: function lateUpdate(dt) {// this.mainC.node.setPosition(this.player.position)
    // this.testC.node.setPosition(this.player.position)
    // GameApp.uiManager.mapCamera.node.setPosition(this.node.position)
    // this.mipmapCamera.node.setPosition(this.node.position)
  },
  aimToNearest: function aimToNearest() {
    // return
    if (!this._haveGun) {
      this.gunData.range = 400;
    }

    var allRoleArr = GameApp.dataManager.globalData.allRoleArr.concat(); // for (let i = 0; i < allRoleArr.length; i++) {
    //     if (allRoleArr[i].skinData.skinid == this.skinData.skinid) {
    //         allRoleArr.splice(i, 1)
    //         break
    //     }
    // }

    Tools.removeArray(allRoleArr, this.getComponent("Enemy"));
    var minDis = 1000000;
    var index = -1;

    for (var i = 0; i < allRoleArr.length; i++) {
      var distance = cc.v2(allRoleArr[i].node.position).sub(cc.v2(this.node.position)).mag();

      if (distance < minDis && distance < this.gunData.range * 1.4) {
        minDis = distance;
        index = i;
      }
    }

    var dir = null;

    if (index == -1) {
      this._isAim = false;
    } else {
      var aimEnemy = allRoleArr[index].node;
      dir = cc.v2(aimEnemy.position).sub(cc.v2(this.node.position)).normalize();
      this._isAim = true;
    }

    this.setGunDir(dir);
  },
  shoot: function shoot() {
    if (!this._haveGun) return;

    if (this.reduceAmo()) {
      this.gunAnim.setAnimation(0, 'attack_' + this.gunData.skinname, false);
      var power = Math.ceil(this.gunData.power * (this._curDamage + this.equipItemAttr[EquipType.damage]));
      var isCrit = false;

      if (Tools.isCrit(this._curCrit + this.equipItemAttr[EquipType.crit])) {
        power *= 2;
        isCrit = true;
      }

      if (this.gunData.weaponid == 1002) {
        GameApp.uiManager.isInMapSight(this.node) && GameApp.audioManager.playEffect('shot_shoot', 0.3, false);
        var bullet1 = cc.instantiate(this.bulletPrefab);
        var bullet2 = cc.instantiate(this.bulletPrefab);
        var bullet3 = cc.instantiate(this.bulletPrefab);
        var bulletPos = this.node.parent.parent.convertToNodeSpaceAR(this.gunNode.children[0].convertToWorldSpaceAR(cc.v2(0, 0)));
        bullet1.parent = bullet2.parent = bullet3.parent = this.node.parent.parent;
        bullet1.setPosition(bulletPos);
        bullet2.setPosition(bulletPos);
        bullet3.setPosition(bulletPos);
        bullet1.rotation = this.gunNode.rotation;
        bullet2.rotation = this.gunNode.rotation + 30;
        bullet3.rotation = this.gunNode.rotation - 30;
        var cloneGunDir = cc.v2(this._gunDir);
        var bulletC1 = bullet1.getComponent('Bullet');
        bulletC1._belongTag = this._pbc.tag;
        bulletC1._belongName = this.thisName;
        bulletC1._flyDir = cloneGunDir;
        bulletC1.init(this.gunData, power, isCrit);
        var bulletC2 = bullet2.getComponent('Bullet');
        bulletC2._belongTag = this._pbc.tag;
        bulletC2._belongName = this.thisName;
        bulletC2._flyDir = cloneGunDir.rotate(-cc.misc.degreesToRadians(30));
        bulletC2.init(this.gunData, power, isCrit);
        var bulletC3 = bullet3.getComponent('Bullet');
        bulletC3._belongTag = this._pbc.tag;
        bulletC3._belongName = this.thisName;
        bulletC3._flyDir = cloneGunDir.rotate(-cc.misc.degreesToRadians(-30));
        bulletC3.init(this.gunData, power, isCrit);
      } else {
        if (this.gunData.weaponid == 1003) {
          GameApp.uiManager.isInMapSight(this.node) && GameApp.audioManager.playEffect('charge_shoot', 0.3, false);
        } else if (this.gunData.weaponid == 1005) {
          GameApp.uiManager.isInMapSight(this.node) && GameApp.audioManager.playEffect('missile_shoot', 0.3, false);
        }

        var bullet = cc.instantiate(this.bulletPrefab);

        var _bulletPos = this.node.parent.parent.convertToNodeSpaceAR(this.gunNode.children[0].convertToWorldSpaceAR(cc.v2(0, 0)));

        bullet.parent = this.node.parent.parent;
        bullet.setPosition(_bulletPos);
        bullet.rotation = this.gunNode.rotation;
        var bulletC = bullet.getComponent('Bullet');
        bulletC._belongTag = this._pbc.tag;
        bulletC._belongName = this.thisName;
        bulletC._flyDir = this._gunDir;
        bulletC.init(this.gunData, power, isCrit);
      }

      this.updateAmoShow();
    } else {
      this.reload();
    }

    if (this._curAmoNum == 0) {
      this.reload();
    }
  },
  reduceAmo: function reduceAmo() {
    var a = this._curAmoNum - 1;

    if (a < 0) {
      this._curAmoNum = 0;
      this.updateAmoShow();
      return false;
    } else {
      this._curAmoNum = a;
      this.updateAmoShow();
      return true;
    }
  },
  reload: function reload() {
    if (!this._haveGun) return;
    if (this._reloadFlag) return;
    GameApp.uiManager.isInMapSight(this.node) && GameApp.audioManager.playEffect('reload', 0.6);
    this.gunAnim.setAnimation(0, 'reload_' + this.gunData.skinname, false);
    this._reloadTimer = this._reloadInterval;
    this._reloadFlag = true;
  },
  reloadAmo: function reloadAmo() {
    this._curAmoNum = this._maxAmoNum;
    this.updateAmoShow();
  },
  updateAmoShow: function updateAmoShow() {
    this.amoBar.progress = this._curAmoNum / this._maxAmoNum;
  },
  updateHpShow: function updateHpShow() {
    this.hpBar.progress = this._curHp / this._maxHp;
  },
  equipWeapon: function equipWeapon(_kind) {
    GameApp.uiManager.isInMapSight(this.node) && GameApp.audioManager.playEffect('pick_item', 0.6);
    this.gunData = GameApp.dataManager.jsonData.WeaponData[_kind];
    this._shootInterval = this.gunData.shootdelay;
    this._reloadInterval = this.gunData.reloaddelay;
    this._maxAmoNum = this.gunData.clipnum;
    this.reloadAmo();
    this.gunNode.active = true;

    if (_kind < 3) {
      this.gunAnim.skeletonData = GameApp.uiManager.gunSkinDataGroup[0];
    } else {
      this.gunAnim.skeletonData = GameApp.uiManager.gunSkinDataGroup[1];
    }

    this.gunAnim.setSkin(this.gunData.skinname);
    this._haveGun = true;
    this.setGunDir(this.moveDir); // this.gunAnim.setAnimation(0, 'attack_' + this.gunData.skinname, false)
  },
  getItem: function getItem() {},
  onBeginContact: function onBeginContact(contact, self, other) {
    var _this = this;

    if (this._isDie) return;
    if (self.tag == Tags.empty) return;

    if (other.tag == Tags.item) {
      var groundItem = other.node.getComponent('GroundItem');

      if (groundItem.itemType._type == ItemType.weapon) {
        var _kind = groundItem.itemType._kind;

        if (!this._haveGun) {
          Tools.removeArray(GameApp.dataManager.globalData.allGunArr, other.node);
          this.equipWeapon(_kind);
          other.node.destroy();
        } else {} // let _param = {
        //     _type: ItemType.weapon,
        //     _kind: GameApp.dataManager.jsonData.WeaponData.indexOf(this.gunData)
        // }
        // groundItem.init(_param)
        // this.equipWeapon(_kind)

      } else if (groundItem.itemType._type == ItemType.item) {
        this.getItem();
      }
    } else if (other.tag == Tags.bullet) {
      if (!GameApp.dataManager.globalData.isInGame) return;
      var bC = other.node.getComponent('Bullet');
      if (bC._belongTag == self.tag) return;
      if (other.node == this.lastHitBullet) return;
      this.lastHitBullet = other.node;
      this.beDamage(bC._power, bC._belongTag, bC._belongName, bC._isCrit, bC.gunData.weaponid);
    } else if (other.tag == Tags.collider) {
      this._isBlock = true;
      this.moveDir && this.moveDir.rotateSelf(cc.misc.degreesToRadians(Tools.randomNum(90, 180)));
      this.scheduleOnce(function () {
        _this._isBlock = false;
      }, 0.5);
    } else if (other.tag == Tags.boom) {
      this.beDamage(999, -2);
    }
  },
  reduceHp: function reduceHp(_num) {
    var a = this._curHp - _num;

    if (a <= 0) {
      this._curHp = 0;
      this.updateHpShow();
      return false;
    } else {
      this._curHp = a;
      this.updateHpShow();
      return true;
    }
  },
  beDamage: function beDamage(_power, _belongIndex, _belongName, _isCrit, _weaponid) {
    var _this2 = this;

    GameApp.uiManager.isInMapSight(this.node) && GameApp.uiManager.showGameObject("InfoLabel", function (node) {
      var originPos = node.parent.convertToNodeSpaceAR(_this2.node.convertToWorldSpaceAR(cc.v2(0.5, 0.5)));
      node.setPosition(originPos);

      var _isDef = Math.ceil(_power * _this2._curDef) + Math.ceil(_power * _this2.equipItemAttr[EquipType.def]);

      _power -= _isDef;
      var str = "<color=red>-" + _power + "</color>";

      if (_isCrit) {
        str = "<color=red>暴击-" + _power + "</color>";
      }

      if (_isDef) {
        str += "<color=#0fffff>减伤" + _isDef + "</color>";
      }

      node.getComponent(cc.RichText).string = "<b>" + str + "</b>";
      var desPos = cc.v2(Tools.randomNum(60, 100), Tools.randomNum(60, 100));
      var bezier = [originPos, cc.v2(originPos.x + desPos.x - 20, originPos.y + desPos.y + 20), originPos.add(desPos)];
      var seq = cc.sequence(cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0.3, 1.5), cc.bezierTo(0.3, bezier)), cc.delayTime(0.5), cc.fadeOut(0.3), cc.callFunc(function () {
        node.destroy();
      }));
      node.runAction(seq);
    }, this.node.parent.parent); // console.log(GameApp.dataManager.globalData.allRoleArr)

    if (this.reduceHp(_power)) {} else {
      GameApp.uiManager.isInMapSight(this.node) && GameApp.audioManager.playEffect('maleDeath', 0.5);
      this.node.parent = GameApp.uiManager.getGame("GameMap").getChildByName("DeadObjectNode");
      this._pbc.enabled = false;
      this._isDie = true;

      if (_belongIndex == -1) {
        GameApp.uiManager.showToast(this.thisName + " 被毒出局");
      } else if (_belongIndex == -2) {
        GameApp.uiManager.showToast(this.thisName + " 被轰炸出局");
      } else {
        var killNum = GameApp.dataManager.addKillNum(_belongIndex, _belongName);

        if (_belongName == GameApp.dataManager.userData.playerName) {
          _belongName = "<color=#0fffff>" + _belongName + "</color>";
        }

        if (killNum > 1) {
          var soundIndex = killNum > 5 ? 5 : killNum;
          GameApp.audioManager.playEffect('kill' + soundIndex, 0.5);
          GameApp.uiManager.showToast(_belongName, null, killNum);
        } else {
          GameApp.uiManager.showToast(_belongName + " 击杀了 " + this.thisName);
        } //任务相关


        if (_belongIndex == 1) {
          cc.log("玩家杀人了");
          GameApp.dataManager.addActivityNum(1, 1);

          if (_weaponid == 1102) {
            GameApp.dataManager.addActivityNum(0, 1);
          }
        }
      }

      if (this._haveGun) {
        var theParentC = GameApp.uiManager.gameRoot.children[0].getComponent("GameMap");
        GameApp.uiManager.showGameObject("GroundItem", function (node) {
          var ddd = theParentC.allGunNode.convertToNodeSpaceAR(_this2.node.convertToWorldSpaceAR(cc.v2(0, 0)));
          node.parent = theParentC.allGunNode;
          node.setPosition(ddd);
          var _param = {
            _type: ItemType.weapon,
            _kind: Tools.getIndex(GameApp.dataManager.jsonData.WeaponData, _this2.gunData)
          }; // console.log(_param._kind)

          node.getComponent('GroundItem').init(_param);
          GameApp.dataManager.globalData.allGunArr.push(node);
        });
      }

      this.node.stopActionByTag(1); // for (var i in GameApp.dataManager.globalData.allRoleArr) {
      //     if (GameApp.dataManager.globalData.allRoleArr[i].skinData.skinid == this.skinData.skinid) {
      //         GameApp.dataManager.globalData.allRoleArr.splice(i, 1)
      //         break;
      //     }
      // }

      var arr = this._choosedSkinId < 21 ? ['dead'] : ['dead2'];
      this.roleAnim.setAnimation(0, arr[0], false);
      this.gunNode.active = false;
      Tools.removeArray(GameApp.dataManager.globalData.allRoleArr, this.node.getComponent('Enemy'));
      GameApp.eventManager.emit(EventNames.EVENT_SHOW_ALLROLENUM_UI);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRW5lbXkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtb3ZlRGlyIiwidjIiLCJkaXNwbGF5TmFtZSIsInRvb2x0aXAiLCJfc3BlZWRUeXBlIiwiU3BlZWRUeXBlIiwiU1RPUCIsInR5cGUiLCJfbW92ZVNwZWVkIiwic3RvcFNwZWVkIiwiSW50ZWdlciIsIm5vcm1hbFNwZWVkIiwiZmFzdFNwZWVkIiwicm9sZUFuaW0iLCJzcCIsIlNrZWxldG9uIiwiX2d1bkRpciIsImd1bkFuaW0iLCJndW5Ob2RlIiwiTm9kZSIsIl9oYXZlR3VuIiwiX21hcE5vR3VuIiwiX21hcE5vQm94IiwidGhpc05hbWUiLCJndW5EYXRhIiwic2tpbkRhdGEiLCJfcGJjIiwiUGh5c2ljc0JveENvbGxpZGVyIiwibmFtZVVJIiwiTGFiZWwiLCJidWxsZXRQcmVmYWIiLCJQcmVmYWIiLCJfY2hvb3NlZFNraW5JZCIsImhwQmFyIiwiUHJvZ3Jlc3NCYXIiLCJhbW9CYXIiLCJzdGFyTm9kZSIsIl9tYXhIcCIsIl9jdXJIcCIsIl9zaG9vdEludGVydmFsIiwiX3JlbG9hZEludGVydmFsIiwiX21heEFtb051bSIsIl9jdXJBbW9OdW0iLCJfY3VyRGFtYWdlIiwiX2N1ckNyaXQiLCJfY3VyU3BlZWQiLCJfY3VyQ2QiLCJfY3VyRGVmIiwiX2N1clJlY292ZXJ5IiwiZ2V0SXRlbUF0dHJBcnIiLCJlcXVpcEl0ZW1BdHRyIiwiX3Nob290RmxhZyIsIl9zaG9vdFRpbWVyIiwiX3JlbG9hZEZsYWciLCJfcmVsb2FkVGltZXIiLCJsYXN0SGl0QnVsbGV0IiwiX2Rlc1RpbWUiLCJfZGVzVGltZTIiLCJfaXNBaW0iLCJfYWltRGlyIiwiX2FpbVRpbWVyIiwiX2FpbUludGVydmFsIiwiX2lzRGllIiwiX21vdmUiLCJfaXNQcm90ZWN0IiwiX2lzQmxvY2siLCJfaXNHYXMiLCJfaW5HYXNUaW1lciIsIl9pbkdhc0ludGVydmFsIiwib25Mb2FkIiwicmFuayIsIml0ZW0iLCJHYW1lQXBwIiwiZXZlbnRNYW5hZ2VyIiwib24iLCJFdmVudE5hbWVzIiwiRVZFTlRfVEhFR0FNRVNUQVJUIiwidGhlR2FtZVN0YXJ0IiwiYmluZCIsIkVWRU5UX05PVElGWV9FTkVNWV9NQVBCT1giLCJub3RpZnlNYXBCb3giLCJnZXRDb21wb25lbnQiLCJvbkVuYWJsZSIsIm9uRGlzYWJsZSIsIm9uRGVzdHJveSIsInJlbW92ZUxpc3RlbmVyIiwiaW5pdCIsIl9pbmRleCIsIl9uYW1lcyIsImRhdGFNYW5hZ2VyIiwiZ2xvYmFsRGF0YSIsImlzSW5HYW1lIiwicm9sZVByb3RlY3QiLCJqc29uRGF0YSIsIlNraW5zRGF0YSIsImFkZFNraW5BdHRyIiwiaW5pdE5hbWVTaG93IiwiaW5pdFNraW5TaG93Iiwic2V0U3BlZWRUeXBlIiwiRkFTVCIsImN1clNraW5EYXRhIiwidXNlckRhdGEiLCJiYXNlSHAiLCJNYXRoIiwiZmxvb3IiLCJhdHRfaHBtYXgiLCJiYXNlRGFtYWdlIiwiYXR0X2RhbWFnZSIsImJhc2VDcml0IiwiYXR0X2NyaXQiLCJiYXNlU3BlZWQiLCJhdHRfc3BlZWQiLCJiYXNlQ2QiLCJhdHRfY2QiLCJiYXNlRGVmIiwiYXR0X2RlZmVuc2UiLCJiYXNlUmVjb3ZlcnkiLCJhdHRfcmVjb3ZlcnkiLCJub2RlIiwib3BhY2l0eSIsImVuZW15RXF1aXBCb3hJdGVtIiwiYXJyIiwiX3NlbGVjdEluZGV4IiwiVG9vbHMiLCJyZW1vdmVBcnJheSIsImxlbmd0aCIsImdldFJhbmRvbUVsZW1lbnQiLCJfcmFuayIsIkl0ZW1BdHRyIiwiYXR0ciIsInVwZGF0ZVN0YXJTaG93IiwiX3N1bSIsImkiLCJhY3RpdmUiLCJsZXZlbCIsInBhcnNlSW50Iiwic3Rhck51bSIsImNoaWxkcmVuIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJ1aU1hbmFnZXIiLCJjb21tb25BdGxhcyIsImdldFNwcml0ZUZyYW1lIiwic3RyaW5nIiwic2tlbGV0b25EYXRhIiwibm9ybWFsU2tpbkRhdGEiLCJzZXRTa2luIiwic2tpbm5hbWUiLCJhZHZhbmNlU2tpbkRhdGFHcm91cCIsInNldEFuaW1hdGlvbiIsIm1vdmUiLCJkdCIsInRoZUFuZ2xlIiwibWlzYyIsInJhZGlhbnNUb0RlZ3JlZXMiLCJhdGFuMiIsInkiLCJ4Iiwic2NhbGVYIiwibmV3UG9zIiwicG9zaXRpb24iLCJhZGQiLCJtdWwiLCJzZXRQb3NpdGlvbiIsImRvUGFyc2VyIiwic2V0RGlyIiwicm90YXRlIiwiZ2FzQ29uZmlnIiwiZGlyIiwic2FmZVBvc2l0aW9uIiwic3ViIiwiZGlzdGFuY2UiLCJtYWciLCJnYXNDaXJjbGUiLCJiZURhbWFnZSIsIm5vcm1hbGl6ZSIsInNlYXJjaEd1biIsInNlYXJjaEJveCIsInJhbmRvbU51bSIsImRlc0RpciIsImFsbEd1bkFyciIsImNvbmNhdCIsIm1pbkRpcyIsImluZGV4IiwiZGlyRGlzdGFuY2UiLCJhaW1HdW4iLCJhbGxCb3hBcnIiLCJhaW1Cb3giLCJfdHlwZSIsIl9kaXIiLCJzZXRHdW5EaXIiLCJyb3RhdGlvbiIsInNjYWxlWSIsInVwZGF0ZSIsIk5PUk1BTCIsIkVxdWlwVHlwZSIsInNwZWVkIiwiYWltVG9OZWFyZXN0Iiwic2hvb3QiLCJyZWxvYWRBbW8iLCJsYXRlVXBkYXRlIiwicmFuZ2UiLCJhbGxSb2xlQXJyIiwiYWltRW5lbXkiLCJyZWR1Y2VBbW8iLCJwb3dlciIsImNlaWwiLCJkYW1hZ2UiLCJpc0NyaXQiLCJjcml0Iiwid2VhcG9uaWQiLCJpc0luTWFwU2lnaHQiLCJhdWRpb01hbmFnZXIiLCJwbGF5RWZmZWN0IiwiYnVsbGV0MSIsImluc3RhbnRpYXRlIiwiYnVsbGV0MiIsImJ1bGxldDMiLCJidWxsZXRQb3MiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImNsb25lR3VuRGlyIiwiYnVsbGV0QzEiLCJfYmVsb25nVGFnIiwidGFnIiwiX2JlbG9uZ05hbWUiLCJfZmx5RGlyIiwiYnVsbGV0QzIiLCJkZWdyZWVzVG9SYWRpYW5zIiwiYnVsbGV0QzMiLCJidWxsZXQiLCJidWxsZXRDIiwidXBkYXRlQW1vU2hvdyIsInJlbG9hZCIsImEiLCJwcm9ncmVzcyIsInVwZGF0ZUhwU2hvdyIsImVxdWlwV2VhcG9uIiwiX2tpbmQiLCJXZWFwb25EYXRhIiwic2hvb3RkZWxheSIsInJlbG9hZGRlbGF5IiwiY2xpcG51bSIsImd1blNraW5EYXRhR3JvdXAiLCJnZXRJdGVtIiwib25CZWdpbkNvbnRhY3QiLCJjb250YWN0Iiwic2VsZiIsIm90aGVyIiwiVGFncyIsImVtcHR5IiwiZ3JvdW5kSXRlbSIsIml0ZW1UeXBlIiwiSXRlbVR5cGUiLCJ3ZWFwb24iLCJkZXN0cm95IiwiYkMiLCJfcG93ZXIiLCJfaXNDcml0IiwiY29sbGlkZXIiLCJyb3RhdGVTZWxmIiwic2NoZWR1bGVPbmNlIiwiYm9vbSIsInJlZHVjZUhwIiwiX251bSIsIl9iZWxvbmdJbmRleCIsIl93ZWFwb25pZCIsInNob3dHYW1lT2JqZWN0Iiwib3JpZ2luUG9zIiwiX2lzRGVmIiwiZGVmIiwic3RyIiwiUmljaFRleHQiLCJkZXNQb3MiLCJiZXppZXIiLCJzZXEiLCJzZXF1ZW5jZSIsInNwYXduIiwiZmFkZUluIiwic2NhbGVUbyIsImJlemllclRvIiwiZGVsYXlUaW1lIiwiZmFkZU91dCIsImNhbGxGdW5jIiwicnVuQWN0aW9uIiwiZ2V0R2FtZSIsImdldENoaWxkQnlOYW1lIiwiZW5hYmxlZCIsInNob3dUb2FzdCIsImtpbGxOdW0iLCJhZGRLaWxsTnVtIiwicGxheWVyTmFtZSIsInNvdW5kSW5kZXgiLCJsb2ciLCJhZGRBY3Rpdml0eU51bSIsInRoZVBhcmVudEMiLCJnYW1lUm9vdCIsImRkZCIsImFsbEd1bk5vZGUiLCJfcGFyYW0iLCJnZXRJbmRleCIsInB1c2giLCJzdG9wQWN0aW9uQnlUYWciLCJlbWl0IiwiRVZFTlRfU0hPV19BTExST0xFTlVNX1VJIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBQSxF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QyxDQUFELENBQWpDLEVBQXNDLEtBQXRDO0FBQ0EsV0FBS3ZHLE9BQUwsQ0FBYW1ILE1BQWIsR0FBc0IsS0FBdEI7QUFDQVYsTUFBQUEsS0FBSyxDQUFDQyxXQUFOLENBQWtCcEQsT0FBTyxDQUFDaUIsV0FBUixDQUFvQkMsVUFBcEIsQ0FBK0JnSCxVQUFqRCxFQUE2RCxLQUFLcEYsSUFBTCxDQUFVckMsWUFBVixDQUF1QixPQUF2QixDQUE3RDtBQUNBVCxNQUFBQSxPQUFPLENBQUNDLFlBQVIsQ0FBcUJ1TyxJQUFyQixDQUEwQnJPLFVBQVUsQ0FBQ3NPLHdCQUFyQztBQUNIO0FBQ0o7QUFsdUJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwZWVkVHlwZSB9IGZyb20gJ0pveXN0aWNrQ29tbW9uJ1xyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgICAgICAvLyBmcm9tIGpveXN0aWNrXHJcbiAgICAgICAgbW92ZURpcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjYy52MigwLCAwKSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdNb3ZlIERpcicsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfnp7vliqjmlrnlkJEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3NwZWVkVHlwZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBTcGVlZFR5cGUuU1RPUCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTcGVlZCBUeXBlJyxcclxuICAgICAgICAgICAgdHlwZTogU3BlZWRUeXBlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn6YCf5bqm57qn5YirJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIGZyb20gc2VsZlxyXG4gICAgICAgIF9tb3ZlU3BlZWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdNb3ZlIFNwZWVkJyxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+enu+WKqOmAn+W6pidcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wU3BlZWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+WBnOatouaXtumAn+W6pidcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vcm1hbFNwZWVkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDIwMCxcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+ato+W4uOmAn+W6pidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhc3RTcGVlZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAyMDAsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfmnIDlv6vpgJ/luqYnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcm9sZUFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogc3AuU2tlbGV0b24sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfop5LoibLnmoRTcGluZeWKqOeUu+e7hOS7ticsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZ3VuRGlyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLnYyKDEsIDApLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ3VuQW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBzcC5Ta2VsZXRvbixcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+aequeahFNwaW5l5Yqo55S757uE5Lu2JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGd1bk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+aequiKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfaGF2ZUd1bjogZmFsc2UsXHJcbiAgICAgICAgX21hcE5vR3VuOiBmYWxzZSxcclxuICAgICAgICBfbWFwTm9Cb3g6IHRydWUsXHJcbiAgICAgICAgdGhpc05hbWU6IFwiXCIsXHJcbiAgICAgICAgZ3VuRGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2tpbkRhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDoge31cclxuICAgICAgICB9LFxyXG4gICAgICAgIF9wYmM6IGNjLlBoeXNpY3NCb3hDb2xsaWRlcixcclxuICAgICAgICBuYW1lVUk6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiLFxyXG5cclxuICAgICAgICBfY2hvb3NlZFNraW5JZDogMCxcclxuXHJcbiAgICAgICAgaHBCYXI6IGNjLlByb2dyZXNzQmFyLFxyXG4gICAgICAgIGFtb0JhcjogY2MuUHJvZ3Jlc3NCYXIsXHJcblxyXG4gICAgICAgIHN0YXJOb2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIF9tYXhIcDogMTAwLFxyXG4gICAgICAgIF9jdXJIcDogMTAwLFxyXG4gICAgICAgIF9zaG9vdEludGVydmFsOiAwLFxyXG4gICAgICAgIF9yZWxvYWRJbnRlcnZhbDogMCxcclxuICAgICAgICBfbWF4QW1vTnVtOiAyMCxcclxuICAgICAgICBfY3VyQW1vTnVtOiAyMCxcclxuXHJcbiAgICAgICAgX2N1ckRhbWFnZTogMCxcclxuICAgICAgICBfY3VyQ3JpdDogMCxcclxuICAgICAgICBfY3VyU3BlZWQ6IDIwMCxcclxuICAgICAgICBfY3VyQ2Q6IDAsXHJcbiAgICAgICAgX2N1ckRlZjogMCxcclxuICAgICAgICBfY3VyUmVjb3Zlcnk6IDAsXHJcblxyXG4gICAgICAgIGdldEl0ZW1BdHRyQXJyOiBbXSwvL+S8pOWus++8jOmYsuW+oe+8jOenu+mAn++8jOaatOWHu1xyXG4gICAgICAgIGVxdWlwSXRlbUF0dHI6IFtdLC8vKOijheWkh+W4puadpeeahOWxnuaApynkvKTlrrPvvIzpmLLlvqHvvIznp7vpgJ/vvIzmmrTlh7tcclxuXHJcblxyXG4gICAgICAgIF9zaG9vdEZsYWc6IGZhbHNlLFxyXG4gICAgICAgIF9zaG9vdFRpbWVyOiAwLjMsXHJcbiAgICAgICAgX3JlbG9hZEZsYWc6IGZhbHNlLFxyXG4gICAgICAgIF9yZWxvYWRUaW1lcjogMCxcclxuICAgICAgICBsYXN0SGl0QnVsbGV0OiBudWxsLFxyXG5cclxuICAgICAgICBfZGVzVGltZTogMCwvL+W3oemAu+eahOWPmOWQkemikeeOh1xyXG4gICAgICAgIF9kZXNUaW1lMjogMCwvLyDov73ouKrmiJbpgIPot5HnmoTlj5jlkJHpopHnjodcclxuICAgICAgICBfaXNBaW06IGZhbHNlLC8v556E5YeG54q25oCB77yM5q2k54q25oCB5LiL5p6q5LiN5Y+v6Ieq5Li76L2s5ZCR77yM6YG/5YWN6ay855WcXHJcbiAgICAgICAgX2FpbURpcjogbnVsbCxcclxuICAgICAgICBfYWltVGltZXI6IDAsXHJcbiAgICAgICAgX2FpbUludGVydmFsOiAwLjEsXHJcbiAgICAgICAgX2lzRGllOiBmYWxzZSxcclxuICAgICAgICBfbW92ZTogZmFsc2UsXHJcbiAgICAgICAgX2lzUHJvdGVjdDogZmFsc2UsXHJcbiAgICAgICAgX2lzQmxvY2s6IGZhbHNlLFxyXG4gICAgICAgIF9pc0dhczogZmFsc2UsXHJcbiAgICAgICAgX2luR2FzVGltZXI6IDAsXHJcbiAgICAgICAgX2luR2FzSW50ZXJ2YWw6IDAuNSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRJdGVtQXR0ckFyciA9IFt7XHJcbiAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHJhbms6IDAsXHJcbiAgICAgICAgICAgIGl0ZW06IG51bGxcclxuICAgICAgICB9XS8v5Lyk5a6z77yM6Ziy5b6h77yM56e76YCf77yM5pq05Ye7XHJcbiAgICAgICAgdGhpcy5lcXVpcEl0ZW1BdHRyID0gWzAsIDAsIDAsIDBdLy8o6KOF5aSH5bim5p2l55qE5bGe5oCnKeS8pOWus++8jOmYsuW+oe+8jOenu+mAn++8jOaatOWHu1xyXG5cclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5vbihFdmVudE5hbWVzLkVWRU5UX1RIRUdBTUVTVEFSVCwgdGhpcy50aGVHYW1lU3RhcnQuYmluZCh0aGlzKSlcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5vbihFdmVudE5hbWVzLkVWRU5UX05PVElGWV9FTkVNWV9NQVBCT1gsIHRoaXMubm90aWZ5TWFwQm94LmJpbmQodGhpcykpXHJcbiAgICAgICAgLy8gdGhpcy5fcGJjID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUGh5c2ljc0JveENvbGxpZGVyKVxyXG4gICAgICAgIC8vIHRoaXMuX3BiYy50YWcgPSBUYWdzLnJvbGVcclxuICAgICAgICB0aGlzLl9wYmMgPSB0aGlzLmdldENvbXBvbmVudChjYy5QaHlzaWNzQm94Q29sbGlkZXIpXHJcbiAgICAgICAgLy8gdGhpcy5fZGVzVGltZSA9IFRvb2xzLnJhbmRvbU51bSgxLCAzKVxyXG4gICAgfSxcclxuICAgIG9uRW5hYmxlKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICB9LFxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKEV2ZW50TmFtZXMuRVZFTlRfVEhFR0FNRVNUQVJUKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKEV2ZW50TmFtZXMuRVZFTlRfTk9USUZZX0VORU1ZX01BUEJPWClcclxuICAgIH0sXHJcbiAgICBpbml0KF9pbmRleCwgX25hbWVzKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuY2hvb3NlZFNraW5JZClcclxuICAgICAgICAvLyAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5zZXRTa2luSWQoR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5jaG9vc2VkU2tpbklkICs9IDEpXHJcbiAgICAgICAgLy8gfSwgMik7XHJcbiAgICAgICAgaWYgKEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5pc0luR2FtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVQcm90ZWN0KClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2hvb3NlZFNraW5JZCA9IF9pbmRleFxyXG4gICAgICAgIHRoaXMuc2tpbkRhdGEgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLmpzb25EYXRhLlNraW5zRGF0YVtfaW5kZXggLSAxXVxyXG4gICAgICAgIHRoaXMuYWRkU2tpbkF0dHIoKVxyXG4gICAgICAgIHRoaXMuaW5pdE5hbWVTaG93KF9uYW1lcylcclxuICAgICAgICB0aGlzLmluaXRTa2luU2hvdygpXHJcbiAgICAgICAgdGhpcy5zZXRTcGVlZFR5cGUoU3BlZWRUeXBlLkZBU1QpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5fcGJjLnRhZylcclxuICAgIH0sXHJcbiAgICBhZGRTa2luQXR0cigpIHtcclxuICAgICAgICB2YXIgY3VyU2tpbkRhdGEgPSB0aGlzLnNraW5EYXRhXHJcbiAgICAgICAgdGhpcy5fbWF4SHAgPSB0aGlzLl9jdXJIcCA9IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuYmFzZUhwICsgTWF0aC5mbG9vcihHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmJhc2VIcCAqIChjdXJTa2luRGF0YS5hdHRfaHBtYXggLyAxMDApKVxyXG4gICAgICAgIHRoaXMuX2N1ckRhbWFnZSA9IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuYmFzZURhbWFnZSArIGN1clNraW5EYXRhLmF0dF9kYW1hZ2UgLyAxMDBcclxuICAgICAgICB0aGlzLl9jdXJDcml0ID0gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5iYXNlQ3JpdCArIGN1clNraW5EYXRhLmF0dF9jcml0IC8gMTBcclxuICAgICAgICB0aGlzLl9jdXJTcGVlZCA9IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuYmFzZVNwZWVkICsgTWF0aC5mbG9vcihHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmJhc2VTcGVlZCAqIChjdXJTa2luRGF0YS5hdHRfc3BlZWQgLyAxMDApKVxyXG4gICAgICAgIHRoaXMuX2N1ckNkID0gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5iYXNlQ2QgKyBjdXJTa2luRGF0YS5hdHRfY2QgLyAxMDBcclxuICAgICAgICB0aGlzLl9jdXJEZWYgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmJhc2VEZWYgKyBjdXJTa2luRGF0YS5hdHRfZGVmZW5zZSAvIDEwMFxyXG4gICAgICAgIHRoaXMuX2N1clJlY292ZXJ5ID0gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5iYXNlUmVjb3ZlcnkgKyBjdXJTa2luRGF0YS5hdHRfcmVjb3ZlcnkgLyAxMDBcclxuICAgIH0sXHJcbiAgICByb2xlUHJvdGVjdCgpIHtcclxuICAgICAgICB0aGlzLl9pc1Byb3RlY3QgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICB9LFxyXG4gICAgdGhlR2FtZVN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1XHJcbiAgICAgICAgdGhpcy5faXNQcm90ZWN0ID0gZmFsc2VcclxuICAgIH0sXHJcbiAgICBub3RpZnlNYXBCb3goKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwTm9Cb3ggPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIGVuZW15RXF1aXBCb3hJdGVtKCkge1xyXG4gICAgICAgIHZhciBhcnIgPSBbMCwgMSwgMiwgM11cclxuICAgICAgICB2YXIgX3NlbGVjdEluZGV4ID0gMFxyXG4gICAgICAgIHdoaWxlICh0aGlzLmdldEl0ZW1BdHRyQXJyW19zZWxlY3RJbmRleF0ucmFuayA9PSAzKSB7XHJcbiAgICAgICAgICAgIFRvb2xzLnJlbW92ZUFycmF5KGFyciwgX3NlbGVjdEluZGV4KVxyXG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfc2VsZWN0SW5kZXggPSBUb29scy5nZXRSYW5kb21FbGVtZW50KGFycilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6YCJ5oup5LqGXCIgKyBfc2VsZWN0SW5kZXgpXHJcbiAgICAgICAgdmFyIF9yYW5rID0gdGhpcy5nZXRJdGVtQXR0ckFycltfc2VsZWN0SW5kZXhdLnJhbmsgKyAxXHJcbiAgICAgICAgdGhpcy5nZXRJdGVtQXR0ckFycltfc2VsZWN0SW5kZXhdID0ge1xyXG4gICAgICAgICAgICByYW5rOiBfcmFuayxcclxuICAgICAgICAgICAgaXRlbTogSXRlbUF0dHJbX3NlbGVjdEluZGV4XVtfcmFuayAtIDFdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXF1aXBJdGVtQXR0cltfc2VsZWN0SW5kZXhdID0gdGhpcy5nZXRJdGVtQXR0ckFycltfc2VsZWN0SW5kZXhdLml0ZW0uYXR0clxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhclNob3coKVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZVN0YXJTaG93KCkge1xyXG4gICAgICAgIHZhciBfc3VtID0gMFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIF9zdW0gKz0gdGhpcy5nZXRJdGVtQXR0ckFycltpXS5yYW5rXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfc3VtID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFyTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IHBhcnNlSW50KChfc3VtIC0gMSkgLyAzKVxyXG4gICAgICAgICAgICB2YXIgc3Rhck51bSA9IF9zdW0gLSBsZXZlbCAqIDNcclxuICAgICAgICAgICAgdGhpcy5zdGFyTm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEdhbWVBcHAudWlNYW5hZ2VyLmNvbW1vbkF0bGFzLmdldFNwcml0ZUZyYW1lKFwibGV2ZWxfYmdfXCIgKyAobGV2ZWwgKyAxKSlcclxuICAgICAgICAgICAgdGhpcy5zdGFyTm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEdhbWVBcHAudWlNYW5hZ2VyLmNvbW1vbkF0bGFzLmdldFNwcml0ZUZyYW1lKFwibGV2ZWxfc3Rhcl9cIiArIChsZXZlbCArIDEpICsgXCJfXCIgKyBzdGFyTnVtKVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJOb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5pdE5hbWVTaG93KF9uYW1lcykge1xyXG4gICAgICAgIHRoaXMudGhpc05hbWUgPSBfbmFtZXNcclxuICAgICAgICB0aGlzLm5hbWVVSS5zdHJpbmcgPSBfbmFtZXNcclxuICAgICAgICBpZiAoIUdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5pc0luR2FtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhwQmFyLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdmFyIGNvbG9ySW5kZXggPSBNYXRoLmZsb29yKCh0aGlzLnNraW5EYXRhLnNraW5pZCAtIDEpIC8gNSlcclxuICAgICAgICAvLyB0aGlzLm5hbWVVSS5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChOYW1lQ29sb3JbY29sb3JJbmRleF0pO1xyXG4gICAgfSxcclxuICAgIGluaXRTa2luU2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hvb3NlZFNraW5JZCA8IDIxKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUFuaW0uc2tlbGV0b25EYXRhID0gR2FtZUFwcC51aU1hbmFnZXIubm9ybWFsU2tpbkRhdGFcclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pbS5zZXRTa2luKHRoaXMuc2tpbkRhdGEuc2tpbm5hbWUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pbS5za2VsZXRvbkRhdGEgPSBHYW1lQXBwLnVpTWFuYWdlci5hZHZhbmNlU2tpbkRhdGFHcm91cFt0aGlzLl9jaG9vc2VkU2tpbklkIC0gMjFdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhcnIgPSB0aGlzLl9jaG9vc2VkU2tpbklkIDwgMjEgPyBbJ2F3YWl0J10gOiBbJ2F3YWl0X2ZpZ2h0XzEnXVxyXG4gICAgICAgIHRoaXMucm9sZUFuaW0uc2V0QW5pbWF0aW9uKDAsIGFyclswXSwgdHJ1ZSlcclxuICAgIH0sXHJcbiAgICAvLyBtZXRob2RzXHJcbiAgICBtb3ZlKGR0KSB7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLnJvdGF0aW9uID0gOTAgLSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMoXHJcbiAgICAgICAgLy8gICAgIE1hdGguYXRhbjIodGhpcy5tb3ZlRGlyLnksIHRoaXMubW92ZURpci54KVxyXG4gICAgICAgIC8vICk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vdmVEaXIpIHJldHVyblxyXG4gICAgICAgIHZhciB0aGVBbmdsZSA9IDkwIC0gY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIodGhpcy5tb3ZlRGlyLnksIHRoaXMubW92ZURpci54KSlcclxuICAgICAgICBpZiAodGhlQW5nbGUgPiAxODAgfHwgdGhlQW5nbGUgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUFuaW0ubm9kZS5zY2FsZVggPSAtMVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUFuaW0ubm9kZS5zY2FsZVggPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLm5vZGUucG9zaXRpb24uYWRkKHRoaXMubW92ZURpci5tdWwodGhpcy5fbW92ZVNwZWVkICogZHQpKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obmV3UG9zKTtcclxuICAgICAgICAvLyB0aGlzLnJvbGVBbmltLm5vZGUuc2V0UG9zaXRpb24oMCwgMClcclxuICAgIH0sXHJcbiAgICBkb1BhcnNlcihkdCkge1xyXG4gICAgICAgIHRoaXMuX2Rlc1RpbWUgLT0gZHRcclxuICAgICAgICB0aGlzLl9kZXNUaW1lMiAtPSBkdFxyXG4gICAgICAgIGlmICh0aGlzLl9pc0FpbSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGVzVGltZTIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNUaW1lMiA9IDFcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oYXZlR3VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLov73ouKpcIilcclxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5faXNCbG9jayAmJiB0aGlzLnNldERpcih0aGlzLl9haW1EaXIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6YCD6LeRXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMuX2lzQmxvY2sgJiYgdGhpcy5zZXREaXIodGhpcy5fYWltRGlyLnJvdGF0ZSgxODApKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmdhc0NvbmZpZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXIgPSBjYy52MihHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuZ2FzQ29uZmlnLnNhZmVQb3NpdGlvbikuc3ViKGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpXHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IGRpci5tYWcoKVxyXG4gICAgICAgICAgICBpZiAoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmdhc0NvbmZpZy5nYXNDaXJjbGUgPiAwICYmIGRpc3RhbmNlID4gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmdhc0NvbmZpZy5nYXNDaXJjbGUgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbkdhc1RpbWVyIC09IGR0XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5HYXNUaW1lciA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbkdhc1RpbWVyID0gdGhpcy5faW5HYXNJbnRlcnZhbFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVEYW1hZ2UoNSwgLTEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0dhcyA9IHRydWVcclxuICAgICAgICAgICAgICAgICF0aGlzLl9pc0Jsb2NrICYmIHRoaXMuc2V0RGlyKGRpci5ub3JtYWxpemUoKSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNHYXMgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faXNHYXMgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2Rlc1RpbWUgPCAwKSB7XHJcbiAgICAgICAgICAgIC8vMSAxIOS4jeaJviAgMSAwIOaJviAgMCAxIOS4jeaJviAgMCAwIOS4jeaJvlxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzR2FzICYmICF0aGlzLl9tYXBOb0d1biAmJiAhdGhpcy5faGF2ZUd1bikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzVGltZSA9IDAuM1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmib7mnqpcIilcclxuICAgICAgICAgICAgICAgICF0aGlzLl9pc0Jsb2NrICYmIHRoaXMuc2VhcmNoR3VuKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNHYXMgJiYgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmlzSW5HYW1lICYmICF0aGlzLl9tYXBOb0JveCAmJiB0aGlzLl9oYXZlR3VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzVGltZSA9IDAuM1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5om+566x5a2QXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hCb3goKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW3oemAu1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc1RpbWUgPSBUb29scy5yYW5kb21OdW0oMSwgMylcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVzRGlyID0gY2MudjIoMCwgMSkucm90YXRlKGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhUb29scy5yYW5kb21OdW0oMCwgMzYwKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMuX2lzQmxvY2sgJiYgdGhpcy5zZXREaXIoZGVzRGlyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZWFyY2hHdW4oKSB7XHJcbiAgICAgICAgdmFyIGFsbEd1bkFyciA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxHdW5BcnIuY29uY2F0KClcclxuICAgICAgICB2YXIgbWluRGlzID0gMTAwMDAwMDtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEd1bkFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBjYy52MihhbGxHdW5BcnJbaV0ucG9zaXRpb24pLnN1YihjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pKS5tYWcoKVxyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBtaW5EaXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuZ2FzQ29uZmlnICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlyRGlzdGFuY2UgPSBjYy52MihHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuZ2FzQ29uZmlnLnNhZmVQb3NpdGlvbikuc3ViKGNjLnYyKGFsbEd1bkFycltpXS5wb3NpdGlvbikpLm1hZygpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpckRpc3RhbmNlID4gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmdhc0NvbmZpZy5nYXNDaXJjbGUgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWluRGlzID0gZGlzdGFuY2VcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkaXIgPSBudWxsXHJcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcE5vR3VuID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBhaW1HdW4gPSBhbGxHdW5BcnJbaW5kZXhdXHJcbiAgICAgICAgICAgIGRpciA9IGNjLnYyKGFpbUd1bi5wb3NpdGlvbikuc3ViKGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpLm5vcm1hbGl6ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGlyKGRpcilcclxuICAgIH0sXHJcbiAgICBzZWFyY2hCb3goKSB7XHJcbiAgICAgICAgdmFyIGFsbEJveEFyciA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxCb3hBcnIuY29uY2F0KClcclxuICAgICAgICB2YXIgbWluRGlzID0gMTAwMDAwMDtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEJveEFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBjYy52MihhbGxCb3hBcnJbaV0ucG9zaXRpb24pLnN1YihjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pKS5tYWcoKVxyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREaXIoY2MudjIoMCwgMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgbWluRGlzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmdhc0NvbmZpZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpckRpc3RhbmNlID0gY2MudjIoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmdhc0NvbmZpZy5zYWZlUG9zaXRpb24pLnN1YihjYy52MihhbGxCb3hBcnJbaV0ucG9zaXRpb24pKS5tYWcoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXJEaXN0YW5jZSA+IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5nYXNDb25maWcuZ2FzQ2lyY2xlIC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1pbkRpcyA9IGRpc3RhbmNlXHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGlyID0gY2MudjIoMCwgMClcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwTm9Cb3ggPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGFpbUJveCA9IGFsbEJveEFycltpbmRleF1cclxuICAgICAgICAgICAgZGlyID0gY2MudjIoYWltQm94LnBvc2l0aW9uKS5zdWIoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSkubm9ybWFsaXplKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXREaXIoZGlyKVxyXG4gICAgfSxcclxuICAgIHNldFNwZWVkVHlwZShfdHlwZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0RpZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9zcGVlZFR5cGUgIT0gX3R5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BlZWRUeXBlID0gX3R5cGVcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnIgPSB0aGlzLl9jaG9vc2VkU2tpbklkIDwgMjEgPyBbJ2F3YWl0JywgJ3J1bjInLCAncnVuMiddIDogWydhd2FpdF9maWdodF8xJywgJ3J1bicsICdydW4nXVxyXG4gICAgICAgICAgICB0aGlzLnJvbGVBbmltLnNldEFuaW1hdGlvbigwLCBhcnJbX3R5cGVdLCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXREaXIoX2Rpcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0RpZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChfZGlyICYmIF9kaXIubWFnKCkgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNwZWVkVHlwZShTcGVlZFR5cGUuU1RPUClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNwZWVkVHlwZShTcGVlZFR5cGUuRkFTVClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3ZlRGlyID0gX2RpclxyXG4gICAgICAgIGlmICh0aGlzLl9pc0FpbSkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zZXRHdW5EaXIoX2RpcilcclxuICAgIH0sXHJcbiAgICBzZXRHdW5EaXIoX2Rpcikge1xyXG4gICAgICAgIGlmIChfZGlyID09IG51bGwpIHtcclxuICAgICAgICAgICAgX2RpciA9IHRoaXMubW92ZURpclxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ndW5EaXIgPSBfZGlyXHJcbiAgICAgICAgdGhpcy5fYWltRGlyID0gX2RpclxyXG4gICAgICAgIGlmICghdGhpcy5faGF2ZUd1bikgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5ndW5Ob2RlLnJvdGF0aW9uID0gLWNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhcclxuICAgICAgICAgICAgTWF0aC5hdGFuMihfZGlyLnksIF9kaXIueClcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCB0aGVBbmdsZSA9IDkwIC0gdGhpcy5ndW5Ob2RlLnJvdGF0aW9uXHJcblxyXG4gICAgICAgIGlmICh0aGVBbmdsZSA+IDE4MCB8fCB0aGVBbmdsZSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5ndW5Ob2RlLnNjYWxlWSA9IC0xXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ndW5Ob2RlLnNjYWxlWSA9IDFcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRGllKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5kb1BhcnNlcihkdClcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX3NwZWVkVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNwZWVkVHlwZS5TVE9QOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZVNwZWVkID0gdGhpcy5zdG9wU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTcGVlZFR5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZVNwZWVkID0gdGhpcy5ub3JtYWxTcGVlZDtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX21vdmVTcGVlZCA9IHRoaXMuZmFzdFNwZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3BlZWRUeXBlLkZBU1Q6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlU3BlZWQgPSB0aGlzLl9jdXJTcGVlZCArIE1hdGguZmxvb3IodGhpcy5fY3VyU3BlZWQgKiB0aGlzLmVxdWlwSXRlbUF0dHJbRXF1aXBUeXBlLnNwZWVkXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmUoZHQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5faXNQcm90ZWN0KSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2FpbVRpbWVyIC09IGR0XHJcbiAgICAgICAgaWYgKHRoaXMuX2FpbVRpbWVyIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9haW1UaW1lciA9IHRoaXMuX2FpbUludGVydmFsXHJcbiAgICAgICAgICAgIHRoaXMuYWltVG9OZWFyZXN0KClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzQWltKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob290VGltZXIgLT0gZHRcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob290VGltZXIgPCAwICYmICF0aGlzLl9yZWxvYWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9vdFRpbWVyID0gdGhpcy5fc2hvb3RJbnRlcnZhbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yZWxvYWRGbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbG9hZFRpbWVyIC09IGR0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWxvYWRGbGFnICYmIHRoaXMuX3JlbG9hZFRpbWVyIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVsb2FkRmxhZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZEFtbygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGxhdGVVcGRhdGUoZHQpIHtcclxuICAgICAgICAvLyB0aGlzLm1haW5DLm5vZGUuc2V0UG9zaXRpb24odGhpcy5wbGF5ZXIucG9zaXRpb24pXHJcbiAgICAgICAgLy8gdGhpcy50ZXN0Qy5ub2RlLnNldFBvc2l0aW9uKHRoaXMucGxheWVyLnBvc2l0aW9uKVxyXG4gICAgICAgIC8vIEdhbWVBcHAudWlNYW5hZ2VyLm1hcENhbWVyYS5ub2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbilcclxuICAgICAgICAvLyB0aGlzLm1pcG1hcENhbWVyYS5ub2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbilcclxuICAgIH0sXHJcbiAgICBhaW1Ub05lYXJlc3QoKSB7XHJcbiAgICAgICAgLy8gcmV0dXJuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9oYXZlR3VuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VuRGF0YS5yYW5nZSA9IDQwMFxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYWxsUm9sZUFyciA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxSb2xlQXJyLmNvbmNhdCgpXHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxSb2xlQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgIGlmIChhbGxSb2xlQXJyW2ldLnNraW5EYXRhLnNraW5pZCA9PSB0aGlzLnNraW5EYXRhLnNraW5pZCkge1xyXG4gICAgICAgIC8vICAgICAgICAgYWxsUm9sZUFyci5zcGxpY2UoaSwgMSlcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgVG9vbHMucmVtb3ZlQXJyYXkoYWxsUm9sZUFyciwgdGhpcy5nZXRDb21wb25lbnQoXCJFbmVteVwiKSlcclxuICAgICAgICB2YXIgbWluRGlzID0gMTAwMDAwMDtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFJvbGVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gY2MudjIoYWxsUm9sZUFycltpXS5ub2RlLnBvc2l0aW9uKS5zdWIoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSkubWFnKClcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgbWluRGlzICYmIGRpc3RhbmNlIDwgdGhpcy5ndW5EYXRhLnJhbmdlICogMS40KSB7XHJcbiAgICAgICAgICAgICAgICBtaW5EaXMgPSBkaXN0YW5jZVxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpciA9IG51bGxcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNBaW0gPSBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBhaW1FbmVteSA9IGFsbFJvbGVBcnJbaW5kZXhdLm5vZGVcclxuICAgICAgICAgICAgZGlyID0gY2MudjIoYWltRW5lbXkucG9zaXRpb24pLnN1YihjYy52Mih0aGlzLm5vZGUucG9zaXRpb24pKS5ub3JtYWxpemUoKVxyXG4gICAgICAgICAgICB0aGlzLl9pc0FpbSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRHdW5EaXIoZGlyKVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG9vdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2hhdmVHdW4pIHJldHVyblxyXG4gICAgICAgIGlmICh0aGlzLnJlZHVjZUFtbygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VuQW5pbS5zZXRBbmltYXRpb24oMCwgJ2F0dGFja18nICsgdGhpcy5ndW5EYXRhLnNraW5uYW1lLCBmYWxzZSlcclxuICAgICAgICAgICAgdmFyIHBvd2VyID0gTWF0aC5jZWlsKHRoaXMuZ3VuRGF0YS5wb3dlciAqICh0aGlzLl9jdXJEYW1hZ2UgKyB0aGlzLmVxdWlwSXRlbUF0dHJbRXF1aXBUeXBlLmRhbWFnZV0pKVxyXG4gICAgICAgICAgICB2YXIgaXNDcml0ID0gZmFsc2VcclxuICAgICAgICAgICAgaWYgKFRvb2xzLmlzQ3JpdCh0aGlzLl9jdXJDcml0ICsgdGhpcy5lcXVpcEl0ZW1BdHRyW0VxdWlwVHlwZS5jcml0XSkpIHtcclxuICAgICAgICAgICAgICAgIHBvd2VyICo9IDJcclxuICAgICAgICAgICAgICAgIGlzQ3JpdCA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZ3VuRGF0YS53ZWFwb25pZCA9PSAxMDAyKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5pc0luTWFwU2lnaHQodGhpcy5ub2RlKSAmJiBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdzaG90X3Nob290JywgMC4zLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHZhciBidWxsZXQxID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQcmVmYWIpXHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0MiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldDMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldFByZWZhYilcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXRQb3MgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLmd1bk5vZGUuY2hpbGRyZW5bMF0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKSlcclxuICAgICAgICAgICAgICAgIGJ1bGxldDEucGFyZW50ID0gYnVsbGV0Mi5wYXJlbnQgPSBidWxsZXQzLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50XHJcbiAgICAgICAgICAgICAgICBidWxsZXQxLnNldFBvc2l0aW9uKGJ1bGxldFBvcylcclxuICAgICAgICAgICAgICAgIGJ1bGxldDIuc2V0UG9zaXRpb24oYnVsbGV0UG9zKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0My5zZXRQb3NpdGlvbihidWxsZXRQb3MpXHJcbiAgICAgICAgICAgICAgICBidWxsZXQxLnJvdGF0aW9uID0gdGhpcy5ndW5Ob2RlLnJvdGF0aW9uXHJcbiAgICAgICAgICAgICAgICBidWxsZXQyLnJvdGF0aW9uID0gdGhpcy5ndW5Ob2RlLnJvdGF0aW9uICsgMzBcclxuICAgICAgICAgICAgICAgIGJ1bGxldDMucm90YXRpb24gPSB0aGlzLmd1bk5vZGUucm90YXRpb24gLSAzMFxyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lR3VuRGlyID0gY2MudjIodGhpcy5fZ3VuRGlyKVxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldEMxID0gYnVsbGV0MS5nZXRDb21wb25lbnQoJ0J1bGxldCcpXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDMS5fYmVsb25nVGFnID0gdGhpcy5fcGJjLnRhZ1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0QzEuX2JlbG9uZ05hbWUgPSB0aGlzLnRoaXNOYW1lXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDMS5fZmx5RGlyID0gY2xvbmVHdW5EaXJcclxuICAgICAgICAgICAgICAgIGJ1bGxldEMxLmluaXQodGhpcy5ndW5EYXRhLCBwb3dlciwgaXNDcml0KVxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldEMyID0gYnVsbGV0Mi5nZXRDb21wb25lbnQoJ0J1bGxldCcpXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDMi5fYmVsb25nVGFnID0gdGhpcy5fcGJjLnRhZ1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0QzIuX2JlbG9uZ05hbWUgPSB0aGlzLnRoaXNOYW1lXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDMi5fZmx5RGlyID0gY2xvbmVHdW5EaXIucm90YXRlKC1jYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoMzApKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0QzIuaW5pdCh0aGlzLmd1bkRhdGEsIHBvd2VyLCBpc0NyaXQpXHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0QzMgPSBidWxsZXQzLmdldENvbXBvbmVudCgnQnVsbGV0JylcclxuICAgICAgICAgICAgICAgIGJ1bGxldEMzLl9iZWxvbmdUYWcgPSB0aGlzLl9wYmMudGFnXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDMy5fYmVsb25nTmFtZSA9IHRoaXMudGhpc05hbWVcclxuICAgICAgICAgICAgICAgIGJ1bGxldEMzLl9mbHlEaXIgPSBjbG9uZUd1bkRpci5yb3RhdGUoLWNjLm1pc2MuZGVncmVlc1RvUmFkaWFucygtMzApKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0QzMuaW5pdCh0aGlzLmd1bkRhdGEsIHBvd2VyLCBpc0NyaXQpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ndW5EYXRhLndlYXBvbmlkID09IDEwMDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5pc0luTWFwU2lnaHQodGhpcy5ub2RlKSAmJiBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdjaGFyZ2Vfc2hvb3QnLCAwLjMsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmd1bkRhdGEud2VhcG9uaWQgPT0gMTAwNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLmlzSW5NYXBTaWdodCh0aGlzLm5vZGUpICYmIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ21pc3NpbGVfc2hvb3QnLCAwLjMsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldFBvcyA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuZ3VuTm9kZS5jaGlsZHJlblswXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuc2V0UG9zaXRpb24oYnVsbGV0UG9zKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnJvdGF0aW9uID0gdGhpcy5ndW5Ob2RlLnJvdGF0aW9uXHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0QyA9IGJ1bGxldC5nZXRDb21wb25lbnQoJ0J1bGxldCcpXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDLl9iZWxvbmdUYWcgPSB0aGlzLl9wYmMudGFnXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDLl9iZWxvbmdOYW1lID0gdGhpcy50aGlzTmFtZVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Qy5fZmx5RGlyID0gdGhpcy5fZ3VuRGlyXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDLmluaXQodGhpcy5ndW5EYXRhLCBwb3dlciwgaXNDcml0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQW1vU2hvdygpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fY3VyQW1vTnVtID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWQoKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZWR1Y2VBbW8oKSB7XHJcbiAgICAgICAgdmFyIGEgPSB0aGlzLl9jdXJBbW9OdW0gLSAxXHJcbiAgICAgICAgaWYgKGEgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFtb051bSA9IDBcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVBbW9TaG93KClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQW1vTnVtID0gYVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFtb1Nob3coKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZWxvYWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9oYXZlR3VuKSByZXR1cm5cclxuICAgICAgICBpZiAodGhpcy5fcmVsb2FkRmxhZykgcmV0dXJuO1xyXG4gICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLmlzSW5NYXBTaWdodCh0aGlzLm5vZGUpICYmIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ3JlbG9hZCcsIDAuNilcclxuICAgICAgICB0aGlzLmd1bkFuaW0uc2V0QW5pbWF0aW9uKDAsICdyZWxvYWRfJyArIHRoaXMuZ3VuRGF0YS5za2lubmFtZSwgZmFsc2UpXHJcbiAgICAgICAgdGhpcy5fcmVsb2FkVGltZXIgPSB0aGlzLl9yZWxvYWRJbnRlcnZhbFxyXG4gICAgICAgIHRoaXMuX3JlbG9hZEZsYWcgPSB0cnVlXHJcbiAgICB9LFxyXG4gICAgcmVsb2FkQW1vKCkge1xyXG4gICAgICAgIHRoaXMuX2N1ckFtb051bSA9IHRoaXMuX21heEFtb051bVxyXG4gICAgICAgIHRoaXMudXBkYXRlQW1vU2hvdygpXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlQW1vU2hvdygpIHtcclxuICAgICAgICB0aGlzLmFtb0Jhci5wcm9ncmVzcyA9IHRoaXMuX2N1ckFtb051bSAvIHRoaXMuX21heEFtb051bVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZUhwU2hvdygpIHtcclxuICAgICAgICB0aGlzLmhwQmFyLnByb2dyZXNzID0gdGhpcy5fY3VySHAgLyB0aGlzLl9tYXhIcFxyXG4gICAgfSxcclxuICAgIGVxdWlwV2VhcG9uKF9raW5kKSB7XHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuaXNJbk1hcFNpZ2h0KHRoaXMubm9kZSkgJiYgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgncGlja19pdGVtJywgMC42KVxyXG4gICAgICAgIHRoaXMuZ3VuRGF0YSA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuanNvbkRhdGEuV2VhcG9uRGF0YVtfa2luZF1cclxuICAgICAgICB0aGlzLl9zaG9vdEludGVydmFsID0gdGhpcy5ndW5EYXRhLnNob290ZGVsYXlcclxuICAgICAgICB0aGlzLl9yZWxvYWRJbnRlcnZhbCA9IHRoaXMuZ3VuRGF0YS5yZWxvYWRkZWxheVxyXG4gICAgICAgIHRoaXMuX21heEFtb051bSA9IHRoaXMuZ3VuRGF0YS5jbGlwbnVtXHJcbiAgICAgICAgdGhpcy5yZWxvYWRBbW8oKVxyXG4gICAgICAgIHRoaXMuZ3VuTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgaWYgKF9raW5kIDwgMykge1xyXG4gICAgICAgICAgICB0aGlzLmd1bkFuaW0uc2tlbGV0b25EYXRhID0gR2FtZUFwcC51aU1hbmFnZXIuZ3VuU2tpbkRhdGFHcm91cFswXVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VuQW5pbS5za2VsZXRvbkRhdGEgPSBHYW1lQXBwLnVpTWFuYWdlci5ndW5Ta2luRGF0YUdyb3VwWzFdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3VuQW5pbS5zZXRTa2luKHRoaXMuZ3VuRGF0YS5za2lubmFtZSlcclxuICAgICAgICB0aGlzLl9oYXZlR3VuID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuc2V0R3VuRGlyKHRoaXMubW92ZURpcilcclxuICAgICAgICAvLyB0aGlzLmd1bkFuaW0uc2V0QW5pbWF0aW9uKDAsICdhdHRhY2tfJyArIHRoaXMuZ3VuRGF0YS5za2lubmFtZSwgZmFsc2UpXHJcbiAgICB9LFxyXG4gICAgZ2V0SXRlbSgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNEaWUpIHJldHVyblxyXG4gICAgICAgIGlmIChzZWxmLnRhZyA9PSBUYWdzLmVtcHR5KSByZXR1cm47XHJcbiAgICAgICAgaWYgKG90aGVyLnRhZyA9PSBUYWdzLml0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGdyb3VuZEl0ZW0gPSBvdGhlci5ub2RlLmdldENvbXBvbmVudCgnR3JvdW5kSXRlbScpXHJcbiAgICAgICAgICAgIGlmIChncm91bmRJdGVtLml0ZW1UeXBlLl90eXBlID09IEl0ZW1UeXBlLndlYXBvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9raW5kID0gZ3JvdW5kSXRlbS5pdGVtVHlwZS5fa2luZFxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXZlR3VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9vbHMucmVtb3ZlQXJyYXkoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbEd1bkFyciwgb3RoZXIubm9kZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVxdWlwV2VhcG9uKF9raW5kKVxyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyLm5vZGUuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBfcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIF90eXBlOiBJdGVtVHlwZS53ZWFwb24sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIF9raW5kOiBHYW1lQXBwLmRhdGFNYW5hZ2VyLmpzb25EYXRhLldlYXBvbkRhdGEuaW5kZXhPZih0aGlzLmd1bkRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdyb3VuZEl0ZW0uaW5pdChfcGFyYW0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmVxdWlwV2VhcG9uKF9raW5kKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdyb3VuZEl0ZW0uaXRlbVR5cGUuX3R5cGUgPT0gSXRlbVR5cGUuaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAob3RoZXIudGFnID09IFRhZ3MuYnVsbGV0KSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmlzSW5HYW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBiQyA9IG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KCdCdWxsZXQnKVxyXG4gICAgICAgICAgICBpZiAoYkMuX2JlbG9uZ1RhZyA9PSBzZWxmLnRhZykgcmV0dXJuXHJcbiAgICAgICAgICAgIGlmIChvdGhlci5ub2RlID09IHRoaXMubGFzdEhpdEJ1bGxldCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RIaXRCdWxsZXQgPSBvdGhlci5ub2RlXHJcbiAgICAgICAgICAgIHRoaXMuYmVEYW1hZ2UoYkMuX3Bvd2VyLCBiQy5fYmVsb25nVGFnLCBiQy5fYmVsb25nTmFtZSwgYkMuX2lzQ3JpdCwgYkMuZ3VuRGF0YS53ZWFwb25pZClcclxuICAgICAgICB9IGVsc2UgaWYgKG90aGVyLnRhZyA9PSBUYWdzLmNvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQmxvY2sgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubW92ZURpciAmJiB0aGlzLm1vdmVEaXIucm90YXRlU2VsZihjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoVG9vbHMucmFuZG9tTnVtKDkwLCAxODApKSlcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNCbG9jayA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0sIDAuNSlcclxuICAgICAgICB9IGVsc2UgaWYgKG90aGVyLnRhZyA9PSBUYWdzLmJvb20pIHtcclxuICAgICAgICAgICAgdGhpcy5iZURhbWFnZSg5OTksIC0yKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZWR1Y2VIcChfbnVtKSB7XHJcbiAgICAgICAgdmFyIGEgPSB0aGlzLl9jdXJIcCAtIF9udW1cclxuICAgICAgICBpZiAoYSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckhwID0gMFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhwU2hvdygpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckhwID0gYVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhwU2hvdygpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJlRGFtYWdlKF9wb3dlciwgX2JlbG9uZ0luZGV4LCBfYmVsb25nTmFtZSwgX2lzQ3JpdCwgX3dlYXBvbmlkKSB7XHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuaXNJbk1hcFNpZ2h0KHRoaXMubm9kZSkgJiYgR2FtZUFwcC51aU1hbmFnZXIuc2hvd0dhbWVPYmplY3QoXCJJbmZvTGFiZWxcIiwgKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgdmFyIG9yaWdpblBvcyA9IG5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMC41LCAwLjUpKSlcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihvcmlnaW5Qb3MpXHJcbiAgICAgICAgICAgIHZhciBfaXNEZWYgPSBNYXRoLmNlaWwoX3Bvd2VyICogdGhpcy5fY3VyRGVmKSArIE1hdGguY2VpbChfcG93ZXIgKiB0aGlzLmVxdWlwSXRlbUF0dHJbRXF1aXBUeXBlLmRlZl0pXHJcbiAgICAgICAgICAgIF9wb3dlciAtPSBfaXNEZWZcclxuICAgICAgICAgICAgdmFyIHN0ciA9IFwiPGNvbG9yPXJlZD4tXCIgKyBfcG93ZXIgKyBcIjwvY29sb3I+XCJcclxuICAgICAgICAgICAgaWYgKF9pc0NyaXQpIHtcclxuICAgICAgICAgICAgICAgIHN0ciA9IFwiPGNvbG9yPXJlZD7mmrTlh7stXCIgKyBfcG93ZXIgKyBcIjwvY29sb3I+XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX2lzRGVmKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCI8Y29sb3I9IzBmZmZmZj7lh4/kvKRcIiArIF9pc0RlZiArIFwiPC9jb2xvcj5cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIjxiPlwiICsgc3RyICsgXCI8L2I+XCJcclxuXHJcbiAgICAgICAgICAgIGxldCBkZXNQb3MgPSBjYy52MihUb29scy5yYW5kb21OdW0oNjAsIDEwMCksIFRvb2xzLnJhbmRvbU51bSg2MCwgMTAwKSlcclxuICAgICAgICAgICAgbGV0IGJlemllciA9IFtvcmlnaW5Qb3MsIGNjLnYyKG9yaWdpblBvcy54ICsgZGVzUG9zLnggLSAyMCwgb3JpZ2luUG9zLnkgKyBkZXNQb3MueSArIDIwKSwgb3JpZ2luUG9zLmFkZChkZXNQb3MpXTtcclxuICAgICAgICAgICAgbGV0IHNlcSA9IGNjLnNlcXVlbmNlKGNjLnNwYXduKGNjLmZhZGVJbigwLjIpLCBjYy5zY2FsZVRvKDAuMywgMS41KSwgY2MuYmV6aWVyVG8oMC4zLCBiZXppZXIpKSwgY2MuZGVsYXlUaW1lKDAuNSksIGNjLmZhZGVPdXQoMC4zKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5kZXN0cm95KClcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKHNlcSlcclxuICAgICAgICB9LCB0aGlzLm5vZGUucGFyZW50LnBhcmVudClcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsUm9sZUFycilcclxuICAgICAgICBpZiAodGhpcy5yZWR1Y2VIcChfcG93ZXIpKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLmlzSW5NYXBTaWdodCh0aGlzLm5vZGUpICYmIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ21hbGVEZWF0aCcsIDAuNSlcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IEdhbWVBcHAudWlNYW5hZ2VyLmdldEdhbWUoXCJHYW1lTWFwXCIpLmdldENoaWxkQnlOYW1lKFwiRGVhZE9iamVjdE5vZGVcIilcclxuICAgICAgICAgICAgdGhpcy5fcGJjLmVuYWJsZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9pc0RpZSA9IHRydWVcclxuICAgICAgICAgICAgaWYgKF9iZWxvbmdJbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KHRoaXMudGhpc05hbWUgKyBcIiDooqvmr5Llh7rlsYBcIilcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChfYmVsb25nSW5kZXggPT0gLTIpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdCh0aGlzLnRoaXNOYW1lICsgXCIg6KKr6L2w54K45Ye65bGAXCIpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2lsbE51bSA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuYWRkS2lsbE51bShfYmVsb25nSW5kZXgsIF9iZWxvbmdOYW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKF9iZWxvbmdOYW1lID09IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEucGxheWVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9iZWxvbmdOYW1lID0gXCI8Y29sb3I9IzBmZmZmZj5cIiArIF9iZWxvbmdOYW1lICsgXCI8L2NvbG9yPlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoa2lsbE51bSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291bmRJbmRleCA9IGtpbGxOdW0gPiA1ID8gNSA6IGtpbGxOdW1cclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdraWxsJyArIHNvdW5kSW5kZXgsIDAuNSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93VG9hc3QoX2JlbG9uZ05hbWUsIG51bGwsIGtpbGxOdW0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdChfYmVsb25nTmFtZSArIFwiIOWHu+adgOS6hiBcIiArIHRoaXMudGhpc05hbWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+S7u+WKoeebuOWFs1xyXG4gICAgICAgICAgICAgICAgaWYgKF9iZWxvbmdJbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi546p5a625p2A5Lq65LqGXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5hZGRBY3Rpdml0eU51bSgxLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfd2VhcG9uaWQgPT0gMTEwMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmFkZEFjdGl2aXR5TnVtKDAsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5faGF2ZUd1bikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoZVBhcmVudEMgPSBHYW1lQXBwLnVpTWFuYWdlci5nYW1lUm9vdC5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoXCJHYW1lTWFwXCIpXHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93R2FtZU9iamVjdChcIkdyb3VuZEl0ZW1cIiwgKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGRkID0gdGhlUGFyZW50Qy5hbGxHdW5Ob2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhlUGFyZW50Qy5hbGxHdW5Ob2RlXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihkZGQpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3R5cGU6IEl0ZW1UeXBlLndlYXBvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2tpbmQ6IFRvb2xzLmdldEluZGV4KEdhbWVBcHAuZGF0YU1hbmFnZXIuanNvbkRhdGEuV2VhcG9uRGF0YSwgdGhpcy5ndW5EYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhfcGFyYW0uX2tpbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0dyb3VuZEl0ZW0nKS5pbml0KF9wYXJhbSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsR3VuQXJyLnB1c2gobm9kZSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZygxKVxyXG4gICAgICAgICAgICAvLyBmb3IgKHZhciBpIGluIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxSb2xlQXJyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbFJvbGVBcnJbaV0uc2tpbkRhdGEuc2tpbmlkID09IHRoaXMuc2tpbkRhdGEuc2tpbmlkKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbFJvbGVBcnIuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdmFyIGFyciA9IHRoaXMuX2Nob29zZWRTa2luSWQgPCAyMSA/IFsnZGVhZCddIDogWydkZWFkMiddXHJcbiAgICAgICAgICAgIHRoaXMucm9sZUFuaW0uc2V0QW5pbWF0aW9uKDAsIGFyclswXSwgZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuZ3VuTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICBUb29scy5yZW1vdmVBcnJheShHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsUm9sZUFyciwgdGhpcy5ub2RlLmdldENvbXBvbmVudCgnRW5lbXknKSlcclxuICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1NIT1dfQUxMUk9MRU5VTV9VSSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufSk7XHJcbiJdfQ==