interface Props {
  type: string;
  placeholder: string;
  onChange: (event: any) => void;
  id: string;
}

export default function InputField({ type, placeholder, onChange, id }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border bg-gray-100 my-3 py-4 px-4 rounded-full"
      onChange={onChange}
      id={id}
    />
  );
}
