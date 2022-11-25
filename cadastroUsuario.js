const url = 'http://localhost:5000/v1/user'


const loadForm = (event) => {
    event.preventDefault();
    const form = document.createElement("FORM");
    form.innerHTML = `
    <div id="divCadastro">
    <h1>Cadastro</h1>

    <h4>Nome Completo</h4>
    <input
      id="nomeCadastro"
      type="text"
      name="nome"
      placeholder="Nome Completo..."
    />

    <h4>E-mail</h4>
    <input
      id="emailCadastro"
      type="text"
      name="email"
      placeholder="E-mail de login..."
    />

    <h4>Senha</h4>
    <input
      id="senhaCadastro"
      type="password"
      name="senha"
      placeholder="Sua senha..."
    />

    <h4>Foto</h4>
    <label class="foto">
      <input
        id="fotoCadastro"
        type="file"
        accept="image/*"
        class="fotoInput"
      />
      <span></span>
    </label>
    <img id="imgPreview" />

    <br />
    
    <button id="submitCadastro">Enviar</button>
    </div>
    `;
    root.append(form);

}

window.addEventListener('load', loadForm);

const loadFunction = () => {

    const nome = document.getElementById('nomeCadastro');
    const email = document.getElementById('emailCadastro');
    const senha = document.getElementById('senhaCadastro');
    const foto = document.getElementById('fotoCadastro');
    const submitCadastro = document.getElementById('submitCadastro');

    foto.addEventListener('change', function (e) {
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


    const cadastro = async (event) => {
        event.preventDefault();

        var imagem = document.getElementById("imgPreview").src;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                'nome': nome.value,
                'email': email.value,
                'senha': senha.value,
                'foto': imagem
            }),
        })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 200) {
                    const { ...user } = response.data;
                    alert('Usuário cadastrado com sucesso!');
                    window.location.href = 'login.html';
                }
                else {
                    const { mensagem, erros } = response;
                    alert(mensagem);

                    console.log(erros);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    submitCadastro.addEventListener('click', cadastro);
}
window.addEventListener("load", loadFunction)