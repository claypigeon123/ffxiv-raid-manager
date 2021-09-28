import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

import { formatDate } from "../../util/DateUtils";
import { getJobIcon, JOBS } from "../../util/RaidUtils";


export const SignupTableRow = ({ raid, signup, user, withControls = false, confirm }) => {

    const displayAlternates = () => signup?.alternates.length !== 0 
        ? signup?.alternates.map((item, index) => (
            <span key={index}> {getJobIcon(item)} </span>
        ))
        : <span className="text-muted"> N/A </span>
    
    const listConfirmAlternates = () => signup?.alternates.length !== 0
        ? signup?.alternates.map((item, index) => (
            <Dropdown.Item key={index} onClick={() => confirm(raid?.id, user?.id, item)}> Confirm as {getJobIcon(item)} {item} </Dropdown.Item>
        ))
        : <Dropdown.Item className="text-muted"> N/A </Dropdown.Item>

    return (
        <div className={`${withControls && "shadow rounded p-2"}`}>
            {/* Mobile View */}
            <div className="row d-lg-none signup-row anim-200 rounded text-break justify-content-center">
                <div className="col-12 d-flex">
                    <div className="mr-auto"> {user.inGameName} </div>
                    <div className="text-muted"> {formatDate(signup.signupDate, false, true, false)} </div>
                </div>
                <div className="col-12 text-center mb-2"> {getJobIcon(signup?.preference, 35)} </div>
                <div className="col-12 text-center"> {displayAlternates()} </div>
            </div>
            {/* Desktop View */}
            <div className="row d-none d-lg-flex signup-row anim-200 rounded text-break justify-content-center">
                <div className="col col-lg-3"> {user.inGameName} </div>
                <div className="col col-lg-1"> {getJobIcon(signup?.preference)} </div>
                <div className="col col-lg-6"> {displayAlternates()} </div>
                <div className="col col-lg-2"> {formatDate(signup.signupDate)} </div>
            </div>

            { withControls 
            ?
                (raid && !Object.keys(raid?.confirmedSignups).includes(user?.id))
                ?
                    <div className="row d-block d-lg-flex anim-200 mb-2 text-break justify-content-center">
                        <div className="col col-lg-4">
                            <Dropdown as={ButtonGroup} className="w-100 mt-2">
                                <Button className="btn-dodo" onClick={() => confirm(raid?.id, user?.id, signup?.preference)}> Confirm as {getJobIcon(signup?.preference)} {JOBS[signup?.preference].name} </Button>
                                <Dropdown.Toggle split className="btn-dodo" />
                                <Dropdown.Menu align="right" className="w-100">
                                    {listConfirmAlternates()}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                : <div className="text-muted text-center"> Already confirmed! </div> 
            : <></>
            }
        </div>
    )
};