import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationTriangle, FaCube, FaCubes, FaCheck, FaUndo, FaEdit } from 'react-icons/fa';
import { JobSelection } from './JobSelection';


export const SignupControls = ({ raid, isSignedUp, signupForRaid, signoffFromRaid }) => {

    const [primary, setPrimary] = useState(undefined);
    const [secondaries, setSecondaries] = useState([]);

    if (isSignedUp) {
        return (
            <div>
                <div style={{fontSize: 'larger'}} className="text-success text-center"> <FaCheckCircle size="25" /> You are signed up! </div>

                <Row className="mt-5 justify-content-around">
                    <Col lg="4">
                        <Button onClick={() => signoffFromRaid(raid?.id)} block className="btn-dodo"> <FaEdit size="20" /> Modify Job Selection </Button>
                    </Col>
                    <Col lg="4">
                        <Button onClick={() => signoffFromRaid(raid?.id)} block variant="outline-danger"> <FaUndo size="20" /> Cancel Signup </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    return (
        <div>
            <div style={{fontSize: 'larger'}} className="text-warning text-center"> <FaExclamationTriangle size="25" /> You have not signed up yet. </div>

            <div style={{fontSize: 'large'}} className="text-dodo-light border-bottom border-dodo mt-4"> <FaCube size="25" /> Choose your primary job preference: </div>
            <JobSelection value={primary} setValue={setPrimary} />

            <div style={{fontSize: 'large'}} className="text-dodo-light border-bottom border-dodo mt-3"> <FaCubes size="25" /> Choose some alternate jobs if you want: </div>
            <JobSelection multiple value={secondaries} setValue={setSecondaries} />

            <Row className="mt-5 justify-content-center">
                <Col lg="4">
                    <Button onClick={() => signupForRaid(raid?.id, primary, secondaries)} disabled={primary === undefined} block className="btn-dodo"> <FaCheck size="20" /> Sign Up! </Button>
                </Col>
            </Row>
        </div>
    )
};