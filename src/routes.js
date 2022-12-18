// mengimpor handler
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

// mendefinisikan rute
const routes = [{
  method: 'POST', // method post untuk menambahkan data
  path: '/books', // rute akan di akses di '/books'
  handler: addBookHandler, // saat di akses panggil addBookHandler
},
{
  method: 'GET', // method get untuk mendapatkan data
  path: '/books', // rute akan di akses di '/books'
  handler: getAllBooksHandler, // saat di akses panggil getAllBooksHandler
},
{
  method: 'GET', // method get untuk mendapatkan data berdasarkan id
  path: '/books/{id}', // rute akan di akses di '/books/{id}'
  handler: getBookByIdHandler, // saat di akses panggil getBookByIdHandler
},
{
  method: 'PUT', // method put untuk memperbarui data
  path: '/books/{id}', // rute akan di akses di '/books/{id}'
  handler: updateBookByIdHandler, // saat di akses panggil updateBookByIdHandler
},
{
  method: 'DELETE', // method delete untuk menghapus data
  path: '/books/{id}', // rute akan di akses di '/books/{id}'
  handler: deleteBookByIdHandler, // saat di akses panggil deleteBookByIdHandler
},
];

// export routes
module.exports = routes;
