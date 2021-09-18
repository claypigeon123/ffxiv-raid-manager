import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import Sidebar from 'react-sidebar';
import { Header } from "./components/fragments/Header";
import { PageContainer } from "./components/fragments/PageContainer";
import { SidebarContent } from "./components/fragments/SidebarContent";
import { FaEarlybirds } from 'react-icons/fa';

const mql = window.matchMedia(`(min-width: 992px)`);

export const App = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarDocked, setSidebarDocked] = useState(null);

    useEffect(() => {

    }, [])

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

    return (
        <BrowserRouter>
            <Sidebar
            sidebar={<SidebarContent setSidebarStatus={setSidebarStatus} />}
            open={isSidebarOpen}
            onSetOpen={setSidebarStatus}
            docked={isSidebarDocked}
            styles={{ sidebar: { zIndex: '4000' }, content: { overflowY: 'scroll' } }}
            contentId="scrollableMain"
            sidebarClassName="sidebar-body border-right border-dark shadow">
                <Header setSidebarStatus={setSidebarStatus} />
                <Container className="px-0">
                    <PageContainer title="Welcome" icon={<FaEarlybirds />} infotext="It's good to be a birb">
                        Hello there
                    </PageContainer>
                </Container>
            </Sidebar>
        </BrowserRouter>
    )
};