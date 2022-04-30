;
(function($) {
	'use strict'

	function safeAdd(x, y) {
		var lsw = (x & 0xffff) + (y & 0xffff)
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
		return (msw << 16) | (lsw & 0xffff)
	}

	function bitRotateLeft(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt))
	}

	function md5cmn(q, a, b, x, s, t) {
		return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
	}

	function md5ff(a, b, c, d, x, s, t) {
		return md5cmn((b & c) | (~b & d), a, b, x, s, t)
	}

	function md5gg(a, b, c, d, x, s, t) {
		return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
	}

	function md5hh(a, b, c, d, x, s, t) {
		return md5cmn(b ^ c ^ d, a, b, x, s, t)
	}

	function md5ii(a, b, c, d, x, s, t) {
		return md5cmn(c ^ (b | ~d), a, b, x, s, t)
	}

	function binlMD5(x, len) {
		x[len >> 5] |= 0x80 << (len % 32)
		x[((len + 64) >>> 9 << 4) + 14] = len
		var i
		var olda
		var oldb
		var oldc
		var oldd
		var a = 1732584193
		var b = -271733879
		var c = -1732584194
		var d = 271733878
		for (i = 0; i < x.length; i += 16) {
			olda = a
			oldb = b
			oldc = c
			oldd = d
			a = md5ff(a, b, c, d, x[i], 7, -680876936)
			d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
			c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
			b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
			a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
			d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
			c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
			b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
			a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
			d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
			c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
			b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
			a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
			d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
			c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
			b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)
			a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
			d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
			c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
			b = md5gg(b, c, d, a, x[i], 20, -373897302)
			a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
			d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
			c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
			b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
			a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
			d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
			c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
			b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
			a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
			d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
			c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
			b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)
			a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
			d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
			c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
			b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
			a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
			d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
			c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
			b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
			a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
			d = md5hh(d, a, b, c, x[i], 11, -358537222)
			c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
			b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
			a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
			d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
			c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
			b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)
			a = md5ii(a, b, c, d, x[i], 6, -198630844)
			d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
			c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
			b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
			a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
			d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
			c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
			b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
			a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
			d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
			c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
			b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
			a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
			d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
			c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
			b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)
			a = safeAdd(a, olda)
			b = safeAdd(b, oldb)
			c = safeAdd(c, oldc)
			d = safeAdd(d, oldd)
		}
		return [a, b, c, d]
	}

	function binl2rstr(input) {
		var i
		var output = ''
		var length32 = input.length * 32
		for (i = 0; i < length32; i += 8) {
			output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
		}
		return output
	}

	function rstr2binl(input) {
		var i
		var output = []
		output[(input.length >> 2) - 1] = undefined
		for (i = 0; i < output.length; i += 1) {
			output[i] = 0
		}
		var length8 = input.length * 8
		for (i = 0; i < length8; i += 8) {
			output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
		}
		return output
	}

	function rstrMD5(s) {
		return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
	}

	function rstrHMACMD5(key, data) {
		var i
		var bkey = rstr2binl(key)
		var ipad = []
		var opad = []
		var hash
		ipad[15] = opad[15] = undefined
		if (bkey.length > 16) {
			bkey = binlMD5(bkey, key.length * 8)
		}
		for (i = 0; i < 16; i += 1) {
			ipad[i] = bkey[i] ^ 0x36363636
			opad[i] = bkey[i] ^ 0x5c5c5c5c
		}
		hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
		return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
	}

	function rstr2hex(input) {
		var hexTab = '0123456789abcdef'
		var output = ''
		var x
		var i
		for (i = 0; i < input.length; i += 1) {
			x = input.charCodeAt(i)
			output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
		}
		return output
	}

	function str2rstrUTF8(input) {
		return unescape(encodeURIComponent(input))
	}

	function rawMD5(s) {
		return rstrMD5(str2rstrUTF8(s))
	}

	function hexMD5(s) {
		return rstr2hex(rawMD5(s))
	}

	function rawHMACMD5(k, d) {
		return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
	}

	function hexHMACMD5(k, d) {
		return rstr2hex(rawHMACMD5(k, d))
	}

	function md5(string, key, raw) {
		if (!key) {
			if (!raw) {
				return hexMD5(string)
			}
			return rawMD5(string)
		}
		if (!raw) {
			return hexHMACMD5(key, string)
		}
		return rawHMACMD5(key, string)
	}
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return md5
		})
	} else if (typeof module === 'object' && module.exports) {
		module.exports = md5
	} else {
		$.md5 = md5
	}
})(this)

