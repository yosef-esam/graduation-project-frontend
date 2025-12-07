import Btn from '@/app/utils/Btn';
import InputField from '@/app/utils/InputField';
import Link from 'next/link';

const page = () => {
  return (
    <section className="flex h-full w-full items-center justify-center py-8 md:py-12">
      <form className="flex h-full w-full flex-col gap-4 px-4 max-sm:justify-center lg:px-10">
        <h1 className="text-(--primary_color) text-3xl font-bold md:text-4xl lg:text-5xl">
          Sign In{' '}
        </h1>

        <InputField
          label="Email Address"
          placeholder="Enter Your Email"
          id="email"
          name="email"
          type="email"
        />
        <InputField
          label="Password"
          placeholder="Enter Your Password"
          id="password"
          name="password"
          type="password"
        />

        <Btn text="Sign In" type="submit" />
        <div className="text-(--offwhite_color) flex w-full flex-wrap items-center justify-between gap-[0.5rem_2rem]">
          <span className="flex items-center gap-1">
            Don&apos;t have an account ?{' '}
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

export default page;
