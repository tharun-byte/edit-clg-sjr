
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  serviceId: string;
}

const ServiceCard = ({ title, description, icon, serviceId }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="w-14 h-14 rounded-full bg-healthcare-100 flex items-center justify-center mb-4 text-healthcare-600">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-healthcare-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link to={`/service-booking/${serviceId}`}>
          <Button className="w-full bg-healthcare-600 hover:bg-healthcare-700 transition-colors">
            Book Appointment
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
