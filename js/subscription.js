const processForm = form => {
    console.log(form)
    const data = new FormData(form)
    console.log(data)
    data.append('form-name', 'newsletter');

    fetch('/', {
      method: 'POST',
      body: data
    })
    .then(response => {
      form.innerHTML = `<div class="form--success">Almost there! Check your inbox for a confirmation e-mail.</div>`;
      console.log(response)
    })
    .catch(error => {
      form.innerHTML = `<div class="form--error">Error: ${error}</div>`;
      console.log(error)
    })
}

const emailForm = document.querySelector('.email-form')
if (emailForm) {
  emailForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log(e)
    console.log(emailForm)
    processForm(emailForm);
  })
}