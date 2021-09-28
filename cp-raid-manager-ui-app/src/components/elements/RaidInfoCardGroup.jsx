import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import { formatDate } from "../../util/DateUtils";
import { countRoles, ROLES } from "../../util/RaidUtils"


export const RaidInfoCardGroup = ({ raid, old }) => {

    const [counts, setCounts] = useState({});

    useEffect(() => {
        if (!raid) return;
        setCounts(countRoles(Object.entries(raid?.confirmedSignups).map(([key, value]) => value.job)));
    }, [raid])

    return (
        <>
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
            <Col xs="6" lg="2">
                <div className="bg-very-dark rounded border border-dodo py-1 my-2">
                    <div className="text-dodo-bold"> <img width="22" src={ROLES.TANK.icon} alt="role-icon-tank" /> Tanks </div>
                    <div> {counts.tank} </div>
                </div>
            </Col>
            <Col xs="6" lg="2">
                <div className="bg-very-dark rounded border border-dodo py-1 my-2">
                    <div className="text-dodo-bold"> <img width="22" src={ROLES.HEALER.icon} alt="role-icon-healer" /> Healers </div>
                    <div> {counts.healer} </div>
                </div>
            </Col>
            <Col xs="6" lg="2">
                <div className="bg-very-dark rounded border border-dodo py-1 my-2">
                    <div className="text-dodo-bold"> <img width="22" src={ROLES.MELEE.icon} alt="role-icon-melee" /> Melee </div>
                    <div> {counts.melee} </div>
                </div>
            </Col>
            <Col xs="6" lg="2">
                <div className="bg-very-dark rounded border border-dodo py-1 my-2">
                    <div className="text-dodo-bold"> <img width="22" src={ROLES.RANGED.icon} alt="role-icon-ranged" /> Ranged </div>
                    <div> {counts.ranged} </div>
                </div>
            </Col>
            <Col xs="6" lg="2">
                <div className="bg-very-dark rounded border border-dodo py-1 my-2">
                    <div className="text-dodo-bold"> <img width="22" src={ROLES.MAGIC.icon} alt="role-icon-magical" /> Magical </div>
                    <div> {counts.magic} </div>
                </div>
            </Col>
        </Row>
        }
        </>
    )
}