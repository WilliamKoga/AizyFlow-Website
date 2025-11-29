
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { HeroScene, NetworkScene } from './components/QuantumScene';
import { WorkflowDiagram, GrowthChart } from './components/Diagrams';
import { Menu, X, ArrowRight, Zap, MessageSquare, BarChart2, Check, Smartphone, Globe, Calendar, Users, Layout, Mail, Share2 } from 'lucide-react';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-page text-slate-300 overflow-x-hidden selection:bg-accent-blue selection:text-white font-sans">
      
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <nav className="glass-nav border border-white/10 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-6xl shadow-2xl">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-white font-bold text-lg">A</div>
                <span className="text-white font-semibold tracking-tight text-lg">AizyFlow</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="#home" className="text-white hover:text-accent-blue transition-colors">Início</a>
                <a href="#features" className="hover:text-white transition-colors">Recursos</a>
                <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
                <a href="#contact" className="hover:text-white transition-colors">Contato</a>
            </div>

            <div className="flex items-center gap-4">
                <a href="#" className="hidden sm:block text-sm hover:text-white transition-colors font-medium">Login</a>
                <a 
                  href="https://calendly.com/seu-link-de-agendamento" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:scale-105 hover:shadow-glow transition-all duration-300"
                >
                  Agendar Demo
                </a>
                <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
        </nav>
      </div>

       {/* Mobile Menu */}
       {menuOpen && (
        <div className="fixed inset-0 z-40 bg-page/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-xl animate-fade-in">
            <a href="#home" onClick={() => setMenuOpen(false)} className="text-white">Início</a>
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-white">Recursos</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-white">Planos</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-white">Contato</a>
        </div>
      )}

      {/* Hero Section */}
      <header id="home" className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
        <HeroScene />
        <div className="absolute top-0 left-0 right-0 h-[800px] bg-hero-glow -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-7xl text-center relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-accent-cyan animate-pulse"></span>
                <span className="text-xs font-medium text-accent-cyan tracking-wide uppercase">Plataforma All-in-One</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto">
                Centralize, Automatize e <br/>
                <span className="text-gradient">Venda Mais</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Unifique conversas do WhatsApp, Instagram e E-mail. Crie workflows para agendar consultas, enviar mensagens e criar sites sem digitar uma linha de código.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <a href="https://calendly.com/seu-link-de-agendamento" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
                    Agendar Demo Gratuita
                    <ArrowRight size={16} />
                </a>
                <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-medium transition-all duration-300 backdrop-blur-sm">
                    Conhecer Recursos
                </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-12">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-page flex items-center justify-center overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-page flex items-center justify-center overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="User" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-page flex items-center justify-center overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jude" alt="User" />
                    </div>
                </div>
                <span>+500 empresas escalando operações</span>
            </div>

            {/* Dashboard / Vis Container */}
            <div className="relative mx-auto max-w-5xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative rounded-[1.5rem] overflow-hidden border border-white/10 bg-surface-primary shadow-2xl h-[400px] md:h-[500px] flex items-center justify-center">
                    <NetworkScene />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-surface-primary/80 to-transparent"></div>
                    
                    <div className="absolute bottom-8 right-8 p-4 glass-card rounded-2xl animate-bounce-slow hidden md:block">
                        <div className="text-xs text-slate-400 mb-1">Novos Agendamentos</div>
                        <div className="text-2xl font-bold text-white">+45%</div>
                        <div className="text-[10px] text-accent-cyan">Esta semana</div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl px-4">
                         <WorkflowDiagram />
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* Intro Stats */}
      <section className="border-y border-white/5 bg-surface-primary/50 py-10">
        <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-slate-500 mb-8 uppercase tracking-wider">Tudo integrado em um só lugar</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-xl font-bold text-white flex items-center gap-2"><Smartphone size={20}/> WhatsApp</span>
                <span className="text-xl font-bold text-white flex items-center gap-2"><Mail size={20}/> E-mail</span>
                <span className="text-xl font-bold text-white flex items-center gap-2"><Calendar size={20}/> Agendamentos</span>
                <span className="text-xl font-bold text-white flex items-center gap-2"><Zap size={20}/> Automação</span>
            </div>
        </div>
      </section>

      {/* Value Props - 3 Pillars */}
      <section id="features" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Todos os Recursos em <br/>3 Poderosos Pilares</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Substitua dezenas de ferramentas caras por uma única plataforma integrada e eficiente.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Pillar 1 */}
                <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
                    <div className="w-14 h-14 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-6 text-accent-blue border border-accent-blue/20">
                        <Users size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">CRM & Vendas Previsíveis</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        Controle total da jornada do cliente. Do primeiro contato ao contrato assinado, tudo em um só lugar.
                    </p>
                    <ul className="space-y-3">
                        {[
                            "Lista de Contatos Inteligente (Tags, Filtros)",
                            "Pipeline de Leads Ilimitado e Personalizável",
                            "Pagamentos (Checkout, Assinaturas)",
                            "Contratos Ilimitados com Assinatura Digital",
                            "Calendários e Agendamentos",
                            "Portal de Clientes (Área de Membros)"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <Check size={16} className="text-accent-blue mt-0.5 min-w-[16px]" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pillar 2 */}
                <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group bg-surface-secondary/50 border-accent-cyan/20">
                    <div className="w-14 h-14 bg-accent-cyan/10 rounded-2xl flex items-center justify-center mb-6 text-accent-cyan border border-accent-cyan/20">
                        <Layout size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Marketing & Conteúdo</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        Construa sua presença online e nutra leads com ferramentas que integram sites, e-mail e mídias sociais.
                    </p>
                    <ul className="space-y-3">
                        {[
                            "Email Marketing Ilimitado (Workflows)",
                            "Planejador de Mídias Sociais (Insta, TikTok)",
                            "Landing Pages e Funis Ilimitados",
                            "Sites Institucionais e Blogs",
                            "Formulários e Pesquisas",
                            "Webinários e Cursos Online"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <Check size={16} className="text-accent-cyan mt-0.5 min-w-[16px]" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pillar 3 */}
                <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
                    <div className="w-14 h-14 bg-accent-purple/10 rounded-2xl flex items-center justify-center mb-6 text-accent-purple border border-accent-purple/20">
                        <Zap size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Automação & Infraestrutura</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        Sua operação funcionando em piloto automático com zero fricção e dados sempre atualizados.
                    </p>
                    <ul className="space-y-3">
                        {[
                            "Automações Ilimitadas (Gatilhos)",
                            "Conversas Unificadas (Zap, Insta, Email)",
                            "Relatórios Avançados de Vendas",
                            "Integrações Nativas (Stripe, Shopify)",
                            "Usuários Ilimitados",
                            "APP para Celular (iOS e Android)"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <Check size={16} className="text-accent-purple mt-0.5 min-w-[16px]" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
      </section>

      {/* Feature Split Section */}
      <section className="py-24 md:py-32 bg-surface-secondary/30 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl space-y-24">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 mb-6">
                        <span className="text-xs font-bold text-accent-blue tracking-wide uppercase">Crescimento Acelerado</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">Resultados que você pode medir</h3>
                    <p className="text-slate-400 leading-relaxed mb-8">
                        Ao unificar o atendimento e automatizar o follow-up de leads, nossos clientes veem um aumento drástico na taxa de conversão e uma redução no tempo de resposta.
                    </p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-surface-secondary border border-white/10 flex items-center justify-center mt-0.5 text-accent-blue text-xs">✓</div>
                            <span className="text-slate-300 text-sm">Follow-up automático e instantâneo</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-surface-secondary border border-white/10 flex items-center justify-center mt-0.5 text-accent-blue text-xs">✓</div>
                            <span className="text-slate-300 text-sm">Menos tempo gasto em tarefas manuais</span>
                        </li>
                    </ul>
                </div>
                <div className="order-1 lg:order-2 h-64 lg:h-auto">
                    <GrowthChart />
                </div>
            </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Planos Flexíveis</h2>
                <p className="text-slate-400">Tudo o que você precisa para escalar, com preços transparentes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Plan 1 */}
                <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col hover:border-white/30 transition-colors">
                    <div className="mb-4">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Essencial</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-white">¥19,800</span>
                        <span className="text-slate-500">/mês</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-8">Para quem está começando a organizar a operação.</p>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <Check size={16} className="text-accent-blue" /> CRM Completo
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <Check size={16} className="text-accent-blue" /> Calendário de Agendamento
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <Check size={16} className="text-accent-blue" /> Funil de Vendas Ilimitado
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <Check size={16} className="text-accent-blue" /> Email Marketing Básico
                        </li>
                    </ul>

                    <a href="https://calendly.com/seu-link-de-agendamento" target="_blank" rel="noopener noreferrer" className="w-full py-3 flex items-center justify-center rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all">
                        Agendar Demo
                    </a>
                </div>

                {/* Plan 2 - Highlighted */}
                <div className="relative p-8 rounded-3xl bg-surface-secondary border border-accent-blue/30 flex flex-col shadow-glow transform md:-translate-y-4">
                    <div className="absolute top-0 right-0 bg-accent-blue text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                        MAIS POPULAR
                    </div>
                    <div className="mb-4">
                        <span className="text-sm font-bold text-accent-blue uppercase tracking-wider">Growth</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-white">¥29,800</span>
                        <span className="text-slate-500">/mês</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-8">Automação completa para empresas em crescimento.</p>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-sm text-white">
                            <Check size={16} className="text-accent-cyan" /> Tudo do Essencial
                        </li>
                        <li className="flex items-center gap-3 text-sm text-white">
                            <Check size={16} className="text-accent-cyan" /> Workflows de Automação
                        </li>
                        <li className="flex items-center gap-3 text-sm text-white">
                            <Check size={16} className="text-accent-cyan" /> Websites e Landing Pages
                        </li>
                        <li className="flex items-center gap-3 text-sm text-white">
                            <Check size={16} className="text-accent-cyan" /> Planejador de Social Media
                        </li>
                        <li className="flex items-center gap-3 text-sm text-white">
                            <Check size={16} className="text-accent-cyan" /> Usuários Ilimitados
                        </li>
                    </ul>

                    <a href="https://calendly.com/seu-link-de-agendamento" target="_blank" rel="noopener noreferrer" className="w-full py-3 flex items-center justify-center rounded-full bg-accent-blue text-white font-bold hover:bg-accent-blue/90 transition-all shadow-lg shadow-accent-blue/25">
                        Agendar Demo (30min)
                    </a>
                </div>

                 {/* Plan 3 */}
                 <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col hover:border-white/30 transition-colors">
                    <div className="mb-4">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Scale</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-white">¥49,800</span>
                        <span className="text-slate-500">/mês</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-8">Para operações que precisam de escala máxima e e-commerce.</p>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <Check size={16} className="text-accent-blue" /> Tudo do Growth
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <Check size={16} className="text-accent-blue" /> Área de Membros / Cursos
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <Check size={16} className="text-accent-blue" /> Integração com Shopify
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-300">
                            <Check size={16} className="text-accent-blue" /> Gerente de Conta Dedicado
                        </li>
                    </ul>

                    <a href="https://calendly.com/seu-link-de-agendamento" target="_blank" rel="noopener noreferrer" className="w-full py-3 flex items-center justify-center rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all">
                        Agendar Demo
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-surface-primary pt-20 pb-10">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-white font-bold text-xs pb-0.5">A</div>
                        <span className="text-white font-bold text-lg">AizyFlow</span>
                    </div>
                    <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                        A plataforma definitiva para unificar vendas, marketing e atendimento.
                    </p>
                </div>
                
                <div>
                    <h4 className="text-white font-semibold mb-6">Plataforma</h4>
                    <ul className="space-y-4 text-sm text-slate-500">
                        <li><a href="#" className="hover:text-accent-blue transition-colors">CRM & Vendas</a></li>
                        <li><a href="#" className="hover:text-accent-blue transition-colors">Marketing</a></li>
                        <li><a href="#" className="hover:text-accent-blue transition-colors">Automação</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Empresa</h4>
                    <ul className="space-y-4 text-sm text-slate-500">
                        <li><a href="#" className="hover:text-accent-blue transition-colors">Sobre Nós</a></li>
                        <li><a href="#" className="hover:text-accent-blue transition-colors">Contato</a></li>
                        <li><a href="#" className="hover:text-accent-blue transition-colors">Termos de Uso</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-600">© 2024 AizyFlow. Todos os direitos reservados.</p>
                <div className="text-xs text-slate-600 flex gap-4">
                    <span>Feito para escalar o seu negócio.</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
