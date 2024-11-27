"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import CustomInput from "./common/CustomInput";
import Swal from "sweetalert2";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Form: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateInput = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim())
          return `${name === "firstName" ? "First" : "Last"} name is required.`;
        if (value.length < 2)
          return `${
            name === "firstName" ? "First" : "Last"
          } name must be at least 2 characters.`;
        return "";

      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/\S+@\S+\.\S+/.test(value))
          return "Please enter a valid email address.";
        return "";

      case "password":
        if (!value.trim()) return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters.";
        return "";

      case "confirmPassword":
        if (!value.trim()) return "Confirm password is required.";
        if (value !== form.password) return "Passwords do not match.";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validateInput(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors: FormErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateInput(key, form[key as keyof FormData]);
      if (error) formErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);

      return;
    }
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    console.log("Form Submitted Successfully! \n", form);
    Swal.fire({
      title: "Form Submitted!",
      text: "Thank you for your submission.",
      icon: "success",
      confirmButtonText: "Close",
      confirmButtonColor: "#000",
    });
  };
  return (
    <div className="flex w-full justify-center py-20 px-5">
      <div className="min-h-[600px] max-w-[700px] bg-white shadow-xl w-full p-6">
        <h2 className="text-center leading-[150%] text-4xl font-medium mt-3">
          Form
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="firstName">First Name</label>
            <div className="mb-1 w-full">
              <CustomInput
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="lastName">Last Name</label>
            <div className="mb-1 w-full">
              <CustomInput
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <div className="mb-1 w-full">
              <CustomInput
                type="text"
                placeholder="Enter Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password</label>
            <div className="mb-1 w-full">
              <CustomInput
                type="password"
                placeholder="Enter Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="mb-1 w-full">
              <CustomInput
                type="password"
                placeholder="Enter Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 border border-solid border-gray-200 w-fit duration-300 ease-linear transition-all hover:scale-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
