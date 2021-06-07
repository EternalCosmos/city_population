
const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');
const cors = require('cors');

import { AxiosError, AxiosResponse } from 'axios';
import { CityResponse, CountryResponse, Error, PopulationResponse } from './interfaces';

const app = express();

const countryUrl = 'https://countriesnow.space/api/v0.1/countries/positions';
const cityUrl = 'https://countriesnow.space/api/v0.1/countries/cities';
const populationUrl = 'https://countriesnow.space/api/v0.1/countries/population/cities';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/country', function (req: any, res: { json: (arg0: string[]) => void; send: (arg0: string) => void; }) {
  axios.get(countryUrl)
  .then((response: AxiosResponse<CountryResponse>) => {
    const { data: { data } } = response;
    const countries = data.map((record: { name: string, long: string, lat: string }) => record.name);
    res.json(countries)
  })
  .catch((error: AxiosError<Error>) => {
    if (error.response?.data) {
      res.send(error.response?.data.msg);
    } else {
      res.send('Something went wrong')
    }
    console.log(error.response?.data)
  });
});

app.post('/city', function (req: any, res: { json: (arg0: string[]) => void; send: (arg0: string) => void; }) {
  axios.post(cityUrl, { country: req.body.country })
  .then((response: AxiosResponse<CityResponse>) => {
    const { data: { data } } = response;
    res.json(data)
  })
  .catch((error: AxiosError<Error>) => {
    if (error.response?.data) {
      res.send(error.response?.data.msg);
    } else {
      res.send('Something went wrong')
    }
    console.log(error.response?.data)
  });
})

app.post('/population', function (req: any, res: { send: (arg0: string) => void }) {
  axios.post(populationUrl, { city: req.body.city })
  .then((response: AxiosResponse<PopulationResponse>) => {
    const { data: { data } } = response
    res.send(data.populationCounts[0].value)
  })
  .catch((error: AxiosError<Error>) => {
    if (error.response?.data) {
      res.send(error.response?.data.msg);
    } else {
      res.send('Something went wrong')
    }
    console.log(error.response?.data)
  });
})

app.listen(4000, function () {
  console.log('Listening to Port 4000');
});
