import { DodoLogo } from './DodoLogo';

export const SidebarNavHeader = ({ name, large = false }) => (
    <div className={`navbar-brand mb-0 ${large && "mb-4"}`} style={{ textDecoration: "none", paddingLeft: "0.9rem" }}>
        { large && <DodoLogo width={45} className="d-inline-block mr-1" /> }
        <span className={`${large ? "h4" : "h5"}`} style={{verticalAlign: "middle"}}> {name} </span>
    </div>
);