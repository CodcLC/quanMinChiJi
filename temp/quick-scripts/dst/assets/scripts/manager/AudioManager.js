
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/manager/AudioManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '317f3yV6L9IGI9wd41WD/xL', 'AudioManager');
// scripts/manager/AudioManager.js

"use strict";

cc.Class({
  name: "AudioManager",
  properties: {
    _musicOn: true,
    _musicAudioID: null,
    _musicName: '',
    _effectOn: true,
    _effectAudioID: null,
    _Audios: {
      "default": {}
    }
  },
  ctor: function ctor() {
    cc.game.on(cc.game.EVENT_HIDE, function () {
      console.log("cc.audioEngine.pauseAll");
      cc.audioEngine.pauseAll();
    });
    cc.game.on(cc.game.EVENT_SHOW, function () {
      console.log("cc.audioEngine.resumeAll");
      cc.audioEngine.resumeAll();
    }); // var tempMusic = cc.sys.localStorage.getItem('CrushAnt_Music');

    var tempSound = cc.sys.localStorage.getItem('EatChicken_Sound'); // if (tempMusic != null && tempMusic != '' && tempMusic != undefined) {
    //     tempMusic = (tempMusic == "true" ? true : false)
    //     this._musicOn = tempMusic
    //     this._effectOn = tempMusic
    // }

    if (tempSound != null && tempSound != '' && tempSound != undefined) {
      tempSound = tempSound == "true" ? true : false;
      this._effectOn = tempSound;
    }
  },
  getMusicName: function getMusicName(name) {
    return cc.AudioClip.raw('resources/audio/music/' + name + '.mp3');
  },
  getEffectName: function getEffectName(name) {
    return cc.AudioClip.raw('resources/audio/effect/' + name + '.mp3');
  },
  playMusic: function playMusic(name, restart) {
    var _this = this;

    if (name === '' || this._musicName === name && !restart) {
      return;
    }

    this._musicName = name;

    if (this._musicOn) {
      cc.audioEngine.stopMusic(this._musicAudioID);
      cc.loader.loadRes('audio/music/' + name + '.mp3', cc.AudioClip, function (err, clip) {
        _this._musicAudioID = cc.audioEngine.playMusic(clip, true, true);
      }); // this._musicAudioID = cc.audioEngine.play(this.getMusicName(name), true, 1);
    }
  },
  setMusic: function setMusic(on) {
    this._musicOn = on;
    cc.sys.localStorage.setItem('MUSIC_ON', '' + on);

    if (on) {
      this.playMusic(this._musicName, true);
    } else {
      cc.audioEngine.stop(this._musicAudioID);
    }
  },
  playEffect: function playEffect(name, _volume, _loop) {
    var _this2 = this;

    //_loop=1为清除上次的循环音效,_loop=2为循环此次音效
    if (this._effectOn) {
      _loop == 1 && cc.audioEngine.stop(this._effectAudioID);
      cc.loader.loadRes('audio/effect/' + name, cc.AudioClip, function (err, clip) {
        var a = cc.audioEngine.play(clip, _loop == 2, _volume || 1); // cc.audioEngine.setVolume(_volume)
        // console.log(cc.audioEngine)

        if (_loop == 2) {
          _this2._effectAudioID = a;
        }
      }); // this._effectAudioID = cc.audioEngine.play(this.getEffectName(name), _loop == 2, _volume);
    }
  },
  setEffect: function setEffect(on) {
    this._effectOn = on;
    cc.sys.localStorage.setItem('EatChicken_Sound', '' + on);

    if (!on) {
      cc.audioEngine.stop(this._effectAudioID);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFuYWdlclxcQXVkaW9NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIl9tdXNpY09uIiwiX211c2ljQXVkaW9JRCIsIl9tdXNpY05hbWUiLCJfZWZmZWN0T24iLCJfZWZmZWN0QXVkaW9JRCIsIl9BdWRpb3MiLCJjdG9yIiwiZ2FtZSIsIm9uIiwiRVZFTlRfSElERSIsImNvbnNvbGUiLCJsb2ciLCJhdWRpb0VuZ2luZSIsInBhdXNlQWxsIiwiRVZFTlRfU0hPVyIsInJlc3VtZUFsbCIsInRlbXBTb3VuZCIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ1bmRlZmluZWQiLCJnZXRNdXNpY05hbWUiLCJBdWRpb0NsaXAiLCJyYXciLCJnZXRFZmZlY3ROYW1lIiwicGxheU11c2ljIiwicmVzdGFydCIsInN0b3BNdXNpYyIsImxvYWRlciIsImxvYWRSZXMiLCJlcnIiLCJjbGlwIiwic2V0TXVzaWMiLCJzZXRJdGVtIiwic3RvcCIsInBsYXlFZmZlY3QiLCJfdm9sdW1lIiwiX2xvb3AiLCJhIiwicGxheSIsInNldEVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTEMsRUFBQUEsSUFBSSxFQUFFLGNBREQ7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRSxJQURGO0FBRVJDLElBQUFBLGFBQWEsRUFBRSxJQUZQO0FBR1JDLElBQUFBLFVBQVUsRUFBRSxFQUhKO0FBS1JDLElBQUFBLFNBQVMsRUFBRSxJQUxIO0FBTVJDLElBQUFBLGNBQWMsRUFBRSxJQU5SO0FBUVJDLElBQUFBLE9BQU8sRUFBRTtBQUNMLGlCQUFTO0FBREo7QUFSRCxHQUhQO0FBZ0JMQyxFQUFBQSxJQWhCSyxrQkFnQkU7QUFDSFYsSUFBQUEsRUFBRSxDQUFDVyxJQUFILENBQVFDLEVBQVIsQ0FBV1os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RTRCO0FBQUE7O0FBQUM7QUFDOUIsUUFBSSxLQUFLbEMsU0FBVCxFQUFvQjtBQUNoQmtDLE1BQUFBLEtBQUssSUFBSSxDQUFULElBQWN6QyxFQUFFLENBQUNnQixXQUFILENBQWVzQixJQUFmLENBQW9CLEtBQUs5QixjQUF6QixDQUFkO0FBQ0FSLE1BQUFBLEVBQUUsQ0FBQ2dDLE1BQUgsQ0FBVUMsT0FBVixDQUFrQixrQkFBa0IvQixJQUFwQyxFQUEwQ0YsRUFBRSxDQUFDMEIsU0FBN0MsRUFBd0QsVUFBQ1EsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDbkUsWUFBSU8sQ0FBQyxHQUFHMUMsRUFBRSxDQUFDZ0IsV0FBSCxDQUFlMkIsSUFBZixDQUFvQlIsSUFBcEIsRUFBMEJNLEtBQUssSUFBSSxDQUFuQyxFQUFzQ0QsT0FBTyxJQUFJLENBQWpELENBQVIsQ0FEbUUsQ0FFbkU7QUFDQTs7QUFDQSxZQUFJQyxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNaLFVBQUEsTUFBSSxDQUFDakMsY0FBTCxHQUFzQmtDLENBQXRCO0FBQ0g7QUFDSixPQVBELEVBRmdCLENBWWhCO0FBQ0g7QUFDSixHQXRGSTtBQXdGTEUsRUFBQUEsU0F4RksscUJBd0ZLaEMsRUF4RkwsRUF3RlM7QUFDVixTQUFLTCxTQUFMLEdBQWlCSyxFQUFqQjtBQUNBWixJQUFBQSxFQUFFLENBQUNxQixHQUFILENBQU9DLFlBQVAsQ0FBb0JlLE9BQXBCLENBQTRCLGtCQUE1QixFQUFnRCxLQUFLekIsRUFBckQ7O0FBQ0EsUUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDTFosTUFBQUEsRUFBRSxDQUFDZ0IsV0FBSCxDQUFlc0IsSUFBZixDQUFvQixLQUFLOUIsY0FBekI7QUFDSDtBQUNKO0FBOUZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQXVkaW9NYW5hZ2VyXCIsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9tdXNpY09uOiB0cnVlLFxyXG4gICAgICAgIF9tdXNpY0F1ZGlvSUQ6IG51bGwsXHJcbiAgICAgICAgX211c2ljTmFtZTogJycsXHJcblxyXG4gICAgICAgIF9lZmZlY3RPbjogdHJ1ZSxcclxuICAgICAgICBfZWZmZWN0QXVkaW9JRDogbnVsbCxcclxuXHJcbiAgICAgICAgX0F1ZGlvczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yKCkge1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxcIik7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlQWxsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGxcIik7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHZhciB0ZW1wTXVzaWMgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0NydXNoQW50X011c2ljJyk7XHJcbiAgICAgICAgdmFyIHRlbXBTb3VuZCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnRWF0Q2hpY2tlbl9Tb3VuZCcpO1xyXG4gICAgICAgIC8vIGlmICh0ZW1wTXVzaWMgIT0gbnVsbCAmJiB0ZW1wTXVzaWMgIT0gJycgJiYgdGVtcE11c2ljICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vICAgICB0ZW1wTXVzaWMgPSAodGVtcE11c2ljID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlKVxyXG4gICAgICAgIC8vICAgICB0aGlzLl9tdXNpY09uID0gdGVtcE11c2ljXHJcbiAgICAgICAgLy8gICAgIHRoaXMuX2VmZmVjdE9uID0gdGVtcE11c2ljXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGlmICh0ZW1wU291bmQgIT0gbnVsbCAmJiB0ZW1wU291bmQgIT0gJycgJiYgdGVtcFNvdW5kICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0ZW1wU291bmQgPSAodGVtcFNvdW5kID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlKVxyXG4gICAgICAgICAgICB0aGlzLl9lZmZlY3RPbiA9IHRlbXBTb3VuZFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0TXVzaWNOYW1lKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gY2MuQXVkaW9DbGlwLnJhdygncmVzb3VyY2VzL2F1ZGlvL211c2ljLycgKyBuYW1lICsgJy5tcDMnKVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRFZmZlY3ROYW1lKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gY2MuQXVkaW9DbGlwLnJhdygncmVzb3VyY2VzL2F1ZGlvL2VmZmVjdC8nICsgbmFtZSArICcubXAzJylcclxuICAgIH0sXHJcblxyXG4gICAgcGxheU11c2ljKG5hbWUsIHJlc3RhcnQpIHtcclxuICAgICAgICBpZiAobmFtZSA9PT0gJycgfHwgdGhpcy5fbXVzaWNOYW1lID09PSBuYW1lICYmICFyZXN0YXJ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbXVzaWNOYW1lID0gbmFtZTtcclxuICAgICAgICBpZiAodGhpcy5fbXVzaWNPbikge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWModGhpcy5fbXVzaWNBdWRpb0lEKTtcclxuXHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdhdWRpby9tdXNpYy8nICsgbmFtZSArICcubXAzJywgY2MuQXVkaW9DbGlwLCAoZXJyLCBjbGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tdXNpY0F1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMoY2xpcCwgdHJ1ZSwgdHJ1ZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX211c2ljQXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5nZXRNdXNpY05hbWUobmFtZSksIHRydWUsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0TXVzaWMob24pIHtcclxuICAgICAgICB0aGlzLl9tdXNpY09uID0gb247XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdNVVNJQ19PTicsICcnICsgb24pO1xyXG4gICAgICAgIGlmIChvbikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlNdXNpYyh0aGlzLl9tdXNpY05hbWUsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3AodGhpcy5fbXVzaWNBdWRpb0lEKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlFZmZlY3QobmFtZSwgX3ZvbHVtZSwgX2xvb3ApIHsvL19sb29wPTHkuLrmuIXpmaTkuIrmrKHnmoTlvqrnjq/pn7PmlYgsX2xvb3A9MuS4uuW+queOr+atpOasoemfs+aViFxyXG4gICAgICAgIGlmICh0aGlzLl9lZmZlY3RPbikge1xyXG4gICAgICAgICAgICBfbG9vcCA9PSAxICYmIGNjLmF1ZGlvRW5naW5lLnN0b3AodGhpcy5fZWZmZWN0QXVkaW9JRCk7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdhdWRpby9lZmZlY3QvJyArIG5hbWUsIGNjLkF1ZGlvQ2xpcCwgKGVyciwgY2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIF9sb29wID09IDIsIF92b2x1bWUgfHwgMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUoX3ZvbHVtZSlcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNjLmF1ZGlvRW5naW5lKVxyXG4gICAgICAgICAgICAgICAgaWYgKF9sb29wID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY3RBdWRpb0lEID0gYVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLl9lZmZlY3RBdWRpb0lEID0gY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmdldEVmZmVjdE5hbWUobmFtZSksIF9sb29wID09IDIsIF92b2x1bWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0RWZmZWN0KG9uKSB7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0T24gPSBvbjtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0VhdENoaWNrZW5fU291bmQnLCAnJyArIG9uKTtcclxuICAgICAgICBpZiAoIW9uKSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3AodGhpcy5fZWZmZWN0QXVkaW9JRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==