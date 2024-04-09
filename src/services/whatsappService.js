const { error } = require("console");
const https = require("https");

function sendMenssageWhatsapp(textResponse, number){
    const data = JSON.stringify({
        "messaging_producto": "whatsapp",
        "to": number,
        "text": {
            "body": textResponse
        },
        "type": "text"
    });

    const options = {
        host: "api-whatsapp-4j15.onrender.com",
        path: "/whatsapp",
        method: "post",
        body: data,
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer EAAU35xyarp0BO3ROvaq9sDew5oJMJ12wfz14u87cp3qInhQ3y5CVVKiC71aZBANgAS3N4oILNCumPWuZAt1QID60zHfD0GmFeiKw8XTLXS81wk7kbW47Xpp0jZC9jeHRNZB8IC6qDplEB6nSgcd5ZBnUZAWNr62Rw5WU3uXcOD0CTDGxXoGvBJUhTZARwDMYn1CgloXdYmq9bv3vBlI6DYWy1YpAkBxkIG9AjCHQIAZD",
        }
    };

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    })

    req.on("error", error => {
        console.error(error)
    })

    req.write(data);
    req.end();
}


module.exports = {
    sendMenssageWhatsapp,
}