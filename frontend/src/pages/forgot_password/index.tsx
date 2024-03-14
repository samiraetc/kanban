import Input from "@/components/Inputs/Input/Input";
import useFetch from "@/hook/useFetch";

import React, { useState } from "react";

const Login = () => {
  const { postData } = useFetch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [code, setCode] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSingin = async () => {
    const response = await postData("/forgot", {
      email,
      password,
      code,
    });
  };

  return (
    <section className="flex h-screen justify-center items-center text-transparent-black ">
      <div className="p-8 w-96 align-middle  m-10  justify-between flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-black">Recuperar conta</h1>
        <div className="flex flex-col gap-2">
          <Input
            value={email}
            type="email"
            label="E-mail"
            placeholder="Insira seu endereço de email..."
            setValue={setEmail}
          />
          <Input
            value={code}
            type="code"
            label="Código"
            placeholder="Insira o código enviado no email"
            setValue={setCode}
          />

          <Input
            value={password}
            type="password"
            label="Senha"
            placeholder="•••••••••"
            setValue={setPassword}
            error={
              confirmPassword.length > 1 && password != confirmPassword
                ? "Senha não confere"
                : ""
            }
          />
          <Input
            value={confirmPassword}
            type="password"
            label="Confirme sua senha"
            placeholder="•••••••••"
            setValue={setConfirmPassword}
            error={
              confirmPassword.length > 1 && password != confirmPassword
                ? "Senha não confere"
                : ""
            }
          />
        </div>
        <button
          className="bg-black rounded-md p-2 shadow-sm text-white"
          onClick={handleSingin}
        >
          Entrar
        </button>
      </div>
    </section>
  );
};

export default Login;
