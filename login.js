document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email-address').value;
        const password = document.getElementById('password').value;

        // Here you would typically send a request to your server to authenticate the user
        // For this example, we'll just check if the email and password are not empty
        if (email && password) {
            // Simulate successful login
            const user = { email, name: email.split('@')[0] }; // Use part of email as name
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('Please enter both email and password');
        }
    });
});