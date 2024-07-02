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
                Our communities are full of amazing and interesting places.
              </h2>
              <p className="text-lg mb-4">
                How often do you go to the new spot down the street? When traveling, how often do you wander from the main path?
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                Often, it's hard to know where do go.
              </h2>
              <p className="text-lg mb-4">
                In the age of information overload, knowing what your friends are saying about that new coffee shop or what future friends a lot like you in France say about the local bakery would be really helpful.              </p>
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                Piclo is your ultimate travel guide
              </h2>
              <p className="text-lg mb-4">
                We make tools that connect you with your friends, your city, and that beachfront town youve been wanting to visit.
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-sky-600 mb-4">
                Crafting This for All of Us
              </h2>
              <p className="text-lg mb-4">
                Planning your trips can be a challenge when orchestrating a lot of people and various plans. We know because we're the ones stuck planning.              </p>
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
                We think that there is a better way to explore
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
