import "date-fns";
import React, { useEffect, useState } from "react";
import { Divider, Grid, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { store } from "../app/store";
import { State } from "../app/reducer";
import { ILostDogWithPicture } from "../dog/dogInterfaces";
import * as Actions from "../../src/app/actions";
import { useCookies } from "react-cookie";
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
import { ExitToApp, Pets, Settings } from "@material-ui/icons";
import { clearDogList, logoutThunk } from "../../src/app/actions";
import LoadingPopup from "../utilityComponents/LoadingPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { IFilters } from "../utilityComponents/utilities";
import DogDetails from "../dogDetails/dogDetails";

const SidebarTrigger = getSidebarTrigger(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);
const Header = getHeader(styled);
const SidebarContent = getSidebarContent(styled);

const scheme = Layout();
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      minWidth: "100%",
      display: "flex",
      textAlign: "center",
      alignSelf: "center",
      marginLeft: "1%",
      marginBottom: "1%",
      marginTop: "1%",
      borderBottomColor: "black",
      borderBottomWidth: "1",
      fontSize: "1.4em",
    },
    copyright: {
      minWidth: "100%",
      display: "flex",
      verticalAlign: "bottom",
      textAlign: "center",
      alignSelf: "center",
      marginLeft: "1%",
      borderBottomColor: "black",
      fontSize: "0.7em",
      color: "gray",
    },
    registerButton: {
      minWidth: "100%",
      display: "flex",
      textAlign: "left",
      alignSelf: "center",
      marginLeft: "0%",
      marginBottom: "1%",
      marginTop: "1%",
      borderBottomColor: "black",
      borderBottomWidth: "1",
      fontSize: "1.4em",
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
    cardContent: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      color: "aliceblue",
      backgroundColor: "aliceblue",
    },
    main: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      marginTop: "2vh",
      flexGrow: 1,
      alignSelf: "center",
    },
  })
);

scheme.configureHeader((builder) => {
  builder

    .registerConfig("xs", {
      position: "absolute",
      initialHeight: "8%", // won't stick to top when scroll down
    })
    .registerConfig("sm", {
      position: "absolute",
      initialHeight: "8%", // won't stick to top when scroll down
    })
    .registerConfig("md", {
      position: "absolute",
      initialHeight: "8%",
    });
});

scheme.configureEdgeSidebar((builder) => {
  builder
    .create("unique_id", { anchor: "left" })
    .registerPermanentConfig("xs", {
      width: "25%", // px, (%, rem, em is compatible)
      collapsible: true,
      collapsedWidth: "10%",
    })
    .registerPermanentConfig("sm", {
      width: "20%", // px, (%, rem, em is compatible)
      collapsible: true,
      collapsedWidth: "8%",
    })
    .registerPermanentConfig("md", {
      width: "15%", // px, (%, rem, em is compatible)
      collapsible: true,
      collapsedWidth: "6%",
    });
});

