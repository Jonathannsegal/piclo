import Image from "next/image";
import Link from "next/link";


const teamMembers = [
  {
    id: 1, src: "/Khyatee.jpg", name: "Khyatee Tewari", title: "CEO", description:
      "..."
  },
  {
    id: 2, src: "/Jonathan.jpg", name: "Jonathan Segal", title: "Cofounder and CTO", description:
      "I am always planning my next trip, and when I'm not, I am either running, taking pictures, or working on fun coding projects."
  },
];

const ideas = [
  { id: 1, src: "/1.jpg", description: "Discovering the coolest shop in the market." },
  { id: 2, src: "/2.jpg", description: "Learning about how a place came to be." },
  { id: 3, src: "/3.jpg", description: "Embarking on new experiences." },
  { id: 4, src: "/4.jpg", description: "Seeing the best views." },
  { id: 5, src: "/5.jpg", description: "Even in the most remote of places." },
  { id: 6, src: "/6.jpg", description: "Making it to the sunrise spot." },
];

export default function Story() {
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
          <section className="w-full flex flex-col items-center text-center space-y-12">
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                🌟 Explore Personalized Recommendations from Friends              </h2>
              <p className="text-lg mb-4">
                Tired of sifting through endless reviews and recommendations? Look no further! With Piclo, you get tailored suggestions from the people who know you best—your friends! Whether it's that cozy coffee shop around the corner or the hidden gem in a far-off beachfront town, your pals have got you covered.
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                📌 Pin Your Adventures
              </h2>
              <p className="text-lg mb-4">
                Remember that charming little café where you had the best latte ever? Or that breathtaking viewpoint during your last road trip? Piclo lets you pin these special moments on your personal map. Add photos, jot down notes, and relive your adventures whenever you want!
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                👥 Travel Together, Share Memories
              </h2>
              <p className="text-lg mb-4">
                Piclo isn't just about places; it's about people too! Connect with friends who've been there, done that. Share travel stories, swap tips, and maybe even plan your next escapade together. Because memories are better when shared!
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                🌴 From Weekend Plans to Takeout Cravings
              </h2>
              <p className="text-lg mb-4">
                Whether you're seeking weekend inspiration or craving your favorite takeout joint, Piclo has your back. It's the go-to app for discovering experiences—big or small. So go ahead, explore, connect, and make every moment count!
              </p>
              <div className="grid grid-cols-2 gap-4">
                {teamMembers.map(member => (
                  <div key={member.id} className="relative group">
                    <Image
                      src={member.src}
                      alt={member.name || 'Team member'}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    {member.name && (
                      <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div>
                          <h2 className="text-md font-bold mb-2">{member.name}, {member.title}</h2>
                          <p>{member.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                🗺️ We think that there is a better way to explore
              </h2>
              <p className="text-lg mb-4">
                We beleive that the best way to explore is to connect with the local vibe and plan with your friends!
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {ideas.map(member => (
                  <div key={member.id} className="relative group h-40 w-40 sm:h-52 sm:w-52">
                    <Image
                      src={member.src}
                      alt={'Idea'}
                      fill={true}
                      className="object-cover w-full h-full"
                    />
                    {member.id && (
                      <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div>
                          <p>{member.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                And we have big plans.
              </h2>
              <p className="text-lg mb-4">
                Keep posted as we are building cool things!
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                We hope you'll join the adventure.
              </h2>
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
