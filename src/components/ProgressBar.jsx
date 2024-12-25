import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';

const ProgressBar = ({ score }) => {
  // Define color based on the score
  const getColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green for high score
    if (score >= 50) return '#FFEB3B'; // Yellow for medium score
    return '#F44336'; // Red for low score
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center', padding: 2 }}>
      <LinearProgress
        variant="determinate"
        value={score}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: getColor(score),
          },
        }}
      />
      <Typography variant="h5" color={getColor(score)} mt={1}>
        {score.toFixed(1)} Ümumi bal {/* Display score with one decimal place */}
      </Typography>
    </Box>
  );
};

export default ProgressBar;
