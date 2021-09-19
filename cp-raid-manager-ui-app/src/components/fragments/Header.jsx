import { Navbar, Button } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { DodoLogo } from '../elements/DodoLogo';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/actions/Actions';

export const Header = ({ setSidebarStatus }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const logout = () => {
        dispatch(logoutAction());
    }

    return (
        <Navbar expand="lg" className="px-2 py-0 d-flex justify-content-around mb-3 border-bottom border-dodo shadow">
            <Button variant="outline-light" onClick={() => { setSidebarStatus(true) }} className="d-lg-none ml-0 ml-lg-3">
                <GiHamburgerMenu size="17" />
            </Button>
            <DodoLogo height={60} className="py-2 mr-auto mr-lg-3 ml-2" />
            <div className="mr-auto text-dodo-header d-none d-lg-block"> Dodo Raid Manager </div>
            <div className="align-self-center d-flex py-0 pe-3">
                <div className="d-flex">
                    <div className="align-self-center mr-4 d-none d-md-inline"> Logged in as <span className="text-dodo-bolder">{user?.username}</span> </div>
                    <div className="align-self-center mr-4 d-md-none"> <span className={`text-dodo-bold`}>{user?.username}</span> </div>
                    <Button onClick={logout} className="btn-dodo"> <FaSignOutAlt size="19" /> Logout </Button>
                </div>
            </div>
        </Navbar>
    )
};