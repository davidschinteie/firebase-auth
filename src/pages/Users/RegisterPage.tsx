import Layout from "../../components/Layout";
import AuthForm from "../../components/AuthForm";

const RegisterPage = () => {
  return (
    <Layout>
      <div className="authContainer">
        <AuthForm
          mode="register"
          title="Create a new account"
          buttonText="Register"
          linkUrl="/sign-in"
          linkText="Sign in"
        />
      </div>
    </Layout>
  );
};

export default RegisterPage;
