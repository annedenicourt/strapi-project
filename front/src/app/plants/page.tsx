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
  DELETE_PLANT,
  GET_MY_PLANTS,
  GET_ALL_PLANTS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  GET_MY_FAVORITE_PLANTS,
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
  const [plantToDelete, setPlantToDelete] = useState<number>();

  const {
    loading,
    data: getPlantsData,
    error,
    refetch,
  } = useQuery(mode === "owner" ? GET_MY_PLANTS : mode === "favorites" ? GET_MY_FAVORITE_PLANTS : GET_ALL_PLANTS, {
    variables: { 
      userId: user?.id?.toString()
    }
  });
  const plants = getPlantsData?.plants?.data;

  const [addToFavorites] = useMutation(ADD_TO_FAVORITES, {
    onCompleted: () => {
      toast.success("Plante ajoutée aux favoris !");
      refetch();
    },
    onError: (error) => {
      console.error("Add to favorites error:", error.message);
      toast.error("Erreur lors de l'ajout aux favoris");
    },
  });

  const [removeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES, {
    onCompleted: () => {
      toast.success("Plante retirée des favoris !");
      refetch();
    },
    onError: (error) => {
      console.error("Remove from favorites error:", error.message);
      toast.error("Erreur lors du retrait des favoris");
    },
  });

  const handleFavorites = async (plant: Plant) => {
    if (!user) {
      toast.error("Vous devez être connecté pour gérer vos favoris");
      return;
    }

    const currentFavoriteUsers = plant.attributes.favorite_users?.data || [];
    const isInFavorites = currentFavoriteUsers.some(
      (favorite_user) => favorite_user.id === user.id.toString()
    );

    try {
      if (!isInFavorites) {
        const newFavoriteUsers = currentFavoriteUsers.map(user => user.id);
        newFavoriteUsers.push(user.id.toString());
        
        await addToFavorites({
          variables: {
            id: plant.id.toString(),
            input: {
              favorite_users: newFavoriteUsers
            }
          },
        });
      } else {
        const newFavoriteUsers = currentFavoriteUsers
          .filter(user => user.id !== user.id.toString())
          .map(user => user.id);
          
        await removeFromFavorites({
          variables: {
            id: plant.id.toString(),
            input: {
              favorite_users: newFavoriteUsers
            }
          },
        });
      }
    } catch (error) {
      console.error("Favorites error:", error);
      toast.error("Une erreur est survenue lors de la gestion des favoris");
    }
  };

  const [deletePlantMutation] = useMutation(DELETE_PLANT, {
    onCompleted: (data) => {
      toast.success("Suppression de plante réussie !");
      setPlantToDelete(undefined);
    },
    onError: (error) => {
      console.error("Delete error:", error.message);
      toast.error(
        "Nous n'avons pas pu supprimer votre plante, veuillez réessayer"
      );
    },
  });

  useEffect(() => {
    refetch({ 
      userId: user?.id?.toString()
    });
  }, [mode, refetch, user]);

  const handleDelete = async (plantId: number) => {
    await deletePlantMutation({
      variables: {
        id: plantId
      },
      refetchQueries: [
        {
          query: GET_MY_PLANTS,
          variables: mode === "owner" ? { userId: user?.id?.toString() } : {},
        },
        {
          query: GET_ALL_PLANTS,
          variables: mode === "owner" ? { userId: user?.id?.toString() } : {},
        },
      ],
    });
  };

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
                      plant?.attributes?.owner?.data?.id && (
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
                          onClick={() => setPlantToDelete(plant?.id)}
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
          <CreationForm close={() => setIsOpenCreate(false)}/>
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
      {plantToDelete && (
        <CustomModal
          isOpen={plantToDelete !== undefined}
          onClose={() => setPlantToDelete(undefined)}
        >
          <div>
            <div>Voulez-vous vraiment supprimer cette plante ?</div>
            <div className="flex flex-row">
              <div onClick={() => setPlantToDelete(undefined)}>Annuler</div>
              <div onClick={() => handleDelete(plantToDelete)}>Confirmer</div>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
}
