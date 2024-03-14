import Board from "@/components/Board/Board";
import Loading from "@/components/Loading/Loading";
import Menu from "@/components/Menu/Menu";
import UserSettings from "@/components/UserSettings/UserSettings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {


    if ((session === null || session === undefined) && status == 'unauthenticated') {
      router.push("/login")
    }

    if (session && status === "authenticated") {
      setLoading(false)
    }
  }, [session, status, session?.user.access_token]);

  return !loading && session ? (
    <>
      <Menu />

      <div className="p-10 pt-20">
        <Board />

      </div>
    </>
  ) : (<Loading />)
}
