import { ConfirmedSignupTable } from './ConfirmedSignupTable';
import { SignupTable } from './SignupTable';

export const RaidLeaderControls = ({ raid, users, confirm, unconfirm }) => {

    return (
        <div>
            <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Confirmed Signups </div>
            <ConfirmedSignupTable raid={raid} users={users} withControls unconfirm={unconfirm} />

            <div className="text-dodo-bolder mt-5 mb-3 border-bottom border-muted"> Signups </div>
            <SignupTable raid={raid} users={users} withControls confirm={confirm} />
        </div>
    )
};