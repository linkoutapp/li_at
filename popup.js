chrome.tabs.getSelected(null, function() {
   let li_at = '';
   
   // If the chrome.cookies API is not available, fallback to chrome.experimental.cookies
   if (!chrome.cookies)
      chrome.cookies = chrome.experimental.cookies;
   
   // Retrieve all cookies
   chrome.cookies.getAll({}, function(cookie) {
      for (i = 0; i < cookie.length; i++) {
         // Check if the cookie's domain includes "www.linkedin.com" and its name is "li_at"
         if (cookie[i].domain.includes("www.linkedin.com") && cookie[i].name == "li_at") {
            // Assign the value of "li_at" cookie to the variable "li_at"
            li_at = cookie[i].value;
         }
      }
      
      // Set the value of the "cookieText" element to the value of "li_at" cookie
      document.getElementById("cookieText").value = li_at;
      
      // Add an event listener to the "b" element
      document.getElementById('b').addEventListener("click", function() {
         // When the "b" element is clicked, update the value of the "cookieText" element with the value of "li_at" cookie
         document.getElementById("cookieText").value = li_at;
      });
   });
});
