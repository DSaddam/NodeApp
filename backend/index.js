const crypto = require('crypto');
const nonce = require('nonce')();
const request = require('request-promise');
const querystring = require('querystring');
const databaseData = require('./db/demo_db_connection');

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

const forwardingaddress = "https://shopify.beyondclub.xyz/node";

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

app.post('/data',(req,res)=>{
    var title = req.body.post.title;
    var file =  req.body.post.file;
     var  description =  req.body.post.description;
     var filter=   req.body.post.filter;
     var startDate =   req.body.post.startDate;
     var endDate =  req.body.post.endDate;
       databaseData.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO npt_table (title, file,description,filter,startDate,endDate) VALUES ('${title}', '${file}','${description}','${filter}','${startDate}','${endDate}')`;
        databaseData.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
})
app.put("/data",(req,res)=>{

   var title = req.body.post.title;
    var file =  req.body.post.file;
     var  description =  req.body.post.description;
     var filter=   req.body.post.filter;
     var startDate =   req.body.post.startDate;
     var endDate =  req.body.post.endDate;
    databaseData.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "UPDATE npt_table SET `title` = '"+title+"', `file` = '"+file+"', `discripton` = '"+description+"', `filter` = '"+startDate+"',`startDate` = '"+startDate+"',`endDate`='"+endDate+"', WHERE `title` = '"+title+"'";
        databaseData.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
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
})
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
    app.listen(3003, () => {
    console.log("running on port 3003")
    })


