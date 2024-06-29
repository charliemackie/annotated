import express from 'express'
import {authenticate, requestToken} from '../controllers/oauth.controller'

const oauthRouter = express.Router();

oauthRouter.post('/authenticate', authenticate);
oauthRouter.post('/callback', requestToken);

export default oauthRouter;