"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import UserForm from "./UserForm";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
}

type ViewData = Partial<User>;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("/api/getUsers").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [viewData, setViewData] = useState<ViewData>({});

  const handleOpenAddModal = () => {
    setIsModalOpenAdd(true);
  };

  const handleCloseAddModal = () => {
    setIsModalOpenAdd(false);
  };

  const handleOpenEditModal = (user: User) => {
    setViewData(user);
    setIsModalOpenEdit(true);
  };

  const handleCloseEditModal = () => {
    setIsModalOpenEdit(false);
  };

  const handleAddFormSubmit = async (formData: UserFormData) => {
    try {
      const response = await fetch("/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User added successfully");
        const updatedUsers = await axios.get("/api/getUsers");
        setUsers(updatedUsers.data);
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
    handleCloseAddModal();
  };

  const handleEditFormSubmit = async (formData: User) => {
    try {
      const response = await fetch("/api/updateUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User updated successfully");
        const updatedUsers = await axios.get("/api/getUsers");
        setUsers(updatedUsers.data);
      } else {
        console.error("Failed to edit user");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
    handleCloseEditModal();
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`/api/deleteUser/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("User deleted successfully");
        setUsers(users.filter(user => user.id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="p-4">
      <a
        className="btn btn-active btn-primary float-end"
        onClick={handleOpenAddModal}
      >
        + Add New User
      </a>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-pin-rows">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <a
                    className="btn btn-outline btn-primary mr-2"
                    onClick={() => handleOpenEditModal(user)}
                  >
                    Edit
                  </a>
                  <a
                    className="btn btn-outline btn-error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpenAdd} onClose={handleCloseAddModal}>
        <UserForm onSubmit={handleAddFormSubmit} />
      </Modal>
      <Modal isOpen={isModalOpenEdit} onClose={handleCloseEditModal}>
        <UserForm onSubmit={handleEditFormSubmit} viewData={viewData} />
      </Modal>
    </div>
  );
};

export default UserList;
