    import React from 'react';

    function ResetEmailForm({
        emailInput,
        setEmailInput,
        emailCheckResult,
        onVerifyEmail,
        emailIsValid,
        errors,
    }) {
        return (
            <>
                <label>Email Address</label>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                {emailCheckResult === true && (
                    <p className="email-status success">This email exists. Please click Continue to proceed.</p>
                )}
                {emailCheckResult === false && (
                    <p className="email-status error">This email is not registered.</p>
                )}
                {errors.email && <span className="error">{errors.email.message}</span>}

                <button
                    type="button"
                    onClick={onVerifyEmail}
                    className={`primary-btn ${!emailIsValid || emailCheckResult !== true ? 'disabled' : ''}`}
                    disabled={!emailIsValid || emailCheckResult !== true}
                >
                    Continue
                </button>
            </>
        );
    }

    export default ResetEmailForm;