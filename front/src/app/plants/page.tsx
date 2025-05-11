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
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import CreationForm from "../../../components/CreationForm";
import UpdateForm from "../../../components/UpdateForm";
import { Plant } from "../../../utils/types";
import { FavoriteIcon } from "../../../components/FavoriteIcon";
import { gruppo } from "../../../utils/fonts";
import { toast } from "react-toastify";

export default function Plants() {
  const { user, role } = useProfile();
  const [mode, setMode] = useState("");
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [plantToUpdate, setPlantToUpdate] = useState<number>();
  const [confirmDelete, setConfirmDelete] = useState<number>();
  //const storage = JSON.parse(localStorage.getItem("favorites") || "[]");
  //const [favorites, setFavorites] = useState<Plant[]>(() => storage);
  const [favorites, setFavorites] = useState<Plant[]>(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("favorites") || "[]");
      } catch {
        return [];
      }
    }
    return [];
  });

  /* const {
    loading,
    data: getPlantsData,
    error,
  } = useQuery(mode === "" ? GET_PLANTS : GET_PLANTS_BY_FILTER, {
    variables: mode === "" ? {} : { visibility: mode },
    fetchPolicy: "network-only", // Optionnel: force à refaire la requête au réseau
  }); */

  const {
    loading,
    data: getPlantsData,
    error,
    refetch,
  } = useQuery(GET_PLANTS_BY_FILTER, {
    variables: mode !== "" ? { visibility: mode } : {},
  });
  const plants = getPlantsData?.plants?.data;

  const [deletePlantMutation] = useMutation(CREATE_PLANT, {
    onCompleted: (data) => {
      toast.success("Suppression de plante réussie !");
      setConfirmDelete(undefined);
    },
    onError: (error) => {
      console.error("Delete error:", error.message);
      toast.error(
        "Nous n'avons pas pu supprmier votre plante, veuillez réessayer"
      );
    },
  });

  useEffect(() => {
    refetch(mode === "" ? {} : { visibility: mode });
  }, [mode, refetch]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorites = (plant: Plant) => {
    const isInFavorites = favorites.find((item: Plant) => item.id === plant.id);
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

  const handleDelete = async (plantId: number) => {
    console.log("Supprimer", plantId);
    /* await deletePlantMutation({
      variables: {
        input: {
          id: plantId,
          
        },
      },
      refetchQueries: [
        {
          query: GET_PLANTS,
        },
      ],
    }); */
  };
  console.log("mode", mode);
  return (
    <div className="">
      <div className={`${gruppo} w-full my-6 text-center text-5xl`}>
        Un monde de plantes
      </div>
      <div className="my-6">
        <Filters mode={mode} setMode={setMode} />
      </div>
      <div className="flex flex-wrap">
        {plants?.length > 0 ? (
          plants?.map((plant: Plant) => {
            return (
              <div key={plant.id} className="p-2 flex justify-center">
                <div className="w-64 h-full relative flex flex-col justify-between bg-white border shadow-lg rounded-lg">
                  <Link
                    className="group relative h-80 flex justify-center items-center"
                    href={`/plant/${plant.id}`}
                  >
                    {plant?.attributes?.images?.data.length > 0 ? (
                      <img
                        src={`http://localhost:1337${plant?.attributes?.images?.data[0]?.attributes?.url}`}
                        alt=""
                        className="h-80 w-full object-cover rounded-t-lg"
                      />
                    ) : (
                      <div>Pas d'image</div>
                    )}
                    <div className="absolute inset-0 hidden justify-center items-center group-hover:flex hover:bg-white/30 backdrop-invert backdrop-opacity-10 rounded-t-lg">
                      <FaEye color={"white"} size={20} />
                    </div>
                  </Link>
                  <div className="h-12 mt-1 flex flex-row items-center justify-center text-center uppercase">
                    <div>{plant.attributes.name}</div>
                    {user?.id.toString() ===
                      plant?.attributes?.users_permissions_user?.data?.id && (
                      <div className="flex flex-row items-center justify-center">
                        <div
                          className="mx-3 cursor-pointer"
                          title="Modifier"
                          onClick={() => setPlantToUpdate(plant?.id)}
                        >
                          <FaPen />
                        </div>
                        <div
                          className="cursor-pointer"
                          title="Supprimer"
                          onClick={() => setConfirmDelete(plant?.id)}
                        >
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
            Aucune plante trouvée
          </div>
        )}
        <div className="h-96 p-2">
          <div
            className="w-64 h-full flex flex-col items-center justify-center bg-white border border-dashed border-grey-200 shadow-lg rounded-lg cursor-pointer"
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
            mode={mode}
          />
        </CustomModal>
      )}
      {confirmDelete && (
        <CustomModal
          isOpen={confirmDelete !== undefined}
          onClose={() => setConfirmDelete(undefined)}
        >
          <div>
            <div>Voulez-vous vraiment supprimer cette plante ?</div>
            <div className="flex flex-row">
              <div onClick={() => setConfirmDelete(undefined)}>Annuler</div>
              <div onClick={() => handleDelete(confirmDelete)}>Confirmer</div>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
}
