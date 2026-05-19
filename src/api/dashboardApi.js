import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/dashboard/dashboard`;

export const getOverview = (userId) =>
  axios.get(`${BASE_URL}/${userId}`);

export const getCategory = (userId) =>
  axios.get(`${BASE_URL}/category/${userId}`);

export const getTrend = (userId) =>
  axios.get(`${BASE_URL}/trend/${userId}`);

export const getAlerts = (userId) =>
  axios.get(`${BASE_URL}/alerts/${userId}`);

export const getInsight = (userId) =>
  axios.get(`${BASE_URL}/insight/${userId}`);