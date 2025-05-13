
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string;
  appointmentDate?: string;
}

interface AdminUserListProps {
  users: User[];
  onViewDetails: (userId: string) => void;
}

const AdminUserList = ({ users, onViewDetails }: AdminUserListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower) ||
      user.phone.toLowerCase().includes(searchTermLower) ||
      user.services.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
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
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, email, phone or service..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* User Table */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{user.email}</p>
                      <p className="text-gray-500">{user.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{user.services.replace('_', ' ')}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 border-healthcare-600 text-healthcare-600 hover:bg-healthcare-50"
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>User Details</DialogTitle>
                          <DialogDescription>
                            Full information for {user.name}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">User ID</p>
                              <p>{user.id}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Name</p>
                              <p>{user.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p>{user.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <p>{user.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Service</p>
                              <p>{user.services.replace('_', ' ')}</p>
                            </div>
                            {user.appointmentDate && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">Appointment Date</p>
                                <p>{user.appointmentDate}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button 
                            onClick={() => onViewDetails(user.id)}
                            className="bg-healthcare-600 hover:bg-healthcare-700"
                          >
                            View Full Profile
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No users found. Try a different search term.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUserList;
