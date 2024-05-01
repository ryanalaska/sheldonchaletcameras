import { useContext } from "react";
import CamContext from "../context/SelectedCamContext";

const useCam = ()=>useContext(CamContext);

export default useCam;