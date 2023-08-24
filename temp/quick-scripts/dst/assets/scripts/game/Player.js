
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '175c9l71jJIOK/erMuxWhel', 'Player');
// scripts/game/Player.js

"use strict";

var _JoystickCommon = require("JoystickCommon");

cc.Class({
  "extends": cc.Component,
  properties: {
    // from joystick
    moveDir: {
      "default": cc.v2(1, 0),
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
    // normalSpeed: {//暂时不用
    //     default: 100,
    //     type: cc.Integer,
    //     tooltip: '正常速度'
    // },
    // fastSpeed: {//暂时不用
    //     default: 200,
    //     type: cc.Integer,
    //     tooltip: '最快速度'
    // },
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
    gunData: {
      "default": {}
    },
    skinData: {
      "default": {}
    },
    _pbc: cc.PhysicsBoxCollider,
    nameUI: cc.Label,
    bulletPrefab: cc.Prefab,
    tempGroundWeapon: null,
    hpBar: cc.ProgressBar,
    amoBar: cc.ProgressBar,
    starNode: cc.Node,
    lastHitBullet: null,
    //避免被火箭筒的爆炸范围或导弹头重复计算伤害
    _isAim: false,
    //瞄准状态，此状态下枪不可自主转向，避免鬼畜
    _aimTimer: 0,
    _aimInterval: 0.05,
    _stepTimer: 0,
    _stepInterval: 0.3,
    _isDie: false,
    arrowNode: cc.Node,
    _mapNoGun: false,
    _isProtect: false,
    _isGas: false,
    _inGasTimer: 0,
    _inGasInterval: 0.5
  },
  onLoad: function onLoad() {
    GameApp.eventManager.on(EventNames.EVENT_PLAYER_SHOOT, this.shoot.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_PLAYER_RELOAD, this.reload.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_PICKUP_WEAPON, this.pickUpWeapon.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_TOPBAR_SHOW, this.updatePlayerTopBarShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_AIM, this.aimState.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_THEGAMESTART, this.theGameStart.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_FLASH, this.doFlash.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_RESUME_HEALTH, this.doResumeHealth.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_STAR_SHOW, this.updateStarShow.bind(this));
    this._pbc = this.getComponent(cc.PhysicsBoxCollider); // console.log(this._pbc)

    this._pbc.tag = Tags.player;
  },
  onEnable: function onEnable() {},
  onDisable: function onDisable() {},
  onDestroy: function onDestroy() {
    GameApp.eventManager.removeListener(EventNames.EVENT_PLAYER_SHOOT);
    GameApp.eventManager.removeListener(EventNames.EVENT_PLAYER_RELOAD);
    GameApp.eventManager.removeListener(EventNames.EVENT_PICKUP_WEAPON);
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_TOPBAR_SHOW);
    GameApp.eventManager.removeListener(EventNames.EVENT_AIM);
    GameApp.eventManager.removeListener(EventNames.EVENT_THEGAMESTART);
    GameApp.eventManager.removeListener(EventNames.EVENT_FLASH);
    GameApp.eventManager.removeListener(EventNames.EVENT_RESUME_HEALTH);
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_STAR_SHOW);
  },
  init: function init() {
    // this.schedule(() => {
    //     console.log(GameApp.dataManager.userData.choosedSkinId)
    //     GameApp.dataManager.setSkinId(GameApp.dataManager.userData.choosedSkinId += 1)
    // }, 2);
    if (GameApp.dataManager.globalData.isInGame) {
      this.roleProtect();
    }

    this.skinData = GameApp.dataManager.jsonData.SkinsData[GameApp.dataManager.userData.choosedSkinId - 1];
    this.initNameShow();
    this.initSkinShow();
  },
  roleProtect: function roleProtect() {
    GameApp.audioManager.playEffect('noticeFindGun', 0.5);

    if (!this._haveGun) {
      this._isProtect = true;
      this.arrowNode.active = true;
    }

    this.node.opacity = 100;
  },
  theGameStart: function theGameStart() {
    this._isProtect = false;
    this.node.opacity = 255;
  },
  doFlash: function doFlash() {
    if (this._isDie) return;
    this.move(null, true);
  },
  doResumeHealth: function doResumeHealth() {
    if (this._isDie) return;
    this.resumeHealth(GameApp.dataManager.getResumeHealthNum());
  },
  resumeHealth: function resumeHealth(_num) {
    var _this = this;

    this.node.runAction(cc.sequence(cc.callFunc(function () {
      GameApp.uiManager.showGameObject("InfoLabel", function (node) {
        node.getComponent(cc.RichText).string = "<b><color=green>+" + _num + "</color></b>";
        var init = cc.callFunc(function () {
          GameApp.dataManager.addHp(_num);
          node.setPosition(0, 110);
        });
        var seq = cc.sequence(init, cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0, 1.5), cc.moveTo(0.3, cc.v2(0, 190))), cc.fadeOut(0.3), cc.callFunc(function () {
          node.destroy();
        }));
        node.runAction(seq);
      }, _this.node);
    }), cc.delayTime(0.3)).repeat(4));
  },
  updateStarShow: function updateStarShow() {
    var _sum = 0;

    for (var i = 0; i < 4; i++) {
      _sum += GameApp.dataManager.globalData.getItemAttrArr[i].rank;
    }

    if (_sum == 0) {
      // console.log("没有星")
      this.starNode.active = false;
    } else {
      var level = parseInt((_sum - 1) / 3);
      var starNum = _sum - level * 3; // console.log(level)
      // console.log(starNum)

      this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = GameApp.uiManager.commonAtlas.getSpriteFrame("level_bg_" + (level + 1));
      this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = GameApp.uiManager.commonAtlas.getSpriteFrame("level_star_" + (level + 1) + "_" + starNum);
      this.starNode.active = true; // console.log(this.starNode)
    }
  },
  initNameShow: function initNameShow() {
    this.nameUI.string = GameApp.dataManager.userData.playerName; // var colorIndex = Math.floor((this.skinData.skinid - 1) / 5)
    // this.nameUI.node.color = new cc.Color().fromHEX(NameColor[colorIndex]);
  },
  initSkinShow: function initSkinShow() {
    if (GameApp.dataManager.userData.choosedSkinId < 21) {
      this.roleAnim.skeletonData = GameApp.uiManager.normalSkinData;
      this.roleAnim.setSkin(this.skinData.skinname);
    } else {
      this.roleAnim.skeletonData = GameApp.uiManager.advanceSkinDataGroup[GameApp.dataManager.userData.choosedSkinId - 21];
    }

    var arr = GameApp.dataManager.userData.choosedSkinId < 21 ? ['await'] : ['await_fight_1'];
    this.roleAnim.setAnimation(0, arr[0], true);
  },
  updatePlayerTopBarShow: function updatePlayerTopBarShow() {
    this.hpBar.progress = GameApp.dataManager.globalData.curHp / GameApp.dataManager.globalData.maxHp;
    this.amoBar.progress = GameApp.dataManager.globalData.curAmoNum / GameApp.dataManager.globalData.maxAmoNum;
  },
  // methods
  move: function move(dt, _flash) {
    if (_flash) {
      var _borderGroup = GameApp.uiManager.getGame("GameMap").getComponent("GameMap").enemySpawnPosGroupNode.children; // console.log(_borderGroup)

      var newPos1 = this.node.position.add(this.moveDir.mul(1000));

      if (newPos1.x < _borderGroup[0].x) {
        newPos1.x = _borderGroup[0].x;
      }

      if (newPos1.x > _borderGroup[1].x) {
        newPos1.x = _borderGroup[1].x;
      }

      if (newPos1.y > _borderGroup[0].y) {
        newPos1.y = _borderGroup[0].y;
      }

      if (newPos1.y < _borderGroup[2].y) {
        newPos1.y = _borderGroup[2].y;
      }

      this.node.setPosition(newPos1);
      GameApp.audioManager.playEffect('flash');
      return;
    }

    if (this._moveSpeed != 0) {
      this._stepTimer -= dt;

      if (this._stepTimer < 0) {
        this._stepTimer = this._stepInterval;
        GameApp.audioManager.playEffect('run', 0.3);
      }
    }

    var theAngle = 90 - cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x));

    if (theAngle > 180 || theAngle < 0) {
      this.roleAnim.node.scaleX = -1;
    } else {
      this.roleAnim.node.scaleX = 1;
    }

    var newPos = this.node.position.add(this.moveDir.mul(this._moveSpeed * dt));
    this.node.setPosition(newPos);
    GameApp.eventManager.emit(EventNames.EVENT_UPDATE_MIPMAP_PLAYER, cc.v2(this.node.x / 50, this.node.y / 50)); // this.roleAnim.node.setPosition(0, 0)
  },
  setSpeedType: function setSpeedType(_type) {
    if (this._isDie) return;

    if (this._speedType != _type) {
      this._speedType = _type;
      var arr = GameApp.dataManager.userData.choosedSkinId < 21 ? ['await', 'run2', 'run2'] : ['await_fight_1', 'run', 'run'];
      this.roleAnim && this.roleAnim.setAnimation(0, arr[_type], true);
    }
  },
  setDir: function setDir(_dir) {
    if (this._isDie) return;
    this.moveDir = _dir;
    if (this._isAim) return;
    this.setGunDir(_dir);
  },
  setGunDir: function setGunDir(_dir) {
    if (!this._haveGun) return;
    if (!this.gunNode) return;

    if (_dir == null) {
      _dir = this.moveDir;
    }

    this._gunDir = _dir;
    this.gunNode.rotation = -cc.misc.radiansToDegrees(Math.atan2(_dir.y, _dir.x));
    var theAngle = 90 - this.gunNode.rotation;

    if (theAngle > 180 || theAngle < 0) {
      this.gunNode.scaleY = -1;
    } else {
      this.gunNode.scaleY = 1;
    }
  },
  setArrowDir: function setArrowDir(_dir) {
    this.arrowNode.setPosition(cc.v2(this.arrowNode.parent.position).add(_dir.mul(100)));
    this.arrowNode.children[0].children[0].setPosition(cc.v2(this.arrowNode.children[0].position).add(_dir.mul(30)));
    this.arrowNode.children[0].children[0].rotation = -cc.misc.radiansToDegrees(Math.atan2(_dir.y, _dir.x));
  },
  update: function update(dt) {
    if (this._isDie) return;

    if (GameApp.dataManager.globalData.isInGame) {
      GameApp.dataManager.globalData.lifeTime += dt;
    }

    switch (this._speedType) {
      case _JoystickCommon.SpeedType.STOP:
        this._moveSpeed = this.stopSpeed;
        break;

      case _JoystickCommon.SpeedType.NORMAL:
        this._moveSpeed = GameApp.dataManager.globalData.curSpeed; // this._moveSpeed = this.fastSpeed;

        break;

      case _JoystickCommon.SpeedType.FAST:
        this._moveSpeed = GameApp.dataManager.globalData.curSpeed + Math.floor(GameApp.dataManager.globalData.curSpeed * GameApp.dataManager.getEquipItemAttr(EquipType.speed));
        break;

      default:
        break;
    }

    this.move(dt);
    this.checkGas(dt);

    if (!this._haveGun && !this._mapNoGun) {
      this._aimTimer -= dt;

      if (this._aimTimer < 0) {
        this._aimTimer = this._aimInterval;
        this.arrowToNearestGun();
      }
    }

    if (this._isProtect) return;

    if (this._isAim) {
      this._aimTimer -= dt;

      if (this._aimTimer < 0) {
        this._aimTimer = this._aimInterval;
        this.aimToNearest();
      }
    } else {
      this._aimTimer = 0;
    }
  },
  lateUpdate: function lateUpdate(dt) {
    // this.mainC.node.setPosition(this.player.position)
    // this.testC.node.setPosition(this.player.position)
    GameApp.uiManager.mapCamera.node.setPosition(this.node.position); // this.mipmapCamera.node.setPosition(this.node.position)
  },
  checkGas: function checkGas(dt) {
    if (GameApp.dataManager.globalData.gasConfig != null) {
      var distance = cc.v2(GameApp.dataManager.globalData.gasConfig.safePosition).sub(cc.v2(this.node.position)).mag();

      if (distance > GameApp.dataManager.globalData.gasConfig.gasCircle / 2) {
        this._inGasTimer -= dt;

        if (this._inGasTimer < 0) {
          this._inGasTimer = this._inGasInterval;
          this.beDamage(5, -1);
        }

        this._isGas = true;
      } else {
        this._isGas = false;
      }
    } else {
      this._isGas = false;
    }
  },
  aimState: function aimState(event) {
    if (this._isDie) return;
    if (!this._haveGun) return;
    this._isAim = event;

    if (this._isAim) {
      this.aimToNearest();
    }
  },
  aimToNearest: function aimToNearest() {
    var allRoleArr = GameApp.dataManager.globalData.allRoleArr.concat(); // for (let i = 0; i < allRoleArr.length; i++) {
    //     if (allRoleArr[i].skinData.skinid == this.skinData.skinid) {
    //         allRoleArr.splice(i, 1)
    //         break
    //     }
    // }

    Tools.removeArray(allRoleArr, this.getComponent("Player"));
    var minDis = 1000000;
    var index = -1;

    for (var i = 0; i < allRoleArr.length; i++) {
      // if (GameApp.uiManager.isInMapSight(allRoleArr[i].node)) {
      var distance = cc.v2(allRoleArr[i].node.position).sub(cc.v2(this.node.position)).mag();

      if (distance < minDis && distance < this.gunData.range * 1.4) {
        minDis = distance;
        index = i;
      } // }

    }

    var dir = null;

    if (index == -1) {
      this._isAim = false;
    } else {
      this._isAim = true;
      var aimEnemy = allRoleArr[index].node;
      dir = cc.v2(aimEnemy.position).sub(cc.v2(this.node.position)).normalize();
    }

    this.setGunDir(dir);
  },
  arrowToNearestGun: function arrowToNearestGun() {
    var allGunArr = GameApp.dataManager.globalData.allGunArr.concat();
    var minDis = 1000000;
    var index = -1;

    for (var i = 0; i < allGunArr.length; i++) {
      var distance = cc.v2(allGunArr[i].position).sub(cc.v2(this.node.position)).mag();

      if (distance < minDis) {
        minDis = distance;
        index = i;
      }
    }

    var dir = null;

    if (index == -1) {
      this._mapNoGun = true;
      this.arrowNode.active = false;
    } else {
      var aimGun = allGunArr[index];
      dir = cc.v2(aimGun.position).sub(cc.v2(this.node.position)).normalize();
      this.setArrowDir(dir);
    }
  },
  shoot: function shoot() {
    if (this._isDie) return;
    if (!this._haveGun) return;

    if (GameApp.dataManager.reduceAmo()) {
      this.gunAnim.setAnimation(0, 'attack_' + this.gunData.skinname, false);
      var power = Math.ceil(this.gunData.power * (GameApp.dataManager.globalData.curDamage + GameApp.dataManager.getEquipItemAttr(EquipType.damage)));
      var isCrit = false;

      if (Tools.isCrit(GameApp.dataManager.globalData.curCrit + GameApp.dataManager.getEquipItemAttr(EquipType.crit))) {
        power *= 2;
        isCrit = true;
      }

      if (this.gunData.weaponid == 1002) {
        GameApp.audioManager.playEffect('shot_shoot', 0.6);
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
        bulletC1._belongName = GameApp.dataManager.userData.playerName;
        bulletC1._flyDir = cloneGunDir;
        bulletC1.init(this.gunData, power, isCrit);
        var bulletC2 = bullet2.getComponent('Bullet');
        bulletC2._belongTag = this._pbc.tag;
        bulletC2._belongName = GameApp.dataManager.userData.playerName;
        bulletC2._flyDir = cloneGunDir.rotate(-cc.misc.degreesToRadians(30));
        bulletC2.init(this.gunData, power, isCrit);
        var bulletC3 = bullet3.getComponent('Bullet');
        bulletC3._belongTag = this._pbc.tag;
        bulletC3._belongName = GameApp.dataManager.userData.playerName;
        bulletC3._flyDir = cloneGunDir.rotate(-cc.misc.degreesToRadians(-30));
        bulletC3.init(this.gunData, power, isCrit);
      } else {
        if (this.gunData.weaponid == 1003 || this.gunData.weaponid == 1103) {
          GameApp.audioManager.playEffect('charge_shoot', 0.6);
        } else if (this.gunData.weaponid == 1005 || this.gunData.weaponid == 1105) {
          GameApp.audioManager.playEffect('missile_shoot', 0.6);
        } else if (this.gunData.weaponid == 1102) {
          GameApp.audioManager.playEffect('shot_shoot', 0.6);
        }

        var bullet = cc.instantiate(this.bulletPrefab);

        var _bulletPos = this.node.parent.parent.convertToNodeSpaceAR(this.gunNode.children[0].convertToWorldSpaceAR(cc.v2(0, 0)));

        bullet.parent = this.node.parent.parent;
        bullet.setPosition(_bulletPos);
        bullet.rotation = this.gunNode.rotation;
        var bulletC = bullet.getComponent('Bullet');
        bulletC._belongTag = this._pbc.tag;
        bulletC._belongName = GameApp.dataManager.userData.playerName;
        bulletC._flyDir = this._gunDir;
        bulletC.init(this.gunData, power, isCrit);
      }

      this.updatePlayerTopBarShow();
    } else {
      GameApp.uiManager.getUI(GameApp.uiManager.uiRoot.children[0].name).getComponent(GameApp.uiManager.uiRoot.children[0].name).reloadBtnClick();
    }

    if (GameApp.dataManager.globalData.curAmoNum == 0) {
      GameApp.uiManager.getUI(GameApp.uiManager.uiRoot.children[0].name).getComponent(GameApp.uiManager.uiRoot.children[0].name).reloadBtnClick();
    }
  },
  reload: function reload() {
    if (this._isDie) return;
    if (!this._haveGun) return;
    GameApp.audioManager.playEffect('reload', 0.6);
    this.gunAnim.setAnimation(0, 'reload_' + this.gunData.skinname, false);
  },
  equipWeapon: function equipWeapon(_kind) {
    GameApp.audioManager.playEffect('pick_item', 0.6);
    this.gunData = GameApp.dataManager.jsonData.WeaponData[_kind];
    this._haveGun = true;
    this.arrowNode.active = false;
    GameApp.eventManager.emit(EventNames.EVENT_SHOW_RELOAD_UI, true);
    GameApp.dataManager.globalData.shootInterval = this.gunData.shootdelay;
    GameApp.dataManager.globalData.reloadInterval = this.gunData.reloaddelay;
    GameApp.dataManager.globalData.maxAmoNum = this.gunData.clipnum;
    GameApp.dataManager.reloadAmo();
    this.gunNode.active = true;

    if (_kind < 3) {
      this.gunAnim.skeletonData = GameApp.uiManager.gunSkinDataGroup[0];
    } else {
      this.gunAnim.skeletonData = GameApp.uiManager.gunSkinDataGroup[1];
    }

    this.gunAnim.setSkin(this.gunData.skinname);
    this.setGunDir(this.moveDir); // this.gunAnim.setAnimation(0, 'attack_' + this.gunData.skinname, false)
  },
  getItem: function getItem() {},
  onBeginContact: function onBeginContact(contact, self, other) {
    if (self.tag == Tags.empty) return;

    if (other.tag == Tags.item) {
      var groundItem = other.node.getComponent('GroundItem');

      if (groundItem.itemType._type == ItemType.weapon) {
        this.tempGroundWeapon = groundItem;

        if (!this._haveGun) {
          Tools.removeArray(GameApp.dataManager.globalData.allGunArr, other.node);
          this.pickUpWeapon();
        } else {
          GameApp.eventManager.emit(EventNames.EVENT_SHOW_GUN_UI, true, GameApp.dataManager.jsonData.WeaponData[groundItem.itemType._kind]);
        } // var _kind = groundItem.itemType._kind
        // if (!this._haveGun) {
        //     other.node.destroy()
        // } else {
        //     let _param = {
        //         _type: ItemType.weapon,
        //         _kind: GameApp.dataManager.jsonData.WeaponData.indexOf(this.gunData)
        //     }
        //     groundItem.init(_param)
        // }
        // this.equipWeapon(_kind)

      } else if (groundItem.itemType._type == ItemType.item) {
        this.getItem();
      }
    } else if (other.tag == Tags.bullet) {
      if (!GameApp.dataManager.globalData.isInGame) return;
      if (this._isDie) return;
      var bC = other.node.getComponent('Bullet');
      if (bC._belongTag == self.tag) return;
      if (other.node == this.lastHitBullet) return;
      this.lastHitBullet = other.node;
      this.beDamage(bC._power, bC._belongTag, bC._belongName, bC._isCrit);
    } else if (other.tag == Tags.boom) {
      if (this._isDie) return;
      this.beDamage(999, -2);
    }
  },
  onEndContact: function onEndContact(contact, self, other) {
    if (self.tag == Tags.empty) return;

    if (other.tag == Tags.item) {
      var groundItem = other.node.getComponent('GroundItem');

      if (groundItem.itemType._type == ItemType.weapon) {
        // console.log("初始化")
        this.tempGroundWeapon = null;
        GameApp.eventManager.emit(EventNames.EVENT_SHOW_GUN_UI, false);
      } else if (groundItem.itemType._type == ItemType.item) {}
    }
  },
  pickUpWeapon: function pickUpWeapon() {
    var _kind = this.tempGroundWeapon.itemType._kind;

    if (!this._haveGun) {
      this.tempGroundWeapon.node.destroy();
    } else {
      var _param = {
        _type: ItemType.weapon,
        _kind: GameApp.dataManager.jsonData.WeaponData.indexOf(this.gunData)
      };
      this.tempGroundWeapon.init(_param);
      GameApp.eventManager.emit(EventNames.EVENT_SHOW_GUN_UI, true, this.gunData);
    }

    this.equipWeapon(_kind);
  },
  beDamage: function beDamage(_power, _belongIndex, _belongName, _isCrit) {
    var _this2 = this;

    GameApp.uiManager.showGameObject("InfoLabel", function (node) {
      var originPos = node.parent.convertToNodeSpaceAR(_this2.node.convertToWorldSpaceAR(cc.v2(0.5, 0.5)));
      node.setPosition(originPos); //皮肤减伤+装备减伤

      var _isDef = Math.ceil(_power * GameApp.dataManager.globalData.curDef) + Math.ceil(_power * GameApp.dataManager.getEquipItemAttr(EquipType.def));

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
    }, this.node.parent.parent);

    if (GameApp.dataManager.reduceHp(_power)) {// console.log('收到子弹攻击')
    } else {
      // console.log('死掉了!!!!!!')
      GameApp.audioManager.playEffect('maleDeath', 0.5);
      this.node.parent = GameApp.uiManager.getGame("GameMap").getChildByName("DeadObjectNode");
      this._pbc.enabled = false;
      this._isDie = true;

      if (_belongIndex == -1) {
        GameApp.uiManager.showToast(GameApp.dataManager.userData.playerName + " 被毒出局");
      } else if (_belongIndex == -2) {
        GameApp.uiManager.showToast(GameApp.dataManager.userData.playerName + " 被轰炸出局");
      } else {
        var killNum = GameApp.dataManager.addKillNum(_belongIndex, _belongName);

        if (killNum > 1) {
          var soundIndex = killNum > 5 ? 5 : killNum;
          GameApp.audioManager.playEffect('kill' + soundIndex, 0.5);
          GameApp.uiManager.showToast(_belongName, null, killNum);
        } else {
          GameApp.uiManager.showToast(_belongName + " 击杀了 " + GameApp.dataManager.userData.playerName);
        }
      } // for (var i in GameApp.dataManager.globalData.allRoleArr) {
      //     if (GameApp.dataManager.globalData.allRoleArr[i].skinData.skinid == this.skinData.skinid) {
      //         GameApp.dataManager.globalData.allRoleArr.splice(i, 1)
      //         break
      //     }
      // }


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

      var arr = GameApp.dataManager.userData.choosedSkinId < 21 ? ['dead'] : ['dead2'];
      this.roleAnim.setAnimation(0, arr[0], false);
      this.gunNode.active = false;
      Tools.removeArray(GameApp.dataManager.globalData.allRoleArr, this.node.getComponent('Player'));
      var theRank = GameApp.dataManager.globalData.allRoleArr.length;
      GameApp.uiManager.getPopup("OverPopup") == null && GameApp.uiManager.showPopup("OverPopup", function (node) {
        node.getComponent("OverPopup").init(false, theRank + 1);
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcUGxheWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibW92ZURpciIsInYyIiwiZGlzcGxheU5hbWUiLCJ0b29sdGlwIiwiX3NwZWVkVHlwZSIsIlNwZWVkVHlwZSIsIlNUT1AiLCJ0eXBlIiwiX21vdmVTcGVlZCIsInN0b3BTcGVlZCIsIkludGVnZXIiLCJyb2xlQW5pbSIsInNwIiwiU2tlbGV0b24iLCJfZ3VuRGlyIiwiZ3VuQW5pbSIsImd1bk5vZGUiLCJOb2RlIiwiX2hhdmVHdW4iLCJndW5EYXRhIiwic2tpbkRhdGEiLCJfcGJjIiwiUGh5c2ljc0JveENvbGxpZGVyIiwibmFtZVVJIiwiTGFiZWwiLCJidWxsZXRQcmVmYWIiLCJQcmVmYWIiLCJ0ZW1wR3JvdW5kV2VhcG9uIiwiaHBCYXIiLCJQcm9ncmVzc0JhciIsImFtb0JhciIsInN0YXJOb2RlIiwibGFzdEhpdEJ1bGxldCIsIl9pc0FpbSIsIl9haW1UaW1lciIsIl9haW1JbnRlcnZhbCIsIl9zdGVwVGltZXIiLCJfc3RlcEludGVydmFsIiwiX2lzRGllIiwiYXJyb3dOb2RlIiwiX21hcE5vR3VuIiwiX2lzUHJvdGVjdCIsIl9pc0dhcyIsIl9pbkdhc1RpbWVyIiwiX2luR2FzSW50ZXJ2YWwiLCJvbkxvYWQiLCJHYW1lQXBwIiwiZXZlbnRNYW5hZ2VyIiwib24iLCJFdmVudE5hbWVzIiwiRVZFTlRfUExBWUVSX1NIT09UIiwic2hvb3QiLCJiaW5kIiwiRVZFTlRfUExBWUVSX1JFTE9BRCIsInJlbG9hZCIsIkVWRU5UX1BJQ0tVUF9XRUFQT04iLCJwaWNrVXBXZWFwb24iLCJFVkVOVF9VUERBVEVfVE9QQkFSX1NIT1ciLCJ1cGRhdGVQbGF5ZXJUb3BCYXJTaG93IiwiRVZFTlRfQUlNIiwiYWltU3RhdGUiLCJFVkVOVF9USEVHQU1FU1RBUlQiLCJ0aGVHYW1lU3RhcnQiLCJFVkVOVF9GTEFTSCIsImRvRmxhc2giLCJFVkVOVF9SRVNVTUVfSEVBTFRIIiwiZG9SZXN1bWVIZWFsdGgiLCJFVkVOVF9VUERBVEVfU1RBUl9TSE9XIiwidXBkYXRlU3RhclNob3ciLCJnZXRDb21wb25lbnQiLCJ0YWciLCJUYWdzIiwicGxheWVyIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJvbkRlc3Ryb3kiLCJyZW1vdmVMaXN0ZW5lciIsImluaXQiLCJkYXRhTWFuYWdlciIsImdsb2JhbERhdGEiLCJpc0luR2FtZSIsInJvbGVQcm90ZWN0IiwianNvbkRhdGEiLCJTa2luc0RhdGEiLCJ1c2VyRGF0YSIsImNob29zZWRTa2luSWQiLCJpbml0TmFtZVNob3ciLCJpbml0U2tpblNob3ciLCJhdWRpb01hbmFnZXIiLCJwbGF5RWZmZWN0IiwiYWN0aXZlIiwibm9kZSIsIm9wYWNpdHkiLCJtb3ZlIiwicmVzdW1lSGVhbHRoIiwiZ2V0UmVzdW1lSGVhbHRoTnVtIiwiX251bSIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiY2FsbEZ1bmMiLCJ1aU1hbmFnZXIiLCJzaG93R2FtZU9iamVjdCIsIlJpY2hUZXh0Iiwic3RyaW5nIiwiYWRkSHAiLCJzZXRQb3NpdGlvbiIsInNlcSIsInNwYXduIiwiZmFkZUluIiwic2NhbGVUbyIsIm1vdmVUbyIsImZhZGVPdXQiLCJkZXN0cm95IiwiZGVsYXlUaW1lIiwicmVwZWF0IiwiX3N1bSIsImkiLCJnZXRJdGVtQXR0ckFyciIsInJhbmsiLCJsZXZlbCIsInBhcnNlSW50Iiwic3Rhck51bSIsImNoaWxkcmVuIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJjb21tb25BdGxhcyIsImdldFNwcml0ZUZyYW1lIiwicGxheWVyTmFtZSIsInNrZWxldG9uRGF0YSIsIm5vcm1hbFNraW5EYXRhIiwic2V0U2tpbiIsInNraW5uYW1lIiwiYWR2YW5jZVNraW5EYXRhR3JvdXAiLCJhcnIiLCJzZXRBbmltYXRpb24iLCJwcm9ncmVzcyIsImN1ckhwIiwibWF4SHAiLCJjdXJBbW9OdW0iLCJtYXhBbW9OdW0iLCJkdCIsIl9mbGFzaCIsIl9ib3JkZXJHcm91cCIsImdldEdhbWUiLCJlbmVteVNwYXduUG9zR3JvdXBOb2RlIiwibmV3UG9zMSIsInBvc2l0aW9uIiwiYWRkIiwibXVsIiwieCIsInkiLCJ0aGVBbmdsZSIsIm1pc2MiLCJyYWRpYW5zVG9EZWdyZWVzIiwiTWF0aCIsImF0YW4yIiwic2NhbGVYIiwibmV3UG9zIiwiZW1pdCIsIkVWRU5UX1VQREFURV9NSVBNQVBfUExBWUVSIiwic2V0U3BlZWRUeXBlIiwiX3R5cGUiLCJzZXREaXIiLCJfZGlyIiwic2V0R3VuRGlyIiwicm90YXRpb24iLCJzY2FsZVkiLCJzZXRBcnJvd0RpciIsInBhcmVudCIsInVwZGF0ZSIsImxpZmVUaW1lIiwiTk9STUFMIiwiY3VyU3BlZWQiLCJGQVNUIiwiZmxvb3IiLCJnZXRFcXVpcEl0ZW1BdHRyIiwiRXF1aXBUeXBlIiwic3BlZWQiLCJjaGVja0dhcyIsImFycm93VG9OZWFyZXN0R3VuIiwiYWltVG9OZWFyZXN0IiwibGF0ZVVwZGF0ZSIsIm1hcENhbWVyYSIsImdhc0NvbmZpZyIsImRpc3RhbmNlIiwic2FmZVBvc2l0aW9uIiwic3ViIiwibWFnIiwiZ2FzQ2lyY2xlIiwiYmVEYW1hZ2UiLCJldmVudCIsImFsbFJvbGVBcnIiLCJjb25jYXQiLCJUb29scyIsInJlbW92ZUFycmF5IiwibWluRGlzIiwiaW5kZXgiLCJsZW5ndGgiLCJyYW5nZSIsImRpciIsImFpbUVuZW15Iiwibm9ybWFsaXplIiwiYWxsR3VuQXJyIiwiYWltR3VuIiwicmVkdWNlQW1vIiwicG93ZXIiLCJjZWlsIiwiY3VyRGFtYWdlIiwiZGFtYWdlIiwiaXNDcml0IiwiY3VyQ3JpdCIsImNyaXQiLCJ3ZWFwb25pZCIsImJ1bGxldDEiLCJpbnN0YW50aWF0ZSIsImJ1bGxldDIiLCJidWxsZXQzIiwiYnVsbGV0UG9zIiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJjbG9uZUd1bkRpciIsImJ1bGxldEMxIiwiX2JlbG9uZ1RhZyIsIl9iZWxvbmdOYW1lIiwiX2ZseURpciIsImJ1bGxldEMyIiwicm90YXRlIiwiZGVncmVlc1RvUmFkaWFucyIsImJ1bGxldEMzIiwiYnVsbGV0IiwiYnVsbGV0QyIsImdldFVJIiwidWlSb290IiwibmFtZSIsInJlbG9hZEJ0bkNsaWNrIiwiZXF1aXBXZWFwb24iLCJfa2luZCIsIldlYXBvbkRhdGEiLCJFVkVOVF9TSE9XX1JFTE9BRF9VSSIsInNob290SW50ZXJ2YWwiLCJzaG9vdGRlbGF5IiwicmVsb2FkSW50ZXJ2YWwiLCJyZWxvYWRkZWxheSIsImNsaXBudW0iLCJyZWxvYWRBbW8iLCJndW5Ta2luRGF0YUdyb3VwIiwiZ2V0SXRlbSIsIm9uQmVnaW5Db250YWN0IiwiY29udGFjdCIsInNlbGYiLCJvdGhlciIsImVtcHR5IiwiaXRlbSIsImdyb3VuZEl0ZW0iLCJpdGVtVHlwZSIsIkl0ZW1UeXBlIiwid2VhcG9uIiwiRVZFTlRfU0hPV19HVU5fVUkiLCJiQyIsIl9wb3dlciIsIl9pc0NyaXQiLCJib29tIiwib25FbmRDb250YWN0IiwiX3BhcmFtIiwiaW5kZXhPZiIsIl9iZWxvbmdJbmRleCIsIm9yaWdpblBvcyIsIl9pc0RlZiIsImN1ckRlZiIsImRlZiIsInN0ciIsImRlc1BvcyIsInJhbmRvbU51bSIsImJlemllciIsImJlemllclRvIiwicmVkdWNlSHAiLCJnZXRDaGlsZEJ5TmFtZSIsImVuYWJsZWQiLCJzaG93VG9hc3QiLCJraWxsTnVtIiwiYWRkS2lsbE51bSIsInNvdW5kSW5kZXgiLCJ0aGVQYXJlbnRDIiwiZ2FtZVJvb3QiLCJkZGQiLCJhbGxHdW5Ob2RlIiwiZ2V0SW5kZXgiLCJwdXNoIiwidGhlUmFuayIsImdldFBvcHVwIiwic2hvd1BvcHVwIiwiRVZFTlRfU0hPV19BTExST0xFTlVNX1VJIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUVMQyxFQUFBQSxVQUFV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Q0FBQ3RCLFlBQUwsQ0FBa0IsV0FBbEIsRUFBK0JRLElBQS9CLENBQW9DLEtBQXBDLEVBQTJDbU4sT0FBTyxHQUFHLENBQXJEO0FBQ0gsT0FGa0QsQ0FBbkQ7QUFHQWxQLE1BQUFBLE9BQU8sQ0FBQ0MsWUFBUixDQUFxQitHLElBQXJCLENBQTBCN0csVUFBVSxDQUFDa1Asd0JBQXJDO0FBRUg7QUFDSjtBQTdvQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3BlZWRUeXBlIH0gZnJvbSAnSm95c3RpY2tDb21tb24nXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgICAgIC8vIGZyb20gam95c3RpY2tcclxuICAgICAgICBtb3ZlRGlyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLnYyKDEsIDApLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ01vdmUgRGlyJyxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+enu+WKqOaWueWQkScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfc3BlZWRUeXBlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFNwZWVkVHlwZS5TVE9QLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NwZWVkIFR5cGUnLFxyXG4gICAgICAgICAgICB0eXBlOiBTcGVlZFR5cGUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfpgJ/luqbnuqfliKsnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gZnJvbSBzZWxmXHJcbiAgICAgICAgX21vdmVTcGVlZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ01vdmUgU3BlZWQnLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn56e75Yqo6YCf5bqmJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BTcGVlZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn5YGc5q2i5pe26YCf5bqmJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gbm9ybWFsU3BlZWQ6IHsvL+aaguaXtuS4jeeUqFxyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OiAxMDAsXHJcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgLy8gICAgIHRvb2x0aXA6ICfmraPluLjpgJ/luqYnXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBmYXN0U3BlZWQ6IHsvL+aaguaXtuS4jeeUqFxyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OiAyMDAsXHJcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgLy8gICAgIHRvb2x0aXA6ICfmnIDlv6vpgJ/luqYnXHJcbiAgICAgICAgLy8gfSxcclxuXHJcbiAgICAgICAgcm9sZUFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogc3AuU2tlbGV0b24sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfop5LoibLnmoRTcGluZeWKqOeUu+e7hOS7ticsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZ3VuRGlyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLnYyKDEsIDApLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ3VuQW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBzcC5Ta2VsZXRvbixcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+aequeahFNwaW5l5Yqo55S757uE5Lu2JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGd1bk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+aequiKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfaGF2ZUd1bjogZmFsc2UsXHJcbiAgICAgICAgZ3VuRGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2tpbkRhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDoge31cclxuICAgICAgICB9LFxyXG4gICAgICAgIF9wYmM6IGNjLlBoeXNpY3NCb3hDb2xsaWRlcixcclxuICAgICAgICBuYW1lVUk6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiLFxyXG5cclxuICAgICAgICB0ZW1wR3JvdW5kV2VhcG9uOiBudWxsLFxyXG5cclxuICAgICAgICBocEJhcjogY2MuUHJvZ3Jlc3NCYXIsXHJcbiAgICAgICAgYW1vQmFyOiBjYy5Qcm9ncmVzc0JhcixcclxuXHJcbiAgICAgICAgc3Rhck5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgbGFzdEhpdEJ1bGxldDogbnVsbCwgLy/pgb/lhY3ooqvngavnrq3nrZLnmoTniIbngrjojIPlm7TmiJblr7zlvLnlpLTph43lpI3orqHnrpfkvKTlrrNcclxuICAgICAgICBfaXNBaW06IGZhbHNlLC8v556E5YeG54q25oCB77yM5q2k54q25oCB5LiL5p6q5LiN5Y+v6Ieq5Li76L2s5ZCR77yM6YG/5YWN6ay855WcXHJcbiAgICAgICAgX2FpbVRpbWVyOiAwLFxyXG4gICAgICAgIF9haW1JbnRlcnZhbDogMC4wNSxcclxuICAgICAgICBfc3RlcFRpbWVyOiAwLFxyXG4gICAgICAgIF9zdGVwSW50ZXJ2YWw6IDAuMyxcclxuICAgICAgICBfaXNEaWU6IGZhbHNlLFxyXG4gICAgICAgIGFycm93Tm9kZTogY2MuTm9kZSxcclxuICAgICAgICBfbWFwTm9HdW46IGZhbHNlLFxyXG4gICAgICAgIF9pc1Byb3RlY3Q6IGZhbHNlLFxyXG4gICAgICAgIF9pc0dhczogZmFsc2UsXHJcbiAgICAgICAgX2luR2FzVGltZXI6IDAsXHJcbiAgICAgICAgX2luR2FzSW50ZXJ2YWw6IDAuNSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9QTEFZRVJfU0hPT1QsIHRoaXMuc2hvb3QuYmluZCh0aGlzKSlcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5vbihFdmVudE5hbWVzLkVWRU5UX1BMQVlFUl9SRUxPQUQsIHRoaXMucmVsb2FkLmJpbmQodGhpcykpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9QSUNLVVBfV0VBUE9OLCB0aGlzLnBpY2tVcFdlYXBvbi5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfVVBEQVRFX1RPUEJBUl9TSE9XLCB0aGlzLnVwZGF0ZVBsYXllclRvcEJhclNob3cuYmluZCh0aGlzKSlcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5vbihFdmVudE5hbWVzLkVWRU5UX0FJTSwgdGhpcy5haW1TdGF0ZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfVEhFR0FNRVNUQVJULCB0aGlzLnRoZUdhbWVTdGFydC5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfRkxBU0gsIHRoaXMuZG9GbGFzaC5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfUkVTVU1FX0hFQUxUSCwgdGhpcy5kb1Jlc3VtZUhlYWx0aC5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfVVBEQVRFX1NUQVJfU0hPVywgdGhpcy51cGRhdGVTdGFyU2hvdy5iaW5kKHRoaXMpKVxyXG4gICAgICAgIHRoaXMuX3BiYyA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcilcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl9wYmMpXHJcbiAgICAgICAgdGhpcy5fcGJjLnRhZyA9IFRhZ3MucGxheWVyXHJcbiAgICB9LFxyXG4gICAgb25FbmFibGUoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIG9uRGlzYWJsZSgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKEV2ZW50TmFtZXMuRVZFTlRfUExBWUVSX1NIT09UKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKEV2ZW50TmFtZXMuRVZFTlRfUExBWUVSX1JFTE9BRClcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX1BJQ0tVUF9XRUFQT04pXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfVE9QQkFSX1NIT1cpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9BSU0pXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9USEVHQU1FU1RBUlQpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9GTEFTSClcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX1JFU1VNRV9IRUFMVEgpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfU1RBUl9TSE9XKVxyXG5cclxuICAgIH0sXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmNob29zZWRTa2luSWQpXHJcbiAgICAgICAgLy8gICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuc2V0U2tpbklkKEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuY2hvb3NlZFNraW5JZCArPSAxKVxyXG4gICAgICAgIC8vIH0sIDIpO1xyXG4gICAgICAgIGlmIChHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuaXNJbkdhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlUHJvdGVjdCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2tpbkRhdGEgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLmpzb25EYXRhLlNraW5zRGF0YVtHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmNob29zZWRTa2luSWQgLSAxXVxyXG4gICAgICAgIHRoaXMuaW5pdE5hbWVTaG93KClcclxuICAgICAgICB0aGlzLmluaXRTa2luU2hvdygpXHJcblxyXG4gICAgfSxcclxuICAgIHJvbGVQcm90ZWN0KCkge1xyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ25vdGljZUZpbmRHdW4nLCAwLjUpXHJcbiAgICAgICAgaWYgKCF0aGlzLl9oYXZlR3VuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUHJvdGVjdCA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5hcnJvd05vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDEwMFxyXG4gICAgfSxcclxuICAgIHRoZUdhbWVTdGFydCgpIHtcclxuICAgICAgICB0aGlzLl9pc1Byb3RlY3QgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1XHJcbiAgICB9LFxyXG4gICAgZG9GbGFzaCgpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNEaWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLm1vdmUobnVsbCwgdHJ1ZSlcclxuICAgIH0sXHJcbiAgICBkb1Jlc3VtZUhlYWx0aCgpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNEaWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnJlc3VtZUhlYWx0aChHYW1lQXBwLmRhdGFNYW5hZ2VyLmdldFJlc3VtZUhlYWx0aE51bSgpKVxyXG4gICAgfSxcclxuICAgIHJlc3VtZUhlYWx0aChfbnVtKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dHYW1lT2JqZWN0KFwiSW5mb0xhYmVsXCIsIChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCI8Yj48Y29sb3I9Z3JlZW4+K1wiICsgX251bSArIFwiPC9jb2xvcj48L2I+XCJcclxuICAgICAgICAgICAgICAgIGxldCBpbml0ID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuYWRkSHAoX251bSlcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIDExMClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VxID0gY2Muc2VxdWVuY2UoaW5pdCwgY2Muc3Bhd24oY2MuZmFkZUluKDAuMiksIGNjLnNjYWxlVG8oMCwgMS41KSwgY2MubW92ZVRvKDAuMywgY2MudjIoMCwgMTkwKSkpLCBjYy5mYWRlT3V0KDAuMyksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICBub2RlLnJ1bkFjdGlvbihzZXEpXHJcbiAgICAgICAgICAgIH0sIHRoaXMubm9kZSlcclxuICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKDAuMykpLnJlcGVhdCg0KSlcclxuICAgIH0sXHJcbiAgICB1cGRhdGVTdGFyU2hvdygpIHtcclxuICAgICAgICB2YXIgX3N1bSA9IDBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBfc3VtICs9IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5nZXRJdGVtQXR0ckFycltpXS5yYW5rXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfc3VtID09IDApIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmsqHmnInmmJ9cIilcclxuICAgICAgICAgICAgdGhpcy5zdGFyTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IHBhcnNlSW50KChfc3VtIC0gMSkgLyAzKVxyXG4gICAgICAgICAgICB2YXIgc3Rhck51bSA9IF9zdW0gLSBsZXZlbCAqIDNcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGV2ZWwpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXJOdW0pXHJcbiAgICAgICAgICAgIHRoaXMuc3Rhck5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBHYW1lQXBwLnVpTWFuYWdlci5jb21tb25BdGxhcy5nZXRTcHJpdGVGcmFtZShcImxldmVsX2JnX1wiICsgKGxldmVsICsgMSkpXHJcbiAgICAgICAgICAgIHRoaXMuc3Rhck5vZGUuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBHYW1lQXBwLnVpTWFuYWdlci5jb21tb25BdGxhcy5nZXRTcHJpdGVGcmFtZShcImxldmVsX3N0YXJfXCIgKyAobGV2ZWwgKyAxKSArIFwiX1wiICsgc3Rhck51bSlcclxuICAgICAgICAgICAgdGhpcy5zdGFyTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3Rhck5vZGUpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGluaXROYW1lU2hvdygpIHtcclxuICAgICAgICB0aGlzLm5hbWVVSS5zdHJpbmcgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLnBsYXllck5hbWVcclxuICAgICAgICAvLyB2YXIgY29sb3JJbmRleCA9IE1hdGguZmxvb3IoKHRoaXMuc2tpbkRhdGEuc2tpbmlkIC0gMSkgLyA1KVxyXG4gICAgICAgIC8vIHRoaXMubmFtZVVJLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKE5hbWVDb2xvcltjb2xvckluZGV4XSk7XHJcbiAgICB9LFxyXG4gICAgaW5pdFNraW5TaG93KCkge1xyXG4gICAgICAgIGlmIChHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmNob29zZWRTa2luSWQgPCAyMSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVBbmltLnNrZWxldG9uRGF0YSA9IEdhbWVBcHAudWlNYW5hZ2VyLm5vcm1hbFNraW5EYXRhXHJcbiAgICAgICAgICAgIHRoaXMucm9sZUFuaW0uc2V0U2tpbih0aGlzLnNraW5EYXRhLnNraW5uYW1lKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUFuaW0uc2tlbGV0b25EYXRhID0gR2FtZUFwcC51aU1hbmFnZXIuYWR2YW5jZVNraW5EYXRhR3JvdXBbR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5jaG9vc2VkU2tpbklkIC0gMjFdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhcnIgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmNob29zZWRTa2luSWQgPCAyMSA/IFsnYXdhaXQnXSA6IFsnYXdhaXRfZmlnaHRfMSddXHJcbiAgICAgICAgdGhpcy5yb2xlQW5pbS5zZXRBbmltYXRpb24oMCwgYXJyWzBdLCB0cnVlKVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZVBsYXllclRvcEJhclNob3coKSB7XHJcbiAgICAgICAgdGhpcy5ocEJhci5wcm9ncmVzcyA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5jdXJIcCAvIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5tYXhIcFxyXG4gICAgICAgIHRoaXMuYW1vQmFyLnByb2dyZXNzID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmN1ckFtb051bSAvIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5tYXhBbW9OdW1cclxuICAgIH0sXHJcbiAgICAvLyBtZXRob2RzXHJcbiAgICBtb3ZlKGR0LCBfZmxhc2gpIHtcclxuICAgICAgICBpZiAoX2ZsYXNoKSB7XHJcbiAgICAgICAgICAgIHZhciBfYm9yZGVyR3JvdXAgPSBHYW1lQXBwLnVpTWFuYWdlci5nZXRHYW1lKFwiR2FtZU1hcFwiKS5nZXRDb21wb25lbnQoXCJHYW1lTWFwXCIpLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coX2JvcmRlckdyb3VwKVxyXG4gICAgICAgICAgICBsZXQgbmV3UG9zMSA9IHRoaXMubm9kZS5wb3NpdGlvbi5hZGQodGhpcy5tb3ZlRGlyLm11bCgxMDAwKSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdQb3MxLnggPCBfYm9yZGVyR3JvdXBbMF0ueCkge1xyXG4gICAgICAgICAgICAgICAgbmV3UG9zMS54ID0gX2JvcmRlckdyb3VwWzBdLnhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmV3UG9zMS54ID4gX2JvcmRlckdyb3VwWzFdLngpIHtcclxuICAgICAgICAgICAgICAgIG5ld1BvczEueCA9IF9ib3JkZXJHcm91cFsxXS54XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld1BvczEueSA+IF9ib3JkZXJHcm91cFswXS55KSB7XHJcbiAgICAgICAgICAgICAgICBuZXdQb3MxLnkgPSBfYm9yZGVyR3JvdXBbMF0ueVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdQb3MxLnkgPCBfYm9yZGVyR3JvdXBbMl0ueSkge1xyXG4gICAgICAgICAgICAgICAgbmV3UG9zMS55ID0gX2JvcmRlckdyb3VwWzJdLnlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obmV3UG9zMSk7XHJcbiAgICAgICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2ZsYXNoJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbW92ZVNwZWVkICE9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RlcFRpbWVyIC09IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RlcFRpbWVyIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RlcFRpbWVyID0gdGhpcy5fc3RlcEludGVydmFsXHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdydW4nLCAwLjMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRoZUFuZ2xlID0gOTAgLSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMoTWF0aC5hdGFuMih0aGlzLm1vdmVEaXIueSwgdGhpcy5tb3ZlRGlyLngpKVxyXG4gICAgICAgIGlmICh0aGVBbmdsZSA+IDE4MCB8fCB0aGVBbmdsZSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pbS5ub2RlLnNjYWxlWCA9IC0xXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pbS5ub2RlLnNjYWxlWCA9IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMubm9kZS5wb3NpdGlvbi5hZGQodGhpcy5tb3ZlRGlyLm11bCh0aGlzLl9tb3ZlU3BlZWQgKiBkdCkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihuZXdQb3MpO1xyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfTUlQTUFQX1BMQVlFUiwgY2MudjIodGhpcy5ub2RlLnggLyA1MCwgdGhpcy5ub2RlLnkgLyA1MCkpXHJcbiAgICAgICAgLy8gdGhpcy5yb2xlQW5pbS5ub2RlLnNldFBvc2l0aW9uKDAsIDApXHJcbiAgICB9LFxyXG4gICAgc2V0U3BlZWRUeXBlKF90eXBlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRGllKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuX3NwZWVkVHlwZSAhPSBfdHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zcGVlZFR5cGUgPSBfdHlwZVxyXG5cclxuICAgICAgICAgICAgdmFyIGFyciA9IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEuY2hvb3NlZFNraW5JZCA8IDIxID8gWydhd2FpdCcsICdydW4yJywgJ3J1bjInXSA6IFsnYXdhaXRfZmlnaHRfMScsICdydW4nLCAncnVuJ11cclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pbSAmJiB0aGlzLnJvbGVBbmltLnNldEFuaW1hdGlvbigwLCBhcnJbX3R5cGVdLCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXREaXIoX2Rpcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0RpZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubW92ZURpciA9IF9kaXJcclxuICAgICAgICBpZiAodGhpcy5faXNBaW0pIHJldHVybjtcclxuICAgICAgICB0aGlzLnNldEd1bkRpcihfZGlyKVxyXG4gICAgfSxcclxuICAgIHNldEd1bkRpcihfZGlyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9oYXZlR3VuKSByZXR1cm5cclxuICAgICAgICBpZiAoIXRoaXMuZ3VuTm9kZSkgcmV0dXJuXHJcbiAgICAgICAgaWYgKF9kaXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBfZGlyID0gdGhpcy5tb3ZlRGlyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2d1bkRpciA9IF9kaXJcclxuICAgICAgICB0aGlzLmd1bk5vZGUucm90YXRpb24gPSAtY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKFxyXG4gICAgICAgICAgICBNYXRoLmF0YW4yKF9kaXIueSwgX2Rpci54KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IHRoZUFuZ2xlID0gOTAgLSB0aGlzLmd1bk5vZGUucm90YXRpb25cclxuXHJcbiAgICAgICAgaWYgKHRoZUFuZ2xlID4gMTgwIHx8IHRoZUFuZ2xlIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmd1bk5vZGUuc2NhbGVZID0gLTFcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmd1bk5vZGUuc2NhbGVZID0gMVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXRBcnJvd0RpcihfZGlyKSB7XHJcbiAgICAgICAgdGhpcy5hcnJvd05vZGUuc2V0UG9zaXRpb24oY2MudjIodGhpcy5hcnJvd05vZGUucGFyZW50LnBvc2l0aW9uKS5hZGQoX2Rpci5tdWwoMTAwKSkpXHJcbiAgICAgICAgdGhpcy5hcnJvd05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uc2V0UG9zaXRpb24oY2MudjIodGhpcy5hcnJvd05vZGUuY2hpbGRyZW5bMF0ucG9zaXRpb24pLmFkZChfZGlyLm11bCgzMCkpKVxyXG4gICAgICAgIHRoaXMuYXJyb3dOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnJvdGF0aW9uID0gLWNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhcclxuICAgICAgICAgICAgTWF0aC5hdGFuMihfZGlyLnksIF9kaXIueClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0RpZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuaXNJbkdhbWUpIHtcclxuICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmxpZmVUaW1lICs9IGR0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fc3BlZWRUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU3BlZWRUeXBlLlNUT1A6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlU3BlZWQgPSB0aGlzLnN0b3BTcGVlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNwZWVkVHlwZS5OT1JNQUw6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlU3BlZWQgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuY3VyU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9tb3ZlU3BlZWQgPSB0aGlzLmZhc3RTcGVlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNwZWVkVHlwZS5GQVNUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZVNwZWVkID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmN1clNwZWVkICsgTWF0aC5mbG9vcihHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuY3VyU3BlZWQgKiBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdldEVxdWlwSXRlbUF0dHIoRXF1aXBUeXBlLnNwZWVkKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmUoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tHYXMoZHQpXHJcbiAgICAgICAgaWYgKCF0aGlzLl9oYXZlR3VuICYmICF0aGlzLl9tYXBOb0d1bikge1xyXG4gICAgICAgICAgICB0aGlzLl9haW1UaW1lciAtPSBkdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYWltVGltZXIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9haW1UaW1lciA9IHRoaXMuX2FpbUludGVydmFsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycm93VG9OZWFyZXN0R3VuKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzUHJvdGVjdCkgcmV0dXJuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pc0FpbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9haW1UaW1lciAtPSBkdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYWltVGltZXIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9haW1UaW1lciA9IHRoaXMuX2FpbUludGVydmFsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFpbVRvTmVhcmVzdCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9haW1UaW1lciA9IDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbGF0ZVVwZGF0ZShkdCkge1xyXG4gICAgICAgIC8vIHRoaXMubWFpbkMubm9kZS5zZXRQb3NpdGlvbih0aGlzLnBsYXllci5wb3NpdGlvbilcclxuICAgICAgICAvLyB0aGlzLnRlc3RDLm5vZGUuc2V0UG9zaXRpb24odGhpcy5wbGF5ZXIucG9zaXRpb24pXHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIubWFwQ2FtZXJhLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uKVxyXG4gICAgICAgIC8vIHRoaXMubWlwbWFwQ2FtZXJhLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uKVxyXG4gICAgfSxcclxuICAgIGNoZWNrR2FzKGR0KSB7XHJcbiAgICAgICAgaWYgKEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5nYXNDb25maWcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBjYy52MihHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuZ2FzQ29uZmlnLnNhZmVQb3NpdGlvbikuc3ViKGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpLm1hZygpXHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+IEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5nYXNDb25maWcuZ2FzQ2lyY2xlIC8gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5HYXNUaW1lciAtPSBkdFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luR2FzVGltZXIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5HYXNUaW1lciA9IHRoaXMuX2luR2FzSW50ZXJ2YWxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlRGFtYWdlKDUsIC0xKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNHYXMgPSB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0dhcyA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0dhcyA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFpbVN0YXRlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRGllKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLl9oYXZlR3VuKSByZXR1cm5cclxuICAgICAgICB0aGlzLl9pc0FpbSA9IGV2ZW50XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzQWltKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWltVG9OZWFyZXN0KClcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWltVG9OZWFyZXN0KCkge1xyXG4gICAgICAgIHZhciBhbGxSb2xlQXJyID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbFJvbGVBcnIuY29uY2F0KClcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFJvbGVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgaWYgKGFsbFJvbGVBcnJbaV0uc2tpbkRhdGEuc2tpbmlkID09IHRoaXMuc2tpbkRhdGEuc2tpbmlkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBhbGxSb2xlQXJyLnNwbGljZShpLCAxKVxyXG4gICAgICAgIC8vICAgICAgICAgYnJlYWtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBUb29scy5yZW1vdmVBcnJheShhbGxSb2xlQXJyLCB0aGlzLmdldENvbXBvbmVudChcIlBsYXllclwiKSlcclxuICAgICAgICB2YXIgbWluRGlzID0gMTAwMDAwMDtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFJvbGVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gaWYgKEdhbWVBcHAudWlNYW5hZ2VyLmlzSW5NYXBTaWdodChhbGxSb2xlQXJyW2ldLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IGNjLnYyKGFsbFJvbGVBcnJbaV0ubm9kZS5wb3NpdGlvbikuc3ViKGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpLm1hZygpXHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IG1pbkRpcyAmJiBkaXN0YW5jZSA8IHRoaXMuZ3VuRGF0YS5yYW5nZSAqIDEuNCkge1xyXG4gICAgICAgICAgICAgICAgbWluRGlzID0gZGlzdGFuY2VcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpciA9IG51bGxcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNBaW0gPSBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQWltID0gdHJ1ZVxyXG4gICAgICAgICAgICB2YXIgYWltRW5lbXkgPSBhbGxSb2xlQXJyW2luZGV4XS5ub2RlXHJcbiAgICAgICAgICAgIGRpciA9IGNjLnYyKGFpbUVuZW15LnBvc2l0aW9uKS5zdWIoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSkubm9ybWFsaXplKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRHdW5EaXIoZGlyKVxyXG4gICAgfSxcclxuICAgIGFycm93VG9OZWFyZXN0R3VuKCkge1xyXG4gICAgICAgIHZhciBhbGxHdW5BcnIgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsR3VuQXJyLmNvbmNhdCgpXHJcbiAgICAgICAgdmFyIG1pbkRpcyA9IDEwMDAwMDA7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxHdW5BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gY2MudjIoYWxsR3VuQXJyW2ldLnBvc2l0aW9uKS5zdWIoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSkubWFnKClcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgbWluRGlzKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5EaXMgPSBkaXN0YW5jZVxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpciA9IG51bGxcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwTm9HdW4gPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYXJyb3dOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGFpbUd1biA9IGFsbEd1bkFycltpbmRleF1cclxuICAgICAgICAgICAgZGlyID0gY2MudjIoYWltR3VuLnBvc2l0aW9uKS5zdWIoY2MudjIodGhpcy5ub2RlLnBvc2l0aW9uKSkubm9ybWFsaXplKClcclxuICAgICAgICAgICAgdGhpcy5zZXRBcnJvd0RpcihkaXIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob290KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0RpZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5faGF2ZUd1bikgcmV0dXJuXHJcbiAgICAgICAgaWYgKEdhbWVBcHAuZGF0YU1hbmFnZXIucmVkdWNlQW1vKCkpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3VuQW5pbS5zZXRBbmltYXRpb24oMCwgJ2F0dGFja18nICsgdGhpcy5ndW5EYXRhLnNraW5uYW1lLCBmYWxzZSlcclxuICAgICAgICAgICAgdmFyIHBvd2VyID0gTWF0aC5jZWlsKHRoaXMuZ3VuRGF0YS5wb3dlciAqIChHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuY3VyRGFtYWdlICsgR2FtZUFwcC5kYXRhTWFuYWdlci5nZXRFcXVpcEl0ZW1BdHRyKEVxdWlwVHlwZS5kYW1hZ2UpKSlcclxuICAgICAgICAgICAgdmFyIGlzQ3JpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgIGlmIChUb29scy5pc0NyaXQoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmN1ckNyaXQgKyBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdldEVxdWlwSXRlbUF0dHIoRXF1aXBUeXBlLmNyaXQpKSkge1xyXG4gICAgICAgICAgICAgICAgcG93ZXIgKj0gMlxyXG4gICAgICAgICAgICAgICAgaXNDcml0ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmd1bkRhdGEud2VhcG9uaWQgPT0gMTAwMikge1xyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnc2hvdF9zaG9vdCcsIDAuNilcclxuICAgICAgICAgICAgICAgIHZhciBidWxsZXQxID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQcmVmYWIpXHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0MiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldDMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldFByZWZhYilcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXRQb3MgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLmd1bk5vZGUuY2hpbGRyZW5bMF0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKSlcclxuICAgICAgICAgICAgICAgIGJ1bGxldDEucGFyZW50ID0gYnVsbGV0Mi5wYXJlbnQgPSBidWxsZXQzLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50XHJcbiAgICAgICAgICAgICAgICBidWxsZXQxLnNldFBvc2l0aW9uKGJ1bGxldFBvcylcclxuICAgICAgICAgICAgICAgIGJ1bGxldDIuc2V0UG9zaXRpb24oYnVsbGV0UG9zKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0My5zZXRQb3NpdGlvbihidWxsZXRQb3MpXHJcbiAgICAgICAgICAgICAgICBidWxsZXQxLnJvdGF0aW9uID0gdGhpcy5ndW5Ob2RlLnJvdGF0aW9uXHJcbiAgICAgICAgICAgICAgICBidWxsZXQyLnJvdGF0aW9uID0gdGhpcy5ndW5Ob2RlLnJvdGF0aW9uICsgMzBcclxuICAgICAgICAgICAgICAgIGJ1bGxldDMucm90YXRpb24gPSB0aGlzLmd1bk5vZGUucm90YXRpb24gLSAzMFxyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lR3VuRGlyID0gY2MudjIodGhpcy5fZ3VuRGlyKVxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldEMxID0gYnVsbGV0MS5nZXRDb21wb25lbnQoJ0J1bGxldCcpXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDMS5fYmVsb25nVGFnID0gdGhpcy5fcGJjLnRhZ1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0QzEuX2JlbG9uZ05hbWUgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLnBsYXllck5hbWVcclxuICAgICAgICAgICAgICAgIGJ1bGxldEMxLl9mbHlEaXIgPSBjbG9uZUd1bkRpclxyXG4gICAgICAgICAgICAgICAgYnVsbGV0QzEuaW5pdCh0aGlzLmd1bkRhdGEsIHBvd2VyLCBpc0NyaXQpXHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0QzIgPSBidWxsZXQyLmdldENvbXBvbmVudCgnQnVsbGV0JylcclxuICAgICAgICAgICAgICAgIGJ1bGxldEMyLl9iZWxvbmdUYWcgPSB0aGlzLl9wYmMudGFnXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDMi5fYmVsb25nTmFtZSA9IEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEucGxheWVyTmFtZVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0QzIuX2ZseURpciA9IGNsb25lR3VuRGlyLnJvdGF0ZSgtY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKDMwKSlcclxuICAgICAgICAgICAgICAgIGJ1bGxldEMyLmluaXQodGhpcy5ndW5EYXRhLCBwb3dlciwgaXNDcml0KVxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldEMzID0gYnVsbGV0My5nZXRDb21wb25lbnQoJ0J1bGxldCcpXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDMy5fYmVsb25nVGFnID0gdGhpcy5fcGJjLnRhZ1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0QzMuX2JlbG9uZ05hbWUgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLnBsYXllck5hbWVcclxuICAgICAgICAgICAgICAgIGJ1bGxldEMzLl9mbHlEaXIgPSBjbG9uZUd1bkRpci5yb3RhdGUoLWNjLm1pc2MuZGVncmVlc1RvUmFkaWFucygtMzApKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0QzMuaW5pdCh0aGlzLmd1bkRhdGEsIHBvd2VyLCBpc0NyaXQpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ndW5EYXRhLndlYXBvbmlkID09IDEwMDMgfHwgdGhpcy5ndW5EYXRhLndlYXBvbmlkID09IDExMDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdjaGFyZ2Vfc2hvb3QnLCAwLjYpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ3VuRGF0YS53ZWFwb25pZCA9PSAxMDA1IHx8IHRoaXMuZ3VuRGF0YS53ZWFwb25pZCA9PSAxMTA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnbWlzc2lsZV9zaG9vdCcsIDAuNilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ndW5EYXRhLndlYXBvbmlkID09IDExMDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdzaG90X3Nob290JywgMC42KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldFBvcyA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuZ3VuTm9kZS5jaGlsZHJlblswXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuc2V0UG9zaXRpb24oYnVsbGV0UG9zKVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnJvdGF0aW9uID0gdGhpcy5ndW5Ob2RlLnJvdGF0aW9uXHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0QyA9IGJ1bGxldC5nZXRDb21wb25lbnQoJ0J1bGxldCcpXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDLl9iZWxvbmdUYWcgPSB0aGlzLl9wYmMudGFnXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDLl9iZWxvbmdOYW1lID0gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5wbGF5ZXJOYW1lXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDLl9mbHlEaXIgPSB0aGlzLl9ndW5EaXJcclxuICAgICAgICAgICAgICAgIGJ1bGxldEMuaW5pdCh0aGlzLmd1bkRhdGEsIHBvd2VyLCBpc0NyaXQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXJUb3BCYXJTaG93KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5nZXRVSShHYW1lQXBwLnVpTWFuYWdlci51aVJvb3QuY2hpbGRyZW5bMF0ubmFtZSkuZ2V0Q29tcG9uZW50KEdhbWVBcHAudWlNYW5hZ2VyLnVpUm9vdC5jaGlsZHJlblswXS5uYW1lKS5yZWxvYWRCdG5DbGljaygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuY3VyQW1vTnVtID09IDApIHtcclxuICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuZ2V0VUkoR2FtZUFwcC51aU1hbmFnZXIudWlSb290LmNoaWxkcmVuWzBdLm5hbWUpLmdldENvbXBvbmVudChHYW1lQXBwLnVpTWFuYWdlci51aVJvb3QuY2hpbGRyZW5bMF0ubmFtZSkucmVsb2FkQnRuQ2xpY2soKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZWxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRGllKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLl9oYXZlR3VuKSByZXR1cm5cclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdyZWxvYWQnLCAwLjYpXHJcbiAgICAgICAgdGhpcy5ndW5BbmltLnNldEFuaW1hdGlvbigwLCAncmVsb2FkXycgKyB0aGlzLmd1bkRhdGEuc2tpbm5hbWUsIGZhbHNlKVxyXG4gICAgfSxcclxuICAgIGVxdWlwV2VhcG9uKF9raW5kKSB7XHJcbiAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgncGlja19pdGVtJywgMC42KVxyXG4gICAgICAgIHRoaXMuZ3VuRGF0YSA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuanNvbkRhdGEuV2VhcG9uRGF0YVtfa2luZF1cclxuICAgICAgICB0aGlzLl9oYXZlR3VuID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuYXJyb3dOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1NIT1dfUkVMT0FEX1VJLCB0cnVlKVxyXG4gICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5zaG9vdEludGVydmFsID0gdGhpcy5ndW5EYXRhLnNob290ZGVsYXlcclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEucmVsb2FkSW50ZXJ2YWwgPSB0aGlzLmd1bkRhdGEucmVsb2FkZGVsYXlcclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEubWF4QW1vTnVtID0gdGhpcy5ndW5EYXRhLmNsaXBudW1cclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLnJlbG9hZEFtbygpXHJcbiAgICAgICAgdGhpcy5ndW5Ob2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICBpZiAoX2tpbmQgPCAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VuQW5pbS5za2VsZXRvbkRhdGEgPSBHYW1lQXBwLnVpTWFuYWdlci5ndW5Ta2luRGF0YUdyb3VwWzBdXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ndW5BbmltLnNrZWxldG9uRGF0YSA9IEdhbWVBcHAudWlNYW5hZ2VyLmd1blNraW5EYXRhR3JvdXBbMV1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ndW5BbmltLnNldFNraW4odGhpcy5ndW5EYXRhLnNraW5uYW1lKVxyXG4gICAgICAgIHRoaXMuc2V0R3VuRGlyKHRoaXMubW92ZURpcilcclxuXHJcbiAgICAgICAgLy8gdGhpcy5ndW5BbmltLnNldEFuaW1hdGlvbigwLCAnYXR0YWNrXycgKyB0aGlzLmd1bkRhdGEuc2tpbm5hbWUsIGZhbHNlKVxyXG4gICAgfSxcclxuICAgIGdldEl0ZW0oKSB7XHJcblxyXG4gICAgfSxcclxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3QsIHNlbGYsIG90aGVyKSB7XHJcbiAgICAgICAgaWYgKHNlbGYudGFnID09IFRhZ3MuZW1wdHkpIHJldHVybjtcclxuICAgICAgICBpZiAob3RoZXIudGFnID09IFRhZ3MuaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgZ3JvdW5kSXRlbSA9IG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KCdHcm91bmRJdGVtJylcclxuICAgICAgICAgICAgaWYgKGdyb3VuZEl0ZW0uaXRlbVR5cGUuX3R5cGUgPT0gSXRlbVR5cGUud2VhcG9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBHcm91bmRXZWFwb24gPSBncm91bmRJdGVtXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2hhdmVHdW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBUb29scy5yZW1vdmVBcnJheShHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsR3VuQXJyLCBvdGhlci5ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja1VwV2VhcG9uKClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1NIT1dfR1VOX1VJLCB0cnVlLCBHYW1lQXBwLmRhdGFNYW5hZ2VyLmpzb25EYXRhLldlYXBvbkRhdGFbZ3JvdW5kSXRlbS5pdGVtVHlwZS5fa2luZF0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgX2tpbmQgPSBncm91bmRJdGVtLml0ZW1UeXBlLl9raW5kXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIXRoaXMuX2hhdmVHdW4pIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBvdGhlci5ub2RlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgX3BhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBfdHlwZTogSXRlbVR5cGUud2VhcG9uLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBfa2luZDogR2FtZUFwcC5kYXRhTWFuYWdlci5qc29uRGF0YS5XZWFwb25EYXRhLmluZGV4T2YodGhpcy5ndW5EYXRhKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICBncm91bmRJdGVtLmluaXQoX3BhcmFtKVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lcXVpcFdlYXBvbihfa2luZClcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChncm91bmRJdGVtLml0ZW1UeXBlLl90eXBlID09IEl0ZW1UeXBlLml0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG90aGVyLnRhZyA9PSBUYWdzLmJ1bGxldCkge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5pc0luR2FtZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNEaWUpIHJldHVyblxyXG4gICAgICAgICAgICB2YXIgYkMgPSBvdGhlci5ub2RlLmdldENvbXBvbmVudCgnQnVsbGV0JylcclxuICAgICAgICAgICAgaWYgKGJDLl9iZWxvbmdUYWcgPT0gc2VsZi50YWcpIHJldHVyblxyXG4gICAgICAgICAgICBpZiAob3RoZXIubm9kZSA9PSB0aGlzLmxhc3RIaXRCdWxsZXQpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5sYXN0SGl0QnVsbGV0ID0gb3RoZXIubm9kZVxyXG4gICAgICAgICAgICB0aGlzLmJlRGFtYWdlKGJDLl9wb3dlciwgYkMuX2JlbG9uZ1RhZywgYkMuX2JlbG9uZ05hbWUsIGJDLl9pc0NyaXQpXHJcbiAgICAgICAgfSBlbHNlIGlmIChvdGhlci50YWcgPT0gVGFncy5ib29tKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0RpZSkgcmV0dXJuXHJcbiAgICAgICAgICAgIHRoaXMuYmVEYW1hZ2UoOTk5LCAtMilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25FbmRDb250YWN0KGNvbnRhY3QsIHNlbGYsIG90aGVyKSB7XHJcbiAgICAgICAgaWYgKHNlbGYudGFnID09IFRhZ3MuZW1wdHkpIHJldHVybjtcclxuICAgICAgICBpZiAob3RoZXIudGFnID09IFRhZ3MuaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgZ3JvdW5kSXRlbSA9IG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KCdHcm91bmRJdGVtJylcclxuICAgICAgICAgICAgaWYgKGdyb3VuZEl0ZW0uaXRlbVR5cGUuX3R5cGUgPT0gSXRlbVR5cGUud2VhcG9uKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWIneWni+WMllwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wR3JvdW5kV2VhcG9uID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1NIT1dfR1VOX1VJLCBmYWxzZSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChncm91bmRJdGVtLml0ZW1UeXBlLl90eXBlID09IEl0ZW1UeXBlLml0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBpY2tVcFdlYXBvbigpIHtcclxuICAgICAgICB2YXIgX2tpbmQgPSB0aGlzLnRlbXBHcm91bmRXZWFwb24uaXRlbVR5cGUuX2tpbmRcclxuICAgICAgICBpZiAoIXRoaXMuX2hhdmVHdW4pIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wR3JvdW5kV2VhcG9uLm5vZGUuZGVzdHJveSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgX3BhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgX3R5cGU6IEl0ZW1UeXBlLndlYXBvbixcclxuICAgICAgICAgICAgICAgIF9raW5kOiBHYW1lQXBwLmRhdGFNYW5hZ2VyLmpzb25EYXRhLldlYXBvbkRhdGEuaW5kZXhPZih0aGlzLmd1bkRhdGEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50ZW1wR3JvdW5kV2VhcG9uLmluaXQoX3BhcmFtKVxyXG4gICAgICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfU0hPV19HVU5fVUksIHRydWUsIHRoaXMuZ3VuRGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lcXVpcFdlYXBvbihfa2luZClcclxuICAgIH0sXHJcbiAgICBiZURhbWFnZShfcG93ZXIsIF9iZWxvbmdJbmRleCwgX2JlbG9uZ05hbWUsIF9pc0NyaXQpIHtcclxuICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93R2FtZU9iamVjdChcIkluZm9MYWJlbFwiLCAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luUG9zID0gbm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLjUsIDAuNSkpKVxyXG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKG9yaWdpblBvcylcclxuICAgICAgICAgICAgLy/nmq7ogqTlh4/kvKQr6KOF5aSH5YeP5LykXHJcbiAgICAgICAgICAgIHZhciBfaXNEZWYgPSBNYXRoLmNlaWwoX3Bvd2VyICogR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmN1ckRlZikgKyBNYXRoLmNlaWwoX3Bvd2VyICogR2FtZUFwcC5kYXRhTWFuYWdlci5nZXRFcXVpcEl0ZW1BdHRyKEVxdWlwVHlwZS5kZWYpKVxyXG4gICAgICAgICAgICBfcG93ZXIgLT0gX2lzRGVmXHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBcIjxjb2xvcj1yZWQ+LVwiICsgX3Bvd2VyICsgXCI8L2NvbG9yPlwiXHJcbiAgICAgICAgICAgIGlmIChfaXNDcml0KSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBcIjxjb2xvcj1yZWQ+5pq05Ye7LVwiICsgX3Bvd2VyICsgXCI8L2NvbG9yPlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF9pc0RlZikge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IFwiPGNvbG9yPSMwZmZmZmY+5YeP5LykXCIgKyBfaXNEZWYgKyBcIjwvY29sb3I+XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCI8Yj5cIiArIHN0ciArIFwiPC9iPlwiXHJcbiAgICAgICAgICAgIGxldCBkZXNQb3MgPSBjYy52MihUb29scy5yYW5kb21OdW0oNjAsIDEwMCksIFRvb2xzLnJhbmRvbU51bSg2MCwgMTAwKSlcclxuICAgICAgICAgICAgbGV0IGJlemllciA9IFtvcmlnaW5Qb3MsIGNjLnYyKG9yaWdpblBvcy54ICsgZGVzUG9zLnggLSAyMCwgb3JpZ2luUG9zLnkgKyBkZXNQb3MueSArIDIwKSwgb3JpZ2luUG9zLmFkZChkZXNQb3MpXTtcclxuICAgICAgICAgICAgbGV0IHNlcSA9IGNjLnNlcXVlbmNlKGNjLnNwYXduKGNjLmZhZGVJbigwLjIpLCBjYy5zY2FsZVRvKDAuMywgMS41KSwgY2MuYmV6aWVyVG8oMC4zLCBiZXppZXIpKSwgY2MuZGVsYXlUaW1lKDAuNSksIGNjLmZhZGVPdXQoMC4zKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5kZXN0cm95KClcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKHNlcSlcclxuICAgICAgICB9LCB0aGlzLm5vZGUucGFyZW50LnBhcmVudClcclxuICAgICAgICBpZiAoR2FtZUFwcC5kYXRhTWFuYWdlci5yZWR1Y2VIcChfcG93ZXIpKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfmlLbliLDlrZDlvLnmlLvlh7snKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfmrbvmjonkuoYhISEhISEnKVxyXG4gICAgICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdtYWxlRGVhdGgnLCAwLjUpXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQgPSBHYW1lQXBwLnVpTWFuYWdlci5nZXRHYW1lKFwiR2FtZU1hcFwiKS5nZXRDaGlsZEJ5TmFtZShcIkRlYWRPYmplY3ROb2RlXCIpXHJcbiAgICAgICAgICAgIHRoaXMuX3BiYy5lbmFibGVkID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5faXNEaWUgPSB0cnVlXHJcbiAgICAgICAgICAgIGlmIChfYmVsb25nSW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdChHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLnBsYXllck5hbWUgKyBcIiDooqvmr5Llh7rlsYBcIilcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChfYmVsb25nSW5kZXggPT0gLTIpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdChHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLnBsYXllck5hbWUgKyBcIiDooqvovbDngrjlh7rlsYBcIilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBraWxsTnVtID0gR2FtZUFwcC5kYXRhTWFuYWdlci5hZGRLaWxsTnVtKF9iZWxvbmdJbmRleCwgX2JlbG9uZ05hbWUpXHJcbiAgICAgICAgICAgICAgICBpZiAoa2lsbE51bSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291bmRJbmRleCA9IGtpbGxOdW0gPiA1ID8gNSA6IGtpbGxOdW1cclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdraWxsJyArIHNvdW5kSW5kZXgsIDAuNSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93VG9hc3QoX2JlbG9uZ05hbWUsIG51bGwsIGtpbGxOdW0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdChfYmVsb25nTmFtZSArIFwiIOWHu+adgOS6hiBcIiArIEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEucGxheWVyTmFtZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZm9yICh2YXIgaSBpbiBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsUm9sZUFycikge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxSb2xlQXJyW2ldLnNraW5EYXRhLnNraW5pZCA9PSB0aGlzLnNraW5EYXRhLnNraW5pZCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxSb2xlQXJyLnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2hhdmVHdW4pIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGVQYXJlbnRDID0gR2FtZUFwcC51aU1hbmFnZXIuZ2FtZVJvb3QuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFwiR2FtZU1hcFwiKVxyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd0dhbWVPYmplY3QoXCJHcm91bmRJdGVtXCIsIChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRkZCA9IHRoZVBhcmVudEMuYWxsR3VuTm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKSlcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoZVBhcmVudEMuYWxsR3VuTm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oZGRkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBfcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90eXBlOiBJdGVtVHlwZS53ZWFwb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9raW5kOiBUb29scy5nZXRJbmRleChHYW1lQXBwLmRhdGFNYW5hZ2VyLmpzb25EYXRhLldlYXBvbkRhdGEsIHRoaXMuZ3VuRGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coX3BhcmFtLl9raW5kKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdHcm91bmRJdGVtJykuaW5pdChfcGFyYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbEd1bkFyci5wdXNoKG5vZGUpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhLmNob29zZWRTa2luSWQgPCAyMSA/IFsnZGVhZCddIDogWydkZWFkMiddXHJcbiAgICAgICAgICAgIHRoaXMucm9sZUFuaW0uc2V0QW5pbWF0aW9uKDAsIGFyclswXSwgZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuZ3VuTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICBUb29scy5yZW1vdmVBcnJheShHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsUm9sZUFyciwgdGhpcy5ub2RlLmdldENvbXBvbmVudCgnUGxheWVyJykpXHJcbiAgICAgICAgICAgIHZhciB0aGVSYW5rID0gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbFJvbGVBcnIubGVuZ3RoXHJcbiAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLmdldFBvcHVwKFwiT3ZlclBvcHVwXCIpID09IG51bGwgJiYgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1BvcHVwKFwiT3ZlclBvcHVwXCIsIChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIk92ZXJQb3B1cFwiKS5pbml0KGZhbHNlLCB0aGVSYW5rICsgMSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1NIT1dfQUxMUk9MRU5VTV9VSSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19