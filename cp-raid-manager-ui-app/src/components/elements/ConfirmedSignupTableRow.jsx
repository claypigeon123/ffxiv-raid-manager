import { Button } from 'react-bootstrap';
import { FaUndoAlt } from 'react-icons/fa';

import { getJobIcon } from "../../util/RaidUtils";

export const ConfirmedSignupTableRow = ({ raid, signup, user, withControls = false, unconfirm }) => {
    return (
        <div className="p-2">
            {/* Mobile View */}
            <div className="row d-lg-none signup-row anim-200 rounded text-break">
                <div className="col-12 d-flex px-2">
                    <div className="mr-2"> {getJobIcon(signup?.job, 30)} </div>
                    <div className="mr-auto text-dodo-light h5 mb-0 pt-1"> {`${user?.inGameName}`} </div>
                    { withControls &&
                        <div><Button size="sm" variant="outline-danger" block onClick={() => unconfirm(raid?.id, user?.id)}> <FaUndoAlt /> </Button></div>
                    }
                </div>
            </div>
            {/* Desktop View */}
            <div className="row d-none d-lg-flex signup-row anim-200 rounded text-break">
                <div className="col col-lg-4"> {`${user?.inGameName}`} </div>
                <div className="col col-lg"> {getJobIcon(signup?.job)} </div>
                { withControls &&
                <div className="col col-lg-2"> 
                    <div className="d-lg-none mt-4 text-dodo-light" />
                    <Button className="m-0 p-0" size="sm" variant="outline-danger" block onClick={() => unconfirm(raid?.id, user?.id)}>  <FaUndoAlt /> Cancel </Button>
                </div>
                }
            </div>
        </div>
    )
};