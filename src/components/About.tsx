import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="about">
      <p>
        This is a task-tracker client demo app built with React and TypeScript.{" "}
        <Link to="/">Go Back</Link>
      </p>
    </section>
  );
}
