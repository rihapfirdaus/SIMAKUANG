import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

export default function Root() {
  return (
    <>
      <nav className="fixed z-10 top-0 left-0 right-0 flex justify-between items-center p-4">
        <div className="flex justify-center items-center">
          <img src="/icon.svg" alt="IconApps" width="36px" draggable="false" />
          <h2 className="font-extrabold text-2xl">SaldoSiaga</h2>
        </div>
        <ul className="flex">
          <li className="bg-gray-200 text-black font-bold text-center rounded-lg lg:px-4 px-2 py-2 lg:me-2 me-1 ">
            <Link to={`/login`}>Log In</Link>
          </li>
          <li className="bg-gray-800 text-white font-bold text-center rounded-lg lg:px-4 px-2 py-2 lg:ms-2 ms-1 ">
            <Link to={`/signup`}>Sign Up For Free</Link>
          </li>
        </ul>
      </nav>
      <Box>
        <Carousel
          animation="slide"
          interval={4000}
          stopAutoPlayOnHover={false}
          navButtonsAlwaysInvisible
          IndicatorIcon={false}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              height: "100vh",
            }}
          >
            <img
              style={{ height: "50%", margin: "0 auto" }}
              src="kalkulator.jpg"
            />
            <p className="lg:text-4xl text-2xl text-center">
              Lacak Keuangan Anda{" "}
            </p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              height: "100vh",
            }}
          >
            <img
              style={{ height: "50%", margin: "0 auto" }}
              src="catatan.jpg"
            />
            <p className="lg:text-4xl text-2xl text-center">
              Catat setiap Transaksi yang terjadi
            </p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              height: "100vh",
            }}
          >
            <img
              style={{ height: "50%", margin: "0 auto" }}
              src="diagram.jpg"
            />
            <p className="lg:text-4xl text-2xl text-center">
              Lihat Pertumbuhan Grafiknya
            </p>
          </Box>
        </Carousel>
      </Box>
    </>
  );
}
