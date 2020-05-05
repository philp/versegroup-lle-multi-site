function validateContactForm(sel) {
  let contactForm = document.querySelectorAll(sel);
  if(contactForm.length > 0) {
    for(let i = 0; i < contactForm.length; i++) {
      contactForm[i].addEventListener('submit', function(evt) {
        let fields = this.querySelectorAll('input,select');
        let invalidFields = {};
        for(let j = 0; j < fields.length; j++) {
          let field = fields[j];
          if(field.previousElementSibling) {
            let lbl = field.previousElementSibling.innerText.replace('*','');
            
            if(field.getAttribute('required') && field.value == '') {
              invalidFields[field.name]= {
                label:lbl,
                reason:'Please enter ' + lbl
              };
            }
            
            if(field.name.indexOf('email') > -1 && !validEmail(field.value)) {
              invalidFields[field.name] = {
                label:lbl,
                reason:lbl + ' needs to be a valid email address'
              };
            }

            if(field.name.indexOf('phone') > -1 && !validPhone(field.value)) {
              invalidFields[field.name] = {
                label:lbl,
                reason:lbl + ' needs to be a valid phone number'
              };
            }

            if(field.name.indexOf('postcode') > -1 && !validPostcode(field.value)) {
              invalidFields[field.name] = {
                label:lbl,
                reason:lbl + ' needs to be a valid postcode'
              };
            }
          }
        }

        if(Object.keys(invalidFields).length) {
          var errorString = this.dataset.errorText;
          for(let f in invalidFields) {
            errorString += '\n ' + invalidFields[f].reason;
          }
          alert(errorString);
          evt.preventDefault();
        }

      })
    }
  }
};

function validPostcode(val) {
  //Republic of ireland val.toUpperCase().match(/[A-Za-z]\d{2}\s[A-Za-z\d]{4}/)
  return val.toUpperCase().match(/^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/);
}
function validEmail(val) {
  return val.toUpperCase().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
}
function validPhone(val) {
  return val.toUpperCase().match(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/);
}