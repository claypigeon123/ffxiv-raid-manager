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
            <div className="row d-block d-lg-flex signup-row anim-200 rounded text-break justify-content-center">
                <div className="col col-lg-3"> <div className="d-lg-none text-dodo-light"> Name: </div> {`${user?.inGameName}`} </div>
                <div className="col col-lg-1"> <div className="d-lg-none text-dodo-light"> Job: </div> {getJobIcon(signup?.preference)} </div>
                <div className="col col-lg-6"> <div className="d-lg-none text-dodo-light"> Alternates: </div> {displayAlternates()} </div>
                <div className="col col-lg-2"> <div className="d-lg-none text-dodo-light"> Signup Date: </div> {formatDate(signup.signupDate)} </div>
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