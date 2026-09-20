export type Location = {
  city: string;
  country: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
};

// Edit this list to match your client's real offices.
// lat/lng use standard decimal degrees. Mark exactly one entry isHQ: true.
export const locations: Location[] = [
  {
    city: "Ujjain",
    country: "India",
    lat: 23.1793,
    lng: 75.784912,
    isHQ: true,
  },
  {
    city: "Georgetown",
    country: "Guyana",
    lat: 6.8013,
    lng: -58.1551,
  },
  {
    city: "Lima",
    country: "Peru",
    lat: -12.0464,
    lng: -77.0428,
  },
  {
    city: "Brasília",
    country: "Brazil",
    lat: -15.7939,
    lng: -47.8828,
  },

  // Africa
  {
    city: "Algiers",
    country: "Algeria",
    lat: 36.7538,
    lng: 3.0588,
  },
  {
    city: "Tripoli",
    country: "Libya",
    lat: 32.8872,
    lng: 13.1913,
  },
  {
    city: "Addis Ababa",
    country: "Ethiopia",
    lat: 9.032,
    lng: 38.7469,
  },
  {
    city: "Abuja",
    country: "Nigeria",
    lat: 9.0765,
    lng: 7.3986,
  },
  {
    city: "N'Djamena",
    country: "Chad",
    lat: 12.1348,
    lng: 15.0557,
  },
  {
    city: "Windhoek",
    country: "Namibia",
    lat: -22.5609,
    lng: 17.0658,
  },
  {
    city: "Maputo",
    country: "Mozambique",
    lat: -25.9692,
    lng: 32.5732,
  },
  // { city: 'Mumbai', country: 'India', lat: 19.076, lng: 72.8777 },
  { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { city: "New York", country: "United States", lat: 40.7128, lng: -74.006 },
  { city: "London", country: "United Kingdom", lat: 51.5072, lng: -0.1276 },
  { city: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { city: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
  { city: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { city: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { city: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122 },
  { city: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 },
  { city: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173 },
  { city: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
  { city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  { city: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753 },

  { city: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
];
