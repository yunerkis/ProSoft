Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}
var theMonths = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"];
var formatedDateA = [];
var formatedDateB = [];
function get_holy_day(years) {
    $.ajax({
        url: 'https://holidayapi.com/v1/holidays?key=&country=US&year=2016&month=05',
        type: 'GET',
        dataType: 'json',
        data: {
            key: '422f2c5d-89ec-4750-8b3c-07ade0584c67',
            country: $("#country").val(),
            year: years,
        },
    })
    .done(function(data) {
        var lista = []
        $.each(data, function(index, val) {
            var date1 = val.date
            date1 = date1.split("-");
            lista.push(new Date(date1[0],date1[1],date1[2],0,0,0))
        });
        return lista
    })
    .fail(function() {

    })
    .always(function() {

    });
}

function check_holyday(date, dates) {
    check = dates.filter(function(item) {
        return data==item
    })
    return check.length > 0
}
var holiday = []