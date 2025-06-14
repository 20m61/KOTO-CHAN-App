import { useEffect, useState } from 'react';
import { calculateAge, isBirthday, daysUntilBirthday } from '@/lib/utils/date';

interface BirthdayInfo {
  age: number;
  isBirthday: boolean;
  daysUntilBirthday: number;
}

/**
 * 誕生日関連の情報を取得するカスタムフック
 */
export function useBirthdayInfo(): BirthdayInfo {
  const [info, setInfo] = useState<BirthdayInfo>({
    age: 0,
    isBirthday: false,
    daysUntilBirthday: 0,
  });

  useEffect(() => {
    // 初回計算
    const updateInfo = () => {
      setInfo({
        age: calculateAge(),
        isBirthday: isBirthday(),
        daysUntilBirthday: daysUntilBirthday(),
      });
    };

    updateInfo();

    // 日付が変わった時のために、毎日0時に再計算
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimeout = setTimeout(() => {
      updateInfo();
      // その後は24時間ごとに更新
      const dailyInterval = setInterval(updateInfo, 24 * 60 * 60 * 1000);
      
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, []);

  return info;
}