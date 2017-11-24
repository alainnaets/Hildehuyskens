/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        
        console.log('Received Event: ' + id);
    }
};
*/

var databank;
var gelezen;

function keuzeSoort(soort)
{
	//keuze onthouden
	localStorage.soort=soort;
	//ga naar niveau
	$("#keuze_soort").css("display","none");
	$("#keuze_niveau").css("display","block");
}

function keuzeNiveau(niveau)
{
	//keuze onthouden
	localStorage.niveau=niveau;
	//ga naar start
	$("#keuze_niveau").css("display","none");
	$("#start_fabriek").css("display","block");
	
	if(localStorage.soort=="woord") $("#soort").html("Woorden");
	else $("#soort").html("Pseudowoorden");
	
	$("#niveau").html(localStorage.niveau);
}


function start_fabriek()
{	
	localStorage.aantalWoord=0;
	$("#start_fabriek").css("display","none");
	$("#fabriek").css("display","block");
	$("#timer").css("display","block");
	//laad data uit object in nieuw object databank in geheugen!
	var pointer = localStorage.soort + "_" + localStorage.niveau;
	
	switch(pointer)
	{
		case "woord_1":
			databank=data.woorden[0].rij;
		break;
		
		case "woord_2":
			databank=data.woorden[1].rij;
		break;
		
		case "woord_3":
			databank=data.woorden[2].rij;
		break;
		
		case "woord_4":
			databank=data.woorden[3].rij;
		break;
		
		case "woord_5":
			databank=data.woorden[4].rij;
		break;
		
		case "woord_6":
			databank=data.woorden[5].rij;
		break;
		
		case "pseudo_1":
			databank=data.pseudowoorden[0].rij;
		break;
		
		case "pseudo_2":
			databank=data.pseudowoorden[1].rij;
		break;
		
		case "pseudo_3":
			databank=data.pseudowoorden[2].rij;
		break;
		
		case "pseudo_4":
			databank=data.pseudowoorden[3].rij;
		break;
		
		case "pseudo_5":
			databank=data.pseudowoorden[4].rij;
		break;
		
		case "pseudo_6":
			databank=data.pseudowoorden[5].rij;
		break;
		
	}
	
	//start het eerste woord	
	get_woord();
	//start timer op 60 seconden in background
	
	w = new Worker("js/worker/timer2.js");
	
	w.onmessage = function(event) 
	{
		if(Number(event.data)>0) document.getElementById("tijd").innerHTML = event.data;
		else
		{
			//worker stoppen
			w.terminate();
					
			//score invullen
			$("#aantal").html(localStorage.aantalWoord);
			
			//fabriek afsluiten en score pagina openen
			$("#fabriek").css("display","none");
			$("#timer").css("display","none");
			$("#score").css("display","block");				
		}
    };
}

function get_woord()
{
	//get lengte van array in object
	var aantal = databank.length;
	var adrandom = Math.floor((Math.random() * aantal));
	$("#random").html(adrandom);
	$("#aantal_woord").html(aantal);
	$("#lees_woord").html(databank[adrandom]);
}

function volgende_woord()
{
	localStorage.aantalWoord=Number(localStorage.aantalWoord)+1;
	get_woord();
}

function home()
{
	localStorage.aantalWoord="";
	localStorage.soort="";
	localStorage.niveau="";
	$("#score").css("display","none");
	$("#keuze_soort").css("display","block");
}