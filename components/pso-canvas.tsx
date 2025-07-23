"use client";

import { useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Point, Particle, Client, PSOParams } from "@/lib/pso-types";

interface PSOCanvasProps {
  params: PSOParams;
  particles: Particle[];
  clients: Client[];
  globalBest: Point;
  isRunning: boolean;
  iteration: number;
  hasConverged: boolean;
}

export const PSOCanvas = ({
  params,
  particles,
  clients,
  globalBest,
  isRunning,
  iteration,
  hasConverged,
}: PSOCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Renderizar no canvas
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, params.canvasWidth, params.canvasHeight);

    // Desenhar clientes (pontos azuis)
    ctx.fillStyle = "#3B82F6";
    clients.forEach((client) => {
      ctx.beginPath();
      ctx.arc(client.x, client.y, 8, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Desenhar partículas (círculos pequenos cinza/roxo)
    ctx.fillStyle = "#8B5CF6";
    ctx.globalAlpha = 0.6;
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.position.x, particle.position.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Desenhar melhor posição global (antena - ícone vermelho grande) apenas quando parou
    if (!isRunning && iteration > 0) {
      ctx.fillStyle = "#EF4444";
      ctx.strokeStyle = "#DC2626";
      ctx.lineWidth = 3;

      // Desenhar antena como um losango com linhas
      const antennaSize = 10;
      ctx.beginPath();
      ctx.moveTo(globalBest.x, globalBest.y - antennaSize);
      ctx.lineTo(globalBest.x + antennaSize, globalBest.y);
      ctx.lineTo(globalBest.x, globalBest.y + antennaSize);
      ctx.lineTo(globalBest.x - antennaSize, globalBest.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Adicionar linhas da antena
      ctx.beginPath();
      ctx.moveTo(
        globalBest.x - antennaSize * 1.5,
        globalBest.y - antennaSize * 0.5
      );
      ctx.lineTo(
        globalBest.x + antennaSize * 1.5,
        globalBest.y - antennaSize * 0.5
      );
      ctx.moveTo(
        globalBest.x - antennaSize * 1.2,
        globalBest.y - antennaSize * 0.8
      );
      ctx.lineTo(
        globalBest.x + antennaSize * 1.2,
        globalBest.y - antennaSize * 0.8
      );
      ctx.stroke();
    }
  }, [particles, clients, globalBest, isRunning, iteration, params]);

  useEffect(() => {
    render();
  }, [render]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          Simulação PSO - Localização de Antena
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={params.canvasWidth}
            height={params.canvasHeight}
            className="border border-slate-200 rounded-lg bg-white shadow-inner w-full max-w-full"
            style={{
              aspectRatio: `${params.canvasWidth}/${params.canvasHeight}`,
            }}
          />

          {/* Overlay de status */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="text-sm font-medium text-slate-700">
              Status:{" "}
              {isRunning ? (
                <span className="text-green-600">Executando</span>
              ) : hasConverged ? (
                <span className="text-blue-600">Convergido</span>
              ) : (
                <span className="text-slate-500">Pausado</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
