// ==UserScript==
// @name         FSEconomyM
// @namespace    https://github.com/jmasnik/FSEconomyM
// @version      0.1
// @description  Script for FSEconomy website
// @author       Jiri Masnik
// @match        http://server.fseconomy.net/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var i;
    var el;
    var el_block;
    var el_cont;
    
    var css;
    
    // injectJs('http://');
    
    // styl
    css = 
        "#fsem-menu { width: 100px; position: absolute; left: 10px; font-size: 14px; line-height: normal; }" + 
        "#fsem-menu h2 { display: block; border-bottom: 1px solid gray; color: #000; padding: 3px; font-size: 14px; margin-bottom: 2px; }" + 
        "#fsem-menu a { display: block; text-decoration: none; color: #3366CC; padding: 3px; } " + 
        "#fsem-menu a:hover { background-color: #dddddd; }";
    GM_addStyle(css);
    
    localStorage.setItem("fsem_airport_list", "LKTC;LKBU;LKPO;LKPD;LKKU;LKMT");
    
    var airport_list = localStorage.getItem("fsem_airport_list").split(";");
    console.log(airport_list);
    
    var html = "";
    html += "<h2>Airports</h2>";
    for(i = 0; i < airport_list.length; i++){
        html += '<a href="airport.jsp?icao='+airport_list[i]+'">'+airport_list[i]+'</a>';
    }
    
    el_block = document.createElement("div");
    el_block.id = "fsem-menu";
    el_block.innerHTML = html;
    
    el = document.getElementById('wrapper');
    el.style.marginLeft = '105px';
    el.insertBefore(el_block, el.childNodes[0]);    
}
)();

function injectJs(link) {
    var scr = document.createElement('script');
    scr.type = "text/javascript";
    scr.src = link;
    document.getElementsByTagName('head')[0].appendChild(scr);
}