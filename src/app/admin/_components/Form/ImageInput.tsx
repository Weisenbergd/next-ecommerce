import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  state: {
    status: string;
    message: any[];
  };
  index: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function ImageInput({
  name,
  state,
  index,
  className,
  ...props
}: Props) {
  const [showError, setShowError] = useState(false);

  function handleImageError() {
    if (state.status === "success") return false;
    else if (state.status === "error") {
      /*
         // imageError array
        0:['imageError',
        1:"File must be one of the following types: image/png, image/jpg" || size one,
        2:[
            0:'variantGroups'
            1:0 -- row / group  
            2:'images'
            3:0 -- which files wrong
        ]
        ]
    */

      // todo -- make sure i didn't mess up using break instead of continue elsewhere

      for (const err of state.message) {
        if (err[0] != "imageError") continue;
        if (err[2][1] === index) return true;
      }
      return false;
    }
    return false;
  }

  useEffect(() => {
    setShowError(handleImageError());
  }, [state]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
  };

  return (
    <Input
      name={name}
      className={cn(
        {
          "border-red-500 bg-red-200 focus:ring-red-500": showError,
        },
        className
      )}
      {...props}
      type="file"
      multiple
      onChange={handleChange}
    />
  );
}
