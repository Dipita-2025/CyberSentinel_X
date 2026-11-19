import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from "../../components/ui";
import LoginForm from "../../features/auth/components/LoginForm";

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-primary-text flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">CyberSentinel</h1>

      <p className="text-muted text-center">
        Secure Application Access Control System
      </p>

      <Link
        to="/login"
        className="rounded-lg bg-accent px-6 py-3 font-medium text-white transition hover:opacity-90"
      >
        Get Started
      </Link>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Application"
        description="Enter the application details."
      >
        <p className="text-primary-text">Modal content goes here.</p>
      </Modal>

      <LoginForm />
    </main>
  );
};

export default Landing;
