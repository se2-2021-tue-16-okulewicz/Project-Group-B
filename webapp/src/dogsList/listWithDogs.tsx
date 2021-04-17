import "date-fns";
import React, { useEffect, useState } from "react";
import { Button, Grid, Menu, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { store } from "../app/store";
import { State } from "../app/reducer";
import { ILostDogWithPicture } from "../dog/dogInterfaces";
import * as Actions from "../../src/app/actions";
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
import { Add, Pets, Settings } from "@material-ui/icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";

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
      fontSize: "1.3em",
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
  })
);

scheme.configureHeader((builder) => {
  builder
    .registerConfig("md", {
      position: "absolute",
    })
    .registerConfig("xs", {
      position: "absolute", // won't stick to top when scroll down
    });
});

scheme.configureEdgeSidebar((builder) => {
  builder
    .create("unique_id", { anchor: "left" })
    .registerPermanentConfig("xs", {
      width: "18%", // px, (%, rem, em is compatible)
      collapsible: true,
      collapsedWidth: "10%",
    })
    .registerPermanentConfig("md", {
      width: "15%", // px, (%, rem, em is compatible)
      collapsible: true,
      collapsedWidth: "6%",
    });
});

export default function ListWithDogs() {
  const state = store.getState();
  const [collapsed, setCollapsed] = useState(false);
  const dogs = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  const [filteredDogs, setFilteredDogs] = useState<ILostDogWithPicture[]>([]);
  const loading = useSelector((state: State) => state.loading);
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh
  );
  const lastPage = useSelector((state: State) => state.dogsLastPage);
  const [filters, setFilters] = useState({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
  });
  // is this page last?
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();

  const onRegisterClicked = () => {
    history.push("/addDog");
  };
  const onSettingsClicked = () => {
    history.push("/settings");
  };

  const classes = useStyles();
  const { path } = useRouteMatch();
  useEffect(() => {
    if (refreshRequired) {
      // fetch and append page 0
      store.dispatch(
        Actions.fetchDogsThunk({
          filters: {
            ...filters,
            page: config.defaultFilters.page,
          },
          cookies: config.cookies.token,
        }) //filters
      );
      //set page number to 0
      setFilters({ ...filters, page: config.defaultFilters.page });
      
    } // eslint-disable-next-line
  }, [refreshRequired]);


  
  React.useEffect(() => {
    let tmp = dogs;
    setFilteredDogs(tmp.filter((dog:ILostDogWithPicture) => dog.isFound != true));
  }, [dogs]);

  const fetchMore = () => {
    store.dispatch(
      Actions.fetchDogsThunk({
        filters: { ...filters, page: filters.page + 1 },
        cookies: cookies,
      }) //filters
    );
    setFilters({ ...filters, page: filters.page + 1 });
  };

  return (
    <Root scheme={scheme}>
      <CssBaseline />
      <Header className={classes.header}>
        <Toolbar>
          <SidebarTrigger sidebarId="unique_id" />
          Shelter
        </Toolbar>
      </Header>
      <DrawerSidebar sidebarId="unique_id">
        <CollapseBtn
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        />
        <SidebarContent name="sidebar">
          {!collapsed && (
            <Grid container className={classes.main} spacing={1}>
              {}
              <MenuItem
                className={classes.registerButton}
                data-testid="registerButton"
                color="primary"
                //variant="contained"
                //size="medium"
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
                //variant="contained"
                //size="medium"
                onClick={onSettingsClicked}
              >
                <Settings />
                <Grid item xs={1} />
                Settings
              </MenuItem>
            </Grid>
          )}
        </SidebarContent>
        <Footer />
      </DrawerSidebar>
      <Content>
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
          <ImageGrid dogs={filteredDogs} id={-1} cookies={cookies} path={path}/>
        </InfiniteScroll>
      </Content>
    </Root>
  );
}
