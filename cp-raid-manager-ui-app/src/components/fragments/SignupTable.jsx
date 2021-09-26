import { SignupTableRow } from "../elements/SignupTableRow";
import { compareSignups } from '../../util/RaidUtils';


export const SignupTable = ({ raid, users, withControls = false, confirm }) => {

    const listSignups = () => raid && Object.entries(raid?.signups)
        .sort(([key1, value1], [key2, value2]) => compareSignups(value1.signupDate, value2.signupDate))
        .map( ([key, value], index) => {
            const user = users.filter(user => user.id === key)[0];

            return <SignupTableRow key={index} raid={raid} signup={value} user={user} withControls={withControls} confirm={confirm} />
    });

    return (
        <>
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
        </>
    )
};