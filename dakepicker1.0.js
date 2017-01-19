/**
 * Created by kamlesh on 1/17/2017.
 */
var myCalendar;

function doOnLoad() {
    myCalendar = new dhtmlXCalendarObject({input: "calendar_icon"});
    myCalendar.hideTime();
    setFrom();
    myCalendar.attachEvent("onClick",function () {
        $("#date_here").html(myCalendar.getFormatedDate(' %d %M %Y'));
              date=myCalendar.getFormatedDate('%d');
              month=myCalendar.getFormatedDate('%m');
              year=myCalendar.getFormatedDate('%Y');
        console.log("calender set :"+date+"-"+month+"-"+year);
        //console.log(myCalendar.getFormatedDate('%d'+"-"+'%m'));
    })

}
function setFrom() {
    var d = new Date();
    var date=d.getDate();
    if (date<10){
        date="0"+date;
    }
    var month=d.getMonth()+1;
    if(month<10){
        month="0"+month;
    }

    var datef =  d.getFullYear()+"-"+(month)+"-"+(date);
    console.log("todays date is :"+datef);
    myCalendar.setSensitiveRange(datef,null);

}