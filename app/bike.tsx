import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";

const bikeTripPath = path.join(__dirname, "..", "bike", "trips");
const bikeGearPath = path.join(__dirname, "..", "bike", "gear");

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

function isValidBikeStuff(attributes: any): attributes is MDAttributes {
  return attributes?.title;
}

// index/nav stuff
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

export async function getBikeStuff() {
  return Promise.all([getBikeGear(), getBikeTrips()]).then((data) => {
    return { gear: data[0], trips: data[1]};
  });
}

// detail stuff
export async function getGear(slug: string) {
  const filepath = path.join(bikeGearPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(
    isValidBikeStuff(attributes),
    `Post ${filepath} is missing attributes`
  );
  return { slug, title: attributes.title, html: marked(body) };
}

export async function getTrip(slug: string) {
  const filepath = path.join(bikeTripPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(
    isValidBikeStuff(attributes),
    `Post ${filepath} is missing attributes`
  );
  return { slug, title: attributes.title, html: marked(body) };
}
