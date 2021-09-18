import { Form, InputGroup } from "react-bootstrap";


export const ControlledFormTextbox = ({ label, icon, value, onChange, placeholder, type = "text", disabled = false }) => {
    return (
        <Form.Group>
            <Form.Label> {label} </Form.Label>
            <InputGroup className="shadow">
                <InputGroup.Prepend >
                    <InputGroup.Text className="text-dodo-light bg-dark border-muted"> {icon} </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type={type} disabled={disabled} className={`border-muted bg-dark text-white ${disabled && 'textbox-disabled'}`} style={{outline: "none"}} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
            </InputGroup>
        </Form.Group>
    )
};