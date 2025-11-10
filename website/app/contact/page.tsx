import ContactForm from '@/components/forms/ContactForm';

export const metadata = {
  title: 'Contact Us - Lost Monster',
  description: 'Get in touch with Lost Monster to start your project. Book a discovery call or send us your project brief.',
};

export default function ContactPage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Start Your Project
          </h1>
          <p className="text-lg text-neutral-700">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

