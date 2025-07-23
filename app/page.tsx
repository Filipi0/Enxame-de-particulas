"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { usePSO } from "@/hooks/use-pso";
import { PSOCanvas } from "@/components/pso-canvas";
import { PSOControlPanel } from "@/components/pso-control-panel";
import { PSOParameters } from "@/components/pso-parameters";

export default function PSOAntennaOptimization() {
  const animationRef = useRef<number | null>(null);

  const {
    params,
    particles,
    clients,
    globalBest,
    globalBestFitness,
    iteration,
    isRunning,
    hasConverged,
    updateParticles,
    initializeSimulation,
    resetSimulation,
    toggleSimulation,
    updateParams,
    setIsRunning,
    setHasConverged,
  } = usePSO();

  // Loop de animação
  const animate = useCallback(() => {
    if (!isRunning) return;

    updateParticles();

    // Verificar convergência (quando a melhoria é muito pequena)
    if (iteration > 100 && iteration % 50 === 0) {
      const improvement = Math.abs(globalBestFitness - globalBestFitness);
      if (improvement < 0.1) {
        setHasConverged(true);
        setIsRunning(false);
        return;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isRunning, updateParticles, iteration, globalBestFitness, setHasConverged, setIsRunning]);

  // Reiniciar simulação
  const handleResetSimulation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    resetSimulation();
  };

  // Aplicar parâmetros e reiniciar
  const handleApplyAndReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    resetSimulation();
  };

  // Efeitos
  useEffect(() => {
    initializeSimulation();
  }, [initializeSimulation]);

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, animate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Otimização por Enxame de Partículas (PSO)
          </h1>
          <p className="text-lg text-slate-600">
            Otimização de Localização de Antena usando PSO
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Painel de Controle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            <PSOControlPanel
              params={params}
              isRunning={isRunning}
              iteration={iteration}
              globalBestFitness={globalBestFitness}
              hasConverged={hasConverged}
              onToggleSimulation={toggleSimulation}
              onResetSimulation={handleResetSimulation}
            />
            
            <PSOParameters
              params={params}
              onUpdateParams={updateParams}
              onApplyAndReset={handleApplyAndReset}
              disabled={isRunning}
            />
          </motion.div>

          {/* Canvas de Simulação */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-3"
          >
            <PSOCanvas
              params={params}
              particles={particles}
              clients={clients}
              globalBest={globalBest}
              isRunning={isRunning}
              iteration={iteration}
              hasConverged={hasConverged}
            />
          </motion.div>
        </div>

        {/* Informações adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        ></motion.div>
      </div>
    </div>
  );
}
