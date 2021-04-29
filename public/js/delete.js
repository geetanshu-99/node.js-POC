const deleteForm =document.getElementById('delete-user');

deleteForm.addEventListener('submit',deleteUser);

async function deleteUser(event) {
    event.preventDefault();
    const id = document.getElementById('identity').value
    const result = await fetch('/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    }).then((res) => res.json())

        if (result.status === 'ok') {
             alert('User deleted...');
            window.location.href='./login.html';
        } else {
            alert(result.error);
    }
}
