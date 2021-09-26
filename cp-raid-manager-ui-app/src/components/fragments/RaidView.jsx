import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { FaLink, FaCog, FaArrowAltCircleUp, FaCheckCircle, FaInfoCircle, FaBook } from 'react-icons/fa';

import { formatDate } from "../../util/DateUtils"
import { SignupTableRow } from '../elements/SignupTableRow';
import { ConfirmedSignupTableRow } from '../elements/ConfirmedSignupTableRow';
import { SmallSpinner } from '../elements/SmallSpinner';
import { compareSignups, countRoles, ROLES } from '../../util/RaidUtils';
import { SignupControls } from '../elements/SignupControls';
import { useSelector } from 'react-redux';
import { RaidLeaderControls } from '../elements/RaidLeaderControls';


export const RaidView = ({ raid, users, loading, signupForRaid, signoffFromRaid, old = false }) => {

    const user = useSelector(state => state.user);

    const [counts, setCounts] = useState({});
    const [tabKey, setTabKey] = useState('1');

    useEffect(() => {
        if (!raid) return;
        setCounts(countRoles(Object.entries(raid?.confirmedSignups).map(([key, value]) => value.job)));
    }, [raid])

    const listSignups = () => raid && Object.entries(raid?.signups)
        .sort(([key1, value1], [key2, value2]) => compareSignups(value1.signupDate, value2.signupDate))
        .map( ([key, value], index) => {
            const user = users.filter(user => user.id === key)[0];

            return <SignupTableRow key={index} signup={value} user={user} />
    });

    const listConfirmedSignups = () => raid && Object.entries(raid?.confirmedSignups).map(([key, value], index) => {
        const user = users.filter(user => user.id === key)[0];

        return <ConfirmedSignupTableRow key={index} signup={value} user={user} />
    });

    const displayRaidLog = () => raid?.log
        ? <div> <Button as={Link} to={{ pathname: raid?.log }} target="_blank" rel="noopener noreferrer" className="btn-outline-dodo"> <FaLink size="20" /> Go to log </Button> </div>
        : <div className="text-muted"> No log attached yet. </div>

    if (loading) {
        return <SmallSpinner containerClassNames="text-dodo-light" />
    }

    return (
        <>
            <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} className="border-dodo">
                { !old &&
                <Tab eventKey="6" title={<div> <FaCog /> Raid Leader Controls </div>} tabClassName="dodo-tab dodo-tab-admin text-danger bg-very-dark">
                    <>
                        <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Raid Leader Controls </div>
                        <RaidLeaderControls />
                    </>
                </Tab>
                }
                <Tab eventKey="1" title={<div> <FaInfoCircle /> Info </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Information </div>
                    <Row className="justify-content-around text-center">
                        <Col lg="4" >
                            <div className="bg-very-dark rounded border border-dodo py-1">
                                <div className="text-dodo-bold"> Date Posted </div>
                                <div> {formatDate(raid?.createdDate)} </div>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="bg-very-dark rounded border border-dodo py-1 mt-3 mt-lg-0">
                                <div className="text-dodo-bold"> Last Update </div>
                                <div> {formatDate(raid?.updatedDate)} </div>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="bg-very-dark rounded border border-dodo py-1 mt-3 mt-lg-0">
                                <div className="text-dodo-bold"> Raid Date Time </div>
                                <div> {formatDate(raid?.raidDateTime)} </div>
                            </div>
                        </Col>
                    </Row>
                    { !old &&
                    <Row className="justify-content-around text-center mt-3">
                        <Col lg="2" >
                            <div className="bg-very-dark rounded border border-dodo py-1">
                                <div className="text-dodo-bold"> <img width="22" src={ROLES.TANK.icon} alt="role-icon-tank" /> Tanks </div>
                                <div> {counts.tank} </div>
                            </div>
                        </Col>
                        <Col lg="2">
                            <div className="bg-very-dark rounded border border-dodo py-1 mt-3 mt-lg-0">
                                <div className="text-dodo-bold"> <img width="22" src={ROLES.HEALER.icon} alt="role-icon-healer" /> Healers </div>
                                <div> {counts.healer} </div>
                            </div>
                        </Col>
                        <Col lg="2">
                            <div className="bg-very-dark rounded border border-dodo py-1 mt-3 mt-lg-0">
                                <div className="text-dodo-bold"> <img width="22" src={ROLES.MELEE.icon} alt="role-icon-melee" /> Melee </div>
                                <div> {counts.melee} </div>
                            </div>
                        </Col>
                        <Col lg="2">
                            <div className="bg-very-dark rounded border border-dodo py-1 mt-3 mt-lg-0">
                                <div className="text-dodo-bold"> <img width="22" src={ROLES.RANGED.icon} alt="role-icon-ranged" /> Ranged </div>
                                <div> {counts.ranged} </div>
                            </div>
                        </Col>
                        <Col lg="2">
                            <div className="bg-very-dark rounded border border-dodo py-1 mt-3 mt-lg-0">
                                <div className="text-dodo-bold"> <img width="22" src={ROLES.MAGIC.icon} alt="role-icon-magical" /> Magical </div>
                                <div> {counts.magic} </div>
                            </div>
                        </Col>
                    </Row>
                    }
                </Tab>

                <Tab eventKey="2" title={<div> <FaCheckCircle /> Confirmed Signups </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted">  Confirmed Signups </div>
                    { raid && Object.keys(raid?.confirmedSignups).length === 0 
                    ? <div className="text-muted"> Nothing to display yet. </div> 
                    : 
                    <div className="mx-2">
                        <div className="h5 d-none d-lg-flex text-dodo row border-bottom border-dodo mb-2">
                            <div className="col col-lg-4"> Name </div>
                            <div className="col col-lg-8"> Confirmed As </div>
                        </div>
                        <div>
                            {listConfirmedSignups()}
                        </div>
                    </div>
                    }
                </Tab>

                <Tab eventKey="3" title={<div> <FaArrowAltCircleUp /> Signups </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Signups </div>
                    { raid && Object.keys(raid?.signups).length === 0 
                    ? <div className="text-muted"> Nothing to display yet. </div> 
                    : 
                    <div className="mx-2">
                        <div className="h5 d-none d-lg-flex text-dodo row border-bottom border-dodo mb-2">
                            <div className="col col-lg-3"> Name </div>
                            <div className="col col-lg-1"> Job </div>
                            <div className="col col-lg-6"> Alternates </div>
                            <div className="col col-lg-2"> Signup Date </div>
                        </div>
                        <div>
                            {listSignups()}
                        </div>
                    </div>
                    }
                </Tab>

                { !old &&
                <Tab eventKey="4" title={<div> <FaCog /> Controls </div>} tabClassName="dodo-tab">
                    <>
                        <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Controls </div>
                        <SignupControls raid={raid} isConfirmed={raid && Object.keys(raid?.confirmedSignups).includes(user?.id)} isSignedUp={raid && Object.keys(raid?.signups).includes(user?.id)} signupForRaid={signupForRaid} signoffFromRaid={signoffFromRaid} />
                    </>
                </Tab>
                }

                { old &&
                <Tab eventKey="5" title={<div> <FaBook /> Log </div>} tabClassName="dodo-tab">
                    <>
                        <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Raid Log </div>
                        {displayRaidLog()}
                    </>
                </Tab>
                }
            </Tabs>
        </>
    )
}