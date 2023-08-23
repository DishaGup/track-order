# Logistics Management System - Backend

Welcome to the backend repository of the Logistics Management System. This system is designed to manage vehicles, items, orders, and customers for a logistics company.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Logging](#logging)
- [Error Handling](#error-handling)


## Introduction

This backend repository contains the server code for the Logistics Management System. It's built using the MERN (MongoDB, Express, React, Node.js) stack and provides APIs for managing items, customers, delivery vehicles, and orders.

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Configure your environment variables in a `.env` file.
4. Start the server using `npm start`.

## API Documentation

### User Authentication

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in and obtain a JWT token for authentication.

### Items

- `GET /api/items`: Retrieve a list of all items.
- `GET /api/items/:id`: Retrieve details of a specific item.
- `POST /api/items`: Create a new item.
- `PUT /api/items/:id`: Update an existing item.
- `DELETE /api/items/:id`: Delete an item.

### Customers

- `GET /api/customers`: Retrieve a list of all customers.
- `GET /api/customers/:id`: Retrieve details of a specific customer.
- `POST /api/customers`: Create a new customer.
- `PUT /api/customers/:id`: Update an existing customer.
- `DELETE /api/customers/:id`: Delete a customer.

### Delivery Vehicles

- `GET /api/delivery-vehicles`: Retrieve a list of all delivery vehicles.
- `GET /api/delivery-vehicles/:id`: Retrieve details of a specific delivery vehicle.
- `POST /api/delivery-vehicles`: Create a new delivery vehicle.
- `PUT /api/delivery-vehicles/:id`: Update an existing delivery vehicle.
- `DELETE /api/delivery-vehicles/:id`: Delete a delivery vehicle.

### Orders

- `GET /api/orders`: Retrieve a list of all orders.
- `GET /api/orders/:id`: Retrieve details of a specific order.
- `POST /api/orders`: Create a new order.
- `PUT /api/orders/:id`: Update an existing order.
- `DELETE /api/orders/:id`: Delete an order.
- `PUT /api/orders/:id/mark-delivered`: Mark an order as delivered.

For protected routes, include the JWT token in the `Authorization` header.

## Authentication

This backend uses token-based authentication with JSON Web Tokens (JWT). To access protected routes, include a valid JWT token in the `Authorization` header.

To obtain a token, use the `/users/login` route with valid credentials. The response will include a token that should be included in subsequent requests.

## Logging

This backend logs HTTP requests using the `morgan` middleware. Logs are written to an `access.log` file.

## Error Handling

The backend includes basic error handling for API routes. Errors are returned in a standardized format with appropriate HTTP status codes.

