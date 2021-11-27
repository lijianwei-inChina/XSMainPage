function Size() {
	//根据屏幕大小切换字体
	// 动态设置html标签的字体大小从而定了rem的大小
	var Ohtml = document.documentElement;
	var screenWidth = Ohtml.clientWidth;
	if (screenWidth <= 320) {
		Ohtml.style.fontSize = '12.5px';
	} else if (screenWidth >= 768) {
		Ohtml.style.fontSize = '30px';
	} else {
		Ohtml.style.fontSize = screenWidth / (25.6) + 'px';
	}
}
$(function() {
	Size();
})
