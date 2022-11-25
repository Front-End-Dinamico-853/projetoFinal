const token = sessionStorage.getItem("Authorization");

const endPoint = "http://localhost:5000/v1/user";

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
    <img id="imgPreview" />
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
