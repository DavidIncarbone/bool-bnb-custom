import express from "express";
const router = express.Router();

import {
  index,
  show,
  store,
  storeComments,
  update,
  destroy,
} from "../controllers/apartmentController.js";
//Rotte

// Index - Read all
router.get("/", index);

// Show - Read one -
router.get("/:id", show);

//Store - Create
router.post("/", store);

// Store - Create review
router.post("/:id/comments", storeComments);

//Update - Update  totale
router.put("/:id", update);

// Modify - Update (partial)
// router.patch("/:id", (req, res) => {
//   res.send("Modifica parziale item con id: " + req.params.id);
// });

// Destroy - Delete
router.delete("/:id", destroy);

//export router
export default router;
