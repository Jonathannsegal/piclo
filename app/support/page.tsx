import Image from "next/image";
import Link from "next/link";

export default function Support() {
  return (
    <div className="w-screen flex justify-center">
      <div className="max-w-max md:max-w-3xl px-8">
        <main className="flex flex-col items-start w-full py-12">
          <header className="w-full pt-6 px-8 sm:px-20 mb-12 flex justify-start relative">
            <Link href="/">
              <Image
                src="/stamp.png"
                alt="Hero Image"
                width={100}
                height={100}
                className="cover"
              />
            </Link>
          </header>
          <section className="w-full">
            <h1 className="text-4xl font-bold mb-6">The Piclo Help Center</h1>
            <p className="text-lg mb-6">
              Hi! As we are building things this website will be changing alot. For beta feedback and other support this is where you will find it.
            </p>
            <h2 className="text-2xl font-bold mb-4">Support</h2>
            <ul className="list-disc list-inside text-lg mb-6 space-y-4">
              <li>
                <strong>What platforms will piclo be avalable on?</strong>
                <p>We will be on IOS and Android at launch</p>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <ul className="list-disc list-inside text-lg mb-6">
              <li>
                <strong>I have another question / still need help!</strong>
                <p>We'd love to help! Send us an email at contact@piclo.app</p>
              </li>
            </ul>
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
