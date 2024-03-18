import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMassage] = useState(null)
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all the field");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }else{
        setMassage(data.message)
      }
      setLoading(false);

      if(res.ok){
        navigate("/")
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userData({});
  };

 // Inside your SignUp component
return (
  <div className="min-h-screen mt-20">
    <div className="flex max-w-3xl mx-auto p-3 md:items-center md:flex-row flex-col gap-5">
      {/* left */}
      <div className="flex-1 gap-5">
        <Link to="/" className="font-bold text-4xl">
          <span className="px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Jitendra
          </span>{" "}
          Blog
        </Link>
        <p className="mt-5">
          This is a demo project. You can sign up with your email and password
          or with Google.
        </p>
      </div>

      {/* right */}
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label value="Your name" />
            <TextInput
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value="Your email" />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value="Your password" />
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            className="min-w-full mt-3"
            type="submit"
            disabled={loading} // Fix typo here, it should be "disabled" instead of "disable"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="">Loading ....</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link to="/sign-in" className="text-blue-500">
            Sign In
          </Link>
        </div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
       
      </div>
    </div>
  </div>
);

};

export default SignUp;
