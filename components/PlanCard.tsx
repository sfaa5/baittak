import { CheckIcon } from '@heroicons/react/20/solid';
import PayButton from './PayButton';
import { useTranslations } from 'next-intl';

function classNames(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function PlanCard({ plan }) {
  const t = useTranslations('plan'); // Use 'plans' as the namespace, you can change this to match your JSON key

  const tiers = [
    {
      name: t('freePlan.name'),  // Translation key for "Free Plan"
      id: '1',
      href: '#',
      priceMonthly: `$ ${plan[0]?.price}`,
      description: t('freePlan.description', { limit: plan[0]?.limit }), // Dynamically pass limit
      features: [
        t('freePlan.feature1', { limit: plan[0]?.limit || 5 }), // Translation for "Publish {limit} ads"
        t('freePlan.feature2'), // "Limited support"
      ],
      featured: false,
    },
    {
      name: t('basicPlan.name'),
      id: '2',
      href: '#',
      priceMonthly: `$ ${plan[1]?.price || 15}`,
      description: t('basicPlan.description', { limit: plan[1]?.limit || 25, price: plan[1]?.price || 15 }),
      features: [
        t('basicPlan.feature1', { limit: plan[1]?.limit || 20 }), // "Publish {limit} ads"
        t('basicPlan.feature2'), // "Faster support"
      ],
      featured: false,
    },
    {
      name: t('premiumPlan.name'),
      id: '3',
      href: '#',
      priceMonthly: `$ ${plan[2]?.price || 30}`,
      description: t('premiumPlan.description', { limit: plan[2]?.limit || 25 }),
      features: [
        t('premiumPlan.feature1', { limit: plan[2]?.limit || 25 }), // "Publish {limit} ads"
        t('premiumPlan.feature2'), // "Premium support"
      ],
      featured: true,
    },
  ];

  return (
    <div className="bg-white">
      <div className="mb-20 grid gap-[20px]  grid-cols-1  xl:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 '
            )}
          >
            <h3
              id={tier.id}
              className={classNames('text-primary', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-4xl font-semibold tracking-tight'
                )}
              >
                {tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>
                / a{t('month')}
              </span>
            </p>
            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10'
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-primary' : 'text-primary', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {tier.id !== "1" && <PayButton id={tier.id} />}
          </div>
        ))}
      </div>
    </div>
  );
}
