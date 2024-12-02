import Loading from "@/components/Loading";
import ParentComponent from "@/components/ParentComponent";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({Component, pageProps: { session, ...pageProps }}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // use useRouter hook

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // check if the route is already complate when the component mounts
    if (router.isReady) {
      setLoading(false);
    }

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.isReady]); // add router events as dependency

  const [asideOpen, setAsideOpen] = useState(false);

  const contAsidekOpen = () => {
    setAsideOpen(!asideOpen);
  };

  return <>
      {loading ? (
        // loading while load
        <div className="flex flex-col flex-center wh_100">
          <Loading />
          <h1 className="mt-1">Loading...</h1>
        </div>
      ) : (
        <>
          <SessionProvider session={session}>
            <ParentComponent
              appOpen={asideOpen}
              appAsideOpen={contAsidekOpen}
            />
          </SessionProvider>
          <main>
            <div className={asideOpen ? "container" : "container active"}>
              <SessionProvider session={session}>
                <Component {...pageProps} />
              </SessionProvider>
            </div>
          </main>
        </>
      )}
    </>
}
