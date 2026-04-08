import {
  OptimizerId,
  OptimizerMemory,
  OptimizerStepInput,
  OptimizerStepResult,
} from "@/features/optimizer-lab/types";
import {
  addVectors,
  mapVector,
  scaleVector,
  ZERO_VECTOR,
} from "@/features/optimizer-lab/vector";

export function createOptimizerMemory(): OptimizerMemory {
  return {
    velocity: ZERO_VECTOR,
    squaredGradient: ZERO_VECTOR,
    firstMoment: ZERO_VECTOR,
    secondMoment: ZERO_VECTOR,
    timestep: 0,
  };
}

export function stepSGD({
  theta,
  gradient,
  tuning,
  memory,
}: OptimizerStepInput): OptimizerStepResult {
  const delta = scaleVector(gradient, -tuning.learningRate);

  return {
    theta: addVectors(theta, delta),
    delta,
    memory,
  };
}

export function stepMomentum({
  theta,
  gradient,
  tuning,
  memory,
}: OptimizerStepInput): OptimizerStepResult {
  const velocity = addVectors(
    scaleVector(memory.velocity, tuning.momentum),
    scaleVector(gradient, -tuning.learningRate)
  );

  return {
    theta: addVectors(theta, velocity),
    delta: velocity,
    memory: {
      ...memory,
      velocity,
    },
  };
}

export function stepRMSProp({
  theta,
  gradient,
  tuning,
  memory,
}: OptimizerStepInput): OptimizerStepResult {
  const squaredGradient = {
    x:
      tuning.beta2 * memory.squaredGradient.x +
      (1 - tuning.beta2) * gradient.x * gradient.x,
    y:
      tuning.beta2 * memory.squaredGradient.y +
      (1 - tuning.beta2) * gradient.y * gradient.y,
  };
  const denominator = mapVector(
    squaredGradient,
    (value) => Math.sqrt(value) + tuning.epsilon
  );
  const delta = {
    x: (-tuning.learningRate * gradient.x) / denominator.x,
    y: (-tuning.learningRate * gradient.y) / denominator.y,
  };

  return {
    theta: addVectors(theta, delta),
    delta,
    memory: {
      ...memory,
      squaredGradient,
    },
  };
}

export function stepAdam({
  theta,
  gradient,
  tuning,
  memory,
}: OptimizerStepInput): OptimizerStepResult {
  const timestep = memory.timestep + 1;
  const firstMoment = {
    x: tuning.beta1 * memory.firstMoment.x + (1 - tuning.beta1) * gradient.x,
    y: tuning.beta1 * memory.firstMoment.y + (1 - tuning.beta1) * gradient.y,
  };
  const secondMoment = {
    x:
      tuning.beta2 * memory.secondMoment.x +
      (1 - tuning.beta2) * gradient.x * gradient.x,
    y:
      tuning.beta2 * memory.secondMoment.y +
      (1 - tuning.beta2) * gradient.y * gradient.y,
  };
  const firstMomentHat = {
    x: firstMoment.x / (1 - tuning.beta1 ** timestep),
    y: firstMoment.y / (1 - tuning.beta1 ** timestep),
  };
  const secondMomentHat = {
    x: secondMoment.x / (1 - tuning.beta2 ** timestep),
    y: secondMoment.y / (1 - tuning.beta2 ** timestep),
  };
  const delta = {
    x:
      (-tuning.learningRate * firstMomentHat.x) /
      (Math.sqrt(secondMomentHat.x) + tuning.epsilon),
    y:
      (-tuning.learningRate * firstMomentHat.y) /
      (Math.sqrt(secondMomentHat.y) + tuning.epsilon),
  };

  return {
    theta: addVectors(theta, delta),
    delta,
    memory: {
      ...memory,
      firstMoment,
      secondMoment,
      timestep,
    },
  };
}

export function stepOptimizer(
  optimizerId: OptimizerId,
  input: OptimizerStepInput
): OptimizerStepResult {
  switch (optimizerId) {
    case "sgd":
      return stepSGD(input);
    case "momentum":
      return stepMomentum(input);
    case "rmsprop":
      return stepRMSProp(input);
    case "adam":
      return stepAdam(input);
  }
}
