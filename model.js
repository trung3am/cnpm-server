const Food = require('./food.model.js');
const Manager = require('./manager.model.js');
const Order = require('./order.model.js');
const Table = require('./table.model.js');


module.exports.createFood = async (food)=> {
  
  const id = await Food.countDocuments();
  food.id = "FOOD" + id;
  food.status = true;
  await Food.insertMany(food);
}

module.exports.editFood = async (food) => {
  try {
  const curFood = await Food.findOne({_id:food._id});
  curFood.status = food.status || curFood.status;
  curFood.name = food.name || curFood.name;
  curFood.price = food.price || curFood.price;
  curFood.description = food.description || curFood.description;
  curFood.image = food.image || curFood.image;
  curFood.type = food.type || curFood.type;
  await curFood.save();
  return true
  } catch (e) {
    return false
  }
}

module.exports.editTable = async (table) => {
  try {
  const curTable = await Table.findOne({_id:table._id});
  curTable.areaId = table.areaId || curTable.areaId; 
  curTable.maxGuest = table.maxGuest || curTable.maxGuest; 
  curTable.status = table.status || curTable.status;
  await curTable.save()
  return true;
  } catch (e) {
    return false;
  }
}

module.exports.editOrder = async (order) => {
  try {
  const curOrder = await Order.findOne({_id:order._id});
  curOrder.username = order.username || curOrder.username;
  curOrder.status = order.status || curOrder.status;
  curOrder.food = order.food || curOrder.food;
  curOrder.total = 0;
  curOrder.food.forEach(e => {
    curOrder.total+= e.price * e.quantity;
  });
  await curOrder.save();
  return true;
  } catch (e) {
    // console.log(e)
    return false;
  }
}

module.exports.getMenu = async ()=> {
  const menu = await Food.find();
  return menu;
}

module.exports.login = async (username, password) =>{
  const user = await Manager.findOne({username:username, password: password});
  if (!user) {
    return false;
  } else {
    return true;
  }

}

module.exports.getTable = async () => {
  const tables = await Table.find();
  return tables;
}

module.exports.createTable = async (table) =>{
  const id = await Table.countDocuments();
  table.id = "TABLE" + id;
  table.status = true;
  await Table.insertMany(table);
}

module.exports.getOrder = async () =>{
  return await Order.find();
}

module.exports.createOrder = async (order) => {
  const id = await Order.countDocuments();
  order.username = "Duy";
  order.id = "ORDER" + id;
  order.status = "PENDING"
  order.total = 0;
  order.food.forEach(e => {
    order.total+= e.price * e.quantity;
  });
  await Order.insertMany(order);
}

module.exports.cm = async () =>{
  Manager.create({username:"admin", password:"admin"});
}