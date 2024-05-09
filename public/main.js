let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active')
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll= () =>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height= sec.offsetHeight;
        let id= sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach.apply(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href"-" + id + "]"').classList.add('active');
            });
        };
    });

    let header= document.querySelector('header');
    header.classList.toggle('sticky', windows.scrollY> 100);

    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
}


ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
})

ScrollReveal().reveal('.home-content, heading', {origin: 'top'});
ScrollReveal().reveal('.home-img, .skills-container, .projects-box, .contact form', {origin: 'button'});
ScrollReveal().reveal('.home-contact h1, .about-img', {origin: 'left'});
ScrollReveal().reveal('.home-contact p, .about-content', {origin: 'right'});

const typed = new Typed('#multiple',{
    strings:['Frontend Developer', 'Programmer', 'Web Designer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
})



// FORM SUBMISSION FOR CONTACT
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get form inputs
        const fullName = document.querySelector("#contactForm input[name='fullName']").value.trim();
        const emailAddress = document.querySelector("#contactForm input[name='emailAddress']").value.trim();
        const mobileNumber = document.querySelector("#contactForm input[name='mobileNumber']").value.trim();
        const emailSubject = document.querySelector("#contactForm input[name='emailSubject']").value.trim();
        const message = document.querySelector("#contactForm textarea[name='message']").value.trim();

        // Simple validation
        if (fullName === "" || emailAddress === "" || mobileNumber === "" || emailSubject === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        // AJAX request to send form data
        fetch("/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: fullName,
                emailAddress: emailAddress,
                mobileNumber: mobileNumber,
                emailSubject: emailSubject,
                message: message
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("There was a problem sending your message.");
            }
            return response.text();
        })
        .then(data => {
            alert(data); // Alert the response message
            // Optionally, you can reset the form
            contactForm.reset();
        })
        .catch(error => {
            alert(error.message);
        });
    });
});
