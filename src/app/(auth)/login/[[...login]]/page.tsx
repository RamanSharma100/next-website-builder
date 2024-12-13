import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <div className="container w-full h-full flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default LoginPage;
