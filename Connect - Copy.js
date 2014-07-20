    var newURL = "https://login.proxy.library.uu.nl/";
	var TabID;
	var created = 0;
	var code1 = 'var user = document.getElementsByName("user"); user[0].value = 3432572; var pass =  document.getElementsByName("pass"); pass[0].value = "25331962!Abcd";';
	var code2 = 'var test = document.getElementsByName("encr");  test[0].click();';
	var codeall = code1.concat(code2);
	
	
	chrome.tabs.query({
    active: true,               // Select active tabs
    lastFocusedWindow: true     // In the current window
    }, function(array_of_Tabs) {
    
     var tabinit = array_of_Tabs[0];
   
	     
    });
	
	
	chrome.tabs.create({ url: newURL }, function(tab){ 
	
	TabID = tab.id; 
	
	chrome.tabs.executeScript( TabID, {
     code: codeall
    }); 
	
	
	});
	
	
	
	/*chrome.tabs.query({
    active: true,               // Select active tabs
    lastFocusedWindow: true     // In the current window
    }, function(array_of_Tabs) {
    
     var tab = array_of_Tabs[0];
   
	 chrome.tabs.remove(tab.id);
    
    });*/
	
	//chrome.tabs.update(tabinit.id, {selected: true});
    
	
	//alert("shit");      

 chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)
 {
 
 //alert(changeInfo.url);
 
 function CheckIfProxyExists(urlsub) {
   var proxyi = 'https://login.proxy.library.uu.nl/login?url=';
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
       if (xhr.status == 200) {
	   
		 var strg = xhr.responseText;
		 var strerr = 'The requested page is not accessible via Utrecht University Library.';
		 if(xhr.responseText.indexOf(strerr) == -1){
		   
		   updateProperties = new Object();
		   var urlnew = proxyi.concat(urlsub);
		   updateProperties.url = urlnew;
		   chrome.tabs.update(tabId, updateProperties, function() {});
		   
		 }
         
		 
       } else {
	     //alert
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
      if(changeInfo.url.indexOf('proxy.library.uu') == -1){;
       CheckIfProxyExists(changeInfo.url);
	  }
	}
   }
 
 
 });