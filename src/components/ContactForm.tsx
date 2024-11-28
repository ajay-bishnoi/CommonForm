"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "./common/CustomInput";
import Swal from "sweetalert2";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const ContactForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [submittedData, setSubmittedData] = React.useState<FormData[]>([]);
  const [updateData, setUpdateData] = React.useState<number | null>(null);

  const validateConfirmPassword = (value: string) => {
    if (value !== getValues("password")) return "Passwords do not match.";
    return true;
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted Successfully! \n", data);
    Swal.fire({
      title: updateData ? "Data Updated!" : "Form Submitted!",
      text: "Thank you for your submission.",
      icon: "success",
      confirmButtonText: "Close",
      confirmButtonColor: "#000",
    });

    reset();

    if (updateData !== null) {
      setSubmittedData((prev) =>
        prev.map((item, index) => (index === updateData ? data : item))
      );
      setUpdateData(null);
    } else {
      setSubmittedData((prev) => [...prev, data]);
    }
  };

  const handleUpdate = (index: number) => {
    setUpdateData(index);
    const data = submittedData[index];
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("email", data.email);
    setValue("password", data.password);
    setValue("confirmPassword", data.confirmPassword);
  };

  const handleDelete = (index: number) => {
    setSubmittedData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full justify-center py-20 px-5 items-center">
      <div className="min-h-[600px] max-w-[700px] bg-white shadow-xl w-full p-6">
        <h2 className="text-center leading-[150%] text-4xl font-medium">
          Form
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName">First Name</label>
            <div className="w-full relative">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="text"
                    placeholder="Enter First Name"
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                )}
                rules={{
                  required: "First name is required.",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters.",
                  },
                }}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm absolute -bottom-5 left-0">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Last Name</label>
            <div className="w-full relative">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="text"
                    placeholder="Enter Last Name"
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                )}
                rules={{
                  required: "Last name is required.",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters.",
                  },
                }}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm absolute -bottom-5 left-0">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <div className="w-full relative">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="email"
                    placeholder="Enter Email"
                    className={errors.email ? "border-red-500" : ""}
                  />
                )}
                rules={{
                  required: "Email is required.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address.",
                  },
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm absolute -bottom-5 left-0">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <div className="w-full relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    placeholder="Enter Password"
                    className={errors.password ? "border-red-500" : ""}
                  />
                )}
                rules={{
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-sm absolute -bottom-5 left-0">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="w-full relative">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    placeholder="Enter Confirm Password"
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                )}
                rules={{
                  required: "Confirm password is required.",
                  validate: validateConfirmPassword,
                }}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm absolute -bottom-5 left-0">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 border border-solid border-gray-200 w-fit duration-300 ease-linear transition-all hover:scale-90"
            >
              {updateData !== null ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {submittedData.length > 0 && (
        <div className="mt-10 w-full max-w-[1000px] shadow-xl p-6">
          <h3 className="text-2xl font-medium mb-4">Form Data</h3>
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 text-nowrap px-4 py-2">
                  First Name
                </th>
                <th className="border border-gray-300 text-nowrap px-4 py-2">
                  Last Name
                </th>
                <th className="border border-gray-300 text-nowrap px-4 py-2">
                  Email
                </th>
                <th className="border border-gray-300 text-nowrap px-4 py-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {data.firstName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleUpdate(index)}
                      className="bg-blue-500 text-white border border-solid px-3 py-1.5 border-blue-500 me-3"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white border border-solid px-3 py-1.5 border-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
