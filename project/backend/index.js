const express = require('express')
const app = express()
const path = require('path')
const port = 5000
var cors = require('cors')



app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log("Backend reciever start **********")
    console.log("Type:  "+req.method)
    console.log("URL:  "+req.path);
    console.log("DATA:  "+req.body);
    console.log("Backend reciever end ******")
    next();
})
const usersroute=require("./routes/users");
const editroute=require("./routes/editbc");
const qapgroute=require("./routes/qapg");
const tpproute=require("./routes/tpp");


app.use("/users",usersroute);
app.use("/editbc",editroute);
app.use("/qapg",qapgroute);
app.use("/tpp",tpproute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})