export type SubtitleProps = {
  title: string;
  id?: string;
};

export function Subtitle({ title, id }: SubtitleProps) {
  return (
    <div className="section-subtitle divider-lines">
      <h2 id={id} className="block w-full text-center">
        {title}
      </h2>
    </div>
  );
}
