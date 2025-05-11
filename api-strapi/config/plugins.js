module.exports = {
  //
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "7d", // ou '1h', '4h', etc.
      },
    },
  },
};
