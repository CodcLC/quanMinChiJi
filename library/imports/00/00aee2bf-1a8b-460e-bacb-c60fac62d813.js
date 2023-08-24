"use strict";
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