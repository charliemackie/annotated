import querystring from 'querystring';
import axios from 'axios';

function login(): String {
  const loginUrl = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: process.env.SCOPES,
    redirect_uri: process.env.REDIRECT_URI,
    show_dialog: true
  });
  return loginUrl;
} 

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

interface ErrorResponse {
  error: string;
}

interface SpotifyAuthRequest {
  body: {
    code: any
  }
}

const callback = async (req: SpotifyAuthRequest): Promise<TokenResponse | ErrorResponse> => {
  try {
    const code = req.body.code;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
      }
    };
    const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
    if (response.status === 200) {
      const body = response.data;
      return { access_token: body.access_token, refresh_token: body.refresh_token };
    } else {
      throw new Error(`Unexpected status code ${response.status}`);
    }
  } catch (error) {
    const errorResponse = '/#' + querystring.stringify({ error: 'invalid_token' });
    return { error: errorResponse };
  }
};

export {login, callback};
