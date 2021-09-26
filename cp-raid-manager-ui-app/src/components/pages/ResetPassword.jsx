import { useState } from 'react';
import { useAlert } from 'react-alert';
import { Form, Button, Col } from 'react-bootstrap';
import { FaIdCard, FaUser, FaUndoAlt, FaCheckCircle } from 'react-icons/fa';

import { ControlledFormTextbox } from '../elements/ControlledFormTextbox';
import { PageContainer } from "../fragments/PageContainer";
import service from '../../service/BackendService';

export const ResetPassword = () => {

    const alert = useAlert();
    const [username, setUsername] = useState("");

    const [res, setRes] = useState(undefined);

    const onSubmit = (e) => {
        e.preventDefault();

        alert.removeAll();
        service.resetPassword({ username: username.trim() }).then(data => {
            setRes(data);
            alert.success("Password has been reset!");
        }).catch(err => {
            alert.error(err.message);
            setUsername("");
        })
    }

    return (
        <div>
            <PageContainer title={"Reset Password"} icon={<FaUndoAlt />}>
                <Form onSubmit={onSubmit}>
                    <ControlledFormTextbox label="Username" value={username} onChange={setUsername} icon={<FaUser />} placeholder="Username" />
                    <div className="py-3" />
                    <Form.Row className="justify-content-around">
                        <Col lg="4">
                            <Button type="submit" block className="btn-dodo"> <FaCheckCircle size="20" /> Confirm Reset </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </PageContainer>
            { res !== undefined &&
            <PageContainer title={"Created User Details"} icon={<FaIdCard />}>
                <div className="text-muted"> Username </div>
                <div className="bg-very-dark border rounded p-2 text-center"> {res?.id || "N/A"} </div>
                <div className="text-muted mt-5"> Temporary Password </div>
                <div className="bg-very-dark border rounded p-2 text-center"> {res?.tempPassword || "N/A"} </div>
            </PageContainer>
            }
        </div>
    )
};