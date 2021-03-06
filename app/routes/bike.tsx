import { LinksFunction, Outlet } from "remix";

import bikeStylesUrl from "~/styles/bike.css"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: bikeStylesUrl }
  ];
};

export default function bike() {
  return (
    <Outlet />
  )
}
