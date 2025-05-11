import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Plant } from "../utils/types";

interface FavoritesProps {
  plant: Plant | undefined;
  handleFavorites: (plant: Plant) => void;
  favorites: Plant[];
}

export const FavoriteIcon: React.FC<FavoritesProps> = ({
  plant,
  handleFavorites,
  favorites,
}) => {
  return (
    <button onClick={() => plant && handleFavorites(plant)}>
      {plant && favorites.find((item: Plant) => item.id === plant.id) ? (
        <div title={"Retirer des favoris"}>
          <FaHeart color={"orange"} size={22} />
        </div>
      ) : (
        <div title={"Ajouter aux favoris"}>
          <FaRegHeart color={"orange"} size={16} />
        </div>
      )}
    </button>
  );
};
