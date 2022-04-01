import express, { Response, Application } from "express";
import server from "./server";
import UserRoute from "./routes/UserRoute";
import SubmissionRouter from './routes/SubmissionRoute'
import TestRouter from './routes/TestRoute'
const app: Application = express();
const port = 8080;

app.use(express.json());

app.get("/", (_, res: Response) =>
  res.send("Welcome to the Mongoose & TypeScript example")
);

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/tests", TestRouter);
app.use("/api/v1/submission", SubmissionRouter)

app.listen(port, () => {
  console.log(`Application started successfully on port ${port}.`);
  server();
});
