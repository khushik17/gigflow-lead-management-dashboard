import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Users, Shield, ListTodo, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white flex flex-col relative text-gray-900 overflow-x-hidden">
      
      {/* Soft Blue Gradient Background at Top */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#e8f0fe] via-[#f0f4fd] to-white pointer-events-none z-0"></div>

      {/* Light Floating Navbar */}
      <header className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${isScrolled ? 'top-4 w-[calc(100%-4rem)] max-w-5xl' : 'top-6 w-[calc(100%-3rem)] max-w-7xl'}`}>
        <nav className={`w-full bg-white/80 backdrop-blur-lg border border-gray-200/60 flex items-center justify-between shadow-sm transition-all duration-500 ease-out ${isScrolled ? 'px-6 py-2 rounded-full' : 'px-8 py-4 rounded-2xl'}`}>
          <div className="flex items-center gap-2">
            <Sparkles className="text-gray-900 transition-all duration-300" size={isScrolled ? 20 : 24} />
            <span className={`font-extrabold tracking-tight text-gray-900 transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>Gigflow.io</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[14px] font-medium text-gray-600">
            <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="px-4 py-2 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-all">Features</a>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="px-4 py-2 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-all">Dashboard</Link>
            <a href="#analytics" onClick={(e) => { e.preventDefault(); document.getElementById('analytics')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="px-4 py-2 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-all">Analytics</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated && (
              <Link to="/login" className={`flex items-center select-none font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-full transition-all shadow-sm ${isScrolled ? 'text-xs px-4 py-2' : 'text-sm px-6 py-2.5'}`}>
                Log in
              </Link>
            )}
            <Link 
              to={isAuthenticated ? "/dashboard" : "/register"} 
              className={`flex items-center select-none gap-2 bg-gray-900 hover:bg-black text-white font-semibold rounded-full transition-all shadow-md ${isScrolled ? 'text-xs px-5 py-2' : 'text-sm px-6 py-2.5'}`}
            >
              {isAuthenticated ? "Dashboard" : "Get Started"}
            </Link>
          </div>

          <button 
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex flex-col gap-4 md:hidden animate-fade-in z-50">
            <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">Features</a>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">Dashboard</Link>
            <a href="#analytics" onClick={(e) => { e.preventDefault(); document.getElementById('analytics')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">Analytics</a>
            <hr className="border-gray-100" />
            {!isAuthenticated && (
              <Link to="/login" className="text-center font-medium text-gray-600 py-2">Log in</Link>
            )}
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="bg-gray-900 text-white text-center font-medium rounded-xl py-3">
              {isAuthenticated ? "Dashboard" : "Get Started"}
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center text-center px-4 pt-40 pb-16 relative z-10 w-full max-w-7xl mx-auto min-h-[80vh]">
        
        {/* Floating Cards with Parallax Effect */}
        <div className="absolute inset-0 pointer-events-none w-full h-full z-0">
           
           {/* Card 1 - Top Left */}
           <div 
             className="absolute left-4 lg:left-10 top-32 hidden md:flex flex-col gap-2 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 animate-float-fast"
             style={{ transform: `translateY(${scrollY * 0.35}px) rotate(-6deg)` }}
           >
              <div className="text-xs text-gray-500 font-medium">Lead Conversion</div>
              <div className="text-2xl font-bold text-gray-900">+350%</div>
              <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1"><div className="w-3/4 h-full bg-blue-500 rounded-full"></div></div>
           </div>

           {/* Card 2 - Top Right */}
           <div 
             className="absolute right-4 lg:right-10 top-48 hidden md:flex flex-col gap-2 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 animate-float"
             style={{ transform: `translateY(${scrollY * 0.25}px) rotate(6deg)` }}
           >
              <div className="text-xs text-gray-500 font-medium">Sales Velocity</div>
              <div className="text-2xl font-bold text-blue-600">4.2x</div>
              <div className="flex gap-1 mt-1 bg-gray-50 p-1 rounded-md w-max border border-gray-100">
                <div className="w-6 h-4 bg-white rounded shadow-sm flex items-center justify-center"><ArrowRight size={10} className="text-blue-500"/></div>
              </div>
           </div>

           {/* Card 3 - Bottom Left */}
           <div 
             className="absolute left-16 lg:left-32 top-96 hidden lg:flex flex-col gap-2 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 animate-float-delayed mt-10"
             style={{ transform: `translateY(${scrollY * 0.4}px) rotate(3deg)` }}
           >
              <div className="text-xs text-gray-500 font-medium">Active Deals</div>
              <div className="text-xl font-bold text-gray-900">1,240+</div>
           </div>

           {/* Card 4 - Bottom Right */}
           <div 
             className="absolute right-16 lg:right-32 top-[22rem] hidden lg:flex flex-col gap-2 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 animate-float-fast"
             style={{ transform: `translateY(${scrollY * 0.15}px) rotate(-3deg)` }}
           >
              <div className="text-xs text-gray-500 font-medium">Win Rate</div>
              <div className="text-xl font-bold text-green-600">68%</div>
              <div className="flex items-end gap-1 mt-1 h-4">
                <div className="w-2.5 h-2 bg-green-200 rounded-[1px]"></div>
                <div className="w-2.5 h-3 bg-green-300 rounded-[1px]"></div>
                <div className="w-2.5 h-4 bg-green-400 rounded-[1px]"></div>
                <div className="w-2.5 h-5 bg-green-500 rounded-[1px]"></div>
              </div>
           </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center mt-10 select-none">
          <h1 className="text-5xl md:text-[5rem] font-bold tracking-tight leading-[1.05] mb-6 text-[#0f172a] drop-shadow-sm cursor-default">
            Manage Your Sales <br className="hidden md:block" /> Pipeline With <span className="text-blue-600 inline-flex items-center gap-3 whitespace-nowrap">
              <ListTodo size={40} strokeWidth={2.5} className="text-blue-600 translate-y-1"/>
              Total
            </span>
            <br className="hidden md:block"/> <span className="text-blue-600">Clarity</span>
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed cursor-default">
            Empower your entire sales team with a centralized lead management dashboard. Track high-value prospects, assign roles, and close deals significantly faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="w-full sm:w-auto select-none bg-[#0f172a] hover:bg-black text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {isAuthenticated ? "Open Dashboard" : "Get Started for Free"}
            </Link>
          </div>
        </div>
        
        {/* Trusted By Section */}
        <div className="w-full mt-32 mb-10 relative z-10">
          <p className="text-xs font-semibold text-gray-400 mb-8 uppercase tracking-widest">Trusted by High-Performance Sales Teams</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-80">
             <div className="flex items-center gap-2"><div className="w-6 h-6 bg-red-500 rounded-sm transform rotate-45"></div><span className="text-xl font-bold tracking-tight text-gray-800">Sourcegraph</span></div>
             <div className="flex items-center gap-2"><div className="w-6 h-6 bg-indigo-500 rounded-full"></div><span className="text-xl font-bold font-serif text-gray-800">liblab</span></div>
             <div className="flex items-center gap-2"><div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">t</div><span className="text-xl font-bold text-gray-800">twilio</span></div>
             <div className="flex items-center gap-2"><div className="w-6 h-6 bg-gray-800 rounded-sm"></div><span className="text-xl font-bold text-gray-600">Hedera</span></div>
             <div className="flex items-center gap-2"><div className="w-6 h-6 bg-orange-500 rounded-tr-xl rounded-bl-xl"></div><span className="text-xl font-bold text-blue-900">krunch</span></div>
          </div>
        </div>

      </main>

      {/* Features Section */}
      <section id="features" className="w-full bg-slate-50 relative z-10 py-24 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 mb-6 text-[10px] font-bold text-blue-700 uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Platform Features
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-gray-900 mb-6">
            A CRM That Delivers <br/> Real Business Results
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-base">
            We give technology companies the exact tools they need to transform their messy sales pipeline into a highly optimized, predictable revenue engine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Card 1: Intelligent Lead Tracking */}
            <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-full h-56 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-xl mb-6 relative overflow-hidden flex flex-col justify-center items-center p-6 gap-3">
                 <div className="w-full max-w-[200px] bg-white/80 backdrop-blur border border-white rounded-lg p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center"><Users size={12} className="text-blue-600"/></div>
                       <div className="h-2 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                 </div>
                 <div className="w-full max-w-[200px] bg-white/80 backdrop-blur border border-white rounded-lg p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center"><Users size={12} className="text-purple-600"/></div>
                       <div className="h-2 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                 </div>
                 <div className="w-full max-w-[200px] bg-white/80 backdrop-blur border border-white rounded-lg p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center"><Users size={12} className="text-green-600"/></div>
                       <div className="h-2 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                 </div>
              </div>
              <div className="px-5 pb-6 pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Intelligent Lead Tracking</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Capture, qualify, and route leads automatically. Never let a high-value prospect fall through the cracks again.
                </p>
              </div>
            </div>

            {/* Card 2: Actionable Analytics */}
            <div id="analytics" className="bg-white border border-gray-200 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-full h-56 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-xl mb-6 relative overflow-hidden p-6 flex items-center justify-center">
                 {/* Fake Pie Chart */}
                 <div className="w-28 h-28 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] border-[3px] border-white relative" style={{ background: 'conic-gradient(#3b82f6 0% 55%, #60a5fa 55% 85%, #bfdbfe 85% 100%)' }}>
                    {/* Donut hole */}
                    <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                       <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                    {/* Floating labels */}
                    <div className="absolute top-0 -right-6 bg-white px-2 py-0.5 rounded shadow-sm text-[9px] font-bold text-gray-700 border border-gray-100">55% New</div>
                    <div className="absolute bottom-0 -left-6 bg-white px-2 py-0.5 rounded shadow-sm text-[9px] font-bold text-gray-700 border border-gray-100">30% Won</div>
                 </div>
              </div>
              <div className="px-5 pb-6 pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Actionable Analytics</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Gain instant insights into your sales performance. Export lead data, track conversion rates, and generate comprehensive reports.
                </p>
              </div>
            </div>

            {/* Card 3: Role-Based Access */}
            <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-full h-56 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-xl mb-6 relative overflow-hidden flex flex-col items-center justify-center gap-4">
                 
                 <div className="flex items-center gap-3 bg-white/90 backdrop-blur p-2.5 rounded-lg shadow-sm border border-white w-3/4 max-w-[200px]">
                   <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center"><Shield size={14} className="text-blue-600"/></div>
                   <div className="flex-1">
                     <div className="h-2 bg-gray-800 rounded w-12 mb-1.5"></div>
                     <div className="h-1.5 bg-gray-300 rounded w-20"></div>
                   </div>
                   <div className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-[8px] font-bold text-blue-600 rounded">ADMIN</div>
                 </div>

                 <div className="flex items-center gap-3 bg-white/60 backdrop-blur p-2.5 rounded-lg shadow-sm border border-white/50 w-3/4 max-w-[200px] ml-6">
                   <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center"><Users size={14} className="text-gray-500"/></div>
                   <div className="flex-1">
                     <div className="h-2 bg-gray-600 rounded w-16 mb-1.5"></div>
                     <div className="h-1.5 bg-gray-300 rounded w-14"></div>
                   </div>
                   <div className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-[8px] font-bold text-gray-600 rounded">SALES</div>
                 </div>

              </div>
              <div className="px-5 pb-6 pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Role-Based Access</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Assign specific roles, restrict access, and maintain security. Perfectly designed for administrators and remote sales reps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <section className="w-full bg-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-gray-50 rounded-3xl p-12 border border-gray-100 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to scale your sales?</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">Join high-growth teams that use Gigflow to manage their pipeline and close deals faster.</p>
          <Link 
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="inline-block select-none bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-black transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Start your free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 pt-16 pb-8 px-6 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-white" size={24} />
              <span className="text-2xl font-extrabold tracking-tight text-white">Gigflow.io</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              The ultimate enterprise CRM built to help modern sales teams close deals faster, manage leads efficiently, and build stronger customer relationships instantly.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Product</h4>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Changelog</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Company</h4>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Gigflow, Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
