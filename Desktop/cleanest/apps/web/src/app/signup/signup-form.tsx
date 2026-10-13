'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { brand } from '@/lib/brand';

type Role = 'customer' | 'provider' | 'rider';

const areas = [
  'Ngomongo',
  'Diaspora',
  'Gitwe',
  'Mjini',
  'Soko',
  'Joslian',
  'Executive',
  'Leisure',
  'Spenza',
  'Summer Gardens',
  'Maanet',
];

export default function SignupForm() {
  const [role, setRole] = useState<Role>('customer');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [address, setAddress] = useState({
    area: '',
    street: '',
    landmark: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    window.location.href = '/dashboard';
  };

  const roles: { value: Role; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'customer',
      label: 'Customer',
      description: 'Book laundry pickup and delivery',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      value: 'provider',
      label: 'Provider',
      description: 'Run a laundry facility, accept orders',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      value: 'rider',
      label: 'Rider',
      description: 'Pick up and deliver laundry orders',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg">
              <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-cover" />
            </div>
            <span className="text-2xl font-bold tracking-tight">{brand.name}</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-foreground-muted">Join thousands of Kenyans using {brand.name}</p>
        </div>

        <div className="card p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">I want to sign up as a:</label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    role === r.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-border hover:border-border-strong'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.value}
                    checked={role === r.value}
                    onChange={() => setRole(r.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className={`mx-auto mb-2 ${role === r.value ? 'text-primary-strong' : 'text-foreground-muted'}`}>
                      {r.icon}
                    </div>
                    <div className="font-medium text-foreground">{r.label}</div>
                    <div className="text-xs text-foreground-muted mt-1">{r.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-lg text-sm" role="alert">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="+254 7XX XXX XXX"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="input-field"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-foreground-muted">At least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {role === 'customer' && (
              <div className="border border-border rounded-lg p-4 bg-surface">
                <p className="flex items-center gap-2 text-sm font-medium mb-4">
                  <MapPin className="h-4 w-4 text-primary-strong" />
                  Where should riders pick you up?
                </p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-foreground mb-1">
                      Area
                    </label>
                    <select
                      id="area"
                      value={address.area}
                      onChange={(e) => setAddress({ ...address, area: e.target.value })}
                      required
                      className="input-field"
                    >
                      <option value="">Select your area in Kutus</option>
                      {areas.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="street" className="block text-sm font-medium text-foreground mb-1">
                      Street or building
                    </label>
                    <input
                      id="street"
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      required
                      className="input-field"
                      placeholder="Ngomongo Shopping Centre"
                    />
                  </div>
                  <div>
                    <label htmlFor="landmark" className="block text-sm font-medium text-foreground mb-1">
                      Landmark <span className="text-foreground-muted font-normal">(optional)</span>
                    </label>
                    <input
                      id="landmark"
                      type="text"
                      value={address.landmark}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      className="input-field"
                      placeholder="e.g. near the blue kiosk"
                    />
                    <p className="mt-2 text-xs text-foreground-muted">
                      We store your address and coordinates once at
                      sign-up, so you never need to pin your location
                      again for each booking.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="mt-1 w-4 h-4 text-primary-strong border-border rounded focus:ring-primary-strong"
              />
              <label htmlFor="terms" className="text-sm text-foreground-muted">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-strong hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary-strong hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground-muted">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-strong hover:text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
