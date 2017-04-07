
var emojis = ["🏁","🆗","💬","🔔","⏸","🔄","🎦","✅","💯","⛔","📌","📎","🔒","🏏","🎿","🏹","🏀","🎉","🗝","🎈","🛁","🚽","🛌","📞","🎁","🎀","🔫","🔨","🔪","🚀","🎙","🗽","🚁","⛵","🚂","🚓","🚲","🚑","🎻","🎲","🎳","🎹","🎧","🎷","🎸","🎨","🎭","🏅","🏆","⚽","🏐","🎾","🏈","🎱","🏒","⛸","🎮","😃","😛","😜","😍","😘","🙃","😉","😇","😎","🤓","🤑","😐","😤","😢","😭","😦","🤐","😷","😩","😬","😰","😱","😳","😵","😡","😠","😈","👹","👺","💀","👻","👽","👾","💩","🤖","🎃","😺","😻","😿","🙀","🙈","🙉","🙊","💪","👉","👇","💑","👤","👥",
"🙏","🙌","🤘","🖕","✋","👌","👍","👎","✊","👊","👋","👏","👐","💅","👂","👃","👣","👀","👅","👄","💋","💄","💍","👁","💘","💔","💕","💣","💥","💦","👦","👶","👧","👵","👴","👮","💂",
"🕵","👩","🎓","👸","👰","💃","👙","👗","👔","👠","👞","🎩","🎓","👜","👓","👑","🐶","🐱","🐹","🐼","🐰","🐨","🐷","🐯","🦁","🐮","🐙","🐸","🐔","🐴","🦄","🐝","🐛","🐌","🐚","🐞","🕷","🐢","🦀","🐠","🐬","🐳","🐾","🐿","🐲","🎄","🌴","🍁","🌵","🍀","🍄","🌹","🌻","🌎","🌝","⭐","🔥","🌈","⛄","🌪","🌊","🍎","🍇","🍉","🍌","🍓","🍒","🍑","🍆","🌽","🌶","🧀","🍗","🍤","🍕","🌭","🍔","🍟","🌮","🌯","🍣","🍰","🎂","🍭","🍦","🍪","🍼","🍿","🍩","🍺","🍷"];
var websites = ["Jee-Mail","Fakebook","Safety Beeposit"];
var username;
var website ;
var mode;
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
	console.log(answer.length);
	if(counter <4){
		$("#progress").text($("#progress").text() +"•");
		console.log(tabletext);
		answer+=tablecell.getAttribute("num") + ":"+tablecell.getAttribute("x") + ","+tablecell.getAttribute("y")+";";
		counter ++;
		getGrid(tablecell)
	}
	if(counter == 4){
		console.log(answer);
		$("#ok-button").show();

	}
}
function submitAnswer(){
	$.post("/login",{username: username, password:answer, website:websites[website]}).done(function(data) {
	if(data.status == "ok"){
		if(mode == "test"){
				$("#password-instruction").hide();
				mode = "go";
				answer ="";
				$("#progress").text("");
				counter =0;
				$("#results").text("");	
				getFirstGrid();
		
		 }//else if (mode == "final"){
				// if(website == 3){
				// 	done();
				// 	break;
				// }
				// website ++;
				// testing[website] = 1;
				// $("#password-instruction").hide();
				// answer ="";
				// $("#progress").text("");
				// $("#results").text("");	
				// getFirstGrid();
		
		 //}
		else{
			alert("👏 Well done! You got it! 👏");
				correct[website] = 1;
				website = website + 1;
				mode = "test";
				$("#password-instruction").show();
				if(website == 3){  // on third site
					// they got it!
					if(correct[0]==1 && correct[1]==1 && correct[2]==1){
						//check();
						registrationpage();
					}
					// they didn't get it :(
					else{
						// ALL DONE!
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
	// else if(mode == "final") {
	// 	alert("wrong");
	// 	website++;
	// 	$("#progress").text("");
	// 	$("#results").text("");
	// 	getFirstGrid();
	// 	}
	else {
		alert("😭Please try again.😭");
		if(tries[website] == 0){
			registrationpage();
		}else{
			tries[website] -= 1;
			reset();
			fillpword();

		}
	}
});

}


function submitAnswer1(){
	//console.log("done");
	$.post("/login",{username: username, password:answer, website:websites[website]}).done(function(data) {
		if(data.status == "ok"){
			correct[website] = 1;
		}
		else {
		}
	});

	answer ="";
	$("#progress").text("");
	counter = 0;
	$("#results").text("");	
	$("#website").text(websites[website]);	

	website = website+1;
	if(website == 3){
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


// function check(){
// 	website = 0;
// 	mode = "final"
// 	$("#password-instruction").hide();
// 	getFirstGrid();
// }



function reset(){
	answer ="";
	$("#progress").text("");
	counter =0;

	$("#results").text("");
	getFirstGrid();

}




