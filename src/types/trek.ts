export type PackageTier = '3-star' | '4-star' | '5-star';

export type PorterOption = 'shared-1-2' | 'private-1-1' | 'guide-only';

export interface DayItinerary {
  day: number;
  title: string;
  route: string;
  startAlt: number;
  endAlt: number;
  elevationGain: string;
  hikingTime: string;
  distance: string;
  terrainType?: string;
  accommodation: {
    name: string;
    category: string;
    roomType: string;
    amenities: string[];
    starRating: number;
    bathroomType: string;
  };
  meals: string;
  highlights: string[];
  porterService: string;
  altitudeSafetyTip: string;
  image?: string;
}

export interface TrekPackage {
  id: PackageTier;
  title: string;
  subtitle: string;
  tagline: string;
  heroBadge: string;
  image?: string;
  starRating: number;
  basePriceUsd: number;
  basePriceNpr: number;
  privatePorterAddonUsd: number;
  heliReturnAddonUsd: number;
  durationDays: number;
  maxAltitude: number;
  overview: string;
  highlights: string[];
  keySpecs: {
    hotelKathmandu: string;
    hotelPokhara: string;
    trailAccommodation: string;
    defaultPorterRatio: string;
    transportMode: string;
    medicalSafety: string;
    diningPlan: string;
    connectivity: string;
  };
  included: string[];
  excluded: string[];
  itinerary: DayItinerary[];
}

export interface Waypoint {
  id: string;
  name: string;
  altitudeMeters: number;
  altitudeFeet: number;
  distanceKm: number;
  dayNumber: number;
  oxygenSaturationEst: number;
  avgTempDayNight: string;
  coordinates: string;
  description: string;
  statusHighlight: string;
  scenicViews: string[];
}

export interface GearItem {
  id: string;
  category: 'Essential Thermal & Shell' | 'Footwear & Traction' | 'Sleeping & Camp Pack' | 'Technical & Power' | 'Medical & Acclimatization';
  name: string;
  weightGrams: number;
  mandatory: boolean;
  rentalAvailable: boolean;
  rentalCostUsd: number;
  description: string;
}

export interface BookingFormState {
  tier: PackageTier;
  porterOption: PorterOption;
  groupSize: number;
  startDate: string;
  heliReturn: boolean;
  gearRental: boolean;
  satelliteDevice: boolean;
  privateJeep: boolean;
  currency: 'USD' | 'NPR';
  fullName: string;
  email: string;
  nationality: string;
  phone: string;
  specialRequests: string;
}
