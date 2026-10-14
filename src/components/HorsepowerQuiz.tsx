import { useState } from 'react';
import { HelpCircle, Check, ArrowRight, RotateCcw, Compass, ShieldCheck } from 'lucide-react';

interface QuizProps {
  onSelectArticle: (slug: string) => void;
  onExploreTier: (tier: string) => void;
}

export function HorsepowerQuiz({ onSelectArticle, onExploreTier }: QuizProps) {
  const [step, setStep] = useState<number>(1);
  const [experience, setExperience] = useState<string>('beginner');
  const [purpose, setPurpose] = useState<string>('canyon');
  const [comfort, setComfort] = useState<string>('medium');
  const [budget, setBudget] = useState<string>('mid');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Recommendations calculation
  const getRecommendation = () => {
    if (experience === 'beginner') {
      return {
        hpRange: '35 - 50 HP',
        title: 'Lightweight Accessible Class',
        engineType: '300cc - 500cc Parallel Twin or Single',
        summary: 'Your ideal sweet spot is 35 to 50 horsepower. This delivers responsive 0-60 mph acceleration (~4.8s) and safe 80 mph cruising without whiskey-throttle panic or excessive chassis weight.',
        targetArticleSlug: 'best-motorcycles-for-beginners-hp',
        hpTier: '< 40 HP',
        bikes: [
          { name: 'Kawasaki Ninja 500', hp: '51 HP', weight: '379 lbs', price: '$5,299', why: 'Forgiving clutch, light chassis, and sporty ergonomics.' },
          { name: 'Honda Rebel 500', hp: '47 HP', weight: '408 lbs', price: '$6,499', why: 'Ultra-low 27.2" seat height and smooth linear power delivery.' },
          { name: 'Yamaha MT-03', hp: '41 HP', weight: '373 lbs', price: '$4,999', why: 'Agile upright naked geometry for rapid urban confidence.' },
        ],
      };
    }

    if (experience === 'intermediate') {
      if (purpose === 'touring') {
        return {
          hpRange: '70 - 95 HP',
          title: 'Middleweight Adventure & Sport-Tourer',
          engineType: '650cc - 800cc Twin or Triple',
          summary: 'A 70 to 95 HP twin gives you enough roll-on torque to haul luggage and tackle cross-country highway grades without downshifting, while retaining manageable curb weight.',
          targetArticleSlug: 'how-to-choose-bike-horsepower-budget',
          hpTier: '75 - 120 HP',
          bikes: [
            { name: 'Suzuki V-Strom 800DE', hp: '83 HP', weight: '507 lbs', price: '$11,349', why: 'Plush suspension and 270° crank low-end grunt.' },
            { name: 'Yamaha Tracer 7 / MT-07', hp: '73 HP', weight: '406 lbs', price: '$8,199', why: 'Legendary CP2 engine reliability with playful torque.' },
            { name: 'Triumph Tiger 660', hp: '80 HP', weight: '454 lbs', price: '$9,695', why: 'Smooth 3-cylinder powerband with touring windscreen.' },
          ],
        };
      }
      return {
        hpRange: '65 - 85 HP',
        title: 'The Real-World Road Apex',
        engineType: '650cc - 750cc Parallel Twin',
        summary: 'Widely celebrated as the greatest real-world road bracket. 75 HP delivers 0-60 in 3.4 seconds—faster than most sports cars—yet remains friendly and economical for daily use.',
        targetArticleSlug: 'beginner-vs-intermediate-vs-expert-bikes',
        hpTier: '40 - 75 HP',
        bikes: [
          { name: 'Yamaha MT-07', hp: '73.4 HP', weight: '406 lbs', price: '$8,199', why: 'Instant midrange punch and playful street agility.' },
          { name: 'Suzuki GSX-8S', hp: '82.9 HP', weight: '445 lbs', price: '$8,999', why: 'State-of-the-art bi-directional quickshifter and balance shafts.' },
          { name: 'Aprilia Tuono 660', hp: '95 HP', weight: '403 lbs', price: '$10,499', why: 'Advanced electronics suite and Italian handling precision.' },
        ],
      };
    }

    // Advanced / Expert
    if (purpose === 'track') {
      return {
        hpRange: '130 - 215+ HP',
        title: 'High-RPM Supersport & Homologation Superbike',
        engineType: '636cc - 1,000cc Inline-4 or V4',
        summary: 'Built strictly for track days, apex hunting, and high-speed telemetry. Demands advanced trail-braking, body steering, and physical fitness to extract its full aerospace capabilities.',
        targetArticleSlug: 'top-10-highest-horsepower-motorcycles',
        hpTier: '180+ HP',
        bikes: [
          { name: 'BMW S 1000 RR', hp: '205 HP', weight: '434 lbs', price: '$18,295', why: 'ShiftCam valvetrain with razor-sharp track electronics.' },
          { name: 'Ducati Panigale V4 S', hp: '215.5 HP', weight: '437 lbs', price: '$24,995', why: 'Desmosedici V4 engine and biplane downforce wings.' },
          { name: 'Kawasaki ZX-6R', hp: '127 HP', weight: '436 lbs', price: '$11,399', why: 'Classic high-RPM supersport rush without liter-bike price.' },
        ],
      };
    }

    return {
      hpRange: '110 - 145 HP',
      title: 'Open Heavyweight Roadster / Super-ADV',
      engineType: '900cc - 1,300cc Triple, V-Twin, or Boxer',
      summary: 'Effortless power everywhere on the tachometer. Provides blistering roll-on passing power from 60 to 120 mph with full 6-axis IMU rider safety aids.',
      targetArticleSlug: 'street-vs-sports-vs-superbikes',
      hpTier: '120 - 180 HP',
      bikes: [
        { name: 'Triumph Street Triple 765 RS', hp: '128 HP', weight: '414 lbs', price: '$12,795', why: 'Moto2 engine lineage with Brembo Stylema calipers.' },
        { name: 'KTM 990 Duke', hp: '123 HP', weight: '395 lbs', price: '$12,500', why: 'Extreme lightweight chassis with wheelie-ready agility.' },
        { name: 'BMW R 1300 GS', hp: '145 HP', weight: '522 lbs', price: '$19,590', why: 'Continent-crossing torque with radar cruise control.' },
      ],
    };
  };

  const rec = getRecommendation();

  const handleRestart = () => {
    setStep(1);
    setSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#091712] border border-emerald-900/80 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-950 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Compass className="w-4 h-4" />
            <span>Rider Matching Wizard</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            Find Your Ideal Motorcycle Horsepower & Tier
          </h2>
        </div>

        {submitted && (
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white px-3 py-1.5 rounded-lg border border-emerald-950 hover:bg-emerald-950 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        )}
      </div>

      {!submitted ? (
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
            <span>Step {step} of 4</span>
            <span>{step === 1 ? 'Experience' : step === 2 ? 'Riding Goal' : step === 3 ? 'Stature' : 'Budget'}</span>
          </div>

          <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-200"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Step 1: Experience */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">How much active motorcycle saddle time do you have?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'beginner', label: 'First-Time Rider / Novice', desc: '0 to 1 season, newly licensed or planning MSF' },
                  { id: 'intermediate', label: 'Developing Intermediate', desc: '2 to 4 seasons, comfortable on highways and twisties' },
                  { id: 'advanced', label: 'Experienced Seasoned Rider', desc: '5+ seasons, confident with throttle finesse' },
                  { id: 'expert', label: 'Track Specialist / Veteran', desc: 'Extensive track days, race clinic graduate' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setExperience(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      experience === opt.id
                        ? 'bg-emerald-950/80 border-emerald-500 text-white'
                        : 'bg-[#06100d] border-emerald-950 text-stone-300 hover:border-emerald-800'
                    }`}
                  >
                    <div className="font-semibold text-sm">{opt.label}</div>
                    <div className="text-xs text-stone-400 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Purpose */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Where will you ride 80% of the time?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'commute', label: 'Urban Commute & City Transit', desc: 'Lane splitting, tight parking, stop-and-go streets' },
                  { id: 'canyon', label: 'Weekend Backroads & Mountain Curves', desc: 'Sporty spirited riding and canyon carving' },
                  { id: 'touring', label: 'Highway Touring & Long Distances', desc: '500+ mile trips, luggage cases, passenger comfort' },
                  { id: 'track', label: 'Track Days & Pure Speed', desc: 'Apex precision, knee-down cornering, maximum RPM' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPurpose(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      purpose === opt.id
                        ? 'bg-emerald-950/80 border-emerald-500 text-white'
                        : 'bg-[#06100d] border-emerald-950 text-stone-300 hover:border-emerald-800'
                    }`}
                  >
                    <div className="font-semibold text-sm">{opt.label}</div>
                    <div className="text-xs text-stone-400 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Stature & Weight */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">What is your physical comfort with bike weight and seat height?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'light', label: 'Low & Lightweight', desc: 'Prefers under 380 lbs and seat height under 31" to flat-foot' },
                  { id: 'medium', label: 'Standard Balanced', desc: 'Comfortable with 400-450 lbs and standard 31-32.5" seat' },
                  { id: 'tall', label: 'Tall / Heavyweight Ok', desc: 'Experienced with 500+ lbs bikes and 33"+ tall adventure seats' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setComfort(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      comfort === opt.id
                        ? 'bg-emerald-950/80 border-emerald-500 text-white'
                        : 'bg-[#06100d] border-emerald-950 text-stone-300 hover:border-emerald-800'
                    }`}
                  >
                    <div className="font-semibold text-sm">{opt.label}</div>
                    <div className="text-xs text-stone-400 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">What is your target motorcycle budget?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'entry', label: 'Under $6,500', desc: 'Accessible entry-level new or quality pre-owned' },
                  { id: 'mid', label: '$6,500 – $11,000', desc: 'Prime sweet-spot middleweights with modern electronics' },
                  { id: 'premium', label: '$11,000 – $18,000', desc: 'High-spec supersports, triples and premium roadsters' },
                  { id: 'flagship', label: '$18,000+ Unlimited', desc: 'Top-tier homologation superbikes and flagship tourers' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setBudget(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      budget === opt.id
                        ? 'bg-emerald-950/80 border-emerald-500 text-white'
                        : 'bg-[#06100d] border-emerald-950 text-stone-300 hover:border-emerald-800'
                    }`}
                  >
                    <div className="font-semibold text-sm">{opt.label}</div>
                    <div className="text-xs text-stone-400 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-emerald-950">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
              >
                Previous Step
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#091512] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-emerald-950"
              >
                <span>Generate Recommendations</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-xl bg-[#06110e] border border-emerald-800/80 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Recommended Power Classification
              </span>
              <span className="font-mono text-xs text-stone-400">Engine Match: {rec.engineType}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                {rec.hpRange}
              </span>
              <span className="text-lg font-bold text-emerald-400">
                — {rec.title}
              </span>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed">
              {rec.summary}
            </p>
          </div>

          {/* 3 Recommended Models */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Ideal Motorcycle Matches For You
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {rec.bikes.map((bike, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#081712] border border-emerald-950 space-y-2">
                  <div className="font-bold text-white text-sm">{bike.name}</div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-semibold">{bike.hp}</span>
                    <span className="text-stone-400">{bike.weight}</span>
                  </div>
                  <div className="text-xs text-stone-300 font-mono">{bike.price}</div>
                  <div className="text-[11px] text-stone-400 pt-1 border-t border-emerald-950">
                    {bike.why}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => onSelectArticle(rec.targetArticleSlug)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Read Targeted Buyer Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onExploreTier(rec.hpTier)}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Filter all guides for {rec.hpTier}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
