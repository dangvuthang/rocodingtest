import { submissionRouter } from './routes/SubmissionRoute'
import { testRouter } from './routes/TestRoute'
import express from 'express';

const app = express()

app.use("/api/v1/tests", testRouter);

app.use("/api/v1/submission",submissionRouter)

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})