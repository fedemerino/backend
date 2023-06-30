const form = document.querySelector('#cookieForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(form)
    const obj = {}

    data.forEach((value, key) => obj[key] = value)

    fetch('/session/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.accessToken)
            if (res.status === 'success') {
                window.location.href = 'http://localhost:8080/products'
            }
        })
})
