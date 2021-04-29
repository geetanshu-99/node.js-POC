const regForm =document.getElementById('reg-form');

regForm.addEventListener('submit',registerUser);

async function registerUser(event) {
    event.preventDefault();
    const name= document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const result = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    }).then((res) => res.json())

        if (result.status === 'ok') {
             alert('Sign up Complete!');
            window.location.href='./login.html';
        } else {
            alert(result.error);
    }
}
