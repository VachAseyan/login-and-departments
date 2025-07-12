import React from 'react';
import correct from '../../assets/photos/correct.png';

function SuccessMessage({ onGoToSignIn }) {
    return (
        <>
            <img src={correct} alt="Success" />
            <h2>Congratulations!</h2>
            <p>
                Your password was successfully changed!<br />
                Sign In and continue your journey with us.
            </p>
            <button className="primary-btn" onClick={onGoToSignIn}>
                Go to Sign In
            </button>
        </>
    );
}

export default SuccessMessage;
