const baseUrl = 'http://localhost:5000/v1/'

const root = document.getElementById('root');

const selectGetContacts = document.getElementById('contatos');

const token = sessionStorage.getItem("Authorization")


const headers = new Headers()
headers.append('Content-Type', 'application/json')

const getContacts = async () => {
    headers.append('Authorization', token)
    const response = await fetch(baseUrl + 'contact', { headers, method: "GET" })
    return await response.json()
}

const loadTable = (event) => {
    root.innerHTML=`
    <header>
    <h1><a href="home.html"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
    </svg></a>
    Lista de contatos</h1>
    </header>`;

    event.preventDefault();
    var table = document.createElement("TABLE");
    table.id = 'listaContatos';
    table.innerHTML = `
    <thead>
    <th>Nome</th>
    <th>Apelido</th>
    <th>Email</th>
    </thead>
    <tbody id=table-tbody>
    </tbody>
    `;
    root.append(table);
    return formatTable();
}

const formatTable = async () => {

    const contacts = await getContacts();
    console.log(contacts);


    var max = contacts.data.length;

    for (let i = 0; i < max; i++) {
        var tr = document.createElement("TR");
        tr.innerHTML = `
            <td>${contacts.data[i].nome}</td>
            <td>${contacts.data[i].apelido}</td>
            <td>${contacts.data[i].email}</td>
            `;
        tr.addEventListener('click', () => {
            window.location.href = `detalhesContato.html?id=${contacts.data[i].id}`
        })

        var tbody = document.getElementById("table-tbody");
        tbody.appendChild(tr);
        console.log(contacts.data.telefones);
    }

}


window.addEventListener('load', loadTable);

