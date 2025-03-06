const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Gunakan middleware bawaan
server.use(middlewares);

// Middleware untuk logging request
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware untuk autentikasi sederhana
server.use((req, res, next) => {
  if (req.path === "/users" && req.method !== "GET") {
    return res.status(403).json({ message: "Akses terbatas" });
  }
  next();
});

// Gunakan router JSON Server
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
