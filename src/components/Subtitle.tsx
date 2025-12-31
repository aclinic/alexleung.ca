export type SubtitleProps = {
  title: string;
  id?: string;
};

export function Subtitle({ title, id }: SubtitleProps) {
  return (
    <div className="section-subtitle divider-lines-centered">
      <h2 id={id} className="block whitespace-nowrap text-center">
        {title}
      </h2>
    </div>
  );
}
