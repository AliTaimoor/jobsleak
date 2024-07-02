// hooks/useFeatureGate.ts
import featureFlags from '../utils/featureFlags'

export function useFeatureFlag (feature: keyof typeof featureFlags) {
  // In a real-world scenario, you might want to check user roles,
  // subscription levels, or other criteria here
  return featureFlags[feature]
}
