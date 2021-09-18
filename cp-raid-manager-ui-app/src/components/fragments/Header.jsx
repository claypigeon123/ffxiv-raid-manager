import { Navbar, Button } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';

import { DodoLogo } from '../elements/DodoLogo';

export const Header = ({ setSidebarStatus }) => {
    return (
        <Navbar expand="lg" className="px-2 py-0 d-flex justify-content-around mb-3 border-bottom border-dodo shadow">
            <Button variant="outline-light" onClick={() => { setSidebarStatus(true) }} className="d-lg-none ml-0 ml-lg-3">
                <GiHamburgerMenu size="17" />
            </Button>
            <DodoLogo height={60} className="mr-auto py-2" />
        </Navbar>
    )
};