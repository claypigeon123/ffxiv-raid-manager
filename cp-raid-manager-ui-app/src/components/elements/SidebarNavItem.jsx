import { NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const SidebarNavItem = ({ to, name, icon, onClick, exact = false }) => {
    return (
        <NavItem as={NavLink} to={to} exact={exact} className="nav-link anim-400 sidebar-inactive" activeClassName="sidebar-active" onClick={onClick}>
            {icon} {name}
        </NavItem>
    )
};