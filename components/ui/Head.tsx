import { cn } from '@/libs/utils';

type HeadType = {
  head: string;
  sub?: string;
  className?: string;
  headClassName?: string;
  subClassName?: string;
};

const Head = ({ head, sub, className, headClassName, subClassName }: HeadType) => {
  return (
    <div className={cn('pt-8 pb-10', className)}>
      <h1 className={cn(
        'font-semibold text-3xl text-slate-900 tracking-[-0.8px]',
        headClassName
      )}>
        {head}
      </h1>
      {sub && (
        <p className={cn(
          'text-sm font-normal text-slate-600 mt-2',
          subClassName
        )}>
          {sub}
        </p>
      )}
    </div>
  );
};

export default Head;