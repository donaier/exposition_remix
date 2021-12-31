import {
  Links,
  NavLink,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";

import globalStylesUrl from "./styles/global.css"

import { getBikeNav } from "~/components/bike/nav";
import type { BikeStuff  } from "~/components/bike";


export const loader = () => {
  return getBikeNav();
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesUrl }];
};

export const meta: MetaFunction = () => {
  return { title: "exposition remix" };
};

export default function App() {
  const bikestuff = useLoaderData<BikeStuff>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <NavLink to="/bike">bike</NavLink>
          <ul className="bike-gear">
            {bikestuff.gear.map(gear => (
              <li key={gear.slug}>
                <NavLink to={gear.slug}>{gear.title}</NavLink>
              </li>
            ))}
          </ul>
          <ul className="bike-trips">
            {bikestuff.trips.map(trip => (
              <li key={trip.slug}>
                <NavLink to={trip.slug}>{trip.title}</NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/code">code</NavLink>
          <NavLink to="/words">words</NavLink>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
