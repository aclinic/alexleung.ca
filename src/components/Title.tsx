export type TitleProps = {
  title: string;
  id?: string;
};

export function Title({ title, id }: TitleProps) {
  return (
    <div className="section-title px-4">
      <h1 id={id} className="block w-full text-center">
        {title}
      </h1>
    </div>
  );
}
