document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Client-side validation
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let formStatus = document.getElementById('formStatus');

    if (name === '' || email === '' || message === '') {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.style.color = 'red';
        return;
    }

    if (!validateEmail(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.style.color = 'red';
        return;
    }

    // Send form data using AJAX
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'send_feedback.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            formStatus.textContent = xhr.responseText;
            formStatus.style.color = 'green';
        } else {
            formStatus.textContent = 'Sorry, something went wrong. Please try again.';
            formStatus.style.color = 'red';
        }
    };
    xhr.onerror = function() {
        formStatus.textContent = 'Request failed. Please check your internet connection and try again.';
        formStatus.style.color = 'red';
    };
    xhr.send('name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&message=' + encodeURIComponent(message));
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
