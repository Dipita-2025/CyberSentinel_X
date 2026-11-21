import { useState } from "react";
import { Input, Textarea, Button } from "../../../components/ui";

const ApplicationForm = ({ onSubmit, applications = [], loading = false }) => {
  const [formData, setFormData] = useState({
    app_name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    const trimmedName = formData.app_name.trim();

    if (!trimmedName) {
      newErrors.app_name = "Application name is required.";
    } else {
      const duplicate = applications.some(
        (app) =>
          app.app_name?.trim().toLowerCase() === trimmedName.toLowerCase(),
      );

      if (duplicate) {
        newErrors.app_name = "An application with this name already exists.";
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.({
      app_name: trimmedName,
      description: formData.description.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Application Name"
        name="app_name"
        placeholder="Enter application name"
        value={formData.app_name}
        onChange={handleChange}
        error={errors.app_name}
        required
        disabled={loading}
      />

      <Textarea
        label="Description"
        name="description"
        placeholder="Describe the application..."
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        rows={4}
        required
        disabled={loading}
      />

      <div className="flex justify-end">
        <Button type="submit" loading={loading} disabled={loading}>
          Create Application
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
