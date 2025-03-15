document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.querySelector('.registration-form');
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Get form values
        let fullName = document.getElementById('fullname').value.trim();
        let email = document.getElementById('email').value.trim();
        let phone = document.getElementById('phone').value.trim();
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirm-password').value;
        let genderOptions = document.getElementsByName('gender');
        let selectedGender = '';
        for (let option of genderOptions) {
            if (option.checked) {
                selectedGender = option.value;
                break;
            }
        }
        let dob = document.getElementById('dob').value;
        let termsAccepted = document.getElementById('terms').checked;
        let newsletterSubscribed = document.getElementById('newsletter').checked;
        if (!email || !password || !confirmPassword || !fullName || !phone || !selectedGender || !dob) {
            alert('Please fill in all required fields');
            return;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!termsAccepted) {
            alert('You must accept the Terms and Conditions to continue');
            return;
        }
        let user = {
            fullName,
            email,
            phone,
            password,
            gender: selectedGender,
            dob,
            newsletterSubscribed,
            registrationDate: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            fullName: user.fullName,
            password:user.password,
        }));
        alert('Registration successful! You are now logged in.');
        window.location.href = 'index.html'; // Redirect to home page
    });

    let passwordInput = document.getElementById('password');
    let confirmPasswordInput = document.getElementById('confirm-password');

    passwordInput.addEventListener('input', function () {
        validatePasswordStrength(this.value);
    });

   
    function validatePasswordStrength(password) {
        let requirementElement = document.querySelector('.password-requirements');
        let lengthValid = password.length >= 8;
        let hasLetter = /[A-Za-z]/.test(password);
        let hasNumber = /\d/.test(password);
        let hasSpecial = /[@$!%*#?&]/.test(password);
        if (lengthValid && hasLetter && hasNumber && hasSpecial) {
            requirementElement.textContent = 'Password strength: Strong';
            requirementElement.style.color = '#28a745';
        } else if (password.length > 0) {
            requirementElement.textContent = 'Password must be at least 8 characters with letters, numbers, and special characters';
            requirementElement.style.color = '#dc3545';
        } else {
            requirementElement.textContent = 'Password must be at least 8 characters with letters, numbers, and special characters';
            requirementElement.style.color = '#777';
        }
    }
});