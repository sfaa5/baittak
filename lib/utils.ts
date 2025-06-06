import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}


// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}



export const isValidPhoneNumber = (phoneNumber: string): boolean => {
	const phoneNumberParsed = parsePhoneNumberFromString(phoneNumber);
	return phoneNumberParsed ? phoneNumberParsed.isValid() : false;
  };