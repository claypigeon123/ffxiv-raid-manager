import { SidebarNavHeader } from "../elements/SidebarNavHeader";


export const SidebarContent = ({ setSidebarStatus }) => {

    const closeSidebar = () => {
        setSidebarStatus(false);
    }

    return (
        <nav>
            <div className="navbar-dark pt-3" style={{ width: '270px' }}>
                <div> <SidebarNavHeader name="Navigation" large /> </div>
            </div>
        </nav>
    )
};