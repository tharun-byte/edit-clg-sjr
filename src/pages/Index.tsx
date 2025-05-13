
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";

const Index = () => {
  const services = [
    {
      id: "cardiology",
      title: "Cardiology",
      description: "Advanced cardiac care including diagnostics, treatment plans, and continuous heart health monitoring.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
        </svg>
      ),
    },
    {
      id: "diabetes",
      title: "Diabetes",
      description: "Comprehensive care including sugar level monitoring, diet planning, and expert endocrinologist support.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20h-2a2 2 0 0 1-2-2v-2h0a2 2 0 0 1 2-2h3.4a2 2 0 0 0 1.9-1.3l.5-1.2a2 2 0 0 0-1.3-2.6l-9.9-2.2a2 2 0 0 1-1.4-1.2l-.3-.7a2 2 0 0 1 1.1-2.6l.7-.2a2 2 0 0 1 2.6 1.1l.1.3"/>
          <path d="M14 8V5c0-1.1.9-2 2-2h0a2 2 0 0 1 2 2v3"/>
        </svg>
      ),
    },
    {
      id: "oncology",
      title: "Oncology",
      description: "Specialized cancer care from diagnosis to treatment and recovery with experienced oncologists and support staff.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 12a4 4 0 0 1-8 0"/>
          <path d="M8 12V6a2 2 0 1 1 4 0v2"/>
          <line x1="2" y1="2" x2="22" y2="22"/>
        </svg>
      ),
    }
  ];
  
  const testimonials = [
    {
      quote: "After suffering a heart attack, I turned to Global Health for cardiac care. Their cardiology team provided excellent treatment and guidance throughout my recovery. Today, I feel healthier and stronger than ever.",
      name: "Rakesh Menon",
      role: "Cardiology Patient"
    },
    {
      quote: "I came to Global Health for rehabilitation after an accident left me immobile. The physiotherapists were incredibly patient and skilled. Within months, I was walking again. Their rehab center gave me my life back.",
      name: "Anjali Verma",
      role: "Rehabilitation Patient"
    },
    {
      quote: "I scheduled a general consultation at Global Health and was amazed at the thoroughness of the evaluation. The doctor answered all my questions patiently and helped me get on a better health plan. Highly recommended.",
      name: "Rahul Desai",
      role: "General Consultation"
    },
    {
      quote: "I was diagnosed with breast cancer, and the care I received at Global Health was nothing short of life-changing. The doctors were compassionate and the treatment plan gave me hope. I'm now in remission and forever grateful.",
      name: "Priya Sharma",
      role: "Breast Cancer Survivor"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-healthcare-800 to-healthcare-700 text-white">
          <div className="container-custom py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Professionals dedicated to your health
              </h1>
              <p className="text-lg text-healthcare-100 mb-8">
                Our team of skilled professionals is committed to providing personalized, compassionate care. With a focus on patient-centered approaches, we help you achieve optimal health and wellness.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-healthcare-700 hover:bg-healthcare-100">
                    Register Now
                  </Button>
                </Link>
                <Link to="/appointment">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="relative">
                <div className="bg-healthcare-600 rounded-lg w-full aspect-video shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f" 
                    alt="Doctor Team" 
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-sm">
                    <h3 className="text-healthcare-800 font-bold text-xl mb-2">Free Expert Consultations</h3>
                    <p className="text-gray-700 mb-4">Get professional advice from our healthcare experts at no cost.</p>
                    <Link to="/consultation-booking">
                      <Button className="w-full bg-healthcare-600 hover:bg-healthcare-700">
                        Get Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Why patients trust us with their care</h2>
              <p className="section-subtitle">We combine expertise with compassion to deliver healthcare that matters.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-healthcare-100 text-healthcare-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Patient-centered care</h3>
                <p className="text-gray-600">Putting you at the heart of everything we do. Our patient-centered approach ensures personalized care that addresses your unique health needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-healthcare-100 text-healthcare-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Specialist doctors</h3>
                <p className="text-gray-600">Expert physicians across numerous specialties provide cutting-edge treatment based on the latest medical research and technologies.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-healthcare-100 text-healthcare-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24 hours service</h3>
                <p className="text-gray-600">Healthcare that never sleeps. Our round-the-clock services ensure you receive the care you need, whenever you need it.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118" 
                  alt="About Global Health" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <div className="text-healthcare-600 font-semibold mb-2">about global health</div>
                <h2 className="text-3xl md:text-4xl font-bold text-healthcare-900 mb-4">Advancing health for all worldwide</h2>
                <p className="text-gray-700 mb-6">
                  We are committed to improving health outcomes across the globe by promoting equity, innovation, and collaboration in global healthcare systems.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-healthcare-100 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-healthcare-600">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-healthcare-900">Equitable healthcare access worldwide</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-healthcare-100 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-healthcare-600">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-healthcare-900">Global partnerships for better outcomes</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-healthcare-100 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-healthcare-600">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-healthcare-900">Innovation-driven healthcare improvements</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">We offer a wide range of healthcare services</h2>
              <p className="section-subtitle">Comprehensive care tailored to meet your individual health needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  serviceId={service.id}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/services">
                <Button variant="outline" size="lg" className="border-healthcare-600 text-healthcare-600 hover:bg-healthcare-50">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Steps Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Simple steps to better global health</h2>
              <p className="section-subtitle">Our streamlined process makes healthcare accessible and stress-free</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-healthcare-600 text-white font-bold flex items-center justify-center">
                  01
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 h-full border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-healthcare-900 mt-2">Create Account</h3>
                  <p className="text-gray-600">Sign up and get your virtual ID card instantly.</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-healthcare-600 text-white font-bold flex items-center justify-center">
                  02
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 h-full border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-healthcare-900 mt-2">Consult with Doctor</h3>
                  <p className="text-gray-600">Talk to our medical professionals about your condition.</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-healthcare-600 text-white font-bold flex items-center justify-center">
                  03
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 h-full border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-healthcare-900 mt-2">Schedule Appointment</h3>
                  <p className="text-gray-600">Choose a convenient time for your in-person or virtual visit.</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-healthcare-600 text-white font-bold flex items-center justify-center">
                  04
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 h-full border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-healthcare-900 mt-2">Start Healthy Life</h3>
                  <p className="text-gray-600">Begin your journey toward a healthier, happier you.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-healthcare-600 text-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Take the first step to better health</h2>
                <p className="text-healthcare-100">Join us in building healthier communities around the world.</p>
              </div>
              <div className="mt-6 md:mt-0">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-healthcare-600 hover:bg-healthcare-100 transition-colors">
                    Get Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Stories of healing and hope at Global Health</h2>
              <p className="section-subtitle">Real experiences from people whose lives we've touched</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  quote={testimonial.quote}
                  name={testimonial.name}
                  role={testimonial.role}
                  image={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
