import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: '0 auto',
  textAlign: 'center',
  boxShadow: theme.shadows[3],
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightBold,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
}));

const Auth = ({ onLogin }) => {
  const [tabValue, setTabValue] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        const userId = response.data.userId;
        onLogin(userId);
      }
    } catch (err) {
      setError('Geçersiz kullanıcı adı veya şifre');
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Şifreler uyuşmuyor');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        username,
        password,
        userId: username, // Kullanıcı ID'si kullanıcı adı ile aynı olacak şekilde ayarlandı
      });
      if (response.status === 200) {
        setSuccess('Kullanıcı başarıyla kaydedildi');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('');
      }
    } catch (err) {
      setError('Kayıt başarısız. Kullanıcı adı zaten alınmış olabilir.');
    }
  };

  return (
    <StyledContainer>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <StyledTab label="Giriş Yap" />
        <StyledTab label="Kayıt Ol" />
      </Tabs>
      {tabValue === 0 && (
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Giriş Yap
          </Typography>
          <TextField
            label="Kullanıcı Adı"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Şifre"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <StyledButton variant="contained" color="primary" onClick={handleLogin} fullWidth>
            Giriş Yap
          </StyledButton>
        </Box>
      )}
      {tabValue === 1 && (
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Kayıt Ol
          </Typography>
          <TextField
            label="Kullanıcı Adı"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Şifre"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Şifreyi Onayla"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" variant="body2" gutterBottom>
              {success}
            </Typography>
          )}
          <StyledButton variant="contained" color="primary" onClick={handleRegister} fullWidth>
            Kayıt Ol
          </StyledButton>
        </Box>
      )}
    </StyledContainer>
  );
};

export default Auth;
