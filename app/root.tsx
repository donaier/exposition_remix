import {
  Links,
  NavLink,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  Link,
  useLocation
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";

import rootStylesUrl from "./styles/root.css"

import codeSVG from "~/components/svg/code";
import bikeSVG from "~/components/svg/bike";

import { getBikeNav } from "~/components/bike/nav";
import type { BikeStuff  } from "~/components/bike";

export const loader = () => {
  return getBikeNav();
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: rootStylesUrl }
  ];
};

export const meta: MetaFunction = () => {
  return { title: "exposition remix" };
};

export default function App() {
  const bikestuff = useLoaderData<BikeStuff>();

  let navClass: string = '';
  if (useLocation().pathname.match('bike')) {
    navClass = 'bike';
  } else if (useLocation().pathname.match('code')) {
    navClass = 'code';
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Link to="/" className="home">exposition</Link>
          <nav className={navClass}>
            <NavLink to="/bike" className='nav-bike'>
              {bikeSVG}
            </NavLink>
            <div className="nav-divider"></div>
            <NavLink to="/code" className='nav-code'>
              {codeSVG}
            </NavLink>
            {/* <NavLink to="/words" className='nav-words'>words</NavLink> */}

            <ul className="nav-list bike-gear">
              <li key="title" className="subnav-title">gear</li>
              {bikestuff.gear.map(gear => (
                <li key={gear.slug}>
                  <NavLink to={gear.slug}>{gear.title}</NavLink>
                </li>
              ))}
            </ul>
            <ul className="nav-list bike-trips">
              <li key="title" className="subnav-title">trips</li>
              {bikestuff.trips.map(trip => (
                <li key={trip.slug}>
                  <NavLink to={trip.slug}>{trip.title}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
