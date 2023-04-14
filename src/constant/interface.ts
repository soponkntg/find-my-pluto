export interface FormI {
  animalName?: string;
  age?: number;
  userId: string;
  postType: string;
  animal: string;
  images: string[];
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

  userName: string;
  contact: string;
  bounty?: number;
  description?: string;
}

export interface OptionI {
  value: string;
  label: string;
}

export interface PetCarddI {
  stage: string;
  animalId: string;
  imageurl: string[];
  gender: string;
  bounty?: number;
  location: string;
  timestamp: string;
  expireDate?: number;
  handleDelete?(animalId: string): void;
  handleExtend?(animalId: string): void;
  handleFinish?(animalId: string): void;
}

export interface PetCardPreviewI {
  postType: "lost" | "found";
  images: string[];
  gender: "เพศผู้" | "เพศเมีย";
  bounty?: number;
  lastFoundPlace: {
    district: string;
    subdistrict: string;
  };
  lastSeenAt: number;
  animalId: string;
  expiredAt: number;
  stage: "finding" | "expired" | "finish";
}

export interface PetCardInfoI extends PetCardPreviewI {
  userId: string;
  animal: string; //type of animal
  animalName?: string;
  age?: number;
  species: string;
  colors: string[];
  braceletColor?: string;
  size: "เล็ก" | "กลาง" | "ใหญ่";
  lastFoundPlace: {
    lat: number;
    lng: number;
    province: string;
    district: string;
    subdistrict: string;
  };
  userName: string;
  contact: string;
  description?: string;
  createdAt: number;
}
