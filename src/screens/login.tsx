import GoogleAuth from "../auth/googleAuth";

const LoginPage = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-slate-700">
        <div className=" bg-white h-2/5 w-4/5 rounded-lg border-2 border-postgray shadow-2xl lg:w-2/3 xl:w-1/3  flex justify-center items-center">
          <h1 className="flex justify-center font-semibold text-xl">
            <GoogleAuth />
          </h1>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
