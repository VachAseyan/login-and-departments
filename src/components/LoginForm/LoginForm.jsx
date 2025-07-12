import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

function LoginForm({
    register,
    errors,
    showLoginPassword,
    setShowLoginPassword,
    inputWrapperStyle,
    iconStyle,
    inputStyle,
}) {
    return (
        <>
            <label>Email Address</label>
            <input
                type="email"
                placeholder="Enter your email address"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                    },
                })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}

            <label>Password</label>
            <div style={inputWrapperStyle}>
                <input
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="********"
                    style={inputStyle}
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,32}$/,
                            message: '8–32 chars, 1 uppercase, 1 lowercase, 1 number & 1 symbol',
                        },
                    })}
                />
                <span
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    style={iconStyle}
                    role="button"
                    tabIndex={0}
                >
                    {showLoginPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
            </div>
            {errors.password && <span className="error">{errors.password.message}</span>}
        </>
    );
}

export default LoginForm;