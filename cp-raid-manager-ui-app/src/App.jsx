import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Sidebar from 'react-sidebar';
import { LoginPage } from "./components/pages/LoginPage";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "./components/elements/LoadingSpinner";
import { useDispatch } from "react-redux";
import { renewAction, checkSessionAction } from "./redux/actions/Actions";

import { Header } from "./components/fragments/Header";
import { SidebarContent } from "./components/fragments/SidebarContent";
import { Home } from "./components/pages/Home";
import { Profile } from "./components/pages/Profile";
import { UpcomingRaids } from "./components/pages/UpcomingRaids";
import { OldRaids } from "./components/pages/OldRaids";
import { NewRaid } from "./components/pages/NewRaid";


const mql = window.matchMedia(`(min-width: 992px)`);

export const App = () => {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.loading);
    const userData = useSelector(state => ({ user: state.user, token: state.token, loggedIn: state.loggedIn }));
    const checkedStorage = useSelector(state => state.checkedStorage);

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarDocked, setSidebarDocked] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(renewAction(token))
            return;
        }

        dispatch(checkSessionAction());
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        mql.addEventListener("change", mediaQueryChanged);
        setSidebarDocked(mql.matches);
        return () => {
            mql.removeEventListener("change", mediaQueryChanged);
        }
    }, [])

    const mediaQueryChanged = () => {
        setSidebarDocked(mql.matches);
        setSidebarOpen(false);
    }

    const setSidebarStatus = (isOpen) => {
        setSidebarOpen(isOpen);
    }

    if (!checkedStorage) {
        return <></>
    }

    if (userData.user === undefined || userData.token === undefined || userData.loggedIn === false) {
        return <LoginPage />
    }

    return (
        <BrowserRouter>
            {loading && <LoadingSpinner />}
            <Sidebar
            sidebar={<SidebarContent setSidebarStatus={setSidebarStatus} role={userData?.user?.role} />}
            open={isSidebarOpen}
            onSetOpen={setSidebarStatus}
            docked={isSidebarDocked}
            styles={{ sidebar: { zIndex: '4000' }, content: { overflowY: 'scroll' } }}
            contentId="scrollableMain"
            sidebarClassName="sidebar-body border-right border-dark shadow">
                <Header setSidebarStatus={setSidebarStatus} />
                <Container className="px-0">
                    <Switch>
                        <Route exact path="/raids/new" render={(props) => <NewRaid {...props} />} />
                        <Route exact path="/raids/upcoming" render={(props) => <UpcomingRaids {...props} />} />
                        <Route exact path="/raids/old" render={(props) => <OldRaids {...props} />} />
                        <Route exact path="/profile" render={(props) => <Profile {...props} />} />
                        <Route path="/" render={(props) => <Home {...props} />} />
                    </Switch>
                </Container>
            </Sidebar>
        </BrowserRouter>
    )
};