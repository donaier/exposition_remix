import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";

import { getTrip } from "~/components/bike/trips";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "what? no slug?");

  return getTrip(params.slug);
}

export default function TripSlug() {
  const gear = useLoaderData();
  return (
    <div dangerouslySetInnerHTML={{ __html: gear.html }}></div>
  )
}
