import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {useDispatch, useSelector }from "react-redux"
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill out all fields"))
      setShowErrorMessage(true);
      return;
    }
    signInUser(formData);
  };

  const signInUser = async (formData) => {
    try {
     dispatch(signInStart())
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
 
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

       if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

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
            This is a demo project. You can sign in with your email and password or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Your email" />
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                id="password"
                name="password"
                type="password"
                placeholder="*********"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              className="min-w-full mt-3"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="">Loading ....</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </div>
          {showErrorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
