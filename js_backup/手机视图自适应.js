$(function() {
	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		$("span").filter(".normal-title").addClass("small-title").removeClass("normal-title"); // 页面div的标题
		$("span").filter(".normal-spirit-size").addClass("small-spirit-size").removeClass("normal-spirit-size"); // 班旗班徽标题
		$("span").filter(".normal-text").addClass("small-text").removeClass("normal-text"); // text自适应
		$("span").filter(".normal-text-br").addClass("small-text-br").removeClass("normal-text-br"); // br自适应
	} else {
		
	}
});
