/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Selector = ({ data, placeholder, setInput, ...props }) => {
  return (
    <Select {...props} className="min-w-full">
      <SelectTrigger className="max-h-10 min-w-full">
        <SelectValue placeholder={placeholder} className="max-h-5 min-w-full" />
      </SelectTrigger>
      <SelectContent className="max-h-[200px] sm:max-h-[200px]">
        <>
          {data.map((type, index) => (
            <SelectItem key={index} value={type}>
              {type}
            </SelectItem>
          ))}
          {setInput && (
            <span
              className="flex h-6 items-center cursor-default mb-2 w-full rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none"
              onClick={() => setInput(false)}
            >
              Others
            </span>
          )}
        </>
      </SelectContent>
    </Select>
  );
};

export default Selector;
