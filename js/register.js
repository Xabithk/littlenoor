/* ===== LITTLE NOOR - Registration Form Validation ===== */

document.addEventListener('DOMContentLoaded', function() {

    const registerForm = document.getElementById('registerForm');
    const registerSuccess = document.getElementById('registerSuccess');

    if (!registerForm) return;

    // Helper function to validate email
    function isValidEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Helper to show field error
    function showError(field) {
        var group = field.closest('.form-group');
        if (group) {
            group.classList.add('invalid');
        }
    }

    // Helper to clear field error
    function clearError(field) {
        var group = field.closest('.form-group');
        if (group) {
            group.classList.remove('invalid');
        }
    }

    // Real-time validation on input
    var formInputs = registerForm.querySelectorAll('input');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            validateField(this);
        });
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        var id = field.id;
        var value = field.value.trim();

        switch (id) {
            case 'fullName':
                if (value.length < 2) {
                    showError(field);
                    return false;
                } else {
                    clearError(field);
                    return true;
                }

            case 'regEmail':
                if (!isValidEmail(value)) {
                    showError(field);
                    return false;
                } else {
                    clearError(field);
                    return true;
                }

            case 'regPhone':
                if (value.length < 7 || value.length > 15) {
                    showError(field);
                    return false;
                } else {
                    clearError(field);
                    return true;
                }

            case 'regPassword':
                if (value.length < 8) {
                    showError(field);
                    return false;
                } else {
                    clearError(field);
                    return true;
                }

            case 'regConfirmPassword':
                var password = document.getElementById('regPassword').value;
                if (value !== password || value === '') {
                    showError(field);
                    return false;
                } else {
                    clearError(field);
                    return true;
                }

            default:
                return true;
        }
    }

    // Form submit handler
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var isValid = true;
        var formData = {};

        // Validate all fields
        var inputs = this.querySelectorAll('input[required]');
        inputs.forEach(function(input) {
            if (!validateField(input)) {
                isValid = false;
            }
            // Collect form data
            formData[input.name] = input.value.trim();
        });

        if (!isValid) {
            // Scroll to first error
            var firstError = this.querySelector('.form-group.invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Save user data to localStorage
        var users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email already exists
        var emailExists = users.some(function(u) {
            return u.email === formData.email;
        });

        if (emailExists) {
            alert('An account with this email already exists. Please login.');
            window.location.href = 'login.html';
            return;
        }

        // Add new user
        var userData = {
            id: Date.now(),
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            registrationTime: new Date().toISOString(),
            timestamp: new Date().toLocaleString()
        };

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        // Prepare email notification data (for EmailJS integration)
        var emailData = {
            user_name: formData.fullName,
            user_email: formData.email,
            user_phone: formData.phone,
            registration_time: userData.timestamp,
            type: 'registration',
            to_email: 'sabithsha364@gmail.com'
        };

        // Store email notification data for processing
        var pendingEmails = JSON.parse(localStorage.getItem('pendingEmails') || '[]');
        pendingEmails.push(emailData);
        localStorage.setItem('pendingEmails', JSON.stringify(pendingEmails));

        // Show success message
        if (registerSuccess) {
            registerSuccess.classList.add('show');
            registerForm.style.display = 'none';
        }

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Redirect to login after 3 seconds
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 3000);
    });

});

