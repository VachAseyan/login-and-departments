import React from 'react';
import {
    EyeOutlined,
    EyeInvisibleOutlined,
    CheckCircleTwoTone,
    CloseCircleTwoTone,
} from '@ant-design/icons';

function ResetPasswordForm({
    register,
    errors,
    watch,
    showNewPassword,
    setShowNewPassword,
    showRepeatPassword,
    setShowRepeatPassword,
    passwordRules,
    inputWrapperStyle,
    iconStyle,
    inputStyle,
}) {
    const newPassword = watch('newPassword');

    const getIcon = (condition) =>
        condition ? (
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />
        ) : (
            <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ marginRight: 8 }} />
        );

    return (
        <>
            <label>New Password</label>
            <div style={inputWrapperStyle}>
                <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Create new password"
                    style={inputStyle}
                    {...register('newPassword', {
                        required: 'New password is required',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,32}$/,
                            message: '8–32 chars, 1 uppercase, 1 lowercase, 1 number & 1 symbol required',
                        },
                        validate: (value) => {
                            const storedUser = JSON.parse(localStorage.getItem('user'));
                            if (storedUser && storedUser.password === value) {
                                return 'New password cannot be the same as the previous password';
                            }
                            return true;
                        },
                    })}
                />
                <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={iconStyle}
                    role="button"
                    tabIndex={0}
                >
                    {showNewPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
            </div>
            {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}

            <div className="terms" style={{ marginBottom: '1rem' }}>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    <li>{getIcon(passwordRules.length)}8–32 characters</li>
                    <li>{getIcon(passwordRules.uppercase && passwordRules.lowercase)}One uppercase & one lowercase letter</li>
                    <li>{getIcon(passwordRules.number)}One number</li>
                    <li>{getIcon(passwordRules.specialChar)}One special character</li>
                </ul>
            </div>

            <label>Repeat Password</label>
            <div style={inputWrapperStyle}>
                <input
                    type={showRepeatPassword ? 'text' : 'password'}
                    placeholder="Repeat new password"
                    style={inputStyle}
                    {...register('repeatPassword', {
                        required: 'Please repeat your new password',
                        validate: (value) => value === newPassword || 'Passwords do not match',
                    })}
                />
                <span
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    style={iconStyle}
                    role="button"
                    tabIndex={0}
                >
                    {showRepeatPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
            </div>
            {errors.repeatPassword && <span className="error">{errors.repeatPassword.message}</span>}

            <button type="submit" className="primary-btn">
                Continue
            </button>
        </>
    );
}

export default ResetPasswordForm;
