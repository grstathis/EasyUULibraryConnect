//First we check if we are inside Utrecht domain
//alert(localStorage.getItem("initiate_connection"));
localStorage.setItem("initiate_connection", "false");
//alert(localStorage.getItem("initiate_connection"));
if(localStorage.getItem("KeepLogin")=="on"){
  CheckDomain();
}

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

			    ConnectToUULibrary('ddd','25331962!Abcd');
			   
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
 
	 if(localStorage.getItem("initiate_connection") == "true"){
	 //alert("gog");
	  if(changeInfo.url.indexOf('chrome://') == -1){ 
	   if(changeInfo.url != null){
		  if(changeInfo.url.indexOf('proxy.library.uu') == -1){
		   //alert("test");
		   CheckIfProxyExists(changeInfo.url);
		  }
		}
	   }
	 }
 
 });
 
 chrome.webNavigation.onCommitted.addListener(function(info){
	 if(localStorage.getItem("initiate_connection") == "true"){
	  if(info.transitionQualifiers[0] == 'forward_back'){
		
		if(SkipUrl.indexOf(info.url) != -1 ){
		   chrome.tabs.executeScript({
			 code: 'history.back()'
		   });
		}
		
	  }
	 }
 
 });
 