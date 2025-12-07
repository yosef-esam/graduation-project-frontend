import Btn from "@/app/utils/Btn";
import InputField from "@/app/utils/InputField";
import Link from "next/link";

const page = () => {
  return (
    <section className="flex h-full w-full items-center justify-center py-8 md:py-12">
      <form className="flex h-full w-full max-sm:justify-center flex-col gap-4 px-4 lg:px-10">
        <h1 className="text-(--primary_color) text-3xl md:text-4xl lg:text-5xl font-bold">
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
          />
          <InputField
            label="Enter Your Name"
            placeholder="Enter Your Name"
            id="userName"
            name="userName"
            type="text"
            className="flex-1"
          />
        </div>
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
        <InputField
          label="Confirm Password"
          placeholder="Enter Your Password Again"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
        />

        <Btn text="Create Account" type="submit" />
        <span className="flex items-center gap-1 text-(--offwhite_color)">
          already have an account ? <Link href="/login" className="underline text-(--primary_color) font-bold">LOGIN</Link>
        </span>
      </form>
    </section>
  );
};

export default page;
