/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link, .nav__contact')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TEXT CIRCULAR ===============*/
// Done with an SVG <textPath> in the HTML + a CSS rotation animation (no JS needed)

/*=============== HOME TYPED JS ===============*/
if(typeof Typed !== 'undefined' && document.getElementById('typed-role')){
   new Typed('#typed-role', {
      strings: [
         'Computer Science student',
         'Aspiring software developer',
         'UI/UX designer',
         'Creative problem solver'
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      loop: true
   })
}

/*=============== CHANGE HEADER STYLES ===============*/
const blurHeader = () =>{
   const header = document.getElementById('header')
   // Add a class if the bottom offset is greater than 50 of the viewport
   window.scrollY >= 50 ? header.classList.add('blur-header')
                        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)
blurHeader()

/*=============== SWIPER WORK ===============*/
if(typeof Swiper !== 'undefined'){
   new Swiper('.work__swiper', {
      loop: true,
      grabCursor: true,
      spaceBetween: 24,
      slidesPerView: 1,
      pagination: {
         el: '.swiper-pagination',
         clickable: true
      },
      breakpoints: {
         768:  { slidesPerView: 2 },
         1150: { slidesPerView: 3, spaceBetween: 32 }
      }
   })
}

/*=============== SERVICES ACCORDION ===============*/
const servicesCards = document.querySelectorAll('.services__card')

servicesCards.forEach(card =>{
   const header = card.querySelector('.services__header')

   header.addEventListener('click', () =>{
      const isOpen = card.classList.contains('services-open')

      // Close all the others, then toggle the clicked one
      servicesCards.forEach(c => c.classList.remove('services-open'))
      if(!isOpen) card.classList.add('services-open')
   })
})

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/
// Testimonials are left out until there are genuine ones to show.
// The "My approach" section takes its place.

/*=============== CONTACT EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

// 1) Create a free account at https://www.emailjs.com
// 2) Paste your keys below. Until then, the form falls back to opening your mail app.
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY',
      EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID',
      EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID',
      FALLBACK_EMAIL      = 'your-email@example.com'

const sendEmail = (e) =>{
   e.preventDefault()

   const configured = EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && typeof emailjs !== 'undefined'

   if(configured){
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, '#contact-form', { publicKey: EMAILJS_PUBLIC_KEY })
         .then(() =>{
            contactMessage.textContent = 'Message sent successfully ✅'
            setTimeout(() => contactMessage.textContent = '', 5000)
            contactForm.reset()
         }, () =>{
            contactMessage.textContent = 'Message not sent (service error) ❌'
         })
   } else {
      const data = new FormData(contactForm)
      const subject = encodeURIComponent('Portfolio message from ' + data.get('user_name'))
      const body = encodeURIComponent(data.get('message') + '\n\n— ' + data.get('user_name') + ' (' + data.get('user_email') + ')')
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`
   }
}
contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () =>{
   const scrollUp = document.getElementById('scroll-up')
   // When the scroll is higher than 350 viewport height, add the show-scroll class
   window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                         : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
scrollUp()

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
   const scrollDown = window.scrollY

   sections.forEach(current =>{
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 120,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']')

      if(!sectionsClass) return

      if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
         sectionsClass.classList.add('active-link')
      } else {
         sectionsClass.classList.remove('active-link')
      }
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

if(cursor && finePointer){
   window.addEventListener('mousemove', (e) =>{
      cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`
   })

   document.querySelectorAll('a, button, .services__header').forEach(el =>{
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'))
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'))
   })
}

/*=============== SCROLLREVEAL ANIMATION ===============*/
if(typeof ScrollReveal !== 'undefined'){
   const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 300,
      // reset: true, // Animations repeat
   })

   sr.reveal('.home__image')
   sr.reveal('.home__data', {delay: 600})
   sr.reveal('.about__text', {origin: 'left'})
   sr.reveal('.about__stats, .about__interests', {origin: 'right'})
   sr.reveal('.work__swiper', {scale: .9})
   sr.reveal('.services__card', {interval: 100})
   sr.reveal('.skills__group', {interval: 150})
   sr.reveal('.approach__card', {scale: .9})
   sr.reveal('.contact__data', {origin: 'left'})
   sr.reveal('.contact__form', {origin: 'right'})
   sr.reveal('.footer__container', {distance: '30px'})
}
