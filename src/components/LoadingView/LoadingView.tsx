import style from "./loadingview.module.css";
function LoadingView() {
  return (
    <>
      <div className={`${style.container}`}>
        <div className={`${style.loading}`}>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>

    </>
  );
}

export default LoadingView;
