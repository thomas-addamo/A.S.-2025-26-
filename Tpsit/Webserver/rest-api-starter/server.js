const express = require("express");
const app = express();

const itemsRoutes = require("./routes/items");

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Rotte
app.use("/api/items", itemsRoutes);

// Avvio server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server attivo su http://localhost:${PORT}`);
});
