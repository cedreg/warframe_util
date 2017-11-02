<?php
    $url = "https://api.warframe.market/v1/items/" . $_GET["item"] . "/statistics";
    $nullURL = "https://api.warframe.market/v1/items";
    if ($_GET["item"] != "all"){
        echo file_get_contents($url);
    } else {
        echo file_get_contents($nullURL);
    }
?>