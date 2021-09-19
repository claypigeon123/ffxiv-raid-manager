import { Form, InputGroup } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";


export const ControlledFormDatePicker = ({ label, icon, date, setDate, minDate = undefined }) => {
    return (
        <Form.Group>
            <Form.Label> {label} </Form.Label>
            <InputGroup className="shadow">
                <InputGroup.Prepend >
                    <InputGroup.Text className="text-dodo-light bg-dark border-muted"> {icon} </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as={DateTimePicker} className="border-muted bg-dark" style={{outline: "none"}} value={date} onChange={setDate} format="dd/MM/yyyy @ HH:mm" minDate={minDate} disableClock showLeadingZeros />
            </InputGroup>
        </Form.Group>
    )
};