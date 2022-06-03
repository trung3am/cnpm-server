const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const model = require('./model.js')
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL)
const app = express();
app.use(cors());
app.use(bodyParser.json());

const auth = (token)=>{
  try {
    jwt.verify(token,'cnpm');
    return true;
  } catch (e) {
    return false;
  }
}


app.get('/table', async (req,res)=>{
  const table = await model.getTable();
  res.status(200).send(table)
})

app.get('/menu', async (req,res)=>{
  const menu = await model.getMenu();
  res.status(200).send(menu)
})

app.post('/createfood', async (req,res)=>{
  if(!auth(req.body.token)) {
    res.status(400).send("unauthorized");
    return;
  }
  const food = req.body.food;
  await model.createFood(food);
  res.status(200).send("OK");
})

app.post('/login', async (req,res)=>{
  if(!req.body || !req.body.username || !req.body.password){
    res.status(400).send("bad request");
    return;
  }
  const username = req.body.username;
  const password = req.body.password;

  const result = await model.login(username,password);
  if(result) res.status(200).send(jwt.sign({username:username},'cnpm'));
  if(!result) res.status(400).send('cannot login')
});

app.post('/createtable', async (req,res)=> {
  if(!auth(req.body.token)) {
    res.status(400).send("unauthorized");
    return;
  }
  const table = req.body.table;
  if(!table || !table.maxGuest ){
    res.status(400).send("bad request");
    return;
  }
  await model.createTable(table);
  res.status(200).send("OK")
})

app.get('/order', async (req,res)=> {
  const order = await model.getOrder();
  res.status(200).send(order);
})

app.post('/createorder', async (req,res)=> {
  const order = req.body;
  if(!order || !order.food){
    res.status(400).send("bad request")
    return;
  }
  await model.createOrder(order);
  res.status(200).send("OK")
})

app.put('/order/edit', async (req,res) => {
  if(!auth(req.body.token)) {
    res.status(400).send("unauthorized");
    return;
  }
  const order = req.body.order;
  if(!order) {
    res.status(400).send("bad request");
    return;
  }
  const ans = await model.editOrder(order);
  if (ans) {
    res.status(200).send("OK");
  } else {
    res.status(400).send("bad request");
  }
})

app.put('/food/edit', async (req,res) => {
  if(!auth(req.body.token)) {
    res.status(400).send("unauthorized");
    return;
  }
  const food = req.body.food;
  
  if(!food) {
    res.status(400).send("bad request");
    return;
  }
  const ans = await model.editFood(food);
  if (ans) {
    res.status(200).send("OK");
  } else {
    res.status(400).send("bad request");
  }
})

app.put('/table/edit', async (req,res) => {
  if(!auth(req.body.token)) {
    res.status(400).send("unauthorized");
    return;
  }
  const table = req.body.table;
  if(!table) {
    res.status(400).send("bad request");
    return;
  }
  const ans = await model.editTable(table);
  if (ans) {
    res.status(200).send("OK");
  } else {
    res.status(400).send("bad request");
  }
})

app.listen(4000, ()=>{
  console.log('listen on 4k')
})