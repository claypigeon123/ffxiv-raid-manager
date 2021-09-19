import { RaidTableRow } from "../elements/RaidTableRow";
import { SmallSpinner } from '../elements/SmallSpinner';

export const RaidsTable = ({ raids, setSelectedRaidId, loading }) => {

    const drawTableRows = () => raids.map((item, index) => (
        <RaidTableRow key={index} raid={item} open={() => setSelectedRaidId(item.id)}  />
    ));

    if (loading) {
        return <SmallSpinner containerClassNames="text-dodo-light" />
    }

    if (!raids || raids.length === 0) {
        return <div className="text-muted"> No upcoming raids found. </div>
    }

    return (
        <>
            <div className="mx-2">
                <div className="h5 d-none d-lg-flex text-dodo row border-bottom border-dodo mb-2">
                    <div className="col"> Name </div>
                    <div className="col"> Date </div>
                    <div className="col"> Posted By </div>
                    <div className="col"> Signups </div>
                    <div className="col"> Confirmed Signups </div>
                </div>
                <div>
                    {drawTableRows()}
                </div>
            </div>
        </>
    )
};