import mysql, {} from "mysql2/promise";
let DB;
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test_overview",
};
const connect = async () => {
    try {
        DB = await mysql.createConnection(dbConfig);
    }
    catch (error) {
        console.error(error);
        setTimeout(connect, 5000);
    }
};
await connect();
export { DB };
//# sourceMappingURL=connection.js.map