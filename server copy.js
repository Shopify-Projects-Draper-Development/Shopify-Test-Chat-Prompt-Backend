const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
// THE BELOW WAS NOT ON THE SHOPIFY PAGE
// https://shopify.dev/docs/api/storefront
const shopifyThingQuestionMark = require('@shopify/shopify-api/adapters/node');
const {shopifyApi, LATEST_API_VERSION} = require('@shopify/shopify-api');
// END BELOW
// const shopify = require("@shopify/shopify-api");
// const shopify = require('@shopify/shopify-api');
const { DataType } = require("@shopify/shopify-api");

const app = express();
const PORT = 5000;

const shopify = shopifyApi({
    
    apiVersion: LATEST_API_VERSION,
    // restResources,
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


    // sessionStorage: new SqliteSessionStorage(DB_Path), //THIS STAYS COMMENTED FOR NOW
});

// const adminApiClient = new shopify.clients.Rest();

const session = shopify.session//.customAppSession("quickstart-1b179de1.myshopify.com");

console.log(session, "session line 38 server.js")

// app.use("/generate-storefront-access-token", async (req, res) => {
//     try{
//         // const session = shopify.session; //this is all better now? line 38
//         // console.log(shopify.session, "Shopify.session")
//         console.log(adminApiClient, "adminApiClient")
//         const storefrontTokenResponse = await adminApiClient.post({
//             path: "storefront_access_tokens",
//             type: DataType.JSON,
//             data: {
//                 storefront_access_token: {
//                     title: "This is my test access token",
//                 },
//             },
//         });
        
//         const storefrontAccessToken = storefrontTokenResponse.body["storefront_access_token"]["access_token"];

//         res.json({ token: storefrontAccessToken });
//     } catch(error){
//         console.error("Error generating storefront access token: ", error);
//         res.status(500).json({ error: "Internal server error"});
//     }
// })


app.use(cors());

const storefrontAccessToken = process.env.API_KEY;

const shop = "quickstart-1b179de1.myshopify.com";

const storefrontClient = new shopify.clients.Storefront({
    session,
    domain: shop,
    storefrontAccessToken,
});
// app.use("/test-item-query", async (req, res) => {

//     try{
//         const products = await storefrontClient.query({
//             data: `{
//                 products (first: 3) {
//                 edges {
//                     node {
//                     id
//                     title
//                     }
//                 }
//                 }
//             }`,
//         })
//         res.send([])
//     } catch(error){
//         console.error("Error retreiving products", error);
//         res.status(500).json({ error: "Internal server error"});
//     }

// })

// app.post(
//     "/graphql",
//     createProxyMiddleware({
//         target: "https://quickstart-1b179de1.shopify.com/api/2024-01/graphql.json",
//         changeOrigin: true,
//     })
// );

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);0
});