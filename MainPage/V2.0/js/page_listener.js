/**
 * see: font_size_selfsuit.js
 */
function Size() {
	//根据屏幕大小切换字体
	// 动态设置html标签的字体大小从而定了rem的大小
	var Ohtml = document.documentElement;
	var screenWidth = Ohtml.clientWidth;
	if (screenWidth <= 320) {
		Ohtml.style.fontSize = '6.25px';
	} else if (screenWidth >= 768) {
		Ohtml.style.fontSize = '15px';
	} else {
		Ohtml.style.fontSize = screenWidth / (51.2) + 'px';
	}
}
$(window).resize(function() {
 	//监听窗口大小变化
 	Size();
 });
