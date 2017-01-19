/**
 * Created by kamlesh on 1/17/2017.
 */
function getlivestatus(train_no){
    event.preventDefault();
    var data2="<table class=\"table table-condensed \"> <thead> <tr> <th>no:</th><th>Station</th> <th>Sch. Arrival/<br>Actual Arrival</th> <th>Sch. Departure/<br>Actual Departure</th><th>Delay</th></tr> </thead> </tbody>";


    $("#div3").html("<h1>                 Loading.......</h1>");
    $("#div2").html("");
    console.log("getlive status for the selected train is working");

    var d = new Date();
    var day=d.getDay();


    trainstartday(train_no,src,function (dateback) {


        console.log("Here is the dayback:"+dateback);
        var d = new Date();
        var date=d.getDate()-dateback;
        if (date<10){
            date="0"+date;
        }
        var month=d.getMonth()+1;
        if(month<10){
            month="0"+month;
        }

        var datef =  d.getFullYear()+""+(month)+""+(date);
        var url="http://api.railwayapi.com/live/train/"+train_no+"/doj/"+datef+"/apikey/"+key[keyno]+"/";
        // var url= "http://api.railwayapi.com/route/train/"+train_no+"/apikey/gzg3pcc2/";
        //   var url='http://api.railwayapi.com/between/source/'+src+'/dest/'+dst+'/date/16-12/apikey/4ywa4l49/';
        $.get(url, function(body, status){
            var currentstationno= body.current_station.no;


            if(body.current_station.latemin>0) {
                var trainposition = "<h4 strong><span  id=\"trainname\" style=\"color:midnightblue\"></span></h4><h5>Current Position :</strong><p style=\"color:red\">" + body.position + "</p></h5>";
            }else{
                var trainposition = "<h4 strong><span  id=\"trainname\" style=\"color:midnightblue\"></span></h4><h5>Current Position :</strong><p style=\"color:green\">" + body.position + "</p></h5>";
            }
            $("#div2").html(trainposition);
            $("#trainname").html(train_name+" ("+train_no+")");
            body.route.forEach(function (route){
                if(route.no<currentstationno) {
                    if (route.latemin <= 0) {
                        data2 += "<tr id='"+route.no+"' style='background-color:rgba(164,255,45,0.29)'><td>" + route.no + "</td><td> " + route.station_.name + "</td><td>" + route.scharr + "<br><pp style=\"color:green\">" + route.actarr + " </pp></td><td>" + route.schdep + "<br><pp style=\"color:green\">" + route.actdep + "</pp></td><td><pp style=\"color:green\">" + route.latemin + " min</pp></td></tr>";
                    }else {
                        data2 += "<tr id='"+route.no+"' style='background-color:rgba(164,255,45,0.29)'><td>" + route.no + "</td><td> " + route.station_.name + "</td><td>" + route.scharr + "<br><pp style=\"color:red\">" + route.actarr + " </pp></td><td>" + route.schdep + "<br><pp style=\"color:red\">" + route.actdep + "</pp></td><td><pp style=\"color:red\">" + route.latemin + " min</pp></td></tr>";
                    }
                }else if(route.no==currentstationno){
                    if(route.latemin<=0) {
                        data2 += "<tr id='"+route.no+"' style='background-color:rgba(236,255,46,0.29)'><td>" + route.no + "</td><td> " + route.station_.name + "</td><td>" + route.scharr + "<br><pp style=\"color:green\">" + route.actarr + " </pp></td><td>" + route.schdep + "<br><pp style=\"color:green\">" + route.actdep + "</pp></td><td><pp style=\"color:green\">" + route.latemin + " min</pp></td></tr>";
                    }else{
                        data2 += "<tr id='"+route.no+"' style='background-color:rgba(236,255,46,0.29)'><td>" + route.no + "</td><td> " + route.station_.name + "</td><td>" + route.scharr + "<br><pp style=\"color:red\">" + route.actarr + " </pp></td><td>" + route.schdep + "<br><pp style=\"color:red\">" + route.actdep + "</pp></td><td><pp style=\"color:red\">" + route.latemin + " min</pp></td></tr>";

                    }
                }else{
                    if(route.latemin<=0) {
                        data2 += "<tr id='"+route.no+"'><td>" + route.no + "</td><td> " + route.station_.name + "</td><td>" + route.scharr + "<br><pp style=\"color:green\">" + route.actarr + " </pp></td><td>" + route.schdep + "<br><pp style=\"color:green\">" + route.actdep + "</pp></td><td><pp style=\"color:green\">" + route.latemin + " min</pp></td></tr>";
                    }else{
                        data2 += "<tr id='"+route.no+"'><td>" + route.no + "</td><td> " + route.station_.name + "</td><td>" + route.scharr + "<br><pp style=\"color:red\">" + route.actarr + " </pp></td><td>" + route.schdep + "<br><pp style=\"color:red\">" + route.actdep + "</pp></td><td><pp style=\"color:red\">" + route.latemin + " min</pp></td></tr>";
                    }
                }

            });



            $("#div3").html(data2);

        });

    });
}