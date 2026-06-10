'use client';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const companies = [
  { id: 'c1',  name: 'Revolut' },
  { id: 'c2',  name: 'Brex' },
  { id: 'c3',  name: 'Ramp' },
  { id: 'c4',  name: 'Mercury' },
  { id: 'c5',  name: 'Rippling' },
  { id: 'c6',  name: 'Plaid' },
  { id: 'c7',  name: 'Stripe' },
  { id: 'c8',  name: 'Monzo' },
  { id: 'c9',  name: 'N26' },
  { id: 'c10', name: 'Wise' },
  { id: 'c11', name: 'Airwallex' },
  { id: 'c12', name: 'Adyen' },
];

export function TrustedBy() {
  return (
    <div className='w-full border-y border-dashed border-[rgba(236,230,216,0.13)] bg-background'>
      <div className='flex h-[68px] items-stretch'>

        {/* Left spacer — matches column margin (10rem) */}
        <div className='shrink-0 w-40' />

        {/* Label — no right border */}
        <div className='flex shrink-0 items-center pr-8'>
          <span className='font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap'>
            Trusted by
          </span>
        </div>

        {/* Slider — constrained: stops 10rem from right edge */}
        <div className='relative overflow-hidden' style={{ flex: '1 1 0', marginRight: '10rem' }}>
          <InfiniteSlider
            className='flex h-full w-full items-center'
            duration={40}
            gap={56}
          >
            {companies.map((company) => (
              <div key={company.id} className='flex items-center px-2'>
                <span className='font-mono text-[12px] font-semibold tracking-[0.18em] uppercase text-[rgba(236,230,216,0.3)] whitespace-nowrap'>
                  {company.name}
                </span>
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
