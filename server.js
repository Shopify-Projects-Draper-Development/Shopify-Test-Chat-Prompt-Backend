const express = require("express");
const {shopifyApi, LATEST_API_VERSION} = require('@shopify/shopify-api');


const app = express();

const shopify = shopifyApi({
    
    apiVersion: LATEST_API_VERSION,
    billing: undefined,
    apiKey: process.env.API_KEY,
    apiSecretKey: process.env.API_SECRET_KEY,
    isCustomeStoreApp: false,
    scopes: ["write_customers", "write_products", "read_products"],
    isEmbeddedApp: false,
    hostName: process.env.HOST_NAME, //is string??

    auth: {
        path: "/api/auth",
        callbackPath: "/api/auth/callback",
    },
    webhooks: {
        path: "/api/webhooks",
    },

});




app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);0
});