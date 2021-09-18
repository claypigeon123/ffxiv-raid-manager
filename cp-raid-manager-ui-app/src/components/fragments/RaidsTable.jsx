import { RaidTableRow } from "../elements/RaidTableRow";


export const RaidsTable = ({ raids }) => {

    const drawTableRows = () => raids.map((item, index) => (
        <RaidTableRow key={index} raid={item} />
    ));

    return (
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
    )
};