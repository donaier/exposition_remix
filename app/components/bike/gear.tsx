import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";

import { bikeGearPath, isValidBikeStuff } from "../bike";

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
