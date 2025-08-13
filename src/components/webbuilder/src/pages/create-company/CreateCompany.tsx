import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, Upload, Plus, Trash2, Star } from 'lucide-react';
import { uploadImageToS3 } from './src/utils/s3Upload';

// import OpenAI from "openai";

// // Initialize OpenAI client (store key in .env)
// const openai = new OpenAI({
//   apiKey: "",
//   dangerouslyAllowBrowser: true// process.env.REACT_APP_OPENAI_API_KEY
// });


interface CompanyValue {
  icon?: string; // optional for select
  title: string;
  description: string;
}
interface Client {
  name: string;
  logo: string;
  industry: string;
}
interface Service {
  icon: string;
  title: string;
  description: string;
}
interface Product {
  image: string;
  title: string;
  description: string;
  link: string;
}
interface Testimonial {
  name: string;
  role: string;
  quote: string;
  photo: string;
  rating: number;
}
interface FormData {
  companyName: string;
  contactName: string;
  category?: string;

  /*New fields added*/
 // NEW FIELDS - Add these to your existing interface
  yearEstablished: number;
  directorName: string;
  directorWhatsApp: string;
  directorEmail: string;
  alternateContactPerson: string;
  alternateContactPhone: string;
  alternateContactEmail: string;
  websiteURL: string;
  companyProfileLink: string;
  promoVideo5Min: string;
  promoVideo1Min: string;
  country: string;
  numberOfEmployees: string;
  
  // Business Categories
  mainBusinessCategory: string;
  manufacturingSubcategory: string[];
  servicesSubcategory: string[];
  trainingCategory: string[];
  photographyCategory: string[];
  softwareCategory: string[];
  gisServicesCategory: string[];
  dgpsServicesCategory: string[];
  otherManufacturing?: string; // optional: for "Other" manufacturing category
  otherService?: string; // optional: for "Other" service category
  otherTraining?: string; // optional: for "Other" training category
  otherPhotography?: string; 
otherSoftware?: string;
otherGIS?: string;
otherDGPS?: string; // optional: for "Other" photography category
  
  // Certificates
  dgcaCertificate: string;
  rptoCertificate: string;
  
  // Marketing
  preferredPromoFormat: string[];

/*Close-New fields added*/


  // Header & Hero
  companyLogo: string;
  navigationLinks: { label: string; link: string }[];
  heroHeadline: string;
  heroSubheadline: string;
  heroBackground: string;
  primaryCTA: { text: string; link: string };
  secondaryCTA: { text: string; link: string };

  // About
  aboutTitle: string;
  aboutDescription: string;
  aboutTeamExperience?: string; // optional: add a second para for experience highlight
  aboutImage: string;
  aboutExperienceYears?: number; // optional: years of experience display
  companyValues: CompanyValue[];
  videoEmbedUrl: string;

  // Services
  servicesTitle: string;
  servicesDescription?: string;
  services: Service[];

  // Products
  productsTitle: string;
  productCategories: string;
  products: Product[];

  // Clients & Testimonials
  clientsTitle: string;
  clientLogos: string[];
  testimonials: Testimonial[];
  clients: Client[];

  // Contact
  contactTitle: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pinCode: string;
  mapEmbedUrl: string;
  contactFormText: string;
  submitButtonText: string;

  // Footer
  footerLogo: string;
  footerDescription: string;
  footerText: string;
  footerEmail: string;
  footerPhone: string;
  footerAddress: string;
  footerNavLinks: { label: string; link: string }[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
    website?: string;
  };
  newsletterEnabled: boolean;
  newsletterDescription: string;
}



const CreateCompany: React.FC = () => {
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imageUploadMessage, setImageUploadMessage] = useState('');
  const [productImageUploadLoading, setProductImageUploadLoading] = useState<{ [key: number]: boolean }>({});
  const [productImageUploadMessage, setProductImageUploadMessage] = useState<{ [key: number]: string }>({});
  const [clientLogoUploadLoading, setClientLogoUploadLoading] = useState<{ [key: number]: boolean }>({});
  const [clientLogoUploadMessage, setClientLogoUploadMessage] = useState<{ [key: number]: string }>({});
  const [aboutImageUploadLoading, setAboutImageUploadLoading] = useState(false);
  const [aboutImageUploadMessage, setAboutImageUploadMessage] = useState('');
  const [testimonialPhotoUploadLoading, setTestimonialPhotoUploadLoading] = useState<{ [key: number]: boolean }>({});
  const [testimonialPhotoUploadMessage, setTestimonialPhotoUploadMessage] = useState<{ [key: number]: string }>({});
  const [heroImageUploadLoading, setHeroImageUploadLoading] = useState(false);
  const [heroImageUploadMessage, setHeroImageUploadMessage] = useState('');
  const [footerLogoUploadLoading, setFooterLogoUploadLoading] = useState(false);
  const [footerLogoUploadMessage, setFooterLogoUploadMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = async () => {
    // (optional: validate data here)
    const formDataWithTimestamp = {
      ...formData,
      timestamp: new Date().toISOString(),// or new Date().toISOString() if you want ISO format
    };
    // Call the API
    const response = await fetch('https://6dcd2cnc76.execute-api.ap-south-1.amazonaws.com/postCompanyform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataWithTimestamp)
    });

    if (response.ok) {
      // Success — maybe route to preview page
      navigate('/companies');
    } else {
      // Handle erroraa
      alert('Failed to create company. Try again!');
    }
  };
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    category: '',

    // NEW FIELDS - Add these default values
  yearEstablished: new Date().getFullYear(),
  directorName: '',
  directorWhatsApp: '',
  directorEmail: '',
  alternateContactPerson: '',
  alternateContactPhone: '',
  alternateContactEmail: '',
  websiteURL: '',
  companyProfileLink: '',
  promoVideo5Min: '',
  promoVideo1Min: '',
  country: 'India',
  numberOfEmployees: '1-10',
  
  // Business Categories
  mainBusinessCategory: '',
  manufacturingSubcategory: [],
  servicesSubcategory: [],
  trainingCategory: [],
  photographyCategory: [],
  softwareCategory: [],
  gisServicesCategory: [],
  dgpsServicesCategory: [],
  otherManufacturing: '',
  otherService: '',
  otherTraining: '',
  
  
  // Certificates
  dgcaCertificate: '',
  rptoCertificate: '',
  
  // Marketing
  preferredPromoFormat: [],
  
