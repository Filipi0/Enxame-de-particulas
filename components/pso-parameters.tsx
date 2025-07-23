"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { PSOParams } from "@/lib/pso-types";

interface PSOParametersProps {
  params: PSOParams;
  onUpdateParams: (params: Partial<PSOParams>) => void;
  onApplyAndReset: () => void;
  disabled?: boolean;
}

export const PSOParameters = ({
  params,
  onUpdateParams,
  onApplyAndReset,
  disabled = false,
}: PSOParametersProps) => {
  const [localParams, setLocalParams] = useState<PSOParams>(params);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (key: keyof PSOParams, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setLocalParams(prev => ({
        ...prev,
        [key]: numValue
      }));
    }
  };

  const handleApply = () => {
    onUpdateParams(localParams);
    onApplyAndReset();
  };

  const handleReset = () => {
    setLocalParams(params);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Settings className="w-4 h-4" />
          Configurações
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="numParticles">Nº Partículas</Label>
              <Input
                id="numParticles"
                type="number"
                min="10"
                max="500"
                value={localParams.numParticles}
                onChange={(e) => handleInputChange('numParticles', e.target.value)}
                disabled={disabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numClients">Nº Clientes</Label>
              <Input
                id="numClients"
                type="number"
                min="5"
                max="100"
                value={localParams.numClients}
                onChange={(e) => handleInputChange('numClients', e.target.value)}
                disabled={disabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inertiaWeight">Inércia (w)</Label>
              <Input
                id="inertiaWeight"
                type="number"
                step="0.1"
                min="0"
                max="2"
                value={localParams.inertiaWeight}
                onChange={(e) => handleInputChange('inertiaWeight', e.target.value)}
                disabled={disabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cognitiveWeight">Cognitivo (c1)</Label>
              <Input
                id="cognitiveWeight"
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={localParams.cognitiveWeight}
                onChange={(e) => handleInputChange('cognitiveWeight', e.target.value)}
                disabled={disabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialWeight">Social (c2)</Label>
              <Input
                id="socialWeight"
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={localParams.socialWeight}
                onChange={(e) => handleInputChange('socialWeight', e.target.value)}
                disabled={disabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxVelocity">Vel. Máxima</Label>
              <Input
                id="maxVelocity"
                type="number"
                step="0.1"
                min="0.1"
                max="10"
                value={localParams.maxVelocity}
                onChange={(e) => handleInputChange('maxVelocity', e.target.value)}
                disabled={disabled}
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handleApply} 
              disabled={disabled}
              className="flex-1"
            >
              Aplicar e Reiniciar
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline"
              disabled={disabled}
            >
              Resetar
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
