(function() {
    emailjs.init('iPh2AS2WXdsRN9ZQ3'); // Replace 'YOUR_USER_ID' with your actual user ID
})();

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const birthDate = document.getElementById('birthDate').value;
    const mobile = document.getElementById('mobile').value.trim();
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value.trim();
    const age = document.getElementById('age').value;
    const course = document.getElementById('course').value;

    let message = '';

    if (!name || !validateName(name)) {
        message += 'Name must contain only alphabets. ';
    }
    if (!email || !validateEmail(email)) {
        message += 'Valid email is required. ';
    }
    if (!birthDate) {
        message += 'Birth date is required. ';
    }
    if (!mobile || !validateMobile(mobile)) {
        message += 'Enter a valid 10-digit mobile number. ';
    }
    if (!gender) {
        message += 'Gender is required. ';
    }
    if (!address) {
        message += 'Address is required. ';
    }
    if (!age || age < 18 || age > 100) {
        message += 'Age must be between 18 and 100. ';
    }
    if (!course) {
        message += 'Course selection is required. ';
    }

    if (message) {
        document.getElementById('message').textContent = message;
        document.getElementById('message').style.color = 'red';
    } else {
        // Generate OTP
        const otp = generateOTP();
        sessionStorage.setItem('otp', otp);

        // Send OTP using EmailJS
        emailjs.send('service_m7ochc7', 'template_wnzubzc', {
            to_email: email,
            otp: otp
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById('registrationForm').style.display = 'none';
            document.getElementById('otpForm').style.display = 'block';
            document.getElementById('message').textContent = 'OTP sent to your email. Please check and enter it below.';
            document.getElementById('message').style.color = 'green';
        }, function(error) {
            console.error('FAILED...', error);
            document.getElementById('message').textContent = 'Failed to send OTP. Please try again later.';
            document.getElementById('message').style.color = 'red';
        });
    }
});

document.getElementById('otpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const enteredOtp = document.getElementById('otp').value.trim();
    const storedOtp = sessionStorage.getItem('otp');

    if (enteredOtp === storedOtp) {
        document.getElementById('message').textContent = 'Registration successful!';
        document.getElementById('message').style.color = 'green';
        document.getElementById('otpForm').style.display = 'none';
        sessionStorage.removeItem('otp');
        document.getElementById('registrationForm').reset();
    } else {
        document.getElementById('message').textContent = 'Invalid OTP. Please try again.';
        document.getElementById('message').style.color = 'red';
    }
});

function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}

function validateName(name) {
    const re = /^[A-Za-z]+$/;
    return re.test(name);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateMobile(mobile) {
    const re = /^[789]\d{9}$/;
    return re.test(mobile);
}
