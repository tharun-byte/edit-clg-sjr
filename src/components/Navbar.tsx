
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userData'));
  
  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-custom flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-healthcare-600 font-bold text-2xl">Global</span>
            <span className="text-healthcare-800 font-bold text-2xl">Health</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-3 py-2 text-gray-700 hover:text-healthcare-600 transition-colors">
            Home
          </Link>
          <Link to="/about" className="px-3 py-2 text-gray-700 hover:text-healthcare-600 transition-colors">
            About Us
          </Link>
          <Link to="/services" className="px-3 py-2 text-gray-700 hover:text-healthcare-600 transition-colors">
            Services
          </Link>
          <Link to="/gallery" className="px-3 py-2 text-gray-700 hover:text-healthcare-600 transition-colors">
            Gallery
          </Link>
          <Link to="/blog" className="px-3 py-2 text-gray-700 hover:text-healthcare-600 transition-colors">
            Blog
          </Link>
          <Link to="/contact" className="px-3 py-2 text-gray-700 hover:text-healthcare-600 transition-colors">
            Contact Us
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} className="px-3 py-2 text-gray-700 hover:text-healthcare-600 transition-colors">
                Dashboard
              </Link>
              <Button onClick={handleLogout} variant="outline" className="border-healthcare-600 text-healthcare-600 hover:bg-healthcare-600 hover:text-white ml-2">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button variant="ghost" className="text-healthcare-600 hover:text-healthcare-800 transition-colors">
                  Register
                </Button>
              </Link>
              <Link to="/appointment" className="ml-2">
                <Button className="bg-healthcare-600 hover:bg-healthcare-700 text-white">
                  Book Appointment
                </Button>
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-6">
                <Link to="/" className="text-lg font-medium hover:text-healthcare-600 transition-colors">
                  Home
                </Link>
                <Link to="/about" className="text-lg font-medium hover:text-healthcare-600 transition-colors">
                  About Us
                </Link>
                <Link to="/services" className="text-lg font-medium hover:text-healthcare-600 transition-colors">
                  Services
                </Link>
                <Link to="/gallery" className="text-lg font-medium hover:text-healthcare-600 transition-colors">
                  Gallery
                </Link>
                <Link to="/blog" className="text-lg font-medium hover:text-healthcare-600 transition-colors">
                  Blog
                </Link>
                <Link to="/contact" className="text-lg font-medium hover:text-healthcare-600 transition-colors">
                  Contact Us
                </Link>
                
                {isLoggedIn ? (
                  <>
                    <Link to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} className="text-lg font-medium hover:text-healthcare-600 transition-colors">
                      Dashboard
                    </Link>
                    <Button onClick={handleLogout} variant="outline" className="border-healthcare-600 text-healthcare-600 hover:bg-healthcare-600 hover:text-white w-full mt-2">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="w-full">
                      <Button variant="ghost" className="text-healthcare-600 hover:text-healthcare-800 transition-colors w-full">
                        Register
                      </Button>
                    </Link>
                    <Link to="/appointment" className="w-full mt-2">
                      <Button className="bg-healthcare-600 hover:bg-healthcare-700 text-white w-full">
                        Book Appointment
                      </Button>
                    </Link>
                  </>
                )}
                
                <div className="mt-6 border-t pt-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Working Hours: 24 Hours</p>
                    <p className="text-sm font-medium">Email: info@globalhealthindia.in</p>
                    <p className="text-sm font-medium">Contact: +91 9964041772</p>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
