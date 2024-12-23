import app from "./index.js";

// define the port
const PORT = 3000;

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
