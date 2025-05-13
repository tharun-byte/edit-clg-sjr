
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ServiceConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isConsultation, appointmentData, serviceName } = location.state || {};
  
  // Safety check if someone navigates here directly
  useEffect(() => {
    if (!appointmentData) {
      navigate('/');
    }
  }, [appointmentData, navigate]);
  
  if (!appointmentData) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <Card className="border-t-4 border-t-green-500">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
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
                    className="text-green-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                <p className="text-gray-600">
                  {isConsultation 
                    ? "Your free consultation has been scheduled successfully." 
                    : `Your ${serviceName} appointment has been booked successfully.`}
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Appointment ID</p>
                    <p className="text-gray-800">{appointmentData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="text-gray-800">
                      {isConsultation ? "Free Expert Consultation" : serviceName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-gray-800">{new Date(appointmentData.preferredDate).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Time</p>
                    <p className="text-gray-800">{appointmentData.preferredTime}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      <p className="text-gray-800">Pending Confirmation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">What happens next?</h2>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mt-1"
                    >
                      <path d="m8 12 2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>Our team will review your booking and send a confirmation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mt-1"
                    >
                      <path d="m8 12 2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>You'll receive an email with confirmation details.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mt-1"
                    >
                      <path d="m8 12 2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>Please arrive 15 minutes before your scheduled appointment time.</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/user-dashboard')} 
                  className="bg-healthcare-600 hover:bg-healthcare-700"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="border-healthcare-600 text-healthcare-600 hover:bg-healthcare-50"
                >
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceConfirmation;
