import { ConfirmedSignupTableRow } from "../elements/ConfirmedSignupTableRow";


export const ConfirmedSignupTable = ({ raid, users, withControls = false, unconfirm }) => {

    const listConfirmedSignups = () => raid && Object.entries(raid?.confirmedSignups).map(([key, value], index) => {
        const user = users.filter(user => user.id === key)[0];

        return <ConfirmedSignupTableRow key={index} raid={raid} signup={value} user={user} withControls={withControls} unconfirm={unconfirm} />
    });

    return (
        <>
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
        </>
    )
}