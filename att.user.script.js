const token = sessionStorage.getItem("Authorization");

const endPoint = "http://localhost:5000/v1/user";

const loadForm = (event) => {
    event.preventDefault();
    const form = document.createElement("FORM");
    form.innerHTML = `
    <header>
    <h1><a href="home.html"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
    </svg></a>
    Atualizar usuário</h1>
    </header>
    <main id="att-user-container">
    <div>
    <h4>E-mail:</h4>
    <input id="email-input" type="text" placeholder="E-mail">
</div>
<div>
    <h4>Senha:</h4>
    <input id="password-input" type="password" placeholder="Senha">
</div>
<div>
    <h4>Nome:</h4>
    <input id="name-input" type="text" placeholder="Nome">
</div>   
<div>
    <h4>Foto:</h4>
    <input id="photo-input" type="file" placeholder="Foto">
    </div> 
    <img id="imgPreview" />
<div id="att-user-button-container">
    <button id="patch-submit" type="submit" value="Submit">Enviar</button>
</div>
</main>
    `;
    root.append(form);
}


window.addEventListener('load', loadForm);

const loadFunction = () => {

    const attEmail = document.getElementById("email-input").value;
    const attPassword = document.getElementById("password-input").value;
    const attName = document.getElementById("name-input").value;
    const attPhoto = document.getElementById("photo-input");

    attPhoto.addEventListener('change', function (e) {
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




    const attUser = (event) => {
        event.preventDefault();

        var imagem = document.getElementById("imgPreview").src;


        const HEADERS = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };



        const request = new Request(endPoint, {
            headers: new Headers(Object.assign(HEADERS,
                { "Authorization": token })),
            method: "PATCH",
            body: JSON.stringify({
                email: attEmail,
                senha: attPassword,
                nome: attName,
                foto: imagem
            })
        });

        sessionStorage.setItem("userImage", imagem)

        fetch(request).then(function (response) {
            if (response.ok) {
                alert("Usuário Atualizado!")
            }
            window.location.href = './home.html';
        })


    }


    const events = () => {
        document.addEventListener("submit", attUser)
    }

    events();

}
window.addEventListener("load", loadFunction)
