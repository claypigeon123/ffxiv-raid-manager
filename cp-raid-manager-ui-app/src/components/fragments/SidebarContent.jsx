import { SidebarNavHeader } from "../elements/SidebarNavHeader";
import { SidebarNavItem } from "../elements/SidebarNavItem";
import { FaUser, FaArchive, FaCalendarPlus } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { Nav } from "react-bootstrap";

export const SidebarContent = ({ setSidebarStatus, role }) => {

    const closeSidebar = () => {
        setSidebarStatus(false);
    }

    return (
        <nav>
            <div className="navbar-dark pt-3" style={{ width: '270px' }}>
                <div> <SidebarNavHeader name="Navigation" large /> </div>

                <SidebarNavHeader name="Profile" />
                <Nav className="navbar-nav mr-auto mb-3">
                    <SidebarNavItem exact to="/profile" name="Profile" icon={<FaUser size="20" />} />
                </Nav>

                <SidebarNavHeader name="Raids" />
                <Nav className="navbar-nav mr-auto mb-3">
                    <SidebarNavItem exact to="/raids/upcoming" name="Upcoming Raids" icon={<GiCrossedSwords size="20" />} />
                    <SidebarNavItem exact to="/raids/old" name="Old Raids" icon={<FaArchive size="20" />} />
                </Nav>

                { (role === "ADMIN" || role === "RAID_LEADER") &&
                <>
                    <SidebarNavHeader name="Raid Leader" />
                    <Nav className="navbar-nav mr-auto mb-3">
                        <SidebarNavItem exact to="/raids/new" name="Post New" icon={<FaCalendarPlus size="20" />} />
                    </Nav>
                </>}
            </div>
        </nav>
    )
};