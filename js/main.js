$(function() {
	var canvas = $("#c");
	var canvasHeight;
	var canvasWidth;
	var ctx;
	var dt = 0.1;
	
	var pointCollection;
	
	function init() {
		updateCanvasDimensions();
		
		var g = [new Point(-250, 0, 0.0, 8, "#ed9d33"), 
		new Point(-234, 0, 0.0, 8, "#d44d61"), 
		new Point(-218, 0, 0.0, 8, "#4f7af2"), 
		new Point(-202, 0, 0.0, 8, "#ef9a1e"), 
		new Point(-250, 16, 0.0, 8, "#4976f3"), 
		new Point(-250, 32, 0.0, 8, "#269230"), 
		new Point(-234, 32, 0.0, 8, "#1f9e2c"), 
		new Point(-218, 32, 0.0, 8, "#1c48dd"), 
		new Point(-202, 32, 0.0, 8, "#2a56ea"), 
		new Point(-202, 48, 0.0, 8, "#3355d8"), 
		new Point(-202, 64, 0.0, 8, "#36b641"), 
		new Point(-218, 64, 0.0, 8, "#2e5def"), 
		new Point(-234, 64, 0.0, 8, "#d53747"), 
		new Point(-250, 64, 0.0, 8, "#eb676f"), 
		//H
		new Point(-175, 0, 0.0, 8, "#f9b125"), 
		new Point(-175, 16, 0.0, 8, "#de3646"), 
		new Point(-175, 32, 0.0, 8, "#2a59f0"), 
		new Point(-159, 32, 0.0, 8, "#eb9c31"), 
		new Point(-143, 32, 0.0, 8, "#c41731"), 
		new Point(-127, 32, 0.0, 8, "#d82038"), 
		new Point(-127, 0, 0.0, 8, "#5f8af8"), 
		new Point(-127, 16, 0.0, 8, "#efa11e"), 
		new Point(-127, 48, 0.0, 8, "#2e55e2"), 
		new Point(-127, 64, 0.0, 8, "#4167e4"), 
		new Point(-127, 64, 0.0, 8, "#0b991a"), 
		new Point(-175, 64, 0.0, 8, "#4869e3"), 
		new Point(-175, 48, 0.0, 8, "#3059e3"), 
		//A
		new Point(-78, 0, 0.0, 8, "#10a11d"), 
		new Point(-83.5, 16.5, 0.0, 8, "#cf4055"), 
		new Point(-87.5, 32.5, 0.0, 8, "#cd4359"), 
		new Point(-91.5, 48.5, 0.0, 8, "#2855ea"), 
		new Point(-95.5, 64.5, 0.0, 8, "#ca273c"), 
		new Point(-69, 32.5, 0.0, 8, "#2650e1"), 
		new Point(-52.5, 32.5, 0.0, 8, "#4a7bf9"), 
		new Point(-49, 48.5, 0.0, 8, "#3d65e7"), 
		new Point(-45.5, 64.5, 0.0, 8, "#f47875"), 
		new Point(-55, 16.5, 0.0, 8, "#f36764"), 
		new Point(-61, 0, 0.0, 8, "#1d4eeb"),
        //R		
		new Point(-22, 0, 0.0, 8, "#698bf1"), 
		new Point(-22, 16, 0.0, 8, "#fac652"), 
		new Point(-22, 32, 0.0, 8, "#ee5257"), 
		new Point(-22, 48, 0.0, 8, "#cf2a3f"), 
		new Point(-22, 64, 0.0, 8, "#5681f5"), 
		new Point(-6, 0, 0.0, 8, "#4577f6"), 
		new Point(10, 0, 0.0, 8, "#f7b326"), 
		new Point(6, 30, 0.0, 8, "#2b58e8"), 
		new Point(17, 42.5, 0.0, 8, "#f7b326"),
		new Point(17, 17, 0.0, 8, "#4779f7"),
		new Point(22, 60.5, 0.0, 8, "#2b58e8")]
		
		
		
		
		gLength = g.length;
		for (var i = 0; i < gLength; i++) {
			g[i].curPos.x = (canvasWidth/2 - 180) + g[i].curPos.x;
			g[i].curPos.y = (canvasHeight/2 - 65) + g[i].curPos.y;
			
			g[i].originalPos.x = (canvasWidth/2 - 180) + g[i].originalPos.x;
			g[i].originalPos.y = (canvasHeight/2 - 65) + g[i].originalPos.y;
		};
		
		pointCollection = new PointCollection();
		pointCollection.points = g;
		
		initEventListeners();
		timeout();
	};
	
	function initEventListeners() {
		$(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
		
		canvas.get(0).ontouchmove = function(e) {
			e.preventDefault();
			onTouchMove(e);
		};
		
		canvas.get(0).ontouchstart = function(e) {
			e.preventDefault();
		};
	};
	
	function updateCanvasDimensions() {
		canvas.attr({height: $(window).height(), width: $(window).width()});
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();

		draw();
	};
	
	function onMove(e) {
		if (pointCollection)
			pointCollection.mousePos.set(e.pageX, e.pageY);
	};
	
	function onTouchMove(e) {
		if (pointCollection)
			pointCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	};
	
	function timeout() {
		draw();
		update();
		
		setTimeout(function() { timeout() }, 30);
	};
	
	function draw() {
		var tmpCanvas = canvas.get(0);

		if (tmpCanvas.getContext == null) {
			return; 
		};
		
		ctx = tmpCanvas.getContext('2d');
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		if (pointCollection)
			pointCollection.draw();
	};
	
	function update() {		
		if (pointCollection)
			pointCollection.update();
	};
	
	function Vector(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
 
		this.addX = function(x) {
			this.x += x;
		};
		
		this.addY = function(y) {
			this.y += y;
		};
		
		this.addZ = function(z) {
			this.z += z;
		};
 
		this.set = function(x, y, z) {
			this.x = x; 
			this.y = y;
			this.z = z;
		};
	};
	
	function PointCollection() {
		this.mousePos = new Vector(0, 0);
		this.points = new Array();
		
		this.newPoint = function(x, y, z) {
			var point = new Point(x, y, z);
			this.points.push(point);
			return point;
		};
		
		this.update = function() {		
			var pointsLength = this.points.length;
			
			for (var i = 0; i < pointsLength; i++) {
				var point = this.points[i];
				
				if (point == null)
					continue;
				
				var dx = this.mousePos.x - point.curPos.x;
				var dy = this.mousePos.y - point.curPos.y;
				var dd = (dx * dx) + (dy * dy);
				var d = Math.sqrt(dd);
				
				if (d < 150) {
					point.targetPos.x = (this.mousePos.x < point.curPos.x) ? point.curPos.x - dx : point.curPos.x - dx;
					point.targetPos.y = (this.mousePos.y < point.curPos.y) ? point.curPos.y - dy : point.curPos.y - dy;
				} else {
					point.targetPos.x = point.originalPos.x;
					point.targetPos.y = point.originalPos.y;
				};
				
				point.update();
			};
		};
		
		this.draw = function() {
			var pointsLength = this.points.length;
			for (var i = 0; i < pointsLength; i++) {
				var point = this.points[i];
				
				if (point == null)
					continue;

				point.draw();
			};
		};
	};
	
	function Point(x, y, z, size, colour) {
		this.colour = colour;
		this.curPos = new Vector(x, y, z);
		this.friction = 0.8;
		this.originalPos = new Vector(x, y, z);
		this.radius = size;
		this.size = size;
		this.springStrength = 0.1;
		this.targetPos = new Vector(x, y, z);
		this.velocity = new Vector(0.0, 0.0, 0.0);
		
		this.update = function() {
			var dx = this.targetPos.x - this.curPos.x;
			var ax = dx * this.springStrength;
			this.velocity.x += ax;
			this.velocity.x *= this.friction;
			this.curPos.x += this.velocity.x;
			
			var dy = this.targetPos.y - this.curPos.y;
			var ay = dy * this.springStrength;
			this.velocity.y += ay;
			this.velocity.y *= this.friction;
			this.curPos.y += this.velocity.y;
			
			var dox = this.originalPos.x - this.curPos.x;
			var doy = this.originalPos.y - this.curPos.y;
			var dd = (dox * dox) + (doy * doy);
			var d = Math.sqrt(dd);
			
			this.targetPos.z = d/100 + 1;
			var dz = this.targetPos.z - this.curPos.z;
			var az = dz * this.springStrength;
			this.velocity.z += az;
			this.velocity.z *= this.friction;
			this.curPos.z += this.velocity.z;
			
			this.radius = this.size*this.curPos.z;
			if (this.radius < 1) this.radius = 1;
		};
		
		this.draw = function() {
			ctx.fillStyle = this.colour;
			ctx.beginPath();
			ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI*2, true);
			ctx.fill();
			
		};
		
		
	};
	
	init();
	
	
	
});