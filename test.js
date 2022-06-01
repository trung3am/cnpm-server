const mongoose = require('mongoose')
require('dotenv').config()
const fs = require('fs')
const Food = require('./food.model')
const Table = require('./table.model')
const str = fs.readFileSync('menu.json','utf-8')
mongoose.connect(process.env.MONGODB_URL)
const data = JSON.parse(str)

const tables = JSON.parse(fs.readFileSync('table.json', 'utf-8'))


async function seedfood() {
  for (let i = 0; i < 8; i++)  {
    let food = {
      id: "FOOD" + i,
      name: data.name[i],
      description: data.description[i],
      price: data.price[i],
      status: true,
      type: [data.type[i]],
      image: data.img[i]
    }
    // console.log(food)
    await Food.insertMany(food);
    
  }
}

async function seedtable() {
  for (let i = 0; i < 5; i++) {
    let table = {
      id: "TABLE"+ i,
      areaId: tables.areaId[i],
      maxGuest: tables.maxGuest[i],
      status: tables.status[i]
    }
    await Table.insertMany(table)
    
  }
}

// Table.deleteMany({}).then(console.log("OK")).catch(e=>console.log(e))

// seedtable()

async function a () {
  try {
    const a = await Food.findById("62907e298a39de129dcf5487")
  console.log(a)
  } catch (e) {
    console.log(e)
  }
}

a()