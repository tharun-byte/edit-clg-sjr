
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getCurrentUser, isAdmin } from "@/utils/authUtils";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    identifier: '', // email or phone
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if this is admin login
      if (isAdminLogin) {
        const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials') || '{}');
        
        if (
          loginForm.identifier === storedCredentials.username &&
          loginForm.password === storedCredentials.password
        ) {
          // Set admin logged in
          localStorage.setItem('adminLoggedIn', 'true');
          localStorage.setItem('isAdmin', 'true');
          
          toast({
            title: "Login Successful",
            description: "Welcome to the admin dashboard.",
          });
          
          navigate('/admin-dashboard');
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid admin credentials.",
            variant: "destructive",
          });
        }
      } else {
        // Regular user login
        const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const user = users.find((u: any) => 
          u.email === loginForm.identifier || 
          u.phone === loginForm.identifier
        );
        
        if (user) {
          // For this demo, we're not checking passwords
          // In a real app, you would verify the password here
          
          // Save user data to localStorage
          localStorage.setItem('userData', JSON.stringify(user));
          
          toast({
            title: "Login Successful",
            description: "Welcome back to Global Health.",
          });
          
          navigate('/user-dashboard');
        } else {
          toast({
            title: "Login Failed",
            description: "User not found. Please check your credentials or register.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-healthcare-900">Global Health India</h1>
              <div className="flex justify-center mt-4 space-x-4">
                <Button 
                  variant={isAdminLogin ? "default" : "outline"} 
                  onClick={() => setIsAdminLogin(true)}
                  className={isAdminLogin ? "bg-healthcare-600" : ""}
                >
                  Admin Login
                </Button>
                <Button 
                  variant={!isAdminLogin ? "default" : "outline"}
                  onClick={() => setIsAdminLogin(false)}
                  className={!isAdminLogin ? "bg-healthcare-600" : ""}
                >
                  User Login
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="identifier">
                  {isAdminLogin ? "Username" : "Email or Phone Number"}
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  value={loginForm.identifier}
                  onChange={handleInputChange}
                  placeholder={isAdminLogin ? "Enter admin username" : "Enter email or phone number"}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required={isAdminLogin}
                />
                {!isAdminLogin && (
                  <p className="text-xs text-gray-500 mt-1">
                    For demo purposes, no password is required for user login
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-healthcare-600 hover:bg-healthcare-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              {!isAdminLogin && (
                <p className="text-sm text-center mt-4">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-healthcare-600 hover:underline">
                    Register
                  </Link>
                </p>
              )}
              
              {isAdminLogin && (
                <div className="mt-4 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                  <p className="text-sm text-yellow-800 font-medium mb-1">Default Admin Credentials:</p>
                  <p className="text-xs text-gray-700">Username: admin</p>
                  <p className="text-xs text-gray-700">Password: GlobalHealth2023!</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
