export type attributesPlant = {
  name: string;
  latinName: string;
  visibility: string;
  plantationDate: string;
  users_permissions_user: {
    data: {
      id: string;
      attributes: {
        username: string;
        email: string;
      };
    };
  };
  images: {
    data: [
      {
        attributes: {
          url: string;
        };
      }
    ];
  };
};
export type Plant = {
  id: number;
  attributes: attributesPlant;
};
