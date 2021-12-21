const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = 3000;

const transactions = [
  {
    transactionType: "Egreso",
    transactionDescription:
      "2,2 kg Manzana Roja marca: las Delicoas en tienda inglesa",
    transactionAmount: "4.75",
    transactionCategory: "Comida",
    transactionId: 1,
  },
  {
    transactionType: "Egreso",
    transactionDescription: "1kg Banana marca: El Ecuador en tienda inglesa",
    transactionAmount: "20",
    transactionCategory: "Comida",
    transactionId: 5,
  },
  {
    transactionType: "Egreso",
    transactionDescription: "1kg Manzana roja marca: el emigrante en superToti",
    transactionAmount: "0.60",
    transactionCategory: "Comida",
    transactionId: 6,
  },
  {
    transactionType: "Egreso",
    transactionDescription: "Alfajor dulce de leche agua helada",
    transactionAmount: "1",
    transactionCategory: "Antojos",
    transactionId: 7,
  },
  {
    transactionType: "Egreso",
    transactionDescription: "Me tire en paracaidas",
    transactionAmount: "800",
    transactionCategory: "Diversion",
    transactionId: 8,
  },
  {
    transactionType: "Egreso",
    transactionDescription: "Una fruta parecida a una Manzana redondita",
    transactionAmount: "20",
    transactionCategory: "Comida",
    transactionId: 9,
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
