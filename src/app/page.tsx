'use client';

import { Box, Button, Typography, Container, Grid, List, ListItem, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import Spinner from './components/Spinner'; // Import the Spinner component

export default function Home() {
  const initialTricks = [
    "Power Shot", "Finesse Shot", "Volley", "Half Volley",
    "Header", "Chip Shot", "Toe Poke", "Knuckleball",
    "Driven Shot", "Curved Shot", "Penalty Kick", "Free Kick"
  ];

  const [availableTricks, setAvailableTricks] = useState(initialTricks);
  const [completedTricks, setCompletedTricks] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [finalRotation, setFinalRotation] = useState(0);
  const spinDuration = 3; // seconds

  const soccerFacts = [
    "The fastest goal ever scored was in 2.8 seconds.",
    "Football is the most popular sport in the world, with over 3.5 billion fans.",
    "The first World Cup was held in 1930 in Uruguay.",
    "Brazil is the only country to have played in every World Cup.",
    "The highest-scoring game ended 149-0, due to a protest.",
    "A professional football player runs about 9.5 miles in a single game.",
    "The maximum number of goals scored by one player in a single match is 16.",
    "The first football game was played in 1869 between Rutgers and Princeton.",
    "The World Cup is held every four years.",
    "The oldest football club in the world is Sheffield F.C., founded in 1857."
  ];

  const [dailyFact, setDailyFact] = useState('');

  useEffect(() => {
    setDailyFact(soccerFacts[Math.floor(Math.random() * soccerFacts.length)]);
  }, []);

  const handleSpin = () => {
    if (availableTricks.length === 0) {
      setResult("All shots completed! Reset to play again.");
      return;
    }

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * availableTricks.length);
    const selectedTrick = availableTricks[randomIndex];

    const numSegments = availableTricks.length;
    const segmentAngle = 360 / numSegments;
    const targetAngle = randomIndex * segmentAngle + (segmentAngle / 2);
    const randomSpins = Math.floor(Math.random() * 5) + 5;
    const totalRotation = (randomSpins * 360) + (360 - targetAngle);

    setFinalRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(selectedTrick);

      setAvailableTricks(prev => prev.filter(trick => trick !== selectedTrick));
      setCompletedTricks(prev => [...prev, selectedTrick]);

      setFinalRotation(0);
    }, spinDuration * 1000);
  };

  const handleReset = () => {
    setAvailableTricks(initialTricks);
    setCompletedTricks([]);
    setResult('');
    setFinalRotation(0);
    setSpinning(false);
    setDailyFact(soccerFacts[Math.floor(Math.random() * soccerFacts.length)]); // New fact on reset
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Soccer Shot Spinner
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
        {/* Completed Tricks Column */}
        <Grid xs={12} md={3}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', p: 2, minHeight: 300, textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom>
              Completed Shots
            </Typography>
            {completedTricks.length === 0 ? (
              <Typography variant="body1" color="text.secondary">No shots completed yet.</Typography>
            ) : (
              <List dense>
                {completedTricks.map((trick, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={trick} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Grid>

        {/* Spinner and Controls Column */}
        <Grid xs={12} md={6} sx={{ position: 'relative' }}> {/* Added relative positioning for arrow */}
          <Spinner tricks={availableTricks} spinning={spinning} result={result} spinDuration={spinDuration} finalRotation={finalRotation} />

          {/* Static Arrow Indicator */}
          <Box
            sx={{
              position: 'absolute',
              top: 0, // Position at the top of the spinner's container
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '30px solid transparent',
              borderRight: '30px solid transparent',
              borderBottom: '30px solid #FFD700', // Gold color for the arrow
              zIndex: 10, // Ensure it's on top
            }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSpin}
            disabled={spinning || availableTricks.length === 0}
            sx={{ mt: 2, mr: 2 }}
          >
            {spinning ? 'Spinning...' : 'Start Game'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={handleReset}
            disabled={spinning}
            sx={{ mt: 2 }}
          >
            Reset
          </Button>

          {result && (
            <Typography variant="h5" sx={{ mt: 4 }}>
              Your shot: {result}
            </Typography>
          )}
        </Grid>

        {/* Available Tricks Column */}
        <Grid xs={12} md={3}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', p: 2, minHeight: 300, textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom>
              Available Shots
            </Typography>
            {availableTricks.length === 0 ? (
              <Typography variant="body1" color="text.secondary">All shots completed!</Typography>
            ) : (
              <List dense>
                {availableTricks.map((trick, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={trick} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Scoreboard */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">
          Shots Completed: {completedTricks.length} / {initialTricks.length}
        </Typography>
      </Box>

      {/* Daily Soccer Fact Container */}
      <Box
        sx={{
          position: 'fixed', // Fixed position for bottom-left
          bottom: 16,
          left: 16,
          width: 250,
          border: '1px solid #ccc',
          borderRadius: '8px',
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          textAlign: 'left',
          zIndex: 100, // Ensure it's on top
        }}
      >
        <Typography variant="h6" gutterBottom>
          Soccer Fact of the Day
        </Typography>
        <Typography variant="body2">
          {dailyFact}
        </Typography>
      </Box>
    </Container>
  );
}