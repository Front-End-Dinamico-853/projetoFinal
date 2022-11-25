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

