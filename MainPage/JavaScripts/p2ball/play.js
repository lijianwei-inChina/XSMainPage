var GameState = function(game){
	var _over = false;
	var _holding = false;
	var _going = false;
	var _pointID = -1;
	var _ballNum = 3;
	var _ballKill = 0;
	var _xrow;
	var _score;
	var _level;

	var balls,shapes,line,tweenText;
	var ballMaterial,worldMaterial;

	this.init = function(){
		game.stage.backgroundColor = "#112233";
		_over = false;
		_holding = false;
		_going = false;
		_pointID = -1;
		_ballNum = 3;
		_ballKill = 0;
		_xrow = 0;
		_score = 0;
		_level = 0;
	};

	this.preload = function(){
		if(!game.device.desktop){
			this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		}else{
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		}
		this.load.image("ground", "/WEB_Files/uploadfile/202203/20220305201408972005.png");
		this.load.spritesheet("ball", "/WEB_Files/uploadfile/202203/20220305201403681001.png",32,32);
		this.load.spritesheet("ball2", "/WEB_Files/uploadfile/202203/20220305201403185002.png",48,48);
		this.load.spritesheet("button", "/WEB_Files/uploadfile/202203/20220305201407546003.png",80,40);
		this.load.image("dot", "/WEB_Files/uploadfile/202203/20220305201407370004.png");
	};

	this.create = function(){
		game.physics.startSystem(Phaser.Physics.P2JS); 
		game.physics.p2.gravity.y = 1000;

		ballMaterial = game.physics.p2.createMaterial('ballMaterial');
		worldMaterial = game.physics.p2.createMaterial('worldMaterial');
		game.physics.p2.createContactMaterial(ballMaterial, worldMaterial, { restitution:0.98, friction:0 });
		game.physics.p2.createContactMaterial(ballMaterial, ballMaterial,{ restitution:0, friction:0, stiffness:0.00001 });
		game.physics.p2.setWorldMaterial(worldMaterial);

		game.add.tileSprite(0, 0, game.width, 60, "ground").alpha=0.5;

		var home = game.add.sprite(game.world.centerX, 30, "ball", 3);
		home.anchor.setTo(0.5);
		home.scale.setTo(1.2);
		home.update = function(){this.alpha = (!_over && !_going) ? 1 : 0.5;};

		var scoreText = game.add.text(10, 30, _score + "", {fontSize:"20px", fill:"#fff"});
		scoreText.anchor.setTo(0, 0.5);
		scoreText.update = function(){this.text = _score;};

		var levelText = game.add.text(game.width-10, 30, _ballNum + "", {fontSize:"20px", fill:"#fff"});
		levelText.anchor.setTo(1, 0.5);
		levelText.update = function(){this.text = _ballNum;};

		shapes = game.add.physicsGroup(Phaser.Physics.P2JS);
		balls = game.add.physicsGroup(Phaser.Physics.P2JS);

		// Ground
		var ground = game.add.tileSprite(game.world.centerX, game.height-30, game.width, 60, "ground");
		game.physics.p2.enable(ground);  
		ground.body.static = true;
		ground.body.onBeginContact.add(function(b1,b2){
			if(b1 && b1.sprite.key == "ball"){
				b1.sprite.kill();
				_ballKill++;
				if(_ballKill==_ballNum){
					this._shapesUp();
				}
			}
		},this);

		tweenText = game.add.text(0,0,"",{fontSize:"36px", fill:"#fff"});
		tweenText.anchor.setTo(0.5);
		tweenText.alpha = 0;

		line = game.add.tileSprite(game.world.centerX, 30, game.world.centerX, 16, "dot");
		line.anchor.setTo(0,0.5);
		line.visible = false;

		// Create shapes
		for (var i=2; i<5; i++){
			this._createShapes(i);
		}

		game.input.onDown.add(function(p){
			if(!_over && !_going && !_holding){
				_holding = true;
				_pointID = p.id;
				line.rotation = Math.atan2(p.y - 20, p.x - 225);
				line.visible = true;
			}
		},this);

		game.input.onUp.add(function(p){
			if(_holding && p.id == _pointID){
				_holding = false;
				_pointID = -1;
				_going = true;
				line.visible = false;
				// Create Balls
				var vPoint = this._velocityFromRotation(line.rotation,800);
				for(var i=0; i<_ballNum; i++){
					game.time.events.add(200*i,function(id,p){
						if(id<balls.children.length){
							var ball = balls.getChildAt(id);
							ball.reset(game.world.centerX, 30);
						}else{
							var ball = balls.create(game.world.centerX, 30, "ball", 0);
							ball.anchor.set(0.5);
							ball.scale.set(0.7);
							ball.body.setCircle(12);
							ball.body.setMaterial(ballMaterial);
							ball.body.onBeginContact.add(function(b1,b2){
								if(this.body.data.gravityScale == 0){
									if(b1 && b1.sprite.key == "ball"){
										return;
									}
									this.body.data.gravityScale = 1;
								}
							},ball);
						}
						ball.body.data.gravityScale = 0;
						ball.body.velocity.x = p.x;
						ball.body.velocity.y = p.y;
					},this,i,vPoint);
				}
				_ballKill = 0;
			}
		},this);
	};

	this.update = function(){
		if(!_going && _holding){
			var p = _pointID==0 ? game.input.mousePointer : game.input.pointers[_pointID-1];
			line.rotation = Math.atan2(p.y - 20, p.x - 225);
		}
	};

	this._shapesUp = function(){
		this._createShapes(5);
		shapes.forEachAlive(function(shape){
			var topY = shape.body.y - 90;
			if(topY<60 && !_over){
				_over = true;
				this._overMenu();
			}
			game.add.tween(shape.body).to({y:topY},200,"Linear",true);
		},this);
		_going = false;
	};

	this._createShapes = function(i){
		if(_xrow==0){
			this._levelUp();
		}
		var col = 5 - (_xrow % 2);
		for (var j=0; j<col; j++){
			var shapeID = game.rnd.between(1,3);
			var angle = game.rnd.between(0,11)*30;
			var shape = shapes.getFirstDead(true, 65 + j * 90 + 45 * (_xrow % 2), 300 + i * 90, "ball2", shapeID);
			shape.anchor.set(0.5);
			if(shapeID==1){
				shape.body.setRectangle(44,44,0,0);
			}else if(shapeID==3){
				shape.body.addPolygon(null,[23,0,0,39,1,40,46,40,47,39,24,0]);
			}else{
				shape.body.setCircle(22);
			}
			shape.body.static = true;
			shape.body.setMaterial(worldMaterial);
			shape.health = game.rnd.between(_ballNum, _ballNum * 4); // 生命值为球数量的1~4倍
			if(!shape.txt){
				shape.txt = shape.addChild(game.make.text(0,0,shape.health+"",{fontSize:"20px", fill:"#f00"}));
				shape.txt.anchor.set(0.5);
				shape.update = function(){this.txt.text = this.health;};
				shape.body.onEndContact.add(function(b1,b2){
					this.damage(1);
					_score++;
				},shape);
			}
			shape.body.angle = angle;
			shape.txt.angle = -angle;
		}
		_xrow = (_xrow+1) % 10; // 每10行过关
	};

	this._velocityFromRotation = function (rotation, speed) {
		return new Phaser.Point((Math.cos(rotation) * speed), (Math.sin(rotation) * speed));
	};

	this._levelUp = function(){
		_level ++;
		_ballNum = _level + 2; // 球数量为关数+2（第一关为3球，每过一关+1球）
		tweenText.x = this.world.centerX;
		tweenText.y = this.world.centerY;
		tweenText.alpha = 0;
		tweenText.setText("LEVEL - " + _level);
		game.add.tween(tweenText)
		.to({y:tweenText.y-100,alpha:0.8},300,"Linear",false)
		.to({y:tweenText.y-150},500,"Linear",false)
		.to({y:tweenText.y-250,alpha:0},300,"Linear",true);
	};

	this._overMenu = function(){
		var box = game.add.sprite(game.world.centerX, game.world.centerY, "button", 3);
		box.anchor.set(0.5);
		box.alpha = 0.8;
		box.scale.set(game.width/80,5);

		game.add.text(game.world.centerX, game.world.centerY-40, "Game Over", {fontSize:"36px", fill:"#fff"}).anchor.set(0.5);

		var btn1 = game.add.sprite(game.world.centerX, game.world.centerY+40, "button", 1);
		btn1.anchor.set(0.5);
		btn1.inputEnabled = true;
		btn1.events.onInputDown.add(function(){
			game.state.start("main");
		},this);
	};
};

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

window.onload = function(){
	var now = new Date(),
		y = now.getFullYear(),
		m = now.getMonth() + 1,
		d = now.getDate();
	var s = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " D2401Permission";
	if(localStorage.getItem('XSMainpage_p2ball') === md5(s)){
		// $("div").filter("#main").remove();
		var game = new Phaser.Game(500, 860, Phaser.CANVAS, '');
		game.state.add("main",GameState,true);
	} else {
		// do nothing
	}
};
// /WEB_Files/uploadfile/fujian/202203/20220312134929884.hlp
