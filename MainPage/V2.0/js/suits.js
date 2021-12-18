$(function() {
	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) { // 手机页面视图
		if ($(".newsCon").eq(0).children().eq(1).children().eq(0).children().eq(0).html().indexOf('审核') != -1) {
			// 未审核通过视图

		}
	} else {
		if ($("#content_article").length > 0) { // 班级主页的页面视图

		} else { // 电脑端网页视图
			if ($(".newsCon").eq(0).children().eq(1).children().eq(0).children().eq(0).html().indexOf('审核') != -
				1) {
				// 未审核通过视图

			}

		}
	}
});
