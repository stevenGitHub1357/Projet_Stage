import React, { useEffect, useState } from "react";
import "./style/WaitingModal.css";
const WaitingModal = ({ showWaitings, label }) => {
  const [showWaiting, setShowWaiting] = useState(false);

  useEffect(() => {
    if (showWaitings) {
      setShowWaiting(true);
    } else {
      setShowWaiting(false);
    }
  }, [showWaitings]);

  return (
    <div
      className={`modal ${showWaiting ? "d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
    >
 <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body d-flex justify-content-center align-items-center flex-column">
            <div className="custom-spinner position-relative mb-2">
              <div className="spinner-border-outer"></div>
              <div className="spinner-border-inner"></div>
              <div className="spinner-dot"></div>
            </div>
            <div className="loading-text">

            <div className="wrapper">
              <h4 className="projetChoiceAnimated">{label}</h4>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingModal;
