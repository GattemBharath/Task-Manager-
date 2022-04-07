const { findOneAndDelete } = require("../models/Task");
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res.status(200).json({ tasks, amount: tasks.length });
  // res
  //   .status(200)
  //   .json({ status: "success", data: { tasks, nbHits: tasks.length } });

  //res.status(500).json({ msg: error });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });

  //res.status(500).json({ msg: error });
});

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      //! IF ID DOESN'T MATCH (BUT SAME NO. OF CHARS)
      // const error = new Error("Not Found");
      // error.status = 404;
      return res.status(404).json({ msg: `No task with id : ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    //! IF NO. OF CHARS IN THE ID DOES NOT MATCH
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` });
    }
    res.status(200).json({ task });
    // res.status(200).send();
    // res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// const editTask = async (req, res) => {
//   try {
//     const { id: taskId } = req.params;
//     const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
//       new: true,
//       runValidators: true,
//       overwrite: true,
//     });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id : ${taskId}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  // editTask,
};
