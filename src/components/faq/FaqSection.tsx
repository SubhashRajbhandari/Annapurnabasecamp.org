import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageSquare } from 'lucide-react';

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

export const REAL_ABC_FAQS: FaqItem[] = [
  // 1. Route & Difficulty
  {
    id: 'faq-overview',
    category: 'Route & Difficulty',
    question: 'What is the Annapurna Base Camp (ABC Nepal) trek and how high does it go?',
    answer: 'The Annapurna Base Camp trek (also known as ABC Nepal or the Annapurna Sanctuary Trek) takes you into a colossal 360-degree glacial amphitheater located at 4,130 meters (13,550 feet) above sea level in the Gandaki province of Nepal. Surrounded by towering Himalayan giants—including Annapurna I (8,091m, the 10th highest mountain on Earth), Annapurna South (7,219m), Hiunchuli (6,441m), and the sacred Mt. Machapuchare (6,993m)—it is celebrated globally for transitioning from lush subtropical rhododendron forests into sheer high-alpine glacial terrain.',
    tags: ['altitude', 'height', 'elevation', 'overview', 'annapurna']
  },
  {
    id: 'faq-difficulty',
    category: 'Route & Difficulty',
    question: 'How difficult is the ABC trek? Can beginners or first-time hikers do it?',
    answer: 'The ABC trek is rated Moderate to Strenuous. It is widely considered very accessible to active beginners with good cardiovascular fitness. You do not need technical climbing gear or mountaineering ropes. The primary challenge is cardiovascular stamina for ascending and descending thousands of stone-paved steps (notably the 3,000 steps connecting Chhomrong, Sinuwa, and Bamboo). Daily walking times average 4 to 6 hours with a daypack while your porter carries your heavy duffel.',
    tags: ['difficulty', 'beginner', 'fitness', 'steps', 'strenuous']
  },
  {
    id: 'faq-abc-vs-ebc',
    category: 'Route & Difficulty',
    question: 'How does Annapurna Base Camp compare to Everest Base Camp (EBC)?',
    answer: 'ABC reaches a maximum altitude of 4,130m, compared to EBC at 5,364m (and Kala Patthar at 5,550m). Because ABC stays over 1,200 meters lower, the risk of severe Acute Mountain Sickness (AMS) is significantly lower than on Everest. Furthermore, ABC features richer green vegetation, warmer temperatures, and lush rhododendron forests for most of the trail, whereas Everest is dry, rocky alpine terrain throughout.',
    tags: ['ebc', 'everest', 'comparison', 'altitude difference']
  },
  {
    id: 'faq-best-season',
    category: 'Route & Difficulty',
    question: 'When is the best time of year to trek to Annapurna Base Camp?',
    answer: 'The two prime trekking windows are Autumn (late September through November) and Spring (March through May). Autumn delivers crystal-clear skies, crisp mountain vistas, and the most stable post-monsoon weather. Spring brings pleasant temperatures and hillsides ablaze with blooming red, pink, and white rhododendron trees. Winter (December–January) is quiet with fewer trekkers and snowy scenery, but nighttime temperatures at ABC drop to -10°C to -15°C.',
    tags: ['season', 'weather', 'best time', 'autumn', 'spring', 'winter']
  },

  // 2. Permits, Regulations & Ethics
  {
    id: 'faq-permits',
    category: 'Permits & Rules',
    question: 'What permits are required for the Annapurna Base Camp trek?',
    answer: 'All foreign trekkers require two mandatory government permits: (1) Annapurna Conservation Area Project (ACAP) Entry Permit (3,000 NPR / approx. $25 USD) and (2) Trekkers’ Information Management System (TIMS) Card (2,000 NPR / approx. $17 USD). Both permits require passport photocopies and passport-sized photos. On Annapurnabasecamp.org, all government permit paperwork and checkpoint registrations are arranged in advance and included in every package.',
    tags: ['permits', 'acap', 'tims', 'entry fee', 'government']
  },
  {
    id: 'faq-plastic-ban',
    category: 'Permits & Rules',
    question: 'Is single-use plastic really banned in the Annapurna Sanctuary?',
    answer: 'Yes. To protect the fragile alpine environment, the Annapurna Conservation Area Project (ACAP) strictly bans single-use plastic mineral water bottles beyond Chhomrong village. Trekkers must carry reusable Nalgene bottles, hydration bladders, or insulated thermos flasks. Safe drinking water stations, boiled water refills, and UV-treated water are available at every lodge along the route.',
    tags: ['plastic', 'ban', 'environment', 'eco', 'water bottles']
  },
  {
    id: 'faq-machapuchare',
    category: 'Permits & Rules',
    question: 'Why is Mt. Machapuchare (Fishtail) forbidden to climb?',
    answer: 'Machapuchare (6,993m / 22,943ft) is revered as a sacred abode of Lord Shiva by the local Gurung and Hindu populations. In respect of local religious sentiments, the Nepal Government declared the peak strictly off-limits to all mountaineering expeditions in 1957. It remains one of the world’s most iconic virgin peaks, and you will walk directly beneath its soaring twin summit pyramid at Machapuchare Base Camp (MBC, 3,700m).',
    tags: ['machapuchare', 'fishtail', 'sacred', 'climbing', 'forbidden']
  },
  {
    id: 'faq-porter-welfare',
    category: 'Permits & Rules',
    question: 'What are the porter weight limits and welfare guidelines?',
    answer: 'We strictly adhere to International Porter Protection Group (IPPG) regulations. On our 4-Star and 5-Star tiers, each trekker gets a dedicated 1:1 Private Porter carrying a maximum load of 15kg. On our 3-Star tier, two trekkers share one porter carrying a combined maximum of 18–20kg. All porters are provided with adequate thermal outerwear, certified high-altitude boots, medical insurance, fair living wages, and warm teahouse lodging.',
    tags: ['porters', 'weight limit', 'welfare', 'ippg', 'ethical']
  },

  // 3. Food, Water & Lodges
  {
    id: 'faq-teahouse',
    category: 'Food & Lodges',
    question: 'What is accommodation like in the teahouse lodges?',
    answer: 'Teahouses are family-run mountain lodges made of stone and timber. Rooms are typically twin-share with two wooden beds, foam mattresses, clean bedsheets, pillows, and warm blankets. In lower villages (Jhinu, Chhomrong, Ghandruk), our 4-Star & 5-Star tiers include private rooms with attached en-suite Western flush toilets and hot showers. At higher elevations (Deurali, MBC, ABC), space is restricted and restrooms are clean shared facilities.',
    tags: ['accommodation', 'lodge', 'teahouse', 'rooms', 'attached bath']
  },
  {
    id: 'faq-food',
    category: 'Food & Lodges',
    question: 'What food is served? Can vegetarians, vegans, or celiacs be accommodated?',
    answer: 'Teahouse menus feature a surprisingly diverse menu prepared fresh daily. The mountain staple is Dal Bhat (steamed rice, yellow lentil soup, spiced vegetable curry, and mustard greens)—famous for unlimited free seconds (Dal Bhat Power 24 Hour!). Other choices include vegetable momos, Tibetan Thukpa noodle soup, fried rice, pasta, porridge, eggs, pancakes, and apple pie. Vegetarian and vegan diets are extremely easy to accommodate. Gluten-free options like potatoes, rice, and corn are readily available.',
    tags: ['food', 'meals', 'dal bhat', 'vegan', 'vegetarian', 'gluten-free']
  },
  {
    id: 'faq-water',
    category: 'Food & Lodges',
    question: 'How do I obtain safe drinking water on the trail?',
    answer: 'Never drink untreated tap, stream, or river water. You have three safe options: (1) Purchase boiled water from teahouses (50–150 NPR per liter), which warms your sleeping bag at night when poured into a Nalgene bottle; (2) Use water purification tablets (Aquatabs / chlorine dioxide); or (3) Use a portable UV purifier (SteriPEN) or micro-filter (Sawyer Squeeze).',
    tags: ['water', 'drinking water', 'purification', 'steripen', 'boiled']
  },
  {
    id: 'faq-hot-showers',
    category: 'Food & Lodges',
    question: 'Are hot showers available, and how much do they cost?',
    answer: 'Yes! Lower villages have solar-heated or gas geyser hot showers. In basic teahouses, hot showers cost between 200 and 400 NPR ($1.50–$3.00 USD). As you reach Deurali, MBC, and ABC, hot showers are provided via buckets of boiled water. In our 4-Star Mountain Premier and 5-Star Luxury tiers, all hot shower fees are 100% complimentary and covered in your package.',
    tags: ['showers', 'hot water', 'hygiene', 'bathroom']
  },

  // 4. Altitude & Health
  {
    id: 'faq-ams',
    category: 'Health & Safety',
    question: 'What are the symptoms of Acute Mountain Sickness (AMS) and how is it managed?',
    answer: 'Mild AMS can occur above 2,800m. Symptoms include throbbing headache, mild dizziness, fatigue, nausea, loss of appetite, and disturbed sleep. Prevention includes climbing slowly (“pole pole”), drinking 3 to 4 liters of water daily, avoiding alcohol and sleeping pills, and eating carbohydrate-rich meals. If symptoms worsen, the rule of the Himalayas is simple: stop ascending or descend immediately. Our lead guides carry pulse oximeters to check your blood oxygen (SpO2) and heart rate twice daily.',
    tags: ['altitude sickness', 'ams', 'headache', 'oxygen', 'oximeter']
  },
  {
    id: 'faq-diamox',
    category: 'Health & Safety',
    question: 'Should I take Diamox (Acetazolamide)? How does it work?',
    answer: 'Diamox accelerates your body’s natural acclimatization by stimulating deeper breathing, especially during sleep. A standard dosage is 125mg to 250mg twice daily, starting 24 hours before ascending above 2,800m (typically starting around Sinuwa or Bamboo). Diamox is a preventative aid, not an emergency cure. It is a mild diuretic, so drink extra fluids. Always consult your personal physician before your trip, particularly if you have sulfa allergies.',
    tags: ['diamox', 'acetazolamide', 'medication', 'prevention']
  },
  {
    id: 'faq-heli-evac',
    category: 'Health & Safety',
    question: 'What happens in a medical emergency? How fast is helicopter rescue?',
    answer: 'In the rare event of severe altitude sickness (HAPE/HACE) or serious injury, our guides coordinate emergency satellite communication with Pokhara Heliport. An Airbus H125 high-altitude rescue helicopter can be airborne within 25 minutes, weather permitting, landing directly at ABC (4,130m) or MBC (3,700m) to evacuate the patient directly to Gandaki Hospital or Metrocity Hospital in Pokhara or CIWEC Clinic in Kathmandu.',
    tags: ['emergency', 'rescue', 'helicopter', 'evacuation', 'hospital']
  },
  {
    id: 'faq-insurance',
    category: 'Health & Safety',
    question: 'What kind of travel insurance is required for ABC trekking?',
    answer: 'You must have travel medical insurance that explicitly covers emergency high-altitude search, rescue, and helicopter evacuation up to at least 4,500 meters (15,000 feet). Standard general holiday travel policies often cap emergency coverage at 2,500m. Providers like World Nomads, Global Rescue, Allianz (with mountaineering rider), or Ripcord are popular choices among Himalayan hikers.',
    tags: ['insurance', 'travel insurance', 'helicopter coverage', '4500m']
  },

  // 5. Tech, Power & Connectivity
  {
    id: 'faq-charging',
    category: 'Tech & Connectivity',
    question: 'Can I charge my phone, camera, and power bank at mountain lodges?',
    answer: 'Yes. Most dining halls have shared charging boards powered by solar panels or micro-hydro electricity. Teahouses charge a small fee of 150 to 350 NPR ($1–$3 USD) per device or power bank charge. In our 4-Star and 5-Star packages, device charging costs are included. Pro tip: High cold rapidly drains lithium batteries—keep your phone and batteries inside your inner jacket pockets or sleeping bag at night.',
    tags: ['charging', 'electricity', 'power bank', 'battery', 'solar']
  },
  {
    id: 'faq-wifi-sim',
    category: 'Tech & Connectivity',
    question: 'Is there Wi-Fi and cell phone reception on the ABC trail?',
    answer: 'Cellular reception (both Nepal Telecom / NTC and Ncell 4G) is decent up to Chhomrong and Sinuwa, but becomes patchy or non-existent in the deep gorges between Bamboo, Dovan, and Deurali, before occasionally catching signal again at ABC. Most lodges offer prepaid Wi-Fi cards (such as Everest Link or Airzed) for 300–500 NPR per day. Expect speeds suitable for WhatsApp messaging, not video streaming.',
    tags: ['wifi', 'internet', 'sim card', 'ntc', 'ncell', 'connectivity']
  },
  {
    id: 'faq-gear-rental',
    category: 'Tech & Connectivity',
    question: 'Can I rent sleeping bags and down jackets in Kathmandu or Pokhara?',
    answer: 'Yes! Both Thamel (Kathmandu) and Lakeside (Pokhara) have dozens of gear shops where you can rent heavy winter gear cheaply. A 4-season down jacket (-15°C) or sub-zero down sleeping bag rents for approximately 150 to 250 NPR ($1.20–$2.00 USD) per day with a small refundable deposit. Trekking poles, gaiters, and microspikes are also available to rent or purchase locally.',
    tags: ['gear rental', 'sleeping bag', 'down jacket', 'thamel', 'lakeside']
  },

  // 6. Money, Tipping & Logistics
  {
    id: 'faq-atms',
    category: 'Money & Logistics',
    question: 'Are there ATMs along the trail? How much cash should I bring?',
    answer: 'There are NO ATMs once you leave Pokhara or the Nayapul trailhead. You must withdraw all required Nepalese Rupees (NPR) in Pokhara before heading into the mountains. We recommend budgeting roughly 2,500 to 4,000 NPR ($20–$30 USD) per person per day to cover personal expenses like extra hot showers, snacks, Wi-Fi, battery charging, hot springs entry, and drinks.',
    tags: ['atms', 'cash', 'money', 'nepalese rupees', 'budget']
  },
  {
    id: 'faq-tipping',
    category: 'Money & Logistics',
    question: 'What is the tipping etiquette for Nepali guides and porters?',
    answer: 'Tipping is an integral part of Himalayan trekking culture and shows appreciation for your crew’s dedicated service. A standard guideline is roughly 10% to 15% of your total package price, or approximately $15–$25 USD per day for the lead guide and $8–$12 USD per day for your porter (split among group members). Tips are customarily presented in cash in an envelope on the final night of the trek at Jhinu Danda or Pokhara.',
    tags: ['tipping', 'tips', 'guide tips', 'porter tip', 'etiquette']
  },
  {
    id: 'faq-jhinu-springs',
    category: 'Money & Logistics',
    question: 'What are the Jhinu Danda hot springs like? When do we visit?',
    answer: 'Jhinu Danda features three natural geothermal mineral pools nestled right beside the roaring glacier-fed Modi Khola river at 1,780m. The water temperature sits around 38°C to 42°C (100°F–108°F), containing natural sulfur and minerals that soothe tired calf and knee muscles after trekking down from ABC. The springs are a 20-minute walk downhill from Jhinu village, and there is a small entry fee of 150 NPR.',
    tags: ['jhinu danda', 'hot springs', 'thermal bath', 'modi khola', 'recovery']
  },
  {
    id: 'faq-heli-return',
    category: 'Money & Logistics',
    question: 'Can I fly back from Annapurna Base Camp to Pokhara via helicopter?',
    answer: 'Yes! Instead of spending 3 to 4 days hiking back down the thousands of stone steps through Bamboo and Chhomrong, you can board a chartered or shared Airbus H125 helicopter directly at Annapurna Base Camp (4,130m). The flight sweeps over the entire Modi Khola gorge, Fishtail peak, and Gurung villages, landing at Pokhara Airport in just 25 minutes. It is included in our 5-Star Luxury tier and available as an add-on for all other tiers.',
    tags: ['helicopter', 'heli return', 'flight', 'pokhara flight', 'scenic']
  }
];

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-overview');

  const categories = ['All', 'Route & Difficulty', 'Permits & Rules', 'Food & Lodges', 'Health & Safety', 'Tech & Connectivity', 'Money & Logistics'];

  const filteredFaqs = useMemo(() => {
    return REAL_ABC_FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="scroll-mt-28 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-3 shadow-xs">
          <HelpCircle className="w-4 h-4 text-sky-600" />
          <span>Himalayan Field Knowledge • 24/7 Verified Guide Data</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Annapurna Base Camp FAQs
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          Real questions answered by licensed Himalayan expedition leaders. Filter by topic or search below for drinking water, permits, AMS safety, Wi-Fi, electricity, and tipping etiquette.
        </p>

        {/* Live Search Input */}
        <div className="max-w-xl mx-auto mt-8 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g., permits, water, Diamox, Wi-Fi, helicopter, tipping)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen
                    ? 'border-sky-400 shadow-md ring-1 ring-sky-200/70'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 shrink-0 mt-0.5 sm:mt-0">
                      {item.category}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-sky-100 text-sky-700 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p className="mb-3">{item.answer}</p>
                    <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-500">Related topics:</span>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery(tag);
                          }}
                          className="px-2 py-0.5 rounded-md bg-slate-50 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 cursor-pointer transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500">
            <p className="text-sm font-semibold mb-2">No matching questions found for &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs text-sky-600 hover:text-sky-700 font-bold underline"
            >
              Reset filters & show all {REAL_ABC_FAQS.length} questions
            </button>
          </div>
        )}
      </div>

      {/* Direct Assistance CTA Banner */}
      <div className="mt-14 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-700">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-base sm:text-lg text-white">
              Still Have Questions or Custom Preferences?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Chat directly with our licensed Sherpa guides in Pokhara. We will answer all your route, fitness, and packing questions.
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
            <span>Ask Guide on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
