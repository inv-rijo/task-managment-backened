const dbConfig = require("./DbConfiguration");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

try{
    if(sequelize.authenticate){
        console.log('Db Connected');
    }else{
        console.log('Db Connection failed');
    }
}catch(err){

}

module.exports = sequelize;
