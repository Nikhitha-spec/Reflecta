
import React from 'react';
import Card from '../components/Card';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-charcoal-grey dark:text-dark-text mb-8">Terms of Service</h1>
      
      <Card className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">1. Be Respectful</h2>
          <p className="text-gray-700 dark:text-dark-subtext leading-relaxed">
            This is a safe space for everyone. Harassment, hate speech, bullying, and any form of abusive behavior will not be tolerated. We reserve the right to remove content and accounts that violate this principle.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">2. No Substitute for Professional Help</h2>
          <p className="text-gray-700 dark:text-dark-subtext leading-relaxed">
            Reflecta is a peer-support community, not a replacement for professional mental health care. If you are in crisis, please contact one of the emergency helplines listed in our footer or seek professional medical advice.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">3. Content Responsibility</h2>
          <p className="text-gray-700 dark:text-dark-subtext leading-relaxed">
            You are responsible for the content you post. Do not share illegal content, spam, or information that infringes on the rights of others. Please do not share personally identifiable information about yourself or others.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">4. Age Restriction</h2>
          <p className="text-gray-700 dark:text-dark-subtext leading-relaxed">
            You must be at least 13 years old (or the required age in your country) to use Reflecta.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;
