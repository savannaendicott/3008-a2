
var GRID_SIZE = 64;
//arr2= [["🏁","🆗","💬","🔔","⏸","🔄","🎦","✅"],["[💯","⛔","📌","📎","🔒","🏏","🎿","🏹"],["🏀","🎉","🗝","🎈","🛁","🚽","🛌","📞"],["🎁","🎀","🔫","💣","🔨","🔪","🚀","🎙"],["⛵","🚂","🚓","🚲","🚑","🎻","🎲","🗽"],["🚁","⛵","🚂","🚓","🚲","🚑","🎻","🎲"],["🙏","🙌","🤘","🖕","✋","👌","👍","👎"],["✊","👊","👋","👏","👐","💅","👂","👃"]];
var emojis = ["🏁","🆗","💬","🔔","⏸","🔄","🎦","✅","💯","⛔","📌","📎","🔒","🏏","🎿","🏹","🏀","🎉","🗝","🎈","🛁","🚽","🛌","📞","🎁","🎀","🔫","🔨","🔪","🚀","🎙","🗽","🚁","⛵","🚂","🚓","🚲","🚑","🎻","🎲","🎳","🎹","🎧","🎷","🎸","🎨","🎭","🏅","🏆","⚽","🏐","🎾","🏈","🎱","🏒","⛸","🎮","😃","😛","😜","😍","😘","🙃","😉","😇","😎","🤓","🤑","😐","😤","😢","😭","😦","🤐","😷","😩","😬","😰","😱","😳","😵","😡","😠","😈","👹","👺","💀","👻","👽","👾","💩","🤖","🎃","😺","😻","😿","🙀","🙈","🙉","🙊","💪","👉","👇","💑","👤","👥",
"🙏","🙌","🤘","🖕","✋","👌","👍","👎","✊","👊","👋","👏","👐","💅","👂","👃","👣","👀","👅","👄","💋","💄","💍","👁","💘","💔","💕","💣","💥","💦","👦","👶","👧","👵","👴","👮","💂",
"🕵","👩","🎓","👸","👰","💃","👙","👗","👔","👠","👞","🎩","🎓","👜","👓","👑","🐶","🐱","🐹","🐼","🐰","🐨","🐷","🐯","🦁","🐮","🐙","🐸","🐔","🐴","🦄","🐝","🐛","🐌","🐚","🐞","🕷","🐢","🦀","🐠","🐬","🐳","🐾","🐿","🐲","🎄","🌴","🍁","🌵","🍀","🍄","🌹","🌻","🌎","🌝","⭐","🔥","🌈","⛄","🌪","🌊","🍎","🍇","🍉","🍌","🍓","🍒","🍑","🍆","🌽","🌶","🧀","🍗","🍤","🍕","🌭","🍔","🍟","🌮","🌯","🍣","🍰","🎂","🍭","🍦","🍪","🍼","🍿","🍩","🍺","🍷"];
var websites = ["E-mail","Facebook","Youtube"];
var username;
var website;
var password;
var answer = "";
var counter=0;

$("#website").text(websites[0]);
$("#reset-button").click(function(){reset()});

function printTable(arr){
	var body, tab, tr, td, tn, row, col;
	
	tab = document.getElementById("results");
	//alert("length of rows is "+arr.length+" and for columns "+arr[0].length);
;	for (row = 0; row < arr.length; row++){
		tr = document.createElement('tr');
		for (col = 0; col < arr[row].length; col++){
			  let td = document.createElement('td');
			  moj = emojis[arr[row][col]];
			  let tn = document.createTextNode(moj);
			  td.addEventListener("click",function(e){tableText(td,moj, e)});
			  td.setAttribute("x",row);
			  td.setAttribute("y",col);
			  td.setAttribute("num",arr[row][col]);
			  td.appendChild(tn);
			  tr.appendChild(td);
		}
		tab.appendChild(tr);
	}

}


$(document).ready(function(){
	//console.log(emojis.length);
	
	
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

				username = uname;

				mainpage();
				alert(data);
			} else{
				alert(data);
			}
		});
		}
	});
	$("#register").click(function(){
		username = $("#register-uname").val();
		
		// Checking for blank fields.
		if(username  ==''){
			$('input[type="text"]').css("border","2px solid red");
			$('input[type="text"]').css("box-shadow","0 0 3px red");
			alert("Please enter a username");
		}else {
			$.get("/register",{user: username }).done(function(data) {
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
	//åvar uname = $("#register-uname").val();
	$('#main-div').show();
	$('ok-button').hide();
	getFirstGrid();

	


	// CHANGE WEBSITE NAME

}

function getGrid(tablecell){
	
	var x = tablecell.getAttribute("x");
	var y = tablecell.getAttribute("y");
	console.log(x);
	console.log(y);
	$.get("/grid",{user: username, grid: counter, x:x, y:y}).done(function(data) {
		// data looks like : [][]
		// x, y, click, uname

		printTable(data.grid);
	//		console.log(data.grid);



	});
}

function getFirstGrid(){
	console.log(username);
	$.get("/grid",{user: username}).done(function(data) {
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

function tableText(tablecell, tabletext, event) {
   console.log(answer.length);
   if(counter <4){
   		$("#progress").text($("#progress").text() +"•");
   		console.log(tabletext);
   		answer+=tabletext;
   		counter ++;

   		$("#results").text("");
   		getGrid(tablecell)
   	}
   if(counter == 4){
   	 console.log(answer);
     answerComplete();
     $("#ok-button").show();

   }

   //console.log(tablecell);
}
function answerComplete(){
	//console.log("done");
	/*$.get("/submit",{user: username, answer:answer}).done(function(data) {
		console.log(data);
	});*/
	answer ="";
	$("#progress").text("");
	counter =0;
	$("#results").text("");	


}
function reset(){
	answer ="";
	$("#progress").text("");
	counter =0;
	$("#results").text("");
	getFirstGrid();

}




