const fs = require("fs");

const myConsole = new console.Console(fs.createWriteStream("./log-txt"));


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
        
        res.send('EVENT_RECEIVED')
    } catch (e) {
        res.send('EVENT_RECEIVED');
    }
}


module.exports = {
    VerifyToken,
    ReceivedMessage
}