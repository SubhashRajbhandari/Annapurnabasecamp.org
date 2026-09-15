import type { GearItem } from '../types/trek';

export const GEAR_ITEMS: GearItem[] = [
  // Essential Thermal & Shell
  {
    id: 'g-down-jacket',
    category: 'Essential Thermal & Shell',
    name: 'Expedition Down Jacket (-15°C to -20°C)',
    weightGrams: 900,
    mandatory: true,
    rentalAvailable: true,
    rentalCostUsd: 25,
    description: 'High-loft 800+ fill power down jacket essential for sub-zero mornings and evenings at MBC and ABC.'
  },
  {
    id: 'g-hardshell',
    category: 'Essential Thermal & Shell',
    name: 'Waterproof / Windproof Gore-Tex Shell Jacket',
    weightGrams: 450,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Guards against mountain wind chill and unpredictable alpine squalls or mist.'
  },
  {
    id: 'g-thermal-base',
    category: 'Essential Thermal & Shell',
    name: 'Merino Wool Base Layers (Top & Bottom x2)',
    weightGrams: 380,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Non-itch, odor-resistant thermal underwear that regulates body temperature during exertion and rest.'
  },
  {
    id: 'g-fleece-mid',
    category: 'Essential Thermal & Shell',
    name: 'Polartec Mid-Layer Fleece',
    weightGrams: 320,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Breathable warmth for hiking in cold canyon segments between Dovan and Deurali.'
  },

  // Footwear & Traction
  {
    id: 'g-boots',
    category: 'Footwear & Traction',
    name: 'Broken-in Waterproof Trekking Boots (Vibram Sole)',
    weightGrams: 1200,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Ankle support and grip on wet stone stairs and moraine scree. Essential to break in before arrival.'
  },
  {
    id: 'g-microspikes',
    category: 'Footwear & Traction',
    name: 'Trail Microspikes / Crampons (Seasonal)',
    weightGrams: 350,
    mandatory: false,
    rentalAvailable: true,
    rentalCostUsd: 12,
    description: 'Recommended for late autumn, winter, and early spring when snow patches freeze near ABC.'
  },
  {
    id: 'g-socks',
    category: 'Footwear & Traction',
    name: 'Cushioned Merino Trekking Socks (4 Pairs)',
    weightGrams: 300,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Prevents friction blisters and keeps toes warm during morning frost.'
  },
  {
    id: 'g-poles',
    category: 'Footwear & Traction',
    name: 'Carbon Fiber Telescopic Trekking Poles (Pair)',
    weightGrams: 420,
    mandatory: true,
    rentalAvailable: true,
    rentalCostUsd: 15,
    description: 'Reduces impact on knee joints by up to 30% over the famous 3,000 stone steps of Chhomrong.'
  },

  // Sleeping & Camp Pack
  {
    id: 'g-sleeping-bag',
    category: 'Sleeping & Camp Pack',
    name: 'Four-Season Sleeping Bag (-10°C to -15°C Rating)',
    weightGrams: 1350,
    mandatory: true,
    rentalAvailable: true,
    rentalCostUsd: 30,
    description: 'High alpine teahouses provide blankets, but an expedition bag ensures cozy warmth at 4,130m.'
  },
  {
    id: 'g-daypack',
    category: 'Sleeping & Camp Pack',
    name: 'Technical Daypack (28L - 35L) with Rain Cover',
    weightGrams: 850,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'For carrying your daily water, camera, layers, and snacks while porters transport main duffel.'
  },

  // Technical & Power
  {
    id: 'g-powerbank',
    category: 'Technical & Power',
    name: '20,000 mAh Rugged Cold-Resistant Power Bank',
    weightGrams: 450,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Lithium battery output drops in sub-zero temperatures. Keep batteries warm in your inner jacket.'
  },
  {
    id: 'g-headlamp',
    category: 'Technical & Power',
    name: '350+ Lumens LED Headlamp + Extra Batteries',
    weightGrams: 120,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Critical for the pre-dawn summit push from MBC to ABC and night navigation in teahouses.'
  },
  {
    id: 'g-sunglasses',
    category: 'Technical & Power',
    name: 'Category 3 or 4 UV Polarized Glacier Glasses',
    weightGrams: 80,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Protects retinas from high-altitude solar reflection off snow and glaciers in the Sanctuary bowl.'
  },

  // Medical & Acclimatization
  {
    id: 'g-water-filter',
    category: 'Medical & Acclimatization',
    name: 'UV Water Purifier (Steripen) or Purification Tabs',
    weightGrams: 150,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Plastic mineral bottles are banned in the sanctuary to preserve pristine nature. Purify tap water.'
  },
  {
    id: 'g-meds',
    category: 'Medical & Acclimatization',
    name: 'Diamox (Acetazolamide) & Personal First-Aid Kit',
    weightGrams: 200,
    mandatory: true,
    rentalAvailable: false,
    rentalCostUsd: 0,
    description: 'Prophylactic altitude medication, blister hydrocolloid plasters, ibuprofen, rehydration salts.'
  }
];

export const SAFETY_AMS_GUIDELINES = [
  {
    rule: 'Rule 01: Climb High, Sleep Low',
    detail: 'Never ascend more than 500 meters of sleeping altitude per day once above 3,000m. Our itineraries incorporate gradual staging at Deurali and MBC before sleeping at ABC.'
  },
  {
    rule: 'Rule 02: 4-Liters Hydration Target',
    detail: 'High altitude hyperventilation drastically increases moisture loss. Drink a minimum of 3.5 to 4 liters of warm fluids daily (garlic soup, ginger tea, electrolyte water).'
  },
  {
    rule: 'Rule 03: Pulse Oximeter Baseline Tracking',
    detail: 'Your guide tests SpO2 saturation every morning and evening. Normal resting saturation at ABC (4,130m) is 70-85%. Readings below 65% trigger immediate descent protocol.'
  },
  {
    rule: 'Rule 04: Emergency Heli Evacuation Protocol',
    detail: 'In the rare event of severe HAPE/HACE, our dispatch center triggers direct Airbus H125 rescue with a 25-minute flight time to Pokhara/Kathmandu specialized trauma hospitals.'
  }
];
