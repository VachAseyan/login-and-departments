import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import illustration from '../../assets/photos/illustration.png';
import LoginForm from "../LoginForm/LoginForm"
import ResetEmailForm from '../ResetEmailForm/ResetEmailForm';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import './SignIn.css';

function SignIn() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);
    const [showResetSuccess, setShowResetSuccess] = useState(false);
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [emailCheckResult, setEmailCheckResult] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setError,
        clearErrors,
    } = useForm();

    const emailValue = !isResetMode || showNewPasswordForm ? watch('email') : emailInput;

    const passwordRules = {
        length: watch('newPassword')?.length >= 8 && watch('newPassword')?.length <= 32,
        uppercase: /[A-Z]/.test(watch('newPassword')),
        lowercase: /[a-z]/.test(watch('newPassword')),
        number: /\d/.test(watch('newPassword')),
        specialChar: /[\W_]/.test(watch('newPassword')),
    };

    useEffect(() => {
        if (isResetMode && !showNewPasswordForm) {
            if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
                setEmailCheckResult(null);
            } else {
                setEmailCheckResult(fakeEmailCheck(emailInput));
            }
        }
    }, [emailInput, isResetMode, showNewPasswordForm]);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (loggedIn) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const onLogin = (data) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || storedUser.email !== data.email) {
            setError('email', { message: 'Email not found' });
            return;
        }

        if (storedUser.password !== data.password) {
            setError('password', { message: 'Incorrect password' });
            return;
        }

        clearErrors();
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        navigate('/dashboard');
    };


    const fakeEmailCheck = (email) => {
        return email === 'aseyanvache39@gmail.com';
    };

    const onVerifyEmail = () => {
        if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
            setError('email', { message: 'Please enter a valid email address' });
            return;
        }
        if (fakeEmailCheck(emailInput)) {
            clearErrors('email');
            setShowNewPasswordForm(true);
            reset({ email: emailInput });
        } else {
            setError('email', { message: 'Email not found in system' });
        }
    };

    const onReset = (data) => {
        const storedUser = JSON.parse(localStorage.getItem('user')) || {};
        storedUser.password = data.newPassword;
        localStorage.setItem('user', JSON.stringify(storedUser));
        setShowResetSuccess(true);
        setIsResetMode(false);
        setShowNewPasswordForm(false);
        reset();
        setEmailInput('');
        setEmailCheckResult(null);
    };

    const enterResetMode = () => {
        reset();
        setEmailInput('');
        setIsResetMode(true);
        setShowNewPasswordForm(false);
        clearErrors();
        setEmailCheckResult(null);
    };

    const inputWrapperStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '390px',
    };

    const iconStyle = {
        position: 'absolute',
        right: '10px',
        cursor: 'pointer',
        color: '#888',
        fontSize: '18px',
    };

    const inputStyle = {
        width: '100%',
        height: '38px',
    };

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    const loginEnabled = emailValue && !isResetMode;

    return (
        <div className="signin-container">
            <div className="signin-image">
                <img src={illustration} alt="illustration" />
            </div>

            <div className="signin-form">
                <h2>{isResetMode ? (showNewPasswordForm ? 'New Password' : 'New Password') : 'Sign In'}</h2>

                {(isLoggedIn || showResetSuccess) ? (
                    <>
                        {showResetSuccess ? (
                            <SuccessMessage onGoToSignIn={() => setShowResetSuccess(false)} />
                        ) : (
                            <p>Congratulations! You have logged in successfully.</p>
                        )}
                    </>
                ) : (
                    <>
                        <p>
                            {isResetMode
                                ? showNewPasswordForm
                                    ? ''
                                    : 'Enter the email address associated with your account, and we’ll send you a link to reset your password.'
                                : 'Enter your Email address and password to log in to your CRM system. After successful login, you will be redirected to your dashboard.'}
                        </p>

                        <form onSubmit={handleSubmit(isResetMode ? onReset : onLogin)}>
                            {isResetMode && !showNewPasswordForm ? (
                                <ResetEmailForm
                                    emailInput={emailInput}
                                    setEmailInput={setEmailInput}
                                    emailCheckResult={emailCheckResult}
                                    onVerifyEmail={onVerifyEmail}
                                    emailIsValid={emailIsValid}
                                    errors={errors}
                                />
                            ) : (
                                ''
                            )}
                            {!isResetMode && (
                                <LoginForm
                                    register={register}
                                    errors={errors}
                                    showLoginPassword={showLoginPassword}
                                    setShowLoginPassword={setShowLoginPassword}
                                    inputWrapperStyle={inputWrapperStyle}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                />
                            )}

                            {isResetMode && showNewPasswordForm && (
                                <ResetPasswordForm
                                    register={register}
                                    errors={errors}
                                    watch={watch}
                                    showNewPassword={showNewPassword}
                                    setShowNewPassword={setShowNewPassword}
                                    showRepeatPassword={showRepeatPassword}
                                    setShowRepeatPassword={setShowRepeatPassword}
                                    passwordRules={passwordRules}
                                    inputWrapperStyle={inputWrapperStyle}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                />
                            )}

                            {isResetMode && !showNewPasswordForm && (
                                <p
                                    className="forget-password"
                                    onClick={() => {
                                        reset();
                                        setIsResetMode(false);
                                        setShowNewPasswordForm(false);
                                        setEmailInput('');
                                        setEmailCheckResult(null);
                                    }}
                                >
                                    or Sign In
                                </p>
                            )}

                            {!isResetMode && (
                                <>
                                    <button
                                        type="submit"
                                        className={`primary-btn ${!loginEnabled ? 'disabled' : ''}`}
                                        disabled={!loginEnabled}
                                    >
                                        Continue
                                    </button>
                                    <p className="forget-password" onClick={enterResetMode}>
                                        Forget Password?
                                    </p>
                                </>
                            )}
                        </form>

                        {!isResetMode && (
                            <p className="terms">
                                By signing up to create an account I accept Company’s
                                <br />
                                <b>Terms of use & Privacy Policy.</b>
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default SignIn;
