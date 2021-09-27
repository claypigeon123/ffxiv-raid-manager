import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { FaLink, FaCog, FaArrowAltCircleUp, FaCheckCircle, FaInfoCircle, FaBook } from 'react-icons/fa';

import { formatDate } from "../../util/DateUtils"
import { SmallSpinner } from '../elements/SmallSpinner';
import { countRoles, ROLES } from '../../util/RaidUtils';
import { SignupControls } from '../elements/SignupControls';
import { useSelector } from 'react-redux';
import { RaidLeaderControls } from './RaidLeaderControls';
import { SignupTable } from './SignupTable';
import { ConfirmedSignupTable } from './ConfirmedSignupTable';


export const RaidView = ({ raid, users, loading, signupForRaid, signoffFromRaid, confirm, unconfirm, old = false }) => {

    const user = useSelector(state => state.user);

    const [counts, setCounts] = useState({});
    const [tabKey, setTabKey] = useState('1');

    useEffect(() => {
        if (!raid) return;
        setCounts(countRoles(Object.entries(raid?.confirmedSignups).map(([key, value]) => value.job)));
    }, [raid])

    const displayRaidLog = () => raid?.log
        ? <div> <Button as={Link} to={{ pathname: raid?.log }} target="_blank" rel="noopener noreferrer" className="btn-outline-dodo"> <FaLink size="20" /> Go to log </Button> </div>
        : <div className="text-muted"> No log attached yet. </div>

    if (loading) {
        return <SmallSpinner containerClassNames="text-dodo-light" />
    }

    return (
        <>
            <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} className="border-dodo flex-column flex-md-row">
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
                    <ConfirmedSignupTable raid={raid} users={users} />
                </Tab>

                <Tab eventKey="3" title={<div> <FaArrowAltCircleUp /> Signups </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Signups </div>
                    <SignupTable raid={raid} users={users} />
                </Tab>

                { !old &&
                <Tab eventKey="4" title={<div> <FaCog /> Controls </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Controls </div>
                    <SignupControls raid={raid} isConfirmed={raid && Object.keys(raid?.confirmedSignups).includes(user?.id)} isSignedUp={raid && Object.keys(raid?.signups).includes(user?.id)} signupForRaid={signupForRaid} signoffFromRaid={signoffFromRaid} />
                </Tab>
                }

                { old &&
                <Tab eventKey="5" title={<div> <FaBook /> Log </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Raid Log </div>
                    {displayRaidLog()}
                </Tab>
                }
                { !old &&
                <Tab eventKey="6" title={<div> <FaCog /> Raid Leader Controls </div>} tabClassName="dodo-tab dodo-tab-admin text-danger bg-very-dark">
                    <>
                        {/* <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Raid Leader Controls </div> */}
                        <RaidLeaderControls raid={raid} users={users} confirm={confirm} unconfirm={unconfirm} />
                    </>
                </Tab>
                }
            </Tabs>
        </>
    )
}