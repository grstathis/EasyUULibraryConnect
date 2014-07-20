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
			
		  }
		 }
	    });
		
	chrome.tabs.create({ url: newURL }, function(tab){ 
	
	 TabId = tab.id; 
	 
	//var myTry = setInterval(RunConnectAndCheckCookie(TabId), 1000);
	chrome.tabs.executeScript( TabId, {
		 code: ScriptCodeAll
         });
	
	});	
		 
}

/*function RunConnectAndCheckCookie(TabId){
		 
		 //RemoveCookieRunConnect();
		 
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
	
//-->}

function removeCookie(cookie) {
  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
            cookie.path;
  chrome.cookies.remove({"url": url, "name": cookie.name});
}*/


function clickHandler() {
  if(document.forms["login"]["userid"].value == "" || 
     document.forms["login"]["userid"].value == null){
	   alert("Fill out your SolisID");
   }else{
      sessionStorage.setItem("tempUser", document.forms["login"]["userid"].value);
	  sessionStorage.setItem("tempPass", document.forms["login"]["pswrd"].value);
      //ConnectToUULibrary(document.forms["login"]["userid"].value, document.forms["login"]["pswrd"].value);
	  chrome.runtime.sendMessage('connect');
  };
}

function changeHandlerR(){
   //Do Something...maybe another function showAlert(), for instance
   if(rmlg.checked){
	  localStorage.setItem("KeepLogin", "on");
	  if(document.forms["login"]["userid"].value == "" || 
         document.forms["login"]["userid"].value == null){
	      alert("Fill out your SolisID");
      }else{
	   localStorage.setItem("User", document.forms["login"]["userid"].value);
	   localStorage.setItem("Pass", document.forms["login"]["pswrd"].value);
	  }
   }
   else{
      //do something else
	  localStorage.setItem("KeepLogin", "off");
   }
}

function changeHandlerW(){
   //Do Something...maybe another function showAlert(), for instance
   if(uuwebp.checked){
	  localStorage.setItem("KeepUUWebpageOpen", "on");
   }
   else{
      //do something else
	  localStorage.setItem("KeepUUWebpageOpen", "off");
   }
}



function main() {
  // Initialization work goes here.
  if(localStorage.getItem("KeepLogin")=="on"){
   document.getElementById("rmlg").checked = true;
  }
  if(localStorage.getItem("KeepUUWebpageOpen")=="on"){
   document.getElementById("uuwebp").checked = true;
  }
  //localStorage.setItem("KeepLogin", "off");
  //localStorage.setItem("KeepUUWebpageOpen", "off");
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function() {
  main();
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
});

document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#rmlg').addEventListener('change', changeHandlerR);
});

document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#uuwebp').addEventListener('change', changeHandlerW);
});
