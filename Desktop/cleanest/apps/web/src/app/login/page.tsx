import { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Login - Laundry Marketplace Kenya',
  description: 'Sign in to your LaundryKE account',
};

export default function LoginPage() {
  return <LoginForm />;
}
