import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { BookOpen, Mic, Users, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative text-center py-16 overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 z-0 bg-no-repeat bg-center bg-contain opacity-10 dark:opacity-5 blur-xl scale-125"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/darm86u7g/image/upload/v1760168261/Gemini_Generated_Image_yzu9g8yzu9g8yzu9_qxiuns.png')`,
          }}
        />
        <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-charcoal-grey dark:text-dark-text leading-tight">
              <span className="text-primary">Reflect</span> <span className="text-accent">Connect</span> <span className="text-primary">Heal</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-dark-subtext max-w-2xl mx-auto">
              Reflecta is an anonymous mental health platform for self-expression, reflection, and emotional healing. Write journals, record your thoughts, and find support in a community that understands.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/journal">
                <Button icon={<BookOpen size={20} />}>Start Writing</Button>
              </Link>
              <Link to="/voice">
                <Button icon={<Mic size={20} />} variant="secondary">Record Voice Journal</Button>
              </Link>
              <Link to="/connect">
                <Button icon={<Users size={20} />} variant="secondary">Explore Connections</Button>
              </Link>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-charcoal-grey dark:text-dark-text">What is Reflecta?</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <BookOpen className="mx-auto text-primary" size={40} />
            <h3 className="mt-4 text-xl font-semibold dark:text-dark-text">Express Yourself</h3>
            <p className="mt-2 text-gray-600 dark:text-dark-subtext">Write anonymous journals to explore your thoughts and feelings without judgment. Tag your entries with emotions to track your moods.</p>
          </Card>
          <Card>
            <Mic className="mx-auto text-accent" size={40} />
            <h3 className="mt-4 text-xl font-semibold dark:text-dark-text">Voice Your Thoughts</h3>
            <p className="mt-2 text-gray-600 dark:text-dark-subtext">Record private voice notes to speak your mind freely. Sometimes, hearing your own voice can bring new clarity.</p>
          </Card>
          <Card>
            <Users className="mx-auto text-primary" size={40} />
            <h3 className="mt-4 text-xl font-semibold dark:text-dark-text">Connect Anonymously</h3>
            <p className="mt-2 text-gray-600 dark:text-dark-subtext">Find and connect with others who share similar emotions. Build supportive relationships in a safe, anonymous environment.</p>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-3xl font-bold text-charcoal-grey dark:text-dark-text text-center">Words from Our Community</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="flex flex-col">
            <p className="text-gray-600 dark:text-dark-subtext flex-grow">"Finding Reflecta was a turning point for me. Having a place to write down my anxious thoughts without fear of being judged has been incredibly freeing. I feel less alone."</p>
            <div className="mt-4 flex items-center">
              <Heart className="text-accent" size={20}/>
              <p className="ml-2 font-semibold text-charcoal-grey dark:text-dark-text">- BlueSoul23</p>
            </div>
          </Card>
          <Card className="flex flex-col">
            <p className="text-gray-600 dark:text-dark-subtext flex-grow">"I'm not great at writing, so the voice journal feature is perfect. It's like having a conversation with myself. The connections page also helped me find someone who gets it."</p>
            <div className="mt-4 flex items-center">
              <Heart className="text-accent" size={20}/>
              <p className="ml-2 font-semibold text-charcoal-grey dark:text-dark-text">- EchoWhisperer</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;