import path from "path";

export const bikeTripPath = path.join(__dirname, "..", "bike", "trips");
export const bikeGearPath = path.join(__dirname, "..", "bike", "gear");

type MDAttributes = {
  title: string;
}
type Trip = {
  slug: string;
  title: string;
}
type Gear = {
  slug: string;
  title: string;
}
export type BikeStuff = {
  trips: Trip[];
  gear: Gear[];
}

export function isValidBikeStuff(attributes: any): attributes is MDAttributes {
  return attributes?.title;
}
