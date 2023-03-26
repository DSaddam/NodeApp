const crypto = require('crypto');
const nonce = require('nonce')();
const request = require('request-promise');
const querystring = require('querystring');
const databaseData = require('./db/demo_db_connection');

const axios = require('axios');
const cookie = require('cookie');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
var cors = require('cors');
const { json } = require('express');
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

const scopes = "read_orders,write_orders,read_products,write_products,read_customers,write_customers,read_shipping,write_shipping ,read_themes,write_themes";

const forwardingaddress = "https://44ae-2401-4900-2ee0-a449-5a7-11b2-27b4-2b8b.in.ngrok.io";

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
                         GetAccessToken(accessToken);
                        console.log("accessToken:",accessToken)
                        res.redirect('node/?shop=' + shop);
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


function GetAccessToken(access_token_value){
  var options = {
    'method': 'GET',
    'url': 'https://saddamhusain78009.myshopify.com/admin/api/2023-01/shop.json',
    'headers': {
      'X-Shopify-Access-Token': 'shpua_ac49611e6c4cc67f563383888472c408',
      'x-api-key': '06601aa389b6dafa9218fcb0d5a5d734',
      'Content-Type': 'application/json',
      'Cookie': '_master_udr=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxpWkRsak9EVmhPQzB3TW1abExUUmtZamN0WWpnM1ppMDFaR1poTURJM01XVXlZaklHT2daRlJnPT0iLCJleHAiOiIyMDI1LTAzLTI1VDIwOjAwOjMzLjUwMVoiLCJwdXIiOiJjb29raWUuX21hc3Rlcl91ZHIifX0%3D--df32d69e62bc590e46fae18ddca38b526c5b918d; _secure_admin_session_id=671d6ac56a3171fe7396cbd913124ec6; _secure_admin_session_id_csrf=671d6ac56a3171fe7396cbd913124ec6; _cmp_a=%7B%22purposes%22%3A%7B%22a%22%3Atrue%2C%22p%22%3Atrue%2C%22m%22%3Atrue%2C%22t%22%3Atrue%7D%2C%22display_banner%22%3Afalse%2C%22merchant_geo%22%3A%22IN%22%2C%22sale_of_data_region%22%3Afalse%7D; _landing_page=%2Fpassword; _orig_referrer=https%3A%2F%2Fsaddamhusain78009.myshopify.com%2Fcart-notification-product.liquid; _s=dcb99eec-c6f4-463c-941b-c2de7e76915a; _secure_session_id=9b7fd89a157f51d7fa4db57765c0eea8; _shopify_s=dcb99eec-c6f4-463c-941b-c2de7e76915a; _shopify_y=073caf08-6af0-490c-a9a6-e688886a9e77; _y=073caf08-6af0-490c-a9a6-e688886a9e77; identity-state=BAhbCkkiJTFkNzRhNjUwZTMxZWViYjFiYTcwODUwOWJiNDQzOWM2BjoGRUZJIiU1MjA5YWM0ZTI1MzFkZTliNjkwZDQ1YzYyYWNmNDNmNgY7AEZJIiU2NmUwYzcwZDI0ZjE2MGVlMWVkNjFmOTdhZDk0ZjdkZgY7AEZJIiVlYWM1YzRiYTQzYWQ4NWM5YTdlODM4ZGM1M2JhYjMxMAY7AEZJIiVkNzUyNDFkMjRhMGUxY2Q5YzZlNzFkODFiNGJhOTkwNgY7AEY%3D--71514661b92d97c655ed1b22aab6da72e98a4e04; identity-state-1d74a650e31eebb1ba708509bb4439c6=BAh7DEkiDnJldHVybi10bwY6BkVUSSI9aHR0cHM6Ly9zYWRkYW1odXNhaW43ODAwOS5teXNob3BpZnkuY29tL2FkbWluL2F1dGgvbG9naW4GOwBUSSIRcmVkaXJlY3QtdXJpBjsAVEkiSWh0dHBzOi8vc2FkZGFtaHVzYWluNzgwMDkubXlzaG9waWZ5LmNvbS9hZG1pbi9hdXRoL2lkZW50aXR5L2NhbGxiYWNrBjsAVEkiEHNlc3Npb24ta2V5BjsAVDoMYWNjb3VudEkiD2NyZWF0ZWQtYXQGOwBUZhcxNjc5Nzc0NDMzLjUxNjUxODhJIgpub25jZQY7AFRJIiU4MTJiNDQ3ZTc5ODM0MjBkOThjZGNlYmYyOTFmOTIyMgY7AEZJIgpzY29wZQY7AFRbD0kiCmVtYWlsBjsAVEkiN2h0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvZGVzdGluYXRpb25zLnJlYWRvbmx5BjsAVEkiC29wZW5pZAY7AFRJIgxwcm9maWxlBjsAVEkiTmh0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvcGFydG5lcnMuY29sbGFib3JhdG9yLXJlbGF0aW9uc2hpcHMucmVhZG9ubHkGOwBUSSIwaHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9iYW5raW5nLm1hbmFnZQY7AFRJIkJodHRwczovL2FwaS5zaG9waWZ5LmNvbS9hdXRoL21lcmNoYW50LXNldHVwLWRhc2hib2FyZC5ncmFwaHFsBjsAVEkiPGh0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvc2hvcGlmeS1jaGF0LmFkbWluLmdyYXBocWwGOwBUSSI3aHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9mbG93LndvcmtmbG93cy5tYW5hZ2UGOwBUSSI%2BaHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9vcmdhbml6YXRpb24taWRlbnRpdHkubWFuYWdlBjsAVEkiD2NvbmZpZy1rZXkGOwBUSSIMZGVmYXVsdAY7AFQ%3D--1c63bf1e7a98e86246b3a322541a1d4421613902; identity-state-5209ac4e2531de9b690d45c62acf43f6=BAh7DEkiDnJldHVybi10bwY6BkVUSSI9aHR0cHM6Ly9zYWRkYW1odXNhaW43ODAwOS5teXNob3BpZnkuY29tL2FkbWluL2F1dGgvbG9naW4GOwBUSSIRcmVkaXJlY3QtdXJpBjsAVEkiSWh0dHBzOi8vc2FkZGFtaHVzYWluNzgwMDkubXlzaG9waWZ5LmNvbS9hZG1pbi9hdXRoL2lkZW50aXR5L2NhbGxiYWNrBjsAVEkiEHNlc3Npb24ta2V5BjsAVDoMYWNjb3VudEkiD2NyZWF0ZWQtYXQGOwBUZhYxNjc5Nzc0NDc5Ljc3ODkwNEkiCm5vbmNlBjsAVEkiJTc5YjQ2NGE3ZjU2YTYzNTM2YzEzYzY1MGE2OGQ4MzI3BjsARkkiCnNjb3BlBjsAVFsPSSIKZW1haWwGOwBUSSI3aHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9kZXN0aW5hdGlvbnMucmVhZG9ubHkGOwBUSSILb3BlbmlkBjsAVEkiDHByb2ZpbGUGOwBUSSJOaHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9wYXJ0bmVycy5jb2xsYWJvcmF0b3ItcmVsYXRpb25zaGlwcy5yZWFkb25seQY7AFRJIjBodHRwczovL2FwaS5zaG9waWZ5LmNvbS9hdXRoL2JhbmtpbmcubWFuYWdlBjsAVEkiQmh0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvbWVyY2hhbnQtc2V0dXAtZGFzaGJvYXJkLmdyYXBocWwGOwBUSSI8aHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9zaG9waWZ5LWNoYXQuYWRtaW4uZ3JhcGhxbAY7AFRJIjdodHRwczovL2FwaS5zaG9waWZ5LmNvbS9hdXRoL2Zsb3cud29ya2Zsb3dzLm1hbmFnZQY7AFRJIj5odHRwczovL2FwaS5zaG9waWZ5LmNvbS9hdXRoL29yZ2FuaXphdGlvbi1pZGVudGl0eS5tYW5hZ2UGOwBUSSIPY29uZmlnLWtleQY7AFRJIgxkZWZhdWx0BjsAVA%3D%3D--0fecf6dc3d0f4035cf5a9b01e34983dd76fa1e8c; identity-state-66e0c70d24f160ee1ed61f97ad94f7df=BAh7DEkiDnJldHVybi10bwY6BkVUSSI9aHR0cHM6Ly9zYWRkYW1odXNhaW43ODAwOS5teXNob3BpZnkuY29tL2FkbWluL2F1dGgvbG9naW4GOwBUSSIRcmVkaXJlY3QtdXJpBjsAVEkiSWh0dHBzOi8vc2FkZGFtaHVzYWluNzgwMDkubXlzaG9waWZ5LmNvbS9hZG1pbi9hdXRoL2lkZW50aXR5L2NhbGxiYWNrBjsAVEkiEHNlc3Npb24ta2V5BjsAVDoMYWNjb3VudEkiD2NyZWF0ZWQtYXQGOwBUZhcxNjc5Nzc0NTQzLjI5NjkwNjdJIgpub25jZQY7AFRJIiU5NTQxOGMyYzViMGY1NWI4YWViNmE3ZGJlMTdiMTNmZAY7AEZJIgpzY29wZQY7AFRbD0kiCmVtYWlsBjsAVEkiN2h0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvZGVzdGluYXRpb25zLnJlYWRvbmx5BjsAVEkiC29wZW5pZAY7AFRJIgxwcm9maWxlBjsAVEkiTmh0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvcGFydG5lcnMuY29sbGFib3JhdG9yLXJlbGF0aW9uc2hpcHMucmVhZG9ubHkGOwBUSSIwaHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9iYW5raW5nLm1hbmFnZQY7AFRJIkJodHRwczovL2FwaS5zaG9waWZ5LmNvbS9hdXRoL21lcmNoYW50LXNldHVwLWRhc2hib2FyZC5ncmFwaHFsBjsAVEkiPGh0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvc2hvcGlmeS1jaGF0LmFkbWluLmdyYXBocWwGOwBUSSI3aHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9mbG93LndvcmtmbG93cy5tYW5hZ2UGOwBUSSI%2BaHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9vcmdhbml6YXRpb24taWRlbnRpdHkubWFuYWdlBjsAVEkiD2NvbmZpZy1rZXkGOwBUSSIMZGVmYXVsdAY7AFQ%3D--2976bd31099a41e4bc659c1e95bb2efab15a840c; identity-state-d75241d24a0e1cd9c6e71d81b4ba9906=BAh7DEkiDnJldHVybi10bwY6BkVUSSI9aHR0cHM6Ly9zYWRkYW1odXNhaW43ODAwOS5teXNob3BpZnkuY29tL2FkbWluL2F1dGgvbG9naW4GOwBUSSIRcmVkaXJlY3QtdXJpBjsAVEkiSWh0dHBzOi8vc2FkZGFtaHVzYWluNzgwMDkubXlzaG9waWZ5LmNvbS9hZG1pbi9hdXRoL2lkZW50aXR5L2NhbGxiYWNrBjsAVEkiEHNlc3Npb24ta2V5BjsAVDoMYWNjb3VudEkiD2NyZWF0ZWQtYXQGOwBUZhYxNjc5NzgxNTkwLjkxNzg0OUkiCm5vbmNlBjsAVEkiJWU0Nzk4NDU1MDI5OTMxM2M4NDlkZTlhZjE1M2E1MmU4BjsARkkiCnNjb3BlBjsAVFsPSSIKZW1haWwGOwBUSSI3aHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9kZXN0aW5hdGlvbnMucmVhZG9ubHkGOwBUSSILb3BlbmlkBjsAVEkiDHByb2ZpbGUGOwBUSSJOaHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9wYXJ0bmVycy5jb2xsYWJvcmF0b3ItcmVsYXRpb25zaGlwcy5yZWFkb25seQY7AFRJIjBodHRwczovL2FwaS5zaG9waWZ5LmNvbS9hdXRoL2JhbmtpbmcubWFuYWdlBjsAVEkiQmh0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvbWVyY2hhbnQtc2V0dXAtZGFzaGJvYXJkLmdyYXBocWwGOwBUSSI8aHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9zaG9waWZ5LWNoYXQuYWRtaW4uZ3JhcGhxbAY7AFRJIjdodHRwczovL2FwaS5zaG9waWZ5LmNvbS9hdXRoL2Zsb3cud29ya2Zsb3dzLm1hbmFnZQY7AFRJIj5odHRwczovL2FwaS5zaG9waWZ5LmNvbS9hdXRoL29yZ2FuaXphdGlvbi1pZGVudGl0eS5tYW5hZ2UGOwBUSSIPY29uZmlnLWtleQY7AFRJIgxkZWZhdWx0BjsAVA%3D%3D--a6a400438d96ed9390c472607b5cc5049e889c92; identity-state-eac5c4ba43ad85c9a7e838dc53bab310=BAh7DEkiDnJldHVybi10bwY6BkVUSSI9aHR0cHM6Ly9zYWRkYW1odXNhaW43ODAwOS5teXNob3BpZnkuY29tL2FkbWluL2F1dGgvbG9naW4GOwBUSSIRcmVkaXJlY3QtdXJpBjsAVEkiSWh0dHBzOi8vc2FkZGFtaHVzYWluNzgwMDkubXlzaG9waWZ5LmNvbS9hZG1pbi9hdXRoL2lkZW50aXR5L2NhbGxiYWNrBjsAVEkiEHNlc3Npb24ta2V5BjsAVDoMYWNjb3VudEkiD2NyZWF0ZWQtYXQGOwBUZhcxNjc5NzgxNTgyLjgzMzI1NzdJIgpub25jZQY7AFRJIiU5MDU0MDEwZjM5NWRhZWEzNTBmZGRlZjI3MWY4ZjA3YwY7AEZJIgpzY29wZQY7AFRbD0kiCmVtYWlsBjsAVEkiN2h0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvZGVzdGluYXRpb25zLnJlYWRvbmx5BjsAVEkiC29wZW5pZAY7AFRJIgxwcm9maWxlBjsAVEkiTmh0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvcGFydG5lcnMuY29sbGFib3JhdG9yLXJlbGF0aW9uc2hpcHMucmVhZG9ubHkGOwBUSSIwaHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9iYW5raW5nLm1hbmFnZQY7AFRJIkJodHRwczovL2FwaS5zaG9waWZ5LmNvbS9hdXRoL21lcmNoYW50LXNldHVwLWRhc2hib2FyZC5ncmFwaHFsBjsAVEkiPGh0dHBzOi8vYXBpLnNob3BpZnkuY29tL2F1dGgvc2hvcGlmeS1jaGF0LmFkbWluLmdyYXBocWwGOwBUSSI3aHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9mbG93LndvcmtmbG93cy5tYW5hZ2UGOwBUSSI%2BaHR0cHM6Ly9hcGkuc2hvcGlmeS5jb20vYXV0aC9vcmdhbml6YXRpb24taWRlbnRpdHkubWFuYWdlBjsAVEkiD2NvbmZpZy1rZXkGOwBUSSIMZGVmYXVsdAY7AFQ%3D--03e527f1040bb6f9d360bb64771865c7c2a03c96; localization=IN; secure_customer_sig='
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    
    const body = JSON.parse(response.body);
   // Assuming the response body is a JSON object
     var themeId = body.shop.id;
     var shop_name = body.shop.domain;
     console.log(themeId,shop_name,access_token_value);
    const query = `INSERT INTO npt_table (shop_name, accessToken, themeId) VALUES (?, ?, ?)`;
    const values = [shop_name,access_token_value, themeId]; // Change the column names to match your database
    
    databaseData.query(query, values, function (err, result) {
      if (err) throw err;
      console.log('Data inserted successfully');
    });
  });
}
app.post('/data', (req, res) => {
  const title = req.body.post.title;
  const file = req.body.post.file;
  const description = req.body.post.description;
  const filter = req.body.post.filter;
  const startDate = req.body.post.startDate;
  const endDate = req.body.post.endDate;

  const sql = "INSERT INTO npt_table (title, file, description, filter, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)";
  databaseData.query(sql, [title, file, description, filter, startDate, endDate], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.status(200).send("Record inserted successfully!");
  });

  const shop = 'saddamhusain78009.myshopify.com';
  const accessToken = 'shpua_ac49611e6c4cc67f563383888472c408';
  const themeId = 147044761902;
  const assetKey = 'sections/main-product.liquid';
  const assetValue = `<div class="claim_nft"style="background:blue;padding:10px 40px; width:300px;margin-left:50px;"><h2 style="color:white">${title}</h2><img src="${file}"/><h5 style="color:white">${filter}</h5><button style="background:black; color:white">Claim NFT</button></div>`;
  
  // Retrieve the existing asset's content
  const getAssetUrl = `https://${shop}/admin/api/2021-10/themes/${themeId}/assets.json?asset[key]=${assetKey}`;
  axios.get(getAssetUrl, {
    headers: {
      'X-Shopify-Access-Token': accessToken,
    },
  })
    .then(response => {
      const asset = response.data.asset;
      const existingAssetValue = asset.value; // Get the existing asset value
      const newAssetValue = existingAssetValue + assetValue; // Append the new content
      
      // Update the asset's content
      const putAssetUrl = `https://${shop}/admin/api/2021-10/themes/${themeId}/assets.json`;
      axios.put(putAssetUrl, {
        asset: {
          key: assetKey,
          value: newAssetValue,
        },
      }, {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      })
        .then(response => {
          console.log(response.data);
          console.log(`Updated asset with key '${assetKey}'`);
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    })
    .catch(error => {
      console.log(error.response.data.errors);
    });


});

app.delete('/postdata/:id', (req, res) => {
  const id = req.params.id;
  // Delete the NFT with the specified ID from the MySQL database
  databaseData.query('DELETE FROM npt_table WHERE id = ?', id, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.sendStatus(500); // Send a 500 Internal Server Error response
    } else {
      res.sendStatus(200); // Send a 200 OK response
    }
  });
});
// app.put("/data",(req,res)=>{

