# Buy Busy 

Full Stack React Ecommerce created with React and Firebase.

## 🖥️ Tech Stack

![reactjs](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp;
![react-router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;
![firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)&nbsp;


## 🚀 Features

* Authentication
    * Login User
    * Signup User
* Product Page
    * Add Cart
    * Product Search
    * Product Filters Based on Company, Color, Category
    * Product Filters Based on Price Range
* Cart Page
    * Add Items
    * Remove Items
    * Update Quantities
    * Purchase Products
* Order Page
    * Details of All Ordered Items


## Getting started

### 1. Clone the repo

```sh
$ git clone https://github.com/praisonjoseph/ecommerce-react.git
$ cd ecommerce-react/
```

### 2. Set Up Firebase

#### I. Create a Firebase Project:

 - Go to the Firebase Console.
 - Click on "Add project" and follow the prompts to create a new Firebase project.

#### II. Configure Firebase for Web:

- In your Firebase project, click on the "Web" icon (</>) to add a web app to your project.
- Follow the setup instructions to create a Firebase web app. You'll receive a configuration object that includes your Firebase API keys and other settings.

#### III. Enable Authentication Providers

- In the Firebase Console, navigate to "Authentication" and choose the authentication providers you want to enable, such as Email/Password, and Google.

#### IV. Create a Firestore Database:

- In the Firebase Console, navigate to "Firestore" and create a new Firestore database for your project. Set up the rules and indexes as needed.


### 3. Set Up Environmental Variables

- Rename `.env.sample` to `.env.local`
- Add Firebase configuration to `.env.local`