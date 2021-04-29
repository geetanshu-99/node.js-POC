document.getElementById('update').style.visibility= "hidden";
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit',loginUser);
async function loginUser(event) {
    event.preventDefault();
    const email= document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const result = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res) => res.json())
    if (result.status === 'ok') {
        localStorage.setItem('token', result.token);
        document.getElementById('Welcome').innerHTML="Welcome To NodeJS App";
        document.getElementById('name').innerHTML='Name: '+result.user.name;
        document.getElementById('email-display').innerHTML='Email: '+result.user.email;
        document.getElementById('createdAt').innerHTML= 'Created At:'+result.user.createdAt;
        document.getElementById('updatedAt').innerHTML = 'Updated At: '+result.user.updatedAt;
        document.getElementById('update').innerHTML = 'Update password';
        document.getElementById('update').style.visibility= "visible";
        alert('Login Success...');
    } else {
        document.getElementById('Welcome').innerHTML="";
        document.getElementById('name').innerHTML="";
        document.getElementById('email-display').innerHTML= "";
        document.getElementById('createdAt').innerHTML= "";
        document.getElementById('updatedAt').innerHTML = "";
        document.getElementById('update').style.visibility= "hidden";
        alert(result.error)
    }
}