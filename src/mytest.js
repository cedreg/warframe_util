var jsondata = null;
var ducatdata = null;
var divs = [];
var previewDiv = null;
var mainDiv = null;

function preload(){
    var url = "get.php?item=all";
    loadJSON(url, false, "json", function(response){
        jsondata = response;
    });

    var ducatList = "primeParts.csv";
    loadTable(ducatList, "csv", "header", function(response){
        ducatdata = response;
    });


    mainDiv = document.getElementById('main');
}

function setup(){
    noCanvas();
    var re = /(?:^|\W)Prime(?:$|\W)/;

   var primePartDiv = createDiv('all prime parts:').parent(mainDiv);

   var urlNames = [];

    for(i = 0; i < jsondata.payload.items.en.length; i++){
        if (jsondata.payload.items.en[i]["item_name"].search(re) >= 0){
            var btn = document.createElement("Button");
            btn.appendChild(document.createTextNode(jsondata.payload.items.en[i]["item_name"]));
            btn.onclick = callLink;
            btn.value = jsondata.payload.items.en[i]["url_name"];
            mainDiv.appendChild(btn);
        }
    }

    function callLink(e){
        var url = "get.php?item=" + e.target.value;

        loadJSON(url, false, "json", function(response){
            let len = response.payload.statistics['48hours'].length - 1;
            createD(e.target.firstChild.nodeValue, // ClearText Name
                    response.payload.statistics['48hours'][len]['avg_price'], // Average Price
                    response.payload.statistics['48hours'][len]['median'] // Median Price
            )
        });

    }

    function createD(partName, avgPrice, median){
        if ( previewDiv == null ) {
            if (partName.search("Set") == -1 ) { 
                let row = ducatdata.findRow(partName, "part");
                let ducats = row.getString("ducat");
                let vaulted = row.getString("vaulted");
        
                previewDiv = createDiv("Part Name: " + partName + 
                                   "<br/>Average Price Platinum: " + avgPrice + 
                                   "<br/>Median Price Platinum  " + median +
                                   "<br/>Ducats Price: " + ducats +
                                   "<br/>Part Vaulted: " + ((vaulted == 1) ? "YES" : "NO")
                                );
            } else {
                previewDiv = createDiv("Part Name: " + partName + 
                                   "<br/>Average Price Platinum: " + avgPrice + 
                                   "<br/>Median Price Platinum  " + median 
                                );
            }
        } else {
            previewDiv.remove();
            if (partName.search("Set") == -1 ) { 
                let row = ducatdata.findRow(partName, "part");
                let ducats = row.getString("ducat");
                let vaulted = row.getString("vaulted");
        
                previewDiv = createDiv("Part Name: " + partName + 
                                       "<br/>Average Price Platinum: " + avgPrice + 
                                       "<br/>Median Price Platinum  " + median +
                                       "<br/>Ducats Price: " + ducats +
                                       "<br/>Part Vaulted: " + ((vaulted == 1) ? "YES" : "NO")
                                    );
            } else {
                previewDiv = createDiv("Part Name: " + partName + 
                                       "<br/>Average Price Platinum: " + avgPrice + 
                                       "<br/>Median Price Platinum  " + median 
                                    );
            }
        }
    }
}