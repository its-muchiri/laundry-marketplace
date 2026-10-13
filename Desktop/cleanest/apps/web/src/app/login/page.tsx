import { Metadata } from 'next';
import LoginForm from './login-form';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Login - ${brand.name}`,
  description: `Sign in to your ${brand.name} account`,
};

export default function LoginPage() {
  return <LoginForm />;
}
