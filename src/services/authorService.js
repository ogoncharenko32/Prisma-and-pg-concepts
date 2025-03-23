import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addAuthor(name) {
  try {
    const author = await prisma.author.create({
      data: {
        name,
      },
    });

    return author;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAuthor(id) {
  try {
    const deletedAuthor = await prisma.author.delete({
      where: {
        id,
      },
      include: {
        books: true,
      },
    });
    if (!deletedAuthor) {
      throw new Error(`Author with id ${id} not found`);
    }
    return deletedAuthor;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
