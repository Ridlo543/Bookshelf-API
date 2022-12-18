const { nanoid } = require('nanoid'); // import nanoid
const books = require('./books'); // import books

// Fungsi untuk menambahkan buku
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Cek apakah nama sudah diisi
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  // Cek apakah readPage lebih kecil dari pageCount
  if (readPage >= pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  // Buat ID baru
  const id = nanoid(); // default value = 19
  // Cek apakah buku sudah selesai
  const finished = pageCount === readPage;
  // Buat objek buku baru
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Tambahkan buku baru ke array books
  books.push(newBook);
  // Cek apakah buku berhasil ditambahkan
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Jika berhasil
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }

  // Jika gagal
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Fungsi untuk menampilkan seluruh buku
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let bookList = [...books]; // copy array books

  // Cek apakah ada query parameters
  if (name || reading || finished) {
    // Jika ada query parameters
    // Cek apakah ada query name
    if (name) {
      bookList = bookList.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }
    // Cek apakah ada query reading
    if (reading) {
      if (reading === '1') {
        bookList = bookList.filter((book) => book.reading);
      } else {
        bookList = bookList.filter((book) => !book.reading);
      }
    }
    // Cek apakah ada query finished
    if (finished) {
      if (finished === '1') {
        bookList = bookList.filter((book) => book.finished);
      } else {
        bookList = bookList.filter((book) => !book.finished);
      }
    }
  }

  // Cek apakah array bookList kosong
  if (bookList.length === 0) {
    return h.response({
      status: 'success',
      data: {
        books: [],
      },
    }).code(200);
  }

  // Jika tidak kosong
  const responseBody = {
    status: 'success',
    data: {
      books: bookList.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  };
  return h.response(responseBody).code(200);
};

// Mendapatkan buku berdasarkan ID yang diberikan
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  // Cari buku di array books
  const book = books.find((b) => b.id === id);

  // Jika buku tidak ditemukan, kembalikan response 404
  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  // Jika buku ditemukan, kembalikan response dengan status success dan data buku
  const response = h.response({
    status: 'success',
    data: {
      book,
    },
  });
  response.code(200);
  return response;
};

// Handler untuk memperbarui buku berdasarkan ID
const updateBookByIdHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const { id } = request.params;

  const bookIndex = books.findIndex((bn) => bn.id === id);

  // Jika buku tidak ditemukan, kirim response error 404
  if (bookIndex < 0) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  // Jika nama buku tidak diisi, kirim response error 400
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }
  // Jika halaman yg sudah dibaca lebih dari total halaman buku, kirim response error 400
  if (readPage >= pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  // Cek apakah buku sudah selesai dibaca
  const finished = pageCount === readPage;

  // Update buku
  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt: new Date().toISOString(),
  };

  // Kirim response berhasil
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
    data: {
      book: books[bookIndex],
    },
  });

  response.code(200);
  return response;
};

// Menghapus buku berdasarkan id
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  // Mencari index buku yang memiliki id yang diminta
  const bookIndex = books.findIndex((bn) => bn.id === id);

  // Jika buku tidak ditemukan
  if (bookIndex < 0) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  // Menghapus buku berdasarkan index yang ditemukan
  books.splice(bookIndex, 1);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });

  response.code(200);
  return response;
};

// export method
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
