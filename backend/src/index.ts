import express, { Response, Application } from "express";
import server from "./server";
import cors from "cors";
import UserRoute from "./routes/UserRoute";
import TestRouter from "./routes/TestRoute";
import RecordRouter from "./routes/RecordRoute";
import TerminalRounter from "./routes/TerminalRoute";

const app: Application = express();
const port = 8080;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.get("/", (_, res: Response) =>
  res.send("Welcome to the Mongoose & TypeScript example")
);

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/tests", TestRouter);
app.use("/api/v1/records", RecordRouter);
app.use("/api/v1/compile", TerminalRounter);

app.listen(port, () => {
  console.log(`Application started successfully on port ${port}.`);
  server();
});
