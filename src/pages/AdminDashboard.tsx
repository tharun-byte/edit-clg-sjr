
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import UserProfileCard from "@/components/UserProfileCard";
import VirtualIDCard from "@/components/VirtualIDCard";
import { getAllUsers, getAllAppointments, getUserById } from "@/utils/authUtils";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!adminLoggedIn) {
      navigate('/');
      return;
    }
    
    // Load users and appointments
    loadData();
  }, [navigate]);
  
  const loadData = () => {
    // Load users
    const allUsers = getAllUsers();
    setUsers(allUsers);
    
    // Load appointments
    const allAppointments = getAllAppointments();
    setAppointments(allAppointments);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('isAdmin');
    navigate('/');
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
  
  // Show selected user details if a user is selected
  if (selectedUser) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
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
      </div>
    );
  }
  
  // Show admin dashboard if logged in and no user is selected
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-healthcare-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users and appointments</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-healthcare-600 text-healthcare-600 hover:bg-healthcare-50"
          >
            Logout
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                {users.length > 0 ? (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div 
                        key={user.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleViewUser(user.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-4">
                            <img 
                              src={user.photoUrl || "/placeholder.svg"}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-gray-500">ID: {user.id}</p>
                          </div>
                          <div className="ml-auto">
                            <Button 
                              size="sm"
                              className="bg-healthcare-600 hover:bg-healthcare-700"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
        </Tabs>
        
        <div className="mt-8 p-4 bg-healthcare-50 border border-healthcare-100 rounded-lg">
          <h3 className="text-lg font-bold text-healthcare-800 mb-2">Admin Information</h3>
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> GlobalHealth2023!</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