/*Close-New fields added*/
  
    // Header & Hero
    companyLogo: '',
    navigationLinks: [
      { label: 'Home', link: '#home' },
      { label: 'About', link: '#about' },
      { label: 'Services', link: '#services' },
      { label: 'Products', link: '#products' },
      { label: 'Contact', link: '#contact' }
    ],
    heroHeadline: '',
    heroSubheadline: '',
    heroBackground: '',
    primaryCTA: { text: 'Explore Products', link: '#products' },
    secondaryCTA: { text: 'Contact Us', link: '#contact' },

    // About
    aboutTitle: 'About Our Company',
    aboutDescription: '',
    aboutTeamExperience: '',
    aboutImage: '',
    aboutExperienceYears: 5,
    companyValues: [],
    videoEmbedUrl: '',

    // Services
    servicesTitle: 'Our Services',
    servicesDescription: '',
    services: [],

    // Products
    productsTitle: 'Our Products',
    productCategories: 'All, Surveillance, Agriculture, Custom',
    products: [],

    // Clients & Testimonials
    clientsTitle: 'Our Clients',
    clients: [],
    clientLogos: [],
    testimonials: [],

    // Contact
    contactTitle: 'Get In Touch',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pinCode: '',
    mapEmbedUrl: '',
    contactFormText: 'Ready to work with us? Send us a message.',
    submitButtonText: 'Send Message',

    // Footer
    footerLogo: '',
    footerDescription: ' ',
    footerText: '© 2025 Your Company. All rights reserved.',
    footerEmail: '',
    footerPhone: '',
    footerAddress: '',
    footerNavLinks: [
      { label: 'Home', link: '#home' },
      { label: 'About', link: '#about' },
      { label: 'Services', link: '#services' },
      { label: 'Products', link: '#products' },
      { label: 'Contact', link: '#contact' }
    ],
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      youtube: '',
      whatsapp: '',
      website: ''
    },
    newsletterEnabled: true,
    newsletterDescription: 'Subscribe to our newsletter for the latest drone technology updates.'
  });



  const steps = [
    'Basic Details',
    'Business Categories', // NEW STEP
    'Header & Hero',
    'About Section',
    'Services',
    'Products',
    'Clients & Testimonials',
    'Contact',
    'Footer',
    'Certificates & Marketing' // NEW STEP
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => {
      const sectionValue = prev[section as keyof FormData];
      // Check if it's an object (not array, not null)
      if (
        sectionValue &&
        typeof sectionValue === 'object' &&
        !Array.isArray(sectionValue)
      ) {
        return {
          ...prev,
          [section]: {
            ...sectionValue,
            [field]: value
          }
        };
      }
      // fallback, do nothing
      return prev;
    });
  };

  const addArrayItem = (field: string, item: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof FormData] as any[]), item]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof FormData] as any[]).filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: string, index: number, updatedItem: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof FormData] as any[]).map((item, i) =>
        i === index ? updatedItem : item
      )
    }));
  };


  // Helper function to handle multi-select arrays
const handleMultiSelectChange = (field: string, value: string, checked: boolean) => {
  setFormData(prev => {
    const currentArray = prev[field as keyof FormData] as string[] || [];
    if (checked) {
      return {
        ...prev,
        [field]: [...currentArray, value]
      };
    } else {
      return {
        ...prev,
        [field]: currentArray.filter(item => item !== value)
      };
    }
  });
};
//new added
// Business category options
const businessCategoryOptions = [
  'Drone Manufacturing',
  'Drone Services', 
  'DGCA RPTO - Drone Training and Certification',
  'AI Based Solutions',
  'Drone Software Development',
  'GIS Services',
  'DGPS Services',
  'Aerial Photography and Videography',
  'Other'
];

const manufacturingOptions = [
  'Fixed-Wing Drones',
  'Multi-Rotor Drones',
  'Hybrid UAVs',
  'Heavy-Lift Drones',
  'Long-Range UAVs',
  'Customized Drone Manufacturing',
  'Not Applicable (We are not doing Manufacturing)',
  'Other'
];

const servicesOptions = [
  'Agricultural Drone Services',
  'Aerial Mapping',
  'Drone Inspections (e.g., Bridges, Pipelines, Solar Farms)',
  'Construction Monitoring',
  'Road Corridor Surveys',
  'Mining and Quarry Surveys',
  'Real Estate Imaging',
  'Environmental Monitoring',
  'Thermal Imaging',
  'Wildlife Monitoring',
  'Disaster Management Support',
  'Precision Forestry',
  'Search and Rescue Operations',
  'Security Surveillance',
  'Industrial Inspections',
  'Not Applicable (We are not offering Drone Services)',
  'Other'
];

const trainingOptions = [
  'We are into Training But not a DGCA Certified RPTO',
  'RPTO - Small Drones',
  'RPTO - Medium Drones',
  'RPTO - TTT',
  'MICRO Drone Training',
  'FPV Drones Training',
  'Hybrid Drones',
  'BVLOS Certification',
  'Other'
];

const photographyOptions = [
  'Real Estate Photography',
  'Event Coverage',
  'Industrial Videography',
  'Cinematography',
  'Drone-Based Advertising Content Creation',
  'Wildlife Videography',
  'Travel and Tourism Content Creation',
  'Not Applicable (We are not offering Aerial Photography and Videography)',
  'Other'
];

const softwareOptions = [
  'Mapping and Surveying Software',
  'Photogrammetry, and GIS integration services',
  'Image Processing Software',
  'Agriculture Normalized Difference Vegetation Index (NDVI) Software',
  'AI/ML Integration for Drones and Drone DATA',
  'Crowd Management Software',
  'Drone Simulator Software',
  'Drone Data Analytics',
  'Drone Fleet Management Software',
  'BVLOS Operation Software',
  'Real-Time Monitoring Software',
  'Not Applicable (We are not offering Drone Software Development)',
  'Other'
];

const gisOptions = [
  'Land Surveying',
  'GIS Mapping',
  'Remote Sensing',
  'Urban Planning GIS Solutions',
  'Environmental GIS Applications',
  'Utility Mapping',
  'GIS Data Analysis',
  'GIS Software Development',
  'Not Applicable (We are not offering GIS Services)',
  'Other'
];

const dgpsOptions = [
  'DGPS Land Surveys',
  'Road and Highway Mapping',
  'Geodetic Surveys',
  'Precision Agriculture Solutions',
  'Industrial Layout Surveys',
  'Navigation and Positioning Solutions',
  'DGPS Mapping for Archaeology',
  'Not Applicable (We are not offering DGPS Services)',
  'Other'
];

const promoFormatOptions = [
  'YouTube - Your Company Promotion Video in Drone TV (Shorts / Full Video)',
  'Social Media Shoutout in Drone Tv (Facebook, Instagram, Linkedin, X)',
  'Article in Drone Digital Magazine (Premium - Payable)',
  'In Drone Tv Website Feature (Premium - Payable)',
  'Event Coverage / Live Show (Premium - Payable)',
  'Company official\'s Interview (Premium - Payable)',
  'Open to all opportunities (Interested in Premium - Paid Promotions)'
];

const employeeOptions = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+'
];

