import express from "express";

const app = express();
app.use(express.json());

const PORT = 8000;
const HOST = "192.168.29.179";

const data = {
  firstName: "Alex",
  lastName: "Lee",
  email: "alexlee@gmail.com",
  address: {
    addr1: "123, Park Avenue Road",
    addr2: "Bay Area, LA",
    city: "Bay Area",
    zip: "7654321",
    countryState: "India",
  },
  contactDetails: [
    {
      countryCode: 0,
      phoneNumber: "9876543210",
    },
    {
      countryCode: 1,
      phoneNumber: "9876543210",
    },
  ],
};

app.get("/api/userdetails", (req, res) => {
  res.send(data);
});

app.post("/api/submituser", (req, res) => {
  const fulldata = req.body.fulldata;
  console.log(fulldata);
  res.send(fulldata);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});
