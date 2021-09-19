import { getJobIcon } from "../../util/RaidUtils";


export const ConfirmedSignupTableRow = ({ signup, user }) => {
    return (
        <div className="row d-block d-lg-flex signup-row anim-200 rounded text-break">
            <div className="col col-lg-4"> <div className="d-lg-none text-dodo-light"> Name: </div> {`${user?.inGameName}`} </div>
            <div className="col col-lg-8"> <div className="d-lg-none text-dodo-light"> Confirmed Job: </div> {getJobIcon(signup?.job)} </div>
        </div>
    )
};