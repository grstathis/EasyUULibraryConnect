var SkipUrl = new Array();

function ConnectToUULibrary(uuuser, uupass){    
	
	var newURL = "https://login.proxy.library.uu.nl/";
	var TabId;
	
	var ScriptCode1 = 'var user = document.getElementsByName("user"); user[0].value = ';
	ScriptCode1 = ScriptCode1.concat(uuuser);
	ScriptCode1 = ScriptCode1.concat('; ');
	var ScriptCode2 = 'var pass =  document.getElementsByName("pass"); pass[0].value = "'; //25331962!Abcd";';
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
	
	
function RunScriptAndCheckCookie(TabId){
		 
		 
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
	 
	var myTry = setInterval(RunScriptAndCheckCookie(TabId), 1000);
	
	});
	
}

  
function removeCookie(cookie) {
  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
            cookie.path;
  chrome.cookies.remove({"url": url, "name": cookie.name});
}


ConnectToUULibrary('3432572','25331962!Abcd');


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)
 {
 
 function CheckIfProxyExists(urlsub) {
  
   var proxyi = 'https://login.proxy.library.uu.nl/login?url=';
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
       if (xhr.status == 200) {
	     		 
		 var strg = xhr.responseText;
		 var strerr = 'The requested page is not accessible via Utrecht University Library.';

		 if(xhr.responseText.indexOf(strerr) == -1){
		   if(xhr.responseText.indexOf('var nourl=') == -1){
		   	   updateProperties = new Object();
			   var urlnew = proxyi.concat(urlsub);
			   updateProperties.url = urlnew;
			   chrome.tabs.update(changeInfo.tabId, updateProperties, function() {
			   updateProperties.url = urlsub;
			   chrome.history.deleteUrl({url: updateProperties.url}, function(){SkipUrl.push(updateProperties.url);});
			   });
			 }else{
			   ConnectToUULibrary('3432572','25331962!Abcd');
             }			 

		 }
         
		 
       } else {
	     
       }
     }
   }
  
   var proxy = 'https://login.proxy.library.uu.nl/login?url=';
   
   var url = proxy.concat(urlsub);
   xhr.open('GET', url, true);
   xhr.send();
 };
 
  if(changeInfo.url.indexOf('chrome://') == -1){ 
   if(changeInfo.url != null){
      if(changeInfo.url.indexOf('proxy.library.uu') == -1){
	   //alert("test");
       CheckIfProxyExists(changeInfo.url);
	  }
	}
   }
 
 
 });

 chrome.webNavigation.onCommitted.addListener(function(info){
 
  if(info.transitionQualifiers[0] == 'forward_back'){
    
	if(SkipUrl.indexOf(info.url) != -1 ){
	   chrome.tabs.executeScript({
		 code: 'history.back()'
       });
	}
	
	
	
  }
 
 
 });

 