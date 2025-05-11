"use client";

//import { NavBar } from "@/app/components/NavBar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProfile } from "../../../utils/useProfile";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PLANT,
  GET_PLANTS,
  GET_PLANTS_BY_FILTER,
} from "../../../graphql/plants.graphql";
import { FiPlusCircle } from "react-icons/fi";
import { CustomModal } from "../../../components/CustomModal";
import Filters from "../../../components/Filters";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaHeart, FaPen, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import CreationForm from "../../../components/CreationForm";
import UpdateForm from "../../../components/UpdateForm";
import { Plant } from "../../../utils/types";
import { FavoriteIcon } from "../../../components/FavoriteIcon";
import { useRouter } from "next/navigation";

export default function Favoris() {
  const { user, role } = useProfile();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [plantToUpdate, setPlantToUpdate] = useState<number>();

  const storage = JSON.parse(localStorage.getItem("favorites") || "[]");
  const [favorites, setFavorites] = useState<Plant[]>(() => storage);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorites = (plant: Plant) => {
    const isInFavorites = favorites.find((item: Plant) => item.id === plant.id);
    console.log("isInFavorites", isInFavorites);
    if (isInFavorites === undefined) {
      const newFavorites = [...favorites, plant];
      setFavorites(newFavorites);
    } else {
      const newFavorites = favorites.filter(
        (item: Plant) => item.id !== plant.id
      );
      setFavorites(newFavorites);
    }
  };

  console.log("favorites", favorites);

  return (
    <div className="">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Retour
      </button>
      <div className="flex flex-wrap">
        {favorites?.length > 0 ? (
          favorites?.map((plant: Plant) => {
            return (
              <div
                key={plant.id}
                //href={`/plant/${plant.id}`}
                className="p-2 flex justify-center"
              >
                <div className="w-64 h-full relative flex flex-col justify-between border shadow-lg rounded-lg">
                  <div className="h-80 flex justify-center items-center">
                    {plant?.attributes?.images?.data.length > 0 ? (
                      <img
                        src={`http://localhost:1337${plant?.attributes?.images?.data[0]?.attributes?.url}`}
                        alt=""
                        className="h-80 w-full object-cover rounded-t-lg"
                      />
                    ) : (
                      <div>Pas d'image</div>
                    )}
                  </div>
                  <div className="mt-1 flex flex-row items-center justify-center text-center uppercase">
                    <div>{plant.attributes.name}</div>
                    {user?.id.toString() ===
                      plant?.attributes?.users_permissions_user?.data?.id && (
                      <div className="flex flex-row items-center justify-center">
                        <div
                          className="mx-3"
                          title="Modifier"
                          onClick={() => setPlantToUpdate(plant?.id)}
                        >
                          <FaPen />
                        </div>
                        <div title="Supprimer">
                          <FaTrashAlt />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <FavoriteIcon
                      plant={plant}
                      handleFavorites={handleFavorites}
                      favorites={favorites}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center w-full py-10 text-gray-400">
            Vous n'avez pas encore de favoris
          </div>
        )}
        <div className="w-1/4 h-96 p-2">
          <div
            className="h-full flex flex-col items-center justify-center border border-dashed border-grey-200 shadow-lg rounded-lg cursor-pointer"
            onClick={() => setIsOpenCreate(true)}
          >
            <div>Ajouter une plante</div>
            <FiPlusCircle size={56} />
          </div>
        </div>
      </div>
      {isOpenCreate && (
        <CustomModal
          isOpen={isOpenCreate}
          onClose={() => setIsOpenCreate(false)}
        >
          <CreationForm />
        </CustomModal>
      )}
      {plantToUpdate && (
        <CustomModal
          isOpen={plantToUpdate !== undefined}
          onClose={() => setPlantToUpdate(undefined)}
        >
          <UpdateForm
            plantToUpdate={plantToUpdate}
            close={() => setPlantToUpdate(undefined)}
            mode={""}
          />
        </CustomModal>
      )}
    </div>
  );
}
