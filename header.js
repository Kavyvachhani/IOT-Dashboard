document.addEventListener('DOMContentLoaded', () => {
    const userNameSpan = document.getElementById('user-name');
    const logoutButton = document.getElementById('logout-button');

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        userNameSpan.textContent = user.name || user.email;
    } else {
        // Redirect to login page if not logged in
        window.location.href = 'signin.html';
    }

    // Logout functionality
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'signin.html';
    });
});