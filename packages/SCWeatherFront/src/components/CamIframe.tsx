import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import useCam from "../hooks/useCam";
import axios from "axios";
import { ContactSupportOutlined } from "@mui/icons-material";
import Storage from "../utils/storage";

function CamIframe() {
  const [abortController, setAbortController] = useState<AbortController>(null);
  const [loadedPorts, setLoadedPorts] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newImageLoaded, setNewImageLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(null);
  const { cam } = useCam();
  const getPageContent = async (newImage = false) => {
    try {
      const selectedCam = Storage.getValue("CAM");
      if (abortController) {
        abortController.abort();
        setAbortController(null);
      }
      setLoading(true);
      const controller = new AbortController();
      setAbortController(controller);
      // const url = `http://98.97.102.60:${port}/record/current.jpg`;
      const url = `${import.meta.env.VITE_API_HOST}/api/img?api_key=${import.meta.env.VITE_API_KEY}${
        newImage
          ? `&new=1&port=${selectedCam.port}`
          : `&port=${selectedCam.port}`
      }`;
      const img = await axios.get(url, {
        responseType: "blob",
        signal: controller.signal,
      });

      if (img.headers["cam-server-status"] === "no response")
        setError(
          "The camera server is not available, showing last image gotten."
        );
      else setError(null);

      setAbortController(null);

      // Create a FileReader object
      const reader = new FileReader();

      reader.onloadend = () => {
        // The result property of the FileReader contains the base64 encoded data
        const base64String = reader.result;

        // Use the base64String as needed
        if (typeof base64String === "string") {
          setImageSrc(base64String);

          setNewImageLoaded(newImage);

          setLoading(false);

          setTimeout(() => {
            getPageContent(true);
          },!newImage ?  1 : 600000 ); // 10 minutes
        }
      };

      // Read the blob as a Data URL (base64)
      reader.readAsDataURL(img.data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cam) {
      setNewImageLoaded(false);
      if (abortController) {
        abortController.abort();
        setAbortController(null);
      }
      getPageContent(false);
    }
  }, [cam]);

  return (
    <>
      <Typography textAlign="right" sx={{mt:-2}}>{cam?.name}</Typography>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          minHeight: "20em",
          borderRadius: 2,
          border: "1px rgba(204, 204, 204, 0.304) dashed",
          overflow: "hidden",
          "-webkit-box-shadow": "2px 2px 11px 0px rgba(0,0,0,0.27)",
          "-moz-box-shadow": "2px 2px 11px 0px rgba(0,0,0,0.27)",
          "box-shadow": "2px 2px 11px 0px rgba(0,0,0,0.27)",
        }}
      >
        {loading && imageSrc === null && <CircularProgress />}
        {imageSrc === null && !loading && <VideoCameraBackIcon />}
        {imageSrc !== null && (
          <img
            src={imageSrc}
            style={{
              width: "100%",
              height: "auto",
              maxHeight:"100vh",
              maxWidth:"100vw"
            }}
          />
        )}
        {error !== null && (
          <Alert sx={{ position: "absolute", bottom: 10 }} severity="error">
            {error}
          </Alert>
        )}
        {error === null && imageSrc !== null && !newImageLoaded && (
          <Alert sx={{ position: "absolute", bottom: 10 }} severity="info">
            Last image gotten
            <Box
              sx={{
                display: "inline-block",
                ml:2
              }}
            >
              <CircularProgress size={14} />
            </Box>
          </Alert>
        )}
      </Box>
    </>
  );
}

export default CamIframe;
