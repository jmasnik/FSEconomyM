// ==UserScript==
// @name         FSEconomyM
// @namespace    https://github.com/jmasnik/FSEconomyM
// @version      0.3
// @description  Script for FSEconomy website
// @author       Jiri Masnik
// @match        *://server.fseconomy.net/*
// @exclude      https://server.fseconomy.net/maintenancelog.jsp*
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
    var zp;
    var id;
    var name;
    
    var css;
    
    // style
    css = 
        "#fsem-settings { width: 400px; height: 330px; position: absolute; left: 150px; top: 140px; line-height: normal; background-color: #fff; border: 1px solid gray; font-size: 14px; z-index: 1000; visibility: hidden; margin:0px; padding:0px; text-align:center; }" + 
        "#fsem-settings h2 { background-color: gray; color: white; font-size: 15px; padding:4px; text-align:left; margin: 0px 0px 5px 0px; }" +
        "#fsem-settings textarea { margin: 5px; width: 360px; background-color: #f0f0f0; height:115px; padding: 5px; } " +
        "#fsem-settings input { margin: 5px; width: 360px; background-color: #f0f0f0; padding: 5px; color: white; font-weight:bold; background-color: gray; } " +
        "#fsem-menu { width: 150px; position: absolute; left: 10px; font-size: 14px; line-height: normal; }" + 
        "#fsem-menu h2 { display: block; border-bottom: 1px solid gray; color: #000; padding: 3px; font-size: 14px; margin-bottom: 2px; }" + 
        "#fsem-menu a { display: block; text-decoration: none; color: #3366CC; padding: 3px; } " + 
        "#fsem-menu a:hover { background-color: #dddddd; }" + 
        "#fsem-menu .settings { color: #aaa; font-size:11px; cursor: pointer; }" + 
        "div.footer { display: none !important; }" +
        "ul.footer { display: none !important; }";
    GM_addStyle(css);
    
    // init local storage
    if(localStorage.getItem("fsem_airport_list") === null){
        localStorage.setItem("fsem_airport_list", "LKBU@Bubovice;LKCM@Medlánky");
    }
    if(localStorage.getItem("fsem_aircraft_list") === null){
        localStorage.setItem("fsem_aircraft_list", "10191@R-22 (OK-MAY);29080@AS350 (OK-DSW)");
    }
    
    // settings dialog
    el_block = document.createElement("div");
    el_block.id = 'fsem-settings';
    el_block.innerHTML = '<h2>FSEconomyM settings</h2>' + 
        '<textarea id="fsem-settings-v-airports">' + localStorage.getItem("fsem_airport_list") + '</textarea>' + 
        '<textarea id="fsem-settings-v-aircraft">' + localStorage.getItem("fsem_aircraft_list") + '</textarea>' + 
        '<input type="button" value=" Save " onclick="localStorage.setItem(\'fsem_airport_list\', document.getElementById(\'fsem-settings-v-airports\').value); localStorage.setItem(\'fsem_aircraft_list\', document.getElementById(\'fsem-settings-v-aircraft\').value); document.location = document.location;">';
    document.getElementsByTagName('body')[0].appendChild(el_block);
    
    // airports list
    var airport_list = localStorage.getItem("fsem_airport_list").split(";");
    
    // aircraft list
    var aircraft_list = localStorage.getItem("fsem_aircraft_list").split(";");
    
    // left menu
    var html = "";
    
    if(airport_list.length > 0){
        html += "<h2>Airports</h2>";
        for(i = 0; i < airport_list.length; i++){
            zp = airport_list[i].search('@');
            if(zp != -1){
                id = airport_list[i].substr(0, zp);
                name = airport_list[i].substr(zp + 1, airport_list[i].length);
            } else {
                id = airport_list[i];
                name = airport_list[i];
            }
            html += '<a href="airport.jsp?icao='+id+'">'+name+'</a>';
        }
        html += '<br><br>';
    }
    
    if(aircraft_list.length > 0){
        html += "<h2>Aircraft</h2>";
        for(i = 0; i < aircraft_list.length; i++){
            zp = aircraft_list[i].search('@');
            if(zp != -1){
                id = aircraft_list[i].substr(0, zp);
                name = aircraft_list[i].substr(zp + 1, aircraft_list[i].length);
                html += '<a href="aircraftlog.jsp?id='+id+'">'+ name +'</a>';
            }
        }
        html += '<br><br>';
    }
    
    html += '<div onclick="document.getElementById(\'fsem-settings\').style.visibility = \'visible\';" class="settings">Settings</div>';
    
    el_block = document.createElement("div");
    el_block.id = "fsem-menu";
    el_block.innerHTML = html;
    
    // add menu to page
    el = document.getElementById('wrapper');
    el.style.marginLeft = '155px';
    el.insertBefore(el_block, el.childNodes[0]);    
    
    // aircraft page
    if(document.location.toString().search('aircraftlog.jsp') != -1){
        var table_list = document.getElementsByTagName('TABLE');
        
        var cur_loc_td = table_list[0].childNodes[5].childNodes[0].childNodes[9];
        var home_loc_td = table_list[0].childNodes[5].childNodes[0].childNodes[7];
        
        var icao;
        var add;
        
        icao = cur_loc_td.innerHTML.substr(0,4);
        add = cur_loc_td.innerHTML.substr(4,cur_loc_td.innerHTML.length);
        cur_loc_td.innerHTML = '<a href="airport.jsp?icao=' + icao + '">' + icao + '</a>' + add;
        
        icao = home_loc_td.innerHTML.substr(0,4);
        add = home_loc_td.innerHTML.substr(4,home_loc_td.innerHTML.length);
        home_loc_td.innerHTML = '<a href="airport.jsp?icao=' + icao + '">' + icao + '</a>' + add;
        
        var data_table_list = document.getElementsByClassName("dataTable");
        for(i = 0; i < data_table_list.length; i++){
            data_table_list[i].style.border = '0px solid gray';
        }
    }
}
)();
