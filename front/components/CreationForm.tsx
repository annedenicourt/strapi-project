"use client";

//import { NavBar } from "@/app/components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useProfile } from "../utils/useProfile";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PLANT,
  GET_ALL_PLANTS,
} from "../graphql/plants.graphql";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UpdateFormProps {
  close: () => void;
}

export default function CreationForm({ close }: UpdateFormProps) {
  const { user, role } = useProfile();
  //const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

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

  const [createPlantMutation] = useMutation(CREATE_PLANT, {
    onCompleted: (data) => {
      toast.success("Création de plante réussie !");
      close();
      reset();
    },
    onError: (error) => {
      console.error("Register error:", error.message);
      toast.error("Nous n'avons pas pu créer votre plante, veuillez réessayer");
    },
  });

  const onSubmit = async (values: any) => {
    const files = values.images; // FileList (les fichiers sélectionnés)
    console.log("values", values);
    const isPrivate =
      values.isPrivate && values.isPrivate === true ? true : false;

    console.log("isPrivate", isPrivate);

    const uploadedImageIds: string[] = []; // On crée un tableau pour stocker les IDs des images
    console.log("files", files);

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

    await createPlantMutation({
      variables: {
        input: {
          name: values.name,
          latinName: values.latinName,
          plantationDate: values.plantationDate,
          publishedAt: new Date().toISOString(),
          images: uploadedImageIds,
          //users_permissions_user: user ? user.id : undefined,
          owner: user ? user.id : undefined,
          visibility: isPrivate ? "private" : "public",
        },
      },
      refetchQueries: [
        {
          query: GET_ALL_PLANTS,
        },
      ],
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
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
            {...register("latinName")}
            className="w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="plantationDate">Date de plantation</label>
          <input
            type="date"
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
                handleImageChange(e);
              },
            })}
            className="w-full border rounded-md"
          />

          {imagePreviews.length > 0 && (
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
          )}
        </div>
        <div>
          <label htmlFor="isPrivate">Masquer pour la communauté</label>
          <input
            type="checkbox"
            {...register("isPrivate", {
              onChange: (e) => {
                console.log(e.target.checked);
              },
            })}
            className=""
          />
        </div>
        <div>
          <button type="submit">CREER</button>
        </div>
      </form>
    </div>
  );
}
