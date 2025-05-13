
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import UserProfileCard from "@/components/UserProfileCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getCurrentUser,
  addAppointment,
  generateId,
  updateUser
} from "@/utils/authUtils";

const ConsultationBooking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [healthConcern, setHealthConcern] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    // Redirect to registration if not logged in
    navigate('/register');
    return null;
  }
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!healthConcern || !preferredDate || !preferredTime) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Create the appointment
      const appointmentData = {
        id: `CONS-${generateId(6)}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userPhone: currentUser.phone,
        type: 'consultation',
        healthConcern,
        preferredDate,
        preferredTime,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // Save the appointment
      addAppointment(appointmentData);
      
      // Update user with consultation info
      updateUser(currentUser.id, {
        lastConsultation: {
          date: preferredDate,
          time: preferredTime,
          concern: healthConcern
        }
      });
      
      toast({
        title: "Consultation Booked!",
        description: "Your free expert consultation has been scheduled.",
      });
      
      // Navigate to confirmation or dashboard
      navigate('/service-confirmation', { 
        state: { 
          isConsultation: true,
          appointmentData 
        } 
      });
      
    } catch (error) {
      console.error("Error booking consultation:", error);
      toast({
        title: "Booking Failed",
        description: "An error occurred while booking your consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-healthcare-900 mb-2">Book Your Free Expert Consultation</h1>
            <p className="text-gray-600">Tell us about your health concerns and schedule a consultation with our medical experts.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left Column - User Information */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-healthcare-800">Your Information</h2>
                <UserProfileCard user={currentUser} />
                
                <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-healthcare-800 mb-2">Why Choose Our Consultation?</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-healthcare-600 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Expert medical professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-healthcare-600 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Personalized health advice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-healthcare-600 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Completely free of charge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-healthcare-600 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Available in-person or virtually</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    {/* Health Concern */}
                    <div className="mb-6">
                      <Label htmlFor="healthConcern">Health Concern</Label>
                      <Textarea
                        id="healthConcern"
                        placeholder="Please describe your health concern or reason for consultation"
                        className="min-h-[150px]"
                        value={healthConcern}
                        onChange={(e) => setHealthConcern(e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Date and Time Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <Input
                          id="preferredTime"
                          type="time"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Terms & Conditions */}
                    <div className="mb-8 text-sm text-gray-600">
                      <p>
                        By booking a consultation, you agree to our terms of service and privacy policy. 
                        Our medical experts will review your information before the consultation.
                      </p>
                    </div>
                    
                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-healthcare-600 hover:bg-healthcare-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Booking..." : "Book Free Consultation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConsultationBooking;
