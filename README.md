# Recipe Sharing Application

## Overview
The Recipe Sharing Application is a platform where users can post, view, edit, and delete recipes. It showcases Angular fundamentals such as components, services, routing, and forms while integrating Angular Material and PrimeNG for UI enhancements. To optimize performance, the application uses Angular's `ChangeDetectionStrategy.OnPush`. Additionally, the form retains data on page refresh using local storage.

## Features

### 1. Recipe Display
- A home page displays a list of recipes with a title, short description, and a thumbnail image.
- Users can navigate to a recipe detail page to view the full recipe, including ingredients and cooking instructions.

### 2. Adding Recipes
- Users can submit new recipes through a form with fields for:
  - Title
  - Description
  - Ingredients
  - Instructions
  - Thumbnail image upload
- Utilizes **Angular Reactive Forms** for handling and validation.
- Data persists even after a page refresh via **local storage**.

### 3. Editing and Deleting Recipes
- Users can edit their posted recipes.
- Users can delete their recipes.

### 4. Search Functionality
- A search bar enables filtering recipes by **title** or **ingredients**.

### 5. Routing
- **Angular Router** is used to navigate between pages:
  - Home (Recipe List)
  - Recipe Detail
  - Recipe Submission Form
- Includes a **404 Not Found** page for unmatched routes.

### 6. Favorites (Bonus Feature)
- Users can mark recipes as **favorites**.
- Filter their favorite recipes.

## Technical Details

### 1. Components
- **Recipe List Component**: Displays all recipes.
- **Recipe Detail Component**: Shows full recipe details.
- **Recipe Form Component**: Manages recipe creation and editing.
- **Search Component**: Implements search functionality.

### 2. Services
- A **Recipe Service** handles CRUD operations:
  - Fetching recipes
  - Adding recipes
  - Editing recipes
  - Deleting recipes
  - Managing favorites

### 3. Mock Backend
- Uses `json-server` to simulate a backend data store.

### 4. UI Frameworks
- **Angular Material**: Enhances form fields, buttons, and layout.
- **PrimeNG**: Provides UI components such as tables, dialogs, and notifications.

### 5. Change Detection Strategy
- **ChangeDetectionStrategy.OnPush** is applied to improve performance by reducing unnecessary change detection cycles.

### 6. Validation and Error Handling
- Form validation ensures all required fields are filled before submission.
- Displays relevant error messages to guide users.

## Installation and Setup
### Prerequisites
- Node.js & npm
- Angular CLI installed globally (`npm install -g @angular/cli`)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/recipe-sharing-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd recipe-sharing-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the mock backend:
   ```sh
   json-server --watch db.json --port 3000
   ```
5. Run the application:
   ```sh
   ng serve
   ```
6. Open the application in a browser:
   ```sh
   http://localhost:4200/
   ```

## Future Enhancements
- Implement user authentication for personalized recipe management.
- Add real backend integration (e.g., Firebase, Node.js API).
- Enhance UI with animations and better accessibility features.

## License
This project is open-source and free to use.

