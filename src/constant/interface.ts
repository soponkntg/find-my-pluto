export interface FormI {
  userId: string;
  postType: string;
  animal: string;
  images: string[];
  animalName?: string;
  age?: number;
  species: string;
  colors: string;
  braceletColor?: string;
  gender: string;
  size: string;
  lastSeenAt: string;
  lastFoundPlace: {
    province: string;
    district: string;
    subdistrict: string;
    lat: number;
    lng: number;
  };

  name: string;
  contact: string;
  bounty?: number;
  description?: string;
}

export interface OptionI {
  value: string;
  label: string;
}
