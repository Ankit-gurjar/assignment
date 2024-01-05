const expressAsynchandler = require("express-async-handler");
const Article = require("../models/articleModel");
const User = require("../models/usermodel");

const createNote = expressAsynchandler(async (req, res) => {
  const { articleName, isPublic, content } = req.body;
  var notedata = {
    articleName: articleName,
    isPublic: isPublic,
    content: content,
    articleOwner: req.user._id,
    // users: [req.user._id],
  };
  try {
    var createdNote = await Article.create(notedata);
    createdNote = await Article.findOne({ _id: createdNote._id });
    res.status(200).send(createdNote);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const accessNotes = expressAsynchandler(async (req, res) => {
  const { noteId } = req.body;
  try {
    const note = await Article.findOne({ _id: noteId });
    const { articleName, content } = note;
    res.status(200);
    res.send({ articleName, content });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchNotes = expressAsynchandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            {
              articleName: {
                $regex: req.query.search,
                $options: "i",
              },
            },
            {
              content: {
                $regex: req.query.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const users = await Article.find(keyword);
    res.send(users);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const featchUsersNotes = expressAsynchandler(async (req, res) => {
  try {
    const result = Article.find({
      articleOwner: req.user._id,
    });

    const users = await Article.find(result);
    res.send(users);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateNotes = expressAsynchandler(async (req, res) => {
  const { noteId, content } = req.body;

  const updatednote = await Article.findByIdAndUpdate(
    noteId,
    {
      content,
    },
    {
      new: true,
    }
  );

  if (!updatednote) {
    res.status(404);
    throw new Error("Note Not Found");
  } else {
    res.json(updatednote);
  }
});

const deleteNote = expressAsynchandler(async (req, res) => {
  const { noteId } = req.body;
  const present = await Article.findOne({ _id: noteId });
  if (present) {
    const deleted = await Article.deleteOne({ _id: noteId });
    res.status(200).send("Note Deleted");
  } else {
    res.status(404).send("Note Not Found");
  }
});

const shareNote = expressAsynchandler(async (req, res) => {
  const noteId = req.params.id;
  const { userId } = req.body;

  const notepresent = await Article.findOne({ _id: noteId });
  const userpresent = await User.findOne({ _id: userId });

  if (notepresent && userpresent) {
    let newMessage = userId;
    let result = await Article.findById(noteId);
    result.users.push(newMessage);
    await result.save();

    res.status(200).json(result);
  } else {
    res.status(404).send("Not Found");
  }
});

const sharedNotes = expressAsynchandler(async (req, res) => {
  try {
    Article.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, "-users");
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  createNote,
  accessNotes,
  fetchNotes,
  featchUsersNotes,
  updateNotes,
  deleteNote,
  shareNote,
  sharedNotes,
};
