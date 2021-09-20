import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { GiCrossedSwords } from 'react-icons/gi';
import { ImCross, ImSpinner11 } from 'react-icons/im';
import { Button } from 'react-bootstrap';

import service from '../../service/BackendService';
import { PageContainer } from "../fragments/PageContainer";
import { RaidsTable } from '../fragments/RaidsTable';
import { RaidView } from '../fragments/RaidView';

export const OldRaids = () => {
    const alert = useAlert();

    const [raids, setRaids] = useState([]);

    const [selectedRaidId, setSelectedRaidId] = useState(undefined);
    const [raidData, setRaidData] = useState(undefined);

    const [loadingRaids, setLoadingRaids] = useState(false);
    const [loadingRaid, setLoadingRaid] = useState(false);

    useEffect(() => {
        getRaids();
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (selectedRaidId !== undefined) getRaid();
    }, [selectedRaidId]) //eslint-disable-line react-hooks/exhaustive-deps

    const getRaids = () => {
        setLoadingRaids(true);
        service.getOldRaids().then(documents => {
            setRaids(documents);
        }).catch(err => {
            alert.error(err);
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
            console.log(err);
        }).finally(() => {
            setLoadingRaid(false);
        })
    }

    const resetSelectedRaid = () => {
        setSelectedRaidId(undefined);
        setRaidData(undefined);
    }

    return (
        <div>
            <PageContainer title="Past Raids" icon={<GiCrossedSwords />}>
                <RaidsTable raids={raids} setSelectedRaidId={setSelectedRaidId} loading={loadingRaids} small />
            </PageContainer>
            { selectedRaidId !== undefined &&
            <PageContainer title={raidData ? raidData?.raid?.name : "Loading..."} icon={<GiCrossedSwords />} tip={
                <>
                    <Button className="mx-1 btn-dodo" onClick={() => getRaid()} size="sm"> <ImSpinner11 /> </Button>
                    <Button className="mx-1" onClick={resetSelectedRaid} size="sm" variant="danger"> <ImCross /> </Button>
                </>
            }>
                <RaidView raid={raidData?.raid} users={raidData?.users} loading={loadingRaid} old />
            </PageContainer>
            }
        </div>
    )
};