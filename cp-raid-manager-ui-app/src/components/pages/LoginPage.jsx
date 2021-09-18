import { useState, useEffect } from 'react';
import { Container, Form, Col, Button } from "react-bootstrap";
import { DodoLogo } from "../elements/DodoLogo";
import { PageContainer } from "../fragments/PageContainer";
import { FaLock, FaIdCardAlt, FaLockOpen } from 'react-icons/fa';
import { ControlledFormTextbox } from "../elements/ControlledFormTextbox";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, startLoadingAction, clearErrorsAction } from '../../redux/actions/Actions';


export const LoginPage = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const error = useSelector(state => state.genericError);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayAdvice, setDisplayAdvice] = useState(0);

    useEffect(() => {
        if (error === null || error === undefined) return;
        
        alert.error(error);
        dispatch(clearErrorsAction());
    }, [error]) //eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isValidPair()) {
            alert.error("Missing username or password!");
            return;
        }

        dispatch(startLoadingAction());
        dispatch(loginAction(username, password));
        setUsername("");
        setPassword("");
    }

    const isValidPair = () => {
        if (username.length === 0 || password.length === 0) {
            return false;
        }

        return true;
    }

    const mountAdvice = () => {
        if (displayAdvice < 80) setDisplayAdvice(displayAdvice + 1);
    }

    return (
        <Container className="mt-5">
            <div className="text-center">
                <DodoLogo width={65} withoutLink bg />
                <h3 className="text-dodo-bolder mt-2"> Dodo Raid Manager </h3>
            </div>
            <PageContainer title="Login" icon={<FaLock />}>
                <Form onSubmit={onSubmit}>
                    <Form.Row className="justify-content-around">
                        <Col lg="6">
                            <ControlledFormTextbox value={username} onChange={setUsername} label="Username" icon={<FaIdCardAlt />} placeholder="Username" />
                        </Col>
                    </Form.Row>
                    <Form.Row className="justify-content-around">
                        <Col lg="6">
                            <ControlledFormTextbox value={password} onChange={setPassword} label="Password" icon={<FaLockOpen />} placeholder="Password" type="password" />
                        </Col>
                    </Form.Row>
                    <Form.Row className="justify-content-center mt-4">
                        <Col lg="3">
                            <Button type="submit" block className="btn-dodo">Login</Button>
                        </Col>
                        <Col className="mt-4 mt-lg-0" lg="3">
                            <Button onClick={mountAdvice} block className="btn-outline-dodo">Request Access</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </PageContainer>
            {displayAdvice === 1 &&
                <PageContainer>
                    <div> Message me on discord, you doof! <span className="text-dodo">Pigeon#3164</span> </div>
                    <div> And don't click that button again. </div>
                </PageContainer>
            }
            {displayAdvice === 2 &&
                <PageContainer>
                    Let me make it clearer for you: <span className="text-dodo-bolder">Pigeon#3164</span>
                </PageContainer>
            }
            {displayAdvice === 3 &&
                <PageContainer>
                    Now you're just annoying.
                </PageContainer>
            }
            {displayAdvice === 4 &&
                <PageContainer>
                    Please stop.
                </PageContainer>
            }
            {(displayAdvice > 4 && displayAdvice < 20) &&
                <PageContainer>
                    I srsli cri
                </PageContainer>
            }
            {(displayAdvice >= 20 && displayAdvice < 40) &&
                <PageContainer>
                    Are you having fun?
                </PageContainer>
            }
            {(displayAdvice >= 40 && displayAdvice < 60) &&
                <PageContainer>
                    Clearly, you are beyond hope.
                </PageContainer>
            }
            {(displayAdvice >= 60 && displayAdvice < 80) &&
                <PageContainer>
                    You can stop now, there won't be any more.
                </PageContainer>
            }
            {displayAdvice === 80 &&
                <PageContainer>
                    No, really. This is the last message you'll get.
                </PageContainer>
            }
        </Container>
    )
};