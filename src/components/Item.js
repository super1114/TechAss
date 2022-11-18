import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


const Item = ({business, index}) => {
  return (
    <Box height={'200px'}>
      <Grid container spacing={2} marginTop={3}>
        <Grid item xs={4}>
          <img
            src={business.image_url}
            loading="lazy"
            width={'100%'}
            height={'200px'}
            alt="business logo"
          />
        </Grid>
        <Grid item xs={8}>
            <Box sx={{
              width: "100%",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Typography variant="h6" gutterBottom>
              {index+1}. {business.name}
            </Typography>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
            }} >
              <LocalPhoneIcon /> {business.display_phone}
            </Box>
          </Box>
          <Box sx={{
            width: "100%",
            display: 'flex',
            alignItems: 'center',
          }}>
            <Rating
              name="half-rating-read"
              value={business.rating}
              precision={0.5} readOnly
            />
            <Box sx={{ ml: 1 }}>{business.rating}</Box>
            <Box sx={{ ml: 1 }}>({business.review_count} reviews)</Box>
          </Box>
          <Box sx={{
            width: "100%",
            display: 'flex',
            alignItems: 'center',
          }}
          marginTop={1}
          >
            {
              business.categories.map((category, i) => <Chip key={i} label={category.alias} sx={{ ml: 1 }}/>)
            }
            <Box sx={{ ml: 1 }}>{business.price}</Box>
            <Box sx={{ ml: 1 }}>{business.location?.address1}</Box>
          </Box>
          <Box marginTop={2} sx={{
            width: "100%",
            display: 'flex',
            alignItems: 'center',
          }}>
            <Box  color={business.is_closed ? "red" : "green"} fontWeight={"bold"}>{business.is_closed ? "Closed": "Open"}</Box>
            <LocationOnIcon sx={{ ml:1 }}/> ({business.coordinates.latitude}, {business.coordinates.longitude})
          </Box>
          <Box sx={{
            width: "100%",
            display: 'flex',
            alignItems: 'center',
          }}
          marginTop={2}
          >
            {
              business.transactions.map((transaction, i) => <Chip key={i} label={transaction} color="success" sx={{ ml:1 }}/>)
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Item;
