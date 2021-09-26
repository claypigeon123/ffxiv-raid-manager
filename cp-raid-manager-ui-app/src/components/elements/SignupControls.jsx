import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationTriangle, FaCube, FaCubes, FaCheck, FaUndo, FaEdit } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { JobSelection } from './JobSelection';


export const SignupControls = ({ raid, isConfirmed, isSignedUp, signupForRaid, signoffFromRaid }) => {

    const userId = useSelector(state => state.user.id);
    const [primary, setPrimary] = useState(undefined);
    const [isChanging, setIsChanging] = useState(false);
    const [secondaries, setSecondaries] = useState([]);

    useEffect(() => {
        setIsChanging(false);
    }, [raid])

    const changeSelection = () => {
        if (!isChanging) {
            setPrimary(raid?.signups[userId].preference);
            setSecondaries(raid?.signups[userId].alternates);
        }
        setIsChanging(!isChanging);
    }

    if ((isSignedUp || isConfirmed) && !isChanging) {
        let element = <></>
        if (isConfirmed) element = (<div style={{fontSize: 'larger'}} className="text-success text-center bg-very-dark rounded border border-dodo p-3 mx-5"> <FaCheckCircle size="25" /> Your position was confirmed by a raid leader! </div>)
        else if (isSignedUp) element = (<div style={{fontSize: 'larger'}} className="text-success text-center bg-very-dark rounded border border-dodo p-3 mx-5"> <IoMdRefresh size="29" className="small-spinner" /> You are signed up! Awaiting raid leader confirmation... </div>)
        return (
            <div>
                {element}

                <Row className="mt-5 justify-content-center">
                    <Col lg="4">
                        <Button onClick={changeSelection} block className="btn-dodo"> <FaEdit size="20" /> Modify Job Selection </Button>
                    </Col>
                    <Col lg="4" className="mt-4 mt-lg-0">
                        <Button onClick={() => signoffFromRaid(raid?.id)} block variant="outline-danger"> <FaUndo size="20" /> Cancel Signup </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    return (
        <div>
            <div style={{fontSize: 'larger'}} className="text-warning text-center bg-very-dark rounded border border-dodo p-3 mx-5"> <FaExclamationTriangle size="25" /> {isChanging ? "You are changing your selections." : "You have not signed up yet."} </div>

            <div style={{fontSize: 'large'}} className="text-dodo-light border-bottom border-dodo mt-4"> <FaCube size="25" /> Choose your primary job preference: </div>
            <JobSelection value={primary} setValue={setPrimary} />

            <div style={{fontSize: 'large'}} className="text-dodo-light border-bottom border-dodo mt-3"> <FaCubes size="25" /> Choose some alternate jobs if you want: </div>
            <JobSelection multiple value={secondaries} setValue={setSecondaries} />

            <Row className="mt-5 justify-content-center">
                <Col lg="4">
                    <Button onClick={() => signupForRaid(raid?.id, primary, secondaries)} disabled={primary === undefined} block className="btn-dodo"> <FaCheck size="20" /> Sign Up! </Button>
                </Col>
                { isChanging &&
                <Col lg="4">
                    <Button onClick={changeSelection} block variant="outline-danger"> <FaUndo size="20" /> Cancel </Button>
                </Col>
                }
            </Row>
        </div>
    )
};