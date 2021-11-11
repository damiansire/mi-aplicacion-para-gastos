const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = 3000;

const transactions = [
  {
    transactionType: "Inversion",
    transactionDescription: "REGALO PARA SUBS",
    transactionAmount: "200000",
    transactionCategory: "REGALO",
    transactionId: 1,
  },
  {
    transactionType: "Ingreso",
    transactionDescription: "Alfajores",
    transactionAmount: "20",
    transactionCategory: "Comida",
    transactionId: 5,
  },
  {
    transactionType: "Egreso",
    transactionDescription: "Alquiler",
    transactionAmount: "5000",
    transactionCategory: "Alquiler",
    transactionId: 6,
  },
  {
    transactionType: "Egreso",
    transactionDescription: "Alquiler",
    transactionAmount: "5000",
    transactionCategory: "Alquiler",
    transactionId: 7,
  },
  {
    transactionType: "Egreso",
    transactionDescription: "Comida",
    transactionAmount: "500",
    transactionCategory: "Alquiler",
    transactionId: 8,
  },
];

app.get("/", (req, res) => {
  res.send(`Ok, ingresaron a localhost! ${port}`);
});

app.get("/transactions", (req, res) => {
  res.send(transactions);
});

app.get("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const selectedTransaction = transactions.filter(
    (transaction) => transaction.transactionId == transactionId
  );
  res.send(selectedTransaction);
});

app.post("/transactions", (req, res) => {
  //obteneme la transaccion que viene en la request
  //guardala en una variable llamada transaction
  const transaction = "Aca va la transaction que me vino";
  transactions.push(transaction);
  res.send("Todo ok");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
