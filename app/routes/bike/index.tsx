import { Link, useLoaderData } from "remix";

import { getBikeStuff } from "~/bike";
import type { BikeStuff  } from "~/bike";

export const loader = () => {
  return getBikeStuff();
}

export default function Bike() {
  const bikestuff = useLoaderData<BikeStuff>();

  return (
    <div>
      <h1>here will be bike stuff</h1>
      <p>gear</p>
      <ul>
        {bikestuff.gear.map(gear => (
          <li key={gear.slug}>
            <Link to={gear.slug}>{gear.title}</Link>
          </li>
        ))}
      </ul>
      <p>trips</p>
      <ul>
        {bikestuff.trips.map(trip => (
          <li key={trip.slug}>
            <Link to={trip.slug}>{trip.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
