const { response } = require("express");
const db = require("../models/queries");

exports.renderDevelopers = async (req, res) => {
  const developers = await db.getDevelopers();
  res.render("developer", { title: "Developer", developers });
};

exports.renderEditDevelopers = async (req, res) => {
  const developerId = req.params.id;
  const developer = await db.getDeveloperById(developerId);
  res.render("editDev", { title: "Edit Developer", developer });
};

exports.renderAddDeveloper = async (req, res) => {
  res.render("addNewDev", { title: "Add New Developer" });
};

exports.postUpdateDeveloper = async (req, res) => {
  const developerId = Number(req.params.id);
  const { name } = req.body;
  try {
    const developer = await db.updateDeveloper(developerId, name);
    res.redirect("/developers");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// exports.postAddNewDeveloper = async (req, res) => {
//   const { name } = req.body;
//   try {
//     await db.createDeveloper(name);
//     res.redirect("/developers");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// };

// // Delete game
// exports.deleteDeveloper = async (req, res) => {
//   const developerId = Number(req.params.id);

//   if (!Number.isInteger(developerId)) {
//     return res.status(400).send("Invalid developer ID");
//   }

//   try {
//     const isDeleted = await db.deleteDeveloper(developerId);

//     if (!isDeleted) {
//       return res.status(404).send("Developer not found");
//     }
    
//     res.redirect("/developers");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// };
