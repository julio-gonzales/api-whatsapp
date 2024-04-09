const fs = require("fs");

const myConsole = new console.Console(fs.createWriteStream("./log-txt"));

const whatsappService = require('../services/whatsappService');




const VerifyToken = (req, res) => {
    try {
        var accessToken = "FRK23EMMDFLSDLFEFMVMFMV565D4646";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && accessToken == token){
            res.send(challenge);
        } else {
            res.status(400).send();
        }
    } catch (e) {
        res.status(400).send();
    }
}



const ReceivedMessage = (req, res) => {
    try {
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"]
        console.log(messageObject);

        if (typeof messageObject != "undefined"){
            //console.log("ingreso a enviar")
            var messages = messageObject[0];
            var text = GetTextUser(messages);
            myConsole.log(text);

            var number = messages["from"];
            console.log(number);
            whatsappService.SendMenssageWhatsapp("el usuario dijo " + text, number);
        }
        
        res.send('EVENT_RECEIVED')
    } catch (e) {
        res.send('EVENT_RECEIVED');
    }
}

const enviarMensaje = (req, res) => {
    let { nombre, monto, nombrePartida,cantidadParticipantes, fechaInicio, number } = req.body;
    try {
        var text = 
`INVITACION A LA PARTIDA: ${nombrePartida}

Estimado ${nombre}
nos complace invitarte a la partida de ${nombrePartida}
la cantidad de participantes es: ${cantidadParticipantes}
con un monto de: ${monto}
a inciarce el ${fechaInicio}
`;
        var numero = number;
        whatsappService.SendMenssageWhatsapp(text, numero);
        res.send('EVENTE_RECEIVED')
    } catch (error) {
        res.send('EVENT_FAILLED')
    }
}

function GetTextUser(messages){
    var text = "";
    var typeMessage = messages["type"];

    if (typeMessage == "text"){
        text = (messages["text"])["body"]
    } else if (typeMessage == "interactive" ) {
        var interactiveObject = messages["interactive"];
        var typeInteractive  = interactiveObject["type"];
    //myConsole.log(interactiveObject);
        if (typeInteractive == "button_reply"){
            text = (interactiveObject["button_reply"])["title"];
        } else if (typeInteractive == "list_reply"){
            text = (interactiveObject["list_reply"])["title"];
        } else {
            myConsole.log("sin mensaje");
        }
    } else {
        myConsole.log("sin mensaje");
    }

    return text;
}


module.exports = {
    VerifyToken,
    ReceivedMessage, 
    enviarMensaje
}