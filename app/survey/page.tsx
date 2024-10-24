"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Survey() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    travelFrequency: "",
    favoriteDestinations: "",
    message: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="max-w-max md:max-w-3xl px-8">
        <main className="flex flex-col items-start w-full py-12">
          <header className="w-full pt-6 px-8 sm:px-20 mb-12 flex justify-start relative">
            <Link href="/">
              <Image
                src="/stamp.png"
                alt="Hero Image"
                width={100}
                height={100}
                className="cover"
              />
            </Link>
          </header>
          <section className="w-full">
            <h1 className="text-4xl font-bold mb-6">Piclo Survey</h1>
            <p className="text-lg mb-6">
              We would appreciate your feedback. Please fill out the form below with your details and preferences.
            </p>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="age">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="travelFrequency">
                  How often do you travel?
                </label>
                <select
                  id="travelFrequency"
                  name="travelFrequency"
                  value={formData.travelFrequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select an option</option>
                  <option value="frequently">Frequently</option>
                  <option value="occasionally">Occasionally</option>
                  <option value="rarely">Rarely</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="favoriteDestinations">
                  What are your favorite travel destinations?
                </label>
                <input
                  type="text"
                  id="favoriteDestinations"
                  name="favoriteDestinations"
                  value={formData.favoriteDestinations}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-bold mb-2" htmlFor="message">
                  Additional Feedback / Questions
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-500"
              >
                Submit
              </button>
            </form>
          </section>
        </main>
        <footer className="w-full px-20 py-4 text-center space-x-6 font-medium sm:text-left">
          <Link href="/story">Our Story</Link>
          <Link href="/support">Support</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </footer>
      </div>
    </div>
  );
}