//    var title = req.body.post.title;
//     var file =  req.body.post.file;
//      var  description =  req.body.post.description;
//      var filter=   req.body.post.filter;
//      var startDate =   req.body.post.startDate;
//      var endDate =  req.body.post.endDate;
//     databaseData.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         var sql = "UPDATE npt_table SET `title` = '"+title+"', `file` = '"+file+"', `discripton` = '"+description+"', `filter` = '"+startDate+"',`startDate` = '"+startDate+"',`endDate`='"+endDate+"', WHERE `title` = '"+title+"'";
//         databaseData.query(sql, function (err, result) {
//           if (err) throw err;
//           console.log("1 record inserted");
//         });
//       });
    // const q =
    //   "UPDATE npt_table SET `title` = '"+title+"', `file` = '"+file+"', `discripton` = '"+description+"', `filter` = '"+startDate+"',`startDate` = '"+startDate+"',`endDate`='"+endDate+"', WHERE `title` = '"+title+"'";
  
    // // const values = [
    // //     req.body.post.title,
    // //     req.body.post.file,
    // //     req.body.post.description,
    // //     req.body.post.filter,
    // //     req.body.post.startDate,
    // //     req.body.post.endDate
    // // ];
  
    // databaseData.query(q, (err) => {
    //   if (err) return res.json(err);
  
    //   return res.status(200).json("Usuário atualizado com sucesso.");
    // });
