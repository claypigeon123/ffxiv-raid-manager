import { IoMdRefresh } from "react-icons/io";


export const SmallSpinner = ({ size = "50", spinnerClassnames = "", containerClassNames = "", label = "Loading" }) => {
    return (
        <div className={`text-center ${containerClassNames}`}>
            <IoMdRefresh className={`small-spinner ${spinnerClassnames}`} size={size} />
            <div> {label} </div>
        </div>
    )
};