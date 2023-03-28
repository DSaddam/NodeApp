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

const forwardingaddress = "https://eaf3-2405-204-140f-cc78-dd3a-2807-485c-b793.in.ngrok.io";

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
            GetAccessToken(accessToken, shop);
            console.log("accessToken:", accessToken);
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


function GetAccessToken(access_token_value, shop_domain) {
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': `https://${shop_domain}/admin/api/2023-01/themes/146755485998/assets.json?asset[key]=sections/main-product.liquid`,
    'headers': {
      'X-Shopify-Access-Token': `${access_token_value}`,
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    // console.log(response.body);
    const body = JSON.parse(response.body);
    // Assuming the response body is a JSON object
    var themeId_value = body.asset.theme_id;
    // console.log(themeId,shop_domain,access_token_value);
    const query = `INSERT INTO nftaccess (shop_name, accessToken, themeId) VALUES (?, ?, ?)`;
    const values = [shop_domain, access_token_value, themeId_value]; // Change the column names to match your database

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


  const q = "SELECT shop_name, accessToken, themeId FROM nftaccess LIMIT 1";


  databaseData.query(q, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    const shop_value = data[0].shop_name;
    const access_token_value = data[0].accessToken;
    const themeId_value = data[0].themeId;
    console.log(shop_value, access_token_value, themeId_value);

    claimNft(shop_value, access_token_value, themeId_value, title, file,);
  });
  databaseData.end();

});
function claimNft(shop_value, access_token_value, themeId_value, title, file, filter) {

  const shop = `${shop_value}`;
  const accessToken = `${access_token_value}`;
  const themeId = themeId_value;
  const assetKey = 'sections/main-product.liquid';
  const assetValue = `<div class="claim_nft"style="background:blue;padding:10px 40px; width:300px;margin-left:50px;margin-bottom:29px;"><h2 style="color:white">${title}</h2><img src="${file}"/><h5 style="color:white">${filter}</h5><button style="background:black; color:white">Claim NFT</button></div>`;

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
}



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

const getUsers = (_, res) => {
  const q = "SELECT * FROM npt_table";

  databaseData.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
app.get("/postdata", getUsers);
app.listen(7086, () => {
  console.log("running on port 7086")
})


