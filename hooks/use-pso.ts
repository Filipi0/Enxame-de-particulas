import { useState, useCallback } from "react";
import { Point, Particle, Client, PSOParams, DEFAULT_PSO_PARAMS } from "../lib/pso-types";

export const usePSO = (initialParams: PSOParams = DEFAULT_PSO_PARAMS) => {
  const [params, setParams] = useState<PSOParams>(initialParams);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [globalBest, setGlobalBest] = useState<Point>({ x: 0, y: 0 });
  const [globalBestFitness, setGlobalBestFitness] = useState<number>(
    Number.POSITIVE_INFINITY
  );
  const [iteration, setIteration] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasConverged, setHasConverged] = useState<boolean>(false);

  // Função para calcular a distância euclidiana
  const distance = (p1: Point, p2: Point): number => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  // Função objetivo: soma das distâncias da antena até todos os clientes
  const calculateFitness = (position: Point): number => {
    return clients.reduce((sum, client) => sum + distance(position, client), 0);
  };

  // Inicializar clientes aleatoriamente
  const initializeClients = useCallback((): Client[] => {
    const newClients: Client[] = [];
    for (let i = 0; i < params.numClients; i++) {
      newClients.push({
        x: Math.random() * (params.canvasWidth - 40) + 20,
        y: Math.random() * (params.canvasHeight - 40) + 20,
      });
    }
    return newClients;
  }, [params]);

  // Inicializar partículas
  const initializeParticles = useCallback(
    (clientList: Client[]): Particle[] => {
      const newParticles: Particle[] = [];
      let bestPos = { x: 0, y: 0 };
      let bestFit = Number.POSITIVE_INFINITY;

      for (let i = 0; i < params.numParticles; i++) {
        const position = {
          x: Math.random() * params.canvasWidth,
          y: Math.random() * params.canvasHeight,
        };

        const fitness = clientList.reduce(
          (sum, client) => sum + distance(position, client),
          0
        );

        if (fitness < bestFit) {
          bestFit = fitness;
          bestPos = { ...position };
        }

        newParticles.push({
          position,
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
          },
          bestPosition: { ...position },
          bestFitness: fitness,
        });
      }

      setGlobalBest(bestPos);
      setGlobalBestFitness(bestFit);
      return newParticles;
    },
    [params]
  );

  // Atualizar partículas usando PSO
  const updateParticles = useCallback(() => {
    setParticles((prevParticles) => {
      let newGlobalBest = globalBest;
      let newGlobalBestFitness = globalBestFitness;

      const updatedParticles = prevParticles.map((particle) => {
        // Atualizar velocidade
        const r1 = Math.random();
        const r2 = Math.random();

        const newVelocity = {
          x:
            params.inertiaWeight * particle.velocity.x +
            params.cognitiveWeight *
              r1 *
              (particle.bestPosition.x - particle.position.x) +
            params.socialWeight * r2 * (globalBest.x - particle.position.x),
          y:
            params.inertiaWeight * particle.velocity.y +
            params.cognitiveWeight *
              r1 *
              (particle.bestPosition.y - particle.position.y) +
            params.socialWeight * r2 * (globalBest.y - particle.position.y),
        };

        // Limitar velocidade máxima
        const velocityMagnitude = Math.sqrt(
          newVelocity.x ** 2 + newVelocity.y ** 2
        );
        if (velocityMagnitude > params.maxVelocity) {
          newVelocity.x =
            (newVelocity.x / velocityMagnitude) * params.maxVelocity;
          newVelocity.y =
            (newVelocity.y / velocityMagnitude) * params.maxVelocity;
        }

        // Atualizar posição
        const newPosition = {
          x: Math.max(
            0,
            Math.min(
              params.canvasWidth,
              particle.position.x + newVelocity.x
            )
          ),
          y: Math.max(
            0,
            Math.min(
              params.canvasHeight,
              particle.position.y + newVelocity.y
            )
          ),
        };

        // Calcular fitness da nova posição
        const fitness = calculateFitness(newPosition);

        // Atualizar melhor posição pessoal
        let bestPosition = particle.bestPosition;
        let bestFitness = particle.bestFitness;

        if (fitness < particle.bestFitness) {
          bestPosition = { ...newPosition };
          bestFitness = fitness;
        }

        // Verificar se é a melhor posição global
        if (fitness < newGlobalBestFitness) {
          newGlobalBest = { ...newPosition };
          newGlobalBestFitness = fitness;
        }

        return {
          position: newPosition,
          velocity: newVelocity,
          bestPosition,
          bestFitness,
        };
      });

      // Atualizar melhor global se mudou
      if (newGlobalBestFitness < globalBestFitness) {
        setGlobalBest(newGlobalBest);
        setGlobalBestFitness(newGlobalBestFitness);
      }

      return updatedParticles;
    });

    setIteration((prev) => prev + 1);
  }, [globalBest, globalBestFitness, clients, calculateFitness, params]);

  // Inicializar simulação
  const initializeSimulation = useCallback(() => {
    const newClients = initializeClients();
    setClients(newClients);
    const newParticles = initializeParticles(newClients);
    setParticles(newParticles);
    setIteration(0);
    setHasConverged(false);
  }, [initializeClients, initializeParticles]);

  // Reiniciar simulação
  const resetSimulation = () => {
    setIsRunning(false);
    initializeSimulation();
  };

  // Alternar execução
  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  // Atualizar parâmetros
  const updateParams = (newParams: Partial<PSOParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
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
  };
};
