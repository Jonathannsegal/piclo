"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Survey() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    age: "",
    gender: "",
    country: "",
    travelFrequency: "",
    preferredTravelMethod: "",
    travelerType: "",
    destinationType: "",
    tripPlanning: "",
    travelGoal: "",
    culturalExplorationImportance: 3,
    structuredPlans: "",
    stayConnected: "",
    recommendations: "",
    mapBasedApp: "",
    groupPlanning: "",
    appUsageFrequency: "",
    appTypePreference: "",
    inAppPurchases: 3,
    premiumFeatures: "",
    freeTrialImportance: 3,
    techSavvy: 3,
    travelTools: "",
    appFrustrations: "",
    missingFeatures: "",
    recommendationReliability: "",
    offlineFunctionalityIssues: "",
    uiIntuitiveness: "",
    contentTrust: "",
    clutterOverwhelm: "",
    techUsed: "",
    mapBasedAppHelpful: "",
  });

  const [isSurveyExpanded, setIsSurveyExpanded] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const toggleSurveyExpand = () => {
    setIsSurveyExpanded(!isSurveyExpanded);
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

          {/* Account Information Section */}
          <section className="w-full">
            <h1 className="text-4xl font-bold mb-6">Create an Account</h1>
            <p className="text-lg mb-6">
              Creating an account allows you to receive updates and be notified when the app releases.
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
                <label className="block text-lg font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-500 mb-6"
              >
                Create Account
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-gray-600 text-white rounded font-bold hover:bg-gray-500 mb-6 ml-4"
                onClick={toggleSurveyExpand}
              >
                Continue without account
              </button>
            </form>
          </section>

          {/* Survey Section with Expand/Collapse */}
          <section className="w-full">
            <div
              className="flex justify-between items-center cursor-pointer mb-4"
              onClick={toggleSurveyExpand}
            >
              <h2 className="text-3xl font-bold">Survey</h2>
              <span>{isSurveyExpanded ? "▲" : "▼"}</span>
            </div>

            <div className={`w-full ${isSurveyExpanded ? "block" : "hidden"}`}>
              {/* Demographics Section */}
              <h3 className="text-xl font-bold mb-4">Demographics</h3>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="occupation">
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
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
                <label className="block text-lg font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="nonbinary">Non-binary</option>
                  <option value="preferNotToSay">Prefer not to say</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="country">
                  Country of Residence
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select Country</option>
                  <option value="usa">United States</option>
                  <option value="canada">Canada</option>
                  {/* Add more countries as needed */}
                </select>
              </div>

              {/* Lifestyle Questions */}
              <h3 className="text-xl font-bold mb-4">Lifestyle</h3>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="travelFrequency">
                  How often do you travel per year?
                </label>
                <select
                  id="travelFrequency"
                  name="travelFrequency"
                  value={formData.travelFrequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select Frequency</option>
                  <option value="1-3">1-3 times</option>
                  <option value="4-6">4-6 times</option>
                  <option value="7+">7 or more times</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="preferredTravelMethod">
                  Preferred method(s) of travel
                </label>
                <select
                  id="preferredTravelMethod"
                  name="preferredTravelMethod"
                  value={formData.preferredTravelMethod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select method</option>
                  <option value="plane">Plane</option>
                  <option value="car">Car</option>
                  <option value="train">Train</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="travelerType">
                  What type of traveler are you?
                </label>
                <select
                  id="travelerType"
                  name="travelerType"
                  value={formData.travelerType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select type</option>
                  <option value="solo">Solo</option>
                  <option value="group">Group</option>
                  <option value="family">Family</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="destinationType">
                  What types of destinations do you prefer?
                </label>
                <select
                  id="destinationType"
                  name="destinationType"
                  value={formData.destinationType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select destination type</option>
                  <option value="urban">Urban</option>
                  <option value="rural">Rural</option>
                  <option value="beach">Beach</option>
                  <option value="mountain">Mountain</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="tripPlanning">
                  How do you usually plan your trips?
                </label>
                <select
                  id="tripPlanning"
                  name="tripPlanning"
                  value={formData.tripPlanning}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select planning method</option>
                  <option value="agency">Travel agency</option>
                  <option value="online">Online booking</option>
                  <option value="spontaneous">Spontaneous</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="travelGoal">
                  What is your main goal when traveling?
                </label>
                <select
                  id="travelGoal"
                  name="travelGoal"
                  value={formData.travelGoal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select goal</option>
                  <option value="relaxation">Relaxation</option>
                  <option value="adventure">Adventure</option>
                  <option value="cultural">Cultural exploration</option>
                  <option value="work">Work</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="culturalExplorationImportance">
                  How important is exploring local culture and cuisine when you travel? (1-5 scale)
                </label>
                <input
                  type="range"
                  id="culturalExplorationImportance"
                  name="culturalExplorationImportance"
                  value={formData.culturalExplorationImportance}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="structuredPlans">
                  Do you prefer structured itineraries or spontaneous travel plans?
                </label>
                <select
                  id="structuredPlans"
                  name="structuredPlans"
                  value={formData.structuredPlans}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select preference</option>
                  <option value="structured">Structured</option>
                  <option value="spontaneous">Spontaneous</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="stayConnected">
                  How do you stay connected or share your travel experiences?
                </label>
                <select
                  id="stayConnected"
                  name="stayConnected"
                  value={formData.stayConnected}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select method</option>
                  <option value="socialMedia">Social media</option>
                  <option value="blogs">Blogs</option>
                  <option value="privateSharing">Private sharing with friends/family</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="recommendations">
                  How often do you seek recommendations from locals or other travelers during trips?
                </label>
                <select
                  id="recommendations"
                  name="recommendations"
                  value={formData.recommendations}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select frequency</option>
                  <option value="always">Always</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="rarely">Rarely</option>
                </select>
              </div>

              <h3 className="text-xl font-bold mb-4">Value</h3>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="mapBasedApp">
                  Would you use a map-based travel app designed to help discover hidden or lesser-known destinations?
                </label>
                <select
                  id="mapBasedApp"
                  name="mapBasedApp"
                  value={formData.mapBasedApp}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select answer</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="groupPlanning">
                  Would a feature that allows you to plan trips with friends or family directly through the app appeal to you?
                </label>
                <select
                  id="groupPlanning"
                  name="groupPlanning"
                  value={formData.groupPlanning}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select answer</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="appUsageFrequency">
                  How often would you use an app that helps you discover new places to visit based on your current location?
                </label>
                <select
                  id="appUsageFrequency"
                  name="appUsageFrequency"
                  value={formData.appUsageFrequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select frequency</option>
                  <option value="frequently">Frequently</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="rarely">Rarely</option>
                  <option value="never">Never</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="appTypePreference">
                  Would you prefer a free app with limited features or a paid app with full access to all features?
                </label>
                <select
                  id="appTypePreference"
                  name="appTypePreference"
                  value={formData.appTypePreference}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select preference</option>
                  <option value="freeLimited">Free/Limited</option>
                  <option value="paidFull">Paid/Full Access</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="inAppPurchases">
                  How likely are you to make in-app purchases for additional features or premium content? (1-5 scale)
                </label>
                <input
                  type="range"
                  id="inAppPurchases"
                  name="inAppPurchases"
                  value={formData.inAppPurchases}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="premiumFeatures">
                  Would you consider paying for premium features such as offline maps, exclusive content, or advanced trip planning tools?
                </label>
                <select
                  id="premiumFeatures"
                  name="premiumFeatures"
                  value={formData.premiumFeatures}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select answer</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="freeTrialImportance">
                  How important is it for a travel app to offer a free trial before requiring payment? (1-5 scale)
                </label>
                <input
                  type="range"
                  id="freeTrialImportance"
                  name="freeTrialImportance"
                  value={formData.freeTrialImportance}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  className="w-full"
                />
              </div>

              <h3 className="text-xl font-bold mb-4">Tech</h3>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="techUsed">
                  Have you used travel or exploration apps before?
                </label>
                <select
                  id="techUsed"
                  name="techUsed"
                  value={formData.techUsed}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select answer</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="techSavvy">
                  How tech-savvy would you rate yourself? (1-5 scale)
                </label>
                <input
                  type="range"
                  id="techSavvy"
                  name="techSavvy"
                  value={formData.techSavvy}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="travelTools">
                  What are your must-have apps or tools for traveling? (e.g., maps, translation, booking, photography)
                </label>
                <input
                  type="text"
                  id="travelTools"
                  name="travelTools"
                  value={formData.travelTools}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="mapBasedAppHelpful">
                  Would you find a map-based travel app helpful for discovering hidden or lesser-known destinations?
                </label>
                <select
                  id="mapBasedAppHelpful"
                  name="mapBasedAppHelpful"
                  value={formData.mapBasedAppHelpful}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select answer</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <h3 className="text-xl font-bold mb-4">Competitors</h3>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="appFrustrations">
                  What frustrations do you have when using current travel or map-based apps?
                </label>
                <textarea
                  id="appFrustrations"
                  name="appFrustrations"
                  value={formData.appFrustrations}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="missingFeatures">
                  Do you find that current travel apps are missing any features you need? If so, what are they?
                </label>
                <textarea
                  id="missingFeatures"
                  name="missingFeatures"
                  value={formData.missingFeatures}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="recommendationReliability">
                  How reliable do you find the recommendations (e.g., attractions, restaurants) on the travel apps you use?
                </label>
                <textarea
                  id="recommendationReliability"
                  name="recommendationReliability"
                  value={formData.recommendationReliability}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="offlineFunctionalityIssues">
                  Have you experienced issues with connectivity or offline functionality in travel apps while on the go?
                </label>
                <textarea
                  id="offlineFunctionalityIssues"
                  name="offlineFunctionalityIssues"
                  value={formData.offlineFunctionalityIssues}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  rows={3}
                />
              </div>


              {/* Value, Tech, Competitor sections would follow similarly */}

              {/* Submit button */}
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-500"
              >
                Submit Survey
              </button>
            </div>
          </section>
        </main>

        <footer className="w-full px-20 py-4 text-center space-x-6 font-medium sm:text-left">
          <Link href="/story">Our Story</Link>
          <Link href="/support">Support</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </footer>
      </div>
    </div >
  );
}
