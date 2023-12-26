import { CloudUpload, CloudUploadOutlined, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { createContext, useEffect, useState } from "react";

const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setImage }) {
  const uploadWidgetUrl = import.meta.env
    .VITE_REACT_APP_CLOUDINARY_URL_UPLOAD_WIDGET;
  const baseUrl = import.meta.env.VITE_REACT_APP_CLOUDINARY_BASE_URL;
  const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUDNAME;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = uploadWidgetUrl;
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const handleClickWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      uwConfig,
      (error, result) => {
        if (!error && result && result.event === "success") {
          const image = result.info;
          setImage(
            `${baseUrl}/${cloudName}/${image.resource_type}/${image.type}/c_crop,g_face/${image.path} `
          );
        }
      }
    );

    myWidget.open();
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button color="success" variant="outlined" onClick={handleClickWidget}>
        <Edit />
      </Button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
