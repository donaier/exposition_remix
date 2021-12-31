import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";

import { bikeGearPath, bikeTripPath, isValidBikeStuff } from "~/components/bike";

async function getBikeGear() {
  const gearDir = await fs.readdir(bikeGearPath)

  return Promise.all(
    gearDir.map(async filename => {
      const file = await fs.readFile(
        path.join(bikeGearPath, filename)
      );
      const { attributes } = parseFrontMatter(
        file.toString()
      );
      invariant(isValidBikeStuff(attributes), `${filename} might has bad metadata!`);
  
      return {
        slug: 'bike/gear/' + filename.replace(/\.md$/, ''),
        title: attributes.title
      };
    })
  );
}
async function getBikeTrips() {
  const tripDir = await fs.readdir(bikeTripPath)

  return Promise.all(
    tripDir.map(async filename => {
      const file = await fs.readFile(
        path.join(bikeTripPath, filename)
      );
      const { attributes } = parseFrontMatter(
        file.toString()
      );
      invariant(isValidBikeStuff(attributes), `${filename} might has bad metadata!`);
  
      return {
        slug: 'bike/trips/' + filename.replace(/\.md$/, ''),
        title: attributes.title
      };
    })
  );
}

export async function getBikeNav() {
  return Promise.all([getBikeGear(), getBikeTrips()]).then((data) => {
    return { gear: data[0], trips: data[1]};
  });
}
