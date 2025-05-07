import { Hotel } from "../models/hotel.models.js";

export const getAllHotels = async () => {
  try {
    const hotels = await Hotel.find();
    if (!hotels) {
      throw new Error("No hotels found in db!");
    }
    return hotels;
  } catch (error) {
    throw error;
  }
};

export const addHotel = async (newHotel) => {
  try {
    if (!newHotel) {
      throw new Error("Please provide data!");
    }
    const newHotelData = new Hotel(newHotel);
    await newHotelData.save();
    return newHotelData;
  } catch (error) {
    throw error;
  }
};

export const deleteHotelById = async (hotelId) => {
  try {
    if (!hotelId) {
      throw new Error("Hotel Id not present");
    }
    const deleteHotel = await Hotel.findByIdAndDelete(hotelId);
    return deleteHotel;
  } catch (error) {
    throw error;
  }
};
