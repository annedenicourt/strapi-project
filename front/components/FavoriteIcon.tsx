import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Plant } from "../utils/types";
import { useProfile } from "../utils/useProfile";

interface FavoritesProps {
  plant: Plant;
  handleFavorites: (plant: Plant) => void;
}

export function FavoriteIcon({ plant, handleFavorites }: FavoritesProps) {
  const { user } = useProfile();
  
  const isInFavorites = plant.attributes.favorite_users?.data?.some(
    (favorite_user) => favorite_user.id === user?.id?.toString()
  );

  return (
    <div
      className="cursor-pointer"
      onClick={() => handleFavorites(plant)}
    >
      {isInFavorites ? (
        <FaHeart size={24} color="red" />
      ) : (
        <FaRegHeart size={24} color="red" />
      )}
    </div>
  );
}
