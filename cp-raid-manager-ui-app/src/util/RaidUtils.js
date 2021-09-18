import { AiFillWarning, AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

export const displayConfirmedSignups = (amount) => {
    if (amount < 8) {
        return <div className="text-warning"> <AiFillWarning style={{verticalAlign: 'sub'}} size="20" /> {amount} </div>
    }

    if (amount === 8) {
        return <div className="text-success"> <AiFillCheckCircle style={{verticalAlign: 'sub'}} size="20" /> {amount} </div>
    }

    return <div className="text-danger"> <AiFillCloseCircle style={{verticalAlign: 'sub'}} size="20" /> {amount} </div>
}