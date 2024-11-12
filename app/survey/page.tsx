"use client";

import React, { useState, useEffect, memo } from 'react';
import { Search, X, ArrowLeft, ChevronDown, GripVertical } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbw8zfYbUi_UJMZssYTPQQ5PrKwmT7gELIEp9aMSjkg7ueMO1vDsA5p_ZFeHy_Hu-jcQig/exec";

const saveToGoogleSheets = async (data: Partial<FormData>) => {
  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data saved to Google Sheets successfully!");
  } catch (error) {
    console.error("Error saving data to Google Sheets:", error);
  }
};

// Types and Interfaces
const ItemType = 'RANKED_ITEM';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface CheckboxState {
  [key: string]: boolean;
}

interface RankedItem {
  id: string;
  text: string;
  rank: number;
}

interface Location {
  id: string;
  name: string;
  state?: string | undefined;
  display: string;
}

interface FormData {
  // Profile Data
  name: string;
  email: string;
  phone: string;
  location: Location | null;

  // Lifestyle Data
  travelFrequency: string;
  travelMethod: string;
  travelerType: string;
  destinationType: string;
  planningMethod: string;
  travelGoal: string;
  culturalImportance: number;
  planningStyle: string;
  sharingMethod: string;
  localRecommendations: string;

  // Value Data
  useMapApp: string;
  groupPlanning: string;
  appUsageFrequency: string;
  appModel: string;
  purchaseLikelihood: number;
  premiumFeatures: string;
  freeTrialImportance: number;

  // Tech Data
  usedTravelApps: string;
  travelAppsUsed: string;
  techSavviness: number;
  mustHaveApps: string;
  mapAppHelpful: string;

  // Solutions Data
  appFrustrations: string;
  missingFeatures: string;
  recommendationReliability: string;
  offlineIssues: string;
  uiIntuitiveness: number;
  infoOverwhelm: string;
  trustContent: string;
  trustContentReason: string;
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

interface SurveySectionProps {
  onBack: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

interface ProfileFormProps {
  onNext: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

interface LocationSelectorProps {
  onSelect: (location: Location) => void;
  searchType: string;
  onSearchTypeChange: (type: string) => void;
  onBack: () => void;
}

// Validation Types
interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
}

// Constants
const RATING_SCALE = [1, 2, 3, 4, 5];
const FREQUENCY_OPTIONS = ['1-2 times', '3-4 times', '5-6 times', '7+ times'];
const TRAVEL_METHODS = ['Plane', 'Car', 'Train', 'Bus'];
const TRAVELER_TYPES = ['Solo', 'Group', 'Family', 'Couple'];
const DESTINATION_TYPES = ['Urban', 'Rural', 'Beach', 'Mountain', 'Desert', 'Forrest'];
const PLANNING_METHODS = ['Travel agency', 'Online booking', 'Spontaneous'];
const TRAVEL_GOALS = ['Relaxation', 'Adventure', 'Cultural exploration', 'Work', 'Multiple goals'];
const PLANNING_STYLES = [
  'Highly structured',
  'Somewhat structured',
  'Somewhat spontaneous',
  'Very spontaneous'
];
const SHARING_METHODS = [
  'Social media',
  'Blog',
  'Private sharing',
  'Don\'t usually share',
  'Multiple methods'
];
const RECOMMENDATION_FREQUENCY = ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'];
const APP_USAGE_FREQUENCY = ['Frequently', 'Sometimes', 'Rarely', 'Never'];
const APP_MODELS = ['Free with limited features', 'Paid with full access'];
const YES_NO = ['Yes', 'No'];
const YES_NO_SOMETIMES = ['Yes', 'No', 'Sometimes'];

// Utility Functions
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone: string): boolean => {
  const re = /^\+?[\d\s-]{10,}$/;
  return re.test(phone);
};

const validateFormData = (data: Partial<FormData>): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  return errors;
};

// Reusable Components
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed top-8 left-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors p-2"
  >
    <ArrowLeft className="mr-1" size={20} />
    <span>Back</span>
  </button>
);

const SearchInput = memo(({ value, onChange, placeholder }: SearchInputProps) => (
  <div className="relative">
    <Search className="absolute left-3 top-3 text-gray-400 pointer-events-none" size={20} />
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-10 pr-12 py-2 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500"
      autoComplete="nope"
      autoCorrect="off"
      spellCheck="false"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded="true"
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange('')}
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
      >
        <X size={20} />
      </button>
    )}
  </div>
));

