declare module "react-simple-maps" {
  import * as React from "react";

  interface GeographyData {
    rsmKey: string;
    [key: string]: any;
  }

  interface GeographiesProps {
    geography: string | object;
    children: (props: {
      geographies: GeographyData[];
      outline: any;
      borders: any;
    }) => React.ReactNode;
  }

  export const ComposableMap: React.ComponentType<any>;
  export const Geographies: React.ComponentType<GeographiesProps>;
  export const Geography: React.ComponentType<any>;
  export const Marker: React.ComponentType<any>;
  export const Line: React.ComponentType<any>;
  export const ZoomableGroup: React.ComponentType<any>;
}