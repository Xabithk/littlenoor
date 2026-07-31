// /* ===== LITTLE NOOR - Dress Measurements Form Validation ===== */

document.addEventListener('DOMContentLoaded', function() {

    const measurementForm = document.getElementById('measurementForm');
    const measurementSuccess = document.getElementById('measurementSuccess');

    if (!measurementForm) return;

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

    // Validate a single field
    function validateField(field) {
        var id = field.id;
        var value = field.value.trim();
        var isValid = true;

        switch (id) {
            case 'measName':
                if (value.length < 2) {
                    showError(field);
                    isValid = false;
                } else {
                    clearError(field);
                }
                break;

            case 'measEmail':
                if (!isValidEmail(value)) {
                    showError(field);
                    isValid = false;
                } else {
                    clearError(field);
                }
                break;

            case 'measPhone':
                if (value.length < 7 || value.length > 15) {
                    showError(field);
                    isValid = false;
                } else {
                    clearError(field);
                }
                break;

            case 'height':
            case 'bust':
            case 'waist':
            case 'hip':
            case 'shoulderWidth':
            case 'sleeveLength':
            case 'neckSize':
            case 'armhole':
            case 'dressLength':
            case 'inseam':
            case 'chest':
                if (value === '' || parseFloat(value) <= 0) {
                    showError(field);
                    isValid = false;
                } else {
                    clearError(field);
                }
                break;

            default:
                break;
        }

        return isValid;
    }

    // Real-time validation on input
    var formInputs = measurementForm.querySelectorAll('input, textarea');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            validateField(this);
        });
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Form submit handler
    measurementForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var isValid = true;
        var formData = {};

        // Validate all required fields
        var requiredInputs = this.querySelectorAll('input[required]');
        requiredInputs.forEach(function(input) {
            if (!validateField(input)) {
                isValid = false;
            }
            formData[input.name] = input.value.trim();
        });

        // Get notes field if present
        var notesField = document.getElementById('notes');
        if (notesField) {
            formData.notes = notesField.value.trim();
        }

        if (!isValid) {
            // Scroll to first error
            var firstError = this.querySelector('.form-group.invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Save measurements to localStorage
        var measurements = JSON.parse(localStorage.getItem('measurements') || '[]');
        var measurementData = {
            id: Date.now(),
            submittedAt: new Date().toLocaleString(),
            timestamp: new Date().toISOString(),
            personalInfo: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            },
            bodyMeasurements: {
                height: formData.height,
                bust: formData.bust,
                waist: formData.waist,
                hip: formData.hip,
                shoulderWidth: formData.shoulderWidth,
                sleeveLength: formData.sleeveLength,
                neckSize: formData.neckSize,
                armhole: formData.armhole,
                dressLength: formData.dressLength,
                inseam: formData.inseam,
                chest: formData.chest
            },
            notes: formData.notes || ''
        };

        measurements.push(measurementData);
        localStorage.setItem('measurements', JSON.stringify(measurements));

        // Show success message
        if (measurementSuccess) {
            measurementSuccess.classList.add('show');
            measurementForm.style.display = 'none';
        }

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Reset button handler
    var resetBtn = measurementForm.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            // Clear all validation errors
            var errorGroups = measurementForm.querySelectorAll('.form-group.invalid');
            errorGroups.forEach(function(group) {
                group.classList.remove('invalid');
            });

            // Hide success message if visible
            if (measurementSuccess) {
                measurementSuccess.classList.remove('show');
            }

            measurementForm.style.display = 'block';
        });
    }

});

