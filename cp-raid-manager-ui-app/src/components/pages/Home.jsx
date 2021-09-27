import { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Row } from "react-bootstrap";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import service from '../../service/BackendService';
import { countdown } from '../../util/DateUtils';
import { HomeCard } from "../elements/HomeCard";

export const Home = () => {

    const user = useSelector(state => state.user);
    const alert = useAlert();

    const [raids, setRaids] = useState(undefined);

    useEffect(() => {
        fetchData();
        let interval = setInterval(() => {
            fetchData();
        }, 20000);

        return () => {
            clearInterval(interval);
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = () => {
        alert.removeAll();
        service.getUpcomingRaids().then(data => {
            setRaids(data);
        }).catch(err => {
            alert.error(err.message);
        })
    }

    const displayUpcoming = () => {
        const list = raids?.filter(raid => !Object.keys(raid?.signups).includes(user?.id)).reverse();

        return list?.length === 0 ? <div className="text-muted"> All done! Nothing to show here </div> : list?.map((raid, index) =>
            <Link key={index} to={`/raids/upcoming?raid=${raid?.id}`} className="nav-link text-light anim-200 table-row p-2 rounded border border-muted d-flex mt-3">
                <div className="mr-auto"> <FaExclamationTriangle className="text-warning" size="20" /> {raid?.name} </div>
                <div className="text-muted"> {countdown(raid?.raidDateTime)} </div>
            </Link>
        )
    }

    const displayConfirmed = () => {
        const list = raids?.filter(raid => Object.keys(raid?.confirmedSignups).includes(user?.id)).reverse();

        return list?.length === 0 ? <div className="text-muted"> Nothing to show here :( </div> : list?.map((raid, index) =>
            <Link key={index} to={`/raids/upcoming?raid=${raid?.id}`} className="nav-link text-light anim-200 table-row p-2 rounded border border-muted d-flex mt-3">
                <div className="mr-auto"> <FaCheckCircle className="text-success" size="20" /> {raid?.name} </div>
                <div className="text-muted"> {countdown(raid?.raidDateTime)} </div>
            </Link>
        )
    }

    return (
        <Row className="justify-content-around">
            <HomeCard title="Upcoming Raids You Haven't Signed For" icon={<FaExclamationTriangle className="right text-warning" size="30" />} delay={10}>
                {displayUpcoming()}
            </HomeCard>
            <HomeCard title="Upcoming Raids You're Confirmed For" icon={<FaCheckCircle className="right text-success" size="30" />} delay={80}>
                {displayConfirmed()}
            </HomeCard>
        </Row>
    )
};