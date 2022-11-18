import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Item from "./Item";
import CircularProgress from '@mui/material/CircularProgress';

const Page = () => {
  
  const [city, setCity] = React.useState("");
  const [term, setTerm] = React.useState("");
  
  const [rating, setRating] = React.useState(100);
  const [transactions, setTransactions] = React.useState([]);
  const [reviewCount, setReviewCount] = React.useState("all");
  
  const [businesses, setBusinesses] = React.useState([]); // business data fetched from backend.
  const [filteredBusinesses, setFilteredBusinesses] = React.useState([]); // business data processed(filtered) on frontend

  const [loading, setLoading] = React.useState(false);
  
  useEffect(() => {
    if(city !== "") {
      setLoading(true);
      axios.get("http://localhost:3001/api/businesses", {
        params: {
          city: city,
          term: term
        }
      })
      .then(res => {
        setBusinesses(res.data.businesses)
        setFilteredBusinesses(res.data.businesses)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setBusinesses([])
        setFilteredBusinesses([])
        setLoading(false);
      });
    }
  }, [city, term]);

  const handleKeyDownForCity = (e) => {
    if (e.key === 'Enter') {
      setCity(e.target.value.trim());
    }
  }

  const handleKeyDownForTerm = (e) => {
    if (e.key === 'Enter') {
      setTerm(e.target.value.trim());
    }
  }

  const handleChangeTransaction = (checked, label) => {
    if(checked) {
      setTransactions(transactions => [...transactions, label]);
    } else {
      setTransactions(transactions.filter(item => item !== label));
    } 
  }

  useEffect(() => {
    setLoading(true);
    if(rating==100 || transactions.length==0 || reviewCount=="all") {
      setFilteredBusinesses(businesses);
    } 
    if(rating!=100) {
      setFilteredBusinesses(businesses.filter((item) => {
        return item.rating >= rating && item.rating<rating+1;
      }));
    }
    if(transactions.length>0) {
      setFilteredBusinesses(filteredBusinesses.filter((item) => {
        return item.transactions.length >= transactions.length &&
        transactions.every((el) => {
          return item.transactions.includes(el);
        })
      }));
    }
    if(reviewCount=="inf") {
      setFilteredBusinesses(filteredBusinesses.filter((item) => {
        return item.review_count >= 10000;
      }));
    } else if(reviewCount !== "all") {
      setFilteredBusinesses(filteredBusinesses.filter((item) => {
        return item.review_count <= reviewCount && item.review_count > reviewCount-2000;
      }));
    }
    setLoading(false)
  }, [rating, transactions, reviewCount]);

  return (
    <Container maxWidth="lg">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="on"
        fullWidth
      >
      </Box>
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={3} columns={12} marginTop={2}>
          <Grid item md={6}>
            <TextField id="outlined-basic" label="Input city you want to search for" variant="outlined" fullWidth onKeyDown={handleKeyDownForCity}/>
          </Grid>
          <Grid item md={6}>
            <TextField id="outlined-basic" label="Input term you want to search for" variant="outlined" fullWidth onKeyDown={handleKeyDownForTerm}/>
          </Grid>
        </Grid>
        <Grid container spacing={3} columns={24} marginTop={2}>
          <Grid item md={6}>
            <Box >
              <Typography variant="h5" gutterBottom>
                Filters
              </Typography>
            </Box>
            <Divider />
            <Box marginTop={5} marginBottom={5}>
              <FormControl fullWidth>
                <InputLabel id="rating-select-label">Rating</InputLabel>
                <Select
                  labelId="rating-select-label"
                  value={rating}
                  label="Rating"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <MenuItem value={1}>1 star</MenuItem>
                  <MenuItem value={2}>2 stars</MenuItem>
                  <MenuItem value={3}>3 stars</MenuItem>
                  <MenuItem value={4}>4 stars</MenuItem>
                  <MenuItem value={5}>5 stars</MenuItem>
                  <MenuItem value={100}>All rating</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Divider />
            <Box marginTop={5} marginBottom={5}>
              <Typography variant="h6" gutterBottom>
                transactions
              </Typography>
              <FormGroup >
                <FormControlLabel control={<Checkbox onChange={(e) => handleChangeTransaction(e.target.checked, "pickup")} />} label="Pickup" />
                <FormControlLabel control={<Checkbox onChange={(e) => handleChangeTransaction(e.target.checked, "delivery")} />} label="Delivery" />
                <FormControlLabel control={<Checkbox onChange={(e) => handleChangeTransaction(e.target.checked, "restaurant_reservation")} />} label="Reservation" />
              </FormGroup>
            </Box>
            <Divider />
            <Box marginTop={5} marginBottom={5}>
              <Typography variant="h6" gutterBottom>
                Review count
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="all"
                  value={reviewCount}
                  name="radio-buttons-group"
                  onChange={(e) => setReviewCount(e.target.value)}
                >
                  <FormControlLabel value={2000} control={<Radio />} label="0-2000 reviews" />
                  <FormControlLabel value={4000} control={<Radio />} label="2001-4000 reviews" />
                  <FormControlLabel value={6000} control={<Radio />} label="4001-6000 reviews" />
                  <FormControlLabel value={8000} control={<Radio />} label="6001-8000 reviews" />
                  <FormControlLabel value={10000} control={<Radio />} label="8001-10000 reviews" />
                  <FormControlLabel value={"inf"} control={<Radio />} label="10000+ reviews" />
                  <FormControlLabel value={"all"} control={<Radio />} label="All" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={18}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Business listl
              </Typography>
            </Box>
            <Divider />
            {
              loading ? <Box height={300} fullWidth sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
              </Box> : filteredBusinesses.length > 0 ? filteredBusinesses.map((business, index) => 
                  <Item business={business} index={index} />
                ) : <Box fullWidth sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Not found
              </Box>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Page;
