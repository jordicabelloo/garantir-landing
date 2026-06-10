'use client';
import Image from 'next/image';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const baseLogos = [
  { src: '/blackrock-logo-1.svg',       alt: 'BlackRock' },
  { src: '/techstars-logo-vector-1.svg', alt: 'Techstars' },
  { src: '/endeavor.svg',               alt: 'Endeavor' },
  { src: '/claude-logo.svg',            alt: 'Claude' },
];

// Repeat enough times so the slider content is always wider than the container
const logos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos];

export function TrustedBy() {
  return (
    <div className='w-full border-y border-dashed border-[rgba(236,230,216,0.3)] bg-background'>
      <div className='flex h-[68px] items-stretch'>

        {/* Left spacer — matches column margin (10rem) */}
        <div className='shrink-0 w-40' />

        {/* Label */}
        <div className='flex shrink-0 items-center pl-10 pr-8'>
          <span className='font-mono text-[12px] font-medium tracking-[0.2em] uppercase text-[rgba(236,230,216,0.55)] whitespace-nowrap'>
            Trusted by
          </span>
        </div>

        {/* Slider — constrained: stops 10rem from right edge */}
        <div className='relative overflow-hidden' style={{ flex: '1 1 0', marginRight: '10rem' }}>
          <InfiniteSlider
            className='flex h-full w-full items-center'
            duration={80}
            gap={56}
          >
            {logos.map((logo, i) => (
              <div key={i} className='flex items-center px-4'>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={0}
                  height={0}
                  sizes="200px"
                  style={{ height: '22px', width: 'auto', maxWidth: '120px', opacity: 0.5, filter: 'brightness(0) invert(1)' }}
                />
              </div>
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className='pointer-events-none absolute top-0 left-0 h-full w-[100px]'
            direction='left'
            blurIntensity={0.6}
          />
          <ProgressiveBlur
            className='pointer-events-none absolute top-0 right-0 h-full w-[100px]'
            direction='right'
            blurIntensity={0.6}
          />
        </div>

      </div>
    </div>
  );
}
