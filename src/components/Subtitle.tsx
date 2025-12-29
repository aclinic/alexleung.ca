export type SubtitleProps = {
  title: string;
  id?: string;
};

export function Subtitle({ title, id }: SubtitleProps) {
  return (
    <div
      className="text-xl xl:text-2xl flex justify-center mx-auto my-8
                    before:content-[''] before:block before:h-px before:w-[90%] max-[500px]:before:w-[40%] before:bg-gray-300 before:relative before:top-5 xl:before:top-9
                    after:content-[''] after:block after:h-px after:w-[90%] max-[500px]:after:w-[40%] after:bg-gray-300 after:relative after:top-5 xl:after:top-9"
    >
      <h2 id={id} className="block w-full text-center">
        {title}
      </h2>
    </div>
  );
}
