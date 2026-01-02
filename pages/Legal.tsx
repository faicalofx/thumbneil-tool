
import React, { useEffect } from 'react';

interface LegalPageProps {
  title: string;
  type: 'privacy' | 'terms' | 'cookies' | 'refund';
}

const Legal: React.FC<LegalPageProps> = ({ title, type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">1. General Information</h2>
              <p>At StatStream AI, accessible from statstream.ai, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by StatStream AI and how we use it.</p>
              <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">2. Log Files</h2>
              <p>StatStream AI follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">3. Cookies and Web Beacons</h2>
              <p>Like any other website, StatStream AI uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">4. Google DoubleClick DART Cookie</h2>
              <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-400">https://policies.google.com/technologies/ads</a></p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">5. Advertising Partners Privacy Policies</h2>
              <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on StatStream AI, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
              <p>Note that StatStream AI has no access to or control over these cookies that are used by third-party advertisers.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">6. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
              <p>Under the CCPA, among other rights, California consumers have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">7. GDPR Data Protection Rights</h2>
              <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
              </ul>
            </section>
          </>
        );
      case 'terms':
        return (
          <>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">1. Terms</h2>
              <p>By accessing this Website, accessible from statstream.ai, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials on StatStream AI's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose or for any public display;</li>
                <li>attempt to reverse engineer any software contained on StatStream AI's Website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">3. Disclaimer</h2>
              <p>All the materials on StatStream AI’s Website are provided "as is". StatStream AI makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, StatStream AI does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">4. Limitations</h2>
              <p>StatStream AI or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on StatStream AI’s Website, even if StatStream AI or an authorize representative of this Website has been notified, orally or in writing, of the possibility of such damage.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">5. Governing Law</h2>
              <p>Any claim related to StatStream AI's Website shall be governed by the laws of us without regards to its conflict of law provisions.</p>
            </section>
          </>
        );
      case 'cookies':
        return (
          <>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">1. What Are Cookies</h2>
              <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">2. How We Use Cookies</h2>
              <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">3. Third Party Cookies</h2>
              <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</li>
                <li>The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.</li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">4. More Information</h2>
              <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
            </section>
          </>
        );
      case 'refund':
        return (
          <>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">1. Overview</h2>
              <p>Our refund policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">2. Eligibility for Refunds</h2>
              <p>To be eligible for a refund, your request must be based on a technical failure of our AI analysis tool that our team cannot resolve within a reasonable timeframe. Since our platform provides digital, instantaneous analysis results, "change of mind" refunds are generally not permitted once a Pro analysis has been consumed.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">3. Subscription Cancellation</h2>
              <p>You may cancel your subscription at any time through your account settings. Upon cancellation, you will continue to have access to the Pro features until the end of your current billing cycle. No partial refunds are provided for the remaining period of a billing cycle.</p>
            </section>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">4. How to Request a Refund</h2>
              <p>To request a refund, please email us at support@statstream.ai with your order details and a description of the technical issue encountered.</p>
            </section>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-4">{title}</h1>
        <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
      </div>
      <div className="prose prose-invert max-w-none text-gray-400 space-y-8 leading-relaxed text-base">
        <p className="text-sm font-mono text-gray-600 border-b border-white/5 pb-4">Last Updated: October 24, 2025</p>
        {renderContent()}
      </div>
    </div>
  );
};

export default Legal;
