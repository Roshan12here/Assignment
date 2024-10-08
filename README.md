Project Documentation
Overview

This project is built using Next.js, a powerful React framework, along with Tailwind CSS for styling and ShadcnUI for UI components. It features a simple and responsive layout that pulls student data from a public API and displays it on the page.
Technologies Used

    Next.js: React framework for building optimized and scalable web applications with server-side rendering (SSR) and static site generation (SSG).
    Tailwind CSS: Utility-first CSS framework to create responsive designs efficiently.
    ShadcnUI: A customizable and modern UI component library, seamlessly integrated into the project.

Folder Structure

The project follows a modular folder structure, ensuring ease of navigation and scalability:

    components/ui/: This directory contains all UI components imported from ShadcnUI, which are highly customizable to meet the project’s needs.

    components/Navbar.tsx: Contains the Header component, which manages the navigation and branding for the website.

    components/MainContent.tsx: Contains the Main Content of the page, displaying the core data and functionality. The student data is fetched and rendered in this component.

    app/page.tsx: The Home Page of the application, where the Navbar and MainContent components are combined to display the content in a cohesive layout.

Data Source

The student data displayed in the application is fetched from a public API, which serves as a simple backend to demonstrate real-world data fetching and rendering in the frontend.
Project Deployment

The project is deployed using Vercel, which is a hosting platform optimized for Next.js applications, ensuring fast performance, automatic scaling, and seamless integration with GitHub for continuous deployment.


How to Run Locally

To run this project locally, follow these steps:

    Clone the repository:
    git clone  https://github.com/Roshan12here/Assignment.git

Navigate into the project directory:
cd your-repo-name

Install dependencies:
npm install

Start the development server:
npm run dev


Open your browser and navigate to http://localhost:3000.

Customization and Scalability

    All components from ShadcnUI are fully customizable, allowing you to easily modify styles and functionality as per the project requirements.
    Tailwind CSS provides a robust design system, making the UI scalable and responsive across different screen sizes.
    Next.js ensures a modern development experience with server-side rendering (SSR), static site generation (SSG), and built-in routing.
#   A s s i g n m e n t  
 