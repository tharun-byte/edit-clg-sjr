
// Convert a file to base64 string
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Check if user is logged in
export const isUserLoggedIn = (): boolean => {
  return !!localStorage.getItem('userData');
};

// Check if user is admin
export const isAdmin = (): boolean => {
  return localStorage.getItem('isAdmin') === 'true';
};

// Get current user data
export const getCurrentUser = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Save user data to localStorage
export const saveUserData = (userData: any) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// Get all users from localStorage
export const getAllUsers = () => {
  const users = localStorage.getItem('allUsers');
  return users ? JSON.parse(users) : [];
};

// Save all users to localStorage
export const saveAllUsers = (users: any[]) => {
  localStorage.setItem('allUsers', JSON.stringify(users));
};

// Add a new user to the database
export const addUser = (userData: any) => {
  const users = getAllUsers();
  users.push(userData);
  saveAllUsers(users);
};

// Update a user in the database
export const updateUser = (userId: string, userData: any) => {
  const users = getAllUsers();
  const index = users.findIndex((user: any) => user.id === userId);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    saveAllUsers(users);
    
    // Update current user if this is them
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      saveUserData({ ...currentUser, ...userData });
    }
    
    return true;
  }
  
  return false;
};

// Get a user by ID
export const getUserById = (userId: string) => {
  const users = getAllUsers();
  return users.find((user: any) => user.id === userId);
};

// Get all appointments
export const getAllAppointments = () => {
  const appointments = localStorage.getItem('allAppointments');
  return appointments ? JSON.parse(appointments) : [];
};

// Save all appointments
export const saveAllAppointments = (appointments: any[]) => {
  localStorage.setItem('allAppointments', JSON.stringify(appointments));
};

// Add appointment
export const addAppointment = (appointmentData: any) => {
  const appointments = getAllAppointments();
  appointments.push(appointmentData);
  saveAllAppointments(appointments);
};

// Initialize the admin account if it doesn't exist
export const initializeAdmin = () => {
  const adminUsername = "admin";
  const adminPassword = "GlobalHealth2023!";
  
  // Check if admin exists
  const adminData = localStorage.getItem('adminCredentials');
  
  if (!adminData) {
    // Create admin
    localStorage.setItem('adminCredentials', JSON.stringify({
      username: adminUsername,
      password: adminPassword
    }));
    
    console.log("Admin account created with credentials:");
    console.log(`Username: ${adminUsername}`);
    console.log(`Password: ${adminPassword}`);
  }
};
