import { useEffect, useState } from 'react';

import {
  SplashBrand,
  SplashLoading,
  SplashMaintenance,
  SplashResumingTrip,
  SplashUpdateRequired,
} from '@/components/splash/splash-states';

import type { RootScreenProps } from '@/navigation/types';

type Status = 'brand' | 'loading' | 'maintenance' | 'update-required' | 'resuming-trip';

const APP_STATE = { maintenanceMode: false, updateRequired: false, hasActiveTrip: false };

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function checkAppState() {
  await wait(900);
  return APP_STATE;
}

export default function SessionCheckScreen({ navigation }: RootScreenProps<'SessionCheck'>) {
  const [status, setStatus] = useState<Status>('brand');

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      await wait(700);
      if (cancelled) return;
      setStatus('loading');

      const { maintenanceMode, updateRequired, hasActiveTrip } = await checkAppState();
      if (cancelled) return;

      if (maintenanceMode) return setStatus('maintenance');
      if (updateRequired) return setStatus('update-required');
      if (hasActiveTrip) {
        setStatus('resuming-trip');
        await wait(1200);
        if (cancelled) return;
      }

      navigation.replace('Login');
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [navigation]);

  switch (status) {
    case 'brand':
      return <SplashBrand />;
    case 'maintenance':
      return <SplashMaintenance />;
    case 'update-required':
      return <SplashUpdateRequired />;
    case 'resuming-trip':
      return <SplashResumingTrip />;
    default:
      return <SplashLoading />;
  }
}