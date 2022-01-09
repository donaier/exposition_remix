import { LinksFunction, Outlet } from "remix";

import codeStylesUrl from "~/styles/code.css"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: codeStylesUrl }
  ];
};

export default function code() {
  return (
    <Outlet />
  )
}
