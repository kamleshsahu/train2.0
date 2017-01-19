
function storinglocally(item) {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.mydata2) {
            console.log("my data is created already..");
            try {
                var retriveddata = localStorage.getItem("mydata2");
                var retriveddataparsed = JSON.parse(retriveddata);
            }catch(error){
                console.log("here is the error 3 :"+error);
            }
            try {
                _.pullAllWith(retriveddataparsed, [item.code], _.isEqual);
                //   console.log("some items pulled:"+JSON.stringify(retriveddataparsed));
            }catch(error){
                console.log("here is the bug 6 :" +error);
            }
            retriveddataparsed.push(item);
            localStorage.mydata2=JSON.stringify(retriveddataparsed);
        } else {
            var data=[];
            console.log("creating local storage");
            localStorage.mydata2 = JSON.stringify(data);
            storinglocally(item);
        }
    } else {

        console.log("sorry no storage support");
        // Sorry! No Web Storage support..
    }
}

function loadhistory(){
    // var itemdisplay="<div id='history'>";
    var itemdisplay="<button onclick=\"clear_cache()\">clear cache</button><table class=\"table  \"> <thead> </thead>";

    var fetchdata=JSON.parse(localStorage.getItem("mydata2"));
    try {
        if(fetchdata==null){
            console.log("empty data");
        }else {
            console.log(fetchdata[fetchdata.length - 1]);
//                fetchdata.forEach(function(f){
//                    itemdisplay +="<br>"+f.display;
//                });
            var count = 0;
            for (var k = fetchdata.length - 1; k >= 0; k--) {
                count++;
                itemdisplay += "<tr><td id='" + fetchdata[k].name + "' onclick='historyonclick(id)' ><a href='#' style='color: #cccccc'>" + fetchdata[k].name + "</a></td></tr>";
                if (count > 8) {
                    break;
                }
            }

            $("#div1").find("#localhistory").html(itemdisplay);

        }
    }catch(error){
        console.log(" here is the bug 2 :"+error);
    }

    console.log("fetching history!!!");
}


function clear_cache(){
    localStorage.removeItem("mydata2");
    console.log("history deleted!!!");
}