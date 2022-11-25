const token = sessionStorage.getItem("Authorization");
const url = 'http://localhost:5000/v1/contact/';

const root = document.getElementById('root');

const idContato = new URL(window.location.href).searchParams.get('id')
const headers = new Headers()
headers.append('Content-Type', 'application/json')

const getContact = async () => {
    headers.append('Authorization', token)
    const response = await fetch(url + idContato, { headers, method: "GET" })
    return await response.json()
}


const loadContact = async (event) => {
    event.preventDefault();
    const contact = await getContact();

    const secao = document.createElement("FORM");

    secao.innerHTML = `
    <img src="${contact.data.foto}" />
    <h1>Nome: ${contact.data.nome} </h1>
    <h2>Apelido: ${contact.data.apelido} </h2>
    <h4>E-mail: ${contact.data.email} </h4>
    <h4>Notas: ${contact.data.notas} </h4>
    `;
    for (i = 0; i < contact.data.telefones.length; i++) {
        secao.innerHTML += `<h4>Telefone: ${contact.data.telefones[i].tipo} ${contact.data.telefones[i].numero}</h4>`
    }
    secao.innerHTML += `
    <ul>
        <li>Logradouro: ${contact.data.endereco.logradouro} </li>
        <li>Cidade: ${contact.data.endereco.cidade}</li>
        <li>Estado: ${contact.data.endereco.estado}</li>
        <li>CEP: ${contact.data.endereco.cep}</li>
        <li>Pais: ${contact.data.endereco.pais}</li>
    </ul>
    <button id="attContato">Atualizar Contato</button>
    <button id="excluirContato">Excluir Contato</button>
    `;

    root.append(secao);

    const delContact = document.getElementById('excluirContato');
    delContact.addEventListener('click', deleteContact);

    const attContato = document.getElementById('attContato');
    attContato.addEventListener('click', atualizarContato);
}

window.addEventListener('load', loadContact);

const deleteContact = (event) => {
    event.preventDefault();
    if (confirm('Tem certeza de que deseja excluir contato?')) {
        const HEADERS = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const endPoint = "http://localhost:5000/v1/contact";

        const request = new Request(endPoint, {
            headers: new Headers(Object.assign(HEADERS,
                { "Authorization": token })),
            method: "DELETE",
            body: JSON.stringify({ idContato: idContato })
        });

        fetch(request).then(function (response) {
            if (response.ok) {
                alert("Contato Excluido!")
            }
            window.location.href = 'listContacts.html';
        })

    }
}

const atualizarContato = (event) => {
    event.preventDefault();
    window.location.href=`postContact.html?id=${idContato}`;
    
}
