import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, MapPin, Briefcase, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import characterImg from '../assets/character.png';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        platform: '',
        location: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted, navigate]);

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-dark-800 p-8 rounded-2xl border border-green-500/30 text-center max-w-md w-full"
                >
                    <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h2>
                    <p className="text-gray-400">Account created successfully. Redirecting to Login...</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center relative z-10">

                {/* Character Animation */}
                <motion.div
                    className="hidden md:block w-1/2 relative z-10"
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <motion.img
                        src={characterImg}
                        alt="3D Character"
                        className="w-full max-w-[500px] h-auto object-contain drop-shadow-2xl mix-blend-lighten"
                        initial={{ y: 0, rotate: 0 }}
                        animate={{
                            y: [0, -15, 0, -15, 0],
                            rotate: [0, -2, 2, -1, 0]
                        }}
                        transition={{
                            duration: 1.2,
                            times: [0, 0.25, 0.5, 0.75, 1],
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Form Card */}
                <motion.div
                    className="w-full md:w-1/2 max-w-md bg-dark-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-20 md:-ml-12"
                    initial={{ x: 100, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: 0.4 }}
                >
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 bg-indigo-500/10 rounded-xl mb-4 text-indigo-400">
                            <Briefcase size={28} />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Register Now</h2>
                        <p className="text-gray-400 mt-2">Secure your spot in the future of work.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative group">
                            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="worker@example.com"
                                    className="w-full bg-dark-900/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Min 8 characters"
                                    className="w-full bg-dark-900/50 border border-gray-700 rounded-xl py-3 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Primary Platform</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="platform"
                                    placeholder="e.g. Uber, Lyft, DoorDash"
                                    className="w-full bg-dark-900/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">City / Region</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. New York, SF"
                                    className="w-full bg-dark-900/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl shadow-indigo-500/20 flex items-center justify-center mt-2"
                        >
                            Start Analyzing <ArrowRight className="ml-2" size={20} />
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
