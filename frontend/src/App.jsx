import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box, TextField, Button, Grid, Card, CardContent, Chip, CircularProgress, Snackbar, Alert, Drawer, AppBar, Toolbar, Paper, Fade, Slide, Grow, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Rating, Autocomplete, CardMedia, CardActionArea } from '@mui/material';
import axios from 'axios';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import ChatIcon from '@mui/icons-material/Chat';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HandymanIcon from '@mui/icons-material/Handyman';
import ShareIcon from '@mui/icons-material/Share';
import HotelIcon from '@mui/icons-material/Hotel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1' }, 
    secondary: { main: '#f43f5e' }, 
    background: { default: '#0f172a', paper: 'rgba(30, 41, 59, 0.7)' },
    text: { primary: '#f8fafc', secondary: '#94a3b8' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h2: { fontWeight: 800, letterSpacing: '-1px' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(16px)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 28px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { 
            boxShadow: '0 8px 25px -6px rgba(99, 102, 241, 0.6)',
            transform: 'translateY(-2px)'
          }
        }
      }
    }
  }
});

function NavHeader({ userEmail, navigate }) {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <Toolbar sx={{ py: 1, px: { xs: 2, md: 8 } }}>
        <FlightTakeoffIcon color="primary" sx={{ mr: 2, fontSize: 32, cursor: 'pointer', transition: 'transform 0.3s', '&:hover':{ transform: 'scale(1.1) rotate(-10deg)' } }} onClick={() => navigate('/')} />
        <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1, color: '#f8fafc', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          Voyazo
        </Typography>
        <Button color="inherit" onClick={() => navigate('/pricing')} sx={{ mr: 2 }}>Pricing</Button>
        {userEmail ? (
          <Button variant="contained" color="primary" onClick={() => navigate('/plan')}>Dashboard</Button>
        ) : (
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} onClick={() => navigate('/auth')}>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

function Footer({ navigate }) {
  return (
    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', py: 6, mt: 8, bgcolor: 'rgba(15,23,42,0.9)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Voyazo</Typography>
            <Typography variant="body2" color="text.secondary">The world's first agentic travel engine.</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Product</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, cursor: 'pointer', '&:hover':{color:'primary.main'} }} onClick={() => navigate('/pricing')}>Pricing</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, cursor: 'pointer', '&:hover':{color:'primary.main'} }} onClick={() => navigate('/coming-soon')}>Features</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Company</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, cursor: 'pointer', '&:hover':{color:'primary.main'} }} onClick={() => navigate('/coming-soon')}>About Us</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, cursor: 'pointer', '&:hover':{color:'primary.main'} }} onClick={() => navigate('/coming-soon')}>Contact</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function ComingSoon() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <NavHeader navigate={navigate} />
      <Container sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grow in timeout={800}>
          <Box sx={{ textAlign: 'center', maxWidth: 600 }}>
            <HandymanIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
            <Typography variant="h2" gutterBottom>Building Magic</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Our team of AI engineers (and one highly-caffeinated LLM) is currently building this feature. Check back soon!
            </Typography>
            <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
          </Box>
        </Grow>
      </Container>
    </Box>
  );
}

function PricingPage({ userEmail }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <NavHeader userEmail={userEmail} navigate={navigate} />
      <Container sx={{ py: 10 }}>
        <Fade in timeout={800}>
          <Box>
            <Typography variant="h2" align="center" gutterBottom>Simple, transparent pricing</Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>Start for free, upgrade when you need more power.</Typography>
          </Box>
        </Fade>
        
        <Grid container spacing={4} justifyContent="center">
          <Grow in timeout={800}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { transform: 'translateY(-10px)', borderColor: 'rgba(255,255,255,0.2)' } }}>
                <Typography variant="h5" color="text.secondary">Basic</Typography>
                <Typography variant="h3" sx={{ my: 2 }}>$0 <Typography component="span" variant="h6" color="text.secondary">/mo</Typography></Typography>
                <Box sx={{ mt: 4, mb: 6, flexGrow: 1 }}>
                  {['3 Agentic Trips per month', 'Standard AI Replanning', 'Local Hidden Gems', 'Email Support'].map((feat, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                      <Typography>{feat}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button fullWidth variant="outlined" size="large" onClick={() => navigate('/auth')}>Get Started Free</Button>
              </Card>
            </Grid>
          </Grow>
          
          <Grow in timeout={1200}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 4, height: '100%', borderColor: 'primary.main', borderWidth: 2, position: 'relative', display: 'flex', flexDirection: 'column', '&:hover': { transform: 'translateY(-10px)' } }}>
                <Chip label="Most Popular" color="primary" sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 'bold' }} />
                <Typography variant="h5" color="primary">Pro Agent</Typography>
                <Typography variant="h3" sx={{ my: 2 }}>$9 <Typography component="span" variant="h6" color="text.secondary">/mo</Typography></Typography>
                <Box sx={{ mt: 4, mb: 6, flexGrow: 1 }}>
                  {['Unlimited Agentic Trips', 'Real-Time Weather Injection', 'Priority Chat Replanning', 'Export to PDF & WhatsApp', 'Remove Voyazo Branding', '24/7 Priority Support'].map((feat, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                      <Typography>{feat}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button fullWidth variant="contained" color="primary" size="large" onClick={() => navigate('/coming-soon')}>Upgrade to Pro</Button>
              </Card>
            </Grid>
          </Grow>

          <Grow in timeout={1600}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { transform: 'translateY(-10px)', borderColor: 'rgba(255,255,255,0.2)' } }}>
                <Typography variant="h5" color="text.secondary">Enterprise</Typography>
                <Typography variant="h3" sx={{ my: 2 }}>Custom</Typography>
                <Box sx={{ mt: 4, mb: 6, flexGrow: 1 }}>
                  {['Custom API Integrations', 'White-label Platform', 'Bespoke AI Models', 'Custom Booking Affiliate Links', 'Dedicated Account Manager'].map((feat, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CheckCircleIcon color="secondary" sx={{ mr: 2 }} />
                      <Typography>{feat}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button fullWidth variant="outlined" color="secondary" size="large" onClick={() => navigate('/coming-soon')}>Contact Us</Button>
              </Card>
            </Grid>
          </Grow>
        </Grid>
      </Container>
      <Footer navigate={navigate} />
    </Box>
  );
}

function LandingPage({ userEmail }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Box sx={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(3px)', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
          <NavHeader userEmail={userEmail} navigate={navigate} />
          <Container sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 10 }}>
            <Grow in timeout={1200}>
              <Box sx={{ textAlign: 'center', color: 'white', maxWidth: 800 }}>
                <Chip label="Powered by AI Agent Engine" color="primary" sx={{ mb: 3, fontWeight: 'bold', px: 1 }} />
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, textShadow: '0 4px 20px rgba(0,0,0,0.7)' }}>
                  Your personal travel <Box component="span" sx={{ color: 'primary.main' }}>concierge</Box>
                </Typography>
                <Typography variant="h5" sx={{ mb: 6, fontWeight: 400, opacity: 0.9, textShadow: '0 2px 10px rgba(0,0,0,0.7)', lineHeight: 1.6 }}>
                  Design hyper-personalized itineraries that adapt in real-time to weather, mood, and budget. Never stress over a changed plan again.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate(userEmail ? '/plan' : '/auth')}
                  sx={{ px: 6, py: 2, fontSize: '1.2rem', borderRadius: 50, boxShadow: '0 10px 30px -10px rgba(99, 102, 241, 0.8)' }}
                >
                  Start Planning Now
                </Button>
              </Box>
            </Grow>
          </Container>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Slide direction="up" in timeout={800}>
            <Box>
              <Typography variant="h3" align="center" gutterBottom>Not your average planner</Typography>
              <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>Voyazo acts like a real agent, continuously adapting your trip.</Typography>
            </Box>
          </Slide>
          
          <Grid container spacing={4}>
            {[
              { title: "Agentic Replanning", desc: "Just chat with the AI to change your mind mid-trip. The agent automatically reschedules everything else to fit.", icon: <ChatIcon fontSize="large" color="primary" /> },
              { title: "Real-Time Weather", desc: "If it suddenly rains, Voyazo automatically cancels your outdoor hike and books an indoor museum instead.", icon: <ThunderstormIcon fontSize="large" color="primary" /> },
              { title: "Hyper-Local Gems", desc: "Skip the tourist traps. We tap into deep data to find the spots only locals know about.", icon: <AutoAwesomeIcon fontSize="large" color="primary" /> }
            ].map((feature, i) => (
              <Grow in timeout={1000 + (i * 400)} key={i}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 4, height: '100%', bgcolor: 'rgba(30,41,59,0.3)', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)', borderColor: 'primary.main' } }}>
                    {feature.icon}
                    <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>{feature.title}</Typography>
                    <Typography color="text.secondary">{feature.desc}</Typography>
                  </Paper>
                </Grid>
              </Grow>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer navigate={navigate} />
    </Box>
  );
}

