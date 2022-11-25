const token = sessionStorage.getItem("Authorization");

const loadForm = (event) => {
    event.preventDefault();
    const form = document.createElement("FORM");
    form.innerHTML = `
    <div>
    <label for="email-input">E-mail</label>
    <input id="email-input" type="text" placeholder="E-mail">
</div>
<div>
    <label for="password-input">Senha</label>
    <input id="password-input" type="password" placeholder="Senha">
</div>
<div>
    <label for="name-input">Nome</label>
    <input id="name-input" type="text" placeholder="Nome">
</div>   
<div>
    <label for="photo-input">Foto</label>
    <input id="photo-input" type="file" placeholder="Foto">
</div> 
<div>
    <button type="reset" value="Reset">Limpar</button>
    <button id="patch-submit" type="submit" value="Submit">Enviar</button>
</div>
    `;
    root.append(form);
}


window.addEventListener('load', loadForm);

const loadFunction = () => {

    const attUser = (event) => {
        event.preventDefault();

        const attEmail = document.getElementById("email-input").value;
        const attPassword = document.getElementById("password-input").value;
        const attName = document.getElementById("name-input").value;
        const attPhoto = document.getElementById("photo-input").value;

        const HEADERS = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const endPoint = "http://localhost:5000/v1/user";

        const request = new Request(endPoint, {
            headers: new Headers(Object.assign(HEADERS,
                { "Authorization": token })),
            method: "PATCH",
            body: JSON.stringify({
                email: attEmail,
                senha: attPassword,
                nome: attName,
                foto: attPhoto
            })
        });

        fetch(request).then(function (response) {
            if (response.ok) {
                alert("Usuário Atualizado!")
            }
            window.location.href = './home.html';
        })

        clearInputs();

    }

    function clearInputs() {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++)
            inputs[i].value = '';
    }

    const events = () => {
        document.addEventListener("submit", attUser)
    }

    events();

}
window.addEventListener("load", loadFunction)
