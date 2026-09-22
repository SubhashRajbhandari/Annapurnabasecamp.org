import React, { useState } from 'react';
import { 
  BookOpen, 
  DollarSign, 
  CloudSun, 
  GitCompare, 
  ShieldAlert, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Activity,
  Wifi
} from 'lucide-react';
import { trackWhatsAppClick } from '../../lib/analytics';

interface GuideArticle {
  id: string;
  category: 'Cost & Budget' | 'Weather & Seasons' | 'Route Comparison' | 'Altitude Safety' | 'Permits & Rules';
  title: string;
  readTime: string;
  snippet: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  publishedDate: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string;
      bullets?: string[];
      table?: { headers: string[]; rows: string[][] };
    }[];
    proTip: string;
  };
}

export const FIELD_GUIDES: GuideArticle[] = [
  {
    id: 'guide-cost-budget',
    category: 'Cost & Budget',
    title: 'Annapurna Base Camp Trek Cost & Complete Budget Breakdown (2026/2027)',
    readTime: '6 min read',
    snippet: 'Comprehensive transparent pricing for ABC Nepal: ACAP & TIMS permits, licensed Sherpa guide wages, porter fees, teahouse meal costs, hot showers, and gear rentals.',
    badge: 'Updated for 2026/2027',
    icon: DollarSign,
    publishedDate: 'Autumn 2026',
    content: {
      lead: 'Planning your trek to Annapurna Base Camp (4,130m / 13,550ft) requires clear financial transparency. The total cost varies from $890 for authentic teahouse expeditions to $2,890 for 5-Star Himalayan Sanctuary Luxury featuring VIP helicopter descents. Below is the official itemized budget breakdown based on current Nepal Tourism Board and ACAP tariff regulations.',
      sections: [
        {
          heading: '1. Mandatory Government Permits & Checkpoint Fees',
          body: 'Every foreign trekker entering the Annapurna Sanctuary must obtain two official government credentials before passing the Birethanti and Chhomrong checkpoints:',
          bullets: [
            'ACAP (Annapurna Conservation Area Project) Entry Permit: NPR 3,000 (~$25 USD) per person.',
            'TIMS (Trekkers’ Information Management System) Card: NPR 2,000 (~$17 USD) per person.',
            'SAARC Citizens: NPR 1,000 (~$8 USD) for ACAP; NPR 1,000 for TIMS.',
            'All Annapurnabasecamp.org packages include pre-processed permits with passport checkpoint clearances.'
          ]
        },
        {
          heading: '2. Professional Guide & Porter Daily Wage Standards',
          body: 'Under current Nepal government trekking regulations, solo foreign hikers must be accompanied by a licensed guide for safety in high-alpine regions. Ethical wage standards protect local mountain workers:',
          bullets: [
            'Government-Certified Sherpa Lead Guide: $30 – $45 USD / day (covers guide salary, insurance, lodging, meals, and mountain equipment).',
            'Dedicated 1:1 Porter (Carries up to 15kg duffel): $22 – $28 USD / day (includes health insurance, ethical load limit compliance, and high-altitude gear).',
            'Shared 1:2 Porter (10kg per trekker limit): $18 – $22 USD / day.'
          ]
        },
        {
          heading: '3. Typical Daily Expenses in Mountain Teahouses',
          body: 'As you ascend beyond Sinuwa, Deurali, and Machapuchare Base Camp, all food and cooking supplies are carried up stone staircases by human porters and mules. Consequently, prices scale slightly with altitude:',
          table: {
            headers: ['Item / Service', 'Lower Trails (Jhinu/Ghandruk)', 'High Sanctuary (Deurali/ABC 4,130m)'],
            rows: [
              ['Traditional Dal Bhat (Unlimited Refills)', '$5 – $6 USD', '$8 – $10 USD'],
              ['Oatmeal / Eggs / Tibetan Bread Breakfast', '$4 – $5 USD', '$6 – $8 USD'],
              ['Boiled Water Refill (1 Liter Thermos)', '$1.50 USD', '$3.00 – $4.00 USD'],
              ['Hot Gas/Solar Bucket Shower', '$2.00 – $3.00 USD', '$4.00 – $5.00 USD (Not recommended above 3,500m)'],
              ['Solar Battery / Phone Recharge', '$1.50 – $2.00 USD', '$3.00 – $4.00 USD per device'],
              ['Wi-Fi 24-Hour Pass (Everest Link / Airzed)', '$3.00 USD', '$5.00 USD (Weather dependent)']
            ]
          }
        },
        {
          heading: '4. Complete Package Comparison vs Self-Organized Costs',
          body: 'While independent booking may save $50-$100 on paper, it carries high risks of lodge room shortages during peak Autumn/Spring, unverified porters without insurance, and zero backup during weather emergencies. Our packages bundle boutique room reservations, 3 meals daily, private transfers, and helicopter standby.'
        }
      ],
      proTip: 'Carry NPR 20,000 to 25,000 in cash ($150–$200 USD) for personal incidentals (hot showers, charging, tea, bakery pastries). There are zero ATMs once you leave Pokhara.'
    }
  },
  {
    id: 'guide-weather-seasons',
    category: 'Weather & Seasons',
    title: 'Best Time to Trek Annapurna Base Camp (Month-by-Month Weather & Temperature)',
    readTime: '5 min read',
    snippet: 'Discover the ideal trekking window for ABC Nepal: Autumn crystal skies, Spring rhododendron blossoms, crisp Winter snowscapes, and Monsoon off-peak conditions.',
    badge: 'Seasonal Intelligence',
    icon: CloudSun,
    publishedDate: 'Autumn 2026',
    content: {
      lead: 'The Annapurna Sanctuary experiences four distinct climatic seasons. Because the trail rises from 820m in Pokhara to 4,130m at Base Camp, weather transitions dramatically from subtropical warmth to Arctic-grade sub-zero conditions. Selecting the right trekking window is critical for crystal mountain views and safe trail walking.',
      sections: [
        {
          heading: '1. Peak Autumn (Late September through November) — Best Overall',
          body: 'Autumn is globally celebrated as the premier trekking window in the Nepal Himalayas. The summer monsoon clears all atmospheric dust, leaving the air intensely crisp with 50+ kilometer visibility.',
          bullets: [
            'Daytime Temperatures: 12°C to 18°C (54°F to 64°F) on lower trails; 4°C to 8°C at ABC (4,130m).',
            'Nighttime Temperatures: -5°C to -10°C (14°F to 23°F) at Base Camp.',
            'Visibility: 95% clear morning skies; spectacular sunrises over Annapurna I and Machapuchare.',
            'Precipitation: Minimal rain; very stable trekking conditions.'
          ]
        },
        {
          heading: '2. Vibrant Spring (March through May) — Rhododendron Forest Blooms',
          body: 'Spring is the second most popular season. The days grow progressively warmer, and the hillsides between Ulleri, Ghorepani, and Chhomrong ignite into vibrant crimson, pink, and white blooms of wild rhododendron trees.',
          bullets: [
            'Daytime Temperatures: 15°C to 22°C (59°F to 72°F); pleasant t-shirt hiking weather at lower elevations.',
            'Nighttime Temperatures: -2°C to -6°C at ABC.',
            'Flora & Fauna: Active Himalayan wildlife including Himalayan monal, musk deer, and langur monkeys.',
            'Afternoon Clouds: Mornings are crystal clear; afternoon clouds roll in with occasional alpine breezes.'
          ]
        },
        {
          heading: '3. Winter Sanctuary (December through February) — Solitude & Snow',
          body: 'Winter brings freezing temperatures but pristine, dry blue skies with few other hikers on the trails. Snow covers the sanctuary cirque, creating a breathtaking pure-white alpine landscape.',
          bullets: [
            'Nighttime Temperatures: -12°C to -18°C at Annapurna Base Camp.',
            'Highlights: Empty trails, supreme photographic clarity, guaranteed private teahouse rooms.',
            'Precautions: Heavy snowfall can occasionally close the avalanche zone between Deurali and MBC. Microspikes and certified Sherpa guides are essential.'
          ]
        },
        {
          heading: '4. Month-by-Month Temperature & Condition Overview',
          body: 'Use this guide to match your fitness and holiday schedule with the mountain conditions:',
          table: {
            headers: ['Month', 'ABC Day Temp', 'ABC Night Temp', 'Crowd Level', 'Trail Verdict'],
            rows: [
              ['October', '6°C / 43°F', '-5°C / 23°F', 'High (Peak)', 'Best Visibility & Clear Skies'],
              ['November', '3°C / 37°F', '-8°C / 18°F', 'Moderate', 'Crisp, Dry, Highly Stable'],
              ['December', '0°C / 32°F', '-14°C / 7°F', 'Low', 'Pristine Snow, Quiet Lodges'],
              ['March', '7°C / 45°F', '-5°C / 23°F', 'Moderate', 'Blooming Forests, Warm Days'],
              ['April', '10°C / 50°F', '-2°C / 28°F', 'High', 'Ideal Rhododendrons & Mild Nights'],
              ['May', '12°C / 54°F', '1°C / 34°F', 'Moderate', 'Warm Days, Occasional Afternoon Clouds']
            ]
          }
        }
      ],
      proTip: 'For the ultimate balance of warm afternoon hiking and 100% cloud-free sunrise photography, target mid-October or early April.'
    }
  },
  {
    id: 'guide-abc-vs-ebc',
    category: 'Route Comparison',
    title: 'Annapurna Base Camp vs Everest Base Camp (ABC vs EBC): Which Trek Is Better?',
    readTime: '5 min read',
    snippet: 'Compare altitude sickness risks, Lukla flight cancellations, scenery diversity, daily steps, and budget differences between Nepal’s two greatest Himalayan treks.',
    badge: 'Trekker Decision Matrix',
    icon: GitCompare,
    publishedDate: 'Autumn 2026',
    content: {
      lead: 'Every adventurer contemplating trekking in Nepal faces the iconic choice: Annapurna Base Camp (ABC) or Everest Base Camp (EBC)? While both deliver lifetime Himalayan memories, their topography, altitude exposure, access logistics, and physical demands differ substantially.',
      sections: [
        {
          heading: '1. Maximum Altitude & Altitude Sickness (AMS) Risk',
          body: 'The most decisive physiological distinction between the two routes is altitude exposure:',
          bullets: [
            'Annapurna Base Camp reaches a maximum altitude of 4,130m (13,550ft). At this elevation, atmospheric oxygen is roughly 62% of sea level. Acclimatization is smooth and serious Acute Mountain Sickness (AMS) is rare.',
            'Everest Base Camp ascends to 5,364m (17,598ft) and Kala Patthar at 5,550m (18,208ft), where atmospheric oxygen plummets to ~50%. Acclimatization rest days in Namche Bazaar and Dingboche are mandatory, and AMS symptoms occur in over 40% of hikers.',
            'Winner: Annapurna Base Camp is significantly safer and more comfortable for active beginners and couples.'
          ]
        },
        {
          heading: '2. Landscape & Ecological Diversity',
          body: 'On ABC, you experience four distinct ecological zones in 10 days: lush subtropical bamboo groves, roaring Modi Khola river gorges, terraced Gurung farm villages, mossy rhododendron woodlands, and suddenly the sheer glacial amphitheater of 8,000m summits. EBC, in contrast, enters cold, dry alpine moraine by Day 3 and remains above the tree line for 80% of the trek.',
          bullets: [
            'ABC Viewpoint: You stand inside a 360-degree bowl enclosed by Annapurna I (8,091m), Annapurna South (7,219m), and Machapuchare (6,993m).',
            'EBC Viewpoint: You view Everest from below, but Everest summit itself is obscured behind Nuptse from Base Camp.'
          ]
        },
        {
          heading: '3. Transport Reliability: No Lukla Flight Jitters',
          body: 'Everest requires taking small propeller aircraft to Tenzing-Hillary Airport in Lukla, notorious for cloud-induced delays and cancellations lasting up to 3–5 days. ABC is accessed via smooth overland highway or short 25-minute scenic flights to Pokhara, with zero risk of being stranded in remote mountain airstrips.'
        },
        {
          heading: '4. Direct Comparison Matrix',
          body: 'Key metrics head-to-head:',
          table: {
            headers: ['Comparison Metric', 'Annapurna Base Camp (ABC)', 'Everest Base Camp (EBC)'],
            rows: [
              ['Max Elevation', '4,130m / 13,550ft', '5,364m / 17,598ft (Kala Patthar 5,550m)'],
              ['Typical Duration', '7 to 11 Days', '12 to 16 Days'],
              ['AMS / Altitude Risk', 'Low to Moderate', 'High (Over 5,000m threshold)'],
              ['Transport', 'Scenic drive/flight to Pokhara', 'Unpredictable Lukla mountain flight'],
              ['Trail Terrain', 'Stone steps, rivers, rhododendron forests', 'Rocky trails, dry scree, glacial moraine'],
              ['Average Cost', '$890 – $1,850 USD', '$1,450 – $2,800 USD']
            ]
          }
        }
      ],
      proTip: 'If this is your first high-altitude trek or you have less than 2 weeks of vacation, Annapurna Base Camp is the undisputed champion for scenery, safety, and reliability.'
    }
  },
  {
    id: 'guide-altitude-safety',
    category: 'Altitude Safety',
    title: 'Altitude Sickness (AMS) on Annapurna Base Camp: Prevention, Symptoms & Diamox Guide',
    readTime: '6 min read',
    snippet: 'Essential medical safety guidelines for hiking safely past 4,000m: recognizing early AMS, Diamox dosage protocols, hydration limits, and 25-minute emergency helicopter evacs.',
    badge: 'Medical Safety Protocols',
    icon: ShieldAlert,
    publishedDate: 'Autumn 2026',
    content: {
      lead: 'At Annapurna Base Camp (4,130m / 13,550ft), atmospheric barometric pressure drops to 468 mmHg, meaning each lungful of air contains approximately 38% fewer oxygen molecules than at sea level. With proper pacing, our trekkers maintain a 98.4% summit success rate. Here are the life-saving acclimatization protocols followed by our certified Sherpa guides.',
      sections: [
        {
          heading: '1. Recognizing Acute Mountain Sickness (AMS) Early',
          body: 'Altitude sickness is not a reflection of fitness—it is your body adapting to lower oxygen saturation. Watch for early warning signs:',
          bullets: [
            'Mild / Early AMS: Dull throbbing headache (usually behind temples), mild fatigue, loss of appetite, slight dizziness, and restless sleep.',
            'Moderate AMS: Persistent headache unrelieved by Paracetamol/Ibuprofen, nausea, vomiting, shortness of breath during mild walking.',
            'Severe Warning (HAPE/HACE): Extreme breathlessness while resting, persistent cough with frothy sputum, loss of coordination (stumbling/ataxia), confusion. This requires immediate descent.'
          ]
        },
        {
          heading: '2. The 3 Golden Rules of Himalayan Acclimatization',
          body: 'Our lead guides enforce these wilderness medicine principles every day on the trail:',
          bullets: [
            'Ascend Gradually: Beyond 3,000m (Deurali), sleeping elevation gain is strictly capped between 400m to 600m per 24 hours.',
            'Climb High, Sleep Low: During afternoon arrival at Machapuchare Base Camp (3,700m), we take a gentle 150m acclimatization walk up the ridge and return down to sleep.',
            'Never Ascend with Symptoms: If you have a persistent headache or nausea, stay at that elevation. If symptoms worsen, descent is mandatory.'
          ]
        },
        {
          heading: '3. Hydration & Nutrition Fueling',
          body: 'High-altitude breathing causes rapid moisture loss. Trekkers must consume 4 to 5 liters of fluid daily. This includes safe boiled water refills, ginger lemon honey tea, garlic soup (a traditional Himalayan vasodilator), and electrolyte packs. Alcohol and sleeping pills are strictly forbidden above Chhomrong (2,170m).'
        },
        {
          heading: '4. Diamox (Acetazolamide) Medical Protocol',
          body: 'Acetazolamide forces the kidneys to excrete bicarbonate, lightly acidifying the blood and stimulating your brain to breathe deeper, especially while sleeping:',
          bullets: [
            'Preventative Dosage: 125mg to 250mg taken twice daily, starting 24 hours before ascending past Sinuwa (2,360m).',
            'Common Side Effects: Harmless tingling sensation in fingers/toes (paresthesia) and increased urination.',
            'Contraindications: Do not take Diamox if you have a known allergy to sulfa-based medications. Always consult your personal physician before departure.'
          ]
        }
      ],
      proTip: 'Our lead guides carry portable fingertip pulse oximeters to measure your blood oxygen saturation (SpO2) and resting heart rate every morning and evening.'
    }
  },
  {
    id: 'guide-permits-rules',
    category: 'Permits & Rules',
    title: 'Nepal Trekking Permits Guide: ACAP & TIMS Rules, Checkpoints & Documents',
    readTime: '4 min read',
    snippet: 'Everything you need to know about official government paperwork, passport photo requirements, checkpoint stamping locations, and environmental sanctuary rules.',
    badge: 'Official Regulations',
    icon: ShieldCheck,
    publishedDate: 'Autumn 2026',
    content: {
      lead: 'The Annapurna Conservation Area is Nepal’s largest protected ecological sanctuary, covering 7,629 square kilometers. All foreign nationals are required by law to hold valid permits before entering. Here is everything you need to know regarding application documents, fees, and checkpoint procedures.',
      sections: [
        {
          heading: '1. Required Documents for Permits',
          body: 'When booking through Annapurnabasecamp.org, our Kathmandu and Pokhara operational desks handle all government submissions in advance. To process your credentials, we require:',
          bullets: [
            'Digital passport copy with at least 6 months remaining validity.',
            'Two passport-sized color photos (or digital high-res headshot).',
            'Travel insurance policy details covering emergency high-altitude medical evacuation up to 5,000m.',
            'Approximate entry and exit dates with intended trailhead route.'
          ]
        },
        {
          heading: '2. Official Checkpoints Along the Route',
          body: 'Your permits will be physically checked, stamped, and logged into government emergency registries at:',
          bullets: [
            'Birethanti Checkpoint (ACAP & TIMS verification).',
            'Chhomrong ACAP Station (Mandatory environmental check & plastic bottle inspection).',
            'Bamboo & Deurali Rangers Outpost.'
          ]
        },
        {
          heading: '3. Sanctuary Environmental Protections',
          body: 'The Annapurna Conservation Area Project (ACAP) strictly enforces environmental conservation:',
          bullets: [
            'Zero Single-Use Plastic: Commercial disposable plastic mineral bottles are strictly banned past Chhomrong. Reusable insulated flasks or hydration bladders are required.',
            'Sacred Machapuchare: Mt. Machapuchare (6,993m) is deeply revered as the sacred abode of Lord Shiva. Climbing the summit is strictly forbidden by Nepalese law.',
            'Leave No Trace: All non-biodegradable waste must be packed out.'
          ]
        }
      ],
      proTip: 'Keep your physical permit papers safely sealed in a waterproof Ziploc bag in your daypack, as you will need to present them at checkpoints in both directions.'
    }
  },
  {
    id: 'guide-circuit-vs-basecamp',
    category: 'Route Comparison',
    title: 'Annapurna Circuit vs Annapurna Base Camp (ACT vs ABC): Which Trek Should You Choose?',
    readTime: '6 min read',
    snippet: 'Compare the legendary 5,416m Thorong La Pass high circuit against the intimate, pristine 4,130m Annapurna Sanctuary cul-de-sac.',
    badge: 'Route Decision Matrix',
    icon: GitCompare,
    publishedDate: '2026/2027 Season',
    content: {
      lead: 'Both the Annapurna Circuit (ACT) and Annapurna Base Camp (ABC) are world-class Himalayan journeys, but they offer vastly different experiences in terms of altitude exposure, duration, road encroachment, and trail landscapes. Here is a definitive breakdown to help you choose the right expedition.',
      sections: [
        {
          heading: '1. Trail Highlights: Thorong La Pass vs The Sacred Sanctuary Cirque',
          body: 'The character of each journey is distinct:',
          bullets: [
            'Annapurna Circuit (ACT): Climbs over Thorong La Pass at 5,416m (17,769ft), connecting the lush sub-tropical lowlands of Lamjung with the arid Tibetan-plateau desert landscape of Mustang and the sacred temples of Muktinath.',
            'Annapurna Base Camp (ABC): Ventures deep into a glacial cul-de-sac at 4,130m (13,550ft) surrounded on all sides by 10 soaring peaks over 7,000m, culminating beneath the colossal 8,091m South Face of Annapurna I.',
            'Scenery Comparison: The Circuit offers vast transition through biomes, while ABC offers an intimate, immediate 360° wall of hanging glaciers.'
          ]
        },
        {
          heading: '2. Duration, Time Commitment & Physical Demand',
          body: 'Evaluate the physical commitment and vacation time required:',
          table: {
            headers: ['Expedition Metric', 'Annapurna Base Camp (ABC)', 'Annapurna Circuit (ACT)'],
            rows: [
              ['Standard Duration', '7 to 11 Days', '14 to 21 Days (or 10-12 days shortened)'],
              ['Highest Elevation', '4,130m (13,550ft at Base Camp)', '5,416m (17,769ft at Thorong La Pass)'],
              ['Altitude Sickness (AMS) Risk', 'Low to Moderate', 'High (Mandatory acclimatization in Manang)'],
              ['Road Construction Impact', 'Zero roads past Ghandruk/Jhinu (100% Pure Trail)', 'Dirt jeep roads now traverse parts of the lower Circuit'],
              ['Total Walking Distance', 'Approx. 115 km (71 miles)', 'Approx. 160 – 230 km (99 – 143 miles)'],
              ['Best For', 'Active travelers with 1-2 weeks vacation', 'Long-distance trekkers with 3+ weeks']
            ]
          }
        },
        {
          heading: '3. The Road Encroachment Factor',
          body: 'Over the past decade, dirt motor roads have been carved along the Marsyangdi and Kali Gandaki river valleys of the Annapurna Circuit, meaning trekkers frequently encounter jeeps and dust on certain sections. In contrast, the Annapurna Sanctuary route remains 100% road-free beyond the initial trailheads, preserving an authentic, serene foot-trail mountain wilderness.'
        },
        {
          heading: '4. Summary Verdict',
          body: 'Choose ABC if you have 1 to 2 weeks, want a classic mountain amphitheater with zero road noise, and prefer lower altitude sickness risk. Choose the Circuit if you have 3 full weeks and want the challenge of conquering a 5,400m high-altitude Himalayan mountain pass.'
        }
      ],
      proTip: 'For the ultimate combination of high-altitude alpine views without exhausting 4-day descents, our 5-Star ABC package features a scenic VIP helicopter flight directly from Base Camp (4,130m) back to Pokhara Lakeside in just 25 minutes.'
    }
  },
  {
    id: 'guide-training-preparation',
    category: 'Altitude Safety',
    title: 'How to Train for Annapurna Base Camp: 8-Week Fitness & Stairs Conditioning Guide',
    readTime: '5 min read',
    snippet: 'Targeted cardiovascular conditioning, stair climbing drills, eccentric quad strength, and endurance benchmarks for conquering 3,300 stone steps.',
    badge: 'Pre-Trek Training',
    icon: Activity,
    publishedDate: '2026/2027 Season',
    content: {
      lead: 'While Annapurna Base Camp (4,130m) does not require technical climbing ropes or ice axes, it demands robust muscular endurance and cardiovascular stamina. The trail features approximately 3,300 steep stone steps connecting Chhomrong, Sinuwa, and the Modi Khola river canyon. Following this structured 8-week program will ensure your knees, lungs, and legs are expedition-ready.',
      sections: [
        {
          heading: '1. The Core Pillar: Stair Climbing & Eccentric Quad Loading',
          body: 'The most physically demanding aspect of the ABC trail is not ascending—it is the repetitive knee-jarring descent down thousands of uneven stone steps. Eccentric leg training strengthens tendons and cushions knee cartilage:',
          bullets: [
            'Stairmaster / Real Stairs: 30 to 45 minutes, 3 times weekly. Carry a light daypack (5–8kg) to simulate trail load.',
            'Eccentric Step-Downs: 3 sets of 15 slow reps per leg off a 15–20cm step to bulletproof patellar tendons.',
            'Goblet Squats & Lunges: Strengthen quadriceps, hamstrings, and glutes for high-stepping over boulders.',
            'Trekking Poles: Dual poles reduce downhill knee joint impact by up to 25%, saving up to 8 metric tons of joint load over a 6-day trek.'
          ]
        },
        {
          heading: '2. Zone 2 Aerobic Base Conditioning',
          body: 'Trekking requires steady energy production over 5 to 7 hours daily without accumulating lactic acid. Train in Zone 2 heart rate (where you can hold a conversation while breathing deeply):',
          bullets: [
            'Brisk Incline Walking / Outdoor Trail Hikes: 60–90 minutes once or twice weekly on undulating outdoor terrain.',
            'Stationary Rowing or Cycling: Low-impact cardio that builds lung volume and cardiovascular capacity without wearing down knee cartilage.',
            'Diaphragmatic Breathing: Practice rhythmic nasal breathing during cardio intervals to prepare for thinner air above 3,000m.'
          ]
        },
        {
          heading: '3. 8-Week Countdown Training Schedule',
          body: 'Follow this progressive milestone plan leading up to your Nepal departure:',
          table: {
            headers: ['Phase', 'Weekly Training Focus', 'Target Milestone'],
            rows: [
              ['Weeks 1–3: Foundation', '3x 30-min cardio + Bodyweight squats & planks', 'Comfortable 5km brisk walk with 3kg daypack'],
              ['Weeks 4–6: Progression', 'Stairmaster 45 min + Incline hill hikes with 6kg pack', 'Continuous 40-floor stair climb without stopping'],
              ['Week 7: Peak Simulation', '2-hour weekend trail hike with 8kg pack & trekking poles', 'Full daypack stamina test on rugged hills'],
              ['Week 8: Taper & Rest', 'Light 20-min walks, mobility, calf & hamstring stretching', 'Arrive in Kathmandu 100% recovered and fresh']
            ]
          }
        }
      ],
      proTip: 'Break in your trekking boots at least 4 to 6 weeks before departure. Wear them on your stair training sessions with your expedition merino wool socks to eliminate blister hotspots.'
    }
  },
  {
    id: 'guide-connectivity-sim-cards',
    category: 'Permits & Rules',
    title: 'Connectivity on ABC Trek: NTC vs Ncell 4G, Teahouse Wi-Fi & Power Charging (2026)',
    readTime: '5 min read',
    snippet: 'Complete digital survival guide for Nepal: which SIM card works best in the sanctuary, satellite communication, Wi-Fi voucher costs, and solar charging tips.',
    badge: 'Digital Logistics',
    icon: Wifi,
    publishedDate: '2026/2027 Season',
    content: {
      lead: 'Staying connected with family and colleagues while trekking deep into the Annapurna Sanctuary is easier than ever, but remote high-altitude geography presents unique quirks. Here is the definitive telecommunications and electrical guide for the ABC trail.',
      sections: [
        {
          heading: '1. NTC (Namaste) vs Ncell: Which SIM Card is Better for ABC?',
          body: 'Both major cellular carriers operate towers in the Annapurna region, but their coverage patterns differ along the trail:',
          bullets: [
            'Nepal Telecom (NTC / Namaste): Best overall coverage in the Annapurna Sanctuary. Operates dedicated solar-powered relay towers near Deurali and Chhomrong, providing 4G/3G connectivity up to Machapuchare Base Camp (3,700m).',
            'Ncell: Excellent high-speed 4G data in Kathmandu, Pokhara, Nayapul, and Ghandruk, but signal fades significantly once inside the deep Modi Khola river canyon beyond Bamboo.',
            'Recommendation: Pick up an NTC tourist eSIM or physical SIM at Kathmandu Airport (TIA) or Pokhara Lakeside for $10–$15 USD with 20GB–30GB high-speed data.'
          ]
        },
        {
          heading: '2. Teahouse Wi-Fi Systems (Everest Link & Airzed)',
          body: 'When cellular tower reception is blocked by massive granite cliffs, mountain lodges provide wireless internet via satellite microwave links:',
          bullets: [
            'Prepaid Wi-Fi Cards: Lodges sell scratch cards (Everest Link or Airzed) for NPR 400 to 600 (~$3–$5 USD) providing 10GB to 20GB of data valid for 24 hours.',
            'Speed & Latency: Speeds range from 2 Mbps to 8 Mbps—ample for WhatsApp messaging, voice calls, and email. Satellite links can slow down during heavy rain or snow.'
          ]
        },
        {
          heading: '3. Electricity & Device Charging Protocols',
          body: 'Above Sinuwa, the regional electrical grid ends. Teahouses operate exclusively on solar photovoltaic panels and lithium battery banks:',
          bullets: [
            'Charging Fees: Lower teahouses offer free wall outlets in dining halls; higher teahouses (Deurali, MBC, ABC) charge NPR 200 to 400 ($1.50–$3 USD) per device per full charge.',
            'Cold Temperature Battery Drain: Sub-zero nighttime temperatures (-5°C to -10°C) cause lithium-ion phone and camera batteries to discharge rapidly. Always sleep with your phone and power bank inside your sleeping bag close to your body.',
            'Power Bank Recommendation: Carry a 10,000mAh to 20,000mAh high-density power bank to charge your devices independently.'
          ]
        }
      ],
      proTip: 'In our 4-Star Mountain Premier and 5-Star Sanctuary Luxury tiers, all teahouse Wi-Fi cards and device solar charging fees are 100% complimentary and covered in your package.'
    }
  }
];

