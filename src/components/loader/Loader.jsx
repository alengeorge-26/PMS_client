import PropagateLoader from "react-spinners/PropagateLoader";
const Loader = () => {
    return (
        <div className="loader-container">
            <PropagateLoader color={'#0DAF5E'} loading={true} size={30} />
            {/* <div className="loading-text">Searching Previous Projects</div> */}
        </div>
    );
};

export default Loader;