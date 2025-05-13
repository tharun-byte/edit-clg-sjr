
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import VirtualIDCard from "@/components/VirtualIDCard";
import { getCurrentUser, updateUser, getAllAppointments, fileToBase64 } from "@/utils/authUtils";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  useEffect(() => {
    // Get user data
    const user = getCurrentUser();
    if (!user) {
      navigate('/');
      return;
    }
    
    setUserData(user);
    setEditForm({
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
    });
    setPhotoPreview(user.photoUrl);
    
    // Get appointments
    const allAppointments = getAllAppointments();
    const userAppointments = allAppointments.filter(
      (appointment: any) => appointment.userId === user.id
    );
    setAppointments(userAppointments);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      address: userData.address,
    });
    setPhotoPreview(userData.photoUrl);
    setNewPhoto(null);
  };
  
  const handleSaveProfile = async () => {
    try {
      // Validate form data
      if (!editForm.name || !editForm.email || !editForm.phone || !editForm.address) {
        toast({
          title: "Error",
          description: "All fields are required.",
          variant: "destructive",
        });
        return;
      }
      
      // Create updated user data
      const updatedData: any = {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        address: editForm.address,
      };
      
      // Add new photo if changed
      if (newPhoto) {
        const photoBase64 = await fileToBase64(newPhoto);
        updatedData.photoUrl = photoBase64;
      }
      
      // Update user data
      updateUser(userData.id, updatedData);
      
      // Refresh user data
      const updatedUser = getCurrentUser();
      setUserData(updatedUser);
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "An error occurred while updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPhoto(file);
      
      try {
        const base64 = await fileToBase64(file);
        setPhotoPreview(base64);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };
  
  const handleBookConsultation = () => {
    navigate('/consultation-booking');
  };
  
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-healthcare-800">Loading User Profile...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-healthcare-900">User Dashboard</h1>
            <p className="text-gray-600">Welcome, {userData.name}</p>
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
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="id-card">ID Card</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Your Profile</CardTitle>
                  {!isEditing && (
                    <Button 
                      variant="outline" 
                      onClick={handleEditProfile}
                      className="border-healthcare-600 text-healthcare-600 hover:bg-healthcare-50"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-6">
                    {/* Photo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Photo
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                          <img 
                            src={photoPreview || '/placeholder.svg'} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors py-2 px-4 rounded-md text-gray-700">
                          <span>Change Photo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="sr-only" 
                            onChange={handlePhotoChange}
                          />
                        </label>
                      </div>
                    </div>
                    
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <Textarea
                        id="address"
                        name="address"
                        value={editForm.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveProfile}
                        className="bg-healthcare-600 hover:bg-healthcare-700"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Photo */}
                    <div className="col-span-1 flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                        <img 
                          src={userData.photoUrl || '/placeholder.svg'} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="font-semibold text-lg">{userData.name}</h3>
                        <p className="text-gray-500 text-sm">ID: {userData.id}</p>
                        <p className="text-gray-500 text-sm">Service: {userData.services.replace('_', ' ')}</p>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="col-span-2 space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p>{userData.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                        <p>{userData.phone}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                        <p>{userData.address}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
                        <p>{new Date(userData.registrationDate).toLocaleDateString('en-IN')}</p>
                      </div>
                      
                      <div className="pt-4 mt-4 border-t">
                        <Button 
                          onClick={handleBookConsultation} 
                          className="bg-healthcare-600 hover:bg-healthcare-700"
                        >
                          Book Free Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* ID Card Tab */}
          <TabsContent value="id-card">
            <Card>
              <CardHeader>
                <CardTitle>Your Virtual ID Card</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="max-w-md w-full">
                  <VirtualIDCard userData={userData} />
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={() => window.print()}
                      variant="outline"
                      className="border-healthcare-600 text-healthcare-600 hover:bg-healthcare-50"
                    >
                      Print ID Card
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
