/**
 * THEME MANAGEMENT
 * Handles dark/light mode persistence and UI updates
 */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Optional: Add a little haptic feedback or sound here if desired
});

/**
 * CONTACT FORM HANDLING
 * Uses async/await with improved UX (loading states)
 */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. UI Feedback: Disable button to prevent double-submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // 2. Data Collection (Clean & Simple)
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/send', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("🚀 Message sent successfully!");
                contactForm.reset();
            } else {
                throw new Error("Server responded with an error.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("❌ Oops! Could not connect to the server. Please try again later.");
        } finally {
            // 3. Reset Button State
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}