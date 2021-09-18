import HashLoader from 'react-spinners/HashLoader';

export const LoadingSpinner = ({ text = "Loading" }) => {
    return (
        <div className="loading-blur">
            <div className="loading-spinner d-flex justify-content-center mt-5 pt-5">
                <HashLoader size="150px" color={"#1076a5"} loading={true} />
            </div>
            <div className="loading-spinner d-flex justify-content-center mt-5 h3 text-dodo">
                { text }
            </div>
        </div>
    )
};