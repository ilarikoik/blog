import GoogleAuth from "../auth/googleAuth";

const LoginPage = () => {
  return (
    <>
      <div
        className="h-screen w-full flex justify-center items-center bg-slate-400"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1700053123692-7f3747c0766e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5ldXRyYWwlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')",
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
          height: "100vh", // Ensures the div takes full viewport height
        }}
      >
        <div className=" bg-white h-2/5 w-4/5 rounded-lg border-2 border-postgray shadow-2xl lg:w-2/3 xl:w-1/3  flex justify-center items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            alt=""
            className="h-20 w-20"
          />
          <h1 className="flex justify-center font-semibold text-xl">
            <GoogleAuth />
          </h1>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
