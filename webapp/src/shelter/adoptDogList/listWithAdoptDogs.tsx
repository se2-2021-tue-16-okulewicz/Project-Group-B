import "date-fns";
import React, { useEffect, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Grid,
  Icon,
  MenuItem,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { store } from "../../app/store";
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
import ImageGrid from "../../commonComponents/imageGrid";
import InfiniteScroll from "react-infinite-scroll-component";
import SendIcon from "@material-ui/icons/Send";
import { clearDogList, logoutThunk } from "../../app/actions";
import LoadingPopup from "../../utilityComponents/LoadingPopup";
import { ExitToApp, HouseRounded, Pets } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faCopyright,
  faDog,
  faHandHolding,
  faHandPeace,
} from "@fortawesome/free-solid-svg-icons";
import { IFilters } from "../../utilityComponents/utilities";
import ContactInfo from "../../contactInfo/contactInformation";
import { IContactInfo } from "../../contactInfo/contactInfoInterface";
import { IShelterDogWithPicture } from "../../dog/dogInterfaces";
import ShelterListWithDogs from "../shelterDogsList/shelterListWithDogs";
import SheltersGrid from "../../commonComponents/sheltersGrid";
import ShelterDogGrid from "../../commonComponents/shelterDogGrid";
import { State } from "../../app/stateInterfaces";
import { IShelter } from "../shelterInterfaces";
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
      fontSize: "0.7em",
      color: "gray",
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
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      display: "flex",
      height: "15vh",
    },
    title: {
      color: "black",
      fontSize: "1.75em",
      fontFamily: "Comfortaa",
      fontWeight: "normal",
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
      width: "30%", // px, (%, rem, em is compatible)
      collapsible: false,
    })
    .registerPermanentConfig("sm", {
      width: "20%", // px, (%, rem, em is compatible)
      collapsible: false,
    })
    .registerPermanentConfig("md", {
      width: "18%", //x, (%, rem, em is compatible)
      collapsible: false,
    });
});

export default function ListWithAdoptDogs(props: any) {
  const history = useHistory();
  const location = useLocation();
  const {path} = useRouteMatch();
  const shelterId = location.pathname.split("/shelter/")[1];
  const [displayLoader, setDisplayLoader] = useState(true);
  const loading = useSelector((state: State) => state.loading as boolean);
  //const [listFetched, setListFetched] = useState(false); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const lastPage = useSelector((state: State) => state.dogsLastPage);
  const shelterInfo = useSelector(
    (state:State) => state.shelter as IShelter
  )
  const shelterDogs = useSelector(
    (state: State) => state.dogs as IShelterDogWithPicture[]
  );
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh as boolean
  );
  const [pageRefresh, setPageRefresh] = useState(true);
  const classes = useStyles();

  const [filters, setFilters] = useState<IFilters>({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
  });
  function clearStorage() {
    sessionStorage.removeItem("dogId");
    //sessionStorage.removeItem("listFetched");
    sessionStorage.removeItem("editDogFields");
    sessionStorage.removeItem("listVisible");
    sessionStorage.clear();
  }
  const onDogsListClicked = () => {

  };
  const onInfoClicked = () => {
  };
  const onLostDogsCLicked = () => {
    store.dispatch(clearDogList());
    history.push("/dogs");
  };
  const onLogOutClicked = () => {
    removeCookie(config.cookies.token, { path: "/" });
    removeCookie(config.cookies.userType, { path: "/" });
    removeCookie(config.cookies.userId, { path: "/" });
    clearStorage();
    store.dispatch(logoutThunk(cookies));
    history.push("/");
  };

  //refresh page
  useEffect(() => {
    if (pageRefresh) {
      store.dispatch(clearDogList());
      setPageRefresh(false);
    } // eslint-disable-next-line
  }, [pageRefresh]);

  // fetch and append page 0
  useEffect(() => {
    if (refreshRequired && !lastPage) {
      try {
        store.dispatch(
          Actions.fetchSheltersThunk({
            filters: {
              ...filters,
              page: config.defaultFilters.page,
            },
            cookies: cookies,
          }) //filters
        );
        /*store.dispatch(
          Actions.fetchContactInfoThunk({
            userId: cookies[config.cookies.userId],
            cookies: cookies,
          })
        );*/
      } catch (err) {
        console.error("Failed to fetch the dogs: ", err);
      } finally {
        setFilters({ ...filters, page: config.defaultFilters.page + 1 });
        setDisplayLoader(false);
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
      if (filters.page) {
        setFilters({ ...filters, page: filters.page + 1 });
      }
    }
  };

  function redirectToDogDetailsOrEdit(id: number) {
    sessionStorage.setItem("dogId", JSON.stringify(id as number));
    sessionStorage.removeItem("editDogFields");
    props.redirectToDogDetailsOrEdit(id);
  }

  return (
    <Root scheme={scheme}>
      <CssBaseline />
      <Header className={classes.header}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            disabled={true}
            label="SETTINGS"
            classes={{ label: classes.title }}
          />
        </BottomNavigation>
      </Header>
      <DrawerSidebar sidebarId="unique_id">
        <CollapseBtn />
        <SidebarContent name="sidebar">
          <Grid container className={classes.main} spacing={1}>
            <Grid item xs={12} />
            <Grid item xs={12} />
            <MenuItem
              className={classes.menuItem}
              data-testid="shelterButton"
              color="primary"
              onClick={onLostDogsCLicked}
            >
              <Pets/>
              <Grid item xs={1} />
              Lost Dogs
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
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
              className={classes.copyright}
              data-testid="copyrightButton"
              disabled={true}
            >
              <FontAwesomeIcon icon={faCopyright} className="Github" />{" "}
              <Grid item xs={1} />
              All Rights Reserved.
            </MenuItem>
          </Grid>
        </SidebarContent>
      </DrawerSidebar>
      <Content>
          <InfiniteScroll
            dataLength={shelterDogs.length}
            scrollThreshold={0.9}
            next={fetchMore}
            hasMore={!lastPage}
            loader={
              ((displayLoader || loading) && <LoadingPopup />) ||
              (!displayLoader && <></>)
            }
          >
            <ShelterDogGrid
              dogs={shelterDogs}
              path={path}
              /*redirectToDogDetailsOrEdit={(id: number) =>
                redirectToDogDetailsOrEdit(id)
              }*/
            />
          </InfiniteScroll>
      </Content>
    </Root>
  );
}
