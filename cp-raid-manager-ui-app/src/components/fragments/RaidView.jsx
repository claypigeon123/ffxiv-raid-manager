import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { formatDate } from "../../util/DateUtils"
import { SignupTableRow } from '../elements/SignupTableRow';
import { ConfirmedSignupTableRow } from '../elements/ConfirmedSignupTableRow';
import { SmallSpinner } from '../elements/SmallSpinner';
import { compareSignups, countRoles, ROLES } from '../../util/RaidUtils';
import { SignupControls } from '../elements/SignupControls';
import { useSelector } from 'react-redux';


export const RaidView = ({ raid, users, loading, signupForRaid, signoffFromRaid }) => {

    const user = useSelector(state => state.user);

    const [counts, setCounts] = useState({});

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

    if (loading) {
        return <SmallSpinner containerClassNames="text-dodo-light" />
    }

    return (
        <div>
            <div className="text-dodo-bolder mb-3 border-bottom border-muted"> Information </div>
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

            <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Controls </div>
            <SignupControls raid={raid} isSignedUp={raid && Object.keys(raid?.signups).includes(user?.id)} signupForRaid={signupForRaid} signoffFromRaid={signoffFromRaid} />

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
        </div>
    )
}