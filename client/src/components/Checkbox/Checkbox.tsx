interface Props {
  id: string;
  children: string;
  onChange: (event: any) => void;
  checked?: boolean;
}

export default function Checkbox({ children, id, onChange, checked }: Props) {
  return (
    <div className="flex gap-2 py-2">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          id={id}
          className="hidden peer"
          checked={checked || false}
          onChange={onChange}
        />
        <span className="size-6 appearance-none border border-gray-300 rounded-md peer-checked:bg-secondary peer-checked:after:content-['✓'] peer-checked:after:text-fontColor peer-checked:after:font-bold peer-checked:after:flex peer-checked:after:items-center peer-checked:after:justify-center peer-checked:after:w-full peer-checked:after:h-full"></span>
      </label>
      <span>{children}</span>
    </div>
  );
}
