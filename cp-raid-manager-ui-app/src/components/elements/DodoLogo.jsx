import { Link } from 'react-router-dom';

import Logo from '../../assets/img/dodologo.png';

export const DodoLogo = ({ height, width, className, withoutLink = false, bg = false }) => {

    return (
        <div className={className} >
            { withoutLink
            ? <img className={`${!withoutLink && 'dodo-header-logo'} ${bg && 'bg-dodo p-1 rounded-circle'}`} src={Logo} height={height} width={width} alt="Dodo Logo" />
            : <Link to="/"> <img className="dodo-header-logo" src={Logo} height={height} width={width} alt="Dodo Logo" /> </Link>
            }
        </div>
    );
}