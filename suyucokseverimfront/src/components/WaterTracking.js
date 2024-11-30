import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

const WaterTracking = ({ userId }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddWater = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Geçerli bir miktar giriniz (ml cinsinden)');
      return;
    }

    try {
      if (!userId) {
        throw new Error('UserId is required');
      }
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/waterconsumption/add`, {
        userId,
        amount: parseFloat(amount),
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setSuccess('Su tüketimi başarıyla eklendi 🥛');
        setAmount('');
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('Su tüketimi eklenemedi, lütfen tekrar deneyiniz');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Su Tüketimi Takibi 🥛
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            label="Tüketilen Su Miktarı (ml)"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" onClick={handleAddWater}>
            Su Ekle
          </Button>
        </Grid>
      </Grid>
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
    </Box>
  );
};

export default WaterTracking;
