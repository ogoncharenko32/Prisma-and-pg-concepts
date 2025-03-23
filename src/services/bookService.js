import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addBook(title, publishedDate, authorId) {
  try {
    const book = await prisma.book.create({
      data: {
        title,
        publishedDate,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
      include: {
        author: true,
      },
    });

    return book;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllBooks() {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,
      },
    });

    return books;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getBookById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    return book;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateBook(id, title) {
  try {
    // const book = await prisma.book.findUnique({
    //   where: {
    //     id,
    //   },
    //   include: {
    //     author: true,
    //   },
    // });

    // if (!book) {
    //   throw new Error(`Book with id ${id} not found`);
    // }

    // const updatedBook = await prisma.book.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     title,
    //   },
    //   include: {
    //     author: true,
    //   },
    // });

    const updatedBook = await prisma.$transaction(async (prisma) => {
      const book = await prisma.book.findUnique({
        where: {
          id,
        },
      });

      if (!book) {
        throw new Error(`Book with id ${id} not found`);
      }
      return prisma.book.update({
        where: {
          id,
        },
        data: {
          title,
        },
        include: {
          author: true,
        },
      });
    });

    return updatedBook;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteBook(id) {
  try {
    const deletedBook = await prisma.book.delete({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
    if (!deletedBook) {
      throw new Error(`Book with id ${id} not found`);
    }
    return deletedBook;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
