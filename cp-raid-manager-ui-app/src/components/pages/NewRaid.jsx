import { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { FaCalendarPlus } from 'react-icons/fa';
import { BsCalendarFill } from 'react-icons/bs';
import { GiCrossedSwords } from 'react-icons/gi';
import { ControlledFormTextbox } from '../elements/ControlledFormTextbox';
import { PageContainer } from '../fragments/PageContainer';
import { ControlledFormDatePicker } from '../elements/ControlledFormDatePicker';
import { jsDateToUtcIso } from '../../util/DateUtils';
import { useAlert } from 'react-alert';
import service from '../../service/BackendService';
import { Redirect } from 'react-router';

export const NewRaid = () => {

    const alert = useAlert();

    const [name, setName] = useState("");
    const [date, setDate] = useState(null);

    const [redirect, setRedirect] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (name.length === 0 || date === null) {
            alert.removeAll();
            alert.error("All fields are required!");
            return;
        }

        const payload = {
            name: name.trim(),
            raidDateTime: jsDateToUtcIso(date)
        }

        service.createRaid(payload).then(res => {
            alert.removeAll();
            alert.success("Raid posted!");
            setRedirect(true);
        }).catch(err => {
            console.log(err);
        })
    }

    if (redirect) {
        return <Redirect to="/raids/upcoming" />
    }

    return (
        <div>
            <PageContainer title="Post New Raid" icon={<FaCalendarPlus />} infotext="People who have opted in to email notifications will get an email after you've created the raid.">
                <Form onSubmit={onSubmit}>
                    <ControlledFormTextbox label="Raid Name" placeholder="Raid Name" icon={<GiCrossedSwords />} value={name} onChange={setName} />
                    <ControlledFormDatePicker label="Raid Date / Time" icon={<BsCalendarFill />} date={date} setDate={setDate} minDate={new Date()} />
                    <div className="py-3" />
                    <Form.Row className="justify-content-around">
                        <Col lg="4">
                            <Button type="submit" block className="btn-dodo"> <GiCrossedSwords size="20" /> Post Raid </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </PageContainer>
        </div>
    )
};