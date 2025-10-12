# Nairapay Frontend

This is the Nairapay application, a modern digital wallet solution for the Nigerian Naira digital coin.

## ✨ Features

*   **Wallet Management**: Create and manage your digital wallet.
*   **Transactions**: Seamlessly send and receive digital currency.
*   **Transaction History**: View a detailed history of all your transactions.
*   **Responsive Design**: A clean and intuitive user interface that works across all devices.

## 🛠 Tech Stack

*   **Framework**: [React](https://reactjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **UI Library**: [Material-UI (MUI)](https://mui.com/)
*   **Routing**: [React Router](https://reactrouter.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm installed on your system.

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd nairapay-fe
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

After installing the dependencies, you'll need to set up your environment variables.

1.  Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
2.  Update the `.env` file with your specific keys and endpoints. These variables are required for the application to connect to the necessary services.

    ```dotenv
    VITE_OPENFORT_PUBLISHABLE_KEY=some_publishable_key
    VITE_OPENFORT_POLICY_ID=some_policy_id
    VITE_WALLET_CONNECT_PROJECT_ID=some_project_id
    VITE_OPENFORT_SHIELD_PUBLISHABLE_KEY=some_shield_key
    VITE_OPENFORT_WALLET_CONNECT_PROJECT_ID=some_wallet_connect_id
    VITE_STABLECOIN_ADDRESS=some_stablecoin_address
    VITE_POLYGONSCAN_API_KEY=some_polygonscan_key

    VITE_BACKEND_URL=http://localhost:8080
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📂 Project Structure

The project follows a feature-based structure to keep the codebase organized and maintainable.

```
src/
├── assets/         # Static assets like images and SVGs
├── components/     # Reusable UI components
├── constant/       # Application constants
├── context/        # Context providers for Openfort
├── hooks/          # Custom React hooks
├── pages/          # Page components corresponding to routes
├── routes/         # Routing configuration
├── theme/          # MUI theme and styling configuration
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run lint`: Lints the codebase using ESLint.
*   `npm run preview`: Serves the production build locally.