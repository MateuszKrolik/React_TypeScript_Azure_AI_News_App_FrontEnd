import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { City } from '../api-client';

interface CitySelectorProps {
  cities: City[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const sortCitiesAlphabetically = (cities: City[]) => {
    return cities.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  };
  
const CitySelector: React.FC<CitySelectorProps> = ({
  cities,
  selectedCity,
  setSelectedCity,
}) => {
  const sortedCities = sortCitiesAlphabetically(cities);

  return (
    <TextField
      select
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      fullWidth
      variant="outlined"
      margin="normal"
      label="Select a city"
    >
      <MenuItem value="">
        <em>Select a city</em>
      </MenuItem>
      {sortedCities.map((city) => (
        <MenuItem key={city.name} value={city.name}>
          {city.name || 'Unknown City'}, {city.state || 'Unknown State'}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CitySelector;
