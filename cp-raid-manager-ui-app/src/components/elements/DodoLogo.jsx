import { Link } from 'react-router-dom';

import Logo from '../../assets/img/dodologo.png';

export const DodoLogo = ({ height, width, className }) => {

    return (
        <div className={className} >
            <Link to="/">
                <img className="dodo-header-logo" src={Logo} height={height} width={width} alt="Dodo Logo" />
            </Link>
        </div>
    );
}