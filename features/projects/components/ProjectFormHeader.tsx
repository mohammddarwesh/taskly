type Props = {
  icon?: string;
  title: string;
  description: string;
};

export function ProjectFormHeader({
  icon = '/icons/rocket.svg',
  title,
  description,
}: Props) {
  return (
    <div className="flex items-start gap-4 px-8 pt-8 pb-10 border-b border-surface-low">
      {/* Icon overlay */}
      <div className="flex items-center justify-center w-[46px] h-[44px] rounded bg-primary/10 shrink-0">
        <img src={icon} alt="" className="w-[22px] h-5" />
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold leading-8 text-text-primary">
          {title}
        </h2>
        <p className="text-sm leading-5 text-text-secondary mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}