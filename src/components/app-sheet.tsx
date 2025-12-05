import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useOutletContext } from "react-router-dom";


interface AppSheetProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  children: React.ReactNode;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
}

export default function AppSheet({
  open = false,
  setOpen,
  children,
  trigger,
  title = "Título",
  description = "Descripción"
}: AppSheetProps) {
  const { role } = useOutletContext<{role: string }>();

  return (
    <div>
      <Sheet open={role === 'VIEWER' ? false : open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader className="pb-0">
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <SheetDescription className="px-4 py-0">{description}</SheetDescription>
          {children}
          
        </SheetContent>
      </Sheet>
    </div>
  );
}
