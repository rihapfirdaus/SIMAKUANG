import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      style={{
        color: "white",
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <img src="/error.jpg" style={{ width: "25%" }} alt="" />
    </div>
  );
}
