import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import cams from "../json/cams.json";
import useCam from "../hooks/useCam";

import { Fragment, useEffect } from "react";
function CamsList() {
  const { cam: selectedCam, setCam } = useCam();
  const smallScreen = useMediaQuery("(max-width: 900px)");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCam(cams.find((cam) => cam.name === newValue));
  };

  useEffect(() => {
    setCam(cams[0]);
  }, []);

  // return (
  //   <List>
  //     {cams.map((cam, i) => {
  //       const selected = cam.name === selectedCam?.name;
  //       return (
  //         <Fragment key={i}>
  //           <ListItem disablePadding >
  //             <ListItemButton selected={selected} onClick={() => setCam(cam)}>
  //               <ListItemText primary={cam.name} />
  //             </ListItemButton>
  //           </ListItem>
  //           {i < cams.length - 1 && <Divider component="li" />}
  //         </Fragment>
  //       );
  //     })}
  //   </List>
  // );

  return (
    <Tabs
      variant="scrollable"
      scrollButtons={smallScreen}
      allowScrollButtonsMobile
      orientation={smallScreen ? "horizontal" : "vertical"}
      value={selectedCam?.name}
      onChange={handleChange}
      aria-label="lab API tabs example"
      sx={{mb:3}}
    >
      {cams.map((cam, i) => {
        return <Tab key={i} label={cam.name} value={cam.name} />;
      })}
    </Tabs>
  );
}

export default CamsList;
