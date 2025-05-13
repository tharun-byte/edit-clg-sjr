
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VirtualIDCard from "@/components/VirtualIDCard";
import { fileToBase64, generateId, saveUserData, addUser } from "@/utils/authUtils";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    services: '',
  });
  
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, services: value }));
  };
  
  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      
      try {
        const base64 = await fileToBase64(file);
        setPhotoPreview(base64);
      } catch (error) {
        console.error("Error converting file to base64:", error);
        toast({
          title: "Error",
          description: "Failed to process your photo. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate form
      if (!formData.name || !formData.phone || !formData.email || !formData.address || !formData.services || !photo) {
        toast({
          title: "Error",
          description: "Please fill in all fields and upload your photo.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Convert photo to base64 for storage
      const photoBase64 = await fileToBase64(photo);
      
      // Generate user ID
      const userId = `GH${generateId(6)}`;
      
      // Create user object with all data
      const newUser = {
        id: userId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        services: formData.services,
        photoUrl: photoBase64,
        registrationDate: new Date().toISOString(),
      };
      
      // Save to localStorage (simulate database)
      saveUserData(newUser);
      addUser(newUser);
      
      setUserData(newUser);
      setIsRegistered(true);
      
      toast({
        title: "Registration Successful!",
        description: "Your virtual ID card has been generated.",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleContinue = () => {
    navigate('/consultation-booking');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container-custom">
          {!isRegistered ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-healthcare-900 mb-2">Register with Global Health</h1>
                <p className="text-gray-600">Create your account to access our healthcare services and get your virtual ID card.</p>
              </div>
              
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Full Name */}
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Enter your full name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      {/* Phone Number */}
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel"
                          placeholder="Enter your phone number" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      {/* Email */}
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="Enter your email address" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      {/* Address */}
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea 
                          id="address" 
                          name="address"
                          placeholder="Enter your full address" 
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      {/* Services */}
                      <div>
                        <Label htmlFor="services">Select Service</Label>
                        <Select 
                          onValueChange={handleSelectChange}
                          required
                        >
                          <SelectTrigger id="services">
                            <SelectValue placeholder="Select Service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="health_checkup">Health Checkup</SelectItem>
                            <SelectItem value="special_care">Special Care</SelectItem>
                            <SelectItem value="lab_testing">Lab Testing</SelectItem>
                            <SelectItem value="vaccinations">Vaccinations</SelectItem>
                            <SelectItem value="chronic_care">Chronic Care</SelectItem>
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Photo Upload */}
                      <div>
                        <Label htmlFor="photo">Upload Your Photo</Label>
                        <div className="mt-1 flex items-center gap-4">
                          <div className="w-24 h-24 rounded-md border border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                            {photoPreview ? (
                              <img 
                                src={photoPreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="32" 
                                height="32" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="text-gray-400"
                              >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                            )}
                          </div>
                          <label htmlFor="photo-upload" className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors py-2 px-4 rounded-md text-gray-700 flex-grow">
                            <span>Choose a file</span>
                            <input 
                              id="photo-upload" 
                              name="photo" 
                              type="file" 
                              accept="image/*" 
                              className="sr-only" 
                              onChange={handlePhotoChange}
                              required
                            />
                          </label>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Upload a clear photo of your face. This will be used for your ID card.
                        </p>
                      </div>
                      
                      {/* Submit Button */}
                      <div className="mt-8">
                        <Button 
                          type="submit" 
                          className="w-full bg-healthcare-600 hover:bg-healthcare-700"
                          disabled={isLoading}
                        >
                          {isLoading ? "Processing..." : "Register & Generate ID Card"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-healthcare-900 mb-2">Registration Successful!</h1>
                <p className="text-gray-600">Your virtual ID card has been generated. Please keep it safe for future reference.</p>
              </div>
              
              <div className="max-w-md mx-auto mb-10">
                {userData && <VirtualIDCard userData={userData} />}
              </div>
              
              <div className="max-w-xl mx-auto text-center p-8 bg-healthcare-50 rounded-xl border border-healthcare-100">
                <h2 className="text-2xl font-bold text-healthcare-800 mb-4">Free Expert Consultations</h2>
                <p className="text-gray-700 mb-6">
                  As a registered user, you're eligible for our free expert consultations. Our medical experts are ready to help you with personalized advice and care plans.
                </p>
                <Button 
                  onClick={handleContinue} 
                  size="lg"
                  className="bg-healthcare-600 hover:bg-healthcare-700"
                >
                  Book Your Free Consultation
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
