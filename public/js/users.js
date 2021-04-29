fetch('/users/all').then((res)=> {
    res.json().then((data)=>{
        if(data.users.length === 0){
            document.querySelector("#users").innerHTML='No user found.';
        }
        const html= data.users.map(user => {
            return `<div style="border: 5px outset #00fff3; background-color: #ade6e0; margin: 20px">
                    <p><strong>ID: </strong>${user._id}</p>
                    <p><strong>Name: </strong>${user.name}</p>
                    <p><strong>Email: </strong>${user.email}</p>
                    <p><strong>Created At: </strong>${user.createdAt}</p>
                    <p><strong>Updated At: </strong>${user.updatedAt}</p></div>`
        }).join("");
        document.querySelector("#users").insertAdjacentHTML('afterbegin',html);
    })
})


