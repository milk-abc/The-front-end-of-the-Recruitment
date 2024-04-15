function getLastMonthDate() {
  var nowdays = new Date();
  var year = nowdays.getFullYear();
  var month = nowdays.getMonth();
  if (month == 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var myDate = new Date(year, month, 0);
  // var startDate = year + '-' + month + '-01 00:00:00' //上个月第一天
  var endDate = year + "-" + month + "-" + myDate.getDate(); //上个月最后一天
  return endDate;
}
console.log("hhh", getLastMonthDate());
