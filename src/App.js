import React, { useState, useEffect } from 'react';
import { useAuth, useAuthActions, AdminPortal, useLoginWithRedirect } from '@frontegg/react'; 
import './index.css';

function App() {
  const { user, isAuthenticated } = useAuth();
  const { switchTenant } = useAuthActions();
  const loginWithRedirect = useLoginWithRedirect();
  const [selectedTenant, setSelectedTenant] = useState(user?.tenantIds?.[0] || '');

  // Fetch user data to populate tenant list on initial load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://app-jbvx0euswa57.frontegg.com/identity/resources/users/me', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setSelectedTenant(userData.tenantIds?.[0] || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
    
  }, [isAuthenticated]);

  const handleTenantChange = (event) => {
    const newTenantId = event.target.value;
    setSelectedTenant(newTenantId);
    switchTenant({ tenantId: newTenantId });
  };

  const handleClick = () => AdminPortal.show();

  const handleLogout = () => {
    fetch('https://app-jbvx0euswa57.frontegg.com/identity/resources/auth/v1/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(() => {
        loginWithRedirect();
      })
      .catch((err) => {
        console.error('Logout error:', err);
      });
  };

  return (
    <div className='App'>
      <h1>Frontegg Home Assignment</h1>
      {isAuthenticated && (
        <div className='container'>
          <img src={user?.profilePictureUrl} alt={user?.name} /><br />
          <span>{user?.name}</span><br />
          <select value={selectedTenant} onChange={handleTenantChange}>
            {user?.tenantIds?.map((tenantId) => (
              <option key={tenantId} value={tenantId}>
                {tenantId}
              </option>
            ))}
          </select><br />
          <button onClick={handleClick}>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
