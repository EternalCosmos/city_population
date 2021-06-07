import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../utils';
import AutocompleteField from '../autocomplete-field';
import { HttpMethods, Urls } from '../../enumerations';

import './container.scss';

export default function Container () {

  const [countries, setCountries] = useState(['']);
  const [countryValue] = useState(null);
  const [countryInput, setCountryInput] = useState('');
  const [isCountryOpened, setIsCountryOpened] = useState(false);

  const [cities, setCities] = useState(['']);
  const [cityValue, setCityValue] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [isCityOpened, setIsCityOpened] = useState(false);

  const [population, setPopulation] = useState('');

   
  useEffect(() => {
    const savedCountries = localStorage.getItem('countries');
    if (savedCountries && savedCountries?.length) {
      setCountries(JSON.parse(savedCountries))
    } else {
      makeRequest(HttpMethods.GET, Urls.COUNTRY)
      .then(response => {
        setCountries(response.data);
        localStorage.setItem('countries', JSON.stringify(response.data))
      })
      .catch(error => {
        console.error(error)
      });
    }
  }, [])

  const onCountryChange = (selectedCountry: string) => {
    setIsCountryOpened(false);
    makeRequest(HttpMethods.POST, Urls.CITY, { country: selectedCountry })
    .then(response => {
      setCities(response.data)
    })
    .catch(error => {
      console.error(error)
    })
  }

  const onCityChange = (selectedCity: string) => {
    setIsCityOpened(false);
    makeRequest(HttpMethods.POST, Urls.POPULATION, { city: selectedCity })
    .then(response => {
      setPopulation(response.data)
    })
    .catch(error => {
      console.error(error)
    })
  }

  const onCountryInputChange = (value: string) => {
    setCountryInput(value);
    setCities(['']);
    setCityValue(null);
    setCityInput('');
    setPopulation('');
    value.length >= 3 ? setIsCountryOpened(true) : setIsCountryOpened(false)
  }

  const onCityInputChange = (value: string) => {
    setCityInput(value);
    value.length >= 3 ? setIsCityOpened(true) : setIsCityOpened(false);
  }

  const CountryProps = {
    data: countries,
    focus: true,
    id: 'country_field',
    inputValue: countryInput,
    isOpened: isCountryOpened,
    label: 'Country',
    onChange: onCountryChange,
    onInput: onCountryInputChange,
    setInputValue: setCountryInput,
    value: countryValue,
  }

  const CityProps = {
    data: cities,
    id: 'city_field',
    inputValue: cityInput,
    isOpened: isCityOpened,
    label: 'City',
    onChange: onCityChange,
    onInput: onCityInputChange,
    setInputValue: setCityInput,
    value: cityValue,
  }

  return (
    <div className="container">
      <div className="inner_container">
        <h5 className="container_title">Autocomplete</h5>
        <AutocompleteField {...CountryProps} />
        <AutocompleteField {...CityProps} />
        <TextField value={population} variant="outlined" size="small" label="Latest population count" />
        <div className="divider" />
      </div>
    </div>
  )
}
