module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      //enabled: true,
      origin: ["http://localhost:3000"],
      credentials: true, // Permet l'envoi des cookies
    },
  },
  "strapi::security",
  //"strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
