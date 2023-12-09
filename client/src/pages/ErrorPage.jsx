import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      style={{
        backgroundColor: "blue",
        color: "white",
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <span style={{ fontSize: "200px" }}>:(</span>
        <h1 style={{ fontSize: "48px" }}>Oops!</h1>
        <p style={{ fontSize: "20px" }}>
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
