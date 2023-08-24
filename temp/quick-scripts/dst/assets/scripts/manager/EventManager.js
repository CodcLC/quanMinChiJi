
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/manager/EventManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '00aeeK/GotGDrrLxg+sYtgT', 'EventManager');
// scripts/manager/EventManager.js

"use strict";

var EventEmitter = require('events').EventEmitter;

cc.Class({
  name: 'EventManager',
  properties: {
    _eventEmitter: EventEmitter
  },
  ctor: function ctor() {
    this._eventEmitter = new EventEmitter();

    this._eventEmitter.setMaxListeners(0);
  },
  on: function on(eventName, func) {
    this._eventEmitter.on(eventName, func); // console.log("加")
    // console.log(this._eventEmitter)

  },
  once: function once(eventName, func) {
    this._eventEmitter.once(eventName, func);
  },
  emit: function emit(eventName, self, param) {
    if (self && param) {
      this._eventEmitter.emit(eventName, self, param);

      return;
    }

    if (self) {
      this._eventEmitter.emit(eventName, self);

      return;
    }

    this._eventEmitter.emit(eventName);
  },
  removeListener: function removeListener(eventName, func) {
    if (func) {
      return this._eventEmitter.removeListener(eventName, func);
    } // console.log("减")
    // console.log(this._eventEmitter)


    this._eventEmitter.removeAllListeners(eventName);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFuYWdlclxcRXZlbnRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJfZXZlbnRFbWl0dGVyIiwiY3RvciIsInNldE1heExpc3RlbmVycyIsIm9uIiwiZXZlbnROYW1lIiwiZnVuYyIsIm9uY2UiLCJlbWl0Iiwic2VsZiIsInBhcmFtIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsWUFBWSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFQLENBQWtCRCxZQUFyQzs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTEMsRUFBQUEsSUFBSSxFQUFFLGNBREQ7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGFBQWEsRUFBRU47QUFEUCxHQUhQO0FBT0xPLEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFNBQUtELGFBQUwsR0FBcUIsSUFBSU4sWUFBSixFQUFyQjs7QUFDQSxTQUFLTSxhQUFMLENBQW1CRSxlQUFuQixDQUFtQyxDQUFuQztBQUNILEdBVkk7QUFZTEMsRUFBQUEsRUFBRSxFQUFFLFlBQVVDLFNBQVYsRUFBcUJDLElBQXJCLEVBQTJCO0FBQzNCLFNBQUtMLGFBQUwsQ0FBbUJHLEVBQW5CLENBQXNCQyxTQUF0QixFQUFpQ0MsSUFBakMsRUFEMkIsQ0FFM0I7QUFDQTs7QUFDSCxHQWhCSTtBQWtCTEMsRUFBQUEsSUFBSSxFQUFFLGNBQVVGLFNBQVYsRUFBcUJDLElBQXJCLEVBQTJCO0FBQzdCLFNBQUtMLGFBQUwsQ0FBbUJNLElBQW5CLENBQXdCRixTQUF4QixFQUFtQ0MsSUFBbkM7QUFDSCxHQXBCSTtBQXNCTEUsRUFBQUEsSUFBSSxFQUFFLGNBQVVILFNBQVYsRUFBcUJJLElBQXJCLEVBQTJCQyxLQUEzQixFQUFrQztBQUNwQyxRQUFJRCxJQUFJLElBQUlDLEtBQVosRUFBbUI7QUFDZixXQUFLVCxhQUFMLENBQW1CTyxJQUFuQixDQUF3QkgsU0FBeEIsRUFBbUNJLElBQW5DLEVBQXlDQyxLQUF6Qzs7QUFDQTtBQUNIOztBQUNELFFBQUlELElBQUosRUFBVTtBQUNOLFdBQUtSLGFBQUwsQ0FBbUJPLElBQW5CLENBQXdCSCxTQUF4QixFQUFtQ0ksSUFBbkM7O0FBQ0E7QUFDSDs7QUFFRCxTQUFLUixhQUFMLENBQW1CTyxJQUFuQixDQUF3QkgsU0FBeEI7QUFDSCxHQWpDSTtBQW1DTE0sRUFBQUEsY0FBYyxFQUFFLHdCQUFVTixTQUFWLEVBQXFCQyxJQUFyQixFQUEyQjtBQUN2QyxRQUFJQSxJQUFKLEVBQVU7QUFDTixhQUFPLEtBQUtMLGFBQUwsQ0FBbUJVLGNBQW5CLENBQWtDTixTQUFsQyxFQUE2Q0MsSUFBN0MsQ0FBUDtBQUNILEtBSHNDLENBSXZDO0FBQ0E7OztBQUNBLFNBQUtMLGFBQUwsQ0FBbUJXLGtCQUFuQixDQUFzQ1AsU0FBdEM7QUFDSDtBQTFDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ0V2ZW50TWFuYWdlcicsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9ldmVudEVtaXR0ZXI6IEV2ZW50RW1pdHRlcixcclxuICAgIH0sXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZnVuYykge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbihldmVudE5hbWUsIGZ1bmMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5YqgXCIpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5fZXZlbnRFbWl0dGVyKVxyXG4gICAgfSxcclxuXHJcbiAgICBvbmNlOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBmdW5jKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9uY2UoZXZlbnROYW1lLCBmdW5jKTtcclxuICAgIH0sXHJcblxyXG4gICAgZW1pdDogZnVuY3Rpb24gKGV2ZW50TmFtZSwgc2VsZiwgcGFyYW0pIHtcclxuICAgICAgICBpZiAoc2VsZiAmJiBwYXJhbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIuZW1pdChldmVudE5hbWUsIHNlbGYsIHBhcmFtKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZikge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIuZW1pdChldmVudE5hbWUsIHNlbGYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXIuZW1pdChldmVudE5hbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVMaXN0ZW5lcjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZnVuYykge1xyXG4gICAgICAgIGlmIChmdW5jKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudEVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlh49cIilcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl9ldmVudEVtaXR0ZXIpXHJcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLnJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWUpO1xyXG4gICAgfSxcclxufSk7Il19