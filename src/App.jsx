
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    platform: [],
    programs: [],
    content: [],
    name: "",
    countryCode: { value: "+973", label: "Bahrain (+973)" },
    phoneNumber: ""
  });
  const [errors, setErrors] = useState({});

  const questions = {
    platform: "Which platforms do you use to watch Media One?",
    programs: "What programs do you watch in Media One?",
    content: "Which content do you like most?"
  };

  const options = {
    platform: [
      { label: "Home TV", icon: "🏠" },
      { label: "Youtube", icon: "▶️" },
      { label: "Social Media", icon: "📢" },
      { label: "eVision", icon: "📺" }
    ],
    programs: [
      { label: "Middle East Hour", icon: "🕒" },
      { label: "Out of focus", icon: "🔍" },
      { label: "Weekend Arabia", icon: "🌍" },
      { label: "Media Scan", icon: "📰" },
      { label: "World with us", icon: "🌐" }
    ],
    content: [
      { label: "Gulf Related General", icon: "🛢️" },
      { label: "Tech", icon: "💻" },
      { label: "Innovative", icon: "💡" },
      { label: "Sensational", icon: "🔥" }
    ],
    countries: [
      { value: "+973", label: "Bahrain (+973)" },
      { value: "+965", label: "Kuwait (+965)" },
      { value: "+968", label: "Oman (+968)" },
      { value: "+974", label: "Qatar (+974)" },
      { value: "+966", label: "Saudi Arabia (+966)" },
      { value: "+971", label: "UAE (+971)" }
    ]
  };

  const handleCheckboxChange = (label, field) => {
    const current = formData[field];
    if (current.includes(label)) {
      setFormData({ ...formData, [field]: current.filter((v) => v !== label) });
    } else {
      setFormData({ ...formData, [field]: [...current, label] });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (e) => {
    const selected = options.countries.find((c) => c.value === e.target.value);
    setFormData({ ...formData, countryCode: selected });
  };

  const validatePhone = () => {
    const phoneRegex = /^\d{8,9}$/;
    if (!formData.phoneNumber.match(phoneRegex)) {
      setErrors({ phoneNumber: "Phone number must be 8–9 digits" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async () => {
    if (!validatePhone()) return;

    const qa = {
      [questions.platform]: formData.platform,
      [questions.programs]: formData.programs,
      [questions.content]: formData.content
    };

    try {
      const payload = {
        ...formData,
        questions: qa,
        mobile: `${formData.countryCode.value}${formData.phoneNumber}`,
        country: formData.countryCode.label.split(" ")[0]
      };

      await axios.post("http://localhost:5000/api/submit", payload);
      alert("Submitted successfully!");
    } catch (err) {
      alert("Submission failed.");
    }
  };

  const CheckboxQuestion = ({ title, options, field }) => (
    <div>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt.label}
            className="flex items-center p-3 border rounded-lg cursor-pointer shadow-sm hover:bg-gray-100"
          >
            <input
              type="checkbox"
              checked={formData[field].includes(opt.label)}
              onChange={() => handleCheckboxChange(opt.label, field)}
              className="mr-3"
            />
            <span className="text-md">{opt.icon} {opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        {step === 0 && (
          <div className="text-center flex flex-col items-center justify-center gap-6">
            <img src="/data_hex_logo.jpg" alt="Logo" className="mx-auto mb-4 w-32 shadow-lg border-1 border-gray-500 rounded-full animate-pulse" />
            <button onClick={() => setStep(1)} className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Start
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <CheckboxQuestion
              title={questions.platform}
              options={options.platform}
              field="platform"
            />
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(0)} className="bg-green-500 text-white px-4 py-2 rounded">
                Back
              </button>
              <button onClick={() => setStep(2)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <CheckboxQuestion
              title={questions.programs}
              options={options.programs}
              field="programs"
            />
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="bg-green-500 text-white px-4 py-2 rounded">
                Back
              </button>
              <button onClick={() => setStep(3)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <CheckboxQuestion
              title={questions.content}
              options={options.content}
              field="content"
            />
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(2)} className="bg-green-500 text-white px-4 py-2 rounded">
                Back
              </button>
              <button onClick={() => setStep(4)} className="bg-green-600 text-white px-4 py-2 rounded">
                Completed
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Your Details</h2>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 mb-3 w-full rounded"
            />

            <label className="block mb-1 font-medium">Phone Number</label>
            <div className="flex gap-2 mb-3">
              <select
                onChange={handleCountryCodeChange}
                value={formData.countryCode.value}
                className="border p-2 rounded w-1/2"
              >
                {options.countries.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="8–9 digit number"
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mb-2">{errors.phoneNumber}</p>
            )}

            <div className="flex justify-between">
              <button onClick={() => setStep(3)} className="bg-green-500 text-white px-4 py-2 rounded">
                Back
              </button>
              <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
