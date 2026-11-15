const cookieField = document.getElementById("cookieText");
const status = document.getElementById("status");

chrome.cookies.get({url: "https://www.linkedin.com/", name: "li_at"}, cookie => {
   if (chrome.runtime.lastError) {
      cookieField.value = "";
      status.textContent = "Could not read the LinkedIn session cookie.";
      return;
   }
   cookieField.value = cookie ? cookie.value : "";
   status.textContent = cookie
      ? "Treat this cookie like a password. Only share it with software you trust."
      : "No LinkedIn session cookie was found.";
});
