import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/api/v1/users/login', (req: Request, res: Response) => {
  res.send(req.body.accessToken);
});
