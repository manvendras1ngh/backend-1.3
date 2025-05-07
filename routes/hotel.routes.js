import express from "express";

import asyncHandler from "../utils/asyncWrapper.js";
import {
  getAllHotels,
  addHotel,
  deleteHotelById,
} from "../controllers/hotel.controllers.js";

const router = express();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (!req.body) {
      res.status(400).json({
        message: "Please provide data to add",
        error: "Data not present",
      });
    }
    const addNewHotel = await addHotel(req.body);
    res
      .status(200)
      .json({ message: "Hotel added successfully", data: addNewHotel });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const hotels = await getAllHotels();
    if (!hotels) {
      return res
        .status(404)
        .json({ message: "No hotel data found", error: "Hotel data empty!" });
    }
    res.status(200).json({ message: "Got all hotels", data: hotels });
  })
);

router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const deleteById = await deleteHotelById(req.params.id);
    if (!deleteById) {
      return res.status(404).json({
        message: "Hotel with given id not found.",
        error: "Hotel not found!",
      });
    }
    res.status(200).json({ message: "Hotel deleted", data: deleteById });
  })
);
export default router;
