'use client';

import dynamic from 'next/dynamic';

const NanoBubbleNetwork = dynamic(
  () => import('@/components/nano-bubble-network').then((m) => ({ default: m.NanoBubbleNetwork })),
  {
    ssr: false,
    loading: () => (
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#001428]/95 to-[#000a14]/95"
        aria-hidden
      />
    ),
  },
);

export function NanoBubbleNetworkLoader({ density }: { density?: 'low' | 'normal' }) {
  return <NanoBubbleNetwork density={density} />;
}
