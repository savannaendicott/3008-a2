
var emojis = ["🏁","🆗","💬","🔔","⏸","🔄","🎦","✅","💯","⛔","📌","📎","🔒","🏏","🎿","🏹","🏀","🎉","🗝","🎈","🛁","🚽","🛌","📞","🎁","🎀","🔫","🔨","🔪","🚀","🎙","🗽","🚁","⛵","🚂","🚓","🚲","🚑","🎻","🎲","🎳","🎹","🎧","🎷","🎸","🎨","🎭","🏅","🏆","⚽","🏐","🎾","🏈","🎱","🏒","⛸","🎮","😃","😛","😜","😍","😘","🙃","😉","😇","😎","🤓","🤑","😐","😤","😢","😭","😦","🤐","😷","😩","😬","😰","😱","😳","😵","😡","😠","😈","👹","👺","💀","👻","👽","👾","💩","🤖","🎃","😺","😻","😿","🙀","🙈","🙉","🙊","💪","👉","👇","💑","👤","👥",
"🙏","🙌","🤘","🖕","✋","👌","👍","👎","✊","👊","👋","👏","👐","💅","👂","👃","👣","👀","👅","👄","💋","💄","💍","👁","💘","💔","💕","💣","💥","💦","👦","👶","👧","👵","👴","👮","💂",
"🕵","👩","🎓","👸","👰","💃","👙","👗","👔","👠","👞","🎩","🎓","👜","👓","👑","🐶","🐱","🐹","🐼","🐰","🐨","🐷","🐯","🦁","🐮","🐙","🐸","🐔","🐴","🦄","🐝","🐛","🐌","🐚","🐞","🕷","🐢","🦀","🐠","🐬","🐳","🐾","🐿","🐲","🎄","🌴","🍁","🌵","🍀","🍄","🌹","🌻","🌎","🌝","⭐","🔥","🌈","⛄","🌪","🌊","🍎","🍇","🍉","🍌","🍓","🍒","🍑","🍆","🌽","🌶","🧀","🍗","🍤","🍕","🌭","🍔","🍟","🌮","🌯","🍣","🍰","🎂","🍭","🍦","🍪","🍼","🍿","🍩","🍺","🍷"];
var websites = ["Jee-Mail","Fakebook","Safety Beeposit"];
var username;
var website;
var password;
var answer = "";
var counter=0;
var tries = 1;
var correct = [0,0,0];

$("#website").text(websites[0]);
$("#reset-button").click(function(){reset()});
$("#ok-button").click(function(){submitAnswer()});

function printTable(arr){
	var body, tab, tr, td, tn, row, col;
	
	tab = document.getElementById("results");
	//alert("length of rows is "+arr.length+" and for columns "+arr[0].length);
;	for (row = 0; row < arr.length; row++){
		tr = document.createElement('tr');
		for (col = 0; col < arr[row].length; col++){
			  let td = document.createElement('td');
			  let moj = emojis[arr[row][col]];
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
	$('#registration-div').hide();
	$('#final-div').hide();
	$('#main-div').hide();
	$('ok-button').hide();
	//console.log(emojis.length);
	
	website = 0;
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
			$("#welcome").text("Welcome "+uname+"!");
			$.get("/login",{user: uname, website: websites[website]},
			function(data) {
				alert(data);
			
			});
		}
	});
	$("#register").click(function(){
		username = $("#register-uname").val();
		$("#welcome").text("Welcome "+username+"!");
		// Checking for blank fields.
		if(username  ==''){
			$('input[type="text"]').css("border","2px solid red");
			$('input[type="text"]').css("box-shadow","0 0 3px red");
			alert("Please enter a username");
		}else {
			$.get("/register",{user: username , website: websites[website]}).done(function(data) {
				answer ="";
				tries = 1;
				website =0;
				counter = 0;
				password = (data.password);//[0].num);
				fillpword();
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

function loginpage(){
	$('#registration-div').hide();
	$('#main-div').hide();
	$('#login-div').show();
	//$('#final-div').hide();

}
function registrationpage(){
	$('#login-div').hide();
	$('#main-div').hide();
	$('#registration-div').show();
	$('#final-div').hide();
}
function mainpage(){
	$('#registration-div').hide();
	$('login-div').hide();
	$('#final-div').hide();
	$('#main-div').show();
	$('ok-button').hide();
	$("#results").text("");	
	getFirstGrid();
	
}
function finalpage(finalresult){
	$('#registration-div').hide();
	$('login-div').hide();
	$('#main-div').hide();
	$('ok-button').hide();
	$('#final-div').show();
	if(finalresult=="n_ok"){
		$("#final-str").text("😭 You did not get it right, and you are out of tries 😭")
	}
	
}

function getGrid(tablecell){
	
	var x = tablecell.getAttribute("x");
	var y = tablecell.getAttribute("y");
	console.log(x);
	console.log(y);
	$.get("/grid",{user: username, grid: counter, x:x, y:y , website:websites[website]}).done(function(data) {
		printTable(data.grid);
	});
}

function getFirstGrid(){
	console.log(username);
	$.get("/grid",{user: username, website:websites[website]}).done(function(data) {
		printTable(data.grid);
		console.log(data.grid);
		password = (data.password);//[0].num);
		fillpword();
	});
	$.get("/register",{user: username , website: websites[website]}).done(function(data) {
		password = (data.password);//[0].num);
		fillpword();
	});
}

function fillpword(){
	var text ="";
	for(i=0;i < 4;i++){
		text += emojis[password[i].num];
	}
	$("#password-instruction").text(text);
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
     $("#ok-button").show();

   }
}

function submitAnswer(){
	//console.log("done");
	$.post("/login",{username: username, password:answer, website:websites[website]}).done(function(data) {
		if(data.status == "ok"){
			correct[website] = 1;
		}
	});

	answer ="";
	$("#progress").text("");
	counter =0;
	$("#results").text("");	
	$("#website").text(websites[website]);	

	website= website+1;
	if(website = 3){
		// they got it!
		if(correct[0]==1 && correct[1]==1 && correct[2]==1){
			finalpage("ok");
		}
		// they didn't get it, but they have more tries!
		else if(tries < 3){
			var trystring = "try";
			if(tries>1) trystring = "tries";
			alert("You got one of the website's passwords wrong! You have "+ (3-tries) +" more "+trystring);
		 	tries ++;
		 	website = 0;
		 	$("#results").text("");	
		 	getFirstGrid();
		}
		// they didn't get it :(
		else{
			// ALL DONE!
			finalpage("n_ok");
		}

	}
	$("#results").text("");	
	getFirstGrid();

}

function reset(){
	answer ="";
	$("#progress").text("");
	counter =0;

	$("#results").text("");
	getFirstGrid();

}


