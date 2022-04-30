var oSpan = document.getElementById("p");

function tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}

function getDate() {
    var oDate = new Date();
    var oldTime = oDate.getTime();
    var newDate = new Date('2024/06/07 00:00:00');
    var newTime = newDate.getTime();
    var second = Math.floor((newTime - oldTime) / 1000);
    var day = Math.floor(second / 86400);
    second = second % 86400;
    var hour = Math.floor(second / 3600);
    second %= 3600;
    var minute = Math.floor(second / 60);
    second %= 60;
    document.getElementById("day").innerHTML = tow(day) + '<span class="time">天</span>';
    var str = tow(hour) + '<span class="time">小时</span>' + tow(minute) + '<span class="time">分钟</span>' + tow(second) + '<span class="time">秒</span>';
    oSpan.innerHTML = str;
}
$(function(){getDate();setInterval(getDate, 500);});