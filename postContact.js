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

    root.innerHTML=`
    <header>
    <h1><a href="home.html"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
    </svg></a>
    Adicionar contato</h1>
    </header>`;

    event.preventDefault();
    if (idContato) {
        contact = await getContact();
        contact = contact.data;
    }
    const form = document.createElement("FORM");
    form.innerHTML = `
    <table>
    <tbody>
        <tr>
            <td>
                <label for = "usuario">Nome:</label>
            </td>
            <td>
                <input value="${contact.nome}" type="text" name = "nome" id = "nome" placeholder="Digite o nome...">
            </td>
        </tr>
        <tr>
            <td>
                <label for = "apelido">Apelido:</label>
            </td>
            <td>
                    <input value="${contact.apelido}" type="text" name = "apelido" id = "apelido" placeholder="Digite o apelido...">
            </td>
        </tr>
        <tr >
                <td class="table-subtitle" colspan="2">
                    <label for = "telefone">Contatos</label>
                </td>
        </tr>
        <tr>
            <td>
                <label for = "telefone">Telefone(1):</label>
                <select name="tipoTel1" id="tipoTel1">
                    <option ${contact.telefones[0].tipo == 'casa' ? 'selected' : ''} value="casa">Casa</option>
                    <option ${contact.telefones[0].tipo == 'trabalho' ? 'selected' : ''} value="trabalho">Trabalho</option>
                    <option ${contact.telefones[0].tipo == 'celular' ? 'selected' : ''} value="celular">Celular</option>
                </select>
            </td>
            <td>
                <input value="${contact.telefones[0].numero}" type="text" id = "numeroTel1" placeholder="(xx) xxxxx-xxxx">
            </td>
        </tr>
        <tr>
            <td>
                <label for = "telefone">Telefone(2):</label>
                <select id="tipoTel2">
                    <option ${contact.telefones[1].tipo == 'casa' ? 'selected' : ''} value="casa">Casa</option>
                    <option ${contact.telefones[1].tipo == 'trabalho' ? 'selected' : ''} value="trabalho">Trabalho</option>
                    <option ${contact.telefones[1].tipo == 'celular' ? 'selected' : ''} value="celular">Celular</option>
                </select>
            </td>
            <td>
                <input value="${contact.telefones[1].numero}" type="text" id = "numeroTel2" placeholder="(xx) xxxxx-xxxx">
            </td>
        </tr>
        <tr>
            <td>
                <label for = "email">Email:</label>
            </td>
            <td>
                <input value="${contact.email}"type="text" name = "email" id = "email" placeholder="email@email.com.br">                
            </td>
        </tr>
        <tr>
            <td class="table-subtitle" colspan="2">
                <label for = "endereço">Endereço</label>
            </td>
        </tr>
        <tr>
            <td>
                <label for = "logradouro">Logradouro:</label>
            </td>
            <td>
                <input value="${contact.endereco.logradouro}"type="text" name = "logradouro" id = "logradouro" placeholder="Digite o logradouro...">
            </td>
        </tr>
        <tr>
            <td>
                <label for = "cidade">Cidade:</label>
            </td>
            <td>
                <input value="${contact.endereco.cidade}"type="text" name = "cidade" id = "cidade" placeholder="Digite a cidade...">
            </td>
        </tr>
        
        <tr>
            <td>
                <label for = "estado">Estado:</label>
            </td>
            <td>
                <input value="${contact.endereco.estado}"type="text" name = "estado" id = "estado" placeholder="Digite o estado...">
            </td>
        </tr>
        
        <tr>
            <td>
                <label for = "cep">CEP:</label>
            </td>
            <td>
                <input value="${contact.endereco.cep}"type="text" name = "cep" id = "cep" placeholder="Digite o cep...">
            </td>
        </tr>
        
        <tr>
            <td>
                <label for = "pais">País:</label>
            </td>
            <td>
                <input value="${contact.endereco.pais}"type="text" name = "pais" id = "pais" placeholder="Digite o país...">
            </td>
        </tr>

        <tr>
            <td>
                <label for = "text">Notas:</label>
            </td>
            <td>
                <input value="${contact.notas}" type="textarea" name = "notas" id = "notas" placeholder="Adicione notas sobre o contato...">
            </td>
        </tr>

        <tr>
            <td>
                <li> <label for = "foto">Foto:</label>
            </td>
            <td>
                <input type="file" name = "foto" id = "foto">                
            </td>
        </tr>
        <tr>
        <td colspan="2">
        <img id="imgPreview" src="${contact.foto}"></img>
        </td>
        </tr>
    </tbody>
</table>
    </fieldset>
    <button id = "postButton" type="submit">Submeter</button>`;
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

