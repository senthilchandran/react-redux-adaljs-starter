import { AdalConfig, AuthenticationContext } from "react-adal";

const webApiUrl = "https://localhost:5001";
const webApiTenant = "****url of web api app registration in Azure****";
const reactAppId = "****your react applications app id from app registration in Azure**** ";

const adalConfig: AdalConfig = {
    clientId: reactAppId,
    endpoints: {
        webApiUrl: webApiTenant
    },
    postLogoutRedirectUri: "http://localhost:3001",
};

export var authContext = new AuthenticationContext(adalConfig);
authContext.handleWindowCallback();

if (!authContext.isCallback(window.location.hash)) {
    //Having both of these checks is to prevent having a token in localstorage, but no user. Relates to issue #471
    if (!authContext.getCachedToken(adalConfig.clientId) || !authContext.getCachedUser()) {
        authContext.login();
    }
}