import { useState, FormEvent } from 'react';
import axios from 'axios';

interface Tool {
  name: string;
  installed: string;
  skillLevel: string;
}

interface FormData {
  name: string;
  email: string;
  tools: Tool[];
  painPoints: {
    images: boolean;
    inventory: boolean;
    manualTasks: boolean;
    other: boolean;
    otherText: string;
  };
  dietary: {
    noPreference: boolean;
    vegetarian: boolean;
    vegan: boolean;
    halal: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    other: boolean;
    otherText: string;
  };
}

export default function WorkshopForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    tools: [
      { name: 'Claude', installed: '', skillLevel: '' },
      { name: 'Claude Code', installed: '', skillLevel: '' },
      { name: 'n8n', installed: '', skillLevel: '' },
    ],
    painPoints: {
      images: false,
      inventory: false,
      manualTasks: false,
      other: false,
      otherText: '',
    },
    dietary: {
      noPreference: false,
      vegetarian: false,
      vegan: false,
      halal: false,
      glutenFree: false,
      dairyFree: false,
      other: false,
      otherText: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleToolChange = (index: number, field: 'installed' | 'skillLevel', value: string) => {
    const newTools = [...formData.tools];
    newTools[index][field] = value;
    setFormData({ ...formData, tools: newTools });
  };

  const handlePainPointChange = (field: keyof typeof formData.painPoints, value: boolean | string) => {
    setFormData({
      ...formData,
      painPoints: {
        ...formData.painPoints,
        [field]: value,
      },
    });
  };

  const handleDietaryChange = (field: keyof typeof formData.dietary, value: boolean | string) => {
    setFormData({
      ...formData,
      dietary: {
        ...formData.dietary,
        [field]: value,
      },
    });
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Check if email is in the allowed list
    const allowedEmailsString = import.meta.env.VITE_ALLOWED_EMAILS;
    if (allowedEmailsString) {
      const allowedEmails = allowedEmailsString
        .split(',')
        .map(email => email.trim().toLowerCase());

      const isEmailAllowed = allowedEmails.includes(formData.email.toLowerCase());

      if (!isEmailAllowed) {
        setError('This email address is not registered for the workshop. Please use the email you used when purchasing your ticket. If someone else purchased your ticket, use the email address you provided to us when we collected attendee information.');
        return false;
      }
    }

    if (formData.painPoints.other && !formData.painPoints.otherText.trim()) {
      setError('Please specify the "Other" pain point');
      return false;
    }

    if (formData.dietary.other && !formData.dietary.otherText.trim()) {
      setError('Please specify your "Other" dietary requirements');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

      if (!webhookUrl) {
        throw new Error('Webhook URL is not configured');
      }

      await axios.post(webhookUrl, formData);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting the form');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="card max-w-2xl w-full animate-fade-in text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-text-secondary text-lg">
            Your form has been submitted successfully. We'll be in touch soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="card max-w-4xl w-full animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">AI Workshop Registration</h2>
          <p className="text-text-secondary">
            Complete here and submit
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-warning flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3 className="text-warning font-semibold text-sm mb-1">IMPORTANT</h3>
              <p className="text-sm text-text-secondary">
                Please use the same name and email address you used when purchasing your ticket.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name <span className="text-error">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={loading}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-error">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Tools Table */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Tool Installation & Skill Level
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              This information is essential. We need to confirm you have the tools installed
              and subscriptions active. If not, we'll arrange a group call with Leo to help
              with setup. It also helps us tailor the course to everyone's needs.
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Tool</th>
                    <th>Installed (Yes/No)</th>
                    <th>Skill level (0–5)</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.tools.map((tool, index) => (
                    <tr key={tool.name}>
                      <td className="font-medium text-white">{tool.name}</td>
                      <td>
                        <select
                          value={tool.installed}
                          onChange={(e) => handleToolChange(index, 'installed', e.target.value)}
                          disabled={loading}
                          className="w-full"
                        >
                          <option value="">Select...</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={tool.skillLevel}
                          onChange={(e) => handleToolChange(index, 'skillLevel', e.target.value)}
                          disabled={loading}
                          placeholder="0-5"
                          className="w-full"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Business Pain Points */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Business pain points <span className="text-sm font-normal text-text-secondary">(select all that apply)</span>
            </h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.painPoints.images}
                  onChange={(e) => handlePainPointChange('images', e.target.checked)}
                  disabled={loading}
                  className="mt-1"
                />
                <span className="text-text-secondary">
                  Images (main image and/or image stack)
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.painPoints.inventory}
                  onChange={(e) => handlePainPointChange('inventory', e.target.checked)}
                  disabled={loading}
                  className="mt-1"
                />
                <span className="text-text-secondary">
                  Inventory/accounting/data
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.painPoints.manualTasks}
                  onChange={(e) => handlePainPointChange('manualTasks', e.target.checked)}
                  disabled={loading}
                  className="mt-1"
                />
                <span className="text-text-secondary">
                  Manual tasks draining you or your team
                </span>
              </label>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.painPoints.other}
                    onChange={(e) => handlePainPointChange('other', e.target.checked)}
                    disabled={loading}
                    className="mt-1"
                  />
                  <span className="text-text-secondary">Other (please specify):</span>
                </label>
                {formData.painPoints.other && (
                  <textarea
                    value={formData.painPoints.otherText}
                    onChange={(e) => handlePainPointChange('otherText', e.target.value)}
                    disabled={loading}
                    placeholder="Please describe your pain point..."
                    className="mt-3 min-h-[100px]"
                    rows={4}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Dietary Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Dietary and refreshments
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              We will provide snacks and beverages at the workshop. Please tick all that apply so we can plan cost-effective options:
            </p>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dietary.noPreference}
                  onChange={(e) => handleDietaryChange('noPreference', e.target.checked)}
                  disabled={loading}
                  className="mt-1"
                />
                <span className="text-text-secondary">No preference</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dietary.vegetarian}
                  onChange={(e) => handleDietaryChange('vegetarian', e.target.checked)}
                  disabled={loading}
                  className="mt-1"
                />
                <span className="text-text-secondary">Vegetarian</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dietary.vegan}
                  onChange={(e) => handleDietaryChange('vegan', e.target.checked)}
                  disabled={loading}
                  className="mt-1"
                />
                <span className="text-text-secondary">Vegan</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dietary.halal}
                  onChange={(e) => handleDietaryChange('halal', e.target.checked)}
                  disabled={loading}
                  className="mt-1"
                />
                <span className="text-text-secondary">Halal</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dietary.glutenFree}
                  onChange={(e) => handleDietaryChange('glutenFree', e.target.checked)}
                  disabled={loading}
                  className="mt-1"
                />
                <span className="text-text-secondary">Gluten-free</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dietary.dairyFree}
                  onChange={(e) => handleDietaryChange('dairyFree', e.target.checked)}
                  disabled={loading}
                  className="mt-1"
                />
                <span className="text-text-secondary">Dairy-free</span>
              </label>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dietary.other}
                    onChange={(e) => handleDietaryChange('other', e.target.checked)}
                    disabled={loading}
                    className="mt-1"
                  />
                  <span className="text-text-secondary">Other (please specify):</span>
                </label>
                {formData.dietary.other && (
                  <textarea
                    value={formData.dietary.otherText}
                    onChange={(e) => handleDietaryChange('otherText', e.target.value)}
                    disabled={loading}
                    placeholder="Please specify your dietary requirements..."
                    className="mt-3 min-h-[80px]"
                    rows={3}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="spinner" />
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
