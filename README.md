# Covid-19 Dashboard

## Description
The **Covid-19 Dashboard** is a React-based application designed to provide updated and detailed information about the Covid-19 pandemic in India. The app fetches data from an internal server and displays key statistics about Covid-19 cases, including confirmed, active, recovered, and deceased cases, both for the country and for individual states and union territories. 

The app demonstrates the use of React class components, component lifecycle methods, routing, and responsiveness for an optimal user experience.

---

## Features

### General Functionality:
- **Routing**: Users can navigate between Home, About, and a State-specific route using links in the Navbar.
- **Responsiveness**: Fully responsive design for desktop, tablet, and mobile views using media queries.
- **Not Found Page**: Handles invalid URLs by redirecting to a custom 404 page.

### Home Page:
- Displays the stats of **Confirmed**, **Active**, **Recovered**, and **Deceased** cases for India.
- Shows a list of states/UTs with respective Covid-19 case details.
- Allows sorting states/UTs alphabetically in ascending or descending order.
- Case-insensitive search functionality to filter states/UTs by name.

### State-Specific Page:
- Displays detailed statistics for a selected state, including district-wise data.
- Presents a bar graph showing trends for the last 10 days of Covid-19 cases.
- Allows sorting of districts by Confirmed, Active, Recovered, or Deceased cases.

### About Page:
- Fetches and displays FAQs and other informative content about Covid-19.

### Header:
- Navigation links for Home and About pages.
- Clicking the app title navigates to the Home page.

### Footer:
- A footer component is displayed consistently across all pages.

---

## Technologies Used
- **React.js**: Core framework for building the UI.
- **React Router**: For navigation and routing between pages.
- **Recharts**: To create bar and line charts for Covid-19 trends.
- **CSS/Media Queries**: For responsive design.
- **REST API**: Fetch data from the server.
- **React Icons**: Sorting icons (e.g., `FcGenericSortingAsc`, `FcGenericSortingDesc`).

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd covid19-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and visit `http://localhost:3000` to view the app.

---

## API Endpoints
- **Home Route**: Fetch data for all states/UTs.
- **State-Specific Route**: Fetch detailed data for a particular state, including district-wise data and trends.
- **About Route**: Fetch FAQs and general Covid-19 information.

---

## Design
The application UI follows the design specifications provided in the [Figma file](https://www.figma.com/file/lGl9tRXcsmxicjTITM2A8P/Covid19_Dashboard?node-id=0%3A1).

### Steps to Work with Figma:
1. Create a Figma account as shown in [this video](https://www.youtube.com/watch?v=hrHL2VLMl7g).
2. Export images from Figma using [this guide](https://www.youtube.com/watch?v=NpzL1MONwaw).
3. Upload exported images to [Cloudinary](https://cloudinary.com/) for use in the app.

---

## Testing Guidelines
1. Use the app’s search functionality to filter states/UTs and ensure accurate results.
2. Test sorting functionality with the ascending and descending icons.
3. Verify the responsiveness of the UI on different devices.
4. Navigate to invalid routes to test the 404 Not Found page.

---

## Quick Tips
- To transform object items into an array for easier rendering, refer to [this example](https://codesandbox.io/s/conversion-of-object-items-to-array-items-vyy1s).
- Implement charts using the [Recharts documentation](https://www.npmjs.com/package/recharts).
- For dropdown implementation, refer to the [React Select documentation](https://www.npmjs.com/package/react-select/v/2.4.3).

---

## Important Notes
- Use only the third-party libraries mentioned in the **Quick Tips** section.
- Do not use `styled-components` for styling. Instead, use plain CSS.
- Ensure all undefined case counts are set to `0`.
- Add `testid` attributes for testability in HTML elements, e.g., `<div testid="countryWideConfirmedCases" className="country-wide-confirmed-cases"/>`.

---

## License
This project is licensed under the MIT License.

---

## Contact
For further queries or support, reach out to [Your Name].
