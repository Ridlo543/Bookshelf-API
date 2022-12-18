// mengimpor handler
const {
  addBook,
  getAllBook,
  getBookByID,
  updateBook,
  deleteBook,
} = require('./handler');

// mendefinisikan rute
const routes = [{
  method: 'POST', // method post untuk menambahkan data
  path: '/books', // rute akan di akses di '/books'
  handler: addBook, // saat di akses panggil addBook
},
{
  method: 'GET', // method get untuk mendapatkan data
  path: '/books', // rute akan di akses di '/books'
  handler: getAllBook, // saat di akses panggil getAllBook
},
{
  method: 'GET', // method get untuk mendapatkan data berdasarkan id
  path: '/books/{id}', // rute akan di akses di '/books/{id}'
  handler: getBookByID, // saat di akses panggil getBookByID
},
{
  method: 'PUT', // method put untuk memperbarui data
  path: '/books/{id}', // rute akan di akses di '/books/{id}'
  handler: updateBook, // saat di akses panggil updateBook
},
{
  method: 'DELETE', // method delete untuk menghapus data
  path: '/books/{id}', // rute akan di akses di '/books/{id}'
  handler: deleteBook, // saat di akses panggil deleteBook
},
];

// export routes
module.exports = routes;
