import { CheckIcon } from '@heroicons/react/20/solid';
import PayButton from './PayButton';

function classNames(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function PlanCard({ plan }) {
  const tiers = [
    {
      name: 'الخطة المجانية',
      id: '1',
      href: '#',
      priceMonthly: `$ ${plan[0]?.price }`,
      description: `ابدأ الآن مجانًا واستمتع بنشر حتى ${plan[0]?.limit } إعلانات بسهولة وسرعة.`,
      features: [
        `نشر ${plan[0]?.limit || 5} إعلانات`,
        'دعم محدود',
      ],
      featured: false,
    },
    {
      name: 'الخطة الأساسية',
      id: '2',
      href: '#',
      priceMonthly: `$ ${plan[1]?.price || 15}`,
      description: `الخيار المثالي للنمو، نشر حتى ${plan[1]?.limit || 25} إعلان بـ ${plan[1]?.price || 15}$ فقط شهريًا.`,
      features: [
        `نشر ${plan[1]?.limit || 20} إعلانًا`,
        'دعم أسرع',
      ],
      featured: false,
    },
    {
      name: 'الخطة المميزة',
      id: '3',
      href: '#',
      priceMonthly: `$ ${plan[2]?.price || 30}`,
      description: `تميز بإعلاناتك مع نشر حتى ${plan[2]?.limit || 25} إعلان وأولوية في العرض.`,
      features: [
        `نشر ${plan[2]?.limit || 25} إعلانًا`,
        'دعم مميز',
      ],
      featured: true,
    },
  ];



  return (
    <div className="bg-white">
      <div className="mb-20 grid gap-6 max-w-lg grid-cols-1 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
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
                /month
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
