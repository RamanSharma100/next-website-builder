import AuthProvider from './auth-provider';

const ApplyProviders: React.FC<{
  children?: JSX.Element | React.ReactElement | React.ReactNode;
}> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ApplyProviders;
