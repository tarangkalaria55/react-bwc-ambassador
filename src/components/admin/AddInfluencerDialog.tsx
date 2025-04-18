import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InfluencerFormValues,
  influencerFormSchema,
  DialogMode,
} from "./influencer-form/types";
import InfluencerFormFields from "./influencer-form/InfluencerFormFields";

interface AddInfluencerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: InfluencerFormValues) => void;
  onDelete?: (id: string) => void;
  editData?: InfluencerFormValues & { id?: string };
  mode?: DialogMode;
}

const AddInfluencerDialog: React.FC<AddInfluencerDialogProps> = ({
  open,
  onOpenChange,
  onSubmit: externalSubmit,
  onDelete,
  editData,
  mode = "add",
}) => {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  const form = useForm<InfluencerFormValues>({
    resolver: zodResolver(influencerFormSchema),
    defaultValues: editData || {
      name: "",
      email: "",
      instagram: "",
      tiktok: "",
      phone: "",
      bio: "",
      commissionRate: 30,
      discountPercentage: 10,
      sendWelcomeEmail: true,
      referralCode: "",
      expiryDate: undefined,
    },
  });

  React.useEffect(() => {
    if (editData && (isEditMode || isViewMode)) {
      Object.entries(editData).forEach(([key, value]) => {
        if (key !== "id") {
          form.setValue(key as keyof InfluencerFormValues, value);
        }
      });

      if (editData.referralCode) {
        setGeneratedCode(editData.referralCode);
      }
    }
  }, [editData, form, isEditMode, isViewMode]);

  const onSubmit = (data: InfluencerFormValues) => {
    console.log(
      `${mode === "edit" ? "Updated" : "New"} influencer data:`,
      data
    );

    if (externalSubmit) {
      externalSubmit(data);
    } else {
      toast.success(
        `Influencer ${isEditMode ? "updated" : "added"} successfully`,
        {
          description: `${data.name} has been ${
            isEditMode ? "updated in" : "added to"
          } your program.`,
        }
      );
    }

    if (!isEditMode) {
      form.reset();
      setGeneratedCode(null);
    }

    onOpenChange(false);
  };

  const getDialogTitle = () => {
    if (isViewMode) return "Influencer Details";
    if (isEditMode) return "Edit Influencer";
    return "Add New Influencer";
  };

  const handleDelete = () => {
    if (onDelete && editData?.id) {
      onDelete(editData.id);
      setDeleteDialogOpen(false);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] glass-card">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {getDialogTitle()}
            </DialogTitle>
            <DialogDescription className="text-bwc-charcoal-light">
              {isViewMode
                ? "View influencer details and performance"
                : isEditMode
                ? "Update the influencer's information"
                : "Complete the form below to add a new influencer to your referral program."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <InfluencerFormFields
                form={form}
                isViewMode={isViewMode}
                generatedCode={generatedCode}
                setGeneratedCode={setGeneratedCode}
              />

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                {isEditMode && onDelete && editData?.id && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDeleteDialogOpen(true)}
                    className="w-full sm:w-auto mr-auto text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Influencer
                  </Button>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="w-full sm:w-auto"
                >
                  {isViewMode ? "Close" : "Cancel"}
                </Button>

                {!isViewMode && (
                  <Button type="submit" className="w-full sm:w-auto">
                    {isEditMode ? "Update Influencer" : "Add Influencer"}
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the influencer "{editData?.name}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddInfluencerDialog;
