import { formatDate } from "../../util/DateUtils";
import { getJobIcon } from "../../util/RaidUtils";


export const SignupTableRow = ({ signup, user }) => {

    const displayAlternates = () => signup?.alternates.map((item, index) => (
        <span key={index}> {getJobIcon(item)} </span>
    ))

    return (
        <div className="row d-block d-lg-flex signup-row anim-200 rounded text-break">
            <div className="col col-lg-3"> <div className="d-lg-none text-dodo-light"> Name: </div> {`${user?.inGameName}`} </div>
            <div className="col col-lg-1"> <div className="d-lg-none text-dodo-light"> Job: </div> {getJobIcon(signup?.preference)} </div>
            <div className="col col-lg-6"> <div className="d-lg-none text-dodo-light"> Alternates: </div> {displayAlternates()} </div>
            <div className="col col-lg-2"> <div className="d-lg-none text-dodo-light"> Signup Date: </div> {formatDate(signup.signupDate)} </div>
        </div>
    )
};