import Image from 'next/image';
import { ASSISTANT_IMAGE } from '@/components/chat/chat-constants';

export function AssistantAvatar({
  size = 40,
  className = '',
}: {
  readonly size?: number;
  readonly className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full ring-2 ring-cyan-400/40 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={ASSISTANT_IMAGE}
        alt=""
        aria-hidden
        width={size}
        height={size}
        className="h-full w-full object-cover object-[center_20%]"
        priority={size >= 56}
      />
    </div>
  );
}