export default function ListWithDogs() {
  const lastPage = useSelector((state: State) => state.dogsLastPage);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [dogId, setDogId] = useState(0);
  const [listFetched, setListFetched] = useState(false);
  const [isMenuCollapsed, setMenuCollapsed] = useState(false);
  const dogs = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  const [filteredDogs, setFilteredDogs] = useState<ILostDogWithPicture[]>([]);
  const [displayedDogs, setDisplayedDogs] = useState<ILostDogWithPicture[]>([]);
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh as boolean
  );
  const pages = useSelector((state: State) => state.pages as number);
  const [pageRefresh, setPageRefresh] = useState(true);
  const [filters, setFilters] = useState<IFilters>({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
    isFound: false, //for after the filters will be implemented in the backend
  });
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  const classes = useStyles();
  const { path } = useRouteMatch();

  const onRegisterClicked = () => {
    store.dispatch(clearDogList());
    history.push("/addDog");
  };
  const onSettingsClicked = () => {
    store.dispatch(clearDogList());
    history.push("/settings");
  };
  const onLogOutClicked = () => {
    removeCookie(config.cookies.token, { path: "/" });
    removeCookie(config.cookies.userType, { path: "/" });
    removeCookie(config.cookies.userId, { path: "/" });
    store.dispatch(logoutThunk(cookies));
    history.push("/");
  };

  //refetches page every [10] minutes, only if there were changes in the list
  /*if(!pageRefresh  && !refreshRequired && lastPage && listFetched){
        setTimeout(() => {
          setPageRefresh(true);

        },600000)
  }*/
  //clears dog list, when page is refreshed or changed
  useEffect(() => {
    if (pageRefresh) {
      store.dispatch(clearDogList);
      setPageRefresh(false);
    }
  }, [pageRefresh]);

  function redirectToDogDetailsOrEdit(id: number) {
    setDogId(id);
    sessionStorage.setItem("dogId", JSON.stringify(id as number));
    history.push(`${path}/${id}`);
  }

  //fetches first page of dog list
  useEffect(() => {
    if (refreshRequired) {
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
        setPageRefresh(false);
      }
    }
    // eslint-disable-next-line
  }, [refreshRequired]);

  //fetches next pages of dogs list
  useEffect(() => {
    if (!refreshRequired && !lastPage) {
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
        setPageRefresh(false);
      }
    } // eslint-disable-next-line
  }, [refreshRequired, lastPage, pages]);

  //filters dog list (temporary solution, before backend is implemented)
  useEffect(() => {
    if (!refreshRequired && lastPage) {
      let tmp = dogs;
      let addDogs = tmp.filter(
        (dog: ILostDogWithPicture) => dog.isFound === false
      );
      setFilteredDogs(addDogs);
      setDisplayedDogs(addDogs.slice(0, filters.size));
      setListFetched(true);
      setPageRefresh(false);
    } // eslint-disable-next-line
  }, [refreshRequired, lastPage]);

  //display more dogs on the grid
  const fetchMore = () => {
    setDisplayLoader(true);
    let addDogs = filteredDogs.slice(0, displayedDogs.length + filters.size);
    setTimeout(() => {
      setDisplayedDogs(addDogs);
      setDisplayLoader(false);
    }, 700);
  };
  return (
    <Root scheme={scheme}>
      <CssBaseline />
      <Header className={classes.header}>
        <Toolbar>
          <SidebarTrigger sidebarId="unique_id" />
          Lost Dogs
        </Toolbar>
      </Header>
      <DrawerSidebar sidebarId="unique_id">
        <CollapseBtn
          onClick={() => {
            setMenuCollapsed(!isMenuCollapsed);
          }}
        />
        <SidebarContent name="sidebar" style={{ maxWidth: "98%" }}>
          {!isMenuCollapsed && (
            <Grid container className={classes.main} spacing={1}>
              {}
              <MenuItem
                className={classes.registerButton}
                data-testid="registerButton"
                color="primary"
                onClick={onRegisterClicked}
              >
                <Pets />
                <Grid item xs={1} />
                Register
              </MenuItem>
              <Grid item xs={12} />
              <MenuItem
                className={classes.registerButton}
                data-testid="settingsButton"
                color="primary"
                onClick={onSettingsClicked}
              >
                <Settings />
                <Grid item xs={1} />
                Settings
              </MenuItem>
              <MenuItem
                className={classes.registerButton}
                data-testid="logoutsButton"
                disabled={cookies["userType"] === undefined}
                color="primary"
                onClick={onLogOutClicked}
              >
                <ExitToApp />
                <Grid item xs={1} />
                Logout
              </MenuItem>
              <Divider
                className={classes.menuItem}
                style={{ display: "flex", marginBottom: "10%" }}
              />
              <MenuItem
                className={classes.copyright}
                data-testid="copyrightButton"
              >
                <a
                  href="https://github.com/se2-2021-tue-16-okulewicz/Project-Group-B"
                  target="_blank"
                  rel="noreferrer"
                  className="Github"
                >
                  <FontAwesomeIcon icon={faGithub} color="black" />
                </a>
                <Grid item xs={1} />
                SE2 Group B, {new Date().getFullYear()}
              </MenuItem>
              <MenuItem
                disabled={true}
                className={classes.copyright}
                data-testid="copyrightButton"
                color="primary"
              >
                <FontAwesomeIcon
                  icon={faCopyright}
                  className="Github"
                  color="black"
                />{" "}
                <Grid item xs={1} />
                All Rights Reserved.
              </MenuItem>
            </Grid>
          )}
        </SidebarContent>
      </DrawerSidebar>
      <Content>
        {lastPage && listFetched && (
          <Switch>
            <Route exact path={path}>
              <InfiniteScroll
                dataLength={displayedDogs.length}
                scrollThreshold={0.5}
                next={fetchMore}
                hasMore={filteredDogs.length > displayedDogs.length}
                loader={
                  (displayLoader && <LoadingPopup />) ||
                  (!displayLoader && <></>)
                }
              >
                <ImageGrid
                  dogs={displayedDogs}
                  path={path}
                  redirectToDogDetailsOrEdit={(id: number) =>
                    redirectToDogDetailsOrEdit(id)
                  }
                />
              </InfiniteScroll>
            </Route>
            <Route
              path={`${path}/:id`}
              children={<DogDetails dogId={dogId} />}
            />
          </Switch>
        )}
      </Content>
    </Root>
  );
}
