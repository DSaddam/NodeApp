const crypto = require('crypto');
const nonce = require('nonce')();
const request = require('request-promise');
const querystring = require('querystring');
// const databaseData = require('./routes/db');
const cookie = require('cookie');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
var cors = require('cors')
dotenv.config();
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET } = process.env;
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())
app.options('*', cors())

const staticPath = path.join(__dirname, "build");
app.use(express.static(staticPath));
const apiKey = SHOPIFY_API_KEY;

const apisecret = SHOPIFY_API_SECRET;

const scopes = "read_orders,write_orders,read_products,write_products,read_customers,write_customers,read_shipping,write_shipping";

const forwardingaddress = "https://ca33-2409-4050-2ec0-d46d-857-8177-f978-59e2.in.ngrok.io";

app.get('/shopify', (req, res) => {
    // Shop Name
    const shop = req.query.shop;
    if (shop) {
        const state = nonce();
        //  redirect
        const redirectURL = forwardingaddress + '/shopify/callback';
        // Install 
        const shopifyURL = 'https://' + shop +

            '/admin/oauth/authorize?client_id=' + apiKey +

            '&scope=' + scopes +

            '&state=' + state +

            '&redirect_uri=' + redirectURL;

        res.cookie('state', state);
        res.redirect(shopifyURL);
    } else {
        return res.status(400).send('Missing "Shop Name" parameter!! please add');
    }
});
app.get('/shopify/callback', (req, res) => {
    const { shop, hmac, code, shopState } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).shopState;
    if (shopState !== stateCookie) {
        return res.status(400).send("request origin cannot be found");
    }
    if (shop && hmac && code) {
        const Map = Object.assign({}, req.query);
        delete Map['hmac'];
        const message = querystring.stringify(Map);
        const generatehmac = crypto
            .createHmac('sha256', apisecret)
            .update(message)
            .digest('hex');
        // console.log(generatehmac)
        if (generatehmac !== hmac) {
            return res.status(403).send("validation failed")
        }
        const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
        const accessTokenPayload = {
            client_id: apiKey,
            client_secret: apisecret,
            code,
        };

        request.post(accessTokenRequestUrl, { json: accessTokenPayload })

            .then((accessTokenResponse) => {

                const accessToken = accessTokenResponse.access_token;

                const apiRequestURL = 'https://' + shop + '/admin/products.json';

                const apiRequestHeaders =

                {
                    'X-Shopify-Access-Token': accessToken
                };

                request.get(apiRequestURL, { headers: apiRequestHeaders })

                    .then((apiResponse) => {
                        // res.send('/index.html');
                        // GetAccessToken(accessToken);
                        res.redirect('/?shop=' + shop);
                        //  res.end(apiResponse);
                        // dataApi(apiResponse);                      
                        //console.log("apiRequestHeaders",apiRequestHeaders);
                        //    const data = JSON.parse(apiResponse);
                        //     const products = data.products;
                        //    res.render('orderReport',{products:products});

                    })
                    .catch((error) => {
                        res.status(error.statusCode).send(error.error.error_description);
                    });

            })
            .catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
            });
    }
    else {
        return res.status(400).send("required parameter missing")
    }
});

app.listen(3001, () => {
    console.log("running on port 3001")
})


