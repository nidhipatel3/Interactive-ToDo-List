const express = require("express");

const app = express();
const PORT = 9001;

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));