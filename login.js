sessionStorage.clear();

const url = 'http://localhost:5000/v1/auth'

const root = document.getElementById('root');


const loadForm = (event) => {
    event.preventDefault();
    const form = document.createElement("FORM");
    form.innerHTML = `
    <div id="divLogin">
    <h1>Login</h1>

    <h4>E-mail:</h4>
    <input
      id="emailLogin"
      type="text"
      name="email"
      placeholder="Seu e-mail..."
    />

    <h4>Senha:</h4>
    <input
      id="senhaLogin"
      type="password"
      name="senha"
      placeholder="Sua senha..."
    />

    <button id="submitLogin">Entrar</button>
    <br />
    <a href="./cadastroUsuario.html">Faça seu cadastro</a>
    </div>
    `;
    root.append(form);
    
}

window.addEventListener('load', loadForm);


const loadFunction = () =>{
    
const email = document.getElementById('emailLogin')
const senha = document.getElementById('senhaLogin')
const submitLogin = document.getElementById('submitLogin')
const form = document.getElementById("formLogin")

const login = (event) => {
    event.preventDefault();

    response = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            'email': email.value,
            'senha': senha.value
        }),
    })
        .then(response => response.json())
        .then((response) => {
            if (response.status === 200) {
                const { token, ...user } = response.data;
                sessionStorage.setItem('idUsuario', user.id);
                sessionStorage.setItem('userName', user.nome);
                sessionStorage.setItem('userEmail', user.email);
                sessionStorage.setItem('userImage', user.foto);
                sessionStorage.setItem('Authorization', token);

                window.location.href = './home.html';
            }
            else {
                const { mensagem, erros } = response;
                alert(erros[0]);
                console.log(erros);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

submitLogin.addEventListener('click', login);
}

window.addEventListener("load", loadFunction)


