import { PidControllerConfig } from "@/features/pid-simulator/types";
import { clamp } from "@/features/pid-simulator/utils";

type PidTerms = {
  proportional: number;
  integral: number;
  derivative: number;
};

type PidStepResult = {
  output: number;
  error: number;
  terms: PidTerms;
};

export class PidController {
  private integralState = 0;
  private previousError: number | null = null;

  constructor(private config: PidControllerConfig) {}

  setConfig(config: PidControllerConfig) {
    this.config = config;
    this.integralState = clamp(
      this.integralState,
      this.config.integralMin,
      this.config.integralMax
    );
  }

  reset() {
    this.integralState = 0;
    this.previousError = null;
  }

  step(
    setpoint: number,
    processVariable: number,
    dtSeconds: number
  ): PidStepResult {
    const safeDt = dtSeconds > 0 ? dtSeconds : Number.EPSILON;
    const error = setpoint - processVariable;

    const proportional = this.config.gains.kp * error;

    this.integralState = clamp(
      this.integralState + error * safeDt,
      this.config.integralMin,
      this.config.integralMax
    );
    const integral = this.config.gains.ki * this.integralState;

    const derivativeError =
      this.previousError === null ? 0 : (error - this.previousError) / safeDt;
    const derivative = this.config.gains.kd * derivativeError;

    this.previousError = error;

    return {
      output: clamp(
        proportional + integral + derivative,
        this.config.outputMin,
        this.config.outputMax
      ),
      error,
      terms: {
        proportional,
        integral,
        derivative,
      },
    };
  }
}
