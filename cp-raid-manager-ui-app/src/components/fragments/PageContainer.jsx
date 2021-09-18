import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { PageContainerTitle } from "../elements/PageContainerTitle";


export const PageContainer = ({ title, icon, tip, delay = 10, infotext, children }) => {

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
        <Container fluid className={`bg-container mb-5 mt-5 py-3 rounded shadow anim-400 ${anim}`}>
            <>
            {title && <PageContainerTitle title={title} icon={icon} tip={tip} infotext={infotext} />}
            <div>
                {children}
            </div>
            </>
        </Container>
    )
};