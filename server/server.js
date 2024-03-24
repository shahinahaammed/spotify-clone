const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'https://localhost:3000',
    clientId: 'b8a8d6f9fe554b2186fce973d53eac25',
    clientSecret: 'e8a86331dc5a44829c8830e1c8fd3e18'
});

app.post('/login', (req, res) => {
    const code = req.body.code;
    
    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            });
        })
        .catch(err => {
            console.error('Error getting tokens:', err);
            res.sendStatus(400);
        });
});

app.listen(3001)