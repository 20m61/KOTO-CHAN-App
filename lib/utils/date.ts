import { format, differenceInYears } from 'date-fns';
import { ja } from 'date-fns/locale';

// ことちゃんの誕生日
export const KOTOCHAN_BIRTHDAY = new Date('2024-06-18');

/**
 * 現在の年齢を計算
 */
export function calculateAge(birthday: Date = KOTOCHAN_BIRTHDAY): number {
  return differenceInYears(new Date(), birthday);
}

/**
 * 今日が誕生日かどうか判定
 */
export function isBirthday(birthday: Date = KOTOCHAN_BIRTHDAY): boolean {
  const today = new Date();
  return (
    today.getMonth() === birthday.getMonth() &&
    today.getDate() === birthday.getDate()
  );
}

/**
 * 日付を日本語フォーマットで表示
 */
export function formatDateJa(date: Date, formatStr: string = 'yyyy年MM月dd日'): string {
  return format(date, formatStr, { locale: ja });
}

/**
 * 誕生日までの残り日数を計算
 */
export function daysUntilBirthday(birthday: Date = KOTOCHAN_BIRTHDAY): number {
  const today = new Date();
  const thisYearBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  );
  
  // 今年の誕生日が過ぎている場合は来年の誕生日を計算
  if (today > thisYearBirthday) {
    thisYearBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  const diffTime = thisYearBirthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}