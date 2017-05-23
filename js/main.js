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

function render_test() {
    var text_end = '</th></tr></tbody></table>'
    var mount = formatedDateB[0].getMonth()
    var years = formatedDateB[0].getFullYear()
    var holiday = get_holy_day(formatedDateB[0].getFullYear())
    var text_mind = ''
    var text_mind_row = ''
    $.each(formatedDateA, function(index, val) {
        if (formatedDateA[formatedDateA.length-1] != val) {
            if (val.getDay()>1 && index == 0 ) {
                for (var i = 0; i < val.getDay(); i++) {
                    if (i==val.getDay()-1) {
                        text_mind += "<td class='grey'>"+val.getDate()+"</td>"
                    }else{
                        text_mind += "<td class='grey'></td>"
                    }
                }
            }else {
                text_mind += "<td class='grey'>"+val.getDate()+"</td>"
            }
            if (index>0) {
                if (formatedDateA[index].getDay()<formatedDateA[index-1].getDay() || formatedDateA[formatedDateA.length-1] == val) {
                    text_mind_row += '<tr>'+text_mind+'</tr>'
                    text_mind = ''
                }
            }
        }
    });
    setTimeout(function() {
        $.each(formatedDateB, function(index, val) {
            if (val.getFullYear()!=years) {
                holiday = get_holy_day(formatedDateB[0].getFullYear())
                years = val.getFullYear()
            }
            if (mount!=val.getMonth()) {
                var text_init = '<table class="table table-bordered"><thead><tr><th colspan="7" class="text-center">'+theMonths[mount]+'</th></tr><tr><th>Domingo</th><th>lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th><th>Sabado</th></tr></thead><tbody><tr><th>'
                text_mind_row += '<tr>'+text_mind+'</tr>'
                mount = val.getMonth()
                $("#calendar").append(text_init+text_mind_row+text_end)
                text_mind_row = ""
            }
            if (val.getDay()==0 || val.getDay()==6) {
                text_mind += "<td class='yellow'>"+val.getDate()+"</td>"
                if (val.getDay()==6) {
                    text_mind_row += '<tr>'+text_mind+'</tr>'
                    text_mind = ''
                }
            }else if (check_holyday(val, holiday||[])) {
                text_mind += "<td class='orange'>"+val.getDate()+"</td>"
            }else {
                text_mind += "<td class='green'>"+val.getDate()+"</td>"
            }
            if (formatedDateB[formatedDateB.length-1] == val) {
                var text_init = '<table class="table table-bordered"><thead><tr><th colspan="7" class="text-center">'+theMonths[mount]+'</th></tr><tr><th>Domingo</th><th>lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th><th>Sabado</th></tr></thead><tbody><tr><th>'
                mount = val.getMonth()
                text_mind_row += '<tr>'+text_mind+'</tr>'
                $("#calendar").append(text_init+text_mind_row+text_end)
                text_mind_row = ""
                text_mind = ''
            }
        });
    }, 5000)
}

function render_calendar() {
    var init_date = $("#init_date").val()
    init_date = init_date.split("-");
    var dateA = new Date(init_date[0],init_date[1],init_date[2],0,0,0);
    var dateB = dateA.addDays(parseInt($("#n_day").val()))
    var dateC = new Date(init_date[0],init_date[1],1,0,0,0);
    if (init_date[2]>0) {
        for(var myDate = dateC; myDate <= dateA; myDate = new Date(myDate.getTime() + 1000 * 60 * 60 * 24))
        {
            formatedDateA.push(myDate);
        } 
    }
    for(var myDate = dateA; myDate <= dateB; myDate = new Date(myDate.getTime() + 1000 * 60 * 60 * 24))
    {
        formatedDateB.push(myDate);
    }
    setTimeout(render_test(), 5000)

}