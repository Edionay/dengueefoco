window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude
            latitude = position.coords.latitude
            getCep();
        });
    }
})

let longitude = ""
let latitude = ""

function getCep() {

    const requestUrl = `https://maps.google.com/maps/api/geocode/json?address=${latitude},${longitude}&sensor=false&key=AIzaSyBuuq_Td4NjK9DSowVe03PegsojAI70Hxw`;
    const request = new XMLHttpRequest();

    request.open('GET', requestUrl);
    request.responseType = 'json';
    request.onload = () => {

        const endereco = request.response.results[0].address_components
        console.log(endereco)
        $("#rua").val(endereco[1].long_name);
        $("#setor").val(endereco[2].long_name);
        $("#cep").val(endereco[6].long_name);
        $("#cidade").val(endereco[3].long_name);
    };
    request.send();
}

function getEnderecoPorCep() {
    var cep = $("#cep").val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {


            //Consulta o webservice viacep.com.br/
            const requestUrl = "https://viacep.com.br/ws/" + cep + "/json/";
            const request = new XMLHttpRequest();

            request.open('GET', requestUrl);
            //request.responseType = 'json';
            request.onload = () => {

                console.log(request.response)
                endereco = JSON.parse(request.response)
                $("#rua").val(endereco.logradouro);
                $("#setor").val(endereco.bairro);
                $("#cep").val(endereco.cep);
                $("#cidade").val(endereco.localidade);
            };
            request.send();
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}

function notificarPrefeitura() {

    const date = new Date()

    /*     const denuncia = {
            data: date.toString(),
            longitude: longitude,
            latitude: latitude,
            rua: $("#rua").val(),
            setor: $("#setor").val(),
            cep: $("#cep").val(),
            cidade: $("#cidade").val(),
            observacoes: $("#observacoes").val()
        } */

    const denuncias = [{
        lat: -16.54595121290,
        lng: -49.26878648630
    }, {
        lat: -16.54598128560,
        lng: -49.26860172760
    }, {
        lat: -16.54604031530,
        lng: -49.26880207530
    }, {
        lat: -1654607038750,
        lng: -49.26861731650
    }, {
        lat: -16.54612941750,
        lng: -49.26881766450
    }, {
        lat: -16.621519,
        lng: -49.220019
    }, {
        lat: -16.620738,
        lng: -49.221350
    }, {
        lat: -16.618949,
        lng: -49.222380

    }, {
        lat: -16.617859,
        lng: -49.221285
    }, {
        lat: -16.616050,
        lng: -49.225384

    }, {
        lat: -16.615278,
        lng: -49.216747

    }, {
        lat: -16.614804,
        lng: -49.216784
    }, {
        lat: -16.614450,
        lng: -49.216516
    }, {
        lat: -16.6614801,
        lng: -49.217342

    }, {
        lat: -16.613892,
        lng: -49.218818

    }, {
        lat: -16.613224,
        lng: -49.217609

    }, {
        lat: -16.613335,
        lng: -49.219193

    }, {
        lat: -16.612844,
        lng: -49.218061

    }, {
        lat: -16.722323,
        lng: -49.303064
    }, {
        lat: -16.726401,
        lng: -49.303127
    }, {
        lat: -16.722116,
        lng: -49.296208

    }, {
        lat: -16.724051,
        lng: -49.294548

    }, {
        lat: -16.723844,
        lng: -49.304292

    }, {
        lat: -16.738744,
        lng: -49.261472

    }, {
        lat: -16.741580,
        lng: -49.264734
    }, {
        lat: -16.741580,
        lng: -49.260743

    }, {
        lat: -16.742114,
        lng: -49.256537

    }, {
        lat: -16.745196,
        lng: -49.258522

    }, {
        lat: -16.734018,
        lng: -49.266150

    }, {
        lat: -16.711032,
        lng: -49.255817

    }, {
        lat: -16.711192,
        lng: -49.249308

    }, {
        lat: -16.715959,
        lng: -49.255134

    }, {
        lat: -16.716177,
        lng: -49.248883

    }, {
        lat: -16.713009,
        lng: -49.256773
    }]

    denuncias.forEach(denuncia => {
        firebase.database().ref('denunciasp/').push(denuncia);
    })
}

function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");
    $("#ibge").val("");
}