import Input from "@/components/Inputs/Input/Input";
import useFetch from "@/hook/useFetch";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const { postData } = useFetch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSingin = async () => {
    await postData(
      "/users/register",
      {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      },
      "/login"
    );
  };

  return (
    <section className="flex h-screen justify-center items-center text-transparent-black ">
      <div className="p-8 w-96 align-middle  m-10  justify-between flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-black">Criar uma conta</h1>
        <div className="flex flex-col gap-2">
          <Input
            value={firstName}
            type="text"
            label="Nome"
            placeholder="Insira seu nome"
            setValue={setFirstName}
          />
          <Input
            value={lastName}
            type="text"
            label="Sobrenome"
            placeholder="Insira seu sobrenome"
            setValue={setLastName}
          />
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
          disabled={password != confirmPassword}
          className="bg-black rounded-md p-2 shadow-sm text-white disabled:bg-gray-500"
          onClick={handleSingin}
        >
          Entrar
        </button>

        <div className=" text-sm text-center underline tracking-wide">
          <Link href="/login"> Possui uma conta? Clique aqui para entrar</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
