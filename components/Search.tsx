"use client"
import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

function Search() {
  const { t } = useTranslation("common");

  return (
    <div>
      {/* Search */}
      <div className="flex flex-col px-3 py-5 bg-[#F5F5F5] rounded-t-[.7rem]">
        <div className="flex justify-start gap-4 overflow-x-auto flex-nowrap px-2 touch-pan-x hide-scrollbar">
          <button className="flex w-[100px] h-[48px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
            {t('search.buy')}
            <IoIosArrowDown className="h-5 w-5 text-secondary" />
          </button>

          <div className="relative flex">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
            <input
              placeholder={t('search.enter_location')}
              className="bg-[#F5F5F5] pl-8 flex h-[48px] font-normal items-center w-[200px] lg:w-[400px] text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4"
            />
          </div>

          <button className="flex w-[155px] h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            {t('search.apartment')}
            <IoIosArrowDown className="h-5 w-5 text-secondary" />
          </button>

          <button className="flex w-[180px] h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            {t('search.rooms_bath')}
            <IoIosArrowDown className="h-5 w-5 text-secondary" />
          </button>

          <button className="flex w-[110px] h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            {t('search.price')}
            <IoIosArrowDown className="h-5 w-5 text-secondary" />
          </button>

          <button className="flex w-[120px] h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            {t('search.filters')}
            <IoIosArrowDown className="h-5 w-5 text-secondary" />
          </button>

          <button className="flex w-[120px] h-[48px] items-center font-medium text-white bg-primary rounded-[.8rem] justify-between px-4">
            {t('search.search_button')}
            <GoSearch className="font-bold text-white" />
          </button>
        </div>
      </div>

      {/* Result of search */}
      <div className="flex lg:gap-32 bg-[#F5F5F5] justify-center border-t-[1px] py-8 rounded-b-[.7rem] overflow-x-auto">
        {Array(4)
          .fill(null)
          .map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3">
              {Array(3)
                .fill(null)
                .map((_, rowIdx) => (
                  <div key={rowIdx} className="flex gap-2">
                    <div className="text-secondary text-base font-medium">{t('search.city')}</div>
                    <span className="text-[#707070] text-sm font-normal">{t('search.result_count')}</span>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
