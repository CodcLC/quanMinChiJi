
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/DropBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53d079b9kpBmqvST+YSa7z0', 'DropBox');
// scripts/game/DropBox.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    boxIndex: 1231231,
    _showToPlayer: false,
    progressBar: cc.ProgressBar,
    _beginOpen: false,
    _hadOpen: false,
    _openTimer: 0,
    _belongTagsArr: [],
    other: null
  },
  onLoad: function onLoad() {
    this._belongTagsArr = [];
  },
  init: function init(_index) {
    // console.log(_index)
    this.boxIndex = _index;
  },
  update: function update(dt) {
    if (this._hadOpen) return;

    if (this._beginOpen) {
      this._openTimer += dt;

      if (this._openTimer >= 5) {
        if (this._hadOpen) return;
        this._hadOpen = true;
        GameApp.eventManager.emit(EventNames.EVENT_NOTYFY_BOX_DISMISS, this.boxIndex.toString());
        if (this._belongTagsArr.length == 0) return;

        if (this._belongTagsArr.indexOf(Tags.player) != -1) {
          GameApp.eventManager.emit(EventNames.EVENT_SHOW_BOXITEM);
        } else {
          // console.log("触发了")
          this.other && this.other.node.getComponent("Enemy").enemyEquipBoxItem();
        }
      }
    } else {
      this._openTimer -= dt;

      if (this._openTimer < 0) {
        this._openTimer = 0;
      }
    }

    this.progressBar.progress = this._openTimer / 5;
  },
  onBeginContact: function onBeginContact(contact, self, other) {
    if (other.tag == Tags.player || other.tag >= Tags.enemy) {
      this._beginOpen = true;

      if (this._belongTagsArr.indexOf(other.tag) == -1) {
        this._belongTagsArr.push(other.tag);
      }
    }
  },
  onEndContact: function onEndContact(contact, self, other) {
    if (other.tag == Tags.player || other.tag >= Tags.enemy) {
      if (this._openTimer >= 5) {
        this.other = other;
        if (this._hadOpen) return;
        this._hadOpen = true;
        GameApp.eventManager.emit(EventNames.EVENT_NOTYFY_BOX_DISMISS, this.boxIndex.toString());
        if (this._belongTagsArr.length == 0) return;

        if (this._belongTagsArr.indexOf(Tags.player) != -1) {
          GameApp.eventManager.emit(EventNames.EVENT_SHOW_BOXITEM);
        } else {
          // console.log("触发了")
          other.node.getComponent("Enemy").enemyEquipBoxItem();
        }

        return;
      }

      if (this._belongTagsArr.indexOf(other.tag) != -1) {
        Tools.removeArray(this._belongTagsArr, other.tag);
      }

      if (this._belongTagsArr.length == 0) {
        this._beginOpen = false;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRHJvcEJveC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJveEluZGV4IiwiX3Nob3dUb1BsYXllciIsInByb2dyZXNzQmFyIiwiUHJvZ3Jlc3NCYXIiLCJfYmVnaW5PcGVuIiwiX2hhZE9wZW4iLCJfb3BlblRpbWVyIiwiX2JlbG9uZ1RhZ3NBcnIiLCJvdGhlciIsIm9uTG9hZCIsImluaXQiLCJfaW5kZXgiLCJ1cGRhdGUiLCJkdCIsIkdhbWVBcHAiLCJldmVudE1hbmFnZXIiLCJlbWl0IiwiRXZlbnROYW1lcyIsIkVWRU5UX05PVFlGWV9CT1hfRElTTUlTUyIsInRvU3RyaW5nIiwibGVuZ3RoIiwiaW5kZXhPZiIsIlRhZ3MiLCJwbGF5ZXIiLCJFVkVOVF9TSE9XX0JPWElURU0iLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiZW5lbXlFcXVpcEJveEl0ZW0iLCJwcm9ncmVzcyIsIm9uQmVnaW5Db250YWN0IiwiY29udGFjdCIsInNlbGYiLCJ0YWciLCJlbmVteSIsInB1c2giLCJvbkVuZENvbnRhY3QiLCJUb29scyIsInJlbW92ZUFycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFLE9BREY7QUFFUkMsSUFBQUEsYUFBYSxFQUFFLEtBRlA7QUFHUkMsSUFBQUEsV0FBVyxFQUFFTixFQUFFLENBQUNPLFdBSFI7QUFJUkMsSUFBQUEsVUFBVSxFQUFFLEtBSko7QUFLUkMsSUFBQUEsUUFBUSxFQUFFLEtBTEY7QUFNUkMsSUFBQUEsVUFBVSxFQUFFLENBTko7QUFPUkMsSUFBQUEsY0FBYyxFQUFFLEVBUFI7QUFRUkMsSUFBQUEsS0FBSyxFQUFFO0FBUkMsR0FIUDtBQWVMQyxFQUFBQSxN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QUNyQyxZQUFJLEtBQUtiLGNBQUwsQ0FBb0JjLE9BQXBCLENBQTRCQyxJQUFJLENBQUNDLE1BQWpDLEtBQTRDLENBQUMsQ0FBakQsRUFBb0Q7QUFDaERULFVBQUFBLE9BQU8sQ0FBQ0MsWUFBUixDQUFxQkMsSUFBckIsQ0FBMEJDLFVBQVUsQ0FBQ08sa0JBQXJDO0FBQ0gsU0FGRCxNQUVPO0FBQ0g7QUFDQWhCLFVBQUFBLEtBQUssQ0FBQ2lCLElBQU4sQ0FBV0MsWUFBWCxDQUF3QixPQUF4QixFQUFpQ0MsaUJBQWpDO0FBQ0g7O0FBQ0Q7QUFDSDs7QUFHRCxVQUFJLEtBQUtwQixjQUFMLENBQW9CYyxPQUFwQixDQUE0QmIsS0FBSyxDQUFDd0IsR0FBbEMsS0FBMEMsQ0FBQyxDQUEvQyxFQUFrRDtBQUM5Q0ksUUFBQUEsS0FBSyxDQUFDQyxXQUFOLENBQWtCLEtBQUs5QixjQUF2QixFQUF1Q0MsS0FBSyxDQUFDd0IsR0FBN0M7QUFDSDs7QUFDRCxVQUFJLEtBQUt6QixjQUFMLENBQW9CYSxNQUFwQixJQUE4QixDQUFsQyxFQUFxQztBQUNqQyxhQUFLaEIsVUFBTCxHQUFrQixLQUFsQjtBQUNIO0FBQ0o7QUFDSjtBQW5GSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBib3hJbmRleDogMTIzMTIzMSxcclxuICAgICAgICBfc2hvd1RvUGxheWVyOiBmYWxzZSxcclxuICAgICAgICBwcm9ncmVzc0JhcjogY2MuUHJvZ3Jlc3NCYXIsXHJcbiAgICAgICAgX2JlZ2luT3BlbjogZmFsc2UsXHJcbiAgICAgICAgX2hhZE9wZW46IGZhbHNlLFxyXG4gICAgICAgIF9vcGVuVGltZXI6IDAsXHJcbiAgICAgICAgX2JlbG9uZ1RhZ3NBcnI6IFtdLFxyXG4gICAgICAgIG90aGVyOiBudWxsLFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX2JlbG9uZ1RhZ3NBcnIgPSBbXVxyXG4gICAgfSxcclxuICAgIGluaXQoX2luZGV4KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coX2luZGV4KVxyXG4gICAgICAgIHRoaXMuYm94SW5kZXggPSBfaW5kZXhcclxuICAgIH0sXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5faGFkT3BlbikgcmV0dXJuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9iZWdpbk9wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fb3BlblRpbWVyICs9IGR0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcGVuVGltZXIgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2hhZE9wZW4pIHJldHVyblxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFkT3BlbiA9IHRydWVcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9OT1RZRllfQk9YX0RJU01JU1MsIHRoaXMuYm94SW5kZXgudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iZWxvbmdUYWdzQXJyLmxlbmd0aCA9PSAwKSByZXR1cm5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iZWxvbmdUYWdzQXJyLmluZGV4T2YoVGFncy5wbGF5ZXIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1NIT1dfQk9YSVRFTSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLop6blj5HkuoZcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyICYmIHRoaXMub3RoZXIubm9kZS5nZXRDb21wb25lbnQoXCJFbmVteVwiKS5lbmVteUVxdWlwQm94SXRlbSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fb3BlblRpbWVyIC09IGR0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcGVuVGltZXIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGVuVGltZXIgPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHRoaXMuX29wZW5UaW1lciAvIDVcclxuICAgIH0sXHJcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcikge1xyXG4gICAgICAgIGlmIChvdGhlci50YWcgPT0gVGFncy5wbGF5ZXIgfHwgb3RoZXIudGFnID49IFRhZ3MuZW5lbXkpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmVnaW5PcGVuID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2JlbG9uZ1RhZ3NBcnIuaW5kZXhPZihvdGhlci50YWcpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWxvbmdUYWdzQXJyLnB1c2gob3RoZXIudGFnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuZENvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpIHtcclxuICAgICAgICBpZiAob3RoZXIudGFnID09IFRhZ3MucGxheWVyIHx8IG90aGVyLnRhZyA+PSBUYWdzLmVuZW15KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcGVuVGltZXIgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdGhlciA9IG90aGVyXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faGFkT3BlbikgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYWRPcGVuID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX05PVFlGWV9CT1hfRElTTUlTUywgdGhpcy5ib3hJbmRleC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2JlbG9uZ1RhZ3NBcnIubGVuZ3RoID09IDApIHJldHVyblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2JlbG9uZ1RhZ3NBcnIuaW5kZXhPZihUYWdzLnBsYXllcikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfU0hPV19CT1hJVEVNKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuinpuWPkeS6hlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiRW5lbXlcIikuZW5lbXlFcXVpcEJveEl0ZW0oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYmVsb25nVGFnc0Fyci5pbmRleE9mKG90aGVyLnRhZykgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLnJlbW92ZUFycmF5KHRoaXMuX2JlbG9uZ1RhZ3NBcnIsIG90aGVyLnRhZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYmVsb25nVGFnc0Fyci5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmVnaW5PcGVuID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG59KTtcclxuIl19