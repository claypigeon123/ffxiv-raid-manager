

import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { GiCrossedSwords } from 'react-icons/gi';
import service from '../../service/BackendService';

import { PageContainer } from "../fragments/PageContainer";
import { RaidsTable } from '../fragments/RaidsTable';

export const UpcomingRaids = () => {

    const alert = useAlert();

    const [raids, setRaids] = useState([]);

    useEffect(() => {
        service.getUpcomingRaids().then(documents => {
            setRaids(documents);
        }).catch(err => {
            alert.error(err);
        })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <PageContainer title="Upcoming Raids" icon={<GiCrossedSwords />}>
                <RaidsTable raids={raids} />
            </PageContainer>
        </div>
    )
};