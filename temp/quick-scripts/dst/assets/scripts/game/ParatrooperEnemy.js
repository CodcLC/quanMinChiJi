
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ParatrooperEnemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bf863F2RelJYKW79OD4Wy5c', 'ParatrooperEnemy');
// scripts/game/ParatrooperEnemy.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    _borderGroup: []
  },
  init: function init(_bg) {
    this._borderGroup = _bg;
  },
  update: function update() {
    var newPos = this.node.position;

    if (newPos.x < this._borderGroup[0].x) {
      newPos.x = this._borderGroup[0].x;
    }

    if (newPos.x > this._borderGroup[1].x) {
      newPos.x = this._borderGroup[1].x;
    }

    if (newPos.y > this._borderGroup[0].y) {
      newPos.y = this._borderGroup[0].y;
    }

    if (newPos.y < this._borderGroup[2].y) {
      newPos.y = this._borderGroup[2].y;
    }

    this.node.setPosition(newPos);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcUGFyYXRyb29wZXJFbmVteS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIl9ib3JkZXJHcm91cCIsImluaXQiLCJfYmciLCJ1cGRhdGUiLCJuZXdQb3MiLCJub2RlIiwicG9zaXRpb24iLCJ4IiwieSIsInNldFBvc2l0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsWUFBWSxFQUFFO0FBRE4sR0FIUDtBQU9MQyxFQUFBQSxJQVBLLGdCQU9BQyxHQVBBLEVBT0s7QUFDTixTQUFLRixZQUFMLEdBQW9CRSxHQUFwQjtBQUNILEdBVEk7QUFVTEMsRUFBQUEsTUFWSyxvQkFVSTtBQUNMLFFBQUlDLE1BQU0sR0FBRyxLQUFLQyxJQUFMLENBQVVDLFFBQXZCOztBQUNBLFFBQUlGLE1BQU0sQ0FBQ0csQ0FBUCxHQUFXLEtBQUtQLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUJPLENBQXBDLEVBQXVDO0FBQ25DSCxNQUFBQSxNQUFNLENBQUNHLENBQVAsR0FBVyxLQUFLUCxZQUFMLENBQWtCLENBQWxCLEVBQXFCTyxDQUFoQztBQUNIOztBQUNELFFBQUlILE1BQU0sQ0FBQ0csQ0FBUCxHQUFXLEtBQUtQLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUJPLENBQXBDLEVBQXVDO0FBQ25DSCxNQUFBQSxNQUFNLENBQUNHLENBQVAsR0FBVyxLQUFLUCxZQUFMLENBQWtCLENBQWxCLEVBQXFCTyxDQUFoQztBQUNIOztBQUNELFFBQUlILE1BQU0sQ0FBQ0ksQ0FBUCxHQUFXLEtBQUtSLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUJRLENBQXBDLEVBQXVDO0FBQ25DSixNQUFBQSxNQUFNLENBQUNJLENBQVAsR0FBVyxLQUFLUixZQUFMLENBQWtCLENBQWxCLEVBQXFCUSxDQUFoQztBQUNIOztBQUNELFFBQUlKLE1BQU0sQ0FBQ0ksQ0FBUCxHQUFXLEtBQUtSLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUJRLENBQXBDLEVBQXVDO0FBQ25DSixNQUFBQSxNQUFNLENBQUNJLENBQVAsR0FBVyxLQUFLUixZQUFMLENBQWtCLENBQWxCLEVBQXFCUSxDQUFoQztBQUNIOztBQUNELFNBQUtILElBQUwsQ0FBVUksV0FBVixDQUFzQkwsTUFBdEI7QUFDSDtBQXpCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfYm9yZGVyR3JvdXA6IFtdXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoX2JnKSB7XHJcbiAgICAgICAgdGhpcy5fYm9yZGVyR3JvdXAgPSBfYmdcclxuICAgIH0sXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMubm9kZS5wb3NpdGlvblxyXG4gICAgICAgIGlmIChuZXdQb3MueCA8IHRoaXMuX2JvcmRlckdyb3VwWzBdLngpIHtcclxuICAgICAgICAgICAgbmV3UG9zLnggPSB0aGlzLl9ib3JkZXJHcm91cFswXS54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdQb3MueCA+IHRoaXMuX2JvcmRlckdyb3VwWzFdLngpIHtcclxuICAgICAgICAgICAgbmV3UG9zLnggPSB0aGlzLl9ib3JkZXJHcm91cFsxXS54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdQb3MueSA+IHRoaXMuX2JvcmRlckdyb3VwWzBdLnkpIHtcclxuICAgICAgICAgICAgbmV3UG9zLnkgPSB0aGlzLl9ib3JkZXJHcm91cFswXS55XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdQb3MueSA8IHRoaXMuX2JvcmRlckdyb3VwWzJdLnkpIHtcclxuICAgICAgICAgICAgbmV3UG9zLnkgPSB0aGlzLl9ib3JkZXJHcm91cFsyXS55XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihuZXdQb3MpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==