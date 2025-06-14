'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageContainer, GridLayout } from '@/components/layouts';
import { CircleButton, Icon } from '@/components/ui';
import { StampDisplay } from '@/components/features/stamps/StampDisplay';
import { aoStamps } from '@/lib/constants/stamps';
import { useBirthdayInfo } from '@/lib/hooks/useBirthdayInfo';

interface NavButtonProps {
  href: string;
  iconName: 'music' | 'brush' | 'photo' | 'settings';
  label: string;
  color: 'pink' | 'mint' | 'yellow' | 'brown';
  requiresAuth?: boolean;
}

function NavButton({ href, iconName, label, color }: NavButtonProps) {
  return (
    <Link href={href as any}>
      <CircleButton
        size="xlarge"
        color={color}
        icon={<Icon name={iconName} size="2xl" />}
        label={label}
        labelPosition="bottom"
        animationOnPress
        animationOnHover
      />
    </Link>
  );
}

export default function HomePage() {
  const { isBirthday, age } = useBirthdayInfo();

  // 挨拶スタンプの選択
  const greetingStamp = isBirthday
    ? aoStamps.find((s) => s.id === 'ao_birthday')!
    : aoStamps.find((s) => s.id === 'ao_hello')!;

  return (
    <PageContainer
      background={isBirthday ? 'birthday' : 'stars'}
      showBirthdayEffects={isBirthday}
      padding="large"
    >
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] space-y-8">
        {/* タイトルと挨拶 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-child-3xl font-bold text-kotochan-brown mb-4 drop-shadow-sm">
            ことちゃん
          </h1>
          <p className="text-child-lg text-kotochan-brown">
            1さいのたんじょうび
          </p>
          {isBirthday && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-child-xl text-kotochan-pink font-bold mt-2"
            >
              {age}さい おめでとう！🎂
            </motion.p>
          )}
        </motion.div>

        {/* 挨拶スタンプ */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6, delay: 0.2 }}
        >
          <StampDisplay stamp={greetingStamp} size="lg" autoAnimate showLabel />
        </motion.div>

        {/* ナビゲーショングリッド */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GridLayout columns={2} gap="large">
            <NavButton
              href="/sound-play"
              iconName="music"
              label="おとあそび"
              color="pink"
            />
            <NavButton
              href="/drawing"
              iconName="brush"
              label="おえかき"
              color="mint"
            />
            <NavButton
              href="/album"
              iconName="photo"
              label="アルバム"
              color="yellow"
            />
            <NavButton
              href="/admin"
              iconName="settings"
              label="おとなメニュー"
              color="brown"
              requiresAuth
            />
          </GridLayout>
        </motion.div>

        {/* デザインシステムテスト用リンク（開発環境のみ） */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8">
            <Link href="/design-system">
              <CircleButton
                size="small"
                color="purple"
                icon={<Icon name="settings" />}
                label="デザインシステム"
              />
            </Link>
          </div>
        )}
      </div>
    </PageContainer>
  );
}