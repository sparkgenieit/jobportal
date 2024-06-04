import { loadStripe } from "@stripe/stripe-js";

export const itemsPerPage = 10;

export const plans = { "Basic": 2.99, "Standard": 5.99, "Premium": 10.99 };

export const BASE_APP_URL = 'http://localhost:3000';

export const BASE_API_URL = 'http://localhost:8080';

export const stripePromise = loadStripe("pk_test_51PKHdMSIkLQ1QpWMWtk1C0swqVaqjKD661Tk5XyEaEoPDIolQZ3e2Dymp7x0iTvyZrjfQDQSZRB1ju6sUTpyr24d00kzeTZNNY");

