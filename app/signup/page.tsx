'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Country: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSubmitted(true);
    fetch("https://script.google.com/macros/s/AKfycbwVtV82qHEPbaA068FZyGUFBnrp1Y13qII6Z-E3X3DXtOpiFOEcIBpIEAyvQQoHHCQBUQ/exec", {
      method: "POST",
      body: new URLSearchParams(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        router.push("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitted(false);
      });
  };

  return (
    <div className="w-screen flex flex-col items-center h-screen bg-white">
      <div className="flex justify-center w-full my-12">
        <Image
          src="/stamp.png"
          alt="Hero Image"
          width={100}
          height={100}
          className="cover"
        />
      </div>
      <div className="rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign up to stay posted</h1>
        <p className="text-center mb-8">We'll send you updated and let you know when we release the app</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="sr-only" htmlFor="name">Name</label>
            <input
              className="border-b-2 border-gray-300 focus:outline-none focus:border-black p-2"
              type="text"
              id="name"
              name="Name"
              placeholder="Name"
              value={formData.Name}
              onChange={handleChange}
              required
              disabled={submitted}
            />
          </div>
          <div className="flex flex-col">
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              className="border-b-2 border-gray-300 focus:outline-none focus:border-black p-2"
              type="email"
              id="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              disabled={submitted}
            />
          </div>
          <div className="flex flex-col">
            <label className="sr-only" htmlFor="country">Country</label>
            <input
              className="border-b-2 border-gray-300 focus:outline-none focus:border-black p-2"
              type="text"
              id="country"
              name="Country"
              placeholder="Country"
              value={formData.Country}
              onChange={handleChange}
              required
              disabled={submitted}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-full text-xl ${submitted ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            disabled={submitted}
          >
            {submitted ? "Thanks!" : "Continue"}
          </button>
        </form>
        <p className="text-xs text-center mt-4">
          Joining means you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
