# BuildFlow – Drag-and-Drop Website Builder

## 🧱 Architecture

BuildFlow is structured with a modular and scalable architecture to facilitate ease of maintenance and future enhancements. The core components include:

- **Component Palette (Sidebar):** A collection of draggable UI elements such as text blocks, images, and buttons.
- **Canvas (Main Workspace):** The primary area where users can drop and arrange components to build their website layout.
- **Properties Panel:** Allows users to configure and customize properties of selected components, such as text content, colors, and styles.
- **Component Schema (`components.json`):** Defines the available components and their default properties, facilitating easy addition of new elements.

The application leverages React's component-based architecture, ensuring each part of the builder is encapsulated and reusable.

## 🛠️ Tools & Technologies

- **React with TypeScript:** Provides a robust framework with type safety for building interactive UIs.
- **Tailwind CSS:** Enables rapid styling with utility-first CSS classes, ensuring a responsive design.
- **Vite:** Offers a fast development server and optimized production builds.
- **HTML5 Drag and Drop API:** Implements native drag-and-drop functionality without external dependencies.
- **React Context API:** Manages global state efficiently across components.
- **Vercel:** Hosts the live demo with seamless CI/CD integration.

## ✨ Key Features

- **Drag-and-Drop Interface:** Users can drag elements from the sidebar and drop them onto the canvas to build their website layout.
- **Starter Templates:** Provides predefined templates to help users kickstart their website design.
- **Responsive Design:** Ensures the builder and resulting websites are responsive across various devices.
- **Enhanced User Experience:** Offers an intuitive interface with real-time updates and easy customization options.
- **Sharable Link Feature:** Implemented a feature to generate sharable links for created websites. While this feature is currently under development due to hosting constraints, the groundwork has been laid for future completion.

## 🚀 Approach

For this project, I approached the task as an opportunity to create a fully functional and intuitive website builder, not just as an assignment but as a portfolio-enhancing project. I aimed to provide a high-quality user experience with the following considerations:

- **Drag-and-Drop Functionality:** I used the HTML5 Drag and Drop API to allow seamless interaction between the component palette and the main canvas. This was achieved by handling drag events and updating the canvas with components dynamically.
  
- **Component Customization:** While users can drag and place components, I also made sure that each element could be customized through a properties panel. This panel allows real-time editing of attributes like text, colors, and alignment.

- **Responsive Design:** Tailwind CSS was used to ensure that the builder itself, along with the websites created, is fully responsive across different screen sizes. This also ensures that users have a consistent experience regardless of the device they're using.

- **Scalability & Future Enhancements:** The system was built with scalability in mind. The component structure and overall design are flexible enough to allow for adding new templates, elements, and features in the future.

- **Sharable Links:** A sharable link feature was also developed, allowing users to share their created websites. This feature is currently under development, with the process in place but hindered by hosting constraints.

I treated this as a real-world project, focusing on providing an intuitive and polished product. The goal was to not just fulfill the assignment requirements but to create something that could potentially be expanded and integrated into a larger platform in the future.

## 🌐 Demo Link

You can view the live demo of the project here:

[BuildFlow Demo](https://build-flow-one.vercel.app/)

