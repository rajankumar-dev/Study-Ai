# Auth Flow Document

## 1. Signup Flow

User enters their name, email, and password in the signup form on the frontend.
The frontend sends this data to the backend API endpoint /api/auth/register.

The backend validates the input data, ensuring all required fields are provided and the email is in a valid format.
It then checks whether a user with the same email already exists in the database.

If the email is already registered, the backend returns an error response.
If the email is unique, the password is securely hashed before storing it in the database.

The new user record is then created and saved in the database.

After successful registration, the backend sends a success response to the frontend.
Optionally, a JWT token can also be generated and returned for immediate authentication.

## 2. Login Flow

User enters their registered email and password in the login form on the frontend.
The frontend sends a request to the backend API endpoint /api/auth/login.

The backend checks if the user exists in the database using the provided email.
If the user is found, the entered password is compared with the stored hashed password.

If the credentials are valid, the backend generates a JWT (JSON Web Token).
This token is sent back to the frontend as a response.

If the credentials are invalid, an error message is returned.

## 3. Token Flow (JWT)

After successful login, the backend generates a JWT token containing the user’s identification data (such as userId).

The token is sent to the frontend and stored securely (e.g., in localStorage or cookies).

For every protected request, the frontend includes the token in the request header:

Authorization: Bearer <token>

The backend verifies the token on each request.
If the token is valid, the request is processed.
If the token is invalid or expired, access is denied.

## 4. Protected Routes

Protected routes are API endpoints that require user authentication.

When a request is made to a protected route, the backend checks for the presence of a valid JWT token in the request headers.

A middleware function is used to verify the token before allowing access to the route.

If the token is valid, the user is authorized and the requested data is returned.
If the token is missing or invalid, the backend responds with an unauthorized access error.
