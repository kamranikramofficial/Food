document.addEventListener('DOMContentLoaded', function() {
    let signinForm = document.querySelector('.signin-form');
    signinForm.addEventListener('submit', function(event) {
        event.preventDefault();
         // Get form values
        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value;
                if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email address');
            return;
        }
          let users = JSON.parse(localStorage.getItem('currentUser')) || [];
          let user = users.find(users => 
            user.email === email && 
            user.password === password &&
            (user.fullName === name || user.name === name)
        );
        
        if  (Array.isArray(users)){
            let userData = {
                email: user.email,
                name: user.fullName || user.name,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            alert('Sign in successful!');
            window.location.href = '../main page/index.html';
        } else {
            let emailExists = users.some(user => user.email === email);
            if (emailExists) {
                alert('Invalid credentials. Please check your name and password.');
            } else {
                alert('Account not found. Please register first.');
            }
        }
    });
        function checkLoggedInUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            // Optional: Auto-fill the form with the stored user data
            document.getElementById('email').value = currentUser.email || '';
            document.getElementById('name').value = currentUser.name || '';
        }
    }
        checkLoggedInUser();
});