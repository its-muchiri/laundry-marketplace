import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Reveal } from '@/components/motion/reveal';

const faqs = [
  {
    question: 'How is the price calculated?',
    answer:
      'Price is based on weight (per kg) at the provider rate, plus the delivery fee for pickup and return, plus a small service fee. The average across providers is KES 40/kg, and each provider sets their own rate.',
  },
  {
    question: 'How much is delivery?',
    answer:
      'Delivery is KES 50-150 depending on your location in Kutus and the size of the load. The exact fee is shown before you confirm the booking.',
  },
  {
    question: 'What if the final weight differs from my estimate?',
    answer:
      'We weigh at pickup. If the final price exceeds your estimate by more than 15%, you approve before cleaning starts. Otherwise the estimated price stands.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Every order moves through five stages: Booked, Picked up, Cleaning, On the way, Delivered. You see the current stage in the app and get SMS updates at each key step.',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'M-Pesa STK Push is primary, with card payment on delivery after the final weigh confirmation.',
  },
  {
    question: 'What if items are damaged or lost?',
    answer:
      'Bag tags are scanned at each handover. The dispute window is 24 hours after delivery, with compensation up to KES 5,000 per item and KES 20,000 per order. Provider insurance covers claims.',
  },
  {
    question: 'Can I schedule recurring pickups?',
    answer:
      'Yes. Set up weekly or bi-weekly recurring pickups from your dashboard and get 10% off every recurring order.',
  },
];

export function Faq() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-foreground-muted">
              Everything you need to know before your first pickup.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground-muted">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
