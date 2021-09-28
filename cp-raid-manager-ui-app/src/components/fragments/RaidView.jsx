import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Tabs, Tab } from 'react-bootstrap';
import { FaLink, FaCog, FaArrowAltCircleUp, FaCheckCircle, FaInfoCircle, FaBook } from 'react-icons/fa';

import { SmallSpinner } from '../elements/SmallSpinner';
import { SignupControls } from '../elements/SignupControls';
import { RaidLeaderControls } from './RaidLeaderControls';
import { SignupTable } from './SignupTable';
import { ConfirmedSignupTable } from './ConfirmedSignupTable';
import { RaidInfoCardGroup } from '../elements/RaidInfoCardGroup';


export const RaidView = ({ raid, users, loading, signupForRaid, signoffFromRaid, confirm, unconfirm, deleteRaid, old = false }) => {

    const user = useSelector(state => state.user);

    const [tabKey, setTabKey] = useState('1');

    useEffect(() => {
        if (!raid) return;
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
                { !old &&
                <Tab eventKey="1" title={<div> <FaCog /> Actions </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Actions </div>
                    <SignupControls raid={raid} isConfirmed={raid && Object.keys(raid?.confirmedSignups).includes(user?.id)} isSignedUp={raid && Object.keys(raid?.signups).includes(user?.id)} signupForRaid={signupForRaid} signoffFromRaid={signoffFromRaid} />
                </Tab>
                }

                <Tab eventKey="2" title={<div> <FaInfoCircle /> Info </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Information </div>
                    <RaidInfoCardGroup raid={raid} old={old} />
                </Tab>

                <Tab eventKey="3" title={<div> <FaCheckCircle /> Confirmed Signups </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted">  Confirmed Signups </div>
                    <ConfirmedSignupTable raid={raid} users={users} />
                </Tab>

                <Tab eventKey="4" title={<div> <FaArrowAltCircleUp /> Signups </div>} tabClassName="dodo-tab">
                    <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Signups </div>
                    <SignupTable raid={raid} users={users} />
                </Tab>

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
                        <RaidLeaderControls raid={raid} users={users} confirm={confirm} unconfirm={unconfirm} deleteRaid={deleteRaid} />
                    </>
                </Tab>
                }
            </Tabs>
        </>
    )
}