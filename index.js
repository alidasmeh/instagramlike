let app = require("./app");

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`server is run successfully on : ${PORT}`));