import { formatDate } from "../../util/DateUtils";
import { displayConfirmedSignups } from "../../util/RaidUtils";
import { countdown } from '../../util/DateUtils';

export const RaidTableRow = ({ raid, open, small = false, selected = false }) => {
    return (
        <>
        {/* Mobile View */}
        <div className={`row d-lg-none anim-200 rounded text-break table-row ${selected ? 'selected-table-row' : 'table-row'}`} onClick={open}>
            <div className="col-12 text-dodo-bolder"> {raid.name} </div>
            <div className="col-12"> {displayConfirmedSignups(Object.keys(raid.confirmedSignups).length, true)} </div>
            <div className="col-12"> {Object.keys(raid.signups).length} signups </div>
            <div className="col-12 text-muted"> {countdown(raid.raidDateTime)} </div>
        </div>
        {/* Desktop View */}
        <div className={`row d-none d-lg-flex anim-200 rounded text-break ${selected ? 'selected-table-row' : 'table-row'}`} onClick={open}>
            <div className="col"> {raid.name} </div>
            <div className="col"> {formatDate(raid.raidDateTime)} </div>
            <div className="col"> {raid.createdBy} </div>
            { !small && <div className="col"> {Object.keys(raid.signups).length} </div>}
            { !small && <div className="col"> {displayConfirmedSignups(Object.keys(raid.confirmedSignups).length)} </div>}
        </div>
        </>
    )
};