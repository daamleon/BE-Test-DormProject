const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors()); // Tambahkan CORS agar API bisa diakses dari domain lain
server.use(middlewares);

// Middleware untuk logging request
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware untuk membatasi akses perubahan data pada /users
server.use((req, res, next) => {
  if (
    req.path.startsWith("/users") &&
    ["POST", "PUT", "DELETE"].includes(req.method)
  ) {
    return res
      .status(403)
      .json({ message: "Akses terbatas pada endpoint ini" });
  }
  next();
});

// Gunakan router JSON Server
server.use(router);

// Middleware untuk menangani 404 jika endpoint tidak ditemukan
server.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on port ${PORT}`);
});
