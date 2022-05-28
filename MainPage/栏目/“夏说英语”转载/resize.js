{
	function resize() {
		document.querySelector("html").style.fontSize = document.querySelector("html").getBoundingClientRect().width /
			76.1 + "px";
	}
	resize();
	window.addEventListener("resize", resize);
}