function getPosition(ev) {
	//页面可见大小
	var clientWidth = window.innerWidth;
	var clienHeight = window.innerHeight;
	ev = ev || window.event;
	return (Math.trunc(ev.clientX * 3 / clientWidth + 1) + (Math.trunc(ev.clientY * 3 / clienHeight) * 3)).toString();
}

var menuState = function(game) {
	this.init = function() {
		if (!this.game.device.desktop) {
			this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		}
		this.game.scoreBest = this.game.scoreBest || 0;
		this.game.playerStyle = this.game.playerStyle || 0;
		this.playerArr = [];
	};
	this.preload = function() {
		this.load.image("back", "/WEB_Files/uploadfile/202204/20220430162238634001.png");
		this.load.spritesheet("cloud", "/WEB_Files/uploadfile/202204/20220430162239107003.png", 64, 32);
		this.load.spritesheet("plate", "/WEB_Files/uploadfile/202204/20220430162239370006.png", 64, 40);
		this.load.spritesheet("player", "/WEB_Files/uploadfile/202204/20220430162239500007.png", 36, 64);
		this.load.spritesheet("button", "/WEB_Files/uploadfile/202204/20220430162238516002.png", 80, 40);
		this.load.spritesheet("item", "/WEB_Files/uploadfile/202204/20220430162239412005.png", 24, 24);
		this.load.spritesheet("icon", "/WEB_Files/uploadfile/202204/20220430162239181004.png", 20, 20);
		this.game.add.text(this.world.centerX, this.world.centerY, "Loading...", {
			fontSize: "24px",
			fill: "#fff"
		}).anchor.set(0.5);
	};
	this.create = function() {
		var back = this.game.add.sprite(0, 0, "back");
		back.scale.set(this.game.width / 160, this.game.height / 280);
		// clouds
		for (var i = 0; i < 3; i++) {
			var firstX = this.game.rnd.between(20, this.game.width - 20);
			var firstTime = Math.floor((20000 - 3000 * i) * (firstX + 150) / (this.game.width + 200));
			var cloud = this.game.add.sprite(firstX, this.game.height - 250 + 50 * i, "cloud", this.game.rnd
				.integerInRange(0, 2));
			cloud.scale.set(1 + 0.5 * i);
			cloud.alpha = 0.3;
			this.game.add.tween(cloud).to({
				x: -150
			}, firstTime, "Linear", true).onComplete.add(function(obj, tw, twTime) {
				obj.x = this.game.width + 50;
				obj.frame = this.game.rnd.integerInRange(0, 2);
				this.game.add.tween(obj).to({
					x: -150
				}, twTime, "Linear", true, 0, -1).onLoop.add(function(obj) {
					obj.frame = this.game.rnd.integerInRange(0, 2);
				}, this);
			}, this, 0, 20000 - 3000 * i);
		}

		var box = this.game.add.sprite(this.world.centerX, this.world.centerY, "button", 3);
		box.anchor.set(0.5);
		box.scale.set(this.game.width / 80, 4);
		this.game.add.tween(box).from({
			alpha: 0
		}, 500, "Linear", true);

		var btn = this.game.add.sprite(this.world.centerX, this.world.centerY, "button", 0);
		btn.anchor.set(0.5);
		this.game.add.tween(btn).from({
			alpha: 0
		}, 300, "Linear", true).onComplete.add(function(obj) {
			obj.inputEnabled = true;
			obj.events.onInputDown.add(function() {
				this.game.state.start("main");
			}, this);
		}, this);

		for (var i = 0; i < 3; i++) {
			this.playerArr[i] = this.game.add.sprite(this.world.centerX, 120, "player", i);
			this.playerArr[i].anchor.set(0.5);
			this.playerArr[i].alpha = 0;
		}
		this.playerArr[this.game.playerStyle].alpha = 1;

		var btn1 = this.game.add.sprite(this.world.centerX - 100, 120, "button", 4);
		btn1.anchor.set(0.5);
		btn1.inputEnabled = true;
		btn1.events.onInputDown.add(function() {
			this._setPlayer(-1);
		}, this);
		var btn2 = this.game.add.sprite(this.world.centerX + 100, 120, "button", 5);
		btn2.anchor.set(0.5);
		btn2.inputEnabled = true;
		btn2.events.onInputDown.add(function() {
			this._setPlayer(1);
		}, this);
	};
	this._setPlayer = function(go) {
		this.playerArr[this.game.playerStyle].alpha = 1;
		this.playerArr[this.game.playerStyle].x = this.world.centerX;
		this.game.add.tween(this.playerArr[this.game.playerStyle]).to({
			alpha: 0,
			x: this.world.centerX + go * 50
		}, 200, "Linear", true);

		this.game.playerStyle = (((this.game.playerStyle - go) % 3) + 3) % 3;

		this.playerArr[this.game.playerStyle].alpha = 1;
		this.playerArr[this.game.playerStyle].x = this.world.centerX;
		this.game.add.tween(this.playerArr[this.game.playerStyle]).from({
			alpha: 0,
			x: this.world.centerX - go * 50
		}, 200, "Linear", true);
	};
};

