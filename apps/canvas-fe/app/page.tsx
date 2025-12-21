import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       Canvas app frontend landing page...
       coming soon...
       <div className="mx-auto my-1.5 flex justify-center items-center ">
          {/* shoudn't this be something like if i want the onclick handler then it must be a client components  */}
          {/*make the button components seperate */}
          <Link href={"/signin"} >
          <button>
          signin
          </button></Link>
          <Link href={"/signup"} >
          <button>
          signup
          </button></Link>

       </div>
      </main>
    </div>
  );
}
