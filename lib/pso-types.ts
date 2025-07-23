// Tipos para o PSO
export interface Point {
  x: number;
  y: number;
}

export interface Particle {
  position: Point;
  velocity: Point;
  bestPosition: Point;
  bestFitness: number;
}

export interface Client {
  x: number;
  y: number;
}

// Interface para parâmetros configuráveis do PSO
export interface PSOParams {
  numParticles: number;
  numClients: number;
  inertiaWeight: number;
  cognitiveWeight: number;
  socialWeight: number;
  maxVelocity: number;
  canvasWidth: number;
  canvasHeight: number;
}

// Parâmetros padrão do PSO
export const DEFAULT_PSO_PARAMS: PSOParams = {
  numParticles: 100,
  numClients: 30,
  inertiaWeight: 0.7,
  cognitiveWeight: 1.0,
  socialWeight: 1.0,
  maxVelocity: 1.0,
  canvasWidth: 800,
  canvasHeight: 600,
};
