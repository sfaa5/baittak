"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TitleProps {
  name: string;
}

function Title({ name }: TitleProps) {
  const { t } = useTranslation("common");
  
  return (
    <h1 className="h1 py-0">{t(`company.${name}`)}</h1>
  );
}

export default Title;
