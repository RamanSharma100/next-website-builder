import { SignUp } from '@clerk/nextjs';

const RegisterPage = () => {
  return (
    <div className="container w-full h-full flex items-center justify-center">
      <SignUp />
    </div>
  );
};

export default RegisterPage;
