'use client';

import dynamic from 'next/dynamic';

const CometScene = dynamic(
  () => import('./CometScene').then(m => m.CometScene),
  { ssr: false }
);

export function CometWrapper() {
  return <CometScene />;
}