const ProfileForm = ({ onNext, formData, setFormData }: ProfileFormProps) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = () => {
    const newErrors = validateFormData(formData);
    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 mt-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Create your profile</h1>
        <p className="text-gray-600">Tell us a bit about yourself</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            className={`w-full p-3 border-b ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 outline-none`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full p-3 border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 outline-none`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-1">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className={`w-full p-3 border-b ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 outline-none`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Location Selector Component
const LocationSelector = memo(({
  onSelect,
  searchType,
  onSearchTypeChange,
  onBack
}: LocationSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<Location[]>([]);
  const [countries, setCountries] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Location[]>([]);

  const popularCities: Location[] = [
    { id: 'new-york-ny', name: 'New York', state: 'New York', display: 'New York, NY' },
    { id: 'los-angeles-ca', name: 'Los Angeles', state: 'California', display: 'Los Angeles, CA' },
    { id: 'chicago-il', name: 'Chicago', state: 'Illinois', display: 'Chicago, IL' },
    { id: 'houston-tx', name: 'Houston', state: 'Texas', display: 'Houston, TX' },
    { id: 'phoenix-az', name: 'Phoenix', state: 'Arizona', display: 'Phoenix, AZ' },
    { id: 'philadelphia-pa', name: 'Philadelphia', state: 'Pennsylvania', display: 'Philadelphia, PA' },
    { id: 'san-antonio-tx', name: 'San Antonio', state: 'Texas', display: 'San Antonio, TX' },
    { id: 'san-diego-ca', name: 'San Diego', state: 'California', display: 'San Diego, CA' },
    { id: 'dallas-tx', name: 'Dallas', state: 'Texas', display: 'Dallas, TX' },
    { id: 'miami-fl', name: 'Miami', state: 'Florida', display: 'Miami, FL' },
    { id: 'austin-tx', name: 'Austin', state: 'Texas', display: 'Austin, TX' },
    { id: 'seattle-wa', name: 'Seattle', state: 'Washington', display: 'Seattle, WA' }
  ];

  const popularCountries: Location[] = [
    { id: 'GB', name: 'United Kingdom', display: 'United Kingdom' },
    { id: 'CA', name: 'Canada', display: 'Canada' },
    { id: 'DE', name: 'Germany', display: 'Germany' },
    { id: 'IN', name: 'India', display: 'India' },
    { id: 'AU', name: 'Australia', display: 'Australia' },
    { id: 'FR', name: 'France', display: 'France' },
    { id: 'JP', name: 'Japan', display: 'Japan' },
    { id: 'BR', name: 'Brazil', display: 'Brazil' },
    { id: 'IT', name: 'Italy', display: 'Italy' },
    { id: 'MX', name: 'Mexico', display: 'Mexico' },
    { id: 'ES', name: 'Spain', display: 'Spain' },
    { id: 'KR', name: 'South Korea', display: 'South Korea' }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [citiesRes, countriesRes] = await Promise.all([
          fetch('/uscities.csv'),
          fetch('/country.csv')
        ]);

        if (!citiesRes.ok || !countriesRes.ok) {
          throw new Error('Failed to fetch location data');
        }

        const citiesText = await citiesRes.text();
        const countriesText = await countriesRes.text();

        // Parse cities CSV
        const citiesData = citiesText
          .split('\n')
          .slice(1)
          .map(row => {
            const columns = row.split(',');
            if (columns.length >= 3) {
              const city = columns[0]?.replace(/"/g, '').trim();
              const state = columns[2]?.replace(/"/g, '').trim();
              if (city && state) {
                return {
                  id: `${city}-${state}`.toLowerCase(),
                  name: city,
                  state: state,
                  display: `${city}, ${state}`
                };
              }
            }
            return null;
          })
          .filter((item): item is Location => item !== null);

        // Parse countries CSV
        const countriesData = countriesText
          .split('\n')
          .slice(1)
          .map(row => {
            const [code, name] = row.split(',');
            if (code && name) {
              return {
                id: code.replace(/"/g, '').trim(),
                name: name.replace(/"/g, '').trim(),
                display: name.replace(/"/g, '').trim()
              };
            }
            return null;
          })
          .filter((item): item is Location => item !== null);

        setCities(citiesData);
        setCountries(countriesData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load location data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const data = searchType === 'city' ? cities : countries;

    if (!term) {
      setResults([]);
      return;
    }

    const filtered = data
      .filter(item =>
        item.name.toLowerCase().includes(term) ||
        (item.state && item.state.toLowerCase().includes(term)) ||
        item.display.toLowerCase().includes(term)
      )
      .slice(0, 15);

    setResults(filtered);
  }, [searchTerm, searchType, cities, countries]);

  return (
    <div className="w-full max-w-md mx-auto space-y-6 mt-8 relative">
      <BackButton onClick={onBack} />

      <div className="text-center space-y-4 mt-8">
        <h1 className="text-2xl font-bold">Help us focus our efforts</h1>
        <p className="text-gray-600">
          {searchType === 'city'
            ? "Select your city"
            : "If you're outside the USA, select your country"}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              onSearchTypeChange('city');
              setSearchTerm('');
              setResults([]);
            }}
            className={`flex-1 py-2 px-4 rounded-full ${searchType === 'city'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700'
              } text-center`}
          >
            US City
          </button>
          <button
            onClick={() => {
              onSearchTypeChange('country');
              setSearchTerm('');
              setResults([]);
            }}
            className={`flex-1 py-2 px-4 rounded-full ${searchType === 'country'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700'
              } text-center`}
          >
            Other Country
          </button>
        </div>

        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={`Search ${searchType === 'city' ? 'cities' : 'countries'}...`}
        />

        <div className="mt-4 max-h-[calc(100vh-400px)] overflow-y-auto rounded-lg">
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading locations...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <>
              {!searchTerm && (
                <div className="grid grid-cols-1 gap-2">
                  {(searchType === 'city' ? popularCities : popularCountries).map(location => (
                    <button
                      key={location.id}
                      onClick={() => onSelect(location)}
                      className="w-full p-3 text-center rounded-full border border-gray-200 hover:border-blue-500 transition-colors"
                    >
                      {location.display}
                    </button>
                  ))}
                </div>
              )}

              {searchTerm && (
                <div className="grid grid-cols-1 gap-2">
                  {results.map(result => (
                    <button
                      key={result.id}
                      onClick={() => onSelect(result)}
                      className="w-full p-3 text-center rounded-full border border-gray-200 hover:border-blue-500 transition-colors"
                    >
                      {result.display}
                    </button>
                  ))}
                  {results.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No matches found
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

// Survey Section Component
const SurveySection = ({ onBack, formData, setFormData }: SurveySectionProps) => {
  const [expandedSection, setExpandedSection] = useState<string>('lifestyle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [travelMethodChecks, setTravelMethodChecks] = useState<CheckboxState>({});
  const [travelerTypeChecks, setTravelerTypeChecks] = useState<CheckboxState>({});
  const [destinationChecks, setDestinationChecks] = useState<CheckboxState>({});
  const [sharingChecks, setSharingChecks] = useState<CheckboxState>({});
  const [showWriteIn, setShowWriteIn] = useState<{ [key: string]: boolean }>({});
  const [showAdditionalQuestions, setShowAdditionalQuestions] = useState(false);
  const [rankedGoals, setRankedGoals] = useState<RankedItem[]>(
    TRAVEL_GOALS.map((goal, index) => ({
      id: `goal-${index}`,
      text: goal,
      rank: index + 1,
    }))
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<CheckboxState>>,
    formField: string,
    option: string
  ) => {
    setter(prev => {
      const newState = { ...prev, [option]: !prev[option] };
      // Update formData with selected options
      const selectedOptions = Object.entries(newState)
        .filter(([_, checked]) => checked)
        .map(([key]) => key);
      handleInputChange(formField, selectedOptions.join(', '));
      return newState;
    });
  };

  const renderCheckboxGroup = (
    options: string[],
    state: CheckboxState,
    setter: React.Dispatch<React.SetStateAction<CheckboxState>>,
    formField: string,
    allowOther: boolean = true
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
      {options.map((option) => (
        <label key={option} className="flex items-center w-full space-x-2">
          <input
            type="checkbox"
            checked={state[option] || false}
            onChange={() => handleCheckboxChange(setter, formField, option)}
            className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="flex-grow">{option}</span>
        </label>
      ))}
      {allowOther && (
        <div className="col-span-full">
          <label className="flex items-center space-x-2 w-full">
            <input
              type="checkbox"
              checked={state['Other'] || false}
              onChange={() => handleCheckboxChange(setter, formField, 'Other')}
              className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="flex-grow">Other</span>
          </label>
          {state['Other'] && (
            <input
              type="text"
              placeholder="Please specify..."
              value={state['OtherText'] || ''}
              onChange={(e) => {
                setter((prev) => ({ ...prev, OtherText: e.target.value }));
                handleInputChange(
                  formField,
                  Object.entries(state)
                    .filter(([key, checked]) => checked && key !== 'OtherText')
                    .map(([key]) => (key === 'Other' ? e.target.value : key))
                    .join(', ')
                );
              }}
              className="mt-2 w-full p-2 border border-gray-200 rounded-lg"
            />
          )}
        </div>
      )}
    </div>
  );

  const RankingItem = ({ goal, index, moveItem }: { goal: RankedItem, index: number, moveItem: (dragIndex: number, hoverIndex: number) => void }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
      accept: ItemType,
      hover: (item: DragItem) => {
        if (!ref.current) return;
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) return;

        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { id: goal.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    return (
      <div
        ref={ref}
        className={`flex items-center space-x-2 p-2 bg-white border rounded-lg ${isDragging ? 'opacity-50' : ''}`}
        style={{ cursor: 'move' }}
      >
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
          {goal.rank}
        </div>
        <GripVertical className="text-gray-400" size={20} />
        <span className="flex-grow">{goal.text}</span>
      </div>
    );
  };

  // Render ranking system for goals
  const renderRankingSystem = () => {
    const moveItem = (dragIndex: number, hoverIndex: number) => {
      const newItems = [...rankedGoals];
      const dragItem = newItems[dragIndex];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);

      newItems.forEach((item, index) => (item.rank = index + 1));
      setRankedGoals(newItems);
      setFormData({ ...formData, travelGoal: newItems.map(item => `${item.rank}. ${item.text}`).join(', ') });
    };

    const renderRankingSystem = () => (
      <div className="space-y-2">
        {rankedGoals.map((goal, index) => (
          <RankingItem key={goal.id} goal={goal} index={index} moveItem={moveItem} />
        ))}
      </div>
    );

    return (
      <DndProvider backend={HTML5Backend}>
        <div className="w-full max-w-2xl mx-auto">
          {renderRankingSystem()}
        </div>
      </DndProvider >
    );
  };

  const renderRatingScale = (name: string, value: number) => (
    <div className="flex items-center space-x-4">
      {RATING_SCALE.map((num) => (
        <button
          key={num}
          onClick={() => handleInputChange(name, num)}
          className={`w-10 h-10 rounded-full ${value === num ? 'bg-blue-500 text-white' : 'bg-gray-100'
            } transition-colors`}
        >
          {num}
        </button>
      ))}
    </div>
  );


  const renderSelect = (name: string, options: string[], value: string, allowWriteIn: boolean = false) => (
    <div className="space-y-2">
      <select
        value={options.includes(value) ? value : 'Other'}
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue === 'Other') {
            setShowWriteIn((prev) => ({ ...prev, [name]: true }));
          } else {
            setShowWriteIn((prev) => ({ ...prev, [name]: false }));
          }
          handleInputChange(name, newValue);
        }}
        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        {allowWriteIn && <option value="Other">Other</option>}
      </select>
      {(showWriteIn[name] || (!options.includes(value) && value)) && allowWriteIn && (
        <input
          type="text"
          value={options.includes(value) ? '' : value}
          onChange={(e) => handleInputChange(name, e.target.value)}
          placeholder="Please specify..."
          className="w-full p-2 border border-gray-200 rounded-lg"
        />
      )}
    </div>
  );


  const isFrequentTraveler = ['3-4 times', '5-6 times', '7+ times'].includes(formData.travelFrequency);
  const selectedDestinationsCount = Object.values(destinationChecks).filter(Boolean).length;

  const renderSurveySection = (title: string, content: React.ReactNode, sectionKey: string) => (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <ChevronDown
          className={`transform transition-transform ${expandedSection === sectionKey ? 'rotate-180' : ''
            }`}
        />
      </button>
      {expandedSection === sectionKey && (
        <div className="p-4 space-y-6">
          {content}
        </div>
      )}
    </div>
  );

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await saveToGoogleSheets(formData);
      alert("Survey submitted successfully!");
      console.log('Submitting survey:', formData);
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Failed to submit survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-20">
      <BackButton onClick={onBack} />

      <div className="mt-16 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Help Us Improve Your Travel Experience</h1>
          <p className="text-gray-600 mt-2">Share your preferences and help us create a better travel app</p>
        </div>

        {/* Lifestyle Section */}
        {renderSurveySection('Lifestyle', (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                How often do you travel per year?
              </label>
              {renderSelect('travelFrequency', FREQUENCY_OPTIONS, formData.travelFrequency)}
            </div>

            {['3-4 times', '5-6 times', '7+ times'].includes(formData.travelFrequency) && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred method(s) of travel (select all that apply)
                  </label>
                  {renderCheckboxGroup(TRAVEL_METHODS, travelMethodChecks, setTravelMethodChecks, 'travelMethod')}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    What type of traveler are you? (select all that apply)
                  </label>
                  {renderCheckboxGroup(TRAVELER_TYPES, travelerTypeChecks, setTravelerTypeChecks, 'travelerType')}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                What types of destinations do you prefer? (select all that apply)
              </label>
              {renderCheckboxGroup(DESTINATION_TYPES, destinationChecks, setDestinationChecks, 'destinationType')}
            </div>

            {/* Conditional rendering for Planning Questions based on selected destinations */}
            {selectedDestinationsCount >= 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    How do you usually plan your trips?
                  </label>
                  {renderSelect('planningMethod', PLANNING_METHODS, formData.planningMethod)}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Do you prefer structured itineraries or spontaneous travel plans?
                  </label>
                  {renderSelect('planningStyle', PLANNING_STYLES, formData.planningStyle)}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Rank your travel goals (drag to reorder)
              </label>
              {renderRankingSystem()}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                How do you share your travel experiences? (select all that apply)
              </label>
              {renderCheckboxGroup(SHARING_METHODS, sharingChecks, setSharingChecks, 'sharingMethod')}
            </div>
          </>
        ), 'lifestyle')}

        {/* Value Section - simplified */}
        {renderSurveySection('Value', (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Would you use a map-based travel app for discovering hidden destinations?
              </label>
              {renderSelect('useMapApp', YES_NO, formData.useMapApp)}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Would a feature that allows you to plan trips with friends or family directly through the app appeal to you?
              </label>
              {renderSelect('groupPlanning', YES_NO, formData.groupPlanning)}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Would you consider paying for premium features such as offline maps, exclusive content, or advanced trip planning tools?
              </label>
              {renderSelect('premiumFeatures', YES_NO, formData.premiumFeatures)}
            </div>

            {/* Conditionally show additional questions if all Yes/No answers are 'Yes' */}
            {formData.useMapApp === 'Yes' &&
              formData.groupPlanning === 'Yes' &&
              formData.premiumFeatures === 'Yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How often would you use a location-based discovery app?
                    </label>
                    {renderSelect('appUsageFrequency', APP_USAGE_FREQUENCY, formData.appUsageFrequency)}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Would you prefer a free app with limited features or a paid app with full access to all features?
                    </label>
                    {renderSelect('appModel', APP_MODELS, formData.appModel)}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How likely are you to make in-app purchases for additional features or premium content? (1-5)
                    </label>
                    {renderRatingScale('purchaseLikelihood', formData.purchaseLikelihood)}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How important is it for a travel app to offer a free trial before requiring payment? (1-5)
                    </label>
                    {renderRatingScale('freeTrialImportance', formData.freeTrialImportance)}
                  </div>
                </>
              )}
          </>
        ), 'value')}

        {/* Tech Section */}
        {renderSurveySection('Tech', (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Have you used travel apps before?
              </label>
              <div className="space-y-2">
                {renderSelect('usedTravelApps', YES_NO, formData.usedTravelApps)}
                {formData.usedTravelApps === 'Yes' && (
                  <textarea
                    placeholder="Which apps have you used?"
                    value={formData.travelAppsUsed}
                    onChange={(e) => handleInputChange('travelAppsUsed', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    rows={2}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tech-savviness (1-5)
              </label>
              {renderRatingScale('techSavviness', formData.techSavviness)}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Must-have travel apps/tools
              </label>
              <textarea
                placeholder="E.g., maps, translation, booking, photography"
                value={formData.mustHaveApps}
                onChange={(e) => handleInputChange('mustHaveApps', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Would a map-based discovery app be helpful?
              </label>
              {renderSelect('mapAppHelpful', YES_NO, formData.mapAppHelpful)}
            </div>
          </>
        ), 'tech')}

        {/* Solutions Section */}
        {renderSurveySection('Solutions', (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                What frustrations do you have when using current travel or map-based apps?
              </label>
              <textarea
                placeholder="What frustrates you about current travel apps?"
                value={formData.appFrustrations}
                onChange={(e) => {
                  const input = e.target.value;
                  handleInputChange('appFrustrations', input);
                  // Check if the character count exceeds 20
                  setShowAdditionalQuestions(input.length > 20);
                }}
                className="w-full p-2 border border-gray-200 rounded-lg"
                rows={3}
              />
            </div>

            {/* Conditionally show the remaining questions if the first response is over 20 characters */}
            {showAdditionalQuestions && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Do you find that current travel apps are missing any features you need? If so, what are they?
                  </label>
                  <textarea
                    placeholder="What features do you wish existed?"
                    value={formData.missingFeatures}
                    onChange={(e) => handleInputChange('missingFeatures', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    How reliable do you find the recommendations (e.g., attractions, restaurants) on the travel apps you use?
                  </label>
                  <textarea
                    placeholder="How reliable are current app recommendations?"
                    value={formData.recommendationReliability}
                    onChange={(e) => handleInputChange('recommendationReliability', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Have you experienced issues with connectivity or offline functionality in travel apps while on the go?
                  </label>
                  <textarea
                    placeholder="Any issues with offline functionality?"
                    value={formData.offlineIssues}
                    onChange={(e) => handleInputChange('offlineIssues', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    How intuitive do you find the user interfaces of current travel apps you’ve used? (1-5)
                  </label>
                  {renderRatingScale('uiIntuitiveness', formData.uiIntuitiveness)}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Do you feel overwhelmed by too much information or clutter in existing travel apps?
                  </label>
                  {renderSelect('infoOverwhelm', YES_NO, formData.infoOverwhelm)}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Do you trust the user-generated content or reviews in existing travel apps? Why or why not?
                  </label>
                  <div className="space-y-2">
                    {renderSelect('trustContent', YES_NO_SOMETIMES, formData.trustContent)}
                    <textarea
                      placeholder="Why or why not?"
                      value={formData.trustContentReason}
                      onChange={(e) => handleInputChange('trustContentReason', e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      rows={3}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        ), 'solutions')}


        {/* Submit Button */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-3 bg-blue-500 text-white rounded-full transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const EnhancedSurvey = () => {
  const [step, setStep] = useState(1);
  const [searchType, setSearchType] = useState('city');
  const [formData, setFormData] = useState<FormData>({
    // Profile Data
    name: '',
    email: '',
    phone: '',
    location: null,

    // Initialize all other form fields with default values
    travelFrequency: '',
    travelMethod: '',
    travelerType: '',
    destinationType: '',
    planningMethod: '',
    travelGoal: '',
    culturalImportance: 3,
    planningStyle: '',
    sharingMethod: '',
    localRecommendations: '',
    useMapApp: '',
    groupPlanning: '',
    appUsageFrequency: '',
    appModel: '',
    purchaseLikelihood: 3,
    premiumFeatures: '',
    freeTrialImportance: 3,
    usedTravelApps: '',
    travelAppsUsed: '',
    techSavviness: 3,
    mustHaveApps: '',
    mapAppHelpful: '',
    appFrustrations: '',
    missingFeatures: '',
    recommendationReliability: '',
    offlineIssues: '',
    uiIntuitiveness: 3,
    infoOverwhelm: '',
    trustContent: '',
    trustContentReason: ''
  });

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleNextStep = () => {
    setStep(step + 1);
    if (step === 1 || step === 2) saveToGoogleSheets(formData); // Save Profile and Location steps
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ProfileForm
            onNext={handleNextStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <LocationSelector
            onSelect={(location) => {
              setFormData(prev => ({ ...prev, location }));
              setStep(3);
            }}
            searchType={searchType}
            onSearchTypeChange={setSearchType}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <SurveySection
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto relative">
        {renderStep()}
      </div>
    </div>
  );
};

// Export the component
export default EnhancedSurvey;
