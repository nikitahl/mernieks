var formValidation = {
  contactForm: document.getElementById("contact-form"),
  messageField: document.getElementById('message-field'),
  emailCheck: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  errorMessage: {
    name: 'Name field is empty',
    email: 'Email field is empty',
    message: 'Text field is empty'
  },
  isValidForm: false,
  fieldsValues: {},
  refreshValues: function() {
    for (var prop in this.fieldsValues){
        if (this.fieldsValues.hasOwnProperty(prop)){
            delete this.fieldsValues[prop];
        }
    }
  },
  clearForm: function (input) {
    var messages = this.messageField;
    //clear message field from previous messages
    while (messages.firstChild) {
      messages.removeChild(messages.firstChild);
    }
    // clear error borders
    for ( var i = 0; i < input.length; i++ ) {
      input[i].classList.remove("is-invalid-data");
    }
  },
  validateEmail: function(el, val) {
    var errorMessageText = document.createElement('p');
    if ( !this.emailCheck.test(val) ) {
      errorMessageText.textContent = "Please enter valid email";
      this.messageField.appendChild(errorMessageText);
      el.classList.add("is-invalid-data");
    } else {
      this.isValidForm = true;
    }
  },
  displayError: function(el) {
    var errorMessageText = document.createElement('p');
    for (var val in this.errorMessage) {
      if ( el.getAttribute("name") === val ) {
        errorMessageText.textContent = this.errorMessage[val];
      }
    }
    this.messageField.appendChild(errorMessageText);
    el.classList.add("is-invalid-data");
  },
  returnValues: function() {
    if (this.isValidForm) {
      var successMessageText = document.createElement('p');
      successMessageText.textContent = "Thank You!";
      this.messageField.appendChild(successMessageText);
      return this.fieldsValues;
    }
  },
  evaluateFields: function(el){
    var emailValue,
        emailField;
    for (var i = 0; i < el.length; i++) {
      var fieldName = el[i].getAttribute("name");
      if ( !el[i].value.trim() ) {
        this.displayError(el[i]);
      } else {
        this.fieldsValues[fieldName] = el[i].value.trim();
        if ( fieldName === "email") {
          emailValue = el[i].value.trim();
          emailField = el[i];
        }
      }
    }
    if (Object.keys(this.fieldsValues).length === 3) {
      this.validateEmail(emailField, emailValue);
    }
  },
  getFormFields: function(e){
    e.preventDefault();
    var formFields = this.contactForm.elements,
        formInputs = [];
    this.clearForm(formFields);
    this.refreshValues();
    for (var i = 0; i < formFields.length; i++) {
      if ( formFields[i].hasAttribute("name") && formFields[i].getAttribute("name") != "submit" ) {
        formInputs.push(formFields[i]);
      }
    }
    this.evaluateFields(formInputs);
    this.returnValues();
  },
  submitForm: function() {
    var _this = this;
    this.contactForm.addEventListener("submit", _this.getFormFields.bind(_this));
  },
  init: function() {
    this.submitForm();
  }
}

formValidation.init();
