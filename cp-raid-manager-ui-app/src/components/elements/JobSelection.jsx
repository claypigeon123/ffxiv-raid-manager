import { Row, Col } from 'react-bootstrap';
import { JOBS } from "../../util/RaidUtils";

export const JobSelection = ({ value, setValue, multiple = false }) => {

    const selectJob = (job) => {
        if (multiple) {
            let next = [].concat(value);
            if (next.includes(job)) {
                next = next.filter(s => s !== job);
            } else {
                next.push(job);
            }
            setValue(next);
            return;
        }

        if (value === job) {
            setValue(undefined);
            return;
        }

        setValue(job);
    }

    const checkJob = (job) => multiple 
        ? value.includes(job) ? 'job-selected' : 'job-not-selected'
        : value === job ? 'job-selected' : 'job-not-selected';

    const displayIcons = () => {
        return Object.entries(JOBS).map(([key, value], index) => {
            return (
                <Col key={index} className={`anim-200 job-icon ${checkJob(key)} text-center`} xs="3" lg="2" onClick={() => selectJob(key)}> 
                    <div><img className={`anim-200`} width="50" src={value.icon} alt={`${key}-icon`} /></div>
                    <div> {value.name} </div>
                </Col>
            );
        })
    }

    return (
        <Row className="justify-content-left px-3 py-1">
            {displayIcons()}
        </Row>
    )
};