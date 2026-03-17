'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

type Message = { id: string; role: 'bot' | 'user'; text: string; time: string };

const now = () => {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
};

type Flow = 'idle' | 'viewed' | 'reserve_choose' | 'reserved' | 'cancel_choose' | 'cancelled';

const CLASES = [
  { id: 'martes1730', label: 'Martes 17:30', day: 'Martes 17', time: '17:30' },
  { id: 'jueves1000', label: 'Jueves 10:00', day: 'Jueves 19', time: '10:00' },
] as const;

type Props = { panelLabel?: string };

export default function InteractiveDemo({ panelLabel = 'Así se actualiza el panel del estudio:' }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'bot', text: '¡Hola! ¿En qué te puedo ayudar?', time: '11:37' },
  ]);
  const [flow, setFlow] = useState<Flow>('idle');
  const [platform, setPlatform] = useState({
    martes1730: 17,
    jueves1000: 25,
    tempMartes: 1,
    tempJueves: 2,
  });
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const addBot = useCallback((text: string) => {
    setMessages((m) => [...m, { id: `b-${Date.now()}`, role: 'bot', text, time: now() }]);
  }, []);

  const addUser = useCallback((text: string) => {
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text, time: now() }]);
  }, []);

  const handleChip = (action: string) => {
    if (action === 'Ver mis clases') {
      addUser('Ver mis clases');
      setFlow('viewed');
      setTimeout(() => {
        addBot('Tus próximas clases:\n• Martes 17:30 - Yoga\n• Jueves 10:00 - Yoga\n\n¿Querés reservar o cancelar alguna?');
      }, 600);
      return;
    }
    if (action === 'Reservar') {
      addUser('Reservar');
      setFlow('reserve_choose');
      setTimeout(() => addBot('¿Qué clase querés reservar?'), 500);
      return;
    }
    if (action === 'Cancelar') {
      addUser('Cancelar');
      setFlow('cancel_choose');
      setTimeout(() => addBot('¿Cuál clase querés cancelar?'), 500);
      return;
    }
    // action is a class label e.g. "Martes 17:30" or "Jueves 10:00"
    const clase = CLASES.find((c) => c.label === action);
    if (!clase) return;
    if (flow === 'reserve_choose') {
      addUser(action);
      setFlow('reserved');
      const key = clase.id === 'martes1730' ? 'tempMartes' : 'tempJueves';
      setPlatform((p) => ({
        ...p,
        [clase.id]: p[clase.id] + 1,
        [key]: p[key] + 1,
      }));
      setTimeout(() => {
        addBot(`Listo ✓ Quedaste anotado para Yoga el ${clase.label}. Te esperamos.`);
      }, 500);
    }
    if (flow === 'cancel_choose') {
      addUser(action);
      setFlow('cancelled');
      const key = clase.id === 'martes1730' ? 'tempMartes' : 'tempJueves';
      setPlatform((p) => ({
        ...p,
        [clase.id]: Math.max(0, p[clase.id] - 1),
        [key]: Math.max(0, p[key] - 1),
      }));
      setTimeout(() => {
        addBot(`Cancelación confirmada para el ${clase.label}. Si querés, podés reservar otra fecha.`);
      }, 500);
    }
  };

  const resetDemo = () => {
    setMessages([{ id: '0', role: 'bot', text: '¡Hola! ¿En qué te puedo ayudar?', time: '11:37' }]);
    setFlow('idle');
    setPlatform({ martes1730: 17, jueves1000: 25, tempMartes: 1, tempJueves: 2 });
  };

  const chips =
    flow === 'idle' || flow === 'viewed'
      ? ['Ver mis clases', 'Reservar', 'Cancelar']
      : flow === 'reserve_choose' || flow === 'cancel_choose'
        ? CLASES.map((c) => c.label)
        : ['Ver mis clases', 'Reservar', 'Cancelar'];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
      {/* Chat WhatsApp */}
      <div className="w-full max-w-[360px] shrink-0">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-sky-500/10 ring-1 ring-black/20">
          <div className="flex items-center justify-between border-b border-white/5 bg-zinc-800/90 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/90" />
              <div className="h-3 w-3 rounded-full bg-amber-500/90" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/90" />
            </div>
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-lg px-2 py-1 text-xs text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              Reiniciar
            </button>
          </div>
          <div className="chat-wa-bg flex min-h-[420px] max-h-[480px] flex-col px-3 pb-3 pt-2">
            <div className="chat-wa-header -mx-3 mb-3 flex items-center gap-3 px-4 py-2.5">
              <div className="h-9 w-9 flex-shrink-0 rounded-full bg-emerald-600/80" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">Tu estudio</p>
                <p className="text-xs text-emerald-400/90">en línea</p>
              </div>
            </div>
            <div ref={chatScrollRef} className="flex-1 space-y-2 overflow-y-auto">
              {messages.map((msg) =>
                msg.role === 'bot' ? (
                  <div key={msg.id} className="flex justify-start">
                    <div className="max-w-[85%] chat-wa-received px-3 py-2">
                      <p className="whitespace-pre-line text-sm text-white">{msg.text}</p>
                      <span className="mt-1 block text-right text-[10px] text-emerald-200/70">{msg.time}</span>
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[85%] chat-wa-sent px-3 py-2">
                      <p className="text-sm text-zinc-100">{msg.text}</p>
                      <span className="mt-1 block text-right text-[10px] text-zinc-400">{msg.time}</span>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleChip(label)}
                  className="chat-wa-reply-chip px-3 py-2 text-left text-xs text-zinc-200 transition hover:bg-[#3d4f5c] hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-2xl chat-wa-input px-4 py-2.5 focus-within:ring-2 focus-within:ring-emerald-500/50">
              <input
                ref={inputRef}
                type="text"
                placeholder="Escribe un mensaje"
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-zinc-100 caret-emerald-400 placeholder:text-zinc-500 focus:outline-none focus:ring-0"
                aria-label="Escribe un mensaje"
                autoFocus
              />
              <button
                type="button"
                className="flex flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 p-1.5 transition hover:bg-emerald-500"
                aria-label="Enviar"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel plataforma (se actualiza al reservar/cancelar) */}
      <div className="w-full max-w-md">
        <p className="mb-3 text-sm font-medium text-zinc-400">{panelLabel}</p>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
          <div className="border-b border-white/10 bg-violet-900/20 px-4 py-3">
            <p className="text-sm font-medium text-white">Calendario · Próximos 30 días</p>
            <p className="mt-0.5 text-xs text-zinc-400">Inscriptos por clase (se actualiza en vivo)</p>
          </div>
          <div className="space-y-4 p-4">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <p className="text-sm font-medium text-white">Martes 17 de marzo · Semana 12</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <span className="text-zinc-300">Yoga 17:30</span>
                  <span className="ml-2 text-zinc-500">· {platform.martes1730} inscriptos</span>
                  <span className="ml-2 font-medium text-emerald-400">
                    {platform.tempMartes} temporal{platform.tempMartes !== 1 ? 'es' : ''}
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <p className="text-sm font-medium text-white">Jueves 19 de marzo · Semana 12</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <span className="text-zinc-300">Yoga 10:00</span>
                  <span className="ml-2 text-zinc-500">· {platform.jueves1000} inscriptos</span>
                  <span className="ml-2 font-medium text-emerald-400">
                    {platform.tempJueves} temporal{platform.tempJueves !== 1 ? 'es' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
