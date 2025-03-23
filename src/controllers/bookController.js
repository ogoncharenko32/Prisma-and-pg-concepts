import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../services/bookService.js";

export async function addBookController(req, res) {
  try {
    const { title, publishedDate, authorId } = req.body;
    const book = await addBook(title, new Date(publishedDate), authorId);
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

export async function getAllBooksController(req, res) {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

export async function getBookByIdController(req, res) {
  try {
    const { id } = req.params;
    const book = await getBookById(parseInt(id));

    if (!book) {
      return res
        .status(404)
        .json({ error: "Book not found", message: error.message });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

export async function updateBookController(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedBook = await updateBook(parseInt(id), title);
    if (!updatedBook) {
      return res
        .status(404)
        .json({ error: "Book not found", message: error.message });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}
export async function deleteBookController(req, res) {
  try {
    const { id } = req.params;
    const deletedBook = await deleteBook(parseInt(id));
    res.status(200).json(deletedBook);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}
