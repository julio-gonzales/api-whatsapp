const VerifyToken = (req, res) => {
    try {
        var accessToken = "FRKEMMDFLSDLFEFMVMFMVD";
        var token = res.query["hub.verify_token"];
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
    res.send('recibido')
}


module.exports = {
    VerifyToken,
    ReceivedMessage
}