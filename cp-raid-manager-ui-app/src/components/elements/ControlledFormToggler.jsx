import { Form } from "react-bootstrap";
import { FaCheck, FaTimes } from 'react-icons/fa';
import Toggle from 'react-toggle';

export const ControlledFormToggler = ({ label, value, onChange }) => {
    return (
        <Form.Group className="mb-0">
            <Form.Group className="mt-2 mb-0 h6">
                <Toggle 
                className="custom-toggler" 
                checked={value} 
                onChange={e => onChange(e.target.checked)}
                icons={{ checked: <FaCheck size="13" />, unchecked: <FaTimes size="13" /> }} />
                <span className="toggler-text" onClick={e => onChange(!value)} style={{verticalAlign: 'super', cursor: 'pointer'}}> {label} </span>
            </Form.Group>
        </Form.Group>
    )
};