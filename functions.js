
 function CheckDomain () {
   var initiate_connection;
   //First we remove the UU library cookie.
   chrome.cookies.getAll({}, function(cookies) {
		for (var i in cookies) {
		  if(cookies[i].name == 'ezproxy'){
			removeCookie(cookies[i]);
		  }
		}
	});
   
   //We choose to test www.sciencedirect.com server
   //If we get a server response without credentials, it means we are inside UU utrecht domain.
   //Else we start the connection procedure.
   var proxyi = 'https://login.proxy.library.uu.nl/login?url=http://www.sciencedirect.com/';
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
    
    if (xhr.readyState == 4) {
	  if(xhr.status == 200){
	    //alert(xhr.getAllResponseHeaders());
			if(xhr.getAllResponseHeaders().indexOf('EZproxy') == -1){
			 //alert('cool');
			  localStorage.setItem("initiate_connection", "false");
			 //chrome.browserAction.setIcon({path:{'19': "img/icon19-grayscale.png", '38': "img/icon38-grayscale.png"}, tabId: tabId});
			 //callback(localStorage.getItem("initiate_connection"));
			}else{
			 //alert('nocool');
			  localStorage.setItem("initiate_connection", "true");
			  //alert(localStorage.getItem("User"));
			  if(localStorage.getItem("User") == ""   || 
				 localStorage.getItem("User") == null || 
				 localStorage.getItem("Pass") == ""   || 
				 localStorage.getItem("Pass") == null ){
				 alert("Provide your SolisID/Password in the Popup Screen");
				 }else{
			      ConnectToUULibrary(localStorage.getItem("User"),localStorage.getItem("Pass"));
				  }
             //callback(localStorage.getItem("initiate_connection"));			 
			}
	  }
    }	
   }
   
   xhr.open('GET', proxyi, true);
   xhr.send();
   
   //callback(localStorage.getItem("initiate_connection"));
   //return localStorage.getItem("initiate_connection");
 };
 
function ConnectToUULibrary(uuuser, uupass){    
	
	var newURL = "https://login.proxy.library.uu.nl/";
	var TabId;
	
	var ScriptCode1 = 'var user = document.getElementsByName("user"); user[0].value = ';
	ScriptCode1 = ScriptCode1.concat(uuuser);
	ScriptCode1 = ScriptCode1.concat('; ');
	var ScriptCode2 = 'var pass =  document.getElementsByName("pass"); pass[0].value = "';
	ScriptCode2 = ScriptCode2.concat(uupass);
	ScriptCode2 = ScriptCode2.concat('";');
	var ScriptCode3 = 'var test = document.getElementsByName("encr");  test[0].click();';
	var ScriptCodeAll = ScriptCode1.concat(ScriptCode2,ScriptCode3);
	
	var times = 0;
	var created = 0;
	chrome.cookies.getAll({}, function(cookies) {
		for (var i in cookies) {
		  if(cookies[i].name == 'ezproxy'){
			removeCookie(cookies[i]);
			//alert("yea");
		  }
		}
	});
	
	
function RunConnectAndCheckCookie(TabId){
		 
		 
		 chrome.tabs.executeScript( TabId, {
		 code: ScriptCodeAll
         });
		 setTimeout(function(){
		 
		 var CookieTry = setInterval(function(){chrome.cookies.getAll({}, function(cookies) {
		 
			 for (var i in cookies) {
			  if(cookies[i].name == 'ezproxy'){
	
				created = 1;
				chrome.tabs.remove(TabId);
				clearInterval(CookieTry);
				clearInterval(myTry);
				
			  }
			}
			if(created != 1){
			 times++;
			 
		     if(times == 5){
				   clearInterval(CookieTry);
			 }
			}
	     });}, 1000)}, 2000);
		 
	}
	
	
	chrome.tabs.create({ url: newURL }, function(tab){ 
	
	 TabId = tab.id; 
	 
	var myTry = setInterval(RunConnectAndCheckCookie(TabId), 1000);
	
	});
	
}

function removeCookie(cookie) {
  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
            cookie.path;
  chrome.cookies.remove({"url": url, "name": cookie.name});
}

