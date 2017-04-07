
var emojis = ["🏁","🆗","💬","🔔","⏸","🔄","🎦","✅","💯","⛔","📌","📎","🔒","🏏","🎿","🏹","🏀","🎉","🗝","🎈","🛁","🚽","🛌","📞","🎁","🎀","🔫","🔨","🔪","🚀","🎙","🗽","🚁","⛵","🚂","🚓","🚲","🚑","🎻","🎲","🎳","🎹","🎧","🎷","🎸","🎨","🎭","🏅","🏆","⚽","🏐","🎾","🏈","🎱","🏒","⛸","🎮","😃","😛","😜","😍","😘","🙃","😉","😇","😎","🤓","🤑","😐","😤","😢","😭","😦","🤐","😷","😩","😬","😰","😱","😳","😵","😡","😠","😈","👹","👺","💀","👻","👽","👾","💩","🤖","🎃","😺","😻","😿","🙀","🙈","🙉","🙊","💪","👉","👇","💑","👤","👥",
"🙏","🙌","🤘","✋","👌","👍","👎","✊","👊","👋","👏","👐","💅","👂","👃","👣","👀","👅","👄","💋","💄","💍","👁","💘","💔","💕","💣","💥","💦","👦","👶","👧","👵","👴","👮","💂",
"🕵","👩","🎓","👸","👰","💃","👙","👗","👔","👠","👞","🎩","🎓","👜","👓","👑","🐶","🐱","🐹","🐼","🐰","🐨","🐷","🐯","🦁","🐮","🐙","🐸","🐔","🐴","🦄","🐝","🐛","🐌","🐚","🐞","🕷","🐢","🦀","🐠","🐬","🐳","🐾","🐿","🐲","🎄","🌴","🍁","🌵","🍀","🍄","🌹","🌻","🌎","🌝","⭐","🔥","🌈","⛄","🌪","🌊","🍎","🍇","🍉","🍌","🍓","🍒","🍑","🍆","🌽","🌶","🧀","🍗","🍤","🍕","🌭","🍔","🍟","🌮","🌯","🍣","🍰","🎂","🍭","🍦","🍪","🍼","🍿","🍩","🍺","🍷"];
var websites = ["Jee-Mail","Fakebook","Safety-Beeposit"];
var username;
var website ;
var mode; // test, 
var password;
var answer = "";
var counter=0;
var tries =  [3,3,3];
var correct = [0,0,0];
var testing = [0,0,0];

//$("#website").text(websites[website]);
$("#reset-button").click(function(){reset();$("#ok-button").hide();});
$("#ok-button").click(function(){submitAnswer();
	$("#ok-button").hide();
});

function printTable(arr){
	var body, tab, tr, td, tn, row, col;
	
	tab = document.getElementById("results");
	
  
	for (row = 0; row < arr.length; row++){

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
	registrationpage();


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
		password = [null,null,null];
		$("#welcome").text("Welcome "+username+"!");
		// Checking for blank fields.
		if(username  ==''){
			$('input[type="text"]').css("border","2px solid red");
			$('input[type="text"]').css("box-shadow","0 0 3px red");
			alert("Please enter a username");
		}else {
			$.get("/register",{user: username , website: websites[0]}).done(function(data) {
				$("#website").text(websites[0]);
				password[0] = (data.password);//[0].num);
				answer ="";
				tries = 0;
				website = 0;
				counter = 0;
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
	websites = ["Jee-Mail","Fakebook","Safety Beeposit"];
	mode = "test";
}
function mainpage(){
	$('#registration-div').hide();
	$('login-div').hide();
	$('#final-div').hide();
	$('#main-div').show();
	$('ok-button').hide();
	$("#progress").text("");
	$("#results").text("");	
	$("#progress").text("");
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
	//console.log(x);
	//console.log(y);
	$.get("/grid",{user: username, grid: counter, x:x, y:y , website:websites[website]}).done(function(data) {
		printTable(data.grid);
	});
}

function getFirstGrid(){
	console.log(username);
	$.get("/grid",{user: username, website:websites[website]}).done(function(data) {
		printTable(data.grid);
		console.log(data.grid);
		//password = (data.password);//[0].num);
		//fillpword();
	});
	if(password[website] == null){
		$.get("/register",{user: username , website: websites[website]}).done(function(data) {
		password[website] = (data.password);//[0].num);
		tries =0;	
		answer ="";
		counter = 0;
		$("#progress").text("");
		fillpword();			
	});
	}
}

function fillpword(){
	var text ="";
	p = password[website];
	for(i=0;i < 4;i++){
		text += emojis[p[i].num];
	}
	$("#password-instruction").text(text);
}

function tableText(tablecell, tabletext, event) {
	//console.log(answer.length);
	if(counter <4){
		$("#progress").text($("#progress").text() +"•");
		console.log(tabletext);
		console.log(websites[website]);
		answer+=tablecell.getAttribute("num") + ":"+tablecell.getAttribute("x") + ","+tablecell.getAttribute("y")+";";
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
	console.log(answer);
	$.post("/login",{username: username, password:answer, website:websites[website], mode:mode}).done(function(data) {
		if(data.status == "ok"){
			if(mode == "test"){
				$("#password-instruction").hide();
				answer ="";
				mode = "trial"
				$("#progress").text("");
				counter =0;
				$("#results").text("");	
				console.log("got status OK!");
				getFirstGrid();
				
			 }
		 else{
		 	alert("👏 Well done! You got it! 👏");
		 	correct[website] = 1;
		 	website = website + 1;
		 	mode = "test";
		 	$("#password-instruction").show();
				if(website == 3){  // on third site
					//if all correct then we can test 
					if(correct[0]==1 && correct[1]==1 && correct[2]==1){
						if(mode != "login"){
							websites = shuffle(websites);
						}
						alert("ABOUT TO TEST! WE ARE AT...");
						if(testing[website] == 0 && tries[website] != 0){
							console.log("testing "+0);
							tries[website]--;
							test[website] = 1;
							check(website);
						}
						else{
							alert("You Successfully remembered all passwords");
							registrationpage();
						}
					}
					// they didn't get it :(
					else{
						// ALL DONE!
						alert("I'm sorry. You didn't guess the passwords correctly.")
						finalpage("n_ok");
					}

				}else if(correct[website] == 0){
					tries[website] = 0;
					$("#website").text(websites[website]);
					$("#results").text("");
					$("#progress").text("");
					getFirstGrid();
				}else{
					registrationpage();
					

				}
			}

		}
	else {
		alert("😭Please try again.😭");
		if(tries[website] == 0){
			registrationpage();
		}else{
			alert(tries[website]);
			tries[website] -= 1;
			reset();
			fillpword();

		}
	}
});

}


function check(site){
<<<<<<< HEAD
	//alert("testing");
=======
>>>>>>> origin/master
	website = site;
	website++;
	$("#website").text(websites[website]);
<<<<<<< HEAD
	//tries = [0,0,0];
	mode = "login"
	$("#password-instruction").hide();
	$("results").text("");

=======
	tries[website] = 3;
	mode = "login"
	$("#password-instruction").hide();
	$("#progress").text("");
	$("#results").text("");
>>>>>>> origin/master
	getFirstGrid();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function reset(){
	answer ="";
	$("#progress").text("");
	counter =0;

	$("#results").text("");
	getFirstGrid();

}




