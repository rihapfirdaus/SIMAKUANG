import AppsIcon from "../utils/AppsIcon";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav className="flex justify-between items-center p-4">
        <div className="flex justify-center items-center">
          <img src="/icon.svg" alt="IconApps" width="36px" draggable="false" />
          <h2 className="font-extrabold text-2xl">SaldoSiaga</h2>
        </div>
        <ul className="flex">
          <li className="bg-gray-200 text-black font-bold text-center rounded-lg px-4 py-2 me-2">
            <Link to={`/login`}>Log In</Link>
          </li>
          <li className="bg-gray-800 text-white font-bold text-center rounded-lg px-4 py-2 ms-2">
            <Link to={`/signup`}>Sign Up For Free</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