var mainState = function(game) {
	var group, player, effect, point;

	var moving; // 用于记录tween动画状态
	var holding; // 用于记录鼠标按下状态
	var holdTime; // 用于记录鼠标按下时间

	this.pArr = [17, 15, 12, 10, 15, 13, 8, 17]; // 各种类型平台宽度，与平台spritesheet各帧对应
	this.init = function() {

		moving = true;
		holding = false;
		holdTime = 0;

		this.lastX = 40; // 最后一次的距离、方向、平台类型
		this.lastY = 20;
		this.lastD = 1;
		this.lastP = 0;

		this.bonus = 0;
		this.playerStyle = this.game.playerStyle; // 角色样式，对应帧号
		this.items = {
			txt: [null, null, null],
			val: [0, 3, 3]
		}; // 游戏数据在一个对象中保存：[分数，生命，瞄准器]
	};
	this.create = function() {
		var back = this.game.add.sprite(0, 0, "back");
		back.scale.set(this.game.width / 160, this.game.height / 280);
		// clouds
		for (var i = 0; i < 3; i++) {
			var firstX = this.game.rnd.between(20, this.game.width - 20);
			var firstTime = Math.floor((20000 - 3000 * i) * (firstX + 150) / (this.game.width + 200));
			var cloud = this.game.add.sprite(firstX, this.game.height - 250 + 50 * i, "cloud", this.game.rnd
				.integerInRange(0, 2));
			cloud.scale.set(1 + 0.5 * i);
			cloud.alpha = 0.3;
			this.game.add.tween(cloud).to({
				x: -150
			}, firstTime, "Linear", true).onComplete.add(function(obj, tw, twTime) {
				obj.x = this.game.width + 50;
				this.game.add.tween(obj).to({
					x: -150
				}, twTime, "Linear", true, 0, -1).onLoop.add(function(obj) {
					obj.frame = this.game.rnd.integerInRange(0, 2);
				}, this);
			}, this, 0, 20000 - 3000 * i);
		}

		group = this.game.add.group();
		this.plate1 = group.create(this.world.centerX - this.lastX, this.world.centerY + this.lastY, "plate",
		0);
		this.plate1.anchor.set(0.5, 0.4);
		// 连环tween
		this.game.add.tween(this.plate1).from({
			y: this.plate1.y - 50,
			alpha: 0
		}, 200, "Linear", true).onComplete.add(function() {
			this.plate2 = group.create(this.world.centerX + this.lastX, this.world.centerY - this.lastY,
				"plate", 0);
			this.plate2.anchor.set(0.5, 0.4);
			this.plate2.sendToBack();
			this.game.add.tween(this.plate2).from({
				y: this.plate2.y - 50,
				alpha: 0
			}, 200, "Linear", true).onComplete.add(function() {
				// 光效
				effect = group.create(0, 0, "button", 6);
				effect.anchor.set(0.5);
				effect.visible = false; // 与平台共一个组，只用visible控制显示或隐藏，用kill的话会被拿去做平台

				// 瞄准器
				point = group.create(0, 0, "button", 7);
				point.anchor.set(0.5);
				point.scale.set(0.5);
				point.visible = false; // 与平台共一个组，只用visible控制显示或隐藏，用kill的话会被拿去做平台

				player = group.create(this.world.centerX - this.lastX, this.world.centerY + this
					.lastY);
				// 身体
				player.b = player.addChild(this.game.add.sprite(0, 0, "player", this
					.playerStyle));
				player.b.anchor.set(0.5, 0.875);
				player.b.animations.add("delay", [this.playerStyle], 10, false);
				// 加分提示文本
				player.txt = player.addChild(this.game.add.text(0, -30, "", {
					fontSize: "16px",
					fill: "#fff"
				}));
				player.txt.anchor.set(0.5);

				this.game.add.tween(player).from({
					y: player.y - 50,
					alpha: 0
				}, 200, "Linear", true).onComplete.add(function() {
					moving = false;
				}, this);
			}, this);
		}, this);

		this.items.txt[0] = this.game.add.text(this.world.centerX, 80, "0", {
			fontSize: "48px",
			fill: "#999"
		});
		this.items.txt[0].anchor.set(0.5);
		this.game.add.sprite(10, 10, "icon", 0);
		this.game.add.sprite(75, 10, "icon", 1);
		this.items.txt[1] = this.game.add.text(35, 10, this.items.val[1], {
			fontSize: "16px",
			fill: "#999"
		});
		this.items.txt[2] = this.game.add.text(100, 10, this.items.val[2], {
			fontSize: "16px",
			fill: "#999"
		});

		this.game.input.onDown.add(function() {
			if (!moving && !holding) {
				holding = true;
				holdTime = this.game.time.now;
				if (this.items.val[2] > 0) {
					point.x = player.x;
					point.y = player.y;
					point.visible = true;
				}
			}
		}, this);
		this.game.input.onUp.add(this._jump, this);
	};
	this.update = function() {
		if (holding) { // 储力效果，简单的缩短
			var power = Math.min(Math.floor((this.game.time.now - holdTime) / 16), 250); // 计算力度，限制数值最大为250
			player.scale.y = 1 - (power > 100 ? 0.3 : 0.3 * power / 100);
			if (this.items.val[2] > 0) {
				var tarX = this.world.centerX - this.lastX + this.lastD * power * 2;
				var tarY = this.world.centerY + this.lastY - power;
				point.x = tarX;
				point.y = tarY;
			}
		}
	};
	this._setItem = function(id, v) {
		this.items.val[id] += v;
		this.items.txt[id].text = this.items.val[id];
	};
	this._jump = function() {
		if (!moving && holding) {
			moving = true;
			holding = false;
			player.scale.y = 1;
			point.visible = false;
			var power = Math.min(Math.floor((this.game.time.now - holdTime) / 16), 250); // 计算力度，限制数值最大为250
			var jumpX = this.world.centerX - this.lastX + this.lastD * power * 2;
			var jumpY = this.world.centerY + this.lastY - power;
			// *** 跳跃效果 ***
			var jumpTime = 300; // 跳跃动作时长
			// 外壳直线位移至目的地
			this.game.add.tween(player).to({
				x: jumpX,
				y: jumpY
			}, jumpTime, "Linear", true).onComplete.add(function(obj) {
				if (this._checkScore()) {
					obj.b.animations.play("delay", 10).onComplete.addOnce(this._newPlate,
					this); // 这里用帧动画实现停顿效果（帧速10代表停顿十分之一秒）
				} else {
					obj.b.animations.play("delay", 10).onComplete.addOnce(this._fall, this);
				}
			}, this);
			// 身体只做跳跃动作即可
			player.b.y = -40;
			player.b.angle = -this.lastD * 150;
			this.game.add.tween(player.b).to({
				angle: -this.lastD * 90,
				x: this.lastD * 20,
				y: -80
			}, jumpTime / 2, Phaser.Easing.Quadratic.Out, false).to({
				angle: 0,
				x: 0,
				y: 0
			}, jumpTime / 2, Phaser.Easing.Quadratic.In, true);
			// ******
		}
	};
	this._checkScore = function() {
		// 检测是否跳中目标，比较player和plate2的位置，返回true或false，同时播放得分提示和光效
		if (this.items.val[2] > 0) {
			this._setItem(2, -1);
		}
		if (Math.abs(player.x - this.plate2.x) <= this.pArr[this.lastP]) { // 跳中位置...
			if (this.plate2.item && this.plate2.item.alive) {
				this._setItem(this.plate2.itemID, 1);
				this.plate2.item.kill();
			}
			var addScore = 1;
			if (Math.abs(player.x - this.plate2.x) <= 3) { // 3像素以内，以2分递增，播放光效
				this.bonus += 2;
				addScore = this.bonus;
				effect.reset(this.plate2.x, this.plate2.y);
				effect.scale.set(0.5);
				effect.visible = true;
				effect.alpha = 1;
				this.game.add.tween(effect.scale).to({
					x: 3,
					y: 3
				}, 800, Phaser.Easing.Cubic.Out, true);
				this.game.add.tween(effect).to({
					alpha: 0
				}, 800, Phaser.Easing.Cubic.Out, true).onComplete.add(function(obj) {
					obj.visible = false;
				}, this);
			} else {
				this.bonus = 0;
			}
			this._setItem(0, addScore);
			// 加分效果
			player.txt.reset(0, -30);
			player.txt.text = addScore;
			player.txt.alpha = 1;
			this.game.add.tween(player.txt).to({
				y: player.txt.y - 50,
				alpha: 0
			}, 800, "Linear", true).onComplete.add(function(txt) {
				txt.kill();
			}, this);
			return true;
		} else {
			return false;
		}
	};
	this._fall = function() {
		player.sendToBack();
		if (player.y > this.plate2.y) {
			this.plate2.sendToBack();
		}

		if (Math.abs(player.x - this.plate2.x) - this.pArr[this.lastP] < 12) { // 碰到部分,倾斜（12为player身体的半宽）
			player.angle = (player.y < this.plate2.y && this.lastD > 0) || (player.y > this.plate2.y && this
				.lastD < 0) ? 30 : -30; // 左倾斜或是右倾斜
		}
		this.game.add.tween(player).to({
			y: player.y + 100,
			alpha: 0
		}, 500, "Linear", true).onComplete.add(function() {
			this._setItem(1, -1);
			if (this.items.val[1] > 0) {
				player.x = this.world.centerX - this.lastX;
				player.y = this.world.centerY + this.lastY - 50;
				player.angle = 0;
				player.bringToTop();
				this.game.add.tween(player).to({
					y: player.y + 50,
					alpha: 1
				}, 200, "Linear", true).onComplete.add(function() {
					moving = false;
				}, this);
			} else {
				this._overMenu();
			}
		}, this);
	};
	this._newPlate = function(sprite, anim) {
		moving = false;
		var newRange = this.game.rnd.integerInRange(10, 50); // 随机生成一个距离
		var newD = this.game.rnd.sign(); // 随机方向（-1:左，1:右）
		var newX = newD * newRange * 2; // 计算新平台的相对于上一个平台的X位置
		var newY = newRange; // 计算新平台的相对于上一个平台的Y位置
		this.lastP = this.game.rnd.between(0, 7); // 随机平台类型（对应平台的spritesheet中随机一个帧）
		this.plate2 = group.getFirstDead(true, this.world.centerX + this.lastX + newX * 2, this.world.centerY -
			this.lastY - newY * 2, "plate", this.lastP);
		this.plate2.anchor.set(0.5, 0.4);
		this.plate2.sendToBack();
		// 随机产生道具
		if (this.game.rnd.integerInRange(0, 10) > 6) {
			if (this.plate2.item) {
				this.plate2.item.reset(0, 0);
				this.plate2.itemID = this.game.rnd.integerInRange(1, 2);
				this.plate2.item.play("item_" + this.plate2.itemID);
			} else {
				this.plate2.item = this.plate2.addChild(this.game.add.sprite(0, 0, "item"));
				this.plate2.item.anchor.set(0.5, 0.9);
				this.plate2.item.animations.add("item_1", [0, 1, 2, 1], 5, true);
				this.plate2.item.animations.add("item_2", [3, 4, 5, 4], 5, true);
				this.plate2.itemID = this.game.rnd.integerInRange(1, 2);
				this.plate2.item.play("item_" + this.plate2.itemID);
			}
		}
		this.game.add.tween(this.plate2).from({
			alpha: 0
		}, 200, "Linear", true);
		group.forEachAlive(this._tween, this, newX, newY); // 整体往后移
		this.lastX = newX;
		this.lastY = newY;
		this.lastD = newD;
	};
	this._tween = function(plate, newX, newY) {
		this.game.add.tween(plate).to({
			x: plate.x - this.lastX - newX,
			y: plate.y + this.lastY + newY
		}, 300, "Linear", true).onComplete.add(function(plate) {
			if (!plate.inWorld && plate != player) {
				plate.kill();
			}
		}, this);
	};
	this._overMenu = function() {
		var box = this.game.add.sprite(this.world.centerX, this.world.centerY, "button", 3);
		box.anchor.set(0.5);
		box.scale.set(this.game.width / 80, 4);
		this.game.add.tween(box).from({
			alpha: 0
		}, 300, "Linear", true);

		var btn1 = this.game.add.sprite(this.world.centerX + 50, this.world.centerY, "button", 1);
		btn1.anchor.set(0.5);
		this.game.add.tween(btn1).from({
			alpha: 0
		}, 300, "Linear", true).onComplete.add(function(obj) {
			obj.inputEnabled = true;
			obj.events.onInputDown.add(function() {
				this.game.state.start("main");
			}, this);
		}, this);

		var btn2 = this.game.add.sprite(this.world.centerX - 50, this.world.centerY, "button", 2);
		btn2.anchor.set(0.5);
		this.game.add.tween(btn2).from({
			alpha: 0
		}, 300, "Linear", true).onComplete.add(function(obj) {
			obj.inputEnabled = true;
			obj.events.onInputDown.add(function() {
				this.game.state.start("menu");
			}, this);
		}, this);

		this.game.scoreBest = this.items.val[0] > this.game.scoreBest ? this.items.val[0] : this.game.scoreBest;
		this.game.add.text(this.world.centerX, this.world.centerY + 50, "Best : " + this.game.scoreBest, {
			fontSize: "16px",
			fill: "#fff"
		}).anchor.set(0.5);
	};
};
var password_play = "";
window.onload = function() {
	document.body.onclick = function(ev) {

		/**  修改区  **/
		var passlen = 15; // To be modified.
		var right_res = "6f19940a612bd86e05d50409ae976551"; // To be modified.
		/**         **/

		password_play += getPosition(ev);
		var md5_res = md5(password_play.substring(password_play.length - passlen));
		for (var i = 1; i <= 20; i++) {
			md5_res = md5(md5_res);
		}
		console.log("md5_res=" + md5_res);
		if (md5_res === right_res) {
			// do something
			var game = new Phaser.Game(360, 600, Phaser.CANVAS, '');
			game.state.add("menu", menuState, true);
			game.state.add("main", mainState);;
			document.body.onclick = null;
		} else {
			// do something
		}
	}
};
/**
 * 温馨提醒：请在获取班主任允许后复制本班代码！
 * 代码的复制和使用与本班(D2401)无关！
 */
// phasor: /WEB_Files/uploadfile/fujian/202203/20220305201254820.hlp
