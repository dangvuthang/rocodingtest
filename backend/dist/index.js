"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./login/login");
const express = require("express");
const msal = require('@azure/msal-node');
const SERVER_PORT = process.env.PORT || 3000;
const app = express();
app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`));
const config = {
    auth: {
        clientId: "e771c084-57ca-4167-9576-743bc57a449e",
        authority: "https://login.microsoftonline.com/rmiteduau.onmicrosoft.com",
        clientSecret: "Enter_the_Client_secret"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};
const cca = new msal.ConfidentialClientApplication(config);
app.get('/', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});
app.get('/redirect', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };
    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});
//# sourceMappingURL=index.js.map