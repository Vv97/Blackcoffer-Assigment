import express from "express";
// import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db.database";
import dashboardRouter from "./routes/Dashboard.routes";

const port = 8080;

const app = express();

// middleware
app.use(
  cors({
    credentials: true,
  })
);

// body parser
app.use(express.json());
app.get("/api", (req: express.Request, res: express.Response) => {
  res.status(200).send({ message: "Welcome" });
});

app.use("/api/dashboard", dashboardRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at ${port} port successfully`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to the database.", error);
  });
