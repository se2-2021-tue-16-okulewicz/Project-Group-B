import "date-fns";
import React, { useEffect, useState } from "react";
import { Card, Grid, MenuItem } from "@material-ui/core";
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
import Footer from "../utilityComponents/Footer";
import SendIcon from "@material-ui/icons/Send";
import { clearDogList } from "../app/actions";
import LoadingPopup from "../utilityComponents/LoadingPopup";

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

export default function Settings() {
  const [displayLoader, setDisplayLoader] = useState(false);
  const [listFetched, setListFetched] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const lastPage = useSelector((state: State) => state.dogsLastPage);
  const dogs = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  const [filteredDogs, setFilteredDogs] = useState<ILostDogWithPicture[]>([]);
  const [displayedDogs, setDisplayedDogs] = useState<ILostDogWithPicture[]>([]);
  //const contactInfo = {cookies[username]}
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh as boolean
  );
  const [pageRefresh, setPageRefresh] = useState(true);
  const pages = useSelector((state: State) => state.pages as number);
  const classes = useStyles();
  const history = useHistory();
  const { path } = useRouteMatch();
  const [isListVisible, setListVisible] = useState(true);
  const [filters, setFilters] = useState({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
    ownerId: Number.parseInt(cookies[config.cookies.userId]),
  });
  const onDogsListClicked = () => {
    setListVisible(true);
  };
  const onInfoClicked = () => {
    setListVisible(false); /*getContactInfo();*/
  };
  const onShelterClicked = () => {
    store.dispatch(clearDogList());
    history.push("/listDogs");
  };

  //refresh page
  useEffect(() => {
    if (pageRefresh && !listFetched) {
      store.dispatch(clearDogList);
      setPageRefresh(false);
    }
  }, [pageRefresh]);

  // fetch and append page 0
  useEffect(() => {
    if (refreshRequired && !listFetched) {
      try {
        store.dispatch(
          Actions.fetchDogsThunk({
            filters: {
              ...filters,
              page: config.defaultFilters.page,
            },
            cookies: config.cookies.token,
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

  //fetch more
  useEffect(() => {
    if (!refreshRequired && !lastPage && !listFetched) {
      try {
        store.dispatch(
          Actions.fetchDogsThunk({
            filters: {
              ...filters,
              page: filters.page,
            },
            cookies: config.cookies.token,
          }) //filters
        );
      } catch (err) {
        console.error("Failed to fetch the dogs: ", err);
      } finally {
        setFilters({ ...filters, page: filters.page + 1 });
        setPageRefresh(false);
      }
    }
  }, [refreshRequired, lastPage, pages]);

  //filter
  useEffect(() => {
    if (!refreshRequired && lastPage && !listFetched) {
      let tmp = dogs;
      let addDogs = tmp.filter(
        (dog: ILostDogWithPicture) =>
          dog.ownerId === Number.parseInt(cookies[config.cookies.userId])
      );
      setFilteredDogs(addDogs);
      setDisplayedDogs(addDogs.slice(0, filters.size));
      setListFetched(true);
      setPageRefresh(false);
    }
  }, [refreshRequired, lastPage]);

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
              {!isListVisible && <SendIcon />}
              Contact Info
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              data-testid="dogsButton"
              color="primary"
              onClick={onDogsListClicked}
            >
              {isListVisible && <SendIcon />}
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
        {isListVisible && lastPage && listFetched && (
          <InfiniteScroll
            dataLength={displayedDogs.length}
            scrollThreshold={0.5}
            next={fetchMore}
            hasMore={filteredDogs.length > displayedDogs.length}
            loader={
              (displayLoader && <LoadingPopup />) || (!displayLoader && <></>)
            }
          >
            <ImageGrid dogs={displayedDogs} cookies={cookies} path={path} />
          </InfiniteScroll>
        )}
        {!isListVisible && <Card></Card>}
      </Content>
    </Root>
  );
}
