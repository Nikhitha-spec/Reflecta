
import React from 'react';
import Card from '../components/Card';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-charcoal-grey dark:text-dark-text mb-8">Privacy Policy</h1>
      
      <Card className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">1. Anonymity is Key</h2>
          <p className="text-gray-700 dark:text-dark-subtext leading-relaxed">
            Reflecta is designed as an anonymous platform. We do not require or store personally identifiable information like your real name, phone number, or physical address. Your username is your identity here, and you can change it.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">2. Data We Collect</h2>
          <p className="text-gray-700 dark:text-dark-subtext leading-relaxed">
            We only collect the data necessary for the app to function, such as your journal entries, voice notes, and connections. This data is tied to your anonymous account and is not linked to your real-world identity. We use mock data and local storage for this demonstration.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">3. How We Use Your Data</h2>
          <p className="text-gray-700 dark:text-dark-subtext leading-relaxed">
            The content you create is used solely to provide the service to you. We do not sell your data. We may analyze anonymized, aggregated data to understand trends and improve our service, but this will never be traceable back to an individual user.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">4. Voice and Text Data</h2>
          <p className="text-gray-700 dark:text-dark-subtext leading-relaxed">
            Your voice notes and journal entries are private by default. When you choose to share something anonymously with the community, it is stripped of any direct identifiers. Please be mindful not to share personal information in your public posts.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;
