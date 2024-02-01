const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  'Tafkeer',
  'root',
  'sb32986710*/Tafkeer',
   {
     host: '127.0.0.1',
     dialect: 'mysql'
   }
 );
 sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.users = require("./User.model.js");

module.exports = db;
