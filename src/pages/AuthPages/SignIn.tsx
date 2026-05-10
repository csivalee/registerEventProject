import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="SignIn | Event Registration"
        description="This is SignIn page"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
