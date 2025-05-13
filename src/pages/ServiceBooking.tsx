
import { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

interface ServiceDetails {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  icon: React.ReactNode;
}

// Service details database
const servicesData: Record<string, ServiceDetails> = {
  cardiology: {
    id: 'cardiology',
    title: 'Cardiology',
    description: 'Our cardiology department provides comprehensive heart care, including diagnostics, treatment, and prevention for all types of heart conditions.',
    requirements: [
      'Previous cardiac reports (if any)',
      'List of current medications',
      'Recent blood work results',
      'Family history of heart disease'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
      </svg>
    )
  },
  diabetes: {
    id: 'diabetes',
    title: 'Diabetes Care',
    description: 'Our diabetes management program offers comprehensive care for Type 1, Type 2, and gestational diabetes with a focus on lifestyle modification and medication management.',
    requirements: [
      'Recent blood glucose readings',
      'HbA1c test results (if available)',
      'Current medication list',
      'Food diary (optional but helpful)'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20h-2a2 2 0 0 1-2-2v-2h0a2 2 0 0 1 2-2h3.4a2 2 0 0 0 1.9-1.3l.5-1.2a2 2 0 0 0-1.3-2.6l-9.9-2.2a2 2 0 0 1-1.4-1.2l-.3-.7a2 2 0 0 1 1.1-2.6l.7-.2a2 2 0 0 1 2.6 1.1l.1.3"/>
        <path d="M14 8V5c0-1.1.9-2 2-2h0a2 2 0 0 1 2 2v3"/>
      </svg>
    )
  },
  oncology: {
    id: 'oncology',
    title: 'Oncology',
    description: 'Our oncology department provides state-of-the-art cancer treatment with a multidisciplinary approach to diagnosis, treatment planning, and supportive care.',
    requirements: [
      'Previous diagnosis reports',
      'Imaging scans (X-rays, CT, MRI, PET)',
      'Pathology reports',
      'List of current medications and treatments'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 12a4 4 0 0 1-8 0"/>
        <path d="M8 12V6a2 2 0 1 1 4 0v2"/>
        <line x1="2" y1="2" x2="22" y2="22"/>
      </svg>
    )
  },
  health_checkup: {
    id: 'health_checkup',
    title: 'Health Checkup',
    description: 'Our comprehensive health check-up packages are designed to assess your current health status and identify potential risks early.',
    requirements: [
      'Previous health records (if available)',
      'List of any current medications',
      '8-12 hours fasting (for blood tests)',
      'Any symptoms or concerns to discuss'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    )
  },
  special_care: {
    id: 'special_care',
    title: 'Special Care',
    description: 'Our special care services provide personalized treatment plans for patients with complex or multiple medical conditions.',
    requirements: [
      'Detailed medical history',
      'Previous specialist reports',
      'Current medication list',
      'Recent test results'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    )
  },
  lab_testing: {
    id: 'lab_testing',
    title: 'Lab Testing',
    description: 'Our advanced laboratory offers a wide range of diagnostic tests with quick and accurate results.',
    requirements: [
      'Doctor\'s prescription/referral (if applicable)',
      '8-12 hours fasting (for certain tests)',
      'Previous test results (if available)',
      'Information about any medications that might affect results'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31"/>
        <path d="M14 9.3V2"/>
        <path d="M8.5 2h7"/>
        <path d="M14 9.3a6.5 6.5 0 1 1-4 0"/>
        <path d="M5.58 16.5h12.85"/>
      </svg>
    )
  },
  vaccinations: {
    id: 'vaccinations',
    title: 'Vaccinations',
    description: 'We offer a comprehensive range of vaccines for all age groups, from routine immunizations to travel vaccines.',
    requirements: [
      'Immunization records',
      'Information about allergies',
      'Details of previous vaccine reactions (if any)',
      'Travel itinerary (for travel vaccines)'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5.2 5.2 1.4 1.4"/>
        <path d="M3 10h2"/>
        <path d="M10 3v2"/>
        <path d="m5.2 14.8 1.4-1.4"/>
        <path d="M14 21v-4.7"/>
        <path d="M10 21v-2"/>
        <path d="M14 16.3V10"/>
        <path d="M10 13V7"/>
        <path d="M17 13h-2"/>
        <path d="M17 17h-2"/>
        <path d="M21 17h-2"/>
      </svg>
    )
  },
  chronic_care: {
    id: 'chronic_care',
    title: 'Chronic Care',
    description: 'Our chronic care management program provides ongoing support and treatment for patients with long-term health conditions.',
    requirements: [
      'Detailed medical history',
      'List of current medications',
      'Recent test results',
      'Specialist reports (if available)'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 2 4 10 3-5 3 7 1-4 3 4h-18"/>
        <path d="M6 16v4"/>
        <path d="M10 16v4"/>
        <path d="M14 16v4"/>
        <path d="M18 16v4"/>
      </svg>
    )
  },
  pharmacy: {
    id: 'pharmacy',
    title: 'Pharmacy',
    description: 'Our pharmacy provides prescription medications, over-the-counter drugs, and expert medication counseling.',
    requirements: [
      'Valid prescription',
      'Insurance card (if applicable)',
      'List of current medications',
      'Information about allergies'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 8 4-4 4 4"/>
        <path d="M7 4v8"/>
        <rect x="15" y="6" width="4" height="12" rx="1"/>
        <path d="M19 10h-4"/>
        <path d="M15 14h4"/>
      </svg>
    )
  },
};

const ServiceBooking = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails | null>(null);
  const [healthCondition, setHealthCondition] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [documents, setDocuments] = useState<{ [key: string]: boolean }>({});
  
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    // Get service details
    if (serviceId && servicesData[serviceId]) {
      setServiceDetails(servicesData[serviceId]);
      
      // Initialize document checkboxes
      if (servicesData[serviceId].requirements) {
        const initialDocuments = servicesData[serviceId].requirements.reduce(
          (acc, req) => ({ ...acc, [req]: false }), 
          {}
        );
        setDocuments(initialDocuments);
      }
    } else {
      // Handle invalid service ID
      toast({
        title: "Service Not Found",
        description: "The requested service could not be found.",
        variant: "destructive",
      });
      navigate('/services');
    }
  }, [serviceId, navigate, toast]);
  
  if (!currentUser) {
    // Redirect to registration if not logged in
    navigate('/register');
    return null;
  }
  
  if (!serviceDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-healthcare-800">Loading Service Details...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleCheckboxChange = (requirement: string) => {
    setDocuments(prev => ({
      ...prev,
      [requirement]: !prev[requirement]
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!healthCondition || !preferredDate || !preferredTime) {
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
        id: `SRV-${generateId(6)}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userPhone: currentUser.phone,
        serviceId: serviceDetails.id,
        serviceName: serviceDetails.title,
        healthCondition,
        preferredDate,
        preferredTime,
        documents: Object.entries(documents)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // Save the appointment
      addAppointment(appointmentData);
      
      // Update user with service info
      updateUser(currentUser.id, {
        lastService: {
          id: serviceDetails.id,
          name: serviceDetails.title,
          date: preferredDate
        }
      });
      
      toast({
        title: "Appointment Booked!",
        description: `Your ${serviceDetails.title} appointment has been scheduled.`,
      });
      
      // Navigate to confirmation or dashboard
      navigate('/service-confirmation', { 
        state: { 
          isConsultation: false,
          appointmentData,
          serviceName: serviceDetails.title
        } 
      });
      
    } catch (error) {
      console.error("Error booking service:", error);
      toast({
        title: "Booking Failed",
        description: "An error occurred while booking your appointment. Please try again.",
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-healthcare-100 text-healthcare-600 mb-4">
              {serviceDetails.icon}
            </div>
            <h1 className="text-3xl font-bold text-healthcare-900 mb-2">{serviceDetails.title}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{serviceDetails.description}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left Column - User Information */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-healthcare-800">Your Information</h2>
                <UserProfileCard user={currentUser} />
                
                <Card className="mt-6">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-healthcare-800 mb-4">Required Documents</h3>
                    <div className="space-y-3">
                      {serviceDetails.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            id={`req-${index}`}
                            className="mt-1"
                            checked={documents[req] || false}
                            onChange={() => handleCheckboxChange(req)}
                          />
                          <label htmlFor={`req-${index}`} className="text-gray-700 text-sm">
                            {req}
                          </label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      Please check the documents you will bring or have available for your appointment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Right Column - Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    {/* Health Condition */}
                    <div className="mb-6">
                      <Label htmlFor="healthCondition">Health Condition</Label>
                      <Textarea
                        id="healthCondition"
                        placeholder={`Please describe your current health condition and why you're seeking ${serviceDetails.title.toLowerCase()} services`}
                        className="min-h-[150px]"
                        value={healthCondition}
                        onChange={(e) => setHealthCondition(e.target.value)}
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
                    
                    {/* Terms & Notes */}
                    <div className="mb-8 text-sm text-gray-600">
                      <p>
                        By booking this service, you agree to our terms of service and privacy policy. 
                        Our medical staff will review your information before confirming the appointment.
                      </p>
                    </div>
                    
                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-healthcare-600 hover:bg-healthcare-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Booking..." : `Book ${serviceDetails.title} Appointment`}
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

export default ServiceBooking;
