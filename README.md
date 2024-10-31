# Eklipx Take Home Test

## Introduction

In this assignment, you will create a product listing using mock data, implement a purchase flow, and handle responses from a mock API. Your goal is to build a simple e-commerce-like functionality where users can attempt to purchase products, with notifications for success and failure cases.

This repository is split into two directories:
- `frontend` - The React application and its associated dependencies.
- `backend` - A Node.js server with a mock payment API.

The `backend/external` directory contains a mock payment provider that simulates product stock availability. This API will return `Success` if a product is in stock or `Failure` if it is out of stock. **You do not need to modify this file.**

The mock payment provider only accepts data in a format defined by the [JSON Schema](./backend/external/schema.json). Your server function will need to transform its request into this format before making the call.

> **Note:** The following product SKUs will return out of stock:
> - `9QN3UDUD`
> - `VZF4Z58Z`

Infrastructure and build tools have been provided, so you can concentrate on the code for the function.
You are welcome to install any additional packages from NPM to help you complete the assignment.

## Submitting

- Clone this repo into the platform of your choice
- Create a pull request for your changes against the `main` branch
- Inform your point of contact when you have completed the task.

## Tasks

- Use the provided `products.json` file in the `frontend` directory to create React component(s) that display a list of products and their details, including name, price, description, and SKU.
- Identify the **product SKU** and generate a mock **user ID**.
- Implement logic to handle a "Purchase" button click. When clicked, this should trigger an API request to the backend server (running on `http://localhost:3000`).
- Display a success or failure notification (e.g., using a toaster) on the frontend based on the response from the backend.
- Implement the purchase logic in `purchase-handler.ts` to handle the request from the frontend.
- Use the `MockPaymentProvider` in `mock-payment-api.ts` to check product availability and respond accordingly.
- Ensure your function transforms events into the format defined by the [JSON Schema](./backend/external/schema.json).
- Write unit tests for the backend, adding them under the `test` folder in the `backend` directory.
- Write end-to-end (e2e) tests for the frontend, using Cypress tests under `cypress/e2e` in the `frontend` directory.

## Install

To install dependencies, run the command `npm run setup` from the project root. This will install the modules for both the `frontend` and `backend` directories.

## Start the Backend 

Start the backend server by running:

```
npm run dev:backend
```

This will start a NodeJS server using the [Kao Framework](https://koajs.com/). The server listens for requests on `http://localhost:3000` and communicates between your React app and the mock payment API. The command uses `ts-node` to execute `.ts` files, so there’s no need to pre-build the server.

## Start the Frontend 

The frontend uses Vite as the bundler and frontend dev server.

```
npm run dev:frontend
```

The frontend will be accessible at http://localhost:5173 by default.

## Build

To build your code, run this command:

```
npm run build:backend
npm run build:frontend
```

## Test

The backend uses Jest for unit tests. Run the tests with:

```
npm run test:backend
```

Test configuration is inside the [jest.config.js](./backend/jest.config.ts).

The frontend uses Cypress for end-to-end testing. You can run Cypress in interactive mode.
```
npm run test:frontend
```