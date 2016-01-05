var formValidation = {

  submitForm: function() {

    var formFields = this.elements,  // select form fields
        // get fields values
        fieldValues = {
          userName: formFields['name'],
          userEmail: formFields['email'],
          userMessage: formFields['textarea']
        },
        emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,  //valid email symbols
        messageField = document.getElementById('message-field'),
        errorMessage = [
          'Name field is empty',
          'Email field is empty',
          'Text field is empty'
        ],
        filledValues = [];

    //clear message field from previous messages
    while (messageField.firstChild) {
      messageField.removeChild(messageField.firstChild);
    }
    // clear error borders
    for ( var key in fieldValues ) {
      fieldValues[key].classList.remove("is-invalid-data");
    }
    // evaluate values
    for ( var val in fieldValues ) {
      if ( fieldValues[val].value === "" ) {
        var i = Object.keys(fieldValues).indexOf(val); // get the loop counter/index
        errorMessageText = document.createElement('p');
        errorMessageText.innerHTML = errorMessage[i]; //write appropriate array value to paragraph
        messageField.appendChild(errorMessageText);
        fieldValues[val].classList.add("is-invalid-data");
        // console.log(errorMessage[i]);
      } else {
        filledValues.push(fieldValues[val].value);
      }
    }


    if ( filledValues.length == Object.keys(fieldValues).length ) {

      if ( !emailCheck.test(filledValues[1]) ) {
        errorMessageText = document.createElement('p');
        errorMessageText.innerHTML = 'Please enter a valid email';
        messageField.appendChild(errorMessageText);
        // fieldValues[1].classList.add("is-invalid-data");
        // console.log( "Enter a valid email" );
      } else {
        errorMessageText = document.createElement('p');
        errorMessageText.innerHTML = 'Thank You!';
        messageField.appendChild(errorMessageText);
        // console.log( "Thank you!" );
      }
    }

    return false;
  },
  init: function() {
    document.getElementById('contact-form').onsubmit = this.submitForm;
  }

}

formValidation.init();
