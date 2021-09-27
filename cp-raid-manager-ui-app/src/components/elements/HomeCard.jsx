import { useState, useEffect } from 'react';
import { Col } from "react-bootstrap"


export const HomeCard = ({ title, icon, children, delay = 10 }) => {

    const [anim, setAnim] = useState("animated-container");

    useEffect(() => {
        setTimeout(() => {
            setAnim("animated-container animated-container-mounted");
        }, delay);

        setTimeout(() => {
            setAnim("");
        }, (delay + 1));

        return () => {
            setAnim("");
        }
    }, [delay]);

    return (
        <Col lg="5" className={`anim-400 ${anim} border border-dodo shadow rounded m-3 p-3 bg-container`}>
            <div className="">
                <div className="d-flex border-bottom border-muted">
                    <div className="mr-1"> {icon} </div>
                    <div className="text-dodo-bolder-light"> {title} </div>
                </div>
                <div className="p-1 mt-1">
                    {children}
                </div>
            </div>
        </Col>
    )
}