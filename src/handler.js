const nanoid = require('nanoid');
const books = require('./books');

const createBook = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const book = {
    id: nanoid(),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Client tidak melampirkan properti name pada request body
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  try {
    // buku berhasil dimasukkan
    books.push(book);
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: book.id,
      },
    }).code(201);
  } catch (err) {
    // Server gagal memasukkan buku karena alasan umum (generic error).
    return h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    }).code(500);
  }
};

/**
menampilkan seluruh buku yang disimpan
Jika belum terdapat buku yang dimasukkan, server bisa merespons dengan array books kosong
 */
const getBooks = (request, h) => {
  if (books.length === 0) {
    return h.response({
      status: 'success',
      data: {
        books: [],
      },
    }).code(200);
  }
  return h.response({
    status: 'success',
    data: books,
  }).code(200);
};

// menampilkan seluruh buku yang disimpan berdasar id
const getBook = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((b) => b.id === bookId);

  // Bila buku dengan id yang dilampirkan oleh client tidak ditemukan
  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  // Bila buku dengan id yang dilampirkan ditemukan
  return h.response({
    status: 'success',
    data: book,
  }).code(200);
};

// mengubah data buku berdasarkan id
const updateBook = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const book = books.find((b) => b.id === bookId);

  // Id yang dilampirkan oleh client tidak ditemukkan oleh server
  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  // Client tidak melampirkan properti name pada request body
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  try {
    book.name = name;
    book.year = year;
    book.author = author;
    book.summary = summary;
    book.publisher = publisher;
    book.pageCount = pageCount;
    book.readPage = readPage;
    book.finished = pageCount === readPage;
    book.reading = reading;
    book.updatedAt = new Date().toISOString();

    // Bila buku berhasil diperbarui
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  } catch (err) {
    return h.response({
      // (generic error)
      status: 'error',
      message: 'Buku gagal diperbarui',
    }).code(500);
  }
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = books.findIndex((b) => b.id === bookId);

  // Bila id yang dilampirkan tidak dimiliki oleh buku manapun
  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  try {
    books.splice(bookIndex, 1);
    return h.response({
      // Bila id dimiliki oleh salah satu buku
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  } catch (err) {
    return h.response({
      // generic error
      status: 'error',
      message: 'Buku gagal dihapus',
    }).code(500);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
