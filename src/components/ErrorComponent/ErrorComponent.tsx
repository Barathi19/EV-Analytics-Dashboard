import errorImage from "@/assets/error.svg";

interface ErrorComponentProps {
  errMessage?: string;
}

function ErrorComponent({
  errMessage = "Something went wrong!",
}: ErrorComponentProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      <div className="w-40 h-40 sm:w-60 sm:h-60 relative">
        <img src={errorImage} alt="Error" className="object-contain" />
      </div>
      <b className="mt-4 text-lg sm:text-xl text-gray-700">{errMessage}</b>
    </div>
  );
}

export default ErrorComponent;
