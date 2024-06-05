interface Props {
  hText: string;
  pText: string;
}

export default function InputHeader({ hText, pText }: Props) {
  return (
    <div>
      <h2 className="text-5xl font-medium text-fontColor text-center mb-2">
        {hText}
      </h2>
      <p className="text-center font-normal text-xl text-gray-400">{pText}</p>
    </div>
  );
}
