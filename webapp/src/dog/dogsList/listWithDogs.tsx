import "date-fns";
import React, { useEffect, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  Grid,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { store } from "../../app/store";
import { ILostDogWithPicture } from "../dogInterfaces";
import * as Actions from "../../app/actions";
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
import config from "../../config/config";
import InfiniteScroll from "react-infinite-scroll-component";
import { ExitToApp, House, Pets, Search, Settings } from "@material-ui/icons";
import { clearDogList, logoutThunk } from "../../app/actions";
import LoadingPopup from "../../utilityComponents/LoadingPopup";
import Footer from "../../utilityComponents/Footer";
import FilterForm from "./filterForm";
import { IFilterSort } from "./filterInterface";
import { State } from "../../app/stateInterfaces";
import LostDogsGrid from "../../commonComponents/grids/lostDogsGrid";

const Content = getContent(styled);
const Header = getHeader(styled);

const scheme = Layout();
const useStyles = makeStyles(() =>
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
      textAlign: "center",
      alignSelf: "center",
      marginTop: "6%",
      //borderBottomColor: "black",
      //borderBottomWidth: "1",
      fontSize: "1.2em",
    },
    header: {
      backgroundColor: "white",
      justifyContent: "center",
      flexShrink: 0,
      alignItems: "center",
      alignSelf: "center",
      display: "flex",
      left: 0,
      right: 0,
      height: "15vh",
      //width:"100vw",
    },
    title: {
      color: "black",
      fontSize: "1.75em",
      fontFamily: "Comfortaa",
      fontWeight: "normal",
    },
    cardContent: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      color: "aliceblue",
      backgroundColor: "aliceblue",
    },
    action: {
      color: "black",
      tabSize: "1",
    },
    main: {
      justifyContent: "center",
      width: "100%",
      display: "flex",
      alignItems: "center",
      marginTop: "2vh",
      //flexGrow: 1,
      alignSelf: "center",
    },
    drawer: {
      width: 250,
      flexShrink: 0,
    },
  })
);

scheme.configureHeader((builder) => {
  builder
    .registerConfig("xs", {
      position: "fixed",
      initialHeight: "10%", // won't stick to top when scroll down
      clipped: true,
    })
    .registerConfig("sm", {
      position: "fixed",
      initialHeight: "10%", // won't stick to top when scroll down
      clipped: true,
    })
    .registerConfig("md", {
      position: "fixed",
      initialHeight: "10%",
      clipped: true,
    });
});

/*TODO: remove filtering in frontend (folder dontdelete)*/

export default function ListWithDogs(props: any) {
  const lastPage = useSelector((state: State) => state.dogsLastPage);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [dogId, setDogId] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);

  const dogs = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh as boolean
  );
  const [initialRefresh, setInitialRefresh] = useState(true);
  const [isUpdateFilters, setIsUpdateFilters] = useState(false);
  const [filters, setFilters] = useState<IFilterSort>({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
    filter: { isFound: false },
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
  const onSheltersClicked = () => {
    store.dispatch(clearDogList());
    history.push("/shelters");
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
  const updateFilters = (event: any) => {
    if (event) {
      setFilters(event);
      store.dispatch(clearDogList());
      setIsUpdateFilters(true);
      //setMenuCollapsed(true);
    }
  };

  function redirectToDogDetailsOrEdit(id: number) {
    setDogId(id);
    sessionStorage.setItem("dogId", JSON.stringify(id as number));
    props.redirectToDogDetailsOrEdit(id);
    //history.push(`${path}/${id}`);
  }

  useEffect(() => {
    if (initialRefresh) {
      store.dispatch(clearDogList());
      setInitialRefresh(false);
    }
  }, [initialRefresh]);

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
      }
    }
    // eslint-disable-next-line
  }, [refreshRequired]);

  const fetchMore = () => {
    if (!fetching) {
      setFetching(true);
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
        if (filters.page != null) {
          setFilters({ ...filters, page: filters.page + 1 });
        }
        setInitialRefresh(false);
        setFetching(false);
      }
    }
  };

  return (
    <Root scheme={scheme}>
      <CssBaseline />
      <Header className={classes.header} id="header">
        <Grid container direction="row" alignContent="space-between">
          <Grid item md={3}>
            <BottomNavigation showLabels />
          </Grid>
          <Grid item xs={6} sm={7} md={6}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                disabled={true}
                label="LOST DOGS"
                classes={{ label: classes.title }}
              />
            </BottomNavigation>
          </Grid>
          <Grid item xs={6} sm={5} md={3}>
            <BottomNavigation showLabels style={{ height: "100%" }}>
              <BottomNavigationAction
                showLabel={true}
                onClick={onRegisterClicked}
                label="Register"
                classes={{ label: classes.action, root: classes.action }}
                icon={<Pets />}
              />
              <BottomNavigationAction
                showLabel={true}
                classes={{ label: classes.action, root: classes.action }}
                onClick={onSheltersClicked}
                label="Shelters"
                icon={<House />}
              />
              <BottomNavigationAction
                showLabel={true}
                classes={{ label: classes.action, root: classes.action }}
                onClick={onSettingsClicked}
                label="Settings"
                icon={<Settings />}
              />
              <BottomNavigationAction
                showLabel={true}
                classes={{ label: classes.action, root: classes.action }}
                label="Filter"
                onClick={() => {
                  setMenuCollapsed(!isMenuCollapsed);
                  if (!isMenuCollapsed && isUpdateFilters) {
                    setFilters({
                      ...filters,
                      page: config.defaultFilters.page,
                    });
                    store.dispatch(clearDogList());
                    setIsUpdateFilters(false);
                  }
                  //sidebar.setOpen("unique_id", true);
                }}
                icon={<Search />}
              />
              <BottomNavigationAction
                showLabel={true}
                classes={{ label: classes.action, root: classes.action }}
                disabled={cookies["userType"] === undefined}
                label="Logout"
                onClick={onLogOutClicked}
                icon={<ExitToApp />}
              />
              <BottomNavigationAction disabled={true} />
            </BottomNavigation>
          </Grid>
        </Grid>
      </Header>
      {!isMenuCollapsed && (
        <Drawer
          variant="persistent"
          BackdropProps={{ invisible: true }}
          /*onEscapeKeyDown={()=>{setMenuCollapsed(true)}} 
        onBackdropClick={()=>{setMenuCollapsed(true)}}*/ open={!isMenuCollapsed}
          className={classes.drawer}
        >
          <Toolbar />
          <BottomNavigation />
          <FilterForm
            filters={filters}
            updateFilters={(
              updatedFilters: React.ChangeEvent<{ value: unknown }>
            ) => updateFilters(updatedFilters)}
          />
        </Drawer>
      )}
      <Content>
        <InfiniteScroll
          dataLength={dogs.length}
          scrollThreshold={0.9}
          next={fetchMore}
          hasMore={!lastPage && !fetching}
          loader={
            (displayLoader && <LoadingPopup />) || (!displayLoader && <></>)
          }
        >
          <BottomNavigation/>
          <LostDogsGrid
            dogs={dogs}
            path={path}
            redirectToDogDetailsOrEdit={(id: number) =>
              redirectToDogDetailsOrEdit(id)
            }
          />
        </InfiniteScroll>
        {!displayLoader && !refreshRequired && (
          <Footer position={dogs.length > 3 ? "list" : "footer"} />
        )}
      </Content>
    </Root>
  );
}
