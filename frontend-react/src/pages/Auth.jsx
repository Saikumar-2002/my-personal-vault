import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ArrowRight, Info } from 'lucide-react';

const Auth = () => {
    const { login, register } = useAuth();
    const { showToast } = useToast();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin && formData.password !== formData.confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        const result = isLogin
            ? await login(formData.email, formData.password)
            : await register(formData.email, formData.password);

        if (result.success) {
            showToast(isLogin ? `Welcome back!` : 'Account created successfully!', 'success');
        } else {
            showToast(result.message, 'error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div id="authModal" className="modal active">
            <div className="modal-content auth-modal">
                <div className="auth-header">
                    <div className="logo">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#6366f1' }} />
                                    <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
                                </linearGradient>
                            </defs>
                            <rect width="40" height="40" rx="10" fill="url(#logoGradient)" />
                            <path d="M12 14h16M12 20h16M12 26h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h1>Knowledge Vault</h1>
                    <p>Your personal knowledge hub</p>
                </div>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary btn-full">
                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="demo-note">
                        <Info size={16} />
                        Demo mode: Use any email/password to explore
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
