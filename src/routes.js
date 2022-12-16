const {
  createBook, getBooks, getBook, updateBook, deleteBook,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    /*
    fitur query parameters
    - ?name:  Tampilkan seluruh buku yang mengandung nama berdasarkan
              nilai yang diberikan pada query ini.
    - ?reading: Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang
                sedang tidak dibaca (reading: false).
                Bila 1, maka tampilkan buku yang sedang dibaca (reading: true).
                Selain itu, tampilkan buku baik sedang dibaca atau tidak.
    - ?finished : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang
                  sudah belum selesai dibaca (finished: false).
                  Bila 1, maka tampilkan buku yang sudah selesai dibaca (finished: true).
                  Selain itu, tampilkan buku baik yang sudah selesai atau belum dibaca.
    */
    handler: (request, reply) => { // eslint-disable-line
      const { name, reading, finished } = request.query;
      let books = getBooks();
      if (name) {
        books = books.filter((book) => book.title.toLowerCase().includes(name.toLowerCase()));
      }
      if (reading) {
        books = books.filter((book) => (book.reading ? reading === '1' : reading === '0'));
      }
      if (finished) {
        books = books.filter((book) => (book.finished ? finished === '1' : finished === '0'));
      }
      reply.send(books);
    },
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBook,
  },
  {
    method: 'POST',
    path: '/books',
    handler: createBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routes;
