$(document).ready(function(){
	
	
	loginpage();

	$("#login").click(function(){
		var uname = $("#login-uname").val();
		// Checking for blank fields.
		if( uname ==''){
			$('input[type="text"]').css("border","2px solid red");
			$('input[type="text"]').css("box-shadow","0 0 3px red");
			alert("Please enter a username");
		}else {
			$.get("http://172.17.194.26:3000/login",{user: uname},
			function(data) {
			if(data=='invalid') {
				$('input[type="text"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
				alert(data);
			}else if(data=='success'){
				$("form")[0].reset();
				$('input[type="text"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
				//alert(data);
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
			$.get("http://172.17.194.26:3000/register",{user: uname}).done(function(data) {
			if(data=='invalid') {
				$('input[type="text"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
				alert(data);
			}else if(data=='success'){
				$("form")[0].reset();
				$('input[type="text"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
				//alert(data);
				mainpage();
				alert(data);
			} else{
				alert(data);
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
	$('#main-div').show();

	// CHANGE WEBSITE NAME

}






