import {
  Link,
} from "remix";

export default function Index() {
  return (
    <>
      <Link to="/bike">bike</Link>
      <Link to="/code">code</Link>
      <Link to="/words">words</Link>
    </>
  );
}
