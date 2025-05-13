
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import AdminUserList from "@/components/AdminUserList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserProfileCard from "@/components/UserProfileCard";
import VirtualIDCard from "@/components/VirtualIDCard";
import { initializeAdmin, getAllUsers, getAllAppointments, getUserById } from "@/utils/authUtils";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [newAdminForm, setNewAdminForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  useEffect(() => {
    // Initialize admin account
    initializeAdmin();
    
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminLoggedIn);
    
    if (adminLoggedIn) {
      // Load users and appointments
      loadData();
    }
    
    // Get admin credentials
    const credentials = localStorage.getItem('adminCredentials');
    if (credentials) {
      setAdminCredentials(JSON.parse(credentials));
    }
  }, []);
  
  const loadData = () => {
    // Load users
    const allUsers = getAllUsers();
    setUsers(allUsers);
    
    // Load appointments
    const allAppointments = getAllAppointments();
    setAppointments(allAppointments);
  };
  
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    
    try {
      // Check if credentials match
      const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials') || '{}');
      
      if (
        loginForm.username === storedCredentials.username &&
        loginForm.password === storedCredentials.password
      ) {
        // Set admin logged in
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');
        setIsAdminLoggedIn(true);
        
        // Load data
        loadData();
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('isAdmin');
    setIsAdminLoggedIn(false);
    navigate('/');
  };
  
  const handleCreateAdmin = (e: FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (
        !newAdminForm.username ||
        !newAdminForm.password ||
        !newAdminForm.confirmPassword
      ) {
        toast({
          title: "Error",
          description: "All fields are required.",
          variant: "destructive",
        });
        return;
      }
      
      if (newAdminForm.password !== newAdminForm.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return;
      }
      
      // Create admin
      localStorage.setItem('adminCredentials', JSON.stringify({
        username: newAdminForm.username,
        password: newAdminForm.password,
      }));
      
      setAdminCredentials({
        username: newAdminForm.username,
        password: newAdminForm.password,
      });
      
      setIsAddingAdmin(false);
      setNewAdminForm({
        username: '',
        password: '',
        confirmPassword: '',
      });
      
      toast({
        title: "Admin Account Created",
        description: "New admin credentials have been set.",
      });
      
    } catch (error) {
      console.error("Error creating admin:", error);
      toast({
        title: "Error",
        description: "Failed to create admin account. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleViewUser = (userId: string) => {
    const user = getUserById(userId);
    if (user) {
      setSelectedUser(user);
    } else {
      toast({
        title: "User Not Found",
        description: "The selected user could not be found.",
        variant: "destructive",
      });
    }
  };
  
  const handleBackToList = () => {
    setSelectedUser(null);
  };
  
  // If admin is not logged in, show login form
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow py-16 flex items-center justify-center bg-gray-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-healthcare-600 hover:bg-healthcare-700"
                >
                  Login
                </Button>
                
                {/* Show default admin credentials for this demo */}
                {adminCredentials && (
                  <div className="mt-4 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                    <p className="text-sm text-yellow-800 font-medium mb-1">Default Admin Credentials:</p>
                    <p className="text-xs text-gray-700">Username: {adminCredentials.username}</p>
                    <p className="text-xs text-gray-700">Password: {adminCredentials.password}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Show selected user details if a user is selected
  if (selectedUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container-custom">
            <Button 
              variant="ghost" 
              onClick={handleBackToList}
              className="mb-6"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to User List
            </Button>
            
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-healthcare-900 mb-2">User Details</h1>
              <p className="text-gray-600">Manage user information and view their appointments.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - User Info */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <UserProfileCard user={selectedUser} isAdmin={true} />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Virtual ID Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <VirtualIDCard userData={selectedUser} />
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Right column - Appointments */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appointments.filter(app => app.userId === selectedUser.id).length > 0 ? (
                      <div className="space-y-4">
                        {appointments
                          .filter(app => app.userId === selectedUser.id)
                          .map(appointment => (
                            <div 
                              key={appointment.id} 
                              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-healthcare-800">
                                  {appointment.type === 'consultation' 
                                    ? 'Free Expert Consultation' 
                                    : appointment.serviceName}
                                </h3>
                                <span
                                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                    appointment.status === 'confirmed'
                                      ? 'bg-green-100 text-green-800'
                                      : appointment.status === 'canceled'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                              </div>
                              
                              <div className="text-sm text-gray-600 mb-3">
                                <p>
                                  Date: {new Date(appointment.preferredDate).toLocaleDateString('en-IN')} at {appointment.preferredTime}
                                </p>
                                <p>Booked on: {new Date(appointment.createdAt).toLocaleString('en-IN')}</p>
                              </div>
                              
                              {appointment.healthCondition || appointment.healthConcern ? (
                                <div className="bg-gray-50 p-3 rounded-md text-sm">
                                  <p className="font-medium text-gray-700 mb-1">Health Information:</p>
                                  <p className="text-gray-600">
                                    {appointment.healthCondition || appointment.healthConcern}
                                  </p>
                                </div>
                              ) : null}
                              
                              {appointment.documents && appointment.documents.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-sm font-medium text-gray-700 mb-1">Required Documents:</p>
                                  <ul className="text-sm text-gray-600 list-disc pl-5">
                                    {appointment.documents.map((doc: string, index: number) => (
                                      <li key={index}>{doc}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No appointments found for this user.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Show admin dashboard if logged in and no user is selected
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-healthcare-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage users, appointments, and admin settings.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-healthcare-600 text-healthcare-600 hover:bg-healthcare-50"
              >
                Logout
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                  {users.length > 0 ? (
                    <AdminUserList users={users} onViewDetails={handleViewUser} />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No users have registered yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Appointments Tab */}
            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>All Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  {appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.map(appointment => (
                        <div 
                          key={appointment.id} 
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                            <div>
                              <h3 className="font-semibold text-healthcare-800">
                                {appointment.type === 'consultation' 
                                  ? 'Free Expert Consultation' 
                                  : appointment.serviceName}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                Patient: <span className="font-medium">{appointment.userName}</span>
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex items-center gap-2">
                              <span
                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                  appointment.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : appointment.status === 'canceled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 border-healthcare-600 text-healthcare-600 hover:bg-healthcare-50"
                                onClick={() => handleViewUser(appointment.userId)}
                              >
                                View Patient
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-3">
                            <p>
                              Scheduled for: {new Date(appointment.preferredDate).toLocaleDateString('en-IN')} at {appointment.preferredTime}
                            </p>
                            <p>Booked on: {new Date(appointment.createdAt).toLocaleString('en-IN')}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md text-sm">
                            <p className="font-medium text-gray-700 mb-1">Health Information:</p>
                            <p className="text-gray-600">
                              {appointment.healthCondition || appointment.healthConcern || "No information provided."}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No appointments have been booked yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Admin Credentials */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Admin Account</h3>
                      <Dialog open={isAddingAdmin} onOpenChange={setIsAddingAdmin}>
                        <DialogTrigger asChild>
                          <Button className="bg-healthcare-600 hover:bg-healthcare-700">
                            Update Admin Credentials
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Admin Credentials</DialogTitle>
                            <DialogDescription>
                              Create a new administrator account. This will replace the existing credentials.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <div>
                              <Label htmlFor="new-username">Username</Label>
                              <Input
                                id="new-username"
                                value={newAdminForm.username}
                                onChange={(e) => setNewAdminForm({ ...newAdminForm, username: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="new-password">Password</Label>
                              <Input
                                id="new-password"
                                type="password"
                                value={newAdminForm.password}
                                onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="confirm-password">Confirm Password</Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={newAdminForm.confirmPassword}
                                onChange={(e) => setNewAdminForm({ ...newAdminForm, confirmPassword: e.target.value })}
                                required
                              />
                            </div>
                            
                            <DialogFooter>
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsAddingAdmin(false)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                type="submit"
                                className="bg-healthcare-600 hover:bg-healthcare-700"
                              >
                                Save Credentials
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      
                      {/* Current credentials */}
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Current Admin Credentials</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p><strong>Username:</strong> {adminCredentials?.username}</p>
                          <p><strong>Password:</strong> ••••••••</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Application Statistics</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-healthcare-50 p-4 rounded-md border border-healthcare-100">
                          <p className="text-sm text-gray-500">Total Users</p>
                          <p className="text-2xl font-bold text-healthcare-800">{users.length}</p>
                        </div>
                        <div className="bg-healthcare-50 p-4 rounded-md border border-healthcare-100">
                          <p className="text-sm text-gray-500">Appointments</p>
                          <p className="text-2xl font-bold text-healthcare-800">{appointments.length}</p>
                        </div>
                        <div className="bg-healthcare-50 p-4 rounded-md border border-healthcare-100">
                          <p className="text-sm text-gray-500">Consultations</p>
                          <p className="text-2xl font-bold text-healthcare-800">
                            {appointments.filter(a => a.type === 'consultation').length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
