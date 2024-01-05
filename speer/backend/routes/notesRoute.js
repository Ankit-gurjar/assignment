const express = require("express");
const {
  createNote,
  accessNotes,
  fetchNotes,
  featchUsersNotes,
  updateNotes,
  deleteNote,
  shareNote,
  sharedNotes,
} = require("../controlers/notecontroller");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

//createnotes accessnote fetchnotes renameheadding updatedata deletenote
router.route("/fetchusersnotes").get(protect, featchUsersNotes); //get a list of all notes for the authenticated user.
router.route("/").get(protect, accessNotes); //get a note by ID for the authenticated user.
router.route("/").post(protect, createNote); //create a new note for the authenticated user.
router.route("/updatenote").put(protect, updateNotes); //update an existing note by ID for the authenticated user.
router.route("/deletenote").delete(protect, deleteNote); //delete a note by ID for the authenticated user.
router.route("/:id").put(protect, shareNote); //share a note with another user for the authenticated user.
router.route("/fetchnotes").get(fetchNotes); //search for notes based on keywords for the authenticated user.
router.route("/sharednotes").get(protect, sharedNotes); //get a list of all shared notes .

module.exports = router;
