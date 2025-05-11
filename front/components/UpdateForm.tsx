"use client";

//import { NavBar } from "@/app/components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useProfile } from "../utils/useProfile";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_PLANT,
  GET_PLANTS,
  GET_PLANTS_BY_FILTER,
  UPDATE_PLANT,
} from "../graphql/plants.graphql";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Plant } from "../utils/types";

interface UpdateFormProps {
  plantToUpdate: number;
  close: () => void;
  mode: string;
}

export default function UpdateForm({
  plantToUpdate,
  close,
  mode,
}: UpdateFormProps) {
  const { user, role } = useProfile();
  const [plant, setPlant] = useState<Plant>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      name: "",
      latinName: "",
      plantationDate: "",
      isPrivate: false,
      images: [],
    },
  });

  const { data, loading, error } = useQuery(GET_PLANT, {
    variables: { id: plantToUpdate?.toString() },
    skip: !plantToUpdate,
    onCompleted: (data) => {
      setPlant(data.plant.data);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // D'abord, révoquer les anciennes URLs si il y en avait
    setImagePreviews((prevPreviews) => {
      prevPreviews.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });

    // Ensuite, créer les nouvelles previews
    const newPreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(newPreviews);
  };

  // Cleanup automatique quand le composant est démonté
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const [updatePlantMutation] = useMutation(UPDATE_PLANT, {
    onCompleted: (data) => {
      toast.success("Modification de plante réussie !");
      close();
      reset();
    },
    onError: (error) => {
      console.error("Update error:", error.message);
      toast.error(
        "Nous n'avons pas pu modifier votre plante, veuillez réessayer"
      );
    },
  });
  useEffect(() => {
    if (plant) {
      reset({
        name: plant.attributes.name || "",
        latinName: plant.attributes.latinName || "",
        plantationDate: plant.attributes.plantationDate || "",
        isPrivate: plant.attributes.visibility === "private" ? true : false,
      });
    }
  }, [plant, reset]);

  const onSubmit = async (values: any) => {
    const files = values.images; // FileList (les fichiers sélectionnés)
    console.log("values", values);

    const uploadedImageIds: string[] = []; // On crée un tableau pour stocker les IDs des images
    console.log("files", files);

    const modifiedFields = Object.keys(dirtyFields).reduce(
      (acc: Record<string, any>, key) => {
        // Si le champ est "isPrivate", convertir en string
        if (key === "isPrivate") {
          acc["visibility"] = values[key] ? "private" : "public";
        } else {
          // Pour les autres champs, utiliser la valeur telle quelle
          acc[key] = values[key];
        }
        return acc;
      },
      {}
    );
    console.log("Champs modifiés :", modifiedFields);

    if (files && files.length > 0) {
      for (const file of files) {
        const formData = new FormData();
        formData.append("files", file); // On ajoute le fichier à FormData

        try {
          const response = await fetch(
            //`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
            `http://localhost:1337/api/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();

          // Vérifie si la réponse contient des données valides
          if (Array.isArray(data) && data.length > 0 && data[0].id) {
            uploadedImageIds.push(data[0].id); // On récupère l'ID du fichier uploadé
          } else {
            console.error(
              "Erreur lors de l'upload du fichier : Pas d'ID dans la réponse"
            );
          }
        } catch (error) {
          console.error("Erreur de téléchargement :", error);
        }
      }
    }

    // Maintenant qu'on a tous les IDs, on peut appeler la mutation
    await updatePlantMutation({
      variables: {
        input: modifiedFields,
        id: plantToUpdate,
      },
      refetchQueries: [
        {
          query: GET_PLANTS_BY_FILTER,
          variables: mode !== "" ? { visibility: mode } : {},
        },
      ],
    });
  };

  return (
    <div>
      {plant && (
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              //defaultValue={plant?.attributes.name}
              {...register("name", { required: true })}
              className="w-full border rounded-md"
            />
            {errors.name && (
              <div className="text-red-600">Ce champ est requis</div>
            )}
          </div>
          <div>
            <label htmlFor="latinName">Nom latin</label>
            <input
              type="text"
              //defaultValue={plant?.attributes.latinName}
              {...register("latinName")}
              className="w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="plantationDate">Date de plantation</label>
            <input
              type="date"
              //defaultValue={plant?.attributes.plantationDate}
              {...register("plantationDate")}
              className="w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="images">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images", {
                onChange: (e) => {
                  handleImageChange(e); // ta fonction preview
                },
              })}
              className="w-full border rounded-md"
            />

            {imagePreviews.length > 0 ? (
              <div className="flex gap-2 mt-2 flex-wrap">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            ) : (
              plant?.attributes?.images &&
              plant?.attributes?.images?.data.length > 0 && (
                <img
                  src={`http://localhost:1337${plant?.attributes?.images?.data[0]?.attributes?.url}`}
                  alt=""
                  className="h-80 w-full object-cover rounded-t-lg"
                />
              )
            )}
          </div>
          <div>
            <label htmlFor="isPrivate">Masquer pour la communauté</label>
            <input
              type="checkbox"
              {...register("isPrivate", {
                setValueAs: (value) => (value ? "private" : "public"),
              })}
              className=""
            />
          </div>

          <div>
            <button type="submit">MODIFIER</button>
          </div>
        </form>
      )}
    </div>
  );
}
