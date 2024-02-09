const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(
    "/graphql",
    createProxyMiddleware({
        target: "https://quickstart-1b179de1.shopify.com",
        changeOrigin: true,
    })
);

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);0
});