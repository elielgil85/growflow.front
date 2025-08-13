# GrowFlow: Your Productivity Garden

## Overview

GrowFlow is a gamified to-do list application where tasks grow into a virtual garden. It aims to enhance productivity by providing a visually engaging and rewarding experience.

## Technologies Used

### Frontend

*   **Next.js:** A React framework for building server-rendered React applications.
*   **React:** JavaScript library for building user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Shadcn UI / Radix UI:** A collection of reusable components built with Radix UI and styled with Tailwind CSS, providing a modern and accessible UI.
*   **Zustand:** A fast and scalable state-management solution for React.

### Backend / AI

*   **Genkit AI:** An open-source framework for building AI-powered applications.
*   **Google AI:** Integration with Google's AI services.
*   **Express.js:** A minimal and flexible Node.js web application framework (implied by `express` dependency).
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB, suggesting a MongoDB database is used.
*   **bcryptjs & jsonwebtoken:** Used for user authentication and authorization.

### Other

*   **Internationalization (i18n):** Custom context and locale files (`src/locales`) for multi-language support.
*   **Firebase Studio:** The project was initially set up within a Firebase Studio environment.

## Project Structure Highlights

*   **`src/app`:** Contains the main application pages and layout.
*   **`src/components`:** Houses various UI components, including shared UI elements (`src/components/ui`) and specific application views (`src/components/views`).
*   **`src/context`:** Provides global contexts for authentication (`auth-context.tsx`) and internationalization (`i18n-context.tsx`).
*   **`src/hooks`:** Custom React hooks for common functionalities.
*   **`src/store`:** Contains Zustand stores for state management, e.g., `task-store.ts`.
*   **`src/ai`:** Dedicated directory for Genkit AI configurations and flows, including `garden-data-generation.ts`.
*   **`src/locales`:** JSON files for different language translations.

## Key Features

*   **Gamified To-Do List:** Tasks contribute to the growth of a virtual garden.
*   **Multiple Views:** Users can switch between Garden, Task List, Statistics, and Customization views.
*   **User Authentication:** Secure login and registration.
*   **Internationalization:** Support for multiple languages.
*   **AI Integration:** Potential for AI-driven features, possibly related to garden growth or task management.

## Development Scripts

*   `npm run dev`: Starts the Next.js development server with Turbopack on port 9002.
*   `npm run genkit:dev`: Starts the Genkit AI development server.
*   `npm run genkit:watch`: Starts the Genkit AI development server with file watching.
*   `npm run build`: Builds the Next.js application for production.
*   `npm run start`: Starts the Next.js production server.
*   `npm run lint`: Runs ESLint for code linting.
*   `npm run typecheck`: Performs TypeScript type checking.

## Getting Started

To run this project locally, ensure you have Node.js and npm (or yarn) installed. Then, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:9002`.

3.  **Start the Genkit AI development server (optional, for AI features):**
    ```bash
    npm run genkit:dev
    ```

## Contributing

Further details on contributing to the project can be added here. (Placeholder)

## License

(Placeholder for license information)
