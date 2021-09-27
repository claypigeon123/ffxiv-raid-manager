import { formatDate } from "../../util/DateUtils";
import { displayConfirmedSignups } from "../../util/RaidUtils";


export const RaidTableRow = ({ raid, open, small = false, selected = false }) => {
    return (
        <div className={`row d-block d-lg-flex anim-200 rounded text-break ${selected ? 'selected-table-row' : 'table-row'}`} onClick={open}>
            <div className="col"> <div className={`d-lg-none ${selected ? "text-light" : "text-dodo-light"}`}> Name: </div> <div className={`${selected ? "text-black" : "text-light"}`}> {raid.name} </div></div>
            <div className="col"> <div className={`d-lg-none ${selected ? "text-light" : "text-dodo-light"}`}> Date: </div> <div className={`${selected ? "text-black" : "text-light"}`}> {formatDate(raid.raidDateTime)} </div></div>
            <div className="col"> <div className={`d-lg-none ${selected ? "text-light" : "text-dodo-light"}`}> Posted By: </div> <div className={`${selected ? "text-black" : "text-light"}`}> {raid.createdBy} </div></div>
            { !small && <div className="col"> <div className={`d-lg-none ${selected ? "text-light" : "text-dodo-light"}`}> Signups: </div> <div className={`${selected ? "text-black" : "text-light"}`}> {Object.keys(raid.signups).length} </div></div>}
            { !small && <div className="col"> <div className={`d-lg-none ${selected ? "text-light" : "text-dodo-light"}`}> Confirmed Signups: </div> <div> {displayConfirmedSignups(Object.keys(raid.confirmedSignups).length)} </div></div>}
        </div>
    )
};