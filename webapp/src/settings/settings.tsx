import "date-fns";
import React, { useEffect, useState } from "react";
import { Button, Card, Grid, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";
import { store } from "../app/store";
import { State } from "../app/reducer";
import { ILostDogWithPicture } from "../dog/dogInterfaces";
import * as Actions from "../app/actions";
import Layout, {
  getContent,
  getDrawerSidebar,
  getHeader,
  Root,
  getSidebarTrigger,
  getSidebarContent,
  getCollapseBtn,
} from "@mui-treasury/layout";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import config from "../config/config";
import ImageGrid from "../commoncomponents/imageGrid";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "../utilityComponents/Footer";
import {
  ILoginInformation,
  ILoginResults,
} from "../registerLogin/loginRegisterInterfaces";
import { IContactInfo } from "./contactInfoInterfaces";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { Home } from "@material-ui/icons";
import { classicNameResolver } from "typescript";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { filter } from "lodash";
import DogDetails from "../editDogDetails/editDogDetails";
//import EditDetails from "./"

const SidebarTrigger = getSidebarTrigger(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);
const Header = getHeader(styled);
const SidebarContent = getSidebarContent(styled);

const scheme = Layout();
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    menuItem: {
      minWidth: "100%",
      display: "flex",
      textAlign: "left",
      alignSelf: "center",
      marginLeft: "0%",
      marginBottom: "1%",
      marginTop: "1%",
      borderBottomColor: "black",
      borderBottomWidth: "1",
      fontSize: "1.3em",
    },
    cardContent: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      color: "aliceblue",
      backgroundColor: "aliceblue",
    },
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: "inherit",
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
    Card: {
      minWidth: "30px",
      minHeight: "40px",
    },
    main: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      marginTop: "2vh",
      flexGrow: 1,
      alignSelf: "center",
    },
    header: {
      background: "palealiceblue",
      color: "black",
      fontStyle: "oblique",
      fontSize: "2em",
      fontFamily: "Gill Sans Extrabold",
      fontWeight: "bolder",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      display: "flex",
    },
  })
);

scheme.configureHeader((builder) => {
  builder
    .registerConfig("md", {
      position: "absolute",
    })
    .registerConfig("xs", {
      position: "absolute", // won't stick to top when scroll down
    })
    .registerConfig("sm", {
      position: "absolute", // won't stick to top when scroll down
    });
});

scheme.configureEdgeSidebar((builder) => {
  builder
    .create("unique_id", { anchor: "left" })
    .registerPermanentConfig("xs", {
      width: "25%", // px, (%, rem, em is compatible)
      collapsible: false,
    })
    .registerPermanentConfig("sm", {
      width: "20%", // px, (%, rem, em is compatible)
      collapsible: false,
    })
    .registerPermanentConfig("md", {
      width: "15%", //x, (%, rem, em is compatible)
      collapsible: false,
    });
});

export default function Settings() {
  const [collapsed, setCollapsed] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [lastPage, setLastPage] = useState(false);
  const dogs = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  //console.log(dogs);
  const [filteredDogs, setFilteredDogs] = useState<ILostDogWithPicture[]>();
  //const contactInfo = {cookies[username]}
  const loading = useSelector((state: State) => state.loading);
  const refreshRequired = useSelector(
    (state: State) => state.settingsRequireRefresh as boolean
  );

  const history = useHistory();
  const [isListOn, setListOn] = useState(true);
  const [filters, setFilters] = useState({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
    //ownerId: Number.parseInt(cookies[config.cookies.userId]),//cookies[config.cookies.userId],
  });
  // is this page last?

  const onDogsListClicked = () => {
    setListOn(true);
  };
  const onInfoClicked = () => {
    setListOn(false);
    //getContactInfo();
  };
  const onShelterClicked = () => {
    history.push("/listDogs");
  };

  const classes = useStyles();

  //uncomment after the endpoint in backend
  /*useEffect(() => {
    if(!isListOn){
      store.dispatch(
        Actions.fetchContactInfoThunk({
          userId: cookies[config.cookies.userId],
          cookies
        }));
      }
    },[isListOn]);*/

  /*const getContactInfo = () => {
    store.dispatch(
      Actions.fetchContactInfoThunk({
        userId: cookies[config.cookies.userId],
        cookies
      })
    )
  }*/
  const { path } = useRouteMatch();
  return (
    <Root scheme={scheme}>
      <CssBaseline />
      <Header className={classes.header}>
        <Toolbar>
          <SidebarTrigger sidebarId="unique_id" />
          Settings
        </Toolbar>
      </Header>
      <DrawerSidebar sidebarId="unique_id">
        <CollapseBtn />
        <SidebarContent name="sidebar">
          <Grid container className={classes.main} spacing={2}>
            <MenuItem
              className={classes.menuItem}
              data-testid="registerButton"
              color="primary"
              //variant="contained"
              //size="medium"
              onClick={onInfoClicked}
            >
              {!isListOn && <SendIcon />}
              Contact Info
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              data-testid="dogsButton"
              color="primary"
              //variant="contained"
              //size="medium"
              onClick={onDogsListClicked}
            >
              {isListOn && <SendIcon />}
              My Dogs
            </MenuItem>
            <Grid item xs={12} />
            <Grid item xs={12} />
            <MenuItem
              className={classes.menuItem}
              data-testid="shelterButton"
              color="primary"
              //variant="contained"
              //size="medium"
              onClick={onShelterClicked}
            >
              Shelter
            </MenuItem>
          </Grid>
        </SidebarContent>
        <Footer />
      </DrawerSidebar>
      <Content>
        {isListOn && (
          <ImageGrid
            dogs={dogs}
            id={Number.parseInt(cookies[config.cookies.userId])}
            cookies={cookies}
            path={path}
          />
        )}
        {!isListOn && <Card>{cookies["username"]}</Card>}
      </Content>
    </Root>
  ); //cookies={cookies}
}
