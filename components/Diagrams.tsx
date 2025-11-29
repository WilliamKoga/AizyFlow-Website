
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MessageCircle, Database, Zap, ArrowRight, Mail, Calendar, Layout } from 'lucide-react';

// --- WORKFLOW DIAGRAM ---
export const WorkflowDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
      { id: 0, icon: <Layout size={20}/>, label: "Formulário / Site", color: "bg-slate-700" },
      { id: 1, icon: <Zap size={20}/>, label: "Automação", color: "bg-accent-blue" },
      { id: 2, icon: <MessageCircle size={20}/>, label: "Msg Automática", color: "bg-green-600" },
      { id: 3, icon: <Calendar size={20}/>, label: "Agendamento", color: "bg-accent-purple" },
  ];

  return (
    <div className="w-full flex items-center justify-center py-10">
        <div className="flex items-center gap-2 md:gap-4 bg-surface-primary/80 backdrop-blur border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl relative">
            
            {/* Animated Connection Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-white/5 -z-10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-transparent via-accent-cyan to-transparent w-1/3"
                    animate={{ x: ['-100%', '400%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center gap-3 relative z-10">
                        <div 
                            className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500 ${step.color} ${activeStep === index ? 'scale-110 ring-2 ring-white/50 brightness-125' : 'opacity-80 grayscale'}`}
                        >
                            {step.icon}
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${activeStep === index ? 'text-white' : 'text-slate-600'}`}>{step.label}</span>
                    </div>
                    
                    {index < steps.length - 1 && (
                        <ArrowRight size={20} className="text-slate-600 hidden sm:block" />
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
  );
};

// --- GROWTH CHART ---
export const GrowthChart: React.FC = () => {
    return (
        <div className="glass-card p-6 md:p-8 rounded-3xl w-full h-full flex flex-col justify-center">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h3 className="text-lg font-bold text-white">Performance</h3>
                    <p className="text-sm text-slate-400">Eficiência de Agendamentos</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-accent-cyan">+320%</div>
                    <div className="text-xs text-slate-500 uppercase">Conversão</div>
                </div>
            </div>

            <div className="relative h-48 flex items-end justify-between gap-4">
                 {/* Grid */}
                 <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-white"></div>
                   <div className="w-full h-[1px] bg-white"></div>
                   <div className="w-full h-[1px] bg-white"></div>
                 </div>

                 {/* Bars - Before */}
                 <div className="w-full bg-slate-800/50 rounded-t-lg h-[30%] relative group">
                    <div className="absolute -top-8 w-full text-center text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">Manual</div>
                 </div>
                 
                 {/* Bars - After (Growing) */}
                 <motion.div 
                    className="w-full bg-accent-blue/30 rounded-t-lg h-[45%]"
                    initial={{ height: '30%' }}
                    animate={{ height: '45%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                 />
                 <motion.div 
                    className="w-full bg-accent-blue/60 rounded-t-lg h-[60%]"
                    initial={{ height: '30%' }}
                    animate={{ height: '60%' }}
                    transition={{ duration: 1, delay: 0.7 }}
                 />
                 <motion.div 
                    className="w-full bg-accent-blue rounded-t-lg h-[85%] relative shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    initial={{ height: '30%' }}
                    animate={{ height: '85%' }}
                    transition={{ duration: 1, delay: 0.9 }}
                 >
                     <div className="absolute -top-8 w-full text-center text-xs text-white font-bold bg-accent-blue/20 rounded py-1">AizyFlow</div>
                 </motion.div>
            </div>
            
            <div className="flex justify-between mt-4 text-xs text-slate-500 font-medium">
                <span>Sem Automação</span>
                <span>Com AizyFlow</span>
            </div>
        </div>
    )
}