function AuthPage({ setUserEmail, setUserName }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'info' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    if (isSignUp) {
      // Sign Up Logic
      const { data: existingUser } = await supabase.from('users').select('email').eq('email', email).maybeSingle();
      if (existingUser) {
        setAlertInfo({ open: true, message: 'Failed: Email already exists!', severity: 'error' });
        setLoading(false);
        return;
      }
      
      const { error } = await supabase.from('users').insert([{ name, email }]);
      setLoading(false);
      
      if (error) {
        setAlertInfo({ open: true, message: 'Failed: Account not created.', severity: 'error' });
      } else {
        setAlertInfo({ open: true, message: 'Account created successfully! Please Sign In.', severity: 'success' });
        setIsSignUp(false); // Switch to Sign In view
        setName('');
      }
    } else {
      // Sign In Logic
      const { data: user, error } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
      setLoading(false);
      
      if (error || !user) {
        setAlertInfo({ open: true, message: 'Sign In Failed: Account not found.', severity: 'error' });
      } else {
        setUserName(user.name || email.split('@')[0]);
        setUserEmail(email);
        navigate('/plan');
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', backgroundColor: '#0f172a' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Grow in timeout={800}>
          <Card sx={{ maxWidth: 450, width: '100%', p: { xs: 3, sm: 5 }, background: 'rgba(30, 41, 59, 1)' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <FlightTakeoffIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">Voyazo</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>{isSignUp ? 'Create your account' : 'Welcome back'}</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              {isSignUp && <TextField fullWidth label="Full Name" variant="outlined" margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />}
              <TextField fullWidth label="Email Address" type="email" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button fullWidth type="submit" variant="contained" size="large" sx={{ mt: 4, mb: 2 }} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : (isSignUp ? 'Create Account' : 'Sign In')}
              </Button>
            </form>
            <Divider sx={{ my: 3 }}><Typography variant="body2" color="text.secondary">OR</Typography></Divider>
            <Button fullWidth variant="outlined" onClick={() => setIsSignUp(!isSignUp)} sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.secondary' }}>
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Button>
          </Card>
        </Grow>
      </Box>
      <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={() => setAlertInfo({...alertInfo, open: false})} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={alertInfo.severity} variant="filled" sx={{ width: '100%', borderRadius: 3 }}>{alertInfo.message}</Alert>
      </Snackbar>
    </Box>
  );
}

function Planner({ userEmail, setUserEmail, userName }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [destinationInputValue, setDestinationInputValue] = useState('');
  const [destinationOptions, setDestinationOptions] = useState([]);
  
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('Moderate');
  const [vibe, setVibe] = useState('Cultural & Relaxing');
  
  const [loading, setLoading] = useState(false);
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);
  
  const [itinerary, setItinerary] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'info' });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Feedback State
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  const loadingPhrases = [
    "Analyzing real-time weather...", 
    "Finding hidden local gems...", 
    "Optimizing routes for your budget...", 
    "Negotiating with locals...", 
    "Finalizing your perfect journey..."
  ];

  // Auto-suggest API (Open-Meteo)
  useEffect(() => {
    const fetchPlaces = async () => {
      if (destinationInputValue.length < 3) {
        setDestinationOptions([]);
        return;
      }
      try {
        const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${destinationInputValue}&count=5`);
        if (res.data && res.data.results) {
          const places = res.data.results.map(r => `${r.name}, ${r.admin1 ? r.admin1 + ', ' : ''}${r.country}`);
          setDestinationOptions([...new Set(places)]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const timeoutId = setTimeout(fetchPlaces, 400);
    return () => clearTimeout(timeoutId);
  }, [destinationInputValue]);

  // Loading text cycler
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 2500);
    } else {
      setLoadingPhraseIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!userEmail) navigate('/');
  }, [userEmail, navigate]);

  if (!userEmail) return null; 

  const handleLogout = () => {
    setUserEmail('');
    navigate('/');
  };

  const executeGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/generate-trip', {
        destination, days, budget, vibe, userEmail
      });
      setItinerary(res.data.itinerary || res.data);
      setAlertInfo({ open: true, message: 'Trip generated successfully!', severity: 'success' });
    } catch (error) {
      setAlertInfo({ open: true, message: 'Failed to generate trip.', severity: 'error' });
    }
    setLoading(false);
  };

  const handleSimulateRain = async () => {
    if (!itinerary) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/simulate-rain', {
        destination, currentItinerary: itinerary
      });
      if (res.data.replanned) {
        setItinerary(res.data.itinerary.itinerary || res.data.itinerary);
        setAlertInfo({ open: true, message: res.data.alertMessage, severity: 'warning' });
      }
    } catch (error) {
      setAlertInfo({ open: true, message: 'Failed to simulate rain', severity: 'error' });
    }
    setLoading(false);
  };

  const handleChatReplan = async () => {
    if (!chatMessage || !itinerary) return;
    setChatLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/chat-replan', {
        currentItinerary: itinerary, userMessage: chatMessage
      });
      setItinerary(res.data.itinerary || res.data);
      setChatMessage('');
      setAlertInfo({ open: true, message: 'Trip updated via chat!', severity: 'success' });
    } catch (error) {
      setAlertInfo({ open: true, message: 'Failed to replan', severity: 'error' });
    }
    setChatLoading(false);
  };

  const submitFeedback = () => {
    setFeedbackOpen(false);
    setAlertInfo({ open: true, message: 'Thank you for your feedback! It has been recorded.', severity: 'success' });
    setFeedbackText('');
  };

  const handleShare = () => {
    if (!itinerary) return;
    let text = `🌍 My Voyazo Trip to ${destination} 🌍\n\n`;
    itinerary.forEach(day => {
      text += `📅 Day ${day.day}\n`;
      if (day.activities) {
        day.activities.forEach(act => {
          text += `  • ${act.time} - ${act.title} (${act.location})\n`;
        });
      }
      text += '\n';
    });
    text += 'Planned by Voyazo AI ✨';
    navigator.clipboard.writeText(text);
    setAlertInfo({ open: true, message: 'Beautifully formatted itinerary copied to clipboard!', severity: 'success' });
  };

  const trendingDestinations = [
    { name: 'Kyoto, Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop' },
    { name: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1613395877344-13d4a30b561c?q=80&w=400&auto=format&fit=crop' },
    { name: 'Banff, Canada', img: 'https://images.unsplash.com/photo-1542668595-fa9394e5b686?q=80&w=400&auto=format&fit=crop' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, #1e293b, #0f172a)' }}>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(15,23,42,0.8)' }}>
        <Toolbar sx={{ py: 1, px: { xs: 2, md: 8 } }}>
          <TravelExploreIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1, color: '#f8fafc', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            Voyazo
          </Typography>
          <Chip icon={<PersonIcon />} label={userName} color="primary" variant="outlined" sx={{ mr: 2, borderRadius: 2 }} />
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>Sign Out</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" gutterBottom>
              Plan the <Box component="span" sx={{ color: 'primary.main' }}>impossible</Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
              Enter your dream destination and let Voyazo's AI build a hyper-personalized itinerary that adapts in real-time.
            </Typography>

            {/* Trending Cards */}
            {!itinerary && (
              <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
                {trendingDestinations.map((dest, i) => (
                  <Grow in timeout={1000 + (i * 300)} key={i}>
                    <Grid item>
                      <Card sx={{ width: 200, borderRadius: 4, cursor: 'pointer', '&:hover': { transform: 'scale(1.05)', transition: '0.2s', borderColor: 'primary.main', borderWidth: 1, borderStyle: 'solid' } }} onClick={() => setDestination(dest.name)}>
                        <CardActionArea>
                          <CardMedia component="img" height="100" image={dest.img} alt={dest.name} />
                          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                            <Typography variant="body2" fontWeight="bold">{dest.name}</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </Grow>
                ))}
              </Grid>
            )}
          </Box>
        </Fade>

        <Grow in timeout={800}>
          <Card sx={{ p: 4, mb: 8, background: 'linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9))', '&:hover': { transform: 'none' } }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Autocomplete
                  freeSolo
                  options={destinationOptions}
                  value={destination}
                  onInputChange={(e, newInputValue) => {
                    setDestinationInputValue(newInputValue);
                    setDestination(newInputValue);
                  }}
                  onChange={(e, newValue) => setDestination(newValue || '')}
                  renderInput={(params) => (
                    <TextField {...params} label="Destination" variant="outlined" placeholder="e.g. Kyoto, Japan" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField fullWidth type="number" label="Days" variant="outlined" value={days} onChange={(e) => setDays(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField fullWidth label="Budget" variant="outlined" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. Luxury" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Vibe" variant="outlined" value={vibe} onChange={(e) => setVibe(e.target.value)} placeholder="e.g. Foodie & History" />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  onClick={executeGenerate} 
                  disabled={loading || !destination} 
                  sx={{ px: 8, py: 1.5, fontSize: '1.2rem', minWidth: 320 }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} color="inherit" sx={{ mr: 2 }} />
                      <Typography variant="body1">{loadingPhrases[loadingPhraseIndex]}</Typography>
                    </Box>
                  ) : <><AutoAwesomeIcon sx={{ mr: 1.5 }} /> Generate My Journey</>}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grow>

        {itinerary && (
          <Fade in timeout={800}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h3" fontWeight="bold">Your Itinerary</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="outlined" color="secondary" onClick={handleShare} startIcon={<ShareIcon />}>
                    Copy Itinerary
                  </Button>
                  <Button variant="outlined" color="primary" onClick={handleSimulateRain} startIcon={<ThunderstormIcon />} sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}>
                    Simulate Weather
                  </Button>
                  <Button variant="contained" onClick={() => setChatOpen(true)} startIcon={<ChatIcon />} sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: '#f1f5f9', transform: 'translateY(-2px)' } }}>
                    Chat Replan
                  </Button>
                </Box>
              </Box>

              <Grid container spacing={4}>
                {Array.isArray(itinerary) ? itinerary.map((day, i) => (
                  <Grow in timeout={500 + (i * 400)} key={i}>
                    <Grid item xs={12} lg={6}>
                      <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden', p: 1, '&:hover': { transform: 'translateY(-6px)' } }}>
                        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', bgcolor: 'primary.main' }} />
                        <CardContent sx={{ p: 4 }}>
                          <Typography variant="h4" color="primary.light" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>Day {day.day}</Typography>
                          <Box>
                            {day.activities && day.activities.map((act, j) => (
                              <Box key={j} sx={{ mb: 4, pl: 4, borderLeft: '2px dashed rgba(255,255,255,0.15)', position: 'relative', transition: 'all 0.3s', '&:hover': { borderLeftColor: 'primary.main' } }}>
                                <Box sx={{ position: 'absolute', left: -7, top: 4, width: 12, height: 12, borderRadius: '50%', bgcolor: act.type === 'indoor' ? 'secondary.main' : 'primary.main', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }} />
                                <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {act.time} — {act.title}
                                  <Chip size="small" label={act.type || 'mixed'} sx={{ height: 20, fontSize: '0.7rem', fontWeight: 'bold', ml: 1 }} color={act.type === 'indoor' ? 'secondary' : 'primary'} />
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ my: 1.5, lineHeight: 1.7 }}>{act.description}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', mt: 1 }}>
                                  <Typography variant="caption" sx={{ color: 'text.primary', display: 'inline-flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.05)', px: 1.5, py: 0.5, borderRadius: 1 }}>
                                    📍 {act.location}
                                  </Typography>
                                  <Button size="small" startIcon={<HotelIcon />} onClick={() => navigate('/coming-soon')} sx={{ color: 'primary.light' }}>
                                    Book Near Here
                                  </Button>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grow>
                )) : <Typography color="error">Invalid itinerary format received from AI.</Typography>}
              </Grid>

              {/* Feedback Button */}
              <Grow in timeout={2000}>
                <Box sx={{ mt: 8, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>Did Voyazo plan a good trip?</Typography>
                  <Button variant="outlined" size="large" onClick={() => setFeedbackOpen(true)} startIcon={<StarIcon />}>
                    Leave Feedback
                  </Button>
                </Box>
              </Grow>
            </Box>
          </Fade>
        )}
      </Container>

      {/* Chat Replan Drawer */}
      <Drawer anchor="right" open={chatOpen} onClose={() => setChatOpen(false)} PaperProps={{ sx: { background: 'rgba(15, 23, 42, 0.98)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.05)' } }}>
        <Box sx={{ width: { xs: 320, sm: 450 }, p: 5, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
            <ChatIcon color="primary" sx={{ mr: 2, fontSize: 36 }} />
            <Typography variant="h4" fontWeight="bold">AI Agent</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
            Want to tweak something? Just tell me in plain English. For example: "I want more spicy food tomorrow" or "Cancel the museum and add a beach day."
          </Typography>
          <TextField 
            multiline rows={6} fullWidth variant="outlined" 
            placeholder="Type your request here..." value={chatMessage} 
            onChange={(e) => setChatMessage(e.target.value)} 
            sx={{ mb: 4 }}
          />
          <Button 
            variant="contained" size="large"
            onClick={handleChatReplan} disabled={chatLoading || !chatMessage}
            sx={{ py: 2 }}
          >
            {chatLoading ? <CircularProgress size={24} color="inherit" /> : 'Update My Itinerary'}
          </Button>
        </Box>
      </Drawer>

      {/* Feedback Modal */}
      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} PaperProps={{ sx: { bgcolor: 'background.paper', borderRadius: 4, minWidth: 400 } }}>
        <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 1 }}><Typography variant="h5" fontWeight="bold">Rate Your Experience</Typography></DialogTitle>
        <DialogContent sx={{ px: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} size="large" />
          </Box>
          <TextField 
            fullWidth multiline rows={4} variant="outlined" 
            placeholder="What did you love? What could be better?" 
            value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4, justifyContent: 'center' }}>
          <Button onClick={() => setFeedbackOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={submitFeedback}>Submit Feedback</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={() => setAlertInfo({...alertInfo, open: false})} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={alertInfo.severity} variant="filled" sx={{ width: '100%', borderRadius: 3 }}>{alertInfo.message}</Alert>
      </Snackbar>
    </Box>
  );
}

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
         <Routes>
           <Route path="/" element={<LandingPage userEmail={userEmail} />} />
           <Route path="/auth" element={<AuthPage setUserEmail={setUserEmail} setUserName={setUserName} />} />
           <Route path="/plan" element={<Planner userEmail={userEmail} setUserEmail={setUserEmail} userName={userName} />} />
           <Route path="/pricing" element={<PricingPage userEmail={userEmail} />} />
           <Route path="/coming-soon" element={<ComingSoon />} />
           <Route path="*" element={<Navigate to="/" />} />
         </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
