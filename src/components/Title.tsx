type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return (
    <div className="text-lg xl:text-3xl flex justify-center mx-auto mb-12 
                    before:content-[''] before:block before:h-px before:w-[90%] max-[500px]:before:w-[40%] before:bg-gray-300 before:relative before:top-5 xl:before:top-9
                    after:content-[''] after:block after:h-px after:w-[90%] max-[500px]:after:w-[40%] after:bg-gray-300 after:relative after:top-5 xl:after:top-9">
      <h3 className="block w-full text-center">{title}</h3>
    </div>
  );
};

export default Title;
