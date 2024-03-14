import Input from "@/components/Inputs/Input/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSingin = async () => {
    return await signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <section className="flex h-screen justify-center items-center text-transparent-black ">
      <div className="p-8 w-96 align-middle  m-10  justify-between flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-black">Fazer login</h1>
        <div className="flex flex-col gap-2">
          <Input
            value={email}
            type="email"
            label="E-mail"
            placeholder="Insira seu endereço de email..."
            setValue={setEmail}
          />
          <Input
            value={password}
            type="password"
            label="Senha"
            placeholder="•••••••••"
            setValue={setPassword}
          />
        </div>
        <button
          className="bg-black rounded-md p-2 shadow-sm text-white"
          onClick={handleSingin}
        >
          Entrar
        </button>

        <div className=" text-sm text-center flex justify-center gap-2">
          <Link href="/forgot_password" className="underline tracking-wide "> Esqueceu sua senha?</Link>
          <span>•</span>
          <Link href="/register" className="underline tracking-wide "> Criar uma conta</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
