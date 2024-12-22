"use client"
import React from 'react';
import { useTranslations } from 'next-intl';

interface TitleProps {
  name: string;
}

function Title({ name }: TitleProps) {
  const  t  = useTranslations();
  
  return (
    <h1 className="h1 py-0">{t(`company.${name}`)}</h1>
  );
}

export default Title;
