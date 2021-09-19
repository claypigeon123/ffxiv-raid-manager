import { formatDate } from "../../util/DateUtils";
import { displayConfirmedSignups } from "../../util/RaidUtils";


export const RaidTableRow = ({ raid, open }) => {
    return (
        <div className="row d-block d-lg-flex table-row anim-200 rounded text-break" onClick={open}>
            <div className="col"> <div className="d-lg-none text-dodo-light"> Name: </div> {raid.name} </div>
            <div className="col"> <div className="d-lg-none text-dodo-light"> Date: </div> {formatDate(raid.raidDateTime)} </div>
            <div className="col"> <div className="d-lg-none text-dodo-light"> Posted By: </div> {raid.createdBy} </div>
            <div className="col"> <div className="d-lg-none text-dodo-light"> Signups: </div> {Object.keys(raid.signups).length} </div>
            <div className="col"> <div className="d-lg-none text-dodo-light"> Confirmed Signups: </div> {displayConfirmedSignups(Object.keys(raid.confirmedSignups).length)} </div>
        </div>
    )
};