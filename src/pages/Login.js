import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ImageLight from "../assets/img/login-office.jpeg";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import { Label, Input, Button, HelperText } from "@windmill/react-ui";

import { login } from "../api/connect.instance";
import Cookies from "js-cookie";

function Login() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Se connecter
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                  onChange={(event) => {
                    console.log({ event: event.target.value });
                    setData({
                      ...data,
                      email: event.target.value,
                    });
                  }}
                />
              </Label>

              <Label className="mt-4">
                <span>Mot de passe</span>
                <Input
                  className="mt-1"
                  type="password"
                  valid={error ? false : true}
                  placeholder="***************"
                  onChange={(event) => {
                    console.log({ event: event.target.value });
                    setData({
                      ...data,
                      password: event.target.value,
                    });
                  }}
                />
                {error && (
                  <HelperText valid={false}>
                    Email/mot de passe invalide
                  </HelperText>
                )}
              </Label>

              <Button
                className="mt-4"
                block
                tag={Link}
                onClick={async (_) => {
                  try {
                    const answ = await login(data);
                    console.log(answ.data);
                    var in15minutes = new Date(new Date().getTime() + 900000);
                    Cookies.set("accessToken", answ.data.accessToken, {
                      expires: in15minutes,
                    });
                    localStorage.setItem(
                      "refreshToken",
                      answ.data.refreshToken
                    );
                  } catch (err) {
                    if (err?.response?.status == 400) {
                      setError(true);
                    }
                  }
                }}
              >
                Se connecter
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
