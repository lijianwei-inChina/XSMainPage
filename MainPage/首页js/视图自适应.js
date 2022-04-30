$(function() {
	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) { // 手机页面视图
		$("span").filter(".normal-title").addClass("small-title").removeClass("normal-title"); // 页面div的标题
		$("span").filter(".normal-spirit-size").addClass("small-spirit-size").removeClass("normal-spirit-size"); // 班旗班徽标题
		$("span").filter(".normal-text").addClass("small-text").removeClass("normal-text"); // text自适应
		$("span").filter(".normal-text-br").addClass("small-text-br").removeClass("normal-text-br"); // br自适应
	} else {
		if($("#content_article").length > 0){ // 班级主页的页面视图
			$("#content_article").children().eq(0).addClass("top-wheather-text-div"); // 班级主页 天气部分样式
		}
		else { // 电脑端网页视图
			
		}
	}
});
