Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}
var theMonths = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"];
var formatedDateA = [];
var formatedDateB = [];