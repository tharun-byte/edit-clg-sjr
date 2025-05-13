
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface UserProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    photoUrl: string;
    services: string;
  };
  onEdit?: () => void;
  isAdmin?: boolean;
}

const UserProfileCard = ({ user, onEdit, isAdmin = false }: UserProfileCardProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* User Photo */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img 
              src={user.photoUrl || "/placeholder.svg"} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* User Details */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-healthcare-900">{user.name}</h3>
                <p className="text-gray-500 text-sm">ID: {user.id}</p>
              </div>
              
              {onEdit && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onEdit}
                  className="border-healthcare-600 text-healthcare-600 hover:bg-healthcare-50"
                >
                  Edit Profile
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-healthcare-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-healthcare-900">{user.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-healthcare-900">{user.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Service</p>
                <p className="text-healthcare-900">{user.services.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
