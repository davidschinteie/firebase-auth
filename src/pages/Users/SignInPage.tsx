import Layout from "../../components/Layout";
import AuthForm from "../../components/AuthForm";

const SignInPage = () => {
  return (
    <Layout>
      <div className="authContainer">
        <AuthForm
          mode="signin"
          title="Sign in to your account"
          buttonText="Login"
          linkUrl="/register"
          linkText="Register"
        />
      </div>
    </Layout>
  );
};

export default SignInPage;
