const btn = document.getElementById("postButton");
const token = sessionStorage.getItem("Authorization");

const idContato = new URL(window.location.href).searchParams.get('id');

var contact =
{
    nome: "", id: "", idUsuario: "", apelido: "", email: "", notas: "", telefones: [{ tipo: "casa", numero: "" },
    { tipo: "casa", numero: "" }], endereco: { logradouro: "", cidade: "", estado: "", cep: "", pais: "" },
    foto: ""
}

const getContact = async () => {
    const url = 'http://localhost:5000/v1/contact/';
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)
    const response = await fetch(url + idContato, { headers, method: "GET" })
    return await response.json()
}

const loadForm = async (event) => {
    event.preventDefault();
    if (idContato) {
        contact = await getContact();
        contact = contact.data;
    }
    const form = document.createElement("FORM");
    form.innerHTML = `
    <fieldset>
    <li>
    <label for = "usuario">Nome:</label>
    <input value="${contact.nome}" type="text" name = "nome" id = "nome"></li>
    <li><label for = "apelido">Apelido:</label>
    <input value="${contact.apelido}" type="text" name = "apelido" id = "apelido"></li>
    <li><label for = "telefone">Contatos:</label><br>
    <label for = "telefone">Telefone(1):</label>
    <input value="${contact.telefones[0].numero}" type="text" id = "numeroTel1">
    <label for="tipotel1">Tipo de telefone:</label>
        <select name="tipoTel1" id="tipoTel1">
            <option ${contact.telefones[0].tipo == 'casa' ? 'selected' : ''} value="casa">Casa</option>
            <option ${contact.telefones[0].tipo == 'trabalho' ? 'selected' : ''} value="trabalho">Trabalho</option>
            <option ${contact.telefones[0].tipo == 'celular' ? 'selected' : ''} value="celular">Celular</option>
        </select></li>
    <label for = "telefone">Telefone(2):</label>
    <input value="${contact.telefones[1].numero}" type="text" id = "numeroTel2">
        <label for="tipotel2">Tipo de telefone:</label>
            <select id="tipoTel2">
                <option ${contact.telefones[1].tipo == 'casa' ? 'selected' : ''} value="casa">Casa</option>
                <option ${contact.telefones[1].tipo == 'trabalho' ? 'selected' : ''} value="trabalho">Trabalho</option>
                <option ${contact.telefones[1].tipo == 'celular' ? 'selected' : ''} value="celular">Celular</option>
            </select></li>
    <li> <label for = "email">Email:</label>
    <input value="${contact.email}"type="text" name = "email" id = "email"></li>
    <li><label for = "endereço">Endereço:</label><br>
    <label for = "logradouro">Lobradouro:</label>
    <input value="${contact.endereco.logradouro}"type="text" name = "logradouro" id = "logradouro">
    <label for = "cidade">Cidade:</label>
    <input value="${contact.endereco.cidade}"type="text" name = "cidade" id = "cidade">
    <label for = "estado">Estado:</label>
    <input value="${contact.endereco.estado}"type="text" name = "estado" id = "estado">
    <label for = "cep">CEP:</label>
    <input value="${contact.endereco.cep}"type="text" name = "cep" id = "cep">
    <label for = "pais">País:</label>
    <input value="${contact.endereco.pais}"type="text" name = "pais" id = "pais"></li>
    <li> <label for = "text">Notas:</label>
    <input value="${contact.notas}"type="text" name = "notas" id = "notas"></li>
    <li> <label for = "foto">Foto:</label>
    <input type="file" name = "foto" id = "foto"></li>
    <img id="imgPreview" src="${contact.foto}"></img>
    </fieldset>
    <button id = "postButton" type="submit">Submeter</button>
    `;
    root.append(form);

    document.getElementById('foto').addEventListener('change', function (e) {
        if (e.target.files) {
            let imageFile = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("img");
                img.onload = function (_) {
                    var canvas = document.createElement("canvas");
                    canvas.setAttribute("width", "100");
                    canvas.setAttribute("height", "100");
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, 100, 100);
                    var dataurl = canvas.toDataURL(imageFile.type);
                    document.getElementById("imgPreview").src = dataurl;
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(imageFile);
        }
    });



}

window.addEventListener('load', loadForm);

const loadFunction = () => {

    async function submeter(event) {

        event.preventDefault();

        let telefones = [];
        const url = "http://localhost:5000/v1/contact";
        var nome = document.getElementById("nome").value;
        var apelido = document.getElementById("apelido").value;
        var email = document.getElementById("email").value;
        var tipoTel1 = document.getElementById("tipoTel1").value;
        var tipoTel2 = document.getElementById("tipoTel2").value;
        var numeroTel1 = document.getElementById("numeroTel1").value;
        var numeroTel2 = document.getElementById("numeroTel2").value;
        var logradouro = document.getElementById("logradouro").value;
        var estado = document.getElementById("estado").value;
        var cidade = document.getElementById("cidade").value;
        var cep = document.getElementById("cep").value;
        var pais = document.getElementById("pais").value;
        var notas = document.getElementById("notas").value;
        var foto = document.getElementById("imgPreview").src;

        if (nome == "") {
            window.alert("Insira o nome do Contato!")
        }
        else {


            telefone1 = {
                "tipo": tipoTel1,
                "numero": numeroTel1,
            }
            telefones.push(telefone1);

            telefone2 = {
                "tipo": tipoTel2,
                "numero": numeroTel2,
            }
            telefones.push(telefone2);

            var endereco = {
                "logradouro": logradouro,
                "cidade": cidade,
                "estado": estado,
                "cep": cep,
                "pais": pais
            };

            const HEADERS = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            const dataRequest = new Request(url, {
                headers: new Headers(Object.assign(HEADERS,
                    { "Authorization": token })),
                method: idContato ? "PATCH" : "POST",
                body: JSON.stringify({
                    idContato: idContato,
                    nome: nome,
                    apelido: apelido,
                    email: email,
                    notas: notas,
                    telefones: telefones,
                    endereco: endereco,
                    foto: foto
                })
            });
            fetch(dataRequest).then(function (response) {
                if (response.ok) {
                    alert(`Contato ${idContato ? 'Atualizado' : 'Criado'} com Sucesso!`)
                }
                window.location.href = './home.html';
            })
        }
    }
    const events = () => {
        document.addEventListener("submit", submeter)
    }

    events();
}
window.addEventListener("load", loadFunction)

