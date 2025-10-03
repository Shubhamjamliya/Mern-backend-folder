
import http from "http";
import app from "./app.js";







// Create Server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