// })
    // var title = req.body.post.title;
    // var file = req.body.post.file;
    // var description = req.body.post.description;
    // var filter = req.body.post.filter;
    // var start_date = req.body.post.startDate;
    // var endDate = req.body.post.endDate;
    // console.log(title,start_date,end_date)
    // databaseData.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     var sql = `INSERT INTO npt_table (title, discripton,start_date,end_date) VALUES ('${title}', '${nftImage}','${start_date}','${end_date}')`;
    //     databaseData.query(sql, function (err, result) {
    //       if (err) throw err;
    //       console.log("1 record inserted");
    //     });
    //   });
  
    // console.log("working fine",title,file,description,filter,start_date,)
//})
    // app.get('/post', function (req, res, next) {
    //     databaseData.connect(function(err) {
    //         if (err) throw err;
    //         databaseData.query("SELECT * FROM npt_table", function (err, result, fields) {
    //           if (err) throw err;
    //         //   console.log(result);
    //              dataGet(result);
    //         });
    //         console.log(arrayData)
    //       });
   
    //   })
    const getUsers = (_, res) => {
        const q = "SELECT * FROM npt_table";
      
        databaseData.query(q, (err, data) => {
          if (err) return res.json(err);
      
          return res.status(200).json(data);
        });
      };
      app.get("/postdata", getUsers);



// const token = 'shpua_ac49611e6c4cc67f563383888472c408';
// const shop = 'saddamhusain78009';
// let themeId = 146755485998;
// const axios = require('axios');

app.listen(3001, () => {
console.log("running on port 3001")
})


