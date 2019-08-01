const express = require("express");
const router = express.Router();

const TodoItem = require("../models/TodoItem");

const getItems = async res => {
  const items = await TodoItem.find({ deleted: false });
  return res.status(200).json(items);
};

router.get("/getItems", async (req, res) => {
  await getItems(res);
});

router.post("/createItem", async (req, res) => {
  const { content, deadline } = req.body;
  const newItem = new TodoItem({ content, deadline });

  await newItem.save();

  await getItems(res);
});

router.post("/updateItem", async (req, res) => {
  const { _id, status, content, deadline } = req.body;

  const item = await TodoItem.findOne({ _id });
  if (status) {
    item.status = status;
  }
  item.content = content;
  item.deadline = deadline;
  item.updatedDate = new Date();

  await item.save();

  await getItems(res);
});

router.post("/deleteItem", async (req, res) => {
  const { _id } = req.body;
  const item = await TodoItem.findOne({ _id });
  item.deleted = true;
  await item.save();

  await getItems(res);
});

module.exports = router;
