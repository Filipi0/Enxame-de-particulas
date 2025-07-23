"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PSOParams } from "@/lib/pso-types";

interface PSOControlPanelProps {
  params: PSOParams;
  isRunning: boolean;
  iteration: number;
  globalBestFitness: number;
  hasConverged: boolean;
  onToggleSimulation: () => void;
  onResetSimulation: () => void;
}

export const PSOControlPanel = ({
  params,
  isRunning,
  iteration,
  globalBestFitness,
  hasConverged,
  onToggleSimulation,
  onResetSimulation,
}: PSOControlPanelProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            Controles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={onToggleSimulation}
              variant={isRunning ? "destructive" : "default"}
              className="flex-1"
            >
              {isRunning ? (
                <Pause className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isRunning ? "Pausar" : "Iniciar"}
            </Button>
            <Button
              onClick={onResetSimulation}
              variant="outline"
              size="icon"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Iteração:</span>
              <Badge variant="secondary">{iteration}</Badge>
            </div>

            <div className="space-y-1">
              <span className="text-sm font-medium">Melhor Fitness:</span>
              <div className="text-2xl font-bold text-blue-600">
                {globalBestFitness.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500">
                (Soma das distâncias)
              </div>
            </div>

            <AnimatePresence>
              {hasConverged && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge className="w-full justify-center bg-green-100 text-green-800">
                    Convergiu!
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Legenda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Legenda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm">
              Clientes ({params.numClients})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full opacity-60"></div>
            <span className="text-sm">
              Partículas ({params.numParticles})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 transform rotate-45"></div>
            <span className="text-sm">Antena Otimizada</span>
          </div>
        </CardContent>
      </Card>

      {/* Parâmetros PSO */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Parâmetros PSO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Inércia (w):</span>
            <span>{params.inertiaWeight}</span>
          </div>
          <div className="flex justify-between">
            <span>Cognitivo (c1):</span>
            <span>{params.cognitiveWeight}</span>
          </div>
          <div className="flex justify-between">
            <span>Social (c2):</span>
            <span>{params.socialWeight}</span>
          </div>
          <div className="flex justify-between">
            <span>Vel. Máxima:</span>
            <span>{params.maxVelocity}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
