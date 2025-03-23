import { addAuthor, deleteAuthor } from "../services/authorService.js";

export const addAuthorController = async (req, res) => {
  try {
    const { name } = req.body;

    const author = await addAuthor(name);

    res.status(201).json(author);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const deleteAuthorConrtoller = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await deleteAuthor(parseInt(id));
    res
      .status(200)
      .json({ message: `Author deleted with id: ${id}`, deletedAuthor });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
