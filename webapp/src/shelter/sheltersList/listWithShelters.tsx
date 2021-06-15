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
import { IShelter } from "../shelterInterfaces";
import { State } from "../../app/stateInterfaces";
import SheltersInfoGrid from "../../commonComponents/grids/sheltersInfoGrid";

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

export default function ListWithShelters(props: any) {
  const lastPage = useSelector((state: State) => state.dogsLastPage); // eslint-disable-next-line
  const [displayLoader, setDisplayLoader] = useState(false);
  const [fetching, setFetching] = useState(false);

  const shelters = useSelector((state: State) => state.shelters as IShelter[]);
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh as boolean
  );
  const [initialRefresh, setInitialRefresh] = useState(true);
  const [isUpdateFilters, setIsUpdateFilters] = useState(false);
  const [filters, setFilters] = useState<IFilterSort>({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
  });
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  const classes = useStyles();
  const { path } = useRouteMatch();

  const onLostDogsClicked = () => {
    store.dispatch(clearDogList());
    history.push("/dogs");
  };

  const onLogOutClicked = () => {
    removeCookie(config.cookies.token, { path: "/" });
    removeCookie(config.cookies.userType, { path: "/" });
    removeCookie(config.cookies.userId, { path: "/" });
    store.dispatch(logoutThunk(cookies));
    history.push("/");
  };
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
          Actions.fetchSheltersThunk({
            filters: {
              ...filters,
              page: filters.page,
            },
            cookies: cookies,
          }) //filters
        );
      } catch (err) {
        console.error("Failed to fetch the shelters: ", err);
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
          Actions.fetchSheltersThunk({
            filters: {
              ...filters,
              page: filters.page,
            },
            cookies: cookies,
          }) //filters
        );
      } catch (err) {
        console.error("Failed to fetch the shelters: ", err);
      } finally {
        if (filters.page != null) {
          setFilters({ ...filters, page: filters.page + 1 });
        }
        setInitialRefresh(false);
        setFetching(false);
      }
    }
  };
  const onSettingsClicked = () => {
    store.dispatch(clearDogList());
    history.push("/settings");
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
                label="SHELTERS"
                classes={{ label: classes.title }}
              />
            </BottomNavigation>
          </Grid>
          <Grid item xs={3}>
            <BottomNavigation showLabels style={{ height: "100%" }}>
              <BottomNavigationAction
                showLabel={true}
                classes={{ label: classes.action, root: classes.action }}
                onClick={onLostDogsClicked}
                label="Lost Dogs"
                icon={<Pets />}
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
                disabled={cookies["userType"] === undefined}
                label="Logout"
                onClick={onLogOutClicked}
                icon={<ExitToApp />}
              />
            </BottomNavigation>
          </Grid>
        </Grid>
      </Header>
      <Content className={classes.main}>
        <InfiniteScroll
          dataLength={shelters.length}
          scrollThreshold={0.9}
          next={fetchMore}
          hasMore={!lastPage && !fetching}
          loader={
            (displayLoader && <LoadingPopup />) || (!displayLoader && <></>)
          }
        >
          <Toolbar/>
          <SheltersInfoGrid
            shelters={shelters}
            path={path}
            redirectToShelter={(id: number) => {
              history.push(`/shelter/${id}`);
            }}
          />
          {!displayLoader && !refreshRequired && (
            <Footer position={shelters.length > 3 ? "list" : "footer"} />
          )}
        </InfiniteScroll>
      </Content>
    </Root>
  );
}
