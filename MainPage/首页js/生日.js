$(function() {
    var names = new Array("陈妍", "何若涵", "胡婧雅", "金轶凡", "刘昕濛", "王星", "王翊茗", "谢天煜", "杨祝琦", "周若蘅", "陈海阳", "丁博豪", "董家彤", "高端", "华羽帆", "李坚蔚", "李正阳", "路骐鸣", "施凌轩", "孙若垒", "王星皓", "吴顺迪", "吴煜升", "谢董毅", "徐浩哲", "徐哲", "徐振羽", "杨昊", "杨洋", "叶旭焘", "余晨熙", "余劲阳", "张沛炎", "张雨沛", "张志骋", "周禹墨", "朱鼎宇", "朱浩翔", "朱柯瑜");
    var birthdays = new Array("11.08", "12.06", "03.15", "09.30", "05.01", "05.05", "05.10", "09.24", "12.08", "02.27", "06.16", "10.31", "07.08", "12.31", "10.06", "12.16", "10.06", "04.23", "11.26", "11.12", "03.24", "05.15", "03.27", "08.14", "09.08", "02.09", "05.25", "10.27", "01.22", "06.20", "02.23", "03.31", "03.25", "10.10", "06.28", "06.28", "04.18", "07.14", "05.05");
    var results = "",
        flag = false;
    for (var i = 0; i < names.length; i++) {
        var dt = "";
        if (new Date().getMonth() > 8) dt = (new Date().getMonth() + 1) + ".";
        else dt = "0" + (new Date().getMonth() + 1) + ".";
        if (new Date().getDate() > 9) dt = dt + new Date().getDate();
        else dt = dt + "0" + new Date().getDate();
        if (birthdays[i] == dt) {
            results = results + names[i] + ",";
            flag = true
        }
    }
    if (flag) {
        results = results.substring(0, results.length - 1) + " " + "今天生日！"
    } else {
        results = "今天没人生日"
    }
    document.getElementById("birthday-p").innerHTML = results;
});