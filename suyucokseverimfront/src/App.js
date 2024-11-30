import React, { useState } from 'react';
import Auth from './components/Auth';
import WaterTracking from './components/WaterTracking';
import Statistics from './components/Statistics';
import { Container, Box, Typography } from '@mui/material';

function App() {
  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    setUserId(id);
  };

  return (
    <Container>
      {!userId ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <>
          <WaterTracking userId={userId} />
          <Statistics userId={userId} />
        </>
      )}
      <Box position="fixed" bottom={10} right={10}>
        <Typography variant="body2" className="created-by">
          Created By EspeeeBne
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
