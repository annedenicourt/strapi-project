export type attributesPlant = {
  name: string;
  latinName?: string;
  visibility?: string;
  plantationDate?: string;
  favorite_users?: {
    data: Array<{
      id: string;
      attributes: {
        username: string;
      };
    }>;
  };
  owner?: {
    data?: {
      id?: string;
      attributes?: {
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
