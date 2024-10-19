document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email-address').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Here you would typically send a request to your server to create a new user
        // For this example, we'll just store the user information in localStorage
        const user = { name, email };
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'index.html';
    });
});