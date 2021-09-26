import { Button } from 'react-bootstrap';
import { FaUndoAlt } from 'react-icons/fa';

import { getJobIcon } from "../../util/RaidUtils";

export const ConfirmedSignupTableRow = ({ raid, signup, user, withControls = false, unconfirm }) => {
    return (
        <div className="row d-block d-lg-flex signup-row anim-200 rounded text-break">
            <div className="col col-lg-4"> <div className="d-lg-none text-dodo-light"> Name: </div> <div> {`${user?.inGameName}`} </div> </div>
            <div className="col col-lg"> <div className="d-lg-none text-dodo-light"> Confirmed Job: </div> {getJobIcon(signup?.job)} </div>
            { withControls && 
            <div className="col col-lg-2"> 
                <div className="d-lg-none mt-4 text-dodo-light" />
                <Button size="sm" variant="outline-danger" block onClick={() => unconfirm(raid?.id, user?.id)}>  <FaUndoAlt /> Cancel </Button>
            </div>  
            }
        </div>
    )
};