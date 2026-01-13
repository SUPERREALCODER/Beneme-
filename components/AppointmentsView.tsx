
import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Home, 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  User,
  Timer
} from 'lucide-react';

const AppointmentsView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<'clinic' | 'home' | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dateOffset, setDateOffset] = useState(0);

  // Dynamically generate dates based on offset
  const visibleDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + dateOffset + i);
      dates.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate().toString(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        full: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
    }
    return dates;
  }, [dateOffset]);

  const durations = [
    { label: '30 Minutes', value: 30, desc: 'Quick Calibration' },
    { label: '60 Minutes', value: 60, desc: 'Standard Session' },
    { label: '90 Minutes', value: 90, desc: 'Deep Immersion' }
  ];

  const times = [
    '09:00 AM', '10:00 AM', '11:30 AM', 
    '01:00 PM', '02:30 PM', '04:00 PM', 
    '05:30 PM', '07:00 PM'
  ];

  const handleNextDates = () => setDateOffset(prev => prev + 5);
  const handlePrevDates = () => setDateOffset(prev => Math.max(0, prev - 5));

  return (
    <div className="p-4 md:p-8 h-full flex flex-col max-w-5xl mx-auto w-full">
      <header className="mb-10">
        <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-[#003153] mb-2">Professional Care</h2>
        <p className="text-gray-500">Book your next deep-sync session with our specialists.</p>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-8">
        {/* Booking Process */}
        <div className="flex-1 bg-white rounded-[3rem] border border-gray-100 shadow-xl p-6 md:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-quicksand font-bold text-[#003153]">Where would you like to practice?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => { setServiceType('clinic'); setStep(2); }}
                  className="p-8 rounded-[2.5rem] border-2 border-gray-50 hover:border-[#B2AC88] hover:bg-[#B2AC88]/5 transition-all text-left group"
                >
                  <div className="w-16 h-16 bg-[#B2AC88]/20 rounded-2xl flex items-center justify-center text-[#B2AC88] mb-6 group-hover:scale-110 transition-transform">
                    <Building2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-[#003153]">In-Clinic Session</h4>
                  <p className="text-sm text-gray-400 mb-6">Full neuro-immersion suite at our flagship location.</p>
                  <div className="flex items-center gap-2 text-[#B2AC88] font-bold text-sm">
                    Select <ChevronRight size={16} />
                  </div>
                </button>

                <button 
                  onClick={() => { setServiceType('home'); setStep(2); }}
                  className="p-8 rounded-[2.5rem] border-2 border-gray-50 hover:border-[#003153] hover:bg-[#003153]/5 transition-all text-left group"
                >
                  <div className="w-16 h-16 bg-[#003153]/10 rounded-2xl flex items-center justify-center text-[#003153] mb-6 group-hover:scale-110 transition-transform">
                    <Home size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-[#003153]">Home Service</h4>
                  <p className="text-sm text-gray-400 mb-6">Our specialists bring the calibration technology to you.</p>
                  <div className="flex items-center gap-2 text-[#003153] font-bold text-sm">
                    Select <ChevronRight size={16} />
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-[#003153] transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <h3 className="text-2xl font-quicksand font-bold text-[#003153]">Session Timing</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {durations.map((d) => (
                  <button 
                    key={d.value}
                    onClick={() => { setSelectedDuration(d.value); setStep(3); }}
                    className={`flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all group ${
                      selectedDuration === d.value 
                      ? 'border-[#B2AC88] bg-[#B2AC88]/5' 
                      : 'border-gray-50 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        selectedDuration === d.value ? 'bg-[#B2AC88] text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Timer size={24} />
                      </div>
                      <div className="text-left">
                        <p className={`font-bold text-lg ${selectedDuration === d.value ? 'text-[#003153]' : 'text-gray-500'}`}>
                          {d.label}
                        </p>
                        <p className="text-xs text-gray-400 font-medium">{d.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className={selectedDuration === d.value ? 'text-[#B2AC88]' : 'text-gray-300'} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <button onClick={() => setStep(2)} className="text-gray-400 hover:text-[#003153] transition-colors">
                    <ChevronLeft size={24} />
                  </button>
                  <div>
                    <h3 className="text-2xl font-quicksand font-bold text-[#003153]">Select Time</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#B2AC88]">
                      {serviceType === 'clinic' ? 'Clinic' : 'Home'} • {selectedDuration} Minutes
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Date Selection with Arrows */}
                <div>
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span className="text-sm font-bold text-[#003153]">Date</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={handlePrevDates}
                        disabled={dateOffset === 0}
                        className={`p-1.5 rounded-full border border-gray-100 transition-all ${dateOffset === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button 
                        onClick={handleNextDates}
                        className="p-1.5 rounded-full border border-gray-100 hover:bg-gray-50 transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3 overflow-hidden pb-2">
                    {visibleDates.map((d) => (
                      <button 
                        key={d.full}
                        onClick={() => setSelectedDate(d.full)}
                        className={`flex-1 min-w-[70px] h-24 rounded-[1.5rem] flex flex-col items-center justify-center transition-all ${
                          selectedDate === d.full 
                          ? 'bg-[#B2AC88] text-white shadow-lg transform scale-105' 
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-[9px] font-bold uppercase tracking-widest mb-1">{d.day}</span>
                        <span className="text-xl font-bold">{d.date}</span>
                        <span className="text-[9px] font-medium opacity-80">{d.month}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <span className="text-sm font-bold text-[#003153] block mb-4 px-1">Times</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {times.map((t) => (
                      <button 
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-4 rounded-2xl border transition-all text-xs font-bold ${
                          selectedTime === t
                          ? 'bg-[#003153] text-white border-transparent shadow-md'
                          : 'border-gray-100 text-[#003153] hover:bg-gray-50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(4)}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-5 rounded-full font-bold shadow-xl transition-all mt-6 ${
                  selectedDate && selectedTime
                  ? 'bg-[#003153] text-white hover:scale-[1.02]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Appointment
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
               <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8">
                 <CheckCircle2 size={48} />
               </div>
               <h3 className="text-3xl font-quicksand font-bold text-[#003153] mb-4">Success!</h3>
               <div className="bg-gray-50 p-6 rounded-[2rem] w-full max-w-sm mb-10 text-left space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Service</span>
                    <span className="text-sm font-bold text-[#003153]">{serviceType === 'clinic' ? 'In-Clinic' : 'Home Visit'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Duration</span>
                    <span className="text-sm font-bold text-[#003153]">{selectedDuration} Minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Date</span>
                    <span className="text-sm font-bold text-[#003153]">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Time</span>
                    <span className="text-sm font-bold text-[#003153]">{selectedTime}</span>
                  </div>
               </div>
               <button 
                onClick={() => { setStep(1); setServiceType(null); setSelectedDuration(null); setSelectedDate(null); setSelectedTime(null); setDateOffset(0); }}
                className="px-10 py-4 border-2 border-[#003153] text-[#003153] rounded-full font-bold hover:bg-[#003153] hover:text-white transition-all shadow-sm"
               >
                 Back to Dashboard
               </button>
            </div>
          )}
        </div>

        {/* Sidebar Info - Specialist Details */}
        <div className="w-full md:w-80 flex flex-col gap-6">
          <div className="bg-[#B2AC88]/10 p-8 rounded-[2.5rem] border border-[#B2AC88]/20 shadow-sm">
            <h4 className="font-quicksand font-bold mb-6 text-[#003153] flex items-center gap-2">
              <User size={18} className="text-[#B2AC88]" /> Your Specialist
            </h4>
            <div className="flex items-center gap-4 mb-8">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#B2AC88] shadow-md">
                 <User size={28} />
               </div>
               <div>
                 <p className="font-bold text-lg text-[#003153]">Arijit Das</p>
               </div>
            </div>
            
            <div className="space-y-5">
               <div className="flex items-start gap-3">
                 <MapPin size={16} className="text-[#B2AC88] mt-0.5 flex-shrink-0" />
                 <div>
                   <p className="text-xs font-bold text-[#003153]">Popular Clinic</p>
                   <p className="text-[11px] text-gray-500">Railpukur Road</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Clock size={16} className="text-[#B2AC88] mt-0.5 flex-shrink-0" />
                 <p className="text-xs font-bold text-[#003153]">Mon — Fri, 09:00 — 19:00</p>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#B2AC88]/20">
               <div className="bg-white/50 p-4 rounded-2xl">
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Clinic Policy</p>
                 <p className="text-[11px] text-gray-500 leading-relaxed">
                   Free cancellation up to 24 hours before your session begins.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsView;
