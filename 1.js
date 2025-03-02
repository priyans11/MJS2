/*smooth scrolling
attach loco scroll css
attach locomotive scroll min js
some code from loco github for js

gsap
attach gsap

scroll trigger */

// Update the login link handler
window.addEventListener('DOMContentLoaded', () => {
    // Check login state
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    // Update menu based on login state
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownMenu) {
        const loginLink = dropdownMenu.querySelector('a[href="./loginpage/2.html"]'); // Update selector
        if (loginLink) {
            if (isLoggedIn) {
                // Show logout option
                loginLink.href = '#';
                loginLink.innerHTML = `Logout (${username}) <i class="ri-arrow-right-s-line"></i>`;
                loginLink.onclick = (e) => {
                    e.preventDefault();
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('username');
                    window.location.reload();
                };
            } else {
                // Show login option
                loginLink.href = './loginpage/2.html'; // Update path
                loginLink.innerHTML = 'Login <i class="ri-arrow-right-s-line"></i>';
            }
        }
    }
});

// Enhanced smooth scroll configuration
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
  multiplier: 0.7,  // Adjust scroll speed
  lerp: 0.07,        // Lower value = smoother scroll
  tablet: {
    smooth: true,
    breakpoint: 1024
  },
  smartphone: {
    smooth: true
  }
});

// Refresh scroll on image load
window.addEventListener('load', () => {
  setTimeout(() => {
    scroll.update();
  }, 1000);
});

// Handle resize
window.addEventListener('resize', () => {
  scroll.update();
});

// Update scroll on DOM changes
const observer = new MutationObserver(() => {
  scroll.update();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initialize the custom cursor animation
const circleElement = document.querySelector('.minicircle')

if (!circleElement) {
  console.error("No element found with class 'minicircle'")
}

const mouse = { x: 0, y: 0 }
const previousMouse = { x: 0, y: 0 }
const circle = { x: 0, y: 0 }
let currentScale = 0
let currentAngle = 0

// Listen to mouse movements
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX // Get mouse x position
  mouse.y = e.clientY // Get mouse y position
})

const speed = 0.17 // Increase speed for better follow effect

const tick = () => {
  // Calculate new position based on mouse movement
  circle.x += (mouse.x - circle.x) * speed
  circle.y += (mouse.y - circle.y) * speed

  // Apply translation for cursor movement
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`

  // Calculate velocity for scaling effect
  const deltaMouseX = mouse.x - previousMouse.x
  const deltaMouseY = mouse.y - previousMouse.y
  previousMouse.x = mouse.x
  previousMouse.y = mouse.y

  const mouseVelocity = Math.min(
    Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
    150
  )
  const scaleValue = (mouseVelocity / 150) * 0.5
  currentScale += (scaleValue - currentScale) * speed

  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`

  // Calculate the angle of rotation based on mouse movement
  const angle = Math.atan2(deltaMouseY, deltaMouseX) * (180 / Math.PI) // Use atan2 for better rotation

  // Update the rotation if the mouse is moving significantly
  if (mouseVelocity > 20) {
    currentAngle = angle
  }

  const rotateTransform = `rotate(${currentAngle}deg)` // Apply the rotation transform

  // Apply the calculated transform to the circle element
  if (circleElement) {
    circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`
  }

  // Keep the animation running
  window.requestAnimationFrame(tick)
}

// Start the animation loop

/* ---------------------------------------------------------------------------------------------------------------------------------- */

function firstPageAnim () {
  var tl = gsap.timeline()
  tl.from('#nav', {
    y: '-10',
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut
  })
    .to('.boundingelem', {
      y: '0',
      ease: Expo.easeInOut,
      duration: 1.5,
      delay: -1,
      stagger: 0.2
    })
    .from('#herofooter', {
      y: '-10',
      opacity: 0,
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut
    })
}

// document.querySelectorAll(".elem").forEach(function(elem){});

/* ---------------------------------------------------------------------------------------------------------------------------------- */

/* teeno element ko sleect karo, uske baad teeno par ek mousemove lagao,
jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai
mouse ki x and y position pata karo, ab mouse ki x y position ke badle us
image ko show karo and us image ko move karo, move karte waqt rotate karo,
and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye*/

// Optimize performance for image animations
document.querySelectorAll('#elem').forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;
  let isHovering = false;
  
  elem.addEventListener('mouseenter', function() {
    isHovering = true;
  });
  
  elem.addEventListener('mousemove', function (details) {
    if (!isHovering) return;
    let image = elem.querySelector('img');
    let elemRect = elem.getBoundingClientRect();
    
    diffrot = details.clientX - rotate;
    rotate = details.clientX;
    
    gsap.to(image, {
      opacity: 1,
      ease: Power2.easeOut,
      top: details.clientY - elemRect.top - image.offsetHeight/2,
      left: details.clientX - elemRect.left - image.offsetWidth/2,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      duration: 0.6,
      overwrite: "auto" // Prevent animation queue buildup
    });
  });
  
  elem.addEventListener('mouseleave', function () {
    isHovering = false;
    let image = elem.querySelector('img');
    
    gsap.killTweensOf(image); // Kill any running animations
    gsap.to(image, {
      opacity: 0,
      duration: 0.2,
      ease: Power2.easeOut,
      onComplete: () => {
        gsap.set(image, {
          rotate: 0,
          clearProps: "top,left,rotate" // Reset position and rotation
        });
      }
    });
  });
});


/* ---------------------------------------------------------------------------------------------------------------------------------- */

setInterval(()=>
{

  let currtime=new Date();
  console.log(currtime);
   let time=document.querySelector("#clock");
   time.innerText=currtime.toLocaleTimeString();
},1000)

tick()
firstPageAnim()

// Dropdown menu functionality
const menuButton = document.querySelector('#menu');
const dropdownMenu = document.querySelector('.dropdown-menu');
let isDropdownOpen = false;

menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    dropdownMenu.classList.toggle('active');
});

dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

document.addEventListener('click', (e) => {
    if (isDropdownOpen && !dropdownMenu.contains(e.target)) {
        isDropdownOpen = false;
        dropdownMenu.classList.remove('active');
    }
});

// Prevent dropdown from closing when hovering
menuButton.addEventListener('mouseenter', () => {
    dropdownMenu.classList.add('active');
    isDropdownOpen = true;
});
