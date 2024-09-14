# My App

## Overview
**My App** is a React-based application that provides a user-friendly interface for authentication (Login and Sign-Up) and task management. The project includes features like form validation using **Formik** and **Yup**, responsive design with **Material-UI**, and **local storage** to manage user data and tasks.

## Features
- **User Registration**: Users can register with their full name, email, and password.
- **User Login**: Registered users can log in to access their to-do dashboard.
- **Form Validation**: Forms are validated using Formik and Yup, ensuring correct input format and required fields.
- **Responsive Design**: The app is responsive and works seamlessly on desktops, tablets, and mobile devices.
- **Task Management**: After logging in, users can manage their tasks (add, edit, and mark as complete).
- **Authentication Management**: User authentication is managed using React Context.

## Tech Stack
- **React**: Frontend framework for building user interfaces.
- **Material-UI (MUI)**: Component library for building a responsive and modern user interface.
- **Formik & Yup**: Used for form handling and validation.
- **React Router**: Used for handling navigation and routing.
- **LocalStorage**: Used for storing user information and tasks locally.

## Installation
To run the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000` to view the app.

## Project Structure
```bash
src/
│
├── components/
│   ├── Login.jsx          # Login component
│   ├── SignUp.jsx         # Sign-up component
│   ├── TodoList.jsx       # To-do management component
│
├── context/
│   └── AuthContext.jsx    # Context to manage authentication
│
├── App.jsx                # Main app component
├── index.js               # React entry point
├── styles.css             # Global CSS styles
└── README.md              # Project README
```

## Authentication Flow

1. Users can sign up by providing their name, email, and password.
2. Form validation ensures proper input.
3. Upon successful registration, users are logged in and redirected to the Todo list page.
4. If users already exist, the system prevents duplicate registration.
5. The login page handles existing users and redirects them to the Todo list after successful login.
6. User authentication state is maintained using React Context and persisted in `localStorage`.

## Responsive Design

The layout and components are designed to be fully responsive, adjusting based on the screen size (desktop, tablet, mobile). Material-UI's Grid system and breakpoints are used to handle responsiveness.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


- **`components/`**: Contains the core components of the app such as TodoList, Login, SignUp, etc.
- **`context/`**: Includes `AuthContext.jsx`, which handles the global state for user authentication.
- **`styles/`**: Contains the custom styles and SCSS for the app.
- **`App.jsx`**: The main app component which renders the different views based on the authentication state.
- **`index.js`**: The entry point of the app.

## Authentication Flow

1. Users can sign up by providing their name, email, and password.
2. Form validation ensures proper input.
3. Upon successful registration, users are logged in and redirected to the Todo list page.
4. If users already exist, the system prevents duplicate registration.
5. The login page handles existing users and redirects them to the Todo list after successful login.
6. User authentication state is maintained using React Context and persisted in `localStorage`.

## Responsive Design

The layout and components are designed to be fully responsive, adjusting based on the screen size (desktop, tablet, mobile). Material-UI's Grid system and breakpoints are used to handle responsiveness.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
