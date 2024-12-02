import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import SubCategoryForm, { SubcategorySchema } from "./SubcategoryForm";
import { z } from "zod";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode?: "create" | "edit";
  initialData?: z.infer<typeof SubcategorySchema>;
}

const SubcategoryDialog = ({
  open,
  setOpen,
  mode = "create",
  initialData,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>
          {mode === "create" ? "Create" : "Update"} Subcategory
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "create" ? "Add" : "Edit"} subcategory for your products
          </p>
        </DialogTitle>
        <div>
          <SubCategoryForm
            mode={mode}
            setOpen={setOpen}
            initialData={initialData}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubcategoryDialog;
