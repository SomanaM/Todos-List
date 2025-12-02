import React from 'react';

const About = () => {
  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-3">About This App</h2>

        <p className="lead text-muted">
          Welcome to the <strong>Todo Manager App!</strong>
        </p>

        <p>
          This application is designed to help you stay organized, productive, 
          and in control of your daily tasks. Whether you need to remember 
          important work, track your progress, or simply keep a list of things to do — 
          this app makes everything simple.
        </p>

        <h5 className="mt-3">✨ What You Can Do</h5>
        <ul>
          <li>Add new tasks anytime</li>
          <li>Mark tasks as completed</li>
          <li>Delete tasks you no longer need</li>
          <li>View all your saved todos in one place</li>
          <li>Organize your workflow with a clean and simple interface</li>
        </ul>

        <p className="mt-4">
          Our goal is to provide a smooth and user-friendly experience that 
          helps you manage your day more efficiently.
        </p>

        <p className="fw-semibold text-center mt-3">
          Thank you for using our Todo App — stay organized, stay productive!
        </p>
      </div>
    </div>
  );
};

export default About;
