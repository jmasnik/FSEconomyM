// ==UserScript==
// @name         FSEconomyM
// @namespace    https://github.com/jmasnik/FSEconomyM
// @version      0.1
// @description  Script for FSEconomy website
// @author       Jiri Masnik
// @match        http://server.fseconomy.net/*
// @grant        GM_addStyle
// @updateURL    https://github.com/jmasnik/FSEconomyM/raw/release/FSEconomyM.meta.js
// @downloadURL  https://github.com/jmasnik/FSEconomyM/raw/release/FSEconomyM.user.js
// ==/UserScript==

(function() {
    'use strict';

    var i;
    var el;
    var el_block;
    var el_cont;
    
    var css;
    
    // style
    css = 
        "#fsem-settings { width: 400px; height: 130px; position: absolute; left: 150px; top: 140px; line-height: normal; background-color: #fff; border: 1px solid gray; font-size: 14px; z-index: 1000; visibility: hidden; margin:0px; padding:0px; text-align:center; }" + 
        "#fsem-settings h2 { background-color: gray; color: white; font-size: 15px; padding:4px; text-align:left; }" +
        "#fsem-settings textarea { margin: 5px; width: 360px; background-color: #f0f0f0; height:40px; padding: 5px; } " +
        "#fsem-settings input { margin: 5px; width: 360px; background-color: #f0f0f0; padding: 5px; color: white; font-weight:bold; background-color: gray; } " +
        "#fsem-menu { width: 100px; position: absolute; left: 10px; font-size: 14px; line-height: normal; }" + 
        "#fsem-menu h2 { display: block; border-bottom: 1px solid gray; color: #000; padding: 3px; font-size: 14px; margin-bottom: 2px; }" + 
        "#fsem-menu a { display: block; text-decoration: none; color: #3366CC; padding: 3px; } " + 
        "#fsem-menu a:hover { background-color: #dddddd; }" + 
        "#fsem-menu .settings { color: #aaa; font-size:11px; cursor: pointer; }" + 
        "div.footer { display: none !important; }" +
        "ul.footer { display: none !important; }";
    GM_addStyle(css);
    
    // init local storage
    if(localStorage.getItem("fsem_airport_list") === null){
        localStorage.setItem("fsem_airport_list", "LKBU;LKCM");
    }
    
    // settings dialog
    el_block = document.createElement("div");
    el_block.id = 'fsem-settings';
    el_block.innerHTML = '<h2>FSEconomyM settings</h2><textarea id="fsem-settings-v-airports">' + localStorage.getItem("fsem_airport_list") + '</textarea><input type="button" value=" Save " onclick="localStorage.setItem(\'fsem_airport_list\', document.getElementById(\'fsem-settings-v-airports\').value); document.location = document.location;">';
    document.getElementsByTagName('body')[0].appendChild(el_block);
    
    // airports list
    var airport_list = localStorage.getItem("fsem_airport_list").split(";");
    
    // left menu
    var html = "";
    html += "<h2>Airports</h2>";
    for(i = 0; i < airport_list.length; i++){
        html += '<a href="airport.jsp?icao='+airport_list[i]+'">'+airport_list[i]+'</a>';
    }
    html += '<br><br>';
    html += '<div onclick="document.getElementById(\'fsem-settings\').style.visibility = \'visible\';" class="settings">Settings</div>';
    
    el_block = document.createElement("div");
    el_block.id = "fsem-menu";
    el_block.innerHTML = html;
    
    // add menu to page
    el = document.getElementById('wrapper');
    el.style.marginLeft = '105px';
    el.insertBefore(el_block, el.childNodes[0]);    
}
)();
