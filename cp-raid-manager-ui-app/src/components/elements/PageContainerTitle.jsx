export const PageContainerTitle = ({ title, icon, tip, infotext }) => {

    return (
        <div className="mb-4">
            <div className="mb-0 pb-1 d-flex h4 border-bottom border-dodo">
                <div className="mb-0 mr-1 text-dodo-light">
                    {icon}
                </div>
                <div className="mb-0 ml-1">
                    {title}
                </div>
                <div className="h6 text-muted mb-0 ml-auto" style={{alignSelf: "flex-end"}}>
                    {tip}
                </div>
            </div>
            <div className="text-muted"> {infotext} </div>
        </div>
    )
};