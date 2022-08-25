// Contacto ----------------------------------------------------------------------------
let contacto = document.querySelector('#contacto');
let nombreContacto = document.getElementById('nombreContacto');
let email = document.getElementById('email')
let mensaje = document.getElementById('mensaje')

contacto.addEventListener('submit', (e) =>{
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
    title: 'MENSAJE',
    body: `NOMBRE: ${nombreContacto.value} EMAIL: ${email.value} MENSAJE: ${mensaje.value}`,
    }),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((data) => Toastify({
        text: "Thanks for contacting us!💚",
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: { background: '#e3329c'}
    }).showToast())

    .catch((e) => Toastify({
        text: "Error ☹️ Try again, please",
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: { background: 'black'}
    }).showToast());

    contacto.reset()
})

