const updateForm = document.getElementById('update-form');
updateForm.addEventListener('submit', updateUser);

async function updateUser(event) {
	event.preventDefault();
	const password = document.getElementById('password').value

	const result = await fetch('/users/update-password', {
			method: 'PATCH',
			headers: {
					'Content-Type': 'application/json'
				},
			body: JSON.stringify({
					newpassword: password,
					token: localStorage.getItem('token')
				})
			}).then((res) => res.json())

			if (result.status === 'ok') {
                alert('Password updated...')
                window.location.href='./login.html'
			} else {
				alert(result.error)
			}
}