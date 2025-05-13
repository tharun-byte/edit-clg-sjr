
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import VirtualIDCard from "@/components/VirtualIDCard";
import { fileToBase64, saveUserData, addUser } from "@/utils/authUtils";

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
      
      // Validate phone number
      if (formData.phone.length < 5) {
        toast({
          title: "Error",
          description: "Phone number must be at least 5 digits.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Convert photo to base64 for storage
      const photoBase64 = await fileToBase64(photo);
      
      // Generate user ID using last 5 digits of phone number
      const phoneDigits = formData.phone.slice(-5);
      const userId = `GH${phoneDigits}`;
      
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
    navigate('/user-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="container-custom max-w-2xl mx-auto px-4">
        {!isRegistered ? (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-healthcare-900">Global Health India</h1>
                <p className="text-gray-600 mt-2">Register to access our healthcare services</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
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
                    <p className="text-xs text-gray-500 mt-1">
                      The last 5 digits will be used to generate your ID
                    </p>
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
                  </div>
                  
                  {/* Submit Button */}
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      className="w-full bg-healthcare-600 hover:bg-healthcare-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Register & Generate ID Card"}
                    </Button>
                  </div>
                  
                  <p className="text-sm text-center mt-2">
                    Already have an account?{" "}
                    <Link to="/" className="text-healthcare-600 hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-bold text-healthcare-900">Registration Successful!</h1>
                  <p className="text-gray-600">Your virtual ID card has been generated</p>
                </div>
                
                <div className="max-w-md mx-auto">
                  {userData && <VirtualIDCard userData={userData} />}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button 
                    onClick={handleContinue} 
                    size="lg"
                    className="bg-healthcare-600 hover:bg-healthcare-700"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
