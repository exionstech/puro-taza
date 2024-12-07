import DropdownIcon from "@/components/shared/dropdown-icon"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const AddressDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-col border-none">
            <h1 className="text-violet text-lg font-medium w-full text-left">Suman Mandal</h1>
            <p className="flex items-center">
                <span className="text-sm">
                    62, BM Banerjee Lane...
                </span>
                <DropdownIcon size={3} className="ml-3"/>
            </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select your location</DialogTitle>
          <DialogDescription>
          We deliver your selected or this current location
          </DialogDescription>
        </DialogHeader>
        <div className="w-full px-2 flex flex-col">
            <div className="flex items-center justify-between w-full p-2 border-b-[1px] border-gray-300">
                <h1 className="text-lg font-medium">Suman Mandal</h1>
                <p className="text-sm">62, BM Banerjee Lane...</p>
            </div>
            <div className="flex items-center justify-between w-full p-2 border-b-[1px] border-gray-300">
                <h1 className="text-lg font-medium">Suman Mandal</h1>
                <p className="text-sm">62, BM Banerjee Lane...</p>
            </div>
            <div className="flex items-center justify-between w-full p-2 border-b-[1px] border-gray-300">
                <h1 className="text-lg font-medium">Suman Mandal</h1>
                <p className="text-sm">62, BM Banerjee Lane...</p>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddressDialog;
