const form = document.getElementById('form')

const postRequest = (e) => {
    e.preventDefault();

    const formData = new FormData(form); // Creates a FormData object from the form element to grab each field and their values
    const inputValues = {}; // Creates an object to store the value of each input field

    const clearErrors = () => { // Function to clear any existing error messages from the DOM
        const errorElements = document.querySelectorAll('.error'); // Select all elements with the class 'error'
        errorElements.forEach((err) => {
            err.remove(); // Remove each error element from the DOM
        });
    };

    const showError = (fieldId, errMessage) => {    // Function to display an error message for a specific field
        const errorElement = document.getElementById(fieldId + 'Error'); // Get the field element by its ID
        if(errorElement) {
            errorElement.innerHTML = errMessage; // Set the inner HTML of the error element to the error message
        }
    }

    formData.forEach((value, key) => {
        inputValues[key] = value; // Loop through each field in the FormData object and assign the value to the corresponding key in the inputValues object
    });


    let hasError = false; // Initialize a variable to track if there are any errors

    // NAME VALIDATION
    if(!inputValues.firstName) { // Checks if the first name field is empty
        showError('firstName', 'First name is required'); 
        hasError = true; // Set hasError to true if there is an error
    }
    if(!inputValues.lastName) { // Checks if the last name field is empty
        showError('lastName', 'Last name is required'); 
        hasError = true; 
    }

    // GENDER VALIDATION
    if(inputValues.gender === '') { // Checks if the gender field is empty or not
        showError('gender', 'Gender is required'); // Show an error
        hasError = true; 
    }

    // DOB VALIDATION
    if(inputValues.dob === '') { // Checks if the date of birth field is empty or not
        showError('dob', 'Date of birth is required'); 
        hasError = true; 
    }



    //PHONE NUMBER VALIDATION
    const phoneNum = inputValues.phone; // Gets the phone number value from the inputValues object
    const phonePattern = /^\d{10,15}$/; // Regular expression to validate phone number format (10-15 digits)

    if(!phonePattern.test(phoneNum)) { // Checks if the phone number value matches or not
        showError('phone', 'Phone number must be betrween 10-15 digits'); 
    }



    // EMAIL VALIDATION
    if(inputValues.email === '') { // Checks if the email field is empty or not
        showError('email', 'Email is required'); 
        hasError = true; 
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email format
        if(!emailPattern.test(inputValues.email)) { // Checks if the email format is valid or not
            showError('email', 'Email is invalid'); // 
            hasError = true; 
        }
    }

    // PASSWORD VALIDATION
    const password = inputValues.password; // Gets the password value from the inputValues object
    const confirmPassword = inputValues.confirmPassword; // Gets the confirm password value from the inputValues object 
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Regular expression to validate password strength
    if(!passwordPattern.test(password)) { // Checks if the password format is valid or not
        showError('password', 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'); // Show an error message for invalid password format
        hasError = true; 
    }
    if(password !== confirmPassword) { // Checks if the password and confirm password fields matches
        showError('confirmPassword', 'Passwords do not match'); 
        hasError = true; 
    }
    
    
   if(hasError) { // If there are any errors, do not proceed with the form submission
        return; // Exit the function to prevent form submission
    }
}
document.getElementById('form').addEventListener('submit', postRequest)