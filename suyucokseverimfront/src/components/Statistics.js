import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import { format } from 'date-fns';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { styled } from '@mui/system';

const AnimatedCard = styled(Card)({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
  },
});

const Statistics = ({ userId }) => {
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chartType, setChartType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          throw new Error('UserId is required');
        }
        const [dailyResponse, weeklyResponse, monthlyResponse, yearlyResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/waterconsumption/daily/${userId}`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/waterconsumption/weekly/${userId}`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/waterconsumption/monthly/${userId}`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/waterconsumption/yearly/${userId}`),
        ]);
        setDailyData(dailyResponse.data);
        setWeeklyData(weeklyResponse.data);
        setMonthlyData(monthlyResponse.data);
        setYearlyData(yearlyResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('İstatistikler alınamadı');
        setLoading(false);
      }
    };
    fetchData();


    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography color="error" variant="body2" gutterBottom>
        {error}
      </Typography>
    );
  }

  const handleChartChange = (type) => {
    setChartType(type);
  };

  const chartData = chartType ? {
    labels: chartType === 'daily' ? dailyData.map(entry => format(new Date(entry.date), 'HH:mm')) :
            chartType === 'weekly' ? weeklyData.map(entry => format(new Date(entry.date), 'EEEE')) :
            chartType === 'monthly' ? monthlyData.map(entry => format(new Date(entry.date), 'dd MMM')) :
            yearlyData.map(entry => format(new Date(entry.date), 'MMMM')),
    datasets: [
      {
        label: 'İçtiğin Su (ml)',
        data: chartType === 'daily' ? dailyData.map(entry => entry.amount) :
              chartType === 'weekly' ? weeklyData.map(entry => entry.amount) :
              chartType === 'monthly' ? monthlyData.map(entry => entry.amount) :
              yearlyData.map(entry => entry.amount),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  } : null;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Su İçme İstatistikleri 💧 (üstlerine basarsan grafik geliyor)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} onClick={() => handleChartChange('daily')} style={{ cursor: 'pointer' }}>
          <AnimatedCard>
            <CardContent>
              <Typography variant="h6">Günlük İçtiğin Su 💧</Typography>
              <Typography variant="body1">{dailyData.reduce((sum, entry) => sum + entry.amount, 0)} ml</Typography>
            </CardContent>
          </AnimatedCard>
        </Grid>
        <Grid item xs={12} md={3} onClick={() => handleChartChange('weekly')} style={{ cursor: 'pointer' }}>
          <AnimatedCard>
            <CardContent>
              <Typography variant="h6">Haftalık İçtiğin Su 💧</Typography>
              <Typography variant="body1">{weeklyData.reduce((sum, entry) => sum + entry.amount, 0)} ml</Typography>
            </CardContent>
          </AnimatedCard>
        </Grid>
        <Grid item xs={12} md={3} onClick={() => handleChartChange('monthly')} style={{ cursor: 'pointer' }}>
          <AnimatedCard>
            <CardContent>
              <Typography variant="h6">Aylık İçtiğin Su 💧</Typography>
              <Typography variant="body1">{monthlyData.reduce((sum, entry) => sum + entry.amount, 0)} ml</Typography>
            </CardContent>
          </AnimatedCard>
        </Grid>
        <Grid item xs={12} md={3} onClick={() => handleChartChange('yearly')} style={{ cursor: 'pointer' }}>
          <AnimatedCard>
            <CardContent>
              <Typography variant="h6">Yıllık İçtiğin Su 💧</Typography>
              <Typography variant="body1">{yearlyData.reduce((sum, entry) => sum + entry.amount, 0)} ml</Typography>
            </CardContent>
          </AnimatedCard>
        </Grid>
      </Grid>
      {chartType && (
        <Box mt={5}>
          <Line data={chartData} />
        </Box>
      )}
    </Box>
  );
};

export default Statistics;
