import { Sequelize } from "sequelize"
import { configDotenv } from "dotenv"

configDotenv();

const databaseURL = process.env.DATABASE_URL;

if(!databaseURL){
    console.log("Database url not found, database connection failed.");
}


const sequelize = new Sequelize(databaseURL);


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// (async () => {
//   await sequelize.sync({ force: true });
//   console.log('Tables created with foreign keys');
// })();

export default sequelize;