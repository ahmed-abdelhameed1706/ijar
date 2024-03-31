/* eslint-disable react/prop-types */
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { validFileType, returnFileSize } from "./helper";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Images({ images, setImages }) {
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [images]);
  const handleRemoveImage = (image) => {
    const updatedImages = images.filter((img) => img !== image);
    setImages(updatedImages);
  };

  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {images.map((image, i) =>
          typeof image === "string" ? (
            <figure key={image + "-" + i} className="shrink-0 relative">
              <div
                className="p-1 cursor-pointer absolute top-2 right-2"
                onClick={() => handleRemoveImage(image)}
              >
                <X size={24} />
              </div>
              <div className="overflow-hidden rounded-md shadow-md">
                <img
                  src={image}
                  alt={`Photo ${image}`}
                  className="aspect-[3/4] h-40 w-fit object-cover"
                  width={100}
                  height={200}
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground w-[100px] overflow-x-auto">
                {`URL: ${image}`}
              </figcaption>
            </figure>
          ) : validFileType(image) ? (
            <figure key={image + "-" + i} className="shrink-0 relative">
              <div
                className="p-1 cursor-pointer absolute top-2 right-2"
                onClick={() => handleRemoveImage(image)}
              >
                <X size={24} />
              </div>
              <div className="overflow-hidden rounded-md shadow-md">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Photo ${image.name}`}
                  className="aspect-[3/4] h-40 w-fit object-cover"
                  width={100}
                  height={200}
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                {`File size ${returnFileSize(image.size)}.`}
              </figcaption>
            </figure>
          ) : (
            <figure key={image} className="shrink-0">
              <div className="overflow-hidden rounded-md h-[86%]"></div>
              <figcaption className="pt-2 text-xs text-muted-foreground text-red-600">
                {`File name ${image.name}: Not a valid file type. Update your selection.`}
              </figcaption>
            </figure>
          )
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
