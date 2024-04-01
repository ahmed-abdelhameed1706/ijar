/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Selector = ({ data, placeholder, handleClick, ...props }) => {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[250px] sm:max-h-[220px]">
        <>
          {data.map((type, index) => (
            <SelectItem key={index} value={type}>
              {type}
            </SelectItem>
          ))}
          {handleClick && (
            <span
              className="flex h-6 items-center cursor-default mb-2 w-full rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none"
              onClick={handleClick}
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
