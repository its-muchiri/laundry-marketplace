import { Metadata } from 'next';
import SignupForm from './signup-form';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Sign Up - ${brand.name}`,
  description: `Create your ${brand.name} account`,
};

export default function SignupPage() {
  return <SignupForm />;
}
