import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Settings, Mail, Clock, Calendar, Zap, RefreshCw, Download } from 'lucide-react';
import { motion } from 'framer-motion';

import conception from '../data/conception';
import developpement from '../data/developpement';
import infrastructure from '../data/infrastructure';
import deploiement from '../data/deploiement';
import maintenance from '../data/maintenance';

const emailScenarios = { conception, developpement, infrastructure, deploiement, maintenance };


const ProjectLifecycleSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentPhase, setCurrentPhase] = useState('conception');
  const [emails, setEmails] = useState([]);
  const [showConfig, setShowConfig] = useState(true);
  const timerRef = useRef(null);

  const [config, setConfig] = useState({
    emailFrequency: 2,
    speedMultiplier: 5,
    clientName: 'Sophie Martin',
    providerName: 'DevPro Solutions',
    projectName: 'Plateforme E-Commerce BioMarket'
  });


  const phasesDurations = {
    conception: 15,
    developpement: 45,
    infrastructure: 20,
    deploiement: 10,
    maintenance: 30
  };

  const phaseLabels = {
    conception: '🎨 Conception',
    developpement: '💻 Développement',
    infrastructure: '☁️ Infrastructure',
    deploiement: '🚀 Déploiement',
    maintenance: '🔧 Maintenance'
  };

  // ---------- Core Simulation Logic ----------
  useEffect(() => {
    if (!isRunning) return;

    const dayDuration = 8000 / config.speedMultiplier; // 8s par jour
    const allEmails = emailScenarios[currentPhase] || [];
    const todayEmails = allEmails.filter(e => e.day === currentDay);

    // Planifie les emails du jour
    todayEmails.forEach((email, i) => {
      const delay = (i + 1) * (dayDuration / (todayEmails.length + 1));
      setTimeout(() => sendEmail(email), delay);
    });

    // Passe au jour suivant
    timerRef.current = setTimeout(() => {
      moveToNextDay();
    }, dayDuration);

    return () => clearTimeout(timerRef.current);
  }, [isRunning, currentDay, currentPhase]);

  const sendEmail = (template) => {
    const filled = {
      ...template,
      id: `${currentPhase}-${template.day}-${template.time}`,
      subject: template.subject
        .replace(/{clientName}/g, config.clientName)
        .replace(/{providerName}/g, config.providerName)
        .replace(/{projectName}/g, config.projectName),
      body: template.body
        .replace(/{clientName}/g, config.clientName)
        .replace(/{providerName}/g, config.providerName)
        .replace(/{projectName}/g, config.projectName),
      phase: currentPhase,
      timestamp: new Date()
    };
    setEmails(prev => [...prev, filled]);
  };

  const moveToNextDay = () => {
    const next = currentDay + 1;
    const phaseDuration = phasesDurations[currentPhase];
    const start = getPhaseStartDay();
    const daysSinceStart = next - start;

    if (daysSinceStart > phaseDuration) moveToNextPhase();
    else setCurrentDay(next);
  };

  const moveToNextPhase = () => {
    const keys = Object.keys(phasesDurations);
    const idx = keys.indexOf(currentPhase);
    if (idx < keys.length - 1) {
      setCurrentPhase(keys[idx + 1]);
      setCurrentDay(getPhaseStartDay(keys[idx + 1]));
    } else setIsRunning(false);
  };

  const getPhaseStartDay = (phase = currentPhase) => {
    const phases = Object.keys(phasesDurations);
    let total = 1;
    for (let p of phases) {
      if (p === phase) break;
      total += phasesDurations[p];
    }
    return total;
  };

  // ---------- Helpers ----------
  const startSimulation = () => {
    setShowConfig(false);
    setIsRunning(true);
    setEmails([]);
    setCurrentDay(1);
    setCurrentPhase('conception');
  };

  const resetSimulation = () => {
    clearTimeout(timerRef.current);
    setIsRunning(false);
    setCurrentDay(1);
    setCurrentPhase('conception');
    setEmails([]);
    setShowConfig(true);
  };

  const getPhaseProgress = () => {
    const duration = phasesDurations[currentPhase];
    const daysSince = currentDay - getPhaseStartDay();
    return Math.min(100, (daysSince / duration) * 100);
  };

  const getTotalProgress = () => {
    const totalDays = Object.values(phasesDurations).reduce((a, b) => a + b, 0);
    return (currentDay / totalDays) * 100;
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(emails, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.projectName.replace(/\s+/g, '_')}-simulation.json`;
    a.click();
  };

  // Auto-scroll vers dernier email
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [emails]);

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Mail className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Simulateur SPS - Vie Projet</h1>
              <p className="text-gray-600 text-sm">Simulation d’échanges client/prestataire</p>
            </div>
          </div>

          {!showConfig && (
            <div className="flex gap-3">
              <button onClick={exportJSON} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" /> Exporter JSON
              </button>
              <button onClick={resetSimulation} className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                <RefreshCw className="w-4 h-4" /> Réinitialiser
              </button>
            </div>
          )}
        </div>

        {/* Configuration */}
        {showConfig && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Configuration du projet</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['projectName', 'clientName', 'providerName'].map((key, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key === 'projectName'
                      ? 'Nom du projet'
                      : key === 'clientName'
                      ? 'Nom du client'
                      : 'Nom du prestataire'}
                  </label>
                  <input
                    type="text"
                    value={config[key]}
                    onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emails par jour : {config.emailFrequency}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={config.emailFrequency}
                  onChange={(e) => setConfig({ ...config, emailFrequency: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vitesse simulation : {config.speedMultiplier}x
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={config.speedMultiplier}
                  onChange={(e) => setConfig({ ...config, speedMultiplier: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            <button
              onClick={startSimulation}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg hover:from-blue-700 flex items-center justify-center gap-3 font-semibold text-lg"
            >
              <Play className="w-6 h-6" /> Démarrer la simulation
            </button>
          </motion.div>
        )}

        {/* Simulation Mode */}
        {!showConfig && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-700">
                  Phase : {phaseLabels[currentPhase]} | Jour {currentDay}
                </p>
                <div className="w-64 bg-gray-200 h-2 rounded mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded"
                    style={{ width: `${getTotalProgress()}%` }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold ${
                  isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isRunning ? 'Pause' : 'Reprendre'}
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">📧 Historique des emails</h3>
              {emails.map((email) => (
                <motion.div
                  key={email.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${
                    email.from === 'client' ? 'border-blue-500' : 'border-green-500'
                  }`}
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          email.from === 'client'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {email.from === 'client' ? 'Client' : 'Prestataire'}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">{phaseLabels[email.phase]}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {email.timestamp.toLocaleTimeString('fr-FR')}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800">{email.subject}</h4>
                  <pre className="whitespace-pre-wrap mt-2 text-gray-700 text-sm">{email.body}</pre>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectLifecycleSimulator;