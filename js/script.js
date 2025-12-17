/* -----------------------------------
   ROOM DETAILS POPUP
-------------------------------------*/
function showDetails(room) {
    alert(`You clicked on ${room}. More details coming soon!`);
}

/* -----------------------------------
   SLIDER
-------------------------------------*/
let currentSlide = 0;
const slides = document.querySelectorAll('.slides img');

if (slides.length > 0) {
    slides[currentSlide].classList.add('active');

    function changeSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

/* -----------------------------------
   FADE-IN ON SCROLL
-------------------------------------*/
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});



/* -----------------------------------
   CONTACT FORM
-------------------------------------*/
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        alert(`Thank you, ${name}! Your message has been sent. We'll contact you at ${email}.`);

        contactForm.reset();
    });
}

/* -----------------------------------
   GALLERY FILTER
-------------------------------------*/
function filterSelection(category, button) {
    const items = document.getElementsByClassName('gallery-item');

    for (let i = 0; i < items.length; i++) {
        items[i].style.display =
            (category === 'all' || items[i].classList.contains(category))
                ? 'block'
                : 'none';
    }

    // Update active button
    const btns = document.getElementsByClassName('filter-btn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }

    if (button) {
        button.classList.add('active');
    }
}

/* -----------------------------------
   LIGHTBOX MODAL (FIXED – only one version)
-------------------------------------*/
function openModal(img) {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = img.src;
    caption.innerHTML = img.alt;
}

function closeModal() {
    document.getElementById('lightboxModal').style.display = 'none';
}



const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    
    // Change icon between bars and close
    const icon = menuToggle.querySelector("i");
    if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-times");
    } else {
        icon.classList.replace("fa-times", "fa-bars");
    }
});

const slider = document.querySelector('.testimonial-slider');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const dots = document.querySelectorAll('.testimonial-dots .dot');
const slideWidth = 330; // testimonial width + margin
let scrollAmount = 0;

function updateDots(){
    const index = Math.round(scrollAmount / slideWidth);
    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[index]) dots[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    if(scrollAmount < slider.scrollWidth - slider.clientWidth){
        scrollAmount += slideWidth;
    } else {
        scrollAmount = 0;
    }
    slider.scrollTo({left: scrollAmount, behavior: 'smooth'});
    updateDots();
});

prevBtn.addEventListener('click', () => {
    if(scrollAmount > 0){
        scrollAmount -= slideWidth;
    } else {
        scrollAmount = slider.scrollWidth - slider.clientWidth;
    }
    slider.scrollTo({left: scrollAmount, behavior: 'smooth'});
    updateDots();
});

// Auto-slide every 5 seconds
setInterval(() => {
    if(scrollAmount < slider.scrollWidth - slider.clientWidth){
        scrollAmount += slideWidth;
    } else {
        scrollAmount = 0;
    }
    slider.scrollTo({left: scrollAmount, behavior: 'smooth'});
    updateDots();
}, 5000);

// Click on dots to navigate
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        scrollAmount = i * slideWidth;
        slider.scrollTo({left: scrollAmount, behavior: 'smooth'});
        updateDots();
    });
});




