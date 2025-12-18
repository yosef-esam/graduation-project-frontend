"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Btn from "@/app/utils/Btn";
import InputField from "@/app/utils/InputField";
import Link from "next/link";
import { loginAction } from "@/app/actions/authActions";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginAction(form);
      toast.success("Login successful! Redirecting...");
      router.push("/"); // redirect to homepage
    }  catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      toast.error(errorMessage);
    }finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-full w-full items-center justify-center py-8 md:py-12">
      {/* Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col gap-4 px-4 max-sm:justify-center lg:px-10"
      >
        <h1 className="text-(--primary_color) mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
          Sign In
        </h1>

        <InputField
          label="Email Address"
          placeholder="Enter Your Email"
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <InputField
          label="Password"
          placeholder="Enter Your Password"
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Btn text={loading ? "Signing in..." : "Sign In"} type="submit" />

        <div className="text-(--offwhite_color) flex w-full flex-wrap items-center justify-between gap-[0.5rem_2rem]">
          <span className="flex items-center gap-1">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-(--primary_color) font-bold underline"
            >
              SIGN UP
            </Link>
          </span>
          <Link
            href="/forgot-password"
            className="text-(--primary_color) font-bold underline"
          >
            forgot password?
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
