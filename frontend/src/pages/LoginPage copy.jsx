// import React, { useState } from "react";
// import { VisibilityOff, Visibility } from "@mui/icons-material";
// import {
//   Link,
//   Form,
//   redirect,
//   useSubmit,
//   Outlet,
//   useNavigate,
// } from "react-router-dom";
// import AppsIcon from "../utils/AppsIcon";
// import { Google } from "@mui/icons-material";
// import { createTheme, textFieldClasses } from "@mui/material";
// import {
//   IconButton,
//   InputAdornment,
//   TextField,
//   Stack,
//   Button,
//   Box,
//   Divider,
// } from "@mui/material";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../services/firebase";
// import { signInWithPopup } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";

// export async function action({ request }) {
//   console.log("ini jalan ygy");
//   const formData = await request.formData();
//   const updates = Object.fromEntries(formData);
//   const email = updates.email;
//   const password = updates.password;
//   console.log(email, password);
//   const user = signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       alert("login sukses");
//       return true;
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;

//       console.log(errorCode);
//       if (errorCode === "auth/wrong-password") {
//         alert("Password salah");
//       } else if (errorCode === "auth/user-not-found") {
//         alert("Email belum terdaftar");
//       } else if (errorCode === "auth/invalid-email") {
//         alert("akun belum terdaftar");
//       } else if (errorCode === "auth/invalid-login-credentials") {
//         alert("anda belum mengatur password");
//       } else {
//         alert("login gagal");
//         console.error(errorMessage);
//       }
//       return false;
//     });

//   return redirect("/");
// }

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const navigate = useNavigate();
//   const handleGoogleAuth = (event) => {
//     event.preventDefault;
//     navigate("/");
//     const googleProvider = new GoogleAuthProvider();
//     try {
//       signInWithPopup(auth, googleProvider);
//       console.log("succes");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Box className="form-container">
//       <Stack className="form-auth">
//         <AppsIcon />
//         <h1>Log in</h1>
//         <Form method="post">
//           <Stack spacing={2}>
//             <TextField
//               label="Email"
//               type="email"
//               color="success"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               color="success"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Link className="text-link forgot-pw">forgot password?</Link>
//             <Button
//               type="submit"
//               size="large"
//               variant="contained"
//               color="success"
//               sx={{ my: 2, p: 1.5 }}
//             >
//               Log In
//             </Button>
//           </Stack>
//         </Form>
//         <p>
//           Don't have an Account?
//           <Link to={`/signup`} className="text-link change-auth">
//             Create an Account
//           </Link>
//         </p>
//         <Outlet></Outlet>
//         <Divider>or</Divider>
//         <Button
//           variant="outlined"
//           startIcon={<Google color="success" />}
//           color="success"
//           sx={{ my: 2, p: 1.5 }}
//           onClick={handleGoogleAuth}
//         >
//           Log in with Google
//         </Button>
//       </Stack>
//     </Box>
//   );
// }

// import React, { useState } from "react";
// import { Form, redirect } from "react-router-dom";
// import AppsIcon from "../utils/AppsIcon";
// import { TextField, Stack, Box } from "@mui/material";

// export async function action() {
//   return redirect("/");
// }

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [emailValidation, setEmailValidation] = useState(true);
//   const [focus, setFocus] = useState("true");

//   const handleKeyDown = (e) => {
//     if ((e.key === "Enter" || e.keyCode === 13) && email.trim() !== "") {
//       if (!email.includes("@")) {
//         setEmailValidation(false);
//       } else {
//         setEmailValidation(true);
//         setErrorMessage("");
//       }
//     }
//   };
//   console.log(email);

//   return (
//     <Box className="form-container">
//       <Stack className="form-auth">
//         <AppsIcon />
//         <Form method="post">
//           <Stack spacing={2}>
//             <TextField
//               error={email == "" || !email.includes("@") ? false : true}
//               helperText={
//                 focus
//                   ? !email === "" && email.includes("@")
//                     ? "Klik enter jika sudah"
//                     : "Email tidak valid"
//                   : " "
//               }
//               label="Masukkan Email Anda"
//               type="email"
//               color="success"
//               name="email"
//               value={email}
//               // onFocus={() => setFocus(true)}
//               // onBlur={() => setFocus(false)}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyDown={(e) => handleKeyDown(e)}
//             />
//           </Stack>
//         </Form>
//       </Stack>
//     </Box>
//   );
// }
