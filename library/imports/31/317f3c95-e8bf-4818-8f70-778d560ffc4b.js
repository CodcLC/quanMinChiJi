"use strict";
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