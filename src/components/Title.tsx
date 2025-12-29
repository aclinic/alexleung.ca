export type TitleProps = {
  title: string;
  id?: string;
};

export function Title({ title, id }: TitleProps) {
  return (
    <div className="text-2xl xl:text-4xl flex justify-center mx-auto my-12">
      <h1 id={id} className="block w-full text-center">
        {title}
      </h1>
    </div>
  );
}
