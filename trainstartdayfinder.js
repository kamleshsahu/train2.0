function trainstartday(train_no,src,dayback){


    var url= "http://api.railwayapi.com/route/train/"+train_no+"/apikey/"+key[keyno]+"/";
    $.get(url, function(body, status){
        console.log("yeh trainstartday is working!!!" );


        console.log("Train Name:"+body.train.name);
        console.log("Train No:"+body.train.number);
        train_name=body.train.name;


        body.route.forEach(function(route){
            if(route.code==src){
                console.log("yehh!! found the match :"+src);
                console.log("dayback is:"+route.day);
                sourceno=route.no;
                dayback(route.day-1);
                console.log("here is the source no:"+route.no);

            }
        });
    });


}
