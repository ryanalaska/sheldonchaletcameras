import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Header from "../components/Header";
import cams from "../json/cams.json";
import CamIframe from "../components/CamIframe";
import { CamContextProvider } from "../context/SelectedCamContext";
import CamsList from "../components/CamsList";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
function DashboardPage() {
  const smallScreen = useMediaQuery("(max-width: 900px)");
  const handle = useFullScreenHandle();

  return (
    <CamContextProvider>
      <Header />
      <Container
        sx={{
          pt: 2,
        }}
      >
        <FullScreen handle={handle}>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Typography
                variant="h5"
                textAlign={smallScreen ? "left" : "center"}
              >
                Cams
              </Typography>
              <CamsList />
              {!handle.active && (
                <Button onClick={handle.enter}>Enter fullscreen</Button>
              )}
            </Grid>
            <Grid item xs={12} md={10}>
              <CamIframe />
            </Grid>
          </Grid>
        </FullScreen>
      </Container>
    </CamContextProvider>
  );
}

export default DashboardPage;
