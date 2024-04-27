export enum MovementDirection {
  UP = 6,
  DOWN = 3,
  NEUTRAL = 5,
}

export interface IProduct {
  id: number;
  name: string;
  imageSrc: any;
  category: string;
}

export interface Imenu {
  name: string;
  description: string;
  image: any;
  link: string;
}
