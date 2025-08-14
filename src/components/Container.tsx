type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className }: ContainerProps) {
  return (
    <div className={`max-w-[1100px] mx-auto max-md:px-4 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
