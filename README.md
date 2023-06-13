<h1>Birthday Reminder</h1>
Company Birthday Reminder is a full-stack web application built with <i>TypeScript</i>, <i>Redux Toolkit</i>, <i>Next.js</i>, <i>MongoDB</i>, and <i>Tailwind CSS</i>. It allows users to register and create companies, add employees to those companies along with their personal data and birthdates. The application also sends email notifications to the company owner if any of their employees have a birthday on the current day.

<h2>Key Features</h2>
<ol>
  <li>User Registration:
    <ul>
      <li>Users can sign up and create an account.</li>
    </ul>
  </li>
  <li>Authentication and Authorization:
    <ul>
      <li>JWT tokens are used for authentication.</li>
      <li>Each user can only access and modify their own data.</li>
      <li>Requests regarding another user's companies or employees are not permitted.</li>
    </ul>
  </li>
   <li>Company Creation:
    <ul>
      <li>Authenticated users can create companies.</li>
      <li>Each company has a name and can have multiple employees.</li>
    </ul>
  </li>
  <li>Employee Management:
   <ul>
      <li>Users can add, remove employees to the companies they have created.</li>
      <li>Employees have personal data, including name and birthdate.</li>
    </ul>
  </li>
  <li>Birthday Notifications:
    <ul>
      <li>The application automatically checks for employee birthdays every day.</li>
      <li>If any employee in a user's company has a birthday on the current day, the user receives an email notification.</li>
    </ul>
  </li>
</ol>
<h2>Technologies Used</h2>
<ul>
  <li>
    <b>TypeScript</b>: A statically-typed superset of JavaScript that enables building robust and scalable applications.
  </li>
  </br>
  <li>
    <b>Next.js</b>: Next.js is a React framework used for server-side rendering (SSR) and building optimized web applications. It provides features such as routing, server-side rendering, and API routes.
  </li>
  </br>
  <li>
    <b>MongoDB</b>: MongoDB is a NoSQL database used to store and manage application data. It provides flexibility and scalability, making it suitable for handling various types of data.
  </li>
  </br>
  <li>
    <b>JWT(Json Web Token)</b>: JWT is used for authentication and authorization in the application. It enables secure transmission of information between parties as a JSON object.
  </li>
  </br>
  <li>
    <b>Tailwind CSS</b>: Tailwind CSS is a utility-first CSS framework that allows for rapid UI development. It provides a set of pre-defined utility classes that can be used to style components.
  </li>
</ul>
