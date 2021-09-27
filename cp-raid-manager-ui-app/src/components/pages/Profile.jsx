import { useState } from 'react';
import { useAlert } from 'react-alert';
import { Form, Button, Col } from 'react-bootstrap';
import { FaUser, FaLockOpen, FaSave, FaTrashAlt, FaServer, FaEnvelope } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userDetailsChangedAction } from '../../redux/actions/Actions';
import service from '../../service/BackendService';
import { ControlledFormTextbox } from '../elements/ControlledFormTextbox';
import { ControlledFormToggler } from '../elements/ControlledFormToggler';

import { PageContainer } from "../fragments/PageContainer";

export const Profile = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [server, setServer] = useState(user.server);
    const [email, setEmail] = useState(user.email);
    const [wantsEmails, setWantsEmails] = useState(user.wantsEmails);
    const [inGameName, setInGameName] = useState(user.inGameName);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const reset = (override = undefined, silent = false) => {
        setInGameName(override ? override : user.inGameName);
        setPassword("");
        setConfirmPassword("");

        if (!silent) {
            alert.removeAll();
            alert.info("Changes were reset.");
        }
    }

    const areThereChanges = (
        inGameName === user.inGameName && 
        email === user.email &&
        wantsEmails === user.wantsEmails &&
        password.length === 0 && 
        confirmPassword.length === 0 
    );

    const onSubmit = (e) => {
        e.preventDefault();

        let payload = {};

        if (inGameName.trim() !== user.inGameName) payload.inGameName = inGameName.trim();
        if (server.trim() !== user.server) payload.server = server.trim();
        if (email.trim() !== user.email) payload.email = email.trim();
        if (wantsEmails !== user.wantsEmails) payload.wantsEmails = wantsEmails;

        if (password.trim().length !== 0 || confirmPassword.trim().length !== 0) {
            if (password.trim() !== confirmPassword.trim()) {
                alert.removeAll();
                alert.error("Passwords didn't match");
                setPassword("");
                setConfirmPassword("");
                return;
            }

            if (password.length < 7) {
                alert.removeAll();
                alert.error("Password must be at least 6 characters");
                setPassword("");
                setConfirmPassword("");
                return;
            }

            payload.password = password;
            payload.confirmPassword = confirmPassword;
        }

        if (Object.keys(payload).length === 0) {
            alert.removeAll();
            alert.info("No changes were made.")
            return;
        }

        alert.removeAll();
        service.changeUserDetails(payload).then(data => {
            alert.success("Changes saved!");
            dispatch(userDetailsChangedAction(data));
            reset(data.inGameName, true);
        }).catch(err => {
            alert.error(err.message);
        })
    }
    

    return (
        <div>
            <PageContainer title={"Profile"} icon={<FaUser />}>
                <Form onSubmit={onSubmit}>
                    <ControlledFormTextbox label="Username" value={user.username} disabled icon={<FaUser />} />
                    <ControlledFormTextbox type="email" label="Email Address" value={email} onChange={setEmail} icon={<FaEnvelope />} />
                    <ControlledFormToggler label="Receive notifications" value={wantsEmails} onChange={setWantsEmails} />
                    <div className="pb-4" />
                    <ControlledFormTextbox label="Server (e.g. Lich)" value={server} onChange={setServer} icon={<FaServer />} />
                    <ControlledFormTextbox label="In-game Name" value={inGameName} onChange={setInGameName} icon={<GiCrossedSwords />} />
                    <div className="py-4" />
                    <ControlledFormTextbox type="password" label="New Password" placeholder="New Password" value={password} onChange={setPassword} icon={<FaLockOpen />} />
                    <ControlledFormTextbox type="password" label="Confirm New Password" placeholder="Confirm New Password" value={confirmPassword} onChange={setConfirmPassword} icon={<FaLockOpen />} />
                    <div className="py-3" />
                    <Form.Row className="justify-content-around">
                        <Col lg="4">
                            <Button disabled={areThereChanges} type="submit" block className="btn-dodo"> <FaSave size="20" /> Save Changes</Button>
                        </Col>
                        <Col lg="4" className="mt-4 mt-lg-0">
                            <Button onClick={reset} block variant="outline-danger"> <FaTrashAlt size="19" /> Reset</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </PageContainer>
        </div>
    )
};