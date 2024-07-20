// 格式化新闻日期
export function dateFormat(str) {
  var d = str.replace(/-/g, '/'),
      date = new Date(d),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();
  
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${year}.${month}.${day}`;
}