//close new added
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black mb-4">Basic Company Details</h2>
      
      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
        <input
          type="text"
          required
          placeholder="Your company name (used in URL)"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.companyName}
          onChange={e => {
            const rawValue = e.target.value;
            const cleaned = rawValue.replace(/[^a-zA-Z0-9]/g, '');
            handleInputChange('companyName', cleaned);
          }}
        />
      </div>

      {/* Year Established */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Year Established *</label>
        <input
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          placeholder="2020"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.yearEstablished}
          onChange={e => handleInputChange('yearEstablished', parseInt(e.target.value))}
        />
      </div>

      {/* Director Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company MD / Director Name *</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.directorName}
            onChange={e => handleInputChange('directorName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">MD / Director WhatsApp / Mobile *</label>
          <input
            type="tel"
            placeholder="+91 9876543210"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.directorWhatsApp}
            onChange={e => handleInputChange('directorWhatsApp', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Director Email Address *</label>
        <input
          type="email"
          placeholder="director@company.com"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.directorEmail}
          onChange={e => handleInputChange('directorEmail', e.target.value)}
        />
      </div>

      {/* Alternative Contact */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Alternative Contact Person</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              placeholder="Alternative contact name"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.alternateContactPerson}
              onChange={e => handleInputChange('alternateContactPerson', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.alternateContactPhone}
              onChange={e => handleInputChange('alternateContactPhone', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              placeholder="alternate@company.com"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.alternateContactEmail}
              onChange={e => handleInputChange('alternateContactEmail', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
          <input
            type="tel"
            placeholder="+91 9876543210"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
          />
        </div>
      </div>

      {/* Website & Profile Links */}
       <div className="grid md:grid-cols-2 gap-4">
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
          <input
            type="url"
            placeholder="https://yourcompany.com"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.websiteURL}
            onChange={e => handleInputChange('websiteURL', e.target.value)}
          />
        </div> 
{/* /*added website url input ai analysis*/ }
{/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
        <input
  type="url"
  placeholder="https://yourcompany.com"
  className="w-full px-4 py-2 border rounded-md"
  value={formData.websiteURL}
  onChange={async e => {
    const value = e.target.value;
    handleInputChange('websiteURL', value);

    // Trigger AI fill when a valid URL is entered
    if (value.startsWith("http") && value.length > 10) {
      await analyseCompanyFromURL(value);
    }
  }}
/>
</div> */}
{/* /*added website url input ai analysis*/ }

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Profile Link</label>
          <input
            type="url"
            placeholder="https://linkedin.com/company/yourcompany"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.companyProfileLink}
            onChange={e => handleInputChange('companyProfileLink', e.target.value)}
          />
        </div>
      </div>

      {/* Video Links */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Promotional Videos</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">5 Min Promo Video Link</label>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-2 border rounded-md"
              value={formData.promoVideo5Min}
              onChange={e => handleInputChange('promoVideo5Min', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">1 Min Promo Video Link</label>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-2 border rounded-md"
              value={formData.promoVideo1Min}
              onChange={e => handleInputChange('promoVideo1Min', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Office Address</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Office Address *</label>
            <input
              type="text"
              placeholder="123 Main Street"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.addressLine}
              onChange={e => handleInputChange('addressLine', e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                placeholder="Hyderabad"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.city}
                onChange={e => handleInputChange('city', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
              <input
                type="text"
                placeholder="Telangana"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.state}
                onChange={e => handleInputChange('state', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <input
                type="text"
                placeholder="India"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.country}
                onChange={e => handleInputChange('country', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
              <input
                type="text"
                placeholder="500001"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.pinCode}
                onChange={e => handleInputChange('pinCode', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Number of Employees */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees *</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          value={formData.numberOfEmployees}
          onChange={e => handleInputChange('numberOfEmployees', e.target.value)}
        >
          {employeeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Promotional Code - Keep existing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Promotional Code</label>
        <input
          type="text"
          placeholder="Enter Promotional Code"
          className="w-full px-4 py-2 border rounded-md"
          value={promoCode}
          onChange={e => {
            setPromoCode(e.target.value);
            setPromoCodeError('');
          }}
        />
        {promoCodeError && (
          <div className="text-red-600 mt-1 text-sm">{promoCodeError}</div>
        )}
      </div>
    </div>
  );

  case 2:
    return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-black mb-4">Business Categories</h2>
      
      {/* Main Business Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Main Business Category *</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          value={formData.mainBusinessCategory}
          onChange={e => handleInputChange('mainBusinessCategory', e.target.value)}
        >
          <option value="">Select your main business category</option>
          {businessCategoryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
<div>
  {/* Conditional Subcategories */}
  {formData.mainBusinessCategory === 'Drone Manufacturing' && (
    <div className="p-6 rounded-lg">
      <h3 className="block text-sm font-medium text-gray-700 mb-2">
        Manufacturing Subcategories
      </h3>
      <div className="space-y-2">
        {manufacturingOptions.map(option => (
          <div key={option}>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.manufacturingSubcategory.includes(option)}
                onChange={e =>
                  handleMultiSelectChange(
                    'manufacturingSubcategory',
                    option,
                    e.target.checked
                  )
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm">{option}</span>
            </label>

            {/* Show input if "Other" is checked */}
            {option === 'Other' &&
              formData.manufacturingSubcategory.includes('Other') && (
                <input
                  type="text"
                  placeholder="Please specify..."
                  value={formData.otherManufacturing || ''}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      otherManufacturing: e.target.value
                    }))
                  }
                  className="mt-2 ml-6 block w-full border border-gray-300 rounded p-2 text-sm"
                />
              )}
          </div>
        ))}
      </div>
    </div>
  )}
</div>

<div>
  {formData.mainBusinessCategory === 'Drone Services' && (
    <div className="p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Service Subcategories</h3>
      <div className="space-y-2">
        {servicesOptions.map(option => (
          <div key={option}>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.servicesSubcategory.includes(option)}
                onChange={e =>
                  handleMultiSelectChange(
                    'servicesSubcategory',
                    option,
                    e.target.checked
                  )
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm">{option}</span>
            </label>

            {/* Show input if "Other" is checked */}
            {option === 'Other' &&
              formData.servicesSubcategory.includes('Other') && (
                <input
                  type="text"
                  placeholder="Please specify..."
                  value={formData.otherService || ''}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      otherService: e.target.value
                    }))
                  }
                  className="mt-2 ml-6 block w-full border border-gray-300 rounded p-2 text-sm"
                />
              )}
          </div>
        ))}
      </div>
    </div>
  )}
</div>

     {formData.mainBusinessCategory === 'DGCA RPTO - Drone Training and Certification' && (
  <div className="p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">Training Categories</h3>
    <div className="space-y-2">
      {trainingOptions.map(option => (
        <div key={option}>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.trainingCategory.includes(option)}
              onChange={e =>
                handleMultiSelectChange(
                  'trainingCategory',
                  option,
                  e.target.checked
                )
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm">{option}</span>
          </label>

          {/* Show input if "Other" is checked */}
          {option === 'Other' &&
            formData.trainingCategory.includes('Other') && (
              <input
                type="text"
                placeholder="Please specify..."
                value={formData.otherTraining || ''}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    otherTraining: e.target.value
                  }))
                }
                className="mt-2 ml-6 block w-full border border-gray-300 rounded p-2 text-sm"
              />
            )}
        </div>
      ))}
    </div>
  </div>
)}


      {/* Aerial Photography and Videography */}
{formData.mainBusinessCategory === 'Aerial Photography and Videography' && (
  <div className="p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">Photography & Videography Categories</h3>
    <div className="space-y-2">
      {photographyOptions.map(option => (
        <div key={option}>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.photographyCategory.includes(option)}
              onChange={e =>
                handleMultiSelectChange('photographyCategory', option, e.target.checked)
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm">{option}</span>
          </label>

          {option === 'Other' && formData.photographyCategory.includes('Other') && (
            <input
              type="text"
              placeholder="Please specify..."
              value={formData.otherPhotography || ''}
              onChange={e =>
                setFormData(prev => ({ ...prev, otherPhotography: e.target.value }))
              }
              className="mt-2 ml-6 block w-full border border-gray-300 rounded p-2 text-sm"
            />
          )}
        </div>
      ))}
    </div>
  </div>
)}

