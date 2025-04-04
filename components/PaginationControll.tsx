'use client';

import { FC } from 'react';
import { Link } from '@/i18n/routing'; 
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  length: number;
}

const PaginationControll: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  length,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t =useTranslations();

  const page = Number(searchParams.get('page') ?? '1');
  const per_page = Number(searchParams.get('per_page') ?? '6');
  const totalItems = length;

  const totalPages = Math.ceil(totalItems / per_page);

  const getUpdatedQuery = (newParams: Record<string, string | number>) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      currentParams.set(key, value.toString());
    });
    return currentParams.toString();
  };

  const normalizedPathname = decodeURIComponent(pathname.trim());

  return (
    <div className="flex items-center justify-center mt-4">
      <Link
        href={{
          pathname: normalizedPathname.includes('/Projects') || normalizedPathname.includes('/المشاريع')
          ? '/Projects'
          : normalizedPathname.includes('/Property') || normalizedPathname.includes('/العقارات')
          ? '/Property'
          : normalizedPathname.includes('/Agency') || normalizedPathname.includes('/الوكيل')
          ? '/Agency'
          : normalizedPathname.includes('/blogs') ? '/blogs':"/",
          query: getUpdatedQuery({ page: page - 1, per_page }),
        }}
        className={`px-4 py-2 mx-1 text-white bg-primary rounded-md hover:bg-primary/80 ${
          !hasPrevPage ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {t("Pagination.Prev")}
      </Link>

      <div className="flex items-center mx-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index + 1}
            href={{
              pathname: normalizedPathname.includes('/Projects') || normalizedPathname.includes('/المشاريع')
              ? '/Projects'
              : normalizedPathname.includes('/Property') || normalizedPathname.includes('/العقارات')
              ? '/Property'
              : normalizedPathname.includes('/Agency') || normalizedPathname.includes('/الوكيل')
              ? '/Agency'
              : normalizedPathname.includes('/blogs') ? '/blogs':"/",
              query: getUpdatedQuery({ page: index + 1, per_page }),
            }}
            className={`px-4 py-2 mx-1 rounded-md ${
              page === index + 1
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </Link>
        ))}
      </div>

      <Link
        href={{
          pathname: normalizedPathname.includes('/Projects') || normalizedPathname.includes('/المشاريع')
          ? '/Projects'
          : normalizedPathname.includes('/Property') || normalizedPathname.includes('/العقارات')
          ? '/Property'
          : normalizedPathname.includes('/Agency') || normalizedPathname.includes('/الوكيل')
          ? '/Agency'
          : normalizedPathname.includes('/blogs') ? '/blogs':"/",
          query: getUpdatedQuery({ page: page + 1, per_page }),
        }}
        className={`px-4 py-2 mx-1 text-white bg-primary rounded-md hover:bg-primary/80 ${
          !hasNextPage ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {t("Pagination.next")}
      </Link>
    </div>
  );
};

export default PaginationControll;
