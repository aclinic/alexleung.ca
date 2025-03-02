type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return (
    <div className="text-[1.1rem] xl:text-[2rem] flex justify-center mx-auto mb-12 
                    before:content-[''] before:block before:h-[1px] before:w-[90%] before:bg-gray-300 before:relative before:top-5 xl:before:top-9 max-[500px]:before:w-[40%]
                    after:content-[''] after:block after:h-[1px] after:w-[90%] after:bg-gray-300 after:relative after:top-5 xl:after:top-9 max-[500px]:after:w-[40%]">
      <h2 className="block w-full text-center">{title}</h2>
    </div>
  );
};

export default Title;
