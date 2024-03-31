export const calcDate = (date1, date2) => {
  var date3 = date2 - date1;
  var days = Math.floor(date3 / (24 * 3600 * 1000));
  // 计算天数后剩余的毫秒数
  var leave1 = date3 % (24 * 3600 * 1000);
  var hours = Math.floor(leave1 / (3600 * 1000));
  // 计算小时数后剩余的毫秒数
  var leave2 = leave1 % (3600 * 1000);
  var minutes = Math.floor(leave2 / (60 * 1000));
  // 计算分钟数后剩余的毫秒数
  var leave3 = leave2 % (60 * 1000);
  var seconds = Math.round(date3 / 1000);
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

/**
 * 日期格式化
 */
export function dateFormat(date) {
  let format = 'yyyy-MM-dd hh:mm:ss';
  if (date != 'Invalid Date') {
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }
  return '';
}

export function formatTime(val) {
  var date;
  if (val) {
      // 兼容Safari
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf('Version') > -1) {
          date = new Date(val.split('+')[0]);
      } else {
          date = new Date(val);
      }
      return date.format('yyyy-MM-dd hh:mm:ss');
  } else {
      return '';
  }
}
