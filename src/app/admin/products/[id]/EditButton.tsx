import { Button } from "@/components/ui/button";

interface Props {
  children: any;
  editting: any;
  setEditting: any;
  category: string;
  target: number;
}

export default function EditButton({
  children,
  editting,
  setEditting,
  category,
  target,
}: Props) {
  // works for product, group,

  return (
    <Button
      onClick={() => {
        if (editting.category === category) {
          setEditting({ category: "", target: -1 });
        } else {
          setEditting({ category, target });
        }
      }}
    >
      {children}
    </Button>
  );
}
