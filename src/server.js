// Inisialisasi server Hapi import routes
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// Inisialisasi server dengan port, host dan route
const init = async () => {
  const server = Hapi.server({
    port: 5000, // Port yang digunakan
    host: 'localhost', // Host yang digunakan
    routes: {
      cors: { // Menggunakan Cors
        origin: ['*'], // Memberikan hak akses ke semua client
      },
    },
  });

  // Memanggil route
  server.route(routes);

  // Menjalankan server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// Jika terjadi error pada proses yang dijalankan
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

// Memanggil fungsi init
init();
