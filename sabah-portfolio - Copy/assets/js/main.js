// ================= 1. OPEN & CLOSE MOBILE MENU =================
var menu = document.getElementById("menu");
var toggleBtn = document.getElementById("toggle-btn");
var closeBtn = document.getElementById("close-btn");
 
toggleBtn.addEventListener("click", function () {
   menu.classList.add("show");
});
 
closeBtn.addEventListener("click", function () {
   menu.classList.remove("show");
});
 
// Close the menu when a link is clicked
var links = document.querySelectorAll(".link");
 
for (var i = 0; i < links.length; i++) {
   links[i].addEventListener("click", function () {
      menu.classList.remove("show");
   });
}
 
 
// ================= 2. TYPING TEXT (HOME) =================
var roleBox = document.getElementById("role");
 
var roles = [
   "Computer Science student",
   "Aspiring software developer",
   "UI/UX designer",
   "Creative problem solver"
];
 
var roleIndex = 0;     // which sentence we are typing
var letterIndex = 0;   // how many letters are shown
var isDeleting = false;
 
function typeRole() {
   var currentRole = roles[roleIndex];
 
   if (isDeleting) {
      letterIndex = letterIndex - 1;
   } else {
      letterIndex = letterIndex + 1;
   }
 
   roleBox.textContent = "I'm a " + currentRole.substring(0, letterIndex);
 
   var delay = 80;
 
   if (isDeleting) {
      delay = 40;
   }
 
   if (!isDeleting && letterIndex === currentRole.length) {
      // finished typing, wait a little, then start deleting
      isDeleting = true;
      delay = 1500;
   } else if (isDeleting && letterIndex === 0) {
      // finished deleting, go to the next sentence
      isDeleting = false;
      roleIndex = roleIndex + 1;
      if (roleIndex === roles.length) {
         roleIndex = 0;
      }
      delay = 400;
   }
 
   setTimeout(typeRole, delay);
}
 
typeRole();
 
 
// ================= 3. SERVICES (CLICK TO OPEN) =================
var services = document.querySelectorAll(".service");
 
for (var j = 0; j < services.length; j++) {
   var top = services[j].querySelector(".service-top");
 
   top.addEventListener("click", function () {
      var card = this.parentElement;
      var wasOpen = card.classList.contains("open");
 
      // close all cards first
      for (var k = 0; k < services.length; k++) {
         services[k].classList.remove("open");
      }
 
      // open the clicked card (unless it was already open)
      if (!wasOpen) {
         card.classList.add("open");
      }
   });
}
 
 
// ================= 4. SCROLL EFFECTS =================
var header = document.getElementById("header");
var scrollUp = document.getElementById("scroll-up");
var sections = document.querySelectorAll("section[id]");
 
function onScroll() {
   var scrollY = window.scrollY;
 
   // Header background after 50px
   if (scrollY >= 50) {
      header.classList.add("scrolled");
   } else {
      header.classList.remove("scrolled");
   }
 
   // Show scroll-up button after 350px
   if (scrollY >= 350) {
      scrollUp.classList.add("show");
   } else {
      scrollUp.classList.remove("show");
   }
 
   // Highlight the menu link of the section we are on
   for (var s = 0; s < sections.length; s++) {
      var section = sections[s];
      var sectionTop = section.offsetTop - 150;
      var sectionBottom = sectionTop + section.offsetHeight;
      var id = section.getAttribute("id");
      var menuLink = document.querySelector('.link[href="#' + id + '"]');
 
      if (menuLink) {
         if (scrollY > sectionTop && scrollY <= sectionBottom) {
            menuLink.classList.add("active");
         } else {
            menuLink.classList.remove("active");
         }
      }
   }
}
 
window.addEventListener("scroll", onScroll);
onScroll();
 
 
// ================= 5. CONTACT FORM =================
// Opens the visitor's email app with the message filled in.
// Put your own email address below.
var myEmail = "your-email@example.com";
 
var form = document.getElementById("contact-form");
 
form.addEventListener("submit", function (event) {
   event.preventDefault();
 
   var name = document.getElementById("user-name").value;
   var email = document.getElementById("user-email").value;
   var message = document.getElementById("user-message").value;
 
   var subject = "Portfolio message from " + name;
   var body = message + "\n\n- " + name + " (" + email + ")";
 
   window.location.href =
      "mailto:" + myEmail +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
});