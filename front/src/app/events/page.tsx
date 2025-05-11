"use client";

//import { NavBar } from "@/app/components/NavBar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { NavBar } from "../../../components/NavBar";
import { useProfile } from "../../../utils/useProfile";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../../graphql/events.graphql";
import Cookies from "js-cookie";
import moment from "moment";
//import { client } from "../../../apolloClient";

type attributes = {
  name: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  limit: number;
  address: string;
  image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
};
type event = {
  id: number;
  attributes: attributes;
};

export default function Events() {
  const { user, role } = useProfile();
  const { loading, data: getEventsData } = useQuery(GET_EVENTS);
  const allEvents = getEventsData?.events?.data;

  const convertMinutesToHoursMinutes = (minutes: number) => {
    // Calculer le nombre d'heures entières
    var hours = Math.floor(minutes / 60);

    // Calculer le nombre de minutes restantes
    var remainingMinutes = minutes % 60;

    // Retourner le résultat sous forme de chaîne de caractères
    if (hours === 0) {
      return remainingMinutes + "min";
    } else {
      return hours + "h" + remainingMinutes;
    }
  };

  return (
    <div className="">
      <NavBar role={role} />
      <div className="w-full my-6 text-center">Instants sonores</div>
      <div className="flex flex-wrap ">
        {allEvents?.length > 0 &&
          allEvents?.map((event: event) => {
            return (
              <div key={event.id} className="w-1/4 p-2">
                <div className="border border-red-200 shadow-lg rounded-lg">
                  <div>
                    <img
                      src={`http://localhost:1337${event.attributes.image.data.attributes.url}`}
                      alt=""
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-3">
                    <div>
                      <Link href={`/event/${event.id}`}>
                        {event.attributes.name}
                      </Link>
                    </div>
                    <div className="truncate">
                      {event.attributes.description}
                    </div>
                    <div>
                      {moment(event.attributes.date).format("DD/MM/YYYY")}
                    </div>
                    <div>{event.attributes.time.slice(0, 5)}</div>
                    <div>
                      {convertMinutesToHoursMinutes(event.attributes.duration)}
                    </div>
                    <div>{event.attributes.address}</div>
                    <div>Nbre de places : {event.attributes.limit}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
