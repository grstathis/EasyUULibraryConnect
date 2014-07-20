
 

 /*function CheckIfProxyExists() {
   
   chrome.cookies.getAll({}, function(cookies) {
		for (var i in cookies) {
		  if(cookies[i].name == 'ezproxy'){
			removeCookie(cookies[i]);
		  }
		}
	});
   
   
   var proxyi = 'https://login.proxy.library.uu.nl/login?url=http://www.sciencedirect.com/';
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
    
    if (xhr.readyState == 4) {
	  //alert(xhr.status);
	  if(xhr.status == 200){
	    alert(xhr.getAllResponseHeaders());
		//var test =  xhr.getAllResponseHeaders();
		if(xhr.getAllResponseHeaders().indexOf('EZproxy') == -1){
		alert('cool');
		}else{
		alert('nocool'); 
		}
		//console.log(xhr.responseText);
		//chrome.tabs.executeScript({
		// code: 'console.log(xhr.responseText)'
       //});
	  }
    }	
   }
   //xhr.getAllResponseHeaders(); 
   xhr.open('GET', proxyi, true);
   xhr.send();
 };
 
CheckIfProxyExists();
*/
