# Buy Busy E-Commerce App

Buy Busy is a basic e-commerce website developed using React, Firebase, React Router, and Context API. It allows users to browse products, add items to the cart, make purchases, and view order history.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Product Page:**

   - Displays a list of all available products.
   - Allows filtering by category.
   - Includes a search functionality for finding specific items.

2. **Cart Page:**

   - Displays the items added to the cart.
   - Allows users to adjust quantities and remove items.
   - Provides a button to proceed to checkout.

3. **Checkout:**

   - Users can purchase items from the cart.
   - Implements CRUD operations for managing the cart using Firebase.

4. **Orders Page:**

   - Displays the order history for the logged-in user.

5. **User Authentication:**

   - Allows users to register and sign in.
   - User-specific data using Firebase authentication.

6. **User Profile:**

   - Displays user-specific information.
   - Provides a sign-out functionality.

7. **Notifications:**
   - Displays Notifications properly.

## Technologies Used

- React
- Firebase (Firestore for database)
- React Router
- Context API for state management

## Project Structure

- `src/components`: Contains React components.
- `src/contexts`: Defines the context providers.
- `src/firebase.js`: Firebase configuration.
- `src/App.js`: Main application component.
- `src/index.js`: Entry point for the application.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a Firebase project and update the Firebase configuration in `src/firebase/firebase.js`.
4. Run the app using `npm start`.

## Usage

1. Visit the product page to explore available items.
2. Add items to the cart and proceed to the cart page.
3. Make a purchase by clicking the checkout button.
4. View order history on the orders page.
5. Register or sign in to access user-specific features.

## Screenshots

![Product Page](/screenshots/product-page.png)
![Cart Page](/screenshots/cart-page.png)
![Orders Page](/screenshots/orders-page.png)

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
by vikash kumar
