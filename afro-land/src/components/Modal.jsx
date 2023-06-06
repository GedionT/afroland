import React, { useState } from "react";
import axios from "axios";

const Modal = ({ onClose, showToast }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+251",
    ageGroup: "",
    profession: "",
  });

  // const [showToast, setShowToast] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate the input field
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleClose = async () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    Object.keys(formData).forEach((name) => {
      const value = formData[name];
      const error = validateField(name, value);
      if (error) {
        errors[name] = error;
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form is valid, proceed with submission
      // console.log("Form is valid. Submitting...");
      // console.log("data is ", formData);

      try {
        const response = await axios.post(
          "https://sheet.best/api/sheets/f660f8f0-6dd5-459b-a6e1-8cf8467ed7a5",
          formData
        );

        // console.log("Form data submitted successfully:", response.data);

        // Reset the form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "251",
          ageGroup: "",
          profession: "",
        });
        // await handleClose();
        // await setShowToast(true);
        showToast();
        handleClose();
      } catch (error) {
        // console.error("Error submitting form data:", error);
      }
    } else {
      // Form has errors, display them to the user
      // console.log("Form has errors. Please fix them.");
    }
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName" && value.trim() === "") {
      error = "First name is required.";
    } else if (name === "lastName" && value.trim() === "") {
      error = "Last name is required.";
    } else if (name === "email" && !isValidEmail(value)) {
      error = "Invalid email address.";
    } else if (name === "phone" && !isValidPhone(value)) {
      error = "Invalid phone number.";
    } else if (name === "ageGroup" && value === "") {
      error = "Please select an age group.";
    } else if (name === "profession" && value.trim() === "") {
      error = "Profession is required.";
    }

    return error;
  };

  const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    return emailPattern.test(email);
  };

  const isValidPhone = (phone) => {
    // Regular expression pattern for phone number validation
    const phonePattern = /^\+251\d{9}$/;

    // Check if the phone number matches the pattern
    return phonePattern.test(phone);
  };
  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.15)", // Change the opacity or color as needed
  };

  return (
    <div style={overlayStyles}>
      <div className="fixed inset-0 flex items-center justify-center z-[100] bg-inherit">
        <div
          className="rounded-lg shadow w-96 bg-black"
          style={{ color: "white", backgroundColor: "#374151" }}
        >
          <div className="p-8 overflow-auto md:max-h-fit max-h-96">
            <h2 className="text-lg font-semibold mb-6">
              ✨✨✨ Join The Waitlist ✨✨✨
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block mb-1 text-sm font-medium text-gray-200"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Your first name"
                  className={`max-w-xs bg-gray-50 border ${
                    formErrors.firstName ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  onChange={handleInputChange}
                  value={formData.firstName}
                  required
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block mb-1 text-sm font-medium text-gray-200"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Your last name"
                  className={`max-w-xs bg-gray-50 border ${
                    formErrors.lastName ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  onChange={handleInputChange}
                  value={formData.lastName}
                  required
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-200"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  className={`max-w-xs bg-gray-50 border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm font-medium text-gray-200"
                >
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your phone number"
                  className={`max-w-xs bg-gray-50 border ${
                    formErrors.phone ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  onChange={handleInputChange}
                  value={formData.phone}
                  required
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ageGroup"
                  className="block mb-1 text-sm font-medium text-gray-200"
                >
                  Age Group:
                </label>
                <select
                  id="ageGroup"
                  name="ageGroup"
                  className={`max-w-xs bg-gray-50 border ${
                    formErrors.ageGroup ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  onChange={handleInputChange}
                  value={formData.ageGroup}
                  required
                >
                  <option value="">Select an age group</option>
                  <option value="under18">Under 18</option>
                  <option value="18to30">18 to 30</option>
                  <option value="31to40">31 to 40</option>
                  <option value="41to50">41 to 50</option>
                  <option value="over50">Over 50</option>
                </select>
                {formErrors.ageGroup && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.ageGroup}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profession"
                  className="block mb-1 text-sm font-medium text-gray-200"
                >
                  Profession:
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  placeholder="Your profession"
                  className={`max-w-xs bg-gray-50 border ${
                    formErrors.profession ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  onChange={handleInputChange}
                  value={formData.profession}
                  required
                />
                {formErrors.profession && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.profession}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
