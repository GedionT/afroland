import React, { useState } from "react";
import axios from "axios";

const Modal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+251",
    ageGroup: "",
    profession: "",
  });

  const [showToast, setShowToast] = useState(true);
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
      console.log("Form is valid. Submitting...");
      console.log("data is ", formData);

      try {
        const response = await axios.post(
          "https://sheet.best/api/sheets/f660f8f0-6dd5-459b-a6e1-8cf8467ed7a5",
          formData
        );

        console.log("Form data submitted successfully:", response.data);

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
        await setShowToast(true);
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    } else {
      // Form has errors, display them to the user
      console.log("Form has errors. Please fix them.");
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-inherit">
      {showToast && (
        <div
          className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-8 max-w-xs bg-green-500 text-sm text-white rounded-md shadow-lg"
          role="alert"
        >
          <div className="flex p-4 text-lg">
            Added Successfully
            <div className="ml-auto">
              <button
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-white/[.5] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-green-500 transition-all text-sm dark:focus:ring-offset-green-500 dark:focus:ring-green-700"
                onClick={() => setShowToast(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3.5 h-3.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="rounded-lg shadow w-96"
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
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
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
                <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
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
  );
};

export default Modal;
