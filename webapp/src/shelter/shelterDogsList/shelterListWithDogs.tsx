import "date-fns";
import React, { useEffect, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { store } from "../../app/store";
import { IShelterDog } from "../../dog/dogInterfaces";
import * as Actions from "../../app/actions";
import { useCookies } from "react-cookie";
import Layout, { getContent, getHeader, Root } from "@mui-treasury/layout";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import config from "../../config/config";
import InfiniteScroll from "react-infinite-scroll-component";
import { ExitToApp, Pets, Settings } from "@material-ui/icons";
import { clearDogList, logoutThunk } from "../../app/actions";
import LoadingPopup from "../../utilityComponents/LoadingPopup";
import Footer from "../../utilityComponents/Footer";
import { IFilterSort } from "../../dog/dogsList/filterInterface";
import { State } from "../../app/stateInterfaces";
import ShelterDogsGrid from "../../commonComponents/grids/shelterDogsGrid";

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
    },
    main: {
      justifyContent: "center",
      width: "100%",
      display: "flex",
      alignItems: "center",
      marginTop: "2vh",
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

export default function ShelterListWithDogs(props: any) {
  const lastPage = useSelector((state: State) => state.dogsLastPage);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [fetching, setFetching] = useState(false);

  const shelterDogs = useSelector(
    (state: State) => state.shelterdogs as IShelterDog[]
  );
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh as boolean
  );
  const [initialRefresh, setInitialRefresh] = useState(true);
  const [isUpdateFilters, setIsUpdateFilters] = useState(false);
  const [filters, setFilters] = useState<IFilterSort>({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
  });
  const [edit, setEdit] =useState(false);
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  const classes = useStyles();

  const onRegisterClicked = () => {
    store.dispatch(clearDogList());
    history.push("/addShelterDog");
  };
  const onSettingsClicked = () => {
    // store.dispatch(clearDogList());
    // history.push("/settings");
  };
  const onEditClicked = () => {
    if(edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }

  };
  const onLogOutClicked = () => {
    removeCookie(config.cookies.token, { path: "/" });
    removeCookie(config.cookies.userType, { path: "/" });
    removeCookie(config.cookies.userId, { path: "/" });
    store.dispatch(logoutThunk(cookies));
    history.push("/");
  };

  function redirectToShelterDogEditOrDelete(id: number) {
    if (edit) {
      sessionStorage.setItem("dogId", JSON.stringify(id as number));
      sessionStorage.removeItem("editDogFields");
      props.redirectToShelterDogEditOrDelete(id);
    } else {
      try {
        store.dispatch(
          Actions.deleteOneShelterDogThunk({
            shelterId: cookies[config.cookies.userId],
            dogId: id,
            cookies: cookies,
          }) //filters
        );
      } catch (err) {
        console.error("Failed to fetch the dogs: ", err);
      }
    }
  }

  //refetches page every [10] minutes, only if there were changes in the list
  /*if(!pageRefresh  && !refreshRequired && lastPage && listFetched){
        setTimeout(() => {
          setPageRefresh(true);
        },600000)
  }*/
  //clears dog list, when page is refreshed or changed

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
          Actions.fetchShelterDogsThunk({
            filters: {
              ...filters,
              page: config.defaultFilters.page,
            },
            shelterId: cookies[config.cookies.userId],
            cookies: cookies,
          }) //filters
        );
      } catch (err) {
        console.error("Failed to fetch the dogs: ", err);
      } finally {
        setFilters({ ...filters, page: config.defaultFilters.page + 1 });
        if (isUpdateFilters) {
          setIsUpdateFilters(false);
        }
      }
    }
    // eslint-disable-next-line
  }, [refreshRequired]);

  const fetchMore = () => {
    if (!fetching) {
      setFetching(true);
      try {
        store.dispatch(
          Actions.fetchShelterDogsThunk({
            filters: {
              ...filters,
              page: filters.page,
            },
            shelterId: cookies[config.cookies.userId],
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
          <Grid item xs={3}>
            <BottomNavigation showLabels />
          </Grid>
          <Grid item xs={6}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                disabled={true}
                label="SHELTER"
                classes={{ label: classes.title }}
              />
            </BottomNavigation>
          </Grid>
          <Grid item xs={3}>
            <BottomNavigation showLabels style={{ height: "100%" }}>
              <BottomNavigationAction
                disabled={false}
                showLabel={true}
                onClick={onRegisterClicked}
                label="Register"
                classes={{ label: classes.action, root: classes.action }}
                icon={<Pets />}
              />
              <BottomNavigationAction
                disabled={false}
                showLabel={true}
                onClick={onEditClicked}
                label={edit ? "Remove": "Edit"}
                classes={{ label: classes.action, root: classes.action }}
                icon={<Pets />}
              />
              <BottomNavigationAction
                showLabel={true}
                classes={{ label: classes.action, root: classes.action }}
                disabled={true}
                onClick={onSettingsClicked}
                label="Settings"
                icon={<Settings />}
              />
              <BottomNavigationAction
                showLabel={true}
                classes={{ label: classes.action, root: classes.action }}
                disabled={cookies["userType"] === undefined}
                label="Logout"
                onClick={onLogOutClicked}
                icon={<ExitToApp />}
              />
            </BottomNavigation>
          </Grid>
        </Grid>
      </Header>
      <Content>
        <InfiniteScroll
          dataLength={shelterDogs.length}
          scrollThreshold={0.9}
          next={fetchMore}
          hasMore={!lastPage && !fetching}
          loader={
            (displayLoader && <LoadingPopup />) || (!displayLoader && <></>)
          }
        >
          <Toolbar />
          <ShelterDogsGrid
            dogs={shelterDogs}
            delete={true}
            redirectToDogDetailsOrDelete={(id: number) =>
              redirectToShelterDogEditOrDelete(id)
            }
          />
        </InfiniteScroll>
        {!displayLoader && !refreshRequired && (
          <Footer position={shelterDogs.length > 3 ? "list" : "footer"} />
        )}
      </Content>
    </Root>
  );
}
