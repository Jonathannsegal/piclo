import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen flex justify-center">
      <div className="max-w-max min-[2000px]:max-w-7xl">
        <main className="flex flex-col items-center h-screen w-full">
          <header className="w-full pt-6 px-20 -mb-10 sm:-mb-32 flex justify-center sm:justify-start relative">
            <Image
              src="/stamp.png"
              alt="Hero Image"
              width={100}
              height={100}
              className="cover"
            />
          </header>
          <section className="w-full h-full flex items-center justify-center">
            <div className="h-5/6 w-5/6 mb-5 flex flex-col sm:flex-row">
              <div className="sm:w-1/2 w-full mr-8 flex items-center mb-0 sm:mb-12">
                <div className="flex flex-col items-left">
                  <h1 className="sm:text-6xl text-4xl sm:text-left text-center tracking-wider sm:leading-none leading-10 font-bold mb-4 sm:w-5/6 w-full">
                    Your next trip starts here.
                  </h1>
                  <div className="flex flex-wrap flex-row sm:flex-col space-y-0 sm:space-y-2 space-x-2 sm:space-x-0 mb-5 sm:mb-8 font-medium text-sm sm:text-2xl justify-center">
                    <div className="w-fit">
                      <span role="img" aria-label="map" className="mr-0 sm:mr-2">🗺️</span> Explore with friends
                    </div>
                    <div className="w-fit">
                      <span role="img" aria-label="compass" className="mr-0 sm:mr-2">🧭</span> Discover new places
                    </div>
                    <div className="w-fit">
                      <span role="img" aria-label="bell" className="mr-0 sm:mr-2">🔔</span> Updates coming soon
                    </div>
                  </div>
                  <Link href="/signup">
                    <button className="hidden sm:block bg-blue-500 text-white py-3 px-4 w-40 rounded-full text-xl hover:bg-blue-600">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
              <div className="sm:w-1/2 w-full h-full relative">
                <video className="w-full h-full object-cover rounded-2xl sm:rounded-3xl" preload="auto" autoPlay loop muted>
                  <source src="https://xcynaenntclbctlh.public.blob.vercel-storage.com/hero-WivbCBKLrnUNbFbhTer6yz1llSc9Rh.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <Link href="/signup">
                <button className="block sm:hidden self-center mt-5 bg-blue-500 text-white py-3 px-4 w-40 rounded-full text-xl hover:bg-blue-600">
                  Sign Up
                </button>
              </Link>
            </div>
          </section>
        </main>
        <footer className="w-full px-20 py-4 text-center space-x-6 font-medium sm:text-left">
          <Link href="/story">Our Story</Link>
          <Link href="/support">Support</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </footer>
      </div>
    </div>
  );
}
