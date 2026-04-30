/**
 * THEME MANAGEMENT
 */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/**
 * CONTACT FORM HANDLING
 */
const contactForm = document.getElementById('contact-form');
// We define responseMsg here so the code knows where to print the text
const responseMsg = document.getElementById('response-msg'); 

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. UI Feedback: Disable button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        
        // 2. SHOW THE WAKE-UP MESSAGE IMMEDIATELY
        if (responseMsg) {
            responseMsg.innerText = "Waking up the server... this may take a minute on the free tier.";
            responseMsg.style.color = "orange";
        }
        
        submitBtn.textContent = "Sending...";

        // 3. Data Collection
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            // Note: Ensure this matches the route in your server.mjs (either '/send' or '/send-contact')
            const response = await fetch('/send-contact', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                if (responseMsg) {
                    responseMsg.innerText = "🚀 Message sent successfully!";
                    responseMsg.style.color = "green";
                }
                contactForm.reset();
            } else {
                throw new Error("Server error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            if (responseMsg) {
                responseMsg.innerText = "❌ Oops! Connection failed. Try again?";
                responseMsg.style.color = "red";
            }
        } finally {
            // 4. Reset Button State
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}