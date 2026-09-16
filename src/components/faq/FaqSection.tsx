import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    category: 'Overview & Route',
    question: 'What is the Annapurna Base Camp (ABC Nepal) trek and why is it world-famous?',
    answer: 'The Annapurna Base Camp trek (commonly known as ABC Nepal or the Annapurna Sanctuary Trek) is one of the premier high-altitude adventures for trekking in Nepal. Nestled at 4,130m (13,550 ft) inside the Annapurna Conservation Area, the trail takes you through subtropical rhododendron forests, terraced Gurung villages, and deep river gorges into a natural 360-degree glacial amphitheater encircled by towering 7,000m and 8,000m giants, including Annapurna I (8,091m), Annapurna South (7,219m), and the sacred Mt. Machapuchare (6,993m).'
  },
  {
    category: 'Cost & Inclusions',
    question: 'How much does the Annapurna Base Camp trek cost in 2026?',
    answer: 'On Annapurnabasecamp.org, expedition packages range from $890 to $2,890 per trekker based on your chosen tier of luxury. Our 3-Star Alpine Explorer is $890 USD (includes 1:2 shared porter and boutique city stays). Our flagship 4-Star Mountain Premier is $1,450 USD (features private 1:1 porters, private 4WD transfers, and attached teahouse bathrooms). Our ultra-luxury 5-Star Himalayan Sanctuary tier is $2,890 USD (includes Dwarika’s Heritage Palace, Pavilions luxury villas, and VIP Airbus H125 helicopter return flights directly to Pokhara). All tiers include all ACAP/TIMS government permits, full-board dining, and airport logistics.'
  },
  {
    category: 'Season & Weather',
    question: 'What is the best time of year for trekking in Nepal to Annapurna Base Camp?',
    answer: 'The two optimal trekking seasons are Autumn (late September through November) and Spring (March through May). Autumn offers crystal-clear post-monsoon skies, unbeatable mountain visibility, and stable trail conditions. Spring brings warming temperatures and the breathtaking blooming of rhododendron and orchid forests across the Modi Khola canyon. Winter (December–January) is also rewarding with crisp snow, fewer crowds, and our heated lodge options.'
  },
  {
    category: 'Difficulty & Altitude',
    question: 'How difficult is ABC trekking compared to Everest Base Camp (EBC)?',
    answer: 'ABC is generally considered more accessible and less physically grueling than Everest Base Camp. Annapurna Base Camp sits at 4,130m, which is over 1,200m lower than EBC (5,364m), substantially decreasing the statistical incidence of acute mountain sickness (AMS). The primary physical challenge of ABC is navigating the well-maintained stone staircases through Chhomrong. Trekkers with moderate cardiovascular fitness and comfortable hiking boots excel on this route.'
  },
  {
    category: 'Porter Ethics & Care',
    question: 'What are the porter welfare standards on Annapurnabasecamp.org?',
    answer: 'We operate under strict ethical porter welfare standards. Our porters receive fair wages exceeding government mandates, 100% comprehensive medical and evacuation insurance, and certified high-altitude clothing (thermal boots, down jackets, sunglasses). In our 4-Star and 5-Star tiers, we provide a dedicated 1:1 Porter for each client carrying a maximum of 15kg. In our 3-Star tier, two clients share one porter carrying a maximum of 18–20kg (9–10kg per guest).'
  },
  {
    category: 'VIP Logistics',
    question: 'Can I fly back from Annapurna Base Camp via helicopter?',
    answer: 'Yes! Annapurnabasecamp.org provides direct chartered and group-shared Airbus H125 helicopter flights from Annapurna Base Camp (4,130m) directly back to Pokhara Lakeside in just 25 minutes. This eliminates 3 to 4 days of downhill walking, allowing travelers with limited vacation time to experience the sanctuary summit in peak comfort.'
  },
  {
    category: 'Permits & Paperwork',
    question: 'What permits are required for the Annapurna Sanctuary?',
    answer: 'Every foreign trekker entering the region requires the Annapurna Conservation Area Project (ACAP) Permit and the Trekkers’ Information Management System (TIMS) Card. When booking through Annapurnabasecamp.org, our Kathmandu operations desk secures and delivers all physical government permits in advance—you only need to provide your passport copy during reservation.'
  },
  {
    category: 'Booking & Peace of Mind',
    question: 'What is your cancellation and date rescheduling policy?',
    answer: 'We understand mountain travel requires flexibility. We offer complimentary, penalty-free date rescheduling up to 30 days prior to your expedition departure. If international travel disruptions occur, deposits can be converted into open lifetime expedition credits.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-3 shadow-xs">
          <HelpCircle className="w-4 h-4 text-sky-600" />
          <span>Essential Knowledge • Trekking in Nepal</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about ABC Nepal trekking, permits, ethical Sherpa porters, altitude acclimation, and VIP helicopter logistics.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                isOpen
                  ? 'border-sky-300 shadow-md ring-1 ring-sky-200/60'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                    {item.category}
                  </span>
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {item.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? 'bg-sky-100 text-sky-700 rotate-180' : 'bg-slate-100 text-slate-500'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Assistance CTA Banner */}
      <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-700">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-base sm:text-lg text-white">
              Have a Custom Itinerary or Route Question?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Speak directly with our senior Himalayan expedition planners via live WhatsApp or phone.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <a
            href="https://wa.me/9779851082437?text=Namaste!%20I%20have%20a%20question%20about%20the%20Annapurna%20Base%20Camp%20Trek."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
