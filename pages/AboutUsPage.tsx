
import React from 'react';
import Card from '../components/Card';
import { Heart, Shield, Users } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-charcoal-grey dark:text-dark-text mb-4">About Reflecta</h1>
      <p className="text-xl text-center text-gray-600 dark:text-dark-subtext mb-12">
        Reflect. Heal. Connect.
      </p>

      <Card className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
        <p className="text-gray-700 dark:text-dark-subtext leading-relaxed">
          At Reflecta, our mission is to create a safe, anonymous, and supportive digital space where individuals can freely express their thoughts and emotions. We believe that self-expression is a crucial step towards mental well-being. By providing tools for journaling and anonymous connection, we aim to reduce the stigma surrounding mental health and empower users on their journey to emotional healing and self-discovery.
        </p>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <Card>
          <div className="flex flex-col items-center text-center">
            <Heart size={32} className="text-accent mb-3" />
            <h3 className="text-xl font-semibold mb-2 dark:text-dark-text">Empathy</h3>
            <p className="text-gray-600 dark:text-dark-subtext">
              We foster a community built on mutual understanding and shared experience.
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-center text-center">
            <Shield size={32} className="text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2 dark:text-dark-text">Anonymity</h3>
            <p className="text-gray-600 dark:text-dark-subtext">
              Your privacy is paramount. Share openly without fear of judgment.
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-center text-center">
            <Users size={32} className="text-accent mb-3" />
            <h3 className="text-xl font-semibold mb-2 dark:text-dark-text">Connection</h3>
            <p className="text-gray-600 dark:text-dark-subtext">
              You are not alone. Connect with others who understand what you're going through.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutUsPage;
