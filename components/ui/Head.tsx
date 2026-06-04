type HeadType = {
  head: string;
  sub: string;
};
const Head = ({ head, sub }: HeadType) => {
  return (
    <div className="pt-8 pb-10">
      <h1 className="font-semibold w-full text-3xl text-slate-900 tracking-[-.8px]">{head}</h1>
      <p className="text-sm font-normal text-slate-600 mt-2">{sub}</p>
    </div>
  );
};

export default Head;