export const FieldGuides: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  const categories = ['All', 'Cost & Budget', 'Weather & Seasons', 'Route Comparison', 'Altitude Safety', 'Permits & Rules'];

  const filteredGuides = activeCategory === 'All'
    ? FIELD_GUIDES
    : FIELD_GUIDES.filter((g) => g.category === activeCategory);

  const activeArticle = FIELD_GUIDES.find((g) => g.id === selectedGuideId);

  return (
    <section id="guides" className="scroll-mt-28 py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-3 shadow-xs">
          <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
          <span>Himalayan Expedition Field Knowledge Hub</span>
        </div>
        <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Essential Annapurna Base Camp Guides
        </h2>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed px-2">
          Researched and authored by licensed Himalayan expedition leaders. Dive into detailed cost breakdowns, weather calendars, route comparisons, and altitude acclimatization protocols.
        </p>

        {/* Category Pills */}
        <div className="flex max-w-full overflow-x-auto p-1 sm:p-1.5 rounded-2xl bg-white border border-slate-200 mt-6 sm:mt-8 shadow-sm justify-start sm:justify-center gap-1.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredGuides.map((guide) => {
          const Icon = guide.icon;
          return (
            <article
              key={guide.id}
              onClick={() => setSelectedGuideId(guide.id)}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200/70">
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                    {guide.title}
                  </h3>
                </div>

                {/* Snippet */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5">
                  {guide.snippet}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-700">
                <span className="flex items-center gap-1">
                  <span>Read Complete Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{guide.badge}</span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl my-6 text-slate-900 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedGuideId(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition cursor-pointer"
              title="Close Guide"
            >
              ✕
            </button>

            {/* Category & Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                {activeArticle.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold">• {activeArticle.readTime}</span>
              <span className="text-xs text-amber-600 font-bold">• {activeArticle.badge}</span>
            </div>

            {/* Article Heading */}
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
              {activeArticle.title}
            </h2>

            {/* Lead Paragraph */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              {activeArticle.content.lead}
            </p>

            {/* Article Body Sections */}
            <div className="space-y-6 text-xs sm:text-sm text-slate-700">
              {activeArticle.content.sections.map((sec, idx) => (
                <div key={idx} className="border-t border-slate-100 pt-5">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2.5">
                    {sec.heading}
                  </h3>
                  <p className="leading-relaxed mb-3 text-slate-600">
                    {sec.body}
                  </p>

                  {/* Bullet points if present */}
                  {sec.bullets && (
                    <ul className="space-y-2 mb-4">
                      {sec.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-slate-800 leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Comparison Table if present */}
                  {sec.table && (
                    <div className="w-full overflow-x-auto my-4 rounded-2xl border border-slate-200 shadow-2xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-900 text-white">
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px]">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`py-2.5 px-3.5 ${cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pro Tip Box */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3 shadow-2xs">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-xs sm:text-sm uppercase tracking-wider block text-amber-900 mb-0.5">
                  Lead Guide Pro Tip:
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 font-medium">
                  {activeArticle.content.proTip}
                </p>
              </div>
            </div>

            {/* Action Buttons in Reader */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="https://wa.me/9779820107807?text=Namaste!%20I%20am%20reading%20your%20Annapurna%20field%20guide%20and%20would%20like%20to%20consult%20with%20a%20lead%20guide."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('Field Guide Reader Modal')}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask a Lead Guide on WhatsApp (+977 9820107807)</span>
              </a>
              <button
                onClick={() => setSelectedGuideId(null)}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
