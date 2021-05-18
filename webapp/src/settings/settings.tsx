import "date-fns";
import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Divider, Grid, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import { useRouteMatch, useHistory } from "react-router-dom";
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
import SendIcon from "@material-ui/icons/Send";
import { clearDogList, logoutThunk } from "../app/actions";
import LoadingPopup from "../utilityComponents/LoadingPopup";
import { ExitToApp, HouseRounded } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { IFilters } from "../utilityComponents/utilities";
import ContactInfo from "../contactInfo/contactInformation";
import { IContactInfo } from "../contactInfo/contactInfoInterface";
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
      backgroundColor:"white",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      display: "flex",
    },
    title: {
      color: "black",
      fontSize: "1.75em",
      fontFamily: "Comfortaa",
      fontWeight:"normal"
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
      initialHeight:"8%"
      
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

export default function Settings(props: any) {
  const [displayLoader, setDisplayLoader] = useState(true);
  const loading = useSelector(
    (state: State) => state.loading as boolean
  );
  //const [listFetched, setListFetched] = useState(false); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const lastPage = useSelector((state: State) => state.dogsLastPage);
  const dogs = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  const contactInfo = useSelector(
    (state: State) => state.contactInfo as IContactInfo
  );
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh as boolean
  );
  const [pageRefresh, setPageRefresh] = useState(true);
  const pages = useSelector((state: State) => state.pages as number);
  const classes = useStyles();
  const history = useHistory();
  const { path } = useRouteMatch();
  const isInputNotNull = sessionStorage.getItem("listVisible") !== null;
  const [isListVisible, setListVisible] = useState<boolean>(
    isInputNotNull
      ? JSON.parse(sessionStorage.getItem("listVisible") as string)
      : true
  );
  const [filters, setFilters] = useState<IFilters>({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
    filter:{
      ownerId: Number.parseInt(cookies[config.cookies.userId]),
    }
  });
  function clearStorage() {
    sessionStorage.removeItem("dogId");
    //sessionStorage.removeItem("listFetched");
    sessionStorage.removeItem("editDogFields");
    sessionStorage.removeItem("listVisible");
    sessionStorage.clear();
  }
  const onDogsListClicked = () => {
    sessionStorage.setItem("listVisible", JSON.stringify(true));
    setListVisible(true);
  };
  const onInfoClicked = () => {
    sessionStorage.setItem("listVisible", JSON.stringify(false));
    setListVisible(false); /*getContactInfo();*/
  };
  const onShelterClicked = () => {
    store.dispatch(clearDogList());
    history.push("/listDogs");
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
      store.dispatch(clearDogList);
      setPageRefresh(false);
    } // eslint-disable-next-line
  }, [pageRefresh]);

 

  // fetch and append page 0
  useEffect(() => {
    if (refreshRequired && !lastPage) {
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
      if(filters.page){
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
          <BottomNavigationAction disabled={true} label="SETTINGS" classes={{label:classes.title}}/>
        </BottomNavigation>
      </Header>
      <DrawerSidebar sidebarId="unique_id">
        <CollapseBtn />
        <SidebarContent name="sidebar">
          <Grid container className={classes.main} spacing={1}>
            <MenuItem
              className={classes.menuItem}
              data-testid="registerButton"
              color="primary"
              onClick={onInfoClicked}
            >
              {!isListVisible && <SendIcon />}
              {!isListVisible && <Grid item xs={1} />}
              Contact Info
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              data-testid="dogsButton"
              color="primary"
              onClick={onDogsListClicked}
            >
              {isListVisible && <SendIcon />}
              {isListVisible && <Grid item xs={1} />}
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
              <HouseRounded />
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
        {isListVisible && (
          <InfiniteScroll
            dataLength={dogs.length}
            scrollThreshold={0.9}
            next={fetchMore}
            hasMore={!lastPage}
            loader={
              ((displayLoader || loading) && <LoadingPopup />) || (!displayLoader && <></>)
            }
          >
            <ImageGrid
              dogs={dogs}
              path={path}
              redirectToDogDetailsOrEdit={(id: number) =>
                redirectToDogDetailsOrEdit(id)
              }
            />
          </InfiniteScroll>
        )}
        {!isListVisible && <ContactInfo contactInfo={contactInfo} />}
      </Content>
    </Root>
  );
}
