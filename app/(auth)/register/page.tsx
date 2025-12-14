'use client';

import { useState } from 'react';
import Btn from '@/app/utils/Btn';
import InputField from '@/app/utils/InputField';
import Link from 'next/link';
import { registerAction } from '@/app/actions/authActions';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const RegisterPage = () => {
  type RegisterForm = {
    farmName: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    phoneNumber: string;
  }
 const [form, setForm] = useState<RegisterForm>({
   farmName: '',
   fullName: '',
   email: '',
   password: '',
   confirmPassword: '',
   role: '',
   phoneNumber: '',
 });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerAction(form);
      toast.success('Register successful! Redirecting...');
      router.push('login');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-full w-full items-center justify-center py-8 md:py-12">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col gap-4 px-4 max-sm:justify-center lg:px-10"
      >
        <h1 className="text-(--primary_color) mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
          Create Account
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <InputField
            label="Enter Your Farm’s Name"
            placeholder="Enter Your Farm’s Name"
            id="farmName"
            name="farmName"
            type="text"
            className="flex-1"
            onChange={e => setForm({ ...form, farmName: e.target.value })}
          />
          <InputField
            label="Enter Your Name"
            placeholder="Enter Your Name"
            id="fullName"
            name="fullName"
            type="text"
            className="flex-1"
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />
        </div>

        <InputField
          label="Email Address"
          placeholder="Enter Your Email"
          id="email"
          name="email"
          type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <InputField
          label="Password"
          placeholder="Enter Your Password"
          id="password"
          name="password"
          type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <InputField
          label="Confirm Password"
          placeholder="Enter Your Password Again"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <InputField
          label="Role"
          placeholder="Enter Your Role"
          id="Role"
          name="Role"
          type="number"
          onChange={e => setForm({ ...form, role: e.target.value })}
        />
        <InputField
          label="PhoneNumber"
          placeholder="Enter Your PhoneNumber"
          id="PhoneNumber"
          name="PhoneNumber"
          type="number"
          onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
        />

        <Btn
          text={loading ? 'Creating account...' : 'Create account'}
          type="submit"
        />

        <span className="text-(--offwhite_color) flex items-center gap-1">
          already have an account ?{' '}
          <Link
            href="/login"
            className="text-(--primary_color) font-bold underline"
          >
            LOGIN
          </Link>
        </span>
      </form>
    </section>
  );
};

export default RegisterPage;
