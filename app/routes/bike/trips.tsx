import {
  Link, Outlet,
} from "remix";

export default function Index() {
  return (
    <>
      <h1>trips</h1>
      <Outlet />
    </>
  );
}