{/* Drone Software Development */}
{formData.mainBusinessCategory === 'Drone Software Development' && (
  <div className="p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">Software Development Categories</h3>
    <div className="space-y-2">
      {softwareOptions.map(option => (
        <div key={option}>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.softwareCategory.includes(option)}
              onChange={e =>
                handleMultiSelectChange('softwareCategory', option, e.target.checked)
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm">{option}</span>
          </label>

          {option === 'Other' && formData.softwareCategory.includes('Other') && (
            <input
              type="text"
              placeholder="Please specify..."
              value={formData.otherSoftware || ''}
              onChange={e =>
                setFormData(prev => ({ ...prev, otherSoftware: e.target.value }))
              }
              className="mt-2 ml-6 block w-full border border-gray-300 rounded p-2 text-sm"
            />
          )}
        </div>
      ))}
    </div>
  </div>
)}

{/* GIS Services */}
{formData.mainBusinessCategory === 'GIS Services' && (
  <div className="p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">GIS Service Categories</h3>
    <div className="space-y-2">
      {gisOptions.map(option => (
        <div key={option}>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.gisServicesCategory.includes(option)}
              onChange={e =>
                handleMultiSelectChange('gisServicesCategory', option, e.target.checked)
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm">{option}</span>
          </label>

          {option === 'Other' && formData.gisServicesCategory.includes('Other') && (
            <input
              type="text"
              placeholder="Please specify..."
              value={formData.otherGIS || ''}
              onChange={e =>
                setFormData(prev => ({ ...prev, otherGIS: e.target.value }))
              }
              className="mt-2 ml-6 block w-full border border-gray-300 rounded p-2 text-sm"
            />
          )}
        </div>
      ))}
    </div>
  </div>
)}

