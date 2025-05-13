
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  image?: string;
}

const TestimonialCard = ({ quote, name, role, image }: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex flex-col h-full">
        {/* Quote */}
        <div className="mb-6 flex-grow">
          <svg 
            className="h-8 w-8 text-healthcare-300 mb-2" 
            fill="currentColor" 
            viewBox="0 0 32 32"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-gray-700">{quote}</p>
        </div>
        
        {/* Person */}
        <div className="flex items-center mt-4">
          <div className="flex-shrink-0">
            <img 
              className="h-12 w-12 rounded-full object-cover" 
              src={image || "/placeholder.svg"} 
              alt={name} 
            />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-healthcare-900">{name}</h4>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
