import "date-fns";
import React, { useEffect, useState } from "react";
import { Button, Card, Grid, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";
import { store } from "../../app/store";
import { State } from "../../app/reducer";
import { ILostDogWithPicture } from "../../dog/dogInterfaces";
import * as Actions from "../../app/actions";
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
import config from "../../config/config";
import ImageGrid from "../../commoncomponents/imageGrid";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "../../utilityComponents/Footer";
import {
  ILoginInformation,
  ILoginResults,
} from "../../registerLogin/loginRegisterInterfaces";
import { IContactInfo } from "../../contactInfo/contactInfoInterfaces";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { Home } from "@material-ui/icons";
import { classicNameResolver } from "typescript";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { filter } from "lodash";
import DogDetails from "../../editDogDetails/editDogDetails";
import { clearDogList } from "../../app/actions";
import { cleanup } from "@testing-library/react";
import { IFilters } from "../../utilityComponents/uitilities";
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
      width: "99%",
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
      initialHeight: "8%",
    })
    .registerConfig("xs", {
      position: "absolute", // won't stick to top when scroll down
      initialHeight: "8%",
    })
    .registerConfig("sm", {
      position: "absolute", // won't stick to top when scroll down
      initialHeight: "8%",
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

export default function NewSettings() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [lastPage, setLastPage] = useState(false);
  const dogs = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  const loading = useSelector((state: State) => state.loading);
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh as boolean
  );
  const [initialRefresh, setInitialRefresh] = useState(true);

  const history = useHistory();
  const [isListOn, setListOn] = useState(true);
  const [filters, setFilters] = useState<IFilters>({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
    ownerId: Number.parseInt(cookies[config.cookies.userId]),
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
    store.dispatch(clearDogList());
    history.push("/listDogs");
  };

  const classes = useStyles();

  useEffect(() => {
    if (refreshRequired) {
      // fetch and append page 0
      try {
        store.dispatch(
          Actions.fetchDogsThunk({
            filters: {
              ...filters,
              page: config.defaultFilters.page,
            },
            cookies: cookies,
          }) //filters
        );
      } catch (err) {
        console.error("Failed to fetch the dogs: ", err);
      } finally {
        setFilters({ ...filters, page: config.defaultFilters.page + 1 });
        setInitialRefresh(false);
      }
    }
    // eslint-disable-next-line
  }, [refreshRequired]);

  const fetchMore = () => {
    try {
      store.dispatch(
        Actions.fetchDogsThunk({
          filters: {
            ...filters,
            page: filters.page,
          },
          cookies: cookies,
        }) //filters
      );
    } catch (err) {
      console.error("Failed to fetch the dogs: ", err);
    } finally {
      setFilters({ ...filters, page: filters.page + 1 });
      setInitialRefresh(false);
    }
  };

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
              onClick={onInfoClicked}
            >
              {!isListOn && <SendIcon />}
              Contact Info
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              data-testid="dogsButton"
              color="primary"
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
          <InfiniteScroll
            dataLength={dogs.length}
            next={fetchMore}
            hasMore={!lastPage}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            <ImageGrid dogs={dogs} cookies={cookies} path={path} />
          </InfiniteScroll>
        )}
        {!isListOn && <Card></Card>}
      </Content>
    </Root>
  ); //cookies={cookies}
}