/* -----------------------------------
   IMAGE SLIDER (Smooth Fade)
-------------------------------------*/
(function() {
    const slides = document.querySelectorAll('.slides img');
    let currentSlide = 0;

    if (slides.length === 0) return;

    // Hide all slides initially
    slides.forEach((slide, i) => {
        slide.style.opacity = 0;
        slide.style.transition = "opacity 1s ease-in-out";
        if (i === 0) slide.style.opacity = 1;
    });

    function showSlide(n) {
        slides.forEach((slide, i) => {
            slide.style.opacity = 0;
        });
        slides[n].style.opacity = 1;
    }

    // Next / Prev buttons
    window.changeSlide = function(n) {
        currentSlide = (currentSlide + n + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-slide every 4 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 4000);
})();


/* -----------------------------------
   HERO / IMAGE SLIDER (Smooth Fade)
-------------------------------------*/
(function() {
    const slides = document.querySelectorAll('.slides .slide');
    let currentSlide = 0;

    if (slides.length === 0) return;

    // Initialize all slides
    slides.forEach((slide, i) => {
        slide.style.position = "absolute";
        slide.style.top = 0;
        slide.style.left = 0;
        slide.style.width = "100%";
        slide.style.transition = "opacity 1s ease-in-out";
        slide.style.opacity = i === 0 ? 1 : 0;
    });

    function showSlide(n) {
        slides.forEach((slide, i) => slide.style.opacity = 0);
        slides[n].style.opacity = 1;
    }

    // Make changeSlide global so buttons work
    window.changeSlide = function(n) {
        currentSlide = (currentSlide + n + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-slide every 4 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 4000);
})();


function openModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function changeModalImage(modalId, imgSrc) {
    const modal = document.getElementById(modalId);
    const modalImg = modal.querySelector(".modal-content");
    modalImg.src = imgSrc;
}


// ADMIN PANEL — BOOKINGS TABLE WITH ACTION BUTTONS

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const tableBody = document.querySelector("#bookingsTable tbody");
const emptyState = document.getElementById("emptyState");

tableBody.innerHTML = ""; // clear table first

if (bookings.length === 0) {
    emptyState.style.display = "block";
} else {
    emptyState.style.display = "none";

    bookings.forEach((b, index) => {

        // default status
        const status = b.status || "Pending";

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${b.name}</td>
            <td>${b.email}</td>
            <td>${b.phone}</td>
            <td>${b.room}</td>
            <td>${b.checkin}</td>
            <td>${b.checkout}</td>
            <td>
                <span class="status ${status.toLowerCase()}">${status}</span>
            </td>
            <td>
                <button class="approve-btn" onclick="approveBooking(${index})">Approve</button>
                <button class="reject-btn" onclick="rejectBooking(${index})">Reject</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// APPROVE BOOKING
function approveBooking(index) {
    bookings[index].status = "Approved";
    localStorage.setItem("bookings", JSON.stringify(bookings));
    location.reload();
}

// REJECT BOOKING
function rejectBooking(index) {
    bookings[index].status = "Rejected";
    localStorage.setItem("bookings", JSON.stringify(bookings));
    location.reload();
}

//admin login credential approval
    if (sessionStorage.getItem("adminLoggedIn") !== "true") {
        window.location.href = "admin-login.html";
    }

    function logout() {
    sessionStorage.removeItem("adminLoggedIn");
    window.location.href = "admin-login.html";
}


    //admin-login
    function login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // 🔐 Change these credentials
        const ADMIN_USER = "admin";
        const ADMIN_PASS = "12345";

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            sessionStorage.setItem("adminLoggedIn", "true");
            window.location.href = "admin.html";
        } else {
            document.getElementById("error").style.display = "block";
        }
    }
    //booking
    const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", document.getElementById("name").value);
        formData.append("email", document.getElementById("email").value);
        formData.append("phone", document.getElementById("phone").value);
        formData.append("room", document.getElementById("room").value);
        formData.append("checkin", document.getElementById("checkin").value);
        formData.append("checkout", document.getElementById("checkout").value);

        try {
            const response = await fetch("api/book-room.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert("✅ Booking submitted successfully! Awaiting approval.");
                bookingForm.reset();
            } else {
                alert("❌ " + result.message);
            }

        } catch (error) {
            alert("❌ Network error. Please try again.");
            console.error(error);
        }
    });
}
const closeMenu = document.getElementById("closeMenu");

closeMenu.addEventListener("click", () => {
    navLinks.classList.remove("active");

    // reset hamburger icon
    const icon = menuToggle.querySelector("i");
    icon.classList.replace("fa-times", "fa-bars");
});
