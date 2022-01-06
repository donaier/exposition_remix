import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";

import { getGear } from "~/components/bike/gear";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "what? no slug?");

  return getGear(params.slug);
}

export default function GearSlug() {
  const gear = useLoaderData();
  return (
    <div dangerouslySetInnerHTML={{ __html: gear.html }}></div>
  ) 
}
