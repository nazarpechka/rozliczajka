const app = require("./config/app");
const db = require("./config/db");

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await db.connect();
  console.log(`Rozliczajka is running on ${PORT} port`);
});
