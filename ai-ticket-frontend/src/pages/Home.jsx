import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'}`}>
            {/* Header */}
            <header className="relative">
                <div className="absolute top-4 right-4">
                    <button
                        onClick={toggleTheme}
                        className={`p-3 rounded-full transition-all duration-300 ${isDark
                            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                            : 'bg-white hover:bg-gray-50 text-gray-600 shadow-lg'
                            }`}
                    >
                        {isDark ? (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${isDark
                        ? 'from-blue-400 to-purple-400'
                        : 'from-blue-600 to-purple-600'
                        } bg-clip-text text-transparent`}>
                        AI-Powered
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">
                        Ticket System
                    </h2>
                    <p className={`text-xl md:text-2xl mb-12 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        Get intelligent support with AI-powered ticket management.
                        Submit issues, track progress, and receive smart solutions.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link
                            to="/signup"
                            className={`px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${isDark
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                }`}
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className={`px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${isDark
                                ? 'bg-transparent border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
                                : 'bg-transparent border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900'
                                }`}
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    <div className={`p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 ${isDark
                        ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                        : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                        }`}>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-blue-600' : 'bg-blue-100'
                            }`}>
                            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Smart Ticket Creation</h3>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Submit tickets with AI-powered analysis that automatically categorizes and prioritizes your issues.
                        </p>
                    </div>

                    <div className={`p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 ${isDark
                        ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                        : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                        }`}>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-purple-600' : 'bg-purple-100'
                            }`}>
                            <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">AI-Powered Solutions</h3>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Get intelligent suggestions, helpful notes, and relevant resources to solve your problems faster.
                        </p>
                    </div>

                    <div className={`p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 ${isDark
                        ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                        : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                        }`}>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-green-600' : 'bg-green-100'
                            }`}>
                            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Real-time Tracking</h3>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Monitor your ticket progress in real-time with status updates and automated notifications.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className={`mt-20 p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'
                    }`}>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'
                                }`}>99%</div>
                            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Success Rate</div>
                        </div>
                        <div>
                            <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'
                                }`}>24/7</div>
                            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>AI Support</div>
                        </div>
                        <div>
                            <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'
                                }`}>5min</div>
                            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Average Response</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 