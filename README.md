# Fabizo-E-Commerce-Webapp
Fabizo is an e-commerce web app that provides a seamless shopping experience. It includes all the essential features of an e-commerce platform, allowing users to browse products, add them to the cart, and make secure purchases.

## Installation
Clone the repository
To run Fabizo, you need to set the following environment variables. Create a config.env file in the config folder inside backend folder and add the following:
PORT=4000
DB=your_database
JWT_SECRET
JWT_EXPIRE
COOKIE_EXPIRE
SMPT_HOST=smpt.gmail.com
SMPT_PORT=465
SMPT_SERVICE=gmail
SMPT_MAIL
SMPT_PASSWORD
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
RAZORPAY_API_KEY
RAZORPAY_API_SECRET

Navigate to the root directory
Install dependencies for backend: npm install
Navigate to the frontend folder
Install dependencies for frontend: npm install

Start the backend using following command: npm run dev
Start the frontend using following command: cd frontend, npm start
Open your browser and go to http://localhost:3000
Browse products, add them to your cart, and proceed to checkout.

##KEY FEATURES


Certainly! Let's enhance the list with additional features:

KEY FEATURES

Responsive and Attractive Design:Utilizes Tailwind CSS for a modern and visually appealing user interface.Ensures responsiveness for a seamless experience across devices.

User/Admin Authentication:Allows users to register, log in, and log out securely.Implements JWT (JSON Web Token) and cookies for secure user and admin authentication.
Profile Management:Enables users to update their password and profile information.
Email Notifications:Sends confirmation emails upon successful user registration. 
Password Recovery:Allows users to recover their passwords through a secure email-based process using nodemailer.

Admin Panel:Offers an admin panel with secure login for administrative tasks.Admins can manage products, user accounts, and orders efficiently.
Product Management (CRUD):Allows admin users to perform CRUD operations on products.

Product Details:Provides detailed product information on dedicated pages.Includes images, descriptions, and specifications.
Search Functionality:Enables users to search for products based on keywords.Implements an intuitive search algorithm for accurate and quick results.
Product Filtering:Implements filtering options for products based on price, category, and ratings.
Pagination:Implements pagination for product listings to enhance user navigation.Breaks down a large number of products into manageable pages for easy browsing.

Wishlist Functionality:Users can add, remove, and view items in their wishlist.
Shopping Cart:Implements a shopping cart feature for users to add and manage selected items.Displays real-time updates on the cart, including quantities and total cost.
Checkout Process:Guides users through a smooth and secure checkout process.Includes steps for address confirmation, payment details, and order summary.
Order Summary Feature:Displays a comprehensive order summary before the final purchase.Includes a breakdown of items, quantities, and total cost.
Reviews and Ratings:Enables users to create/update reviews and ratings for products
Payment Gateway Integration:Utilizes Razorpay for a secure and seamless payment gateway integration.
