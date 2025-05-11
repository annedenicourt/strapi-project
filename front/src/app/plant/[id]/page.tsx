"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_PLANT } from "../../../../graphql/plants.graphql";
import { useQuery } from "@apollo/client";
import { useProfile } from "../../../../utils/useProfile";
import { Plant } from "../../../../utils/types";

export default function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState<Plant | null>(null);
  const router = useRouter();
  const { user } = useProfile();

  const { data, loading, error } = useQuery(GET_PLANT, {
    variables: { id: id?.toString() },
    skip: !id,
    onCompleted: (data) => {
      setPlant(data.plant.data);
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error || !plant) return <div>Plant not found</div>;

  return (
    <div className="flex flex-col">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Retour
      </button>
      <div>DETAILS</div>
      <div>
        {plant && (
          <div>
            <div>{plant?.attributes?.name}</div>
            <div>
              {plant.attributes.images.data.length > 0 ? (
                plant.attributes.images.data.map((image) => {
                  return (
                    <div key={image.attributes.url} className="w-1/2">
                      <img
                        src={`http://localhost:1337${image.attributes.url}`}
                        alt=""
                        className="rounded-lg"
                      />
                    </div>
                  );
                })
              ) : (
                <div>Pas d'image</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
