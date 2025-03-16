document.addEventListener('DOMContentLoaded', function() {
    let signinForm = document.querySelector('.signin-form');
    signinForm.addEventListener('submit', function(event) {
        event.preventDefault();
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
        let users = [];
        let usersData = localStorage.getItem('currentUser');
        if (usersData) {
            try {
                let parsedData = JSON.parse(usersData);
                users = Array.isArray(parsedData) ? parsedData : [parsedData];
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
                users = [];
            }
        }
        console.log("Users data:", users);
        if (users.length === 0) {
            alert('No registered users found. Please register first.');
            return;
        }
        let foundUser = null;
        for (let i = 0; i < users.length; i++) {
            const u = users[i];
            if (u.email === email && 
                u.password === password && 
                (u.fullName === name || u.name === name)) {
                foundUser = u;
                break;
            }
        }
        if (foundUser) {
        alert('Sign in successful!');
        window.location.href = '../index.html';
        } else {
            let emailExists = false;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    emailExists = true;
                    break;
                }
            }
            if (emailExists) {
                alert('Invalid credentials. Please check your name and password.');
            } else {
                alert('Account not found. Please register first.');
            }
        }
    });
});