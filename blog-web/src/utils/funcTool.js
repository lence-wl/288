/*
	时间格式化函数
	EX  :DateFormat(new Date(), "yyyy/MM/dd HH-mm-ss"))
* */
export function dateFormat(d, f='yyyy/MM/dd HH-mm') {
    let t = {
        "y+": d.getFullYear(),
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "H+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "S+": d.getMilliseconds()
    };
    let _t;
    for (var k in t) {
        while (new RegExp("(" + k + ")").test(f)) {
            _t = (RegExp.$1.length == 1) ? t[k] : ("0000000000".substring(0, RegExp.$1.length) + t[k]).substr(("" + t[k]).length);
            f = f.replace(RegExp.$1, _t + "");
        }
    }
    return f;
};


