const express = require("express");
const bodyParser = require("body-parser");

const {
  getStoredTransactions,
  storeTransactions,
} = require("./data/transactions");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/transactions", async (req, res) => {
  const storedTransactions = await getStoredTransactions();
  res.json({ transactions: storedTransactions });
});

app.listen(8080);
