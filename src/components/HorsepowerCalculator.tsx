import { useState, useId } from 'react';
import { Calculator, Gauge, Zap, Wind, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';

interface CalculatorProps {
  onSelectArticle: (slug: string) => void;
}

export function HorsepowerCalculator({ onSelectArticle }: CalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [bikeWeight, setBikeWeight] = useState<number>(410); // lbs
  const [riderWeight, setRiderWeight] = useState<number>(175); // lbs
  const [horsepower, setHorsepower] = useState<number>(75); // HP
  const [bikeStyle, setBikeStyle] = useState<'supersport' | 'sport-tourer' | 'naked' | 'cruiser'>('naked');

  // Input IDs for accessibility
  const bikeWeightId = useId();
  const riderWeightId = useId();
  const horsepowerId = useId();

  // Unit conversions
  const totalWeightLbs = unitSystem === 'imperial'
    ? bikeWeight + riderWeight
    : (bikeWeight + riderWeight) * 2.20462;

  const totalWeightKg = totalWeightLbs / 2.20462;

  // Drag Coefficients (CdA in m²)
  const cdaMap = {
    supersport: 0.32,
    'sport-tourer': 0.38,
    naked: 0.44,
    cruiser: 0.52,
  };

  const cda = cdaMap[bikeStyle];

  // Power to weight
  // HP per ton (US ton = 2000 lbs)
  const hpPerTon = Math.round((horsepower / (totalWeightLbs / 2000)));
  const hpPerLb = (horsepower / totalWeightLbs).toFixed(3);
  const hpPerKg = (horsepower / totalWeightKg).toFixed(3);

  // Theoretical Top Speed Calculation based on aerodynamic equilibrium:
  // P_aero (Watts) = 0.5 * rho * CdA * v^3
  // 1 HP = 745.7 W, rho = 1.225 kg/m^3
  // Drivetrain efficiency ~ 0.88
  const effHp = horsepower * 0.88 * 745.7;
  const vMps = Math.pow((2 * effHp) / (1.225 * cda), 1 / 3);
  const topSpeedMph = Math.round(vMps * 2.23694);
  const topSpeedKmh = Math.round(vMps * 3.6);

  // Estimated 0-60 mph based on power-to-weight and traction limits
  // In motorcycles, sub-3.0s is limited by wheelie physics
  let estimated0to60 = 0;
  const hpRatio = horsepower / totalWeightLbs;
  if (hpRatio >= 0.30) {
    estimated0to60 = 2.8; // Physics traction/wheelie limit
  } else if (hpRatio >= 0.22) {
    estimated0to60 = 3.1;
  } else if (hpRatio >= 0.16) {
    estimated0to60 = 3.6;
  } else if (hpRatio >= 0.11) {
    estimated0to60 = 4.4;
  } else if (hpRatio >= 0.08) {
    estimated0to60 = 5.4;
  } else if (hpRatio >= 0.05) {
    estimated0to60 = 7.8;
  } else {
    estimated0to60 = 11.5;
  }

  // Estimated 1/4 Mile
  const quarterMileTime = (Math.pow(totalWeightLbs / horsepower, 1 / 3) * 5.8).toFixed(1);

  // Safety & Tier recommendation
  let tierLabel = '';
  let skillRecommendation = '';
  if (horsepower < 40) {
    tierLabel = 'Beginner / Urban Commuter Tier';
    skillRecommendation = 'Extremely forgiving throttle. Ideal for new riders, clutch mastery, and low-stress city commuting.';
  } else if (horsepower <= 75) {
    tierLabel = 'Accessible Sport / Middleweight Sweet Spot';
    skillRecommendation = 'Brilliant balance of real-world punch and safety. Fast passing power without terrifying power wheelies.';
  } else if (horsepower <= 125) {
    tierLabel = 'High-Performance Middleweight / Track Capable';
    skillRecommendation = 'Very fast. Requires disciplined throttle control, smooth brake trail, and mature judgement.';
  } else if (horsepower <= 175) {
    tierLabel = 'Heavyweight Muscle / Super-Tourer';
    skillRecommendation = 'Demanding. Electronic traction control and multi-stage IMU mandatory for safe street operation.';
  } else {
    tierLabel = 'Aerospace Superbike / Hyper-Performance';
    skillRecommendation = 'Track day weapon. Surpasses modern Formula 1 power-to-weight ratios. Reserved for expert technicians.';
  }

  const handleReset = () => {
    setBikeWeight(410);
    setRiderWeight(175);
    setHorsepower(75);
    setBikeStyle('naked');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#0a1813] border border-emerald-900/80 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-950">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Telemetry Engineering Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Motorcycle Power-to-Weight & Speed Calculator
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Calculate true power-to-weight ratio, aerodynamic top speed limits, and 0-60 sprint times.
          </p>
        </div>

        {/* Unit Toggle & Reset */}
        <div className="flex items-center gap-3">
          <div className="flex bg-[#06110e] border border-emerald-950 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                unitSystem === 'imperial' ? 'bg-emerald-800 text-white' : 'text-stone-400 hover:text-white'
              }`}
            >
              Imperial (lbs/mph)
            </button>
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                unitSystem === 'metric' ? 'bg-emerald-800 text-white' : 'text-stone-400 hover:text-white'
              }`}
            >
              Metric (kg/km/h)
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-2 text-stone-400 hover:text-white hover:bg-emerald-950 rounded-lg transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Input Sliders & Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Engine Horsepower */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor={horsepowerId} className="font-semibold text-stone-300">Engine Crankshaft Horsepower (BHP)</label>
              <span className="font-mono text-emerald-400 text-base font-bold">{horsepower} HP</span>
            </div>
            <input
              id={horsepowerId}
              type="range"
              min="10"
              max="240"
              step="1"
              value={horsepower}
              onChange={(e) => setHorsepower(Number(e.target.value))}
              className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-stone-500 font-mono">
              <span>10 HP (Grom)</span>
              <span>75 HP (MT-07)</span>
              <span>240 HP (Panigale R)</span>
            </div>
          </div>

          {/* Motorcycle Curb Weight */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor={bikeWeightId} className="font-semibold text-stone-300">
                Motorcycle Curb Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})
              </label>
              <span className="font-mono text-stone-200 text-base font-bold">
                {bikeWeight} {unitSystem === 'imperial' ? 'lbs' : 'kg'}
              </span>
            </div>
            <input
              id={bikeWeightId}
              type="range"
              min={unitSystem === 'imperial' ? 240 : 110}
              max={unitSystem === 'imperial' ? 900 : 410}
              step="5"
              value={bikeWeight}
              onChange={(e) => setBikeWeight(Number(e.target.value))}
              className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-stone-500 font-mono">
              <span>{unitSystem === 'imperial' ? '300 lbs (Light)' : '136 kg'}</span>
              <span>{unitSystem === 'imperial' ? '420 lbs (Standard)' : '190 kg'}</span>
              <span>{unitSystem === 'imperial' ? '850 lbs (Tourer)' : '385 kg'}</span>
            </div>
          </div>

          {/* Rider & Gear Weight */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor={riderWeightId} className="font-semibold text-stone-300">
                Rider + Full Gear Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})
              </label>
              <span className="font-mono text-stone-200 text-base font-bold">
                {riderWeight} {unitSystem === 'imperial' ? 'lbs' : 'kg'}
              </span>
            </div>
            <input
              id={riderWeightId}
              type="range"
              min={unitSystem === 'imperial' ? 100 : 45}
              max={unitSystem === 'imperial' ? 350 : 160}
              step="5"
              value={riderWeight}
              onChange={(e) => setRiderWeight(Number(e.target.value))}
              className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Aerodynamic Category Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-300">
              Aerodynamic Form Factor & Riding Posture
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setBikeStyle('supersport')}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  bikeStyle === 'supersport'
                    ? 'bg-emerald-950 border-emerald-500 text-white font-semibold'
                    : 'bg-[#07130f] border-emerald-950 text-stone-400 hover:text-white'
                }`}
              >
                <div>Faired Superbike</div>
                <div className="text-[10px] text-stone-400 mt-0.5">CdA 0.32 · Racing Tuck</div>
              </button>

              <button
                type="button"
                onClick={() => setBikeStyle('sport-tourer')}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  bikeStyle === 'sport-tourer'
                    ? 'bg-emerald-950 border-emerald-500 text-white font-semibold'
                    : 'bg-[#07130f] border-emerald-950 text-stone-400 hover:text-white'
                }`}
              >
                <div>Sport Tourer</div>
                <div className="text-[10px] text-stone-400 mt-0.5">CdA 0.38 · Windscreen</div>
              </button>

              <button
                type="button"
                onClick={() => setBikeStyle('naked')}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  bikeStyle === 'naked'
                    ? 'bg-emerald-950 border-emerald-500 text-white font-semibold'
                    : 'bg-[#07130f] border-emerald-950 text-stone-400 hover:text-white'
                }`}
              >
                <div>Naked / Roadster</div>
                <div className="text-[10px] text-stone-400 mt-0.5">CdA 0.44 · Upright Chest</div>
              </button>

              <button
                type="button"
                onClick={() => setBikeStyle('cruiser')}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  bikeStyle === 'cruiser'
                    ? 'bg-emerald-950 border-emerald-500 text-white font-semibold'
                    : 'bg-[#07130f] border-emerald-950 text-stone-400 hover:text-white'
                }`}
              >
                <div>Cruiser / ADV</div>
                <div className="text-[10px] text-stone-400 mt-0.5">CdA 0.52 · Wide Profile</div>
              </button>
            </div>
          </div>
        </div>

        {/* Calculated Results Box */}
        <div className="p-6 rounded-xl bg-[#06120e] border border-emerald-900/60 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>Calculated Performance Telemetry</span>
            </div>

            {/* Big Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#081712] border border-emerald-950">
                <div className="text-xs text-stone-400">Power-to-Weight</div>
                <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-1">
                  {hpPerTon} <span className="text-xs font-normal text-stone-400">HP / ton</span>
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">{hpPerLb} HP/lb ({hpPerKg} HP/kg)</div>
              </div>

              <div className="p-4 rounded-lg bg-[#081712] border border-emerald-950">
                <div className="text-xs text-stone-400 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Est. Top Speed</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-white mt-1">
                  {unitSystem === 'imperial' ? `${topSpeedMph} mph` : `${topSpeedKmh} km/h`}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Aero limit at {cda} CdA</div>
              </div>

              <div className="p-4 rounded-lg bg-[#081712] border border-emerald-950">
                <div className="text-xs text-stone-400">0 - 60 MPH Sprint</div>
                <div className="text-xl font-extrabold font-mono text-stone-200 mt-1">
                  ~{estimated0to60}s
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Traction & wheelie limit</div>
              </div>

              <div className="p-4 rounded-lg bg-[#081712] border border-emerald-950">
                <div className="text-xs text-stone-400">Est. 1/4 Mile Time</div>
                <div className="text-xl font-extrabold font-mono text-stone-200 mt-1">
                  ~{quarterMileTime}s
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Standing quarter sprint</div>
              </div>
            </div>

            {/* Assessment Box */}
            <div className="p-4 rounded-lg bg-[#081813] border border-emerald-800/60 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400">{tierLabel}</div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {skillRecommendation}
              </p>
            </div>
          </div>

          {/* Jump to Deep-Dive Article */}
          <div className="pt-2">
            <button
              onClick={() => onSelectArticle('does-higher-horsepower-mean-faster-bike')}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Read Full Guide: Does Higher HP Mean Faster?</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
