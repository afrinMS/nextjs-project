import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface UserFormProps {
  onSubmit: (formData: UserFormData | User) => void;
  viewData?: ViewData;
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
}

interface User extends UserFormData {
  id: number;
}

interface ViewData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, viewData }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: viewData?.name || "",
    email: viewData?.email || "",
    phone: viewData?.phone || "",
  });

  useEffect(() => {
    if (viewData) {
      setFormData({
        name: viewData.name || "",
        email: viewData.email || "",
        phone: viewData.phone || "",
      });
    }
  }, [viewData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(viewData?.id ? { ...formData, id: viewData.id } : formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="phone" className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;
