import { Metadata } from 'next';
import SignupForm from './signup-form';

export const metadata: Metadata = {
  title: 'Sign Up - Laundry Marketplace Kenya',
  description: 'Create your LaundryKE account',
};

export default function SignupPage() {
  return <SignupForm />;
}
