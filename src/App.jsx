import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Dashboard from "./components/dashboard";

const ThankYouScreen = () => (
  <div className="flex flex-col items-center justify-center text-center p-8">
    <div className="text-green-500 text-5xl mb-6">✅</div>
    <h2 className="text-2xl font-bold mb-3">Thank You!</h2>
    <p className="mb-6 text-gray-600">Your feedback is valuable to us.</p>
    <img 
      src="/data_hex_logo.jpg"
      alt="Media One Logo"
      className="w-20 rounded-full shadow-lg"
    />
  </div>
);

const App = () => {
  const [step, setStep] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

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
      setShowThankYou(true);
    } catch (err) {
      alert("Submission failed.");
    }
  };

  const CheckboxQuestion = ({ title, options, field }) => (
    <div>
      <h2 className="text-xl font-bold mb-5 text-gray-800">{title}</h2>
      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt.label}
            className={`flex items-center p-4 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 ${
              formData[field].includes(opt.label) ? 'bg-blue-50' : 'bg-white'
            }`}
          >
            <input
              type="checkbox"
              checked={formData[field].includes(opt.label)}
              onChange={() => handleCheckboxChange(opt.label, field)}
              className="mr-3 h-5 w-5 accent-blue-500"
            />
            <span className="text-md font-medium">{opt.icon} {opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const buttonClasses = "px-6 py-3 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-200";

  return (
    <div className={`min-h-screen p-6 bg-gray-50 ${showDashboard ? '' : 'flex items-center justify-center'}`}>
      <div className={`rounded-xl shadow-xl ${showDashboard ? 'w-full bg-transparent p-0' : 'bg-white p-8 w-full max-w-3xl'}`}>
        {showDashboard ? (
          <Dashboard />
        ) : showThankYou ? (
          <ThankYouScreen />
        ) : (
          <>
            {step === 0 && (
              <div className="text-center flex flex-col items-center justify-center gap-8">
                <img 
                  src="/data_hex_logo.jpg" 
                  alt="Logo" 
                  className="mx-auto mb-4 w-36 shadow-xl rounded-full animate-pulse" 
                />
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Media One Survey</h1>
                <p className="text-gray-600 mb-6">Please take a moment to share your feedback with us</p>
                <button 
                  onClick={() => setStep(1)} 
                  className={`${buttonClasses} bg-blue-500 hover:bg-blue-600`}
                >
                  Start Survey
                </button>
                <button 
                  onClick={() => setShowDashboard(true)} 
                  className={`${buttonClasses} bg-green-500 hover:bg-green-600 mt-4`}
                >
                  Go to Dashboard
                </button>
              </div>
            )}

            {step === 1 && (
              <div>
                <CheckboxQuestion title={questions.platform} options={options.platform} field="platform" />
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={() => setStep(0)} 
                    className={`${buttonClasses} bg-gray-400 hover:bg-gray-500`}
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(2)} 
                    className={`${buttonClasses} bg-blue-500 hover:bg-blue-600`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <CheckboxQuestion title={questions.programs} options={options.programs} field="programs" />
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={() => setStep(1)} 
                    className={`${buttonClasses} bg-gray-400 hover:bg-gray-500`}
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)} 
                    className={`${buttonClasses} bg-blue-500 hover:bg-blue-600`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <CheckboxQuestion title={questions.content} options={options.content} field="content" />
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={() => setStep(2)} 
                    className={`${buttonClasses} bg-gray-400 hover:bg-gray-500`}
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(4)} 
                    className={`${buttonClasses} bg-green-600 hover:bg-green-700`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-gray-800">Your Details</h2>
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow-md p-3 mb-5 w-full rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                />

                <label className="block mb-2 font-medium text-gray-700">Phone Number</label>
                <div className="flex gap-3 mb-3">
                  <select
                    onChange={handleCountryCodeChange}
                    value={formData.countryCode.value}
                    className="shadow-md p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-blue-300 outline-none"
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
                    className="shadow-md p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mb-4">{errors.phoneNumber}</p>
                )}

                <div className="flex justify-between mt-6">
                  <button 
                    onClick={() => setStep(3)} 
                    className={`${buttonClasses} bg-gray-400 hover:bg-gray-500`}
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    className={`${buttonClasses} bg-purple-600 hover:bg-purple-700`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;