{/* DGPS Services */}
{formData.mainBusinessCategory === 'DGPS Services' && (
  <div className="p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">DGPS Service Categories</h3>
    <div className="space-y-2">
      {dgpsOptions.map(option => (
        <div key={option}>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.dgpsServicesCategory.includes(option)}
              onChange={e =>
                handleMultiSelectChange('dgpsServicesCategory', option, e.target.checked)
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm">{option}</span>
          </label>

          {option === 'Other' && formData.dgpsServicesCategory.includes('Other') && (
            <input
              type="text"
              placeholder="Please specify..."
              value={formData.otherDGPS || ''}
              onChange={e =>
                setFormData(prev => ({ ...prev, otherDGPS: e.target.value }))
              }
              className="mt-2 ml-6 block w-full border border-gray-300 rounded p-2 text-sm"
            />
          )}
        </div>
      ))}
    </div>
  </div>
)}


      </div>
    )

      case 3: // Header & Hero
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-black mb-6">Header & Hero Section</h3>

            {/* Company Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Upload your company logo</p>

                {/* Loader & message UI */}
                {imageUploadLoading && (
                  <div className="flex items-center justify-center mt-2">
                    <svg className="animate-spin h-6 w-6 text-[#FFD400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FFD400" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="#FFD400" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span className="ml-2 text-[#FFD400] font-semibold">Uploading image...</span>
                  </div>
                )}
                {imageUploadMessage && (
                  <div className="text-green-600 font-semibold mt-2">{imageUploadMessage}</div>
                )}

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="company-logo-input"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageUploadLoading(true);            // Start loader
                      setImageUploadMessage('');              // Clear old messages
                      try {
                        // Upload to S3 and get the URL
                        const url = await uploadImageToS3(file);
                        setFormData((prev) => ({
                          ...prev,
                          companyLogo: url,
                        }));
                        setImageUploadMessage('Logo uploaded successfully!');
                      } catch (err) {
                        setImageUploadMessage('Image upload failed: ' + (err as Error).message);
                      } finally {
                        setImageUploadLoading(false);         // Stop loader
                      }
                    }
                  }}
                />
                <button
                  className="bg-[#FFD400] px-3 py-1 mt-2 rounded text-black"
                  onClick={() => document.getElementById('company-logo-input')?.click()}
                  type="button"
                >
                  Choose File
                </button>
                {formData.companyLogo && (
                  <img
                    src={formData.companyLogo}
                    alt="Logo Preview"
                    className="mx-auto mt-2 h-16"
                  />
                )}
              </div>
            </div>



            {/* Hero Background Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Upload your hero background image</p>

                {/* Loader & message UI */}
                {heroImageUploadLoading && (
                  <div className="flex items-center justify-center mt-2">
                    <svg className="animate-spin h-6 w-6 text-[#FFD400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FFD400" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="#FFD400" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span className="ml-2 text-[#FFD400] font-semibold">Uploading image...</span>
                  </div>
                )}
                {heroImageUploadMessage && (
                  <div className="text-green-600 font-semibold mt-2">{heroImageUploadMessage}</div>
                )}

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="hero-background-input"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setHeroImageUploadLoading(true);
                      setHeroImageUploadMessage('');
                      try {
                        const url = await uploadImageToS3(file);
                        setFormData((prev) => ({
                          ...prev,
                          heroBackground: url,
                        }));
                        setHeroImageUploadMessage('Hero background uploaded successfully!');
                      } catch (err) {
                        setHeroImageUploadMessage('Image upload failed: ' + (err as Error).message);
                      } finally {
                        setHeroImageUploadLoading(false);
                      }
                    }
                  }}
                />
                <button
                  className="bg-[#FFD400] px-3 py-1 mt-2 rounded text-black"
                  onClick={() => document.getElementById('hero-background-input')?.click()}
                  type="button"
                >
                  Choose File
                </button>
                {formData.heroBackground && (
                  <img
                    src={formData.heroBackground}
                    alt="Hero Background Preview"
                    className="mx-auto mt-2 h-32 w-full object-cover rounded"
                  />
                )}
              </div>
            </div>


            {/* Hero Headline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Headline</label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={e => handleInputChange('heroHeadline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFD400] focus:border-transparent"
                placeholder="Advanced Drone Solutions"
              />
            </div>

            {/* Hero Subheadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subheadline</label>
              <textarea
                value={formData.heroSubheadline}
                onChange={e => handleInputChange('heroSubheadline', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFD400] focus:border-transparent"
                placeholder="Pioneering the future of aerial technology..."
              />
            </div>

            {/* CTA Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Text</label>
                <input
                  type="text"
                  value={formData.primaryCTA.text}
                  onChange={e => handleNestedInputChange('primaryCTA', 'text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFD400] focus:border-transparent"
                  placeholder="Explore Services"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Link</label>
                <input
                  type="text"
                  value={formData.primaryCTA.link}
                  onChange={e => handleNestedInputChange('primaryCTA', 'link', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFD400] focus:border-transparent"
                  placeholder="#services"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Text</label>
                <input
                  type="text"
                  value={formData.secondaryCTA.text}
                  onChange={e => handleNestedInputChange('secondaryCTA', 'text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFD400] focus:border-transparent"
                  placeholder="Contact Us"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Link</label>
                <input
                  type="text"
                  value={formData.secondaryCTA.link}
                  onChange={e => handleNestedInputChange('secondaryCTA', 'link', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFD400] focus:border-transparent"
                  placeholder="#contact"
                />
              </div>
            </div>
          </div>
        );

      case 4: // About Section
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-black mb-6">About Section</h3>

            {/* Section Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={formData.aboutTitle}
                onChange={e => handleInputChange('aboutTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                placeholder="About DroneTech"
              />
            </div>

            {/* Section Description (first para) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Description (Company Summary)</label>
              <textarea
                value={formData.aboutDescription}
                onChange={e => handleInputChange('aboutDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                placeholder="DroneTech is a pioneering company in the UAV industry, specializing in advanced drone solutions for various sectors..."
              />
            </div>

            {/* Section Description (team/experience para) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Description (Team/Experience)</label>
              <textarea
                value={formData.aboutTeamExperience}
                onChange={e => handleInputChange('aboutTeamExperience', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                placeholder="With over 5 years of experience and a team of expert engineers, we deliver cutting-edge drone technology..."
              />
            </div>

            {/* About Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About Section Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Upload about section image</p>

                {/* Loader & message UI */}
                {aboutImageUploadLoading && (
                  <div className="flex items-center justify-center mt-2">
                    <svg className="animate-spin h-6 w-6 text-[#FFD400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FFD400" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="#FFD400" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span className="ml-2 text-[#FFD400] font-semibold">Uploading image...</span>
                  </div>
                )}
                {aboutImageUploadMessage && (
                  <div className="text-green-600 font-semibold mt-2">{aboutImageUploadMessage}</div>
                )}

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="about-image-input"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAboutImageUploadLoading(true);
                      setAboutImageUploadMessage('');
                      try {
                        const url = await uploadImageToS3(file);
                        setFormData((prev) => ({
                          ...prev,
                          aboutImage: url,
                        }));
                        setAboutImageUploadMessage('About image uploaded successfully!');
                      } catch (err) {
                        setAboutImageUploadMessage('Image upload failed: ' + (err as Error).message);
                      } finally {
                        setAboutImageUploadLoading(false);
                      }
                    }
                  }}
                />
                <button
                  className="bg-[#FFD400] px-3 py-1 mt-2 rounded text-black"
                  onClick={() => document.getElementById('about-image-input')?.click()}
                  type="button"
                >
                  Choose File
                </button>
                {formData.aboutImage && (
                  <img
                    src={formData.aboutImage}
                    alt="About Preview"
                    className="mx-auto mt-2 h-16"
                  />
                )}
              </div>
            </div>



            {/* Years of Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <input
                type="number"
                min={1}
                value={formData.aboutExperienceYears || 5}
                onChange={e => handleInputChange('aboutExperienceYears', parseInt(e.target.value))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                placeholder="5"
              />
              <span className="ml-2 text-gray-600 text-sm">Years</span>
            </div>

            {/* Company Values */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Company Values (Mission, Vision, Values)</label>
                <button
                  onClick={() => addArrayItem('companyValues', { icon: 'target', title: '', description: '' })}
                  className="bg-[#FF0000] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#FF0000]/90"
                >
                  <Plus size={16} />
                  Add Value
                </button>
              </div>
              <div className="space-y-4">
                {formData.companyValues.map((value, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      {/* Icon selector */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                        <select
                          value={value.icon}
                          onChange={e => updateArrayItem('companyValues', index, { ...value, icon: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="target">🎯 Target (Mission)</option>
                          <option value="eye">👁️ Eye (Vision)</option>
                          <option value="award">🏆 Award (Values)</option>
                        </select>
                      </div>
                      {/* Value title */}
                      <input
                        type="text"
                        value={value.title}
                        onChange={e => updateArrayItem('companyValues', index, { ...value, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g. Mission"
                      />
                      {/* Delete button */}
                      <button
                        onClick={() => removeArrayItem('companyValues', index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-6"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {/* Value description */}
                    <textarea
                      value={value.description}
                      onChange={e => updateArrayItem('companyValues', index, { ...value, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Describe this value..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5: // Services
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black">Services Section</h3>
              <button
                onClick={() =>
                  addArrayItem('services', {
                    icon: 'camera',
                    title: '',
                    description: ''
                  })
                }
                className="bg-[#FF0000] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#FF0000]/90"
              >
                <Plus size={16} />
                Add Service
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={formData.servicesTitle}
                onChange={e => handleInputChange('servicesTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                placeholder="Our Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
              <textarea
                value={formData.servicesDescription || ''}
                onChange={e => handleInputChange('servicesDescription', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                placeholder="Comprehensive drone solutions tailored to meet the unique needs of various industries and applications."
              />
            </div>

            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid md:grid-cols-4 gap-4 items-end">
                    {/* Icon Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                      <select
                        value={service.icon}
                        onChange={e =>
                          updateArrayItem('services', index, {
                            ...service,
                            icon: e.target.value
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                      >
                        <option value="camera">Camera (Aerial Surveying)</option>
                        <option value="zap">Zap (Agricultural Monitoring)</option>
                        <option value="shield">Shield (Security & Surveillance)</option>
                        <option value="settings">Settings (Custom UAV Solutions)</option>
                      </select>
                    </div>
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={e =>
                          updateArrayItem('services', index, {
                            ...service,
                            title: e.target.value
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                        placeholder="e.g. Aerial Surveying"
                      />
                    </div>
                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={service.description}
                        onChange={e =>
                          updateArrayItem('services', index, {
                            ...service,
                            description: e.target.value
                          })
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                        placeholder="Describe the service..."
                      />
                    </div>
                    {/* Remove Button */}
                    <button
                      onClick={() => removeArrayItem('services', index)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mt-8"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 6: // Products
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black">Products Section</h3>
              <button
                onClick={() => addArrayItem('products', { image: '', title: '', description: '', link: '' })}
                className="bg-[#FF0000] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#FF0000]/90"
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={formData.productsTitle}
                onChange={(e) => handleInputChange('productsTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories (comma-separated)</label>
              <input
                type="text"
                value={formData.productCategories}
                onChange={(e) => handleInputChange('productCategories', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                placeholder="All, Surveillance, Agriculture, Custom"
              />
            </div>

            <div className="space-y-6">
              {formData.products.map((product, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500 text-sm">Upload product image</p>

                        {/* Loader & message UI */}
                        {productImageUploadLoading[index] && (
                          <div className="flex items-center justify-center mt-2">
                            <svg className="animate-spin h-6 w-6 text-[#FFD400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FFD400" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="#FFD400" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            <span className="ml-2 text-[#FFD400] font-semibold">Uploading image...</span>
                          </div>
                        )}
                        {productImageUploadMessage[index] && (
                          <div className="text-green-600 font-semibold mt-2">{productImageUploadMessage[index]}</div>
                        )}

                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          id={`product-image-input-${index}`}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setProductImageUploadLoading((prev) => ({ ...prev, [index]: true }));
                              setProductImageUploadMessage((prev) => ({ ...prev, [index]: '' }));
                              try {
                                const url = await uploadImageToS3(file);
                                updateArrayItem('products', index, { ...product, image: url });
                                setProductImageUploadMessage((prev) => ({ ...prev, [index]: 'Product image uploaded successfully!' }));
                              } catch (err) {
                                setProductImageUploadMessage((prev) => ({ ...prev, [index]: 'Image upload failed: ' + (err as Error).message }));
                              } finally {
                                setProductImageUploadLoading((prev) => ({ ...prev, [index]: false }));
                              }
                            }
                          }}
                        />
                        <button
                          className="bg-[#FFD400] px-3 py-1 mt-2 rounded text-black"
                          onClick={() => document.getElementById(`product-image-input-${index}`)?.click()}
                          type="button"
                        >
                          Choose File
                        </button>
                        {product.image && (
                          <img
                            src={product.image}
                            alt="Product Preview"
                            className="mx-auto mt-2 h-16"
                          />
                        )}
                      </div>
                    </div>


                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={product.title}
                          onChange={(e) => updateArrayItem('products', index, { ...product, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                          placeholder="Product name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                        <input
                          type="text"
                          value={product.link}
                          onChange={(e) => updateArrayItem('products', index, { ...product, link: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                          placeholder="Product link"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={product.description}
                      onChange={(e) => updateArrayItem('products', index, { ...product, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                      placeholder="Product description..."
                    />
                  </div>
                  <button
                    onClick={() => removeArrayItem('products', index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                    Remove Product
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 7: // Clients & Testimonials
        return (
          <div className="space-y-10">
            <h3 className="text-2xl font-bold text-black mb-6">Clients & Testimonials</h3>

            {/* Clients Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Clients</label>
                <button
                  onClick={() => addArrayItem('clients', { name: '', logo: '', industry: '' })}
                  className="bg-[#FFD400] text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#FFD400]/90"
                >
                  <Plus size={16} />
                  Add Client
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(formData.clients || []).map((client, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-sm space-y-3">
                    {/* Logo Upload */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Logo</label>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          {client.logo ? (
                            <img src={client.logo} alt="Client Logo" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-gray-400 text-xs">No Logo</span>
                          )}
                        </div>
                        {/* Loader & Message */}
                        {clientLogoUploadLoading[idx] && (
                          <div className="flex items-center ml-2">
                            <svg className="animate-spin h-5 w-5 text-[#FFD400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FFD400" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="#FFD400" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                          </div>
                        )}
                        {clientLogoUploadMessage[idx] && (
                          <span className="text-green-600 text-xs ml-2">{clientLogoUploadMessage[idx]}</span>
                        )}
                        <button
                          className="bg-[#FFD400] text-black px-2 py-1 text-xs rounded"
                          type="button"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async (e: any) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setClientLogoUploadLoading((prev) => ({ ...prev, [idx]: true }));
                                setClientLogoUploadMessage((prev) => ({ ...prev, [idx]: '' }));
                                try {
                                  const url = await uploadImageToS3(file);
                                  updateArrayItem('clients', idx, { ...client, logo: url });
                                  setClientLogoUploadMessage((prev) => ({ ...prev, [idx]: 'Logo uploaded!' }));
                                } catch (err) {
                                  setClientLogoUploadMessage((prev) => ({ ...prev, [idx]: 'Upload failed: ' + (err as Error).message }));
                                } finally {
                                  setClientLogoUploadLoading((prev) => ({ ...prev, [idx]: false }));
                                }
                              }
                            };
                            input.click();
                          }}
                        >
                          Upload
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                          onClick={() => removeArrayItem('clients', idx)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Client Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Client Name</label>
                      <input
                        type="text"
                        value={client.name}
                        onChange={e => updateArrayItem('clients', idx, { ...client, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Company Name"
                      />
                    </div>
                    {/* Client Industry */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Industry</label>
                      <input
                        type="text"
                        value={client.industry}
                        onChange={e => updateArrayItem('clients', idx, { ...client, industry: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="e.g. Technology, Agriculture"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Testimonials</label>
                <button
                  onClick={() => addArrayItem('testimonials', { name: '', role: '', quote: '', photo: '', rating: 5 })}
                  className="bg-[#FF0000] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#FF0000]/90"
                >
                  <Plus size={16} />
                  Add Testimonial
                </button>
              </div>

              <div className="space-y-6">
                {formData.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client Photo</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-500 text-sm">Upload client photo</p>

                          {/* Loader & message UI */}
                          {testimonialPhotoUploadLoading[index] && (
                            <div className="flex items-center justify-center mt-2">
                              <svg className="animate-spin h-6 w-6 text-[#FFD400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FFD400" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="#FFD400" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                              </svg>
                              <span className="ml-2 text-[#FFD400] font-semibold">Uploading image...</span>
                            </div>
                          )}
                          {testimonialPhotoUploadMessage[index] && (
                            <div className="text-green-600 font-semibold mt-2">{testimonialPhotoUploadMessage[index]}</div>
                          )}

                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            id={`testimonial-photo-input-${index}`}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setTestimonialPhotoUploadLoading((prev) => ({ ...prev, [index]: true }));
                                setTestimonialPhotoUploadMessage((prev) => ({ ...prev, [index]: '' }));
                                try {
                                  const url = await uploadImageToS3(file);
                                  updateArrayItem('testimonials', index, { ...testimonial, photo: url });
                                  setTestimonialPhotoUploadMessage((prev) => ({ ...prev, [index]: 'Client photo uploaded successfully!' }));
                                } catch (err) {
                                  setTestimonialPhotoUploadMessage((prev) => ({ ...prev, [index]: 'Image upload failed: ' + (err as Error).message }));
                                } finally {
                                  setTestimonialPhotoUploadLoading((prev) => ({ ...prev, [index]: false }));
                                }
                              }
                            }}
                          />
                          <button
                            className="bg-[#FFD400] px-3 py-1 mt-2 rounded text-black"
                            onClick={() => document.getElementById(`testimonial-photo-input-${index}`)?.click()}
                            type="button"
                          >
                            Choose File
                          </button>
                          {testimonial.photo && (
                            <img
                              src={testimonial.photo}
                              alt="Client Photo Preview"
                              className="mx-auto mt-2 h-16"
                            />
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                          <input
                            type="text"
                            value={testimonial.name}
                            onChange={(e) => updateArrayItem('testimonials', index, { ...testimonial, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                          <input
                            type="text"
                            value={testimonial.role}
                            onChange={(e) => updateArrayItem('testimonials', index, { ...testimonial, role: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                            placeholder="CEO, Company Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => updateArrayItem('testimonials', index, { ...testimonial, rating: star })}
                                className={`${star <= testimonial.rating ? 'text-[#FFD400]' : 'text-gray-300'}`}
                              >
                                <Star size={20} fill="currentColor" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                      <textarea
                        value={testimonial.quote}
                        onChange={(e) => updateArrayItem('testimonials', index, { ...testimonial, quote: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                        placeholder="What did they say about your company?"
                      />
                    </div>
                    <button
                      onClick={() => removeArrayItem('testimonials', index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                      Remove Testimonial
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 8: // Contact
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-black mb-6">Contact Section</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={formData.contactTitle}
                onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Line</label>
                <input
                  type="text"
                  value={formData.addressLine}
                  onChange={e => handleInputChange('addressLine', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Hyderabad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={e => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Telangana"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pin Code</label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={e => handleInputChange('pinCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="500001"
                />
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
              <input
                type="url"
                value={formData.mapEmbedUrl}
                onChange={(e) => handleInputChange('mapEmbedUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                placeholder="https://maps.google.com/embed?..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Form Text</label>
              <textarea
                value={formData.contactFormText}
                onChange={(e) => handleInputChange('contactFormText', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Submit Button Text</label>
              <input
                type="text"
                value={formData.submitButtonText}
                onChange={(e) => handleInputChange('submitButtonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
              />
            </div>
          </div>
        );

      case 9: // Footer
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-black mb-6">Footer Section</h3>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Upload your footer logo</p>

                {/* Loader & message UI */}
                {footerLogoUploadLoading && (
                  <div className="flex items-center justify-center mt-2">
                    <svg className="animate-spin h-6 w-6 text-[#FFD400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FFD400" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="#FFD400" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span className="ml-2 text-[#FFD400] font-semibold">Uploading image...</span>
                  </div>
                )}
                {footerLogoUploadMessage && (
                  <div className="text-green-600 font-semibold mt-2">{footerLogoUploadMessage}</div>
                )}

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="footer-logo-input"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFooterLogoUploadLoading(true);
                      setFooterLogoUploadMessage('');
                      try {
                        // Upload to S3 and get the URL
                        const url = await uploadImageToS3(file);
                        setFormData((prev) => ({
                          ...prev,
                          footerLogo: url,
                        }));
                        setFooterLogoUploadMessage('Footer logo uploaded successfully!');
                      } catch (err) {
                        setFooterLogoUploadMessage('Image upload failed: ' + (err as Error).message);
                      } finally {
                        setFooterLogoUploadLoading(false);
                      }
                    }
                  }}
                />
                <button
                  className="bg-[#FFD400] px-3 py-1 mt-2 rounded text-black"
                  onClick={() => document.getElementById('footer-logo-input')?.click()}
                  type="button"
                >
                  Choose File
                </button>
                {formData.footerLogo && (
                  <img
                    src={formData.footerLogo}
                    alt="Footer Logo Preview"
                    className="mx-auto mt-2 h-16"
                  />
                )}
              </div>
            </div>



            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Description</label>
              <textarea
                value={formData.footerDescription || ''}
                onChange={e => handleInputChange('footerDescription', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                placeholder="Short company description for the footer..."
              />
            </div>

            {/* Footer Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text</label>
              <input
                type="text"
                value={formData.footerText || ''}
                onChange={e => handleInputChange('footerText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
              />
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={formData.footerEmail || ''}
                  onChange={e => handleInputChange('footerEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                  placeholder="info@dronetech.com"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={formData.footerPhone || ''}
                  onChange={e => handleInputChange('footerPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Contact Address</label>
                <input
                  type="text"
                  value={formData.footerAddress || ''}
                  onChange={e => handleInputChange('footerAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
                  placeholder="Bangalore, Karnataka"
                />
              </div>
            </div>

            {/* Footer Navigation Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Navigation Links</label>
              <div className="space-y-2">
                {formData.footerNavLinks?.map((item, idx) => (
                  <div className="flex gap-2" key={idx}>
                    <input
                      type="text"
                      value={item.label}
                      onChange={e => updateArrayItem('footerNavLinks', idx, { ...item, label: e.target.value })}
                      placeholder="Label"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={item.link}
                      onChange={e => updateArrayItem('footerNavLinks', idx, { ...item, link: e.target.value })}
                      placeholder="#section"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('footerNavLinks', idx)}
                      className="text-red-500 font-bold"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('footerNavLinks', { label: '', link: '' })}
                  className="text-[#FF0000] mt-2 px-2 py-1 rounded border border-[#FF0000]"
                >
                  + Add Link
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Facebook</label>
                  <input
                    type="url"
                    value={formData.socialLinks.facebook || ''}
                    onChange={e => handleNestedInputChange('socialLinks', 'facebook', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Twitter</label>
                  <input
                    type="url"
                    value={formData.socialLinks.twitter || ''}
                    onChange={e => handleNestedInputChange('socialLinks', 'twitter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Instagram</label>
                  <input
                    type="url"
                    value={formData.socialLinks.instagram || ''}
                    onChange={e => handleNestedInputChange('socialLinks', 'instagram', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin || ''}
                    onChange={e => handleNestedInputChange('socialLinks', 'linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">YouTube</label>
                  <input
                    type="url"
                    value={formData.socialLinks.youtube || ''}
                    onChange={e => handleNestedInputChange('socialLinks', 'youtube', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Website</label>
                  <input
                    type="url"
                    value={formData.socialLinks.website || ''}
                    onChange={e => handleNestedInputChange('socialLinks', 'website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">WhatsApp</label>
                  <input
                    type="url"
                    value={formData.socialLinks.whatsapp || ''}
                    onChange={e => handleNestedInputChange('socialLinks', 'whatsapp', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://wa.me/..."
                  />
                </div>
              </div>
            </div>

            {/* Newsletter Toggle */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={!!formData.newsletterEnabled}
                onChange={e => handleInputChange('newsletterEnabled', e.target.checked)}
                id="newsletterEnabled"
                className="w-5 h-5 border-gray-400 rounded focus:ring-2 focus:ring-[#FF0000]"
              />
              <label htmlFor="newsletterEnabled" className="text-gray-700 text-sm font-medium">
                Enable Newsletter Signup in Footer
              </label>
            </div>

            {formData.newsletterEnabled && (
              <div>
                <label className="block text-xs text-gray-500 mb-1">Newsletter Description</label>
                <input
                  type="text"
                  value={formData.newsletterDescription || ''}
                  onChange={e => handleInputChange('newsletterDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Subscribe to our newsletter for the latest drone technology updates."
                />
              </div>
            )}
          </div>
        );
    case 10://Certificates and Marketing Preferences
      return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-black mb-4">Certificates & Marketing Preferences</h2>
      
      {/* DGCA Type Certificate Upload - Show only for Manufacturing */}
      {(formData.mainBusinessCategory === 'Drone Manufacturing' || 
        formData.manufacturingSubcategory.some(cat => !cat.includes('Not Applicable'))) && (
        <div className=" p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">DGCA Type Certificate</h3>
          <div className="border-2 border-dashed text-gray-300 rounded-lg p-6 text-center">
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-sm">Upload your DGCA Type Certificate</p>
            <p className="text-gray-400 text-xs p-2">Supported files: PDF or image. Max 10 MB.</p>
            
            <input
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              id="dgca-certificate-input"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const url = await uploadImageToS3(file);
                    handleInputChange('dgcaCertificate', url);
                  } catch (err) {
                    alert('Certificate upload failed: ' + (err as Error).message);
                  }
                }
              }}
            />
            <button
              className="bg-[#FFD400] px-3 py-1 mt-2 rounded text-black"
              onClick={() => document.getElementById('dgca-certificate-input')?.click()}
              type="button"
            >
              Choose Certificate
            </button>
            {formData.dgcaCertificate && (
              <div className="mt-3 text-green-600 font-semibold">
                ✅ Certificate uploaded successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {/* RPTO Authorization Certificate - Show only for Training */}
      {(formData.mainBusinessCategory === 'DGCA RPTO - Drone Training and Certification' || 
        formData.trainingCategory.some(cat => cat.includes('RPTO'))) && (
        <div className=" p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">RPTO Authorization Certificate</h3>
          <div className="border-2 border-dashed text-gray-300 rounded-lg p-6 text-center">
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-sm">Upload your RPTO Authorization Certificate</p>
            <p className="text-gray-400 text-xs p-2">Supported files: PDF or image. Max 10 MB.</p>
            
            <input
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              id="rpto-certificate-input"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const url = await uploadImageToS3(file);
                    handleInputChange('rptoCertificate', url);
                  } catch (err) {
                    alert('Certificate upload failed: ' + (err as Error).message);
                  }
                }
              }}
            />
            <button
             className="bg-[#FFD400] px-3 py-1 mt-2 rounded text-black"
              onClick={() => document.getElementById('rpto-certificate-input')?.click()}
              type="button"
            >
              Choose Certificate
            </button>
            {formData.rptoCertificate && (
              <div className="mt-3 text-green-600 font-semibold">
                ✅ Certificate uploaded successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Marketing Preferences */}
      <div className=" p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Preferred Promo Format In Drone TV *</h3>
        <p className="text-sm text-gray-600 mb-4">Select all promotional formats you're interested in:</p>
        <div className="space-y-3">
          {promoFormatOptions.map(option => (
            <label key={option} className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.preferredPromoFormat.includes(option)}
                onChange={e => handleMultiSelectChange('preferredPromoFormat', option, e.target.checked)}
                className="mt-1 rounded border-gray-300"
              />
              <span className="text-sm leading-relaxed">{option}</span>
            </label>
          ))}
        </div>
        
        {formData.preferredPromoFormat.length === 0 && (
          <div className="mt-3 text-red-600 text-sm">
            Please select at least one promotional format.
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Form Summary</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Company:</strong> {formData.companyName}</p>
            <p><strong>Director:</strong> {formData.directorName}</p>
            <p><strong>Category:</strong> {formData.mainBusinessCategory}</p>
            <p><strong>Employees:</strong> {formData.numberOfEmployees}</p>
          </div>
          <div>
            <p><strong>Website:</strong> {formData.websiteURL || 'Not provided'}</p>
            <p><strong>Location:</strong> {formData.city}, {formData.state}</p>
            <p><strong>Promo Formats:</strong> {formData.preferredPromoFormat.length} selected</p>
          </div>
        </div>
      </div>
    </div>
  );
      
      
      
        default:
        return null;
    }
  };
/*Added for AI analysis of company from URL*/
// const analyseCompanyFromURL = async (url: string) => {
//   try {
//     const prompt = `Visit ${url} and extract:
//     {
//       "description": "A 3–5 sentence company description.",
//       "mission": "Short mission statement",
//       "vision": "Short vision statement",
//       "values": "Comma-separated list of core values"
//     }`;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }]
//     });

//     const raw = completion.choices[0].message.content || "{}";
//     const parsed = JSON.parse(raw);

//     setFormData(prev => ({
//       ...prev,
//       aboutDescription: parsed.description || prev.aboutDescription,
//       companyValues: [
//         { icon: "target", title: "Mission", description: parsed.mission || "" },
//         { icon: "eye", title: "Vision", description: parsed.vision || "" },
//         { icon: "award", title: "Values", description: parsed.values || "" }
//       ]
//     }));
//   } catch (error) {
//     console.error("AI fetch failed", error);
//   }
// };
/****** */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              Drone<span className="text-[#FFD400]">TV</span>
            </div>
            <nav>
              <span className="text-white">Company Form Builder</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#FF0000] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Step Navigation */}
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <div className="flex flex-wrap gap-2 mb-6">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index + 1)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${currentStep === index + 1
                      ? 'bg-[#FF0000] text-white'
                      : currentStep > index + 1
                        ? 'bg-[#FFD400] text-black'
                        : 'bg-gray-200 text-gray-600'
                      }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-600 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                <ArrowLeft size={20} />
                Previous
              </button>

              {currentStep < steps.length ? (
  <button
    onClick={() => {
      const enteredCode = promoCode.trim().toLowerCase();
      const validCodes = ['mumbai2025', 'dronetv2025', 'dtea2025','pranay2025'];

      // Validation for Step 1
      if (currentStep === 1) {
        if (!validCodes.includes(enteredCode)) {
          setPromoCodeError('Please enter a valid promotional code to proceed.');
          return;
        }
        // Additional validation for required fields
        if (!formData.companyName || !formData.directorName || !formData.directorEmail) {
          alert('Please fill in all required fields marked with *');
          return;
        }
      }

      // Validation for Step 2 (Business Categories)
      if (currentStep === 2) {
        if (!formData.mainBusinessCategory) {
          alert('Please select a main business category.');
          return;
        }
      }

      // Validation for Step 10 (Marketing)
      if (currentStep === 10) {
        if (formData.preferredPromoFormat.length === 0) {
          alert('Please select at least one promotional format.');
          return;
        }
      }

      setPromoCodeError('');
      setCurrentStep(Math.min(steps.length, currentStep + 1));
    }}
    className="flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white rounded-lg font-semibold hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Next
    <ArrowRight size={20} />
  </button>
) : (
  <button
    onClick={handleSubmit}
    className="flex items-center gap-2 px-8 py-3 bg-[#FFD400] text-black rounded-lg font-semibold hover:bg-[#FFD400]/90 transition-colors"
  >
    <Save size={20} />
    Create Company Page
  </button>
)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCompany;