// "use client";

import Spinner from "@/components/Spinner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function signin() {

  const {data: session, status} = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
   email: "", password: ""
  });
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (status == 'authenticated') {
      router.push('/')
    }
  }, [ router])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Attempt to sign in using the credientials provider
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      })

      if (!result.error) {
        // Successfull sign-in
        router.push('/');
      } else {
        // Handle sign-in error
        setError("Invalid email or password");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    } catch (error) {
      setError("Sign-in failed, please try again");
      setTimeout(() => {
        setError("");
      }, 4000);
    } finally {
      setLoading(false); // errors loading in set to false in all cases
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign In</div>
          {loading ? <div className="flex flex-center w-100 flex-col"><Spinner/> Cheeking...</div> : <>
          <form className="form" onSubmit={handleSubmit}>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              placeholder="Enter emailAddress"
            />
            <input
            required
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="input"
              placeholder="password"
            />
            <input className="login-button" type="submit" value='login'/>
            {error && <p className="redcolor">{error}</p>}
          </form>
          <span className="agreement"><a target="_blank" href="">Learn Admin licence agreement</a></span>
          </>}
        </div>
      </div>
    </>
  );
}
