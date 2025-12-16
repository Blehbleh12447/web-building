// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(15, 15, 25, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 15, 25, 0.8)';
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// CONTACT FORM HANDLING WITH EMAILJS
// ===================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Initialize EmailJS with your public key
// You'll need to sign up at https://www.emailjs.com/ and get your keys
// For now, we'll use a fallback method

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        showFormStatus('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Method 1: Using EmailJS (recommended)
        // Uncomment and configure when you set up EmailJS
        /*
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
        
        const response = await emailjs.send(
          'YOUR_SERVICE_ID',  // Replace with your EmailJS service ID
          'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_email: 'Binyominperry@gmail.com'
          }
        );
        */

        // Method 2: Using mailto as fallback (opens email client)
        const subject = encodeURIComponent(`New Contact Form Submission from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone}\n\n` +
            `Message:\n${formData.message}`
        );

        // Create mailto link
        const mailtoLink = `mailto:Binyominperry@gmail.com?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showFormStatus('Thank you! Your message has been prepared. Please send it from your email client.', 'success');

        // Reset form
        contactForm.reset();

    } catch (error) {
        console.error('Error:', error);
        showFormStatus('Sorry, there was an error sending your message. Please try emailing us directly at Binyominperry@gmail.com', 'error');
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// ===================================
// EMAILJS SETUP INSTRUCTIONS
// ===================================
/*
To enable direct email sending without opening the email client:

1. Go to https://www.emailjs.com/ and create a free account
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - {{from_name}}
   - {{from_email}}
   - {{phone}}
   - {{message}}
   - Set the "To Email" to: Binyominperry@gmail.com

4. Get your credentials:
   - Public Key (from Account page)
   - Service ID (from Email Services page)
   - Template ID (from Email Templates page)

5. Add EmailJS script to your HTML (before script.js):
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

6. Uncomment the EmailJS code above and replace:
   - YOUR_PUBLIC_KEY with your public key
   - YOUR_SERVICE_ID with your service ID
   - YOUR_TEMPLATE_ID with your template ID

7. Comment out or remove the mailto fallback method
*/

// ===================================
// PORTFOLIO ITEM INTERACTIONS
// ===================================
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('click', function () {
        // You can add modal functionality here to show full project details
        console.log('Portfolio item clicked');
    });
});

// ===================================
// INITIALIZE ON LOAD
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    // Add fade-in animation to hero on load
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        setTimeout(() => {
            heroText.style.transition = 'opacity 1s ease-in-out';
            heroText.style.opacity = '1';
        }, 100);
    }

    // Trigger initial reveal check
    revealOnScroll();
});
