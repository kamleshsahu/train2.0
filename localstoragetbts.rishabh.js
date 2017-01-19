
function storinglocallytbts(srcdst) {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.mydatatbts) {
            console.log("my data is created already..");
            try {
                var retriveddata = localStorage.getItem("mydatatbts");
                var retriveddataparsed = JSON.parse(retriveddata);
            }catch(error){
                console.log("here is the error 3 :"+error);
            }
            try {
                _.pullAllWith(retriveddataparsed, [srcdst], _.isEqual);
                //   console.log("some items pulled:"+JSON.stringify(retriveddataparsed));
            }catch(error){
                console.log("here is the bug 6 :" +error);
            }
            retriveddataparsed.push(srcdst);
            localStorage.mydatatbts=JSON.stringify(retriveddataparsed);
        } else {
            var data=[];
            console.log("creating local storage");
            localStorage.mydatatbts = JSON.stringify(data);
            storinglocally(srcdst);
        }
    } else {

        console.log("sorry no storage support");
        // Sorry! No Web Storage support..
    }
}

function loadhistorytbts(){

    // var itemdisplay="<div id='history'>";
    var itemdisplay="<table class=\"table  \"> <thead><h2 class='search'>History<a href='#'><img src='dustbin.png' onclick=\"clear_cache()\" style='float:right' width='30px'></a></thead>";

    var fetchdata=JSON.parse(localStorage.getItem("mydatatbts"));
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
                itemdisplay += "<table class='cache_r'><tr class='cache_ri'><td class='cache_ri'><a href='#' onclick='historyonclick(\""+fetchdata[k].src+"\",\""+fetchdata[k].dst+"\")' style='color: rgb(0,49,113)'>" +"From "+ fetchdata[k].src+"   to   "+fetchdata[k].dst + "</a></td></tr></table>";
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
function historyonclick(src1,dst1) {
    src =src1;
    dst=dst1;
    console.log("historyonclick clicked!!!!...");
    getdata();
}

function clear_cache(){
    localStorage.removeItem("mydatatbts");
    console.log("history deleted!!!");
    $("#div1").find("#localhistory").html("");
}
