const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 1. Check for saved user preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

// 2. Add event listener for the click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // 3. Save the preference to LocalStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});