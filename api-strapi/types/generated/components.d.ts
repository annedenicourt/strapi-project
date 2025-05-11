import type { Schema, Attribute } from '@strapi/strapi';

export interface ArrayParticipant extends Schema.Component {
  collectionName: 'components_array_participants';
  info: {
    displayName: 'participant';
  };
  attributes: {
    firstName: Attribute.String;
    lastName: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'array.participant': ArrayParticipant;
    }
  }
}
