import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";

export const FormLogin = () => {
  return (
    <>
      <form>
        <p className="mb-4">Please login to your account</p>
        <Label>Email</Label>
        <Input type="text" placeholder="Email" className="mb-4 w-full" />

        <Label>Password</Label>
        <Input type="password" placeholder="Password" className="mb-4 w-full" />

        {/* <!--Submit button--> */}
        <div className="mb-12 pb-1 pt-1 text-center">
          <Button
            type="button"
            className="w-full text-white"
            style={{
              background:
                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
            }}
          >
            Log in
          </Button>
        </div>

        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">Dont have an account?</p>

          <Button type="button" className="text-danger border-2 border-danger">
            Register
          </Button>
        </div>
      </form>
    </>
  );
};
