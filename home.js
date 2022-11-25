const token = sessionStorage.getItem("Authorization");
const idUsuario = sessionStorage.getItem("idUsuario");
const foto = sessionStorage.getItem('userImage');

const loadForm = (event) => {
    event.preventDefault();
    const form = document.createElement("FORM");
    form.setAttribute("id", "home-container")
    form.innerHTML = `
    <div>
    <img src="${foto}" />
    </div>
    <div id="home-button-container">
    <button id="attUsuario"><a href="./att.user.html">Atualizar Usuário </a></button>
    <button id="criarContato"><a href="./postContact.html">Criar Contato</a></button>
    <button id="contatos"><a href="./listContacts.html">Lista de Contatos</a></button>
    <button id="sair" ><a href="./login.html">Sair</a></button>    
    </div>
    <div>
    <button id="delUsuario">Excluir Usuário</button>
    </div>
    `;
    root.append(form);

}

window.addEventListener('load', loadForm);

const loadFunction = () => {

    const delUsuario = document.getElementById("delUsuario");

    const deleteUser = (event) => {
        event.preventDefault();
        if (confirm('Tem certeza de que deseja excluir o usuário?')) {
            const HEADERS = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            const endPoint = "http://localhost:5000/v1/user";

            const request = new Request(endPoint, {
                headers: new Headers(Object.assign(HEADERS,
                    { "Authorization": token })),
                method: "DELETE",
                body: JSON.stringify({ idUsuario: idUsuario })
            });

            fetch(request).then(function (response) {
                if (response.ok) {
                    alert("Usuário excluído com sucesso!")
                    window.location.href = 'login.html';
                }
            })
        } else {

        }

    }

    delUsuario.addEventListener('click', deleteUser);

}
window.addEventListener("load", loadFunction)

