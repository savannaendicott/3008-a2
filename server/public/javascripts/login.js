
var GRID_SIZE = 64;
//arr2= [["🏁","🆗","💬","🔔","⏸","🔄","🎦","✅"],["[💯","⛔","📌","📎","🔒","🏏","🎿","🏹"],["🏀","🎉","🗝","🎈","🛁","🚽","🛌","📞"],["🎁","🎀","🔫","💣","🔨","🔪","🚀","🎙"],["⛵","🚂","🚓","🚲","🚑","🎻","🎲","🗽"],["🚁","⛵","🚂","🚓","🚲","🚑","🎻","🎲"],["🙏","🙌","🤘","🖕","✋","👌","👍","👎"],["✊","👊","👋","👏","👐","💅","👂","👃"]];
var emojis = ["🏁","🆗","💬","🔔","⏸","🔄","🎦","✅","💯","⛔","📌","📎","🔒","🏏","🎿","🏹","🏀","🎉","🗝","🎈","🛁","🚽","🛌","📞","🎁","🎀","🔫","💣","🔨","🔪","🚀","🎙","🗽","🚁","⛵","🚂","🚓","🚲","🚑","🎻","🎲","🎳","🎹","🎧","🎷","🎸","🎨","🎭","🏅","🏆","⚽","🏐","🎾","🏈","🎱","🏒","⛸","🎮","😃","😛","😜","😍","😘","🙃","😉","😇","😎","🤓","🤑","😐","😤","😢","😭","😦","🤐","😷","😩","😬","😰","😱","😳","😵","😡","😠","😈","👹","👺","💀","👻","👽","👾","💩","🤖","🎃","😺","😻","😿","🙀","🙈","🙉","🙊","💪","👉","👇","💑","👤","👥",
"🙏","🙌","🤘","🖕","✋","👌","👍","👎","✊","👊","👋","👏","👐","💅","👂","👃","👣","👀","👅","👄","💋","💄","💍","👁","💘","💔","💕","💣","💥","💦","👦","👶","👧","👵","👴","👮","💂",
"🕵","👩","🎓","👸","👰","💃","👙","👗","👔","👠","👞","🎩","🎓","👜","👓","👑","🐶","🐱","🐹","🐼","🐰","🐨","🐷","🐯","🦁","🐮","🐙","🐸","🐔","🐴","🦄","🐝","🐛","🐌","🐚","🐞","🕷","🐢","🦀","🐠","🐬","🐳","🐾","🐿","🐲","🎄","🌴","🍁","🌵","🍀","🍄","🌹","🌻","🌎","🌝","⭐","🔥","🌈","⛄",,"🌪","🌊","🍎","🍇","🍉","🍌","🍓","🍒","🍑","🍆","🌽","🌶","🧀","🍗","🍤","🍕","🌭","🍔","🍟","🌮","🌯","🍣","🍰","🎂","🍭","🍦","🍪","🍼","🍿","🍩","🍺","🍷"];
//var titles = ["E-mail","Facebook","Youtube"];
var password;
var answer = "";
var counter=0;


function printTable(arr){
	var body, tab, tr, td, tn, row, col;
	
	tab = document.getElementById("results");
	//alert("length of rows is "+arr.length+" and for columns "+arr[0].length);
;	for (row = 0; row < arr.length; row++){
		tr = document.createElement('tr');
		for (col = 0; col < arr[row].length; col++){
			  td = document.createElement('td');
			  let tn = document.createTextNode(emojis[arr[row][col]]);
			  td.addEventListener("click",function(){tableText(tn)});
			  td.appendChild(tn);
			  tr.appendChild(td);
		}
		tab.appendChild(tr);
	}

}


$(document).ready(function(){
	
	$("ok-button").hide();
	$("submit-button").hide();
	loginpage();


    $("#results tr td").click(function(event) {
       console.log(event);
	});
	
	$("#login").click(function(){
		var uname = $("#login-uname").val();
		// Checking for blank fields.
		if( uname ==''){
			$('input[type="text"]').css("border","2px solid red");
			$('input[type="text"]').css("box-shadow","0 0 3px red");
			alert("Please enter a username");
		}else {
			$.get("/login",{user: uname},
			function(data) {
			if(data=='invalid') {
				$('input[type="text"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
				alert(data);
			}else if(data=='success'){
				$("form")[0].reset();
				$('input[type="text"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
				

				





				mainpage();
				alert(data);
			} else{
				alert(data);
			}
		});
		}
	});
	$("#register").click(function(){
		var uname = $("#register-uname").val();
		
		// Checking for blank fields.
		if( uname ==''){
			$('input[type="text"]').css("border","2px solid red");
			$('input[type="text"]').css("box-shadow","0 0 3px red");
			alert("Please enter a username");
		}else {
			$.get("/register",{user: uname}).done(function(data) {
			if(data=='invalid') {
				$('input[type="text"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
				alert(data);
			}else if(data=='success'){
				$("form")[0].reset();
				$('input[type="text"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
				//alert(data);
				mainpage();
				//alert(data);


			} else{
				//alert(data);
				//var stuff = JSON.stringify(data);
				

				password = (data.password);//[0].num);
				fillpword();


				/*{"password":[
				{"loc":{"x":1,"y":6},"num":22},
				{"loc":{"x":0,"y":2},"num":46},
				{"loc":{"x":7,"y":6},"num":233},
				{"loc":{"x":1,"y":0},"num":153}]}*/
			}
		});
		}
	});

	$("#no-account").click(function(){
		registrationpage();
	});

	$("#register").click(function(){
		/* do registration stuff */
		mainpage();
	});

});

function tester(){
	var n = "hi";
}
function loginpage(){
	$('#registration-div').hide();
	$('#main-div').hide();
	$('#login-div').show();

}
function registrationpage(){
	$('#login-div').hide();
	$('#main-div').hide();
	$('#registration-div').show();
}
function mainpage(){
	$('#registration-div').hide();
	$('login-div').hide();
	
	//printTable(arr);
	var uname = $("#register-uname").val();
	getGrid(uname);
	$('#main-div').show();
	$("ok-button").hide();


	// CHANGE WEBSITE NAME

}

function getGrid(uname){
	$.get("/grid",{user: uname}).done(function(data) {
		// data looks like : [][]

		printTable(data.grid);
	//		console.log(data.grid);



	});
}

function getGrid(uname, i){
	$.get("/grid",{user: uname, index:i}).done(function(data) {
		// data looks like : [][]

		printTable(data.grid);
		console.log(data.grid);



	});
}
function fillpword(){
	var text ="";
	for(i=0;i < 4;i++){
		text += emojis[password[i].num];
	}
	$("#password-instruction").text(text);
}

var table = document.getElementById("results");
if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function () {
            tableText(this);
        };
    }
}

function tableText(tablecell) {
   console.log(answer.length);
   if(counter <4){
   		$("#progress").text($("#progress").text() +"•");
   
   		answer+=tablecell;
   		counter ++;
   	}
   if(counter == 4){
     answerComplete();
   }
   //console.log(tablecell);
}
function answerComplete(){
	console.log("done");

}




