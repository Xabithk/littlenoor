/* ===== LITTLE NOOR - Login Form Validation ===== */

document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm');
    const loginSuccess = document.getElementById('loginSuccess');
    const loginError = document.getElementById('loginError');

    if (!loginForm) return;

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
    var formInputs = loginForm.querySelectorAll('input');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            var id = this.id;
            var value = this.value.trim();

            switch (id) {
                case 'loginEmail':
                    if (!isValidEmail(value)) {
                        showError(this);
                    } else {
                        clearError(this);
                    }
                    break;

                case 'loginPassword':
                    if (value === '') {
                        showError(this);
                    } else {
                        clearError(this);
                    }
                    break;
            }
        });
    });

    // Form submit handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var email = document.getElementById('loginEmail').value.trim();
        var password = document.getElementById('loginPassword').value.trim();
        var isValid = true;

        // Validate email
        if (!isValidEmail(email)) {
            showError(document.getElementById('loginEmail'));
            isValid = false;
        } else {
            clearError(document.getElementById('loginEmail'));
        }

        // Validate password
        if (password === '') {
            showError(document.getElementById('loginPassword'));
            isValid = false;
        } else {
            clearError(document.getElementById('loginPassword'));
        }

        if (!isValid) return;

        // Check credentials against registered users in localStorage
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var foundUser = null;

        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                foundUser = users[i];
                break;
            }
        }

        if (foundUser) {
            // Login successful
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

            // Hide error if visible
            if (loginError) {
                loginError.classList.remove('show');
            }

            // Show success message
            if (loginSuccess) {
                loginSuccess.classList.add('show');
            }

            // Redirect to dashboard after 2 seconds
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            // Login failed
            if (loginError) {
                loginError.classList.add('show');

                // Hide error after 4 seconds
                setTimeout(function() {
                    loginError.classList.remove('show');
                }, 4000);
            }
        }
    });

});

