
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface VirtualIDCardProps {
  userData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    photoUrl: string;
    services: string;
  };
}

const VirtualIDCard = ({ userData }: VirtualIDCardProps) => {
  const [issuedDate, setIssuedDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    // Set issued date as today
    const today = new Date();
    setIssuedDate(today.toLocaleDateString('en-IN'));
    
    // Set expiry date as one year from today
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    setExpiryDate(nextYear.toLocaleDateString('en-IN'));
  }, []);

  return (
    <Card className="id-card w-full max-w-md overflow-hidden bg-gradient-to-r from-healthcare-700 to-healthcare-900 text-white shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-white/20">
        <div className="flex items-center">
          <span className="text-xl font-bold">Global Health</span>
          <span className="text-xl font-bold ml-1">India</span>
        </div>
        <div className="text-sm font-medium">Patient ID Card</div>
      </div>
      
      {/* Content */}
      <div className="flex p-4">
        {/* Photo */}
        <div className="w-1/3">
          <div className="bg-white rounded-md p-1 shadow-lg">
            <img 
              src={userData.photoUrl || '/placeholder.svg'} 
              alt="User" 
              className="w-full aspect-square object-cover rounded"
            />
          </div>
        </div>
        
        {/* Details */}
        <div className="w-2/3 pl-4">
          <h3 className="font-bold text-lg mb-2">{userData.name}</h3>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span className="opacity-80">ID:</span> 
              <span className="font-medium">{userData.id}</span>
            </p>
            <p className="flex justify-between">
              <span className="opacity-80">Phone:</span> 
              <span className="font-medium">{userData.phone}</span>
            </p>
            <p className="flex justify-between">
              <span className="opacity-80">Email:</span>
              <span className="font-medium text-xs">{userData.email}</span>
            </p>
            <p className="flex justify-between">
              <span className="opacity-80">Service:</span>
              <span className="font-medium">{userData.services.replace('_', ' ')}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Address */}
      <div className="px-4 pb-2">
        <div className="text-xs">
          <p className="opacity-80 mb-1">Address:</p>
          <p className="font-medium">{userData.address}</p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-black/20 p-3 text-xs flex justify-between">
        <div>
          <p>Issued: {issuedDate}</p>
        </div>
        <div>
          <p>Valid until: {expiryDate}</p>
        </div>
      </div>
    </Card>
  );
};

export default VirtualIDCard;
