import { useEffect, useState, useRef } from 'react';
import { useAlert } from 'react-alert';
import { GiCrossedSwords } from 'react-icons/gi';
import { ImCross, ImSpinner11 } from 'react-icons/im';
import { Button } from 'react-bootstrap';
import query from 'query-string';

import service from '../../service/BackendService';
import { PageContainer } from "../fragments/PageContainer";
import { RaidsTable } from '../fragments/RaidsTable';
import { RaidView } from '../fragments/RaidView';
import { useHistory } from 'react-router';

export const UpcomingRaids = () => {

    const alert = useAlert();
    const history = useHistory();

    const [raids, setRaids] = useState([]);

    const [selectedRaidId, setSelectedRaidId] = useState(undefined);
    const [raidData, setRaidData] = useState(undefined);

    const [loadingRaids, setLoadingRaids] = useState(false);
    const [loadingRaid, setLoadingRaid] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {
        getRaids();

        const params = query.parse(window.location.search);
        if (params?.raid) {
            setSelectedRaidId(params?.raid);
            history.replace({
                search: undefined
            })
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (selectedRaidId !== undefined) getRaid();
    }, [selectedRaidId]) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    })

    const getRaids = () => {
        setLoadingRaids(true);
        service.getUpcomingRaids().then(documents => {
            setRaids(documents);
        }).catch(err => {
            alert.error(err.message);
        }).finally(() => {
            setLoadingRaids(false);
        })
    }

    const getRaid = (withReset = true) => {
        if (withReset) setRaidData(undefined);
        setLoadingRaid(true);
        service.getRaid(selectedRaidId).then(data => {
            setRaidData(data);
        }).catch(err => {
            alert.error(err.message);
            setSelectedRaidId(undefined);
            setRaidData(undefined);
        }).finally(() => {
            setLoadingRaid(false);
        })
    }

    const resetSelectedRaid = () => {
        setSelectedRaidId(undefined);
        setRaidData(undefined);
    }

    const signupForRaid = (raidId, primary, secondaries) => {
        setLoadingRaid(true);
        service.signupForRaid(raidId, { preference: primary, alternates: secondaries }).then(data => {
            getRaids();
            getRaid();
            alert.removeAll();
            alert.success(`You have signed up for ${raidData?.raid?.name}!`)
        }).catch(err => {
            alert.error(err.message);
        });
    }

    const signoffFromRaid = (raidId) => {
        setLoadingRaid(true);
        service.signoffFromRaid(raidId).then(data => {
            getRaids();
            getRaid();
            alert.removeAll();
            alert.success(`You have canceled your signup for ${raidData?.raid?.name}!`)
        }).catch(err => {
            alert.error(err.message);
        });
    }

    const confirmForRaid = (raidId, userId, job) => {
        setLoadingRaid(true);
        service.confirmSignup(raidId, { userId, job }).then(data => {
            getRaids();
            getRaid();
            alert.removeAll();
            alert.success(`Signup confirmed as ${job}!`)
        }).catch(err => {
            alert.error(err.message);
        })
    }

    const unconfirmForRaid = (raidId, userId) => {
        setLoadingRaid(true);
        service.unconfirmSignup(raidId, { userId }).then(data => {
            getRaids();
            getRaid();
            alert.removeAll();
            alert.success(`Confirmed signup canceled!`)
        }).catch(err => {
            alert.error(err.message);
        })
    }

    return (
        <div>
            <PageContainer title="Upcoming Raids" icon={<GiCrossedSwords />}>
                <RaidsTable raids={raids} selectedRaidId={selectedRaidId} setSelectedRaidId={setSelectedRaidId} loading={loadingRaids} />
            </PageContainer>
            <div id="scrollTarget" ref={scrollRef} />
            { selectedRaidId !== undefined &&
            <PageContainer title={raidData ? raidData?.raid?.name : "Loading..."} icon={<GiCrossedSwords />} tip={
                <>
                    <Button className="mx-1 btn-dodo" onClick={() => { getRaids(); getRaid(); }} size="sm"> <ImSpinner11 /> </Button>
                    <Button className="mx-1" onClick={resetSelectedRaid} size="sm" variant="outline-danger"> <ImCross /> </Button>
                </>
            }>
                <RaidView raid={raidData?.raid} users={raidData?.users} loading={loadingRaid} signupForRaid={signupForRaid} signoffFromRaid={signoffFromRaid} confirm={confirmForRaid} unconfirm={unconfirmForRaid} />
            </PageContainer>
            }
        </div>
    )
};