import React, { useState } from "react";

const Modal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ageGroup: "",
    profession: "",
  });

 
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: fix the api url
    try {
        const response = await fetch("https://example.com/api/save-to-excel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        // TODO: handle successful response
        onClose();
    
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }

    
  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-blue-100 rounded-lg shadow-lg p-6 w-128">
        <button type="button" className="relative top-0 left-0 m-4 text-gray-600" onClick={handleClose}>
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Get Started</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex">
            <div className="flex-1 mr-2">
              <label htmlFor="firstName" className="block mb-2 font-bold">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-400 p-2 rounded"
                required
              />
            </div>
            <div className="flex-2">
              <label htmlFor="lastName" className="block mb-2 font-bold">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Your father's name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-400 p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-400 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 font-bold">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-400 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ageGroup" className="block mb-2 font-bold">
              Age Group
            </label>
            <select
              id="ageGroup"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleInputChange}
              className="w-full border border-gray-400 p-2 rounded"
              required
            >
              <option value="">Select an age group</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55+">55+</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="profession" className="block mb-2 font-bold">
              Profession
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              placeholder="What do you do for a living"
              value={formData.profession}
              onChange={handleInputChange}
              className="w-full border border-gray-400 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Submit
            </button>
            <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Modal;