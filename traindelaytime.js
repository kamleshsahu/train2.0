/**
 * Created by kamlesh on 1/17/2017.
 */
function traindelaytime(train_no){
    console.log("traindelaytime function is working!!!");

    //   $("#div1").find(id).find("#delaytime").html("<span><img src='images.png' </span>");
    var d4 = new Date();
    var day=d4.getDay();


    trainstartday(train_no,src,function (dateback) {


        console.log("Here is the dayback:"+dateback);
        var date=d4.getDate()-dateback;
        if (date<10){
            date="0"+date;
        }
        var month=d4.getMonth()+1;
        if(month<10){
            month="0"+month;
        }

        var datef =  d4.getFullYear()+""+(month)+""+(date);
        var url="http://api.railwayapi.com/live/train/"+train_no+"/doj/"+datef+"/apikey/"+key[keyno]+"/";

        $.get(url, function(body, status){
            body.route.forEach(function (route){
                if(route.station_.code==src){
                    console.log("found the source station data for the train!!!");

                    departuretime=route.actdep;
                    delaytime=route.latemin;
                    console.log("->"+departuretime+" Delay:"+delaytime);
                }


            });
            var id=".c"+train_no;
            $("#div1").find(id).find("#delaytime").html("<span strong style='color: red'>"+delaytime+" min </span>");
            $("#div1").find(id).find("#actdep").html("<span strong style='color: red'>"+departuretime+" </span>");
        });
    });
}