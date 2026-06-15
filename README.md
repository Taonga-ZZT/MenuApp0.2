# Christoffel's Restaurant Menu App

## Features

### Home Screen

* Displays the complete restaurant menu.
* Shows the total number of menu items.
* Calculates and displays the average price for:

  * Starters
  * Mains
  * Desserts
* Displays the total value of all menu items.

### Manage Menu Screen

* Add new menu items.
* Enter:

  * Dish name
  * Description
  * Course
  * Price
* Remove menu items from the menu.
* Automatically updates all screens when changes are made.

### Guest Filter Screen

* Filter menu items by course.
* View only:

  * Starters
  * Mains
  * Desserts
* Provides a simple browsing experience for guests.

---

## Technologies Used

* React Native
* Expo
* TypeScript
* React Navigation
* Context API
* Expo Vector Icons

---

## Project Structure

```text
App.tsx
MenuContext.tsx

screens/
├── HomeScreen.tsx
├── ManageMenuScreen.tsx
└── GuestFilterScreen.tsx
```

---

## State Management

The application uses the React Context API to manage menu data across multiple screens.

Functions provided by the context:

* addMenuItem()
* deleteMenuItem()

This allows all screens to access and update the same menu data without passing props between components.

---

## How to Run the Project

1. Install dependencies:

```bash
npm install
```

2. Start the Expo development server:

```bash
npx expo start
```

3. Scan the QR code using Expo Go on a mobile device or run the project in an emulator.

---


