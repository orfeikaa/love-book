const express = require('express')
const config = require('config')
const db = require("./models");
const cors = require("cors");



const app = express()
db.sequelize.sync();
app.use(cors());

const PORT = config.get('PORT') || 5000
app.use(express.json({ extended: true }))
require("./routes/person.routes")(app);
require("./routes/book.routes")(app);
require("./routes/author.routes")(app);
require("./routes/publisher.routes")(app);
require("./routes/category.routes")(app);
require("./routes/genre.routes")(app);


async function start() {
    try {

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch(e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start